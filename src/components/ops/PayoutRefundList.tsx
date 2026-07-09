"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, ExternalLink, Eye, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullBeneficiaryModal } from "@/components/shared/FullBeneficiaryModal";
import { ManualPayoutBackfillModal } from "@/components/shared/ManualPayoutBackfillModal";
import { resolveFullBeneficiary } from "@/data/mock-ops-payout-details";
import {
  mockPayoutRefundList,
  PAYMENT_METHOD_OPTIONS,
} from "@/data/mock-refund-reviews";
import {
  CHANNEL_CODE_LABELS,
  FAILURE_TYPE_LABELS,
  INTERNAL_STATUS_COLORS,
  INTERNAL_STATUS_LABELS,
} from "@/data/payout-refund-constants";
import { PAYOUT_REFUND_LIST_PATH } from "@/lib/ops-routes";
import {
  showFullBeneficiaryAction,
  showManualPayoutSuccessAction,
  showPayoutFailureAction,
  showResendLinkAction,
} from "@/lib/payout-refund-actions";
import { cn } from "@/lib/utils";
import type {
  FullBeneficiary,
  InternalRefundStatus,
  ManualPayoutBackfillPayload,
} from "@/types/payout-refund";

type ListTab = "ALL" | "PENDING" | "SUCCESS" | "FAILURE";

const TERMINAL: InternalRefundStatus[] = ["SUCCESS", "FAILURE"];

function isPending(status: InternalRefundStatus) {
  return !TERMINAL.includes(status);
}

interface BackfillTarget {
  refundOrderId: string;
  amount: string;
  currency: string;
  beneficiaryMasked?: string;
  outcome: "SUCCESS" | "FAILURE";
  initialFailureReason?: string;
}

interface FullBeneficiaryTarget {
  refundOrderId: string;
  beneficiary: FullBeneficiary;
}

export function PayoutRefundList() {
  const [tab, setTab] = useState<ListTab>("ALL");
  const [message, setMessage] = useState("");
  const [backfillTarget, setBackfillTarget] = useState<BackfillTarget | null>(null);
  const [fullBeneficiaryTarget, setFullBeneficiaryTarget] =
    useState<FullBeneficiaryTarget | null>(null);

  const filtered = useMemo(() => {
    switch (tab) {
      case "PENDING":
        return mockPayoutRefundList.filter((r) => isPending(r.internalStatus));
      case "SUCCESS":
        return mockPayoutRefundList.filter((r) => r.internalStatus === "SUCCESS");
      case "FAILURE":
        return mockPayoutRefundList.filter((r) => r.internalStatus === "FAILURE");
      default:
        return mockPayoutRefundList;
    }
  }, [tab]);

  const notify = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleBackfillSubmit = (payload: ManualPayoutBackfillPayload) => {
    if (payload.outcome === "SUCCESS") {
      notify(
        `打款确认成功：渠道订单 ${payload.channelPayoutOrderId}，退款单将置为 SUCCESS`,
      );
    } else {
      notify(`已登记打款失败：${payload.failureReason}，退款单将置为 FAILURE`);
    }
  };

  const handleResendLink = (refundOrderId: string) => {
    notify(`${refundOrderId}：链接已补发给消费者`);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-ops-border)] px-4 py-3">
        {(
          [
            { key: "ALL", label: "全部" },
            { key: "PENDING", label: "待处理" },
            { key: "SUCCESS", label: "退款成功" },
            { key: "FAILURE", label: "退款失败" },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={cn(
              "rounded-[4px] px-4 py-1.5 text-[13px] transition-colors",
              tab === item.key
                ? "bg-[var(--primary)] text-white"
                : "bg-[#f5f6fa] text-[#666] hover:text-[var(--primary)]",
            )}
          >
            {item.label}
          </button>
        ))}
        {message ? <span className="ml-2 text-[13px] text-[var(--primary)]">{message}</span> : null}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1400px] border-collapse text-[13px]">
          <thead className="sticky top-0 bg-[var(--color-ops-table-header)]">
            <tr className="border-b border-[var(--color-ops-border)] text-left text-[#666]">
              <th className="px-3 py-3 font-medium">内部状态</th>
              <th className="px-3 py-3 font-medium">退款单号</th>
              <th className="px-3 py-3 font-medium">商户</th>
              <th className="px-3 py-3 font-medium">支付方式</th>
              <th className="px-3 py-3 font-medium">金额</th>
              <th className="px-3 py-3 font-medium">打款方式</th>
              <th className="px-3 py-3 font-medium">渠道订单号</th>
              <th className="px-3 py-3 font-medium">收款信息</th>
              <th className="px-3 py-3 font-medium">完成时间</th>
              <th className="px-3 py-3 font-medium">失败原因</th>
              <th className="min-w-[300px] px-3 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const status = row.internalStatus as InternalRefundStatus;
              const terminal = TERMINAL.includes(status);

              return (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-ops-border)] hover:bg-[#fafafa]"
                >
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded border px-2 py-0.5 text-[12px]",
                        INTERNAL_STATUS_COLORS[status],
                      )}
                    >
                      {INTERNAL_STATUS_LABELS[status]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/ops-payout-refund-detail/${row.refundOrderId}?backPath=${PAYOUT_REFUND_LIST_PATH}`}
                      className="inline-flex items-center gap-1 font-mono text-[12px] text-[var(--primary)] hover:underline"
                    >
                      {row.refundOrderId}
                      <ExternalLink className="size-3" />
                    </Link>
                  </td>
                  <td className="px-3 py-3">{row.merchantName}</td>
                  <td className="px-3 py-3">
                    {PAYMENT_METHOD_OPTIONS.find((p) => p.value === row.paymentMethod)?.label ??
                      row.paymentMethod}
                  </td>
                  <td className="px-3 py-3 font-medium">
                    {row.refundTransAmount.amount} {row.refundTransAmount.currency}
                  </td>
                  <td className="px-3 py-3">
                    {row.payoutMode === "AUTO" ? "自动代付" : "人工打款"}
                  </td>
                  <td className="px-3 py-3 font-mono text-[12px] text-[#666]">
                    {row.channelPayoutOrderId ? (
                      <div>
                        <div>{row.channelPayoutOrderId}</div>
                        {row.channelCode ? (
                          <div className="text-[11px] text-[#999]">
                            {CHANNEL_CODE_LABELS[row.channelCode] ?? row.channelCode}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <span className="text-[#bbb]">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-[#666]">{row.beneficiaryMasked ?? "待消费者填写"}</td>
                  <td className="px-3 py-3 text-[#666]">{row.completedTime ?? "—"}</td>
                  <td className="px-3 py-3">
                    {row.failureReason ? (
                      <span className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="size-3.5 shrink-0" />
                        {row.failureReason}
                        {row.failureType ? (
                          <span className="text-[11px] text-[#999]">
                            （{FAILURE_TYPE_LABELS[row.failureType]}）
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex max-w-[360px] items-center gap-1.5 overflow-x-auto">
                      <Link
                        href={`/ops-payout-refund-detail/${row.refundOrderId}?backPath=${PAYOUT_REFUND_LIST_PATH}`}
                        className="inline-flex h-7 shrink-0 items-center rounded-[4px] border border-[var(--color-ops-border)] bg-white px-2.5 text-[12px] text-[#333] hover:bg-[#fafafa]"
                      >
                        <Eye className="mr-1 size-3" />
                        详情
                      </Link>
                      {!terminal ? (
                        <>
                          {showFullBeneficiaryAction(
                            status,
                            row.payoutMode,
                            Boolean(row.beneficiaryMasked),
                          ) ? (
                            <Button
                              size="sm"
                              className="h-7 shrink-0 bg-[var(--primary)] px-2 text-[12px] text-white hover:opacity-90"
                              onClick={() => {
                                const beneficiary = resolveFullBeneficiary(row.refundOrderId);
                                if (beneficiary) {
                                  setFullBeneficiaryTarget({
                                    refundOrderId: row.refundOrderId,
                                    beneficiary,
                                  });
                                }
                              }}
                            >
                              <Eye className="mr-1 size-3" />
                              收款信息
                            </Button>
                          ) : null}
                          {showResendLinkAction(status) ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 shrink-0 px-2 text-[12px]"
                              onClick={() => handleResendLink(row.refundOrderId)}
                            >
                              <Send className="mr-1 size-3" />
                              重发
                            </Button>
                          ) : null}
                          {showManualPayoutSuccessAction(status, row.payoutMode) ? (
                            <Button
                              size="sm"
                              className="h-7 shrink-0 bg-emerald-600 px-2 text-[12px] text-white hover:bg-emerald-700"
                              onClick={() =>
                                setBackfillTarget({
                                  refundOrderId: row.refundOrderId,
                                  amount: row.refundTransAmount.amount,
                                  currency: row.refundTransAmount.currency,
                                  beneficiaryMasked: row.beneficiaryMasked,
                                  outcome: "SUCCESS",
                                })
                              }
                            >
                              <Check className="mr-1 size-3" />
                              打款成功
                            </Button>
                          ) : null}
                          {showPayoutFailureAction(status) ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 shrink-0 px-2 text-[12px] text-red-600"
                              onClick={() =>
                                setBackfillTarget({
                                  refundOrderId: row.refundOrderId,
                                  amount: row.refundTransAmount.amount,
                                  currency: row.refundTransAmount.currency,
                                  beneficiaryMasked: row.beneficiaryMasked,
                                  outcome: "FAILURE",
                                  initialFailureReason: row.failureReason,
                                })
                              }
                            >
                              <X className="mr-1 size-3" />
                              打款失败
                            </Button>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {fullBeneficiaryTarget ? (
        <FullBeneficiaryModal
          open
          refundOrderId={fullBeneficiaryTarget.refundOrderId}
          beneficiary={fullBeneficiaryTarget.beneficiary}
          onClose={() => setFullBeneficiaryTarget(null)}
          onAuditLog={(id) => notify(`已记录查看完整收款信息审计：${id}`)}
        />
      ) : null}

      {backfillTarget ? (
        <ManualPayoutBackfillModal
          open
          outcome={backfillTarget.outcome}
          refundOrderId={backfillTarget.refundOrderId}
          refundAmount={backfillTarget.amount}
          currency={backfillTarget.currency}
          beneficiaryMasked={backfillTarget.beneficiaryMasked}
          initialFailureReason={backfillTarget.initialFailureReason}
          onClose={() => setBackfillTarget(null)}
          onSubmit={handleBackfillSubmit}
        />
      ) : null}
    </div>
  );
}

/** @deprecated 使用 PayoutRefundList */
export const RefundTodoList = PayoutRefundList;
