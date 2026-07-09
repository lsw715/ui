"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Eye, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CURRENCY_OPTIONS,
  mockPaymentOrders,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_OPTIONS,
} from "@/data/mock-payment-orders";
import { cn } from "@/lib/utils";
import type { GatewayPaymentOrder, PaymentSearchFilters } from "@/types/payment-order";

const PAGE_SIZE = 10;

function getDefaultFilters(): PaymentSearchFilters {
  return {
    paymentTimeStart: "",
    paymentTimeEnd: "",
    paymentFinishTimeStart: "",
    paymentFinishTimeEnd: "",
    merchantId: "",
    merchantName: "",
    currency: "",
    gatewayOrderId: "",
    transId: "",
    orderStatus: "",
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
      className="h-[34px] w-full rounded-[3px] border border-[var(--color-ops-border)] bg-white px-3 text-[14px] outline-none focus:border-[var(--primary)]"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[34px] w-full rounded-[3px] border border-[var(--color-ops-border)] bg-white px-3 text-[14px] outline-none focus:border-[var(--primary)]"
    >
      <option value="">请选择</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function GatewayPaymentList() {
  const [filters, setFilters] = useState(getDefaultFilters);
  const [applied, setApplied] = useState(getDefaultFilters);
  const [page, setPage] = useState(1);
  const [exportMsg, setExportMsg] = useState("");

  const filtered = useMemo(() => {
    return mockPaymentOrders.filter((row) => {
      if (applied.merchantId && !row.merchantId.includes(applied.merchantId)) return false;
      if (applied.merchantName && !row.merchantName.includes(applied.merchantName)) return false;
      if (applied.gatewayOrderId && !row.gatewayOrderId.includes(applied.gatewayOrderId)) return false;
      if (applied.transId && !row.transId.includes(applied.transId)) return false;
      if (applied.orderStatus && row.orderStatus !== applied.orderStatus) return false;
      if (applied.currency && row.transAmount.currency !== applied.currency) return false;
      if (applied.paymentMethod && row.paymentMethod !== applied.paymentMethod) return false;
      return true;
    });
  }, [applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const set = <K extends keyof PaymentSearchFilters>(k: K, v: PaymentSearchFilters[K]) =>
    setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
      <div className="border-b border-[var(--color-ops-border)] p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel>支付创建时间</FieldLabel>
            <div className="flex items-center gap-2">
              <input type="date" className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px]" />
            </div>
          </div>
          <div>
            <FieldLabel>支付完成时间</FieldLabel>
            <div className="flex items-center gap-2">
              <input type="date" className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="h-[34px] flex-1 rounded-[3px] border border-[var(--color-ops-border)] px-2 text-[13px]" />
            </div>
          </div>
          <div>
            <FieldLabel>商户号</FieldLabel>
            <TextInput value={filters.merchantId} onChange={(v) => set("merchantId", v)} />
          </div>
          <div>
            <FieldLabel>商户名</FieldLabel>
            <TextInput value={filters.merchantName} onChange={(v) => set("merchantName", v)} />
          </div>
          <div>
            <FieldLabel>币种</FieldLabel>
            <SelectInput
              value={filters.currency}
              onChange={(v) => set("currency", v)}
              options={CURRENCY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <FieldLabel>网关订单号</FieldLabel>
            <TextInput value={filters.gatewayOrderId} onChange={(v) => set("gatewayOrderId", v)} />
          </div>
          <div>
            <FieldLabel>商户订单号</FieldLabel>
            <TextInput value={filters.transId} onChange={(v) => set("transId", v)} />
          </div>
          <div>
            <FieldLabel>订单状态</FieldLabel>
            <SelectInput
              value={filters.orderStatus}
              onChange={(v) => set("orderStatus", v)}
              options={Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div>
            <FieldLabel>支付方式</FieldLabel>
            <SelectInput
              value={filters.paymentMethod}
              onChange={(v) => set("paymentMethod", v)}
              options={PAYMENT_METHOD_OPTIONS}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => { setApplied(filters); setPage(1); }} className="h-[34px] bg-[var(--primary)] px-5 text-white">
            <Search className="mr-1.5 size-4" />查询
          </Button>
          <Button variant="outline" onClick={() => { const d = getDefaultFilters(); setFilters(d); setApplied(d); setPage(1); }} className="h-[34px]">
            <RotateCcw className="mr-1.5 size-4" />重置
          </Button>
        </div>
      </div>

      <div className="flex items-center border-b border-[var(--color-ops-border)] px-4 py-3">
        <Button
          variant="outline"
          className="h-[32px] border-[var(--primary)] text-[var(--primary)]"
          onClick={() => { setExportMsg("导出任务已提交"); setTimeout(() => setExportMsg(""), 3000); }}
        >
          <Download className="mr-1.5 size-4" />导出
        </Button>
        {exportMsg ? <span className="ml-3 text-[13px] text-[var(--primary)]">{exportMsg}</span> : null}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1200px] border-collapse text-[13px]">
          <thead className="sticky top-0 bg-[var(--color-ops-table-header)]">
            <tr className="border-b border-[var(--color-ops-border)] text-left text-[#666]">
              <th className="w-[55px] px-3 py-3">操作</th>
              <th className="px-3 py-3">交易金额</th>
              <th className="px-3 py-3">订单状态</th>
              <th className="px-3 py-3">支付创建时间</th>
              <th className="px-3 py-3">商户名</th>
              <th className="w-[200px] px-3 py-3">网关订单号</th>
              <th className="px-3 py-3">商户订单号</th>
              <th className="px-3 py-3">支付方式</th>
              <th className="px-3 py-3">支付完成时间</th>
              <th className="px-3 py-3">商户号</th>
              <th className="px-3 py-3">渠道编码</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.gatewayOrderId} className="border-b border-[var(--color-ops-border)] hover:bg-[#fafafa]">
                <td className="px-3 py-3">
                  <Link
                    href={`/gateway-order-payment-detail/${row.gatewayOrderId}?type=1&backPath=/gateway-order-payment-list&businessType=${row.businessType}`}
                    className="flex size-7 items-center justify-center rounded text-[var(--primary)] hover:bg-[var(--color-ops-primary-light)]"
                  >
                    <Eye className="size-4" />
                  </Link>
                </td>
                <td className="px-3 py-3 font-medium">{row.transAmount.amount} {row.transAmount.currency}</td>
                <td className="px-3 py-3">
                  <span className={cn("inline-flex rounded border px-2 py-0.5 text-[12px]", ORDER_STATUS_COLORS[row.orderStatus])}>
                    {ORDER_STATUS_LABELS[row.orderStatus]}
                  </span>
                </td>
                <td className="px-3 py-3 text-[#666]">{row.paymentTime}</td>
                <td className="px-3 py-3">{row.merchantName}</td>
                <td className="px-3 py-3 font-mono text-[12px]">{row.gatewayOrderId}</td>
                <td className="px-3 py-3 font-mono text-[12px]">{row.transId}</td>
                <td className="px-3 py-3">
                  {PAYMENT_METHOD_OPTIONS.find((p) => p.value === row.paymentMethod)?.label ?? row.paymentMethod}
                </td>
                <td className="px-3 py-3 text-[#666]">{row.paymentFinishTime ?? "-"}</td>
                <td className="px-3 py-3">{row.merchantId}</td>
                <td className="px-3 py-3">{row.channelCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-ops-border)] px-4 py-3 text-[13px] text-[#666]">
        <span>共 {filtered.length} 条</span>
        <div className="flex gap-1">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-3 py-1 disabled:opacity-40">上一页</button>
          <span className="min-w-[32px] rounded border border-[var(--primary)] bg-[var(--primary)] px-2 py-1 text-center text-white">{page}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1 disabled:opacity-40">下一页</button>
        </div>
      </div>
    </div>
  );
}
