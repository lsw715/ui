"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Eye, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CURRENCY_OPTIONS,
  mockMpsRefunds,
  MPS_STATUS_COLORS,
  MPS_STATUS_LABELS,
  PAYMENT_METHOD_OPTIONS,
} from "@/data/mock-mps-orders";
import { REFUND_TYPE_LABELS } from "@/data/payout-refund-constants";
import { cn } from "@/lib/utils";
import type { MpsListFilters } from "@/types/mps-order";

const PAGE_SIZE = 10;

function defaultFilters(): MpsListFilters {
  return {
    commonKeyWord: "",
    timeStart: "",
    timeEnd: "",
    transId: "",
    gatewayOrderId: "",
    gatewayRefundOrderId: "",
    refundTransId: "",
    paymentMethod: "",
    status: "",
    currency: "",
    billEmail: "",
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[13px] text-[#666]">{children}</label>;
}

function Input({
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[34px] w-full rounded-[4px] border border-[#e0e0e6] bg-white px-3 text-[14px] outline-none focus:border-[var(--primary)]"
    />
  );
}

function Select({
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
      className="h-[34px] w-full rounded-[4px] border border-[#e0e0e6] bg-white px-3 text-[14px] outline-none focus:border-[var(--primary)]"
    >
      <option value="">请选择</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function MpsRefundList() {
  const [filters, setFilters] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [exportMsg, setExportMsg] = useState("");

  const filtered = useMemo(() => {
    return mockMpsRefunds.filter((row) => {
      if (applied.commonKeyWord) {
        const kw = applied.commonKeyWord.toLowerCase();
        const hay = `${row.refundTransId} ${row.gatewayRefundOrderId} ${row.gatewayOrderId}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      if (applied.refundTransId && !row.refundTransId.includes(applied.refundTransId)) return false;
      if (applied.gatewayRefundOrderId && !row.gatewayRefundOrderId.includes(applied.gatewayRefundOrderId)) return false;
      if (applied.gatewayOrderId && !row.gatewayOrderId.includes(applied.gatewayOrderId)) return false;
      if (applied.transId && !row.gatewayOrderId.includes(applied.transId)) return false;
      if (applied.paymentMethod && row.paymentMethod !== applied.paymentMethod) return false;
      if (applied.status && row.status !== applied.status) return false;
      if (applied.currency && row.refundTransAmount.currency !== applied.currency) return false;
      return true;
    });
  }, [applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const set = <K extends keyof MpsListFilters>(k: K, v: MpsListFilters[K]) =>
    setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[6px] bg-white shadow-sm">
      <div className="border-b border-[#e8e8ef] p-4">
        <div className="mb-3">
          <FieldLabel>全局搜索</FieldLabel>
          <Input
            value={filters.commonKeyWord}
            onChange={(v) => set("commonKeyWord", v)}
            placeholder="订单号 / 退款单号"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <FieldLabel>退款完成时间</FieldLabel>
            <div className="flex items-center gap-2">
              <input type="date" className="h-[34px] flex-1 rounded-[4px] border border-[#e0e0e6] px-2 text-[13px]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="h-[34px] flex-1 rounded-[4px] border border-[#e0e0e6] px-2 text-[13px]" />
            </div>
          </div>
          <div>
            <FieldLabel>商户退款订单号</FieldLabel>
            <Input value={filters.refundTransId} onChange={(v) => set("refundTransId", v)} />
          </div>
          <div>
            <FieldLabel>PayKKa退款订单号</FieldLabel>
            <Input value={filters.gatewayRefundOrderId} onChange={(v) => set("gatewayRefundOrderId", v)} />
          </div>
          <div>
            <FieldLabel>PayKKa订单号</FieldLabel>
            <Input value={filters.gatewayOrderId} onChange={(v) => set("gatewayOrderId", v)} />
          </div>
          <div>
            <FieldLabel>商户订单号</FieldLabel>
            <Input value={filters.transId} onChange={(v) => set("transId", v)} />
          </div>
          <div>
            <FieldLabel>支付方式</FieldLabel>
            <Select value={filters.paymentMethod} onChange={(v) => set("paymentMethod", v)} options={PAYMENT_METHOD_OPTIONS} />
          </div>
          <div>
            <FieldLabel>退款状态</FieldLabel>
            <Select
              value={filters.status}
              onChange={(v) => set("status", v)}
              options={Object.entries(MPS_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div>
            <FieldLabel>币种</FieldLabel>
            <Select value={filters.currency} onChange={(v) => set("currency", v)} options={CURRENCY_OPTIONS.map((c) => ({ value: c, label: c }))} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => { setApplied(filters); setPage(1); }} className="h-[34px] bg-[var(--primary)] px-5 text-white">
            <Search className="mr-1.5 size-4" />查询
          </Button>
          <Button variant="outline" onClick={() => { const d = defaultFilters(); setFilters(d); setApplied(d); setPage(1); }} className="h-[34px]">
            <RotateCcw className="mr-1.5 size-4" />重置
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#e8e8ef] px-4 py-3">
        <Button
          variant="outline"
          className="h-[32px] border-[var(--primary)] text-[var(--primary)]"
          onClick={() => { setExportMsg("导出任务已提交"); setTimeout(() => setExportMsg(""), 3000); }}
        >
          <Download className="mr-1.5 size-4" />导出
        </Button>
        {exportMsg ? <span className="text-[13px] text-[var(--primary)]">{exportMsg}</span> : null}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1100px] border-collapse text-[13px]">
          <thead className="sticky top-0 bg-[#fafafa]">
            <tr className="border-b border-[#e8e8ef] text-left text-[#666]">
              <th className="w-[50px] px-3 py-3">操作</th>
              <th className="px-3 py-3">退款金额</th>
              <th className="px-3 py-3">退款方式</th>
              <th className="px-3 py-3">退款状态</th>
              <th className="px-3 py-3">退款创建时间</th>
              <th className="px-3 py-3">商户退款订单号</th>
              <th className="w-[200px] px-3 py-3">PayKKa退款订单号</th>
              <th className="px-3 py-3">支付方式</th>
              <th className="px-3 py-3">退款完成时间</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.gatewayRefundOrderId} className="border-b border-[#e8e8ef] hover:bg-[#fafafa]">
                <td className="px-3 py-3">
                  <Link
                    href={`/order/refund-detail/${row.gatewayRefundOrderId}?businessType=${row.businessType}`}
                    className="flex size-7 items-center justify-center rounded text-[var(--primary)] hover:bg-[#f0f0fc]"
                  >
                    <Eye className="size-4" />
                  </Link>
                </td>
                <td className="px-3 py-3 font-medium">{row.refundTransAmount.amount} {row.refundTransAmount.currency}</td>
                <td className="px-3 py-3">{REFUND_TYPE_LABELS[row.refundType]}</td>
                <td className="px-3 py-3">
                  <span className={cn("inline-flex rounded border px-2 py-0.5 text-[12px]", MPS_STATUS_COLORS[row.status])}>
                    {MPS_STATUS_LABELS[row.status]}
                  </span>
                </td>
                <td className="px-3 py-3 text-[#666]">{row.utcCreateTime}</td>
                <td className="px-3 py-3 font-mono text-[12px]">{row.refundTransId}</td>
                <td className="px-3 py-3 font-mono text-[12px]">{row.gatewayRefundOrderId}</td>
                <td className="px-3 py-3">{PAYMENT_METHOD_OPTIONS.find((p) => p.value === row.paymentMethod)?.label ?? row.paymentMethod}</td>
                <td className="px-3 py-3 text-[#666]">{row.utcRefundFinishTime ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#e8e8ef] px-4 py-3 text-[13px] text-[#666]">
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
