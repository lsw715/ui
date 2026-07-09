"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockRefundReviews,
  PAYMENT_METHOD_OPTIONS,
  REVIEW_STATUS_COLORS,
  REVIEW_STATUS_LABELS,
} from "@/data/mock-refund-reviews";
import { REFUND_TYPE_LABELS } from "@/data/payout-refund-constants";
import { cn } from "@/lib/utils";
import type { RefundReviewRecord, RefundReviewSearchFilters } from "@/types/refund-review";

const PAGE_SIZE = 10;

function getDefaultFilters(): RefundReviewSearchFilters {
  return {
    createTimeStart: "",
    createTimeEnd: "",
    reviewStatus: "REVIEWING",
    merchantId: "",
    refundOrderId: "",
    orderId: "",
    paymentMethod: "",
  };
}

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

function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      colSpan={100}
      className="border-b border-[var(--color-ops-border)] bg-[#f7f7fa] px-3 py-2 text-left text-[13px] font-medium text-[#333]"
    >
      {children}
    </th>
  );
}

export function RefundReviewList() {
  const [filters, setFilters] = useState<RefundReviewSearchFilters>(getDefaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<RefundReviewSearchFilters>(getDefaultFilters);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectOpinion, setRejectOpinion] = useState("");

  const filtered = useMemo(() => {
    return mockRefundReviews.filter((row) => {
      if (appliedFilters.reviewStatus && row.reviewStatus !== appliedFilters.reviewStatus) {
        return false;
      }
      if (appliedFilters.merchantId && !row.merchantId.includes(appliedFilters.merchantId)) {
        return false;
      }
      if (
        appliedFilters.refundOrderId &&
        !row.refundOrderId.includes(appliedFilters.refundOrderId)
      ) {
        return false;
      }
      if (appliedFilters.orderId && !row.orderId.includes(appliedFilters.orderId)) {
        return false;
      }
      if (appliedFilters.paymentMethod && row.paymentMethod !== appliedFilters.paymentMethod) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const reviewingOnPage = pageData.filter((r) => r.reviewStatus === "REVIEWING");

  const updateFilter = <K extends keyof RefundReviewSearchFilters>(
    key: K,
    value: RefundReviewSearchFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleRow = (id: string, status: string) => {
    if (status !== "REVIEWING") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const reviewingIds = reviewingOnPage.map((r) => r.refundOrderId);
    const allSelected = reviewingIds.every((id) => selected.has(id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) reviewingIds.forEach((id) => next.delete(id));
      else reviewingIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleApprove = () => {
    if (selected.size === 0) {
      setMessage("请先选择订单");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setMessage("操作成功");
    setSelected(new Set());
    setTimeout(() => setMessage(""), 2000);
  };

  const handleReject = () => {
    if (selected.size === 0) {
      setMessage("请先选择订单");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setRejectModal(true);
  };

  const confirmReject = () => {
    setRejectModal(false);
    setRejectOpinion("");
    setMessage("操作成功");
    setSelected(new Set());
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
      {/* Search */}
      <div className="border-b border-[var(--color-ops-border)] p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel>退款创建时间</FieldLabel>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px] outline-none focus:border-[var(--primary)]"
              />
              <span className="text-[#999]">至</span>
              <input
                type="date"
                className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px] outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>
          <div>
            <FieldLabel>审核状态</FieldLabel>
            <SelectInput
              value={filters.reviewStatus}
              onChange={(v) => updateFilter("reviewStatus", v)}
              options={Object.entries(REVIEW_STATUS_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
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
            <FieldLabel>退款网关订单号</FieldLabel>
            <TextInput
              value={filters.refundOrderId}
              onChange={(v) => updateFilter("refundOrderId", v)}
            />
          </div>
          <div>
            <FieldLabel>网关订单号</FieldLabel>
            <TextInput value={filters.orderId} onChange={(v) => updateFilter("orderId", v)} />
          </div>
          <div>
            <FieldLabel>支付方式</FieldLabel>
            <SelectInput
              value={filters.paymentMethod}
              onChange={(v) => updateFilter("paymentMethod", v)}
              options={PAYMENT_METHOD_OPTIONS}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={() => {
              setAppliedFilters(filters);
              setPage(1);
            }}
            className="h-[34px] bg-[var(--primary)] px-5 text-white hover:bg-[#4338ca]"
          >
            <Search className="mr-1.5 size-4" />
            查询
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const defaults = getDefaultFilters();
              setFilters(defaults);
              setAppliedFilters(defaults);
              setPage(1);
            }}
            className="h-[34px] border-[var(--color-ops-border)] px-5 text-[#666]"
          >
            <RotateCcw className="mr-1.5 size-4" />
            重置
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3 border-b border-[var(--color-ops-border)] px-4 py-3">
        <Button
          onClick={handleApprove}
          className="h-[32px] bg-[var(--primary)] px-4 text-white hover:bg-[#4338ca]"
        >
          <Check className="mr-1.5 size-4" />
          通过
        </Button>
        <Button
          variant="outline"
          onClick={handleReject}
          className="h-[32px] border-[var(--primary)] bg-[var(--color-ops-primary-light)] px-4 text-[var(--primary)]"
        >
          <X className="mr-1.5 size-4" />
          拒绝
        </Button>
        {message ? <span className="text-[13px] text-[var(--primary)]">{message}</span> : null}
      </div>

      {/* Table */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1400px] border-collapse text-[13px]">
          <thead className="sticky top-0 z-10">
            <tr>
              <GroupHeader>退款风险信息</GroupHeader>
            </tr>
            <tr className="border-b border-[var(--color-ops-border)] bg-[var(--color-ops-table-header)] text-left text-[#666]">
              <th className="w-[40px] px-3 py-2">
                <input
                  type="checkbox"
                  checked={
                    reviewingOnPage.length > 0 &&
                    reviewingOnPage.every((r) => selected.has(r.refundOrderId))
                  }
                  onChange={toggleAll}
                  className="accent-[var(--primary)]"
                />
              </th>
              <th className="px-3 py-2 font-medium">审核状态</th>
              <th className="px-3 py-2 font-medium">退款方式</th>
              <th className="px-3 py-2 font-medium">发起人</th>
              <th className="w-[220px] px-3 py-2 font-medium">拒绝原因</th>
            </tr>
            <tr>
              <GroupHeader>退款订单信息</GroupHeader>
            </tr>
            <tr className="border-b border-[var(--color-ops-border)] bg-[var(--color-ops-table-header)] text-left text-[#666]">
              <th className="px-3 py-2" />
              <th className="px-3 py-2 font-medium">金额</th>
              <th className="w-[240px] px-3 py-2 font-medium">网关订单号</th>
              <th className="w-[240px] px-3 py-2 font-medium">退款网关订单号</th>
              <th className="w-[220px] px-3 py-2 font-medium">退款创建时间</th>
              <th className="w-[200px] px-3 py-2 font-medium">商户号</th>
              <th className="w-[200px] px-3 py-2 font-medium">商户名</th>
              <th className="px-3 py-2 font-medium">支付方式</th>
              <th className="w-[240px] px-3 py-2 font-medium">退款原因</th>
            </tr>
            <tr>
              <GroupHeader>审核人信息</GroupHeader>
            </tr>
            <tr className="border-b border-[var(--color-ops-border)] bg-[var(--color-ops-table-header)] text-left text-[#666]">
              <th className="px-3 py-2" />
              <th className="px-3 py-2 font-medium">姓名</th>
              <th className="w-[220px] px-3 py-2 font-medium">邮箱</th>
              <th className="px-3 py-2 font-medium">用户名</th>
              <th className="w-[220px] px-3 py-2 font-medium">用户ID</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row: RefundReviewRecord) => (
              <tr
                key={row.id}
                className="border-b border-[var(--color-ops-border)] hover:bg-[#fafafa]"
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.refundOrderId)}
                    disabled={row.reviewStatus !== "REVIEWING"}
                    onChange={() => toggleRow(row.refundOrderId, row.reviewStatus)}
                    className="accent-[var(--primary)] disabled:opacity-40"
                  />
                </td>
                <td className="px-3 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded border px-2 py-0.5 text-[12px] font-medium",
                      REVIEW_STATUS_COLORS[row.reviewStatus],
                    )}
                  >
                    {REVIEW_STATUS_LABELS[row.reviewStatus]}
                  </span>
                </td>
                <td className="px-3 py-3">{REFUND_TYPE_LABELS[row.refundType]}</td>
                <td className="px-3 py-3 text-[#666]">{row.initiatorName}</td>
                <td className="max-w-[220px] truncate px-3 py-3 text-[#666]" title={row.refundOpinion ?? ""}>
                  {row.refundOpinion ?? "-"}
                </td>
                <td className="px-3 py-3 font-medium text-[#333]">
                  {row.refundTransAmount.amount} {row.refundTransAmount.currency}
                </td>
                <td className="px-3 py-3 font-mono text-[12px] text-[#666]">{row.orderId}</td>
                <td className="px-3 py-3 font-mono text-[12px] text-[#666]">{row.refundOrderId}</td>
                <td className="px-3 py-3 text-[#666]">{row.createTime}</td>
                <td className="px-3 py-3 text-[#666]">{row.merchantId}</td>
                <td className="max-w-[200px] truncate px-3 py-3" title={row.merchantName}>
                  {row.merchantName}
                </td>
                <td className="px-3 py-3 text-[#666]">
                  {PAYMENT_METHOD_OPTIONS.find((p) => p.value === row.paymentMethod)?.label ??
                    row.paymentMethod}
                </td>
                <td className="max-w-[240px] truncate px-3 py-3 text-[#666]" title={row.reason}>
                  {row.reason}
                </td>
                <td className="px-3 py-3 text-[#666]">{row.refundReviewerName ?? "-"}</td>
                <td className="px-3 py-3 text-[#666]">{row.refundReviewerEmail ?? "-"}</td>
                <td className="px-3 py-3 text-[#666]">{row.refundReviewerUsername ?? "-"}</td>
                <td className="px-3 py-3 text-[#666]">{row.refundReviewerId ?? "-"}</td>
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
            className="rounded border border-[var(--color-ops-border)] px-3 py-1 disabled:opacity-40"
          >
            上一页
          </button>
          <span className="min-w-[32px] rounded border border-[var(--primary)] bg-[var(--primary)] px-2 py-1 text-center text-white">
            {page}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border border-[var(--color-ops-border)] px-3 py-1 disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="w-[420px] rounded-[6px] bg-white p-5 shadow-xl">
            <h4 className="mb-4 text-[16px] font-medium text-[#333]">拒绝</h4>
            <p className="mb-3 text-[14px] text-[#666]">确认拒绝所选退款订单？</p>
            <textarea
              value={rejectOpinion}
              onChange={(e) => setRejectOpinion(e.target.value)}
              maxLength={120}
              placeholder="拒绝原因（选填）"
              className="mb-4 h-[80px] w-full resize-none rounded-[3px] border border-[var(--color-ops-border)] p-3 text-[14px] outline-none focus:border-[var(--primary)]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRejectModal(false)}>
                取消
              </Button>
              <Button
                onClick={confirmReject}
                className="bg-[var(--primary)] text-white hover:bg-[#4338ca]"
              >
                确认
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
