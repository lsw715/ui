"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DescriptionGrid,
  SectionCard,
  StatusBadge,
} from "@/components/ops/DescriptionGrid";
import { MpsLayout } from "@/components/mps/MpsLayout";
import { RefundModal } from "@/components/shared/RefundModal";
import {
  mockMpsRefundDetail,
  mockMpsTransactionDetail,
  MPS_STATUS_COLORS,
  MPS_STATUS_LABELS,
  PAYMENT_METHOD_OPTIONS,
} from "@/data/mock-mps-orders";
import { REFUND_STRATEGY_LABELS, REFUND_TYPE_LABELS } from "@/data/payout-refund-constants";
import type { MpsTransactionDetail as MpsTransactionDetailType } from "@/types/mps-order";

interface MpsTransactionDetailProps {
  orderId: string;
  detail?: MpsTransactionDetailType;
}

export function MpsTransactionDetail({
  orderId,
  detail = mockMpsTransactionDetail,
}: MpsTransactionDetailProps) {
  const data = { ...detail, gatewayOrderId: orderId || detail.gatewayOrderId };
  const [refundOpen, setRefundOpen] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const paymentLabel =
    PAYMENT_METHOD_OPTIONS.find((p) => p.value === data.paymentMethod)?.label ??
    data.paymentMethod;

  const baseItems = [
    { label: "PayKKa订单号", value: data.gatewayOrderId },
    { label: "商户订单号", value: data.transId },
    { label: "交易创建时间", value: data.utcCreateTime },
    { label: "交易完成时间", value: data.utcPaymentFinishTime ?? "-" },
    { label: "商户号", value: data.merchantId },
    { label: "商户名", value: data.merchantName },
    { label: "终端号", value: data.termNo },
    { label: "商户产品", value: data.merchantProductName },
  ];

  const statusItems = [
    {
      label: "订单状态",
      value: (
        <StatusBadge
          label={MPS_STATUS_LABELS[data.status] ?? data.status}
          colorClass={MPS_STATUS_COLORS[data.status] ?? ""}
        />
      ),
    },
    { label: "状态码", value: data.errorCode ?? "-" },
    { label: "状态描述", value: data.errorDescription ?? "-", span: 4 },
    { label: "备注", value: data.remark ?? "-", span: 4, display: Boolean(data.remark) },
  ];

  const transactionItems = [
    {
      label: "交易金额",
      value: `${data.transAmount.amount} ${data.transAmount.currency}`,
    },
    {
      label: "订单金额",
      value: `${data.orderAmount.amount} ${data.orderAmount.currency}`,
    },
    {
      label: "请款金额",
      value: data.captureAmount
        ? `${data.captureAmount.amount} ${data.captureAmount.currency}`
        : "-",
      display: Boolean(data.captureAmount),
    },
    {
      label: "手续费",
      value: data.fee ? `${data.fee.amount} ${data.fee.currency}` : "-",
      display: Boolean(data.fee),
    },
    {
      label: "可退金额",
      value: `${data.refundableAmount.amount} ${data.refundableAmount.currency}`,
    },
    {
      label: "退款策略",
      value: REFUND_STRATEGY_LABELS[data.refundStrategy],
    },
    {
      label: "支付方式",
      value: paymentLabel,
    },
    { label: "渠道编码", value: data.channelCode },
    { label: "卡号", value: data.cardNo || "-", display: Boolean(data.cardNo) },
  ];

  const relatedRefunds = [
    {
      gatewayRefundOrderId: mockMpsRefundDetail.gatewayRefundOrderId,
      refundTransId: mockMpsRefundDetail.refundTransId,
      status: mockMpsRefundDetail.status,
      refundType: mockMpsRefundDetail.refundType,
      amount: mockMpsRefundDetail.refundTransAmount,
      utcCreateTime: mockMpsRefundDetail.utcCreateTime,
      utcRefundFinishTime: mockMpsRefundDetail.utcRefundFinishTime,
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/order/transaction-list">
          <Button variant="outline" className="h-[32px] border-[#e0e0e6] px-3">
            <ArrowLeft className="mr-1.5 size-4" />
            返回
          </Button>
        </Link>
        <span className="text-[15px] font-medium text-[#333]">交易订单详情</span>
      </div>

      {submitMsg ? (
        <div className="rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-700">
          {submitMsg}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col rounded-[6px] bg-white shadow-sm">
        <div className="border-b border-[#e8e8ef] px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#333]">交易订单</h2>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto p-5">
          <SectionCard title="基本信息">
            <DescriptionGrid items={baseItems} />
          </SectionCard>
          <SectionCard title="状态">
            <DescriptionGrid items={statusItems} columns={4} />
          </SectionCard>
          <SectionCard title="交易信息">
            <DescriptionGrid items={transactionItems} />
          </SectionCard>

          <SectionCard title="关联退款">
            <div className="overflow-auto">
              <table className="w-full min-w-[1000px] border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-[#e8e8ef] bg-[#fafafa] text-left text-[#666]">
                    <th className="px-3 py-3 font-medium">PayKKa退款订单号</th>
                    <th className="px-3 py-3 font-medium">退款方式</th>
                    <th className="px-3 py-3 font-medium">退款状态</th>
                    <th className="px-3 py-3 font-medium">退款金额</th>
                    <th className="px-3 py-3 font-medium">退款创建时间</th>
                    <th className="px-3 py-3 font-medium">退款完成时间</th>
                  </tr>
                </thead>
                <tbody>
                  {relatedRefunds.map((row) => (
                    <tr key={row.gatewayRefundOrderId} className="border-b border-[#e8e8ef] hover:bg-[#fafafa]">
                      <td className="px-3 py-3">
                        <Link
                          href={`/order/refund-detail/${row.gatewayRefundOrderId}?businessType=${data.businessType}`}
                          className="font-mono text-[12px] text-[var(--primary)] hover:underline"
                        >
                          {row.gatewayRefundOrderId}
                        </Link>
                      </td>
                      <td className="px-3 py-3">{REFUND_TYPE_LABELS[row.refundType]}</td>
                      <td className="px-3 py-3">
                        <StatusBadge
                          label={MPS_STATUS_LABELS[row.status] ?? row.status}
                          colorClass={MPS_STATUS_COLORS[row.status] ?? ""}
                        />
                      </td>
                      <td className="px-3 py-3 font-medium">
                        {row.amount.amount} {row.amount.currency}
                      </td>
                      <td className="px-3 py-3 text-[#666]">{row.utcCreateTime}</td>
                      <td className="px-3 py-3 text-[#666]">{row.utcRefundFinishTime ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {data.showRefundBtnFlag && data.refundStrategy !== "NOT_SUPPORTED" ? (
          <div className="flex justify-end gap-3 border-t border-[#e8e8ef] px-5 py-4">
            <Button
              className="h-[34px] bg-[var(--primary)] px-5 text-white hover:bg-[#4338ca]"
              onClick={() => setRefundOpen(true)}
            >
              退款
            </Button>
          </div>
        ) : data.refundStrategy === "NOT_SUPPORTED" ? (
          <div className="border-t border-[#e8e8ef] px-5 py-4 text-right text-[13px] text-[#999]">
            该订单不支持退款
          </div>
        ) : null}
      </div>

      <RefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        gatewayOrderId={data.gatewayOrderId}
        transId={data.transId}
        paymentMethod={data.paymentMethod}
        paymentMethodLabel={paymentLabel}
        refundableAmount={data.refundableAmount}
        requirePayPassword
        requireBeneficiary={data.refundStrategy === "PAYOUT"}
        payoutHint={
          data.refundStrategy === "PAYOUT"
            ? "本单走代付退款：请向消费者收集收款账户后一并填写，审核通过后将直接打款。"
            : data.refundStrategy === "PAYOUT_LINK"
              ? "本单将走代付退款，审核通过后系统自动向消费者发送收款链接。"
              : undefined
        }
        onSubmit={(payload) => {
          const masked = payload.beneficiary?.accountNumber
            ? `****${payload.beneficiary.accountNumber.slice(-4)}`
            : "";
          setSubmitMsg(
            payload.beneficiary
              ? `退款申请已提交（收款人 ${payload.beneficiary.beneficiaryName} ${masked}），等待审核。`
              : "退款申请已提交，等待审核。",
          );
        }}
      />
    </div>
  );
}
