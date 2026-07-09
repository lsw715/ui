"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Eye, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CURRENCY_OPTIONS,
  mockRefundOrders,
  REFUND_STATUS_COLORS,
  REFUND_STATUS_LABELS,
} from "@/data/mock-refund-orders";
import { cn } from "@/lib/utils";
import type { GatewayRefundOrder, RefundSearchFilters } from "@/types/refund-order";

function getDefaultDateRange(): { start: string; end: string } {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  return { start: fmt(start), end: fmt(end) };
}

function getDefaultFilters(): RefundSearchFilters {
  const range = getDefaultDateRange();
  return {
    refundTimeStart: range.start,
    refundTimeEnd: range.end,
    refundFinishTimeStart: "",
    refundFinishTimeEnd: "",
    merchantId: "",
    merchantName: "",
    refundCurrency: "",
    refundGatewayOrderId: "",
    gatewayOrderId: "",
    refundStatus: "",
    merchantRefundId: "",
    arn: "",
  };
}

const PAGE_SIZE = 10;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[13px] text-[#666]">{children}</label>;
}

function TextInput({
  value,
  onChange,
  placeholder = "请输入",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[34px] w-full rounded-[3px] border border-[var(--color-ops-border)] bg-white px-3 text-[14px] outline-none transition-colors placeholder:text-[#bbb] focus:border-[var(--primary)]"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder = "请选择",
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[34px] w-full rounded-[3px] border border-[var(--color-ops-border)] bg-white px-3 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function DateRangeInput({
  start,
  end,
  onStartChange,
  onEndChange,
}: {
  start: string;
  end: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="datetime-local"
        value={start ? start.replace(" ", "T").slice(0, 16) : ""}
        onChange={(e) =>
          onStartChange(e.target.value ? e.target.value.replace("T", " ") + ":00" : "")
        }
        className="h-[34px] min-w-0 flex-1 rounded-[3px] border border-[var(--color-ops-border)] bg-white px-2 text-[13px] outline-none focus:border-[var(--primary)]"
      />
      <span className="text-[#999]">至</span>
      <input
        type="datetime-local"
        value={end ? end.replace(" ", "T").slice(0, 16) : ""}
        onChange={(e) =>
          onEndChange(e.target.value ? e.target.value.replace("T", " ") + ":00" : "")
        }
        className="h-[34px] min-w-0 flex-1 rounded-[3px] border border-[var(--color-ops-border)] bg-white px-2 text-[13px] outline-none focus:border-[var(--primary)]"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: GatewayRefundOrder["refundStatus"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 text-[12px] font-medium",
        REFUND_STATUS_COLORS[status],
      )}
    >
      {REFUND_STATUS_LABELS[status]}
    </span>
  );
}

export function GatewayRefundList() {
  const [filters, setFilters] = useState<RefundSearchFilters>(getDefaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<RefundSearchFilters>(getDefaultFilters);
  const [page, setPage] = useState(1);
  const [exportMsg, setExportMsg] = useState("");

  const filtered = useMemo(() => {
    return mockRefundOrders.filter((row) => {
      if (appliedFilters.merchantId && !row.merchantId.includes(appliedFilters.merchantId)) {
        return false;
      }
      if (
        appliedFilters.merchantName &&
        !row.merchantName.toLowerCase().includes(appliedFilters.merchantName.toLowerCase())
      ) {
        return false;
      }
      if (
        appliedFilters.refundGatewayOrderId &&
        !row.refundGatewayOrderId.includes(appliedFilters.refundGatewayOrderId)
      ) {
        return false;
      }
      if (
        appliedFilters.gatewayOrderId &&
        !row.gatewayOrderId.includes(appliedFilters.gatewayOrderId)
      ) {
        return false;
      }
      if (appliedFilters.refundStatus && row.refundStatus !== appliedFilters.refundStatus) {
        return false;
      }
      if (
        appliedFilters.refundCurrency &&
        row.refundTransAmount.currency !== appliedFilters.refundCurrency
      ) {
        return false;
      }
      if (
        appliedFilters.merchantRefundId &&
        !row.refundTransId.includes(appliedFilters.merchantRefundId)
      ) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateFilter = <K extends keyof RefundSearchFilters>(key: K, value: RefundSearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  const handleReset = () => {
    const defaults = getDefaultFilters();
    setFilters(defaults);
    setAppliedFilters(defaults);
    setPage(1);
  };

  const handleExport = () => {
    setExportMsg("导出任务已提交，请稍后在下载中心查看");
    setTimeout(() => setExportMsg(""), 3000);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
      {/* Search Panel */}
      <div className="border-b border-[var(--color-ops-border)] p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel>退款创建时间</FieldLabel>
            <DateRangeInput
              start={filters.refundTimeStart}
              end={filters.refundTimeEnd}
              onStartChange={(v) => updateFilter("refundTimeStart", v)}
              onEndChange={(v) => updateFilter("refundTimeEnd", v)}
            />
          </div>
          <div>
            <FieldLabel>退款完成时间</FieldLabel>
            <DateRangeInput
              start={filters.refundFinishTimeStart}
              end={filters.refundFinishTimeEnd}
              onStartChange={(v) => updateFilter("refundFinishTimeStart", v)}
              onEndChange={(v) => updateFilter("refundFinishTimeEnd", v)}
            />
          </div>
          <div>
            <FieldLabel>商户号</FieldLabel>
            <TextInput
              value={filters.merchantId}
              onChange={(v) => updateFilter("merchantId", v)}
            />
          </div>
          <div>
            <FieldLabel>商户名</FieldLabel>
            <TextInput
              value={filters.merchantName}
              onChange={(v) => updateFilter("merchantName", v)}
            />
          </div>
          <div>
            <FieldLabel>退款币种</FieldLabel>
            <SelectInput
              value={filters.refundCurrency}
              onChange={(v) => updateFilter("refundCurrency", v)}
              options={CURRENCY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <FieldLabel>PayKKa退款订单号</FieldLabel>
            <TextInput
              value={filters.refundGatewayOrderId}
              onChange={(v) => updateFilter("refundGatewayOrderId", v)}
            />
          </div>
          <div>
            <FieldLabel>网关订单号</FieldLabel>
            <TextInput
              value={filters.gatewayOrderId}
              onChange={(v) => updateFilter("gatewayOrderId", v)}
            />
          </div>
          <div>
            <FieldLabel>退款状态</FieldLabel>
            <SelectInput
              value={filters.refundStatus}
              onChange={(v) => updateFilter("refundStatus", v)}
              options={Object.entries(REFUND_STATUS_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </div>
          <div>
            <FieldLabel>商户退款订单号</FieldLabel>
            <TextInput
              value={filters.merchantRefundId}
              onChange={(v) => updateFilter("merchantRefundId", v)}
            />
          </div>
          <div>
            <FieldLabel>arn</FieldLabel>
            <TextInput value={filters.arn} onChange={(v) => updateFilter("arn", v)} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={handleSearch}
            className="h-[34px] bg-[var(--primary)] px-5 text-white hover:bg-[#4338ca]"
          >
            <Search className="mr-1.5 size-4" />
            查询
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-[34px] border-[var(--color-ops-border)] px-5 text-[#666] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <RotateCcw className="mr-1.5 size-4" />
            重置
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-ops-border)] px-4 py-3">
        <Button
          variant="outline"
          onClick={handleExport}
          className="h-[32px] border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--color-ops-primary-light)]"
        >
          <Download className="mr-1.5 size-4" />
          导出
        </Button>
        {exportMsg ? (
          <span className="text-[13px] text-[var(--primary)]">{exportMsg}</span>
        ) : null}
      </div>

      {/* Table */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1200px] border-collapse text-[13px]">
          <thead className="sticky top-0 z-10 bg-[var(--color-ops-table-header)]">
            <tr className="border-b border-[var(--color-ops-border)] text-left text-[#666]">
              <th className="w-[55px] px-3 py-3 font-medium">操作</th>
              <th className="px-3 py-3 font-medium">退款金额</th>
              <th className="px-3 py-3 font-medium">退款状态</th>
              <th className="px-3 py-3 font-medium">退款创建时间</th>
              <th className="px-3 py-3 font-medium">商户名</th>
              <th className="w-[200px] px-3 py-3 font-medium">PayKKa退款订单号</th>
              <th className="w-[200px] px-3 py-3 font-medium">网关订单号</th>
              <th className="px-3 py-3 font-medium">退款状态描述</th>
              <th className="px-3 py-3 font-medium">退款完成时间</th>
              <th className="w-[155px] px-3 py-3 font-medium">商户号</th>
              <th className="px-3 py-3 font-medium">退款原因</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr
                key={row.refundGatewayOrderId}
                className="border-b border-[var(--color-ops-border)] transition-colors hover:bg-[#fafafa]"
              >
                <td className="px-3 py-3">
                  <Link
                    href={`/gateway-order-refund-detail/${row.gatewayOrderId}?type=2&backPath=/gateway-order-refund-list&businessType=${row.businessType}`}
                    title="查看"
                    className="flex size-7 items-center justify-center rounded text-[var(--primary)] hover:bg-[var(--color-ops-primary-light)]"
                  >
                    <Eye className="size-4" />
                  </Link>
                </td>
                <td className="px-3 py-3 font-medium text-[#333]">
                  {row.refundTransAmount.amount} {row.refundTransAmount.currency}
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={row.refundStatus} />
                </td>
                <td className="px-3 py-3 text-[#666]">{row.refundTime}</td>
                <td className="max-w-[160px] truncate px-3 py-3" title={row.merchantName}>
                  {row.merchantName}
                </td>
                <td className="px-3 py-3 font-mono text-[12px] text-[#666]">
                  {row.refundGatewayOrderId}
                </td>
                <td className="px-3 py-3 font-mono text-[12px] text-[#666]">
                  {row.gatewayOrderId}
                </td>
                <td className="max-w-[180px] truncate px-3 py-3 text-[#999]" title={row.refundErrorDescription ?? ""}>
                  {row.refundErrorDescription ?? "-"}
                </td>
                <td className="px-3 py-3 text-[#666]">{row.refundFinishTime ?? "-"}</td>
                <td className="px-3 py-3 text-[#666]">{row.merchantId}</td>
                <td className="max-w-[120px] truncate px-3 py-3 text-[#666]" title={row.refundRemark}>
                  {row.refundRemark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[var(--color-ops-border)] px-4 py-3 text-[13px] text-[#666]">
        <span>共 {filtered.length} 条</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border border-[var(--color-ops-border)] px-3 py-1 disabled:opacity-40 hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            上一页
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={cn(
                "min-w-[32px] rounded border px-2 py-1",
                p === page
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--color-ops-border)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
              )}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border border-[var(--color-ops-border)] px-3 py-1 disabled:opacity-40 hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
