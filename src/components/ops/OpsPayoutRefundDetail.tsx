"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DescriptionGrid,
  SectionCard,
  StatusBadge,
} from "@/components/ops/DescriptionGrid";
import { FullBeneficiaryModal } from "@/components/shared/FullBeneficiaryModal";
import { ManualPayoutBackfillModal } from "@/components/shared/ManualPayoutBackfillModal";
import { getOpsPayoutDetail, resolveFullBeneficiary } from "@/data/mock-ops-payout-details";
import { PAYOUT_REFUND_LIST_PATH } from "@/lib/ops-routes";
import {
  isPendingRefundStatus,
  showFullBeneficiaryAction,
  showManualPayoutSuccessAction,
  showPayoutFailureAction,
  showResendLinkAction,
} from "@/lib/payout-refund-actions";
import {
  CHANNEL_CODE_LABELS,
  FAILURE_TYPE_LABELS,
  INTERNAL_STATUS_COLORS,
  INTERNAL_STATUS_LABELS,
  LINK_DELIVERY_LABELS,
  REFUND_TYPE_LABELS,
} from "@/data/payout-refund-constants";
import type { ManualPayoutBackfillPayload } from "@/types/payout-refund";

const CURRENT_OPS_USER = "OPS-U001";

export function OpsPayoutRefundDetail({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams();
  const backPath = searchParams.get("backPath") ?? PAYOUT_REFUND_LIST_PATH;
  const [message, setMessage] = useState("");
  const [backfillOutcome, setBackfillOutcome] = useState<"SUCCESS" | "FAILURE" | null>(null);
  const [fullBeneficiaryOpen, setFullBeneficiaryOpen] = useState(false);

  const data = getOpsPayoutDetail(orderId);
  const fullBeneficiary = resolveFullBeneficiary(orderId, data);
  const canViewFullBeneficiary = showFullBeneficiaryAction(
    data.internalStatus,
    data.payoutMode,
    Boolean(data.beneficiary),
  );
  const selfInitiated = data.initiatorId === CURRENT_OPS_USER;

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
      notify(`已登记打款失败：${payload.failureReason}，退款单将置为 FAILURE，商户可再退一笔`);
    }
  };

  const handleResendLink = () => {
    notify("链接已补发给消费者（同 token）");
  };

  const baseItems = [
    { label: "退款单号", value: data.gatewayRefundOrderId },
    { label: "网关订单号", value: data.gatewayOrderId },
    { label: "退款方式", value: REFUND_TYPE_LABELS[data.refundType] },
    { label: "支付方式", value: data.paymentMethodLabel },
    {
      label: "内部状态",
      value: (
        <StatusBadge
          label={INTERNAL_STATUS_LABELS[data.internalStatus]}
          colorClass={INTERNAL_STATUS_COLORS[data.internalStatus]}
        />
      ),
    },
    {
      label: "对外状态",
      value: (
        <StatusBadge
          label={
            data.internalStatus === "SUCCESS"
              ? "成功"
              : data.internalStatus === "FAILURE"
                ? "失败"
                : "处理中"
          }
          colorClass={
            data.internalStatus === "SUCCESS"
              ? INTERNAL_STATUS_COLORS.SUCCESS
              : data.internalStatus === "FAILURE"
                ? INTERNAL_STATUS_COLORS.FAILURE
                : INTERNAL_STATUS_COLORS.PAYING
          }
        />
      ),
    },
    { label: "发起人", value: data.initiatorName ?? "-" },
    {
      label: "退款金额",
      value: `${data.refundTransAmount.amount} ${data.refundTransAmount.currency}`,
    },
    { label: "打款方式", value: data.payoutMode === "AUTO" ? "自动代付" : "人工打款" },
  ];

  const channelItems = data.channelPayout
    ? [
        { label: "渠道代付订单号", value: data.channelPayout.channelPayoutOrderId },
        {
          label: "渠道",
          value: CHANNEL_CODE_LABELS[data.channelPayout.channelCode] ?? data.channelPayout.channelCode,
        },
        { label: "打款完成时间", value: data.channelPayout.payoutCompletedAt ?? "-" },
        ...(data.channelPayout.operatorName
          ? [{ label: "回填人", value: data.channelPayout.operatorName }]
          : []),
        ...(data.channelPayout.backfillRemark
          ? [{ label: "回填备注", value: data.channelPayout.backfillRemark }]
          : []),
      ]
    : data.payoutMode === "MANUAL" && data.internalStatus === "PAYING"
      ? [{ label: "渠道代付订单号", value: "待运营线下打款后回填" }]
      : data.payoutMode === "AUTO" && data.internalStatus === "PAYING"
        ? [{ label: "渠道代付订单号", value: "Payloco 打款中，等待渠道回调…" }]
        : [];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href={backPath}>
          <Button variant="outline" className="h-[32px] border-[var(--color-ops-border)] px-3">
            <ArrowLeft className="mr-1.5 size-4" />
            返回
          </Button>
        </Link>
        <span className="text-[15px] font-medium text-[#333]">代付退款详情（OPS）</span>
      </div>

      {selfInitiated ? (
        <div className="rounded-[4px] border border-amber-200 bg-amber-50 px-4 py-2.5 text-[13px] text-amber-700">
          该退款由您发起，不能自行审核，需其他运营人员复核
        </div>
      ) : null}

      {message ? (
        <div className="rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
        <div className="border-b border-[var(--color-ops-border)] px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#333]">代付退款</h2>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <div className="flex flex-col gap-6">
          <SectionCard title="基本信息">
            <DescriptionGrid items={baseItems} columns={4} />
          </SectionCard>

          {channelItems.length > 0 ? (
            <SectionCard title="渠道打款信息">
              <DescriptionGrid items={channelItems} columns={3} />
              {data.payoutMode === "AUTO" ? (
                <p className="mt-3 text-[12px] text-[#999]">
                  自动代付：渠道订单号由 Payloco `payout/create` 响应及 `payout.result.notify` 回调写入。
                </p>
              ) : (
                <p className="mt-3 text-[12px] text-[#999]">
                  人工打款：运营线下完成打款后，通过「回填成功」录入渠道订单号与打款时间。
                </p>
              )}
            </SectionCard>
          ) : null}

          <SectionCard title="收款信息">
            <div className="space-y-3">
              {data.linkDeliveryType ? (
                <p className="text-[13px] text-[#666]">
                  链接发送方式：{LINK_DELIVERY_LABELS[data.linkDeliveryType]}
                </p>
              ) : null}
              {data.payoutLinkUrl ? (
                <div>
                  <p className="mb-1 text-[12px] text-[#999]">收款链接</p>
                  <code className="block rounded bg-[#f5f6fa] px-3 py-2 text-[12px] text-[var(--primary)]">
                    {data.payoutLinkUrl}
                  </code>
                </div>
              ) : null}
              {data.beneficiary ? (
                <>
                  <DescriptionGrid
                    items={[
                      { label: "收款人", value: data.beneficiary.beneficiaryName },
                      { label: "账号（脱敏）", value: data.beneficiary.accountNumberMasked },
                      { label: "银行/钱包", value: data.beneficiary.bankName ?? "-" },
                    ]}
                    columns={3}
                  />
                  {canViewFullBeneficiary ? (
                    <p className="rounded-[4px] border border-amber-200 bg-amber-50 px-3 py-2.5 text-[12px] text-amber-800">
                      人工打款：请先在底部操作栏查看完整账号，线下完成打款后回填结果。
                    </p>
                  ) : data.payoutMode === "MANUAL" ? (
                    <p className="text-[12px] text-[#999]">等待消费者通过收款链接填写账户</p>
                  ) : (
                    <p className="text-[12px] text-[#999]">
                      自动代付由系统传给渠道，运营无需查看完整账号
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[13px] text-[#999]">待消费者通过收款链接填写</p>
              )}
            </div>
          </SectionCard>

          {data.failureReason ? (
            <SectionCard title="失败信息">
              <div className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                {data.failureReason}
                {data.failureType ? ` — ${FAILURE_TYPE_LABELS[data.failureType]}` : ""}
              </div>
            </SectionCard>
          ) : null}
          </div>
        </div>

        {isPendingRefundStatus(data.internalStatus) ? (
        <div className="sticky bottom-0 z-10 flex shrink-0 items-center justify-end gap-2 overflow-x-auto border-t border-[var(--color-ops-border)] bg-white px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          {canViewFullBeneficiary ? (
            <Button
              className="h-[34px] shrink-0 bg-[var(--primary)] text-white hover:opacity-90"
              onClick={() => setFullBeneficiaryOpen(true)}
            >
              <Eye className="mr-1.5 size-4" />
              查看完整收款信息
            </Button>
          ) : null}
          {showResendLinkAction(data.internalStatus) ? (
            <Button
              variant="outline"
              className="h-[34px] shrink-0"
              onClick={handleResendLink}
            >
              <Send className="mr-1.5 size-4" />
              重发链接
            </Button>
          ) : null}
          {showManualPayoutSuccessAction(data.internalStatus, data.payoutMode) ? (
            <Button
              className="h-[34px] shrink-0 bg-emerald-600 text-white"
              onClick={() => setBackfillOutcome("SUCCESS")}
            >
              <Check className="mr-1.5 size-4" />
              确认打款成功
            </Button>
          ) : null}
          {showPayoutFailureAction(data.internalStatus) ? (
            <Button
              variant="outline"
              className="h-[34px] shrink-0 text-red-600"
              onClick={() => setBackfillOutcome("FAILURE")}
            >
              <X className="mr-1.5 size-4" />
              打款失败
            </Button>
          ) : null}
        </div>
        ) : null}
      </div>

      {fullBeneficiary && fullBeneficiaryOpen ? (
        <FullBeneficiaryModal
          open
          refundOrderId={data.gatewayRefundOrderId}
          beneficiary={fullBeneficiary}
          onClose={() => setFullBeneficiaryOpen(false)}
          onAuditLog={(id) => notify(`已记录查看完整收款信息审计：${id}`)}
        />
      ) : null}

      {backfillOutcome ? (
        <ManualPayoutBackfillModal
          open
          outcome={backfillOutcome}
          refundOrderId={data.gatewayRefundOrderId}
          refundAmount={data.refundTransAmount.amount}
          currency={data.refundTransAmount.currency}
          beneficiaryMasked={data.beneficiary?.accountNumberMasked}
          initialFailureReason={data.failureReason}
          onClose={() => setBackfillOutcome(null)}
          onSubmit={handleBackfillSubmit}
        />
      ) : null}
    </div>
  );
}
