"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DescriptionGrid,
  SectionCard,
  StatusBadge,
} from "@/components/ops/DescriptionGrid";
import {
  mockMpsRefundDetail,
  MPS_STATUS_COLORS,
  MPS_STATUS_LABELS,
  PAYMENT_METHOD_OPTIONS,
} from "@/data/mock-mps-orders";
import {
  LINK_DELIVERY_LABELS,
  REFUND_TYPE_LABELS,
} from "@/data/payout-refund-constants";
import type { MpsRefundDetail as MpsRefundDetailType } from "@/types/mps-order";

interface MpsRefundDetailProps {
  orderId: string;
  detail?: MpsRefundDetailType;
}

export function MpsRefundDetail({
  orderId,
  detail = mockMpsRefundDetail,
}: MpsRefundDetailProps) {
  const data = { ...detail, gatewayRefundOrderId: orderId || detail.gatewayRefundOrderId };
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    if (!data.payoutLinkUrl) return;
    await navigator.clipboard.writeText(data.payoutLinkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseItems = [
    { label: "PayKKa退款订单号", value: data.gatewayRefundOrderId },
    { label: "商户退款订单号", value: data.refundTransId },
    {
      label: "退款方式",
      value: REFUND_TYPE_LABELS[data.refundType],
    },
    {
      label: "PayKKa订单号",
      value: (
        <Link
          href={`/order/transaction-detail/${data.gatewayOrderId}?businessType=${data.businessType}`}
          className="text-[var(--primary)] hover:underline"
        >
          {data.gatewayOrderId}
        </Link>
      ),
    },
    { label: "商户订单号", value: data.transId },
    { label: "商户号", value: data.merchantId },
    { label: "商户名", value: data.merchantName },
    { label: "退款创建时间", value: data.utcCreateTime },
    { label: "退款完成时间", value: data.utcRefundFinishTime ?? "-" },
  ];

  const statusItems = [
    {
      label: "退款状态",
      value: (
        <StatusBadge
          label={MPS_STATUS_LABELS[data.status] ?? data.status}
          colorClass={MPS_STATUS_COLORS[data.status] ?? ""}
        />
      ),
    },
    { label: "状态码", value: data.errorCode ?? "-" },
    { label: "状态描述", value: data.errorDescription ?? "-", span: 4 },
  ];

  const transactionItems = [
    {
      label: "退款金额",
      value: `${data.refundTransAmount.amount} ${data.refundTransAmount.currency}`,
    },
    {
      label: "支付方式",
      value:
        PAYMENT_METHOD_OPTIONS.find((p) => p.value === data.paymentMethod)?.label ??
        data.paymentMethod,
    },
    { label: "支付类型", value: data.paymentType },
    { label: "产品编码", value: data.productCode },
    { label: "退款原因", value: data.reason, span: 4 },
  ];

  const showPayoutSection = data.refundType === "PAYOUT_LINK";
  const showLink = Boolean(data.payoutLinkUrl);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/order/refund-list">
          <Button variant="outline" className="h-[32px] border-[#e0e0e6] px-3">
            <ArrowLeft className="mr-1.5 size-4" />
            返回
          </Button>
        </Link>
        <span className="text-[15px] font-medium text-[#333]">退款订单详情</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-[6px] bg-white shadow-sm">
        <div className="border-b border-[#e8e8ef] px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#333]">退款订单</h2>
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

          {showPayoutSection ? (
            <SectionCard title="代付退款进度">
              <div className="space-y-4">
                {data.linkDeliveryType ? (
                  <p className="text-[13px] text-[#666]">
                    链接发送方式：{LINK_DELIVERY_LABELS[data.linkDeliveryType]}
                  </p>
                ) : null}

                {showLink ? (
                  <div className="rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] p-4">
                    <p className="mb-2 text-[13px] text-[#666]">收款链接</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 truncate rounded bg-white px-3 py-2 text-[12px] text-[var(--primary)]">
                        {data.payoutLinkUrl}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyLink}
                        className="shrink-0"
                      >
                        {copied ? (
                          <Check className="mr-1 size-4 text-emerald-600" />
                        ) : (
                          <Copy className="mr-1 size-4" />
                        )}
                        复制
                      </Button>
                    </div>
                    {data.linkDeliveryType === "LINK_ONLY" ? (
                      <p className="mt-2 text-[12px] text-amber-600">
                        请自行将链接转发给消费者；补发链接请联系运营
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-[13px] text-[#999]">
                    审核通过后将生成收款链接并发送给消费者
                  </p>
                )}

                {data.beneficiary ? (
                  <DescriptionGrid
                    items={[
                      { label: "收款人", value: data.beneficiary.beneficiaryName },
                      {
                        label: "账户类型",
                        value: data.beneficiary.accountType === "BANK" ? "银行账户" : "钱包",
                      },
                      {
                        label: "账号",
                        value: data.beneficiary.accountNumberMasked,
                      },
                      {
                        label: data.beneficiary.accountType === "BANK" ? "银行" : "钱包品牌",
                        value:
                          data.beneficiary.bankName ??
                          data.beneficiary.walletBrand ??
                          "-",
                      },
                    ]}
                    columns={2}
                  />
                ) : null}
              </div>
            </SectionCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
