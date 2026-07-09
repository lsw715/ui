"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DescriptionGrid, SectionCard, StatusBadge } from "@/components/ops/DescriptionGrid";
import { RefundModal } from "@/components/shared/RefundModal";
import {
  mockGatewayDetail,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from "@/data/mock-gateway-detail";
import { REFUND_STATUS_COLORS, REFUND_STATUS_LABELS } from "@/data/mock-refund-orders";
import { cn } from "@/lib/utils";
import type { GatewayDetailData } from "@/types/gateway-detail";

interface GatewayRefundDetailProps {
  orderId: string;
  detail?: GatewayDetailData;
}

export function GatewayRefundDetail({ orderId, detail = mockGatewayDetail }: GatewayRefundDetailProps) {
  const searchParams = useSearchParams();
  const backPath = searchParams.get("backPath") ?? "/gateway-order-refund-list";
  const defaultTab = searchParams.get("type") === "2" ? "refund" : "payment";
  const [activeTab, setActiveTab] = useState<"payment" | "refund">(
    defaultTab as "payment" | "refund",
  );
  const [refundOpen, setRefundOpen] = useState(false);
  const [message, setMessage] = useState("");

  const data = { ...detail, gatewayOrderId: orderId || detail.gatewayOrderId };

  const baseItems = [
    { label: "网关订单号", value: data.gatewayOrderId },
    { label: "商户订单号", value: data.transId },
    { label: "支付创建时间", value: data.paymentTime },
    { label: "支付完成时间", value: data.paymentFinishTime },
    { label: "商户号", value: data.merchantId },
    { label: "商户名", value: data.merchantName },
  ];

  const statusItems = [
    {
      label: "订单状态",
      value: (
        <StatusBadge
          label={ORDER_STATUS_LABELS[data.orderStatus] ?? data.orderStatus}
          colorClass={ORDER_STATUS_COLORS[data.orderStatus] ?? ""}
        />
      ),
    },
    { label: "网关订单状态码", value: data.errorCode ?? "-" },
    { label: "网关订单描述", value: data.errorDescription ?? "-", span: 4 },
    { label: "争议状态", value: data.disputeStatus === "NONE" ? "无" : data.disputeStatus },
  ];

  const transactionItems = [
    { label: "交易金额", value: `${data.transAmount.amount} ${data.transAmount.currency}` },
    {
      label: "请款金额",
      value: data.captureAmount
        ? `${data.captureAmount.amount} ${data.captureAmount.currency}`
        : "-",
      display: Boolean(data.captureAmount),
    },
    { label: "渠道编码", value: data.channelCode },
    { label: "MID", value: data.mid },
    { label: "支付方式", value: data.paymentMethod },
    { label: "产品编码", value: data.productCode },
    { label: "支付类型", value: data.paymentType },
    { label: "用户ID", value: data.shopperReference },
    { label: "MCC", value: data.mcc },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href={backPath}>
          <Button variant="outline" className="h-[32px] border-[var(--color-ops-border)] px-3">
            <ArrowLeft className="mr-1.5 size-4" />
            返回
          </Button>
        </Link>
        <span className="text-[15px] font-medium text-[#333]">网关订单详情</span>
      </div>

      {message ? (
        <div className="rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col rounded-[4px] bg-white shadow-sm">
        <div className="border-b border-[var(--color-ops-border)] px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#333]">网关</h2>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto p-5">
          <div className="flex flex-col gap-6">
            <SectionCard title="基本信息">
              <DescriptionGrid items={baseItems} />
            </SectionCard>
            <SectionCard title="状态">
              <DescriptionGrid items={statusItems} columns={4} />
            </SectionCard>
            <SectionCard title="交易信息">
              <DescriptionGrid items={transactionItems} />
            </SectionCard>
          </div>

          <div className="border-t border-[var(--color-ops-border)] pt-4">
            <div className="mb-4 flex gap-0 border-b border-[var(--color-ops-border)]">
              {(["payment", "refund"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "border-b-2 px-5 py-2.5 text-[14px] transition-colors",
                    activeTab === tab
                      ? "border-[var(--primary)] font-medium text-[var(--primary)]"
                      : "border-transparent text-[#666] hover:text-[var(--primary)]",
                  )}
                >
                  {tab === "payment" ? "支付" : "退款"}
                </button>
              ))}
            </div>

            {activeTab === "payment" ? (
              <div className="overflow-auto">
                <table className="w-full min-w-[1100px] border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-ops-border)] bg-[var(--color-ops-table-header)] text-left text-[#666]">
                      <th className="px-3 py-3 font-medium">支付订单号</th>
                      <th className="px-3 py-3 font-medium">支付状态</th>
                      <th className="px-3 py-3 font-medium">请款/支付金额</th>
                      <th className="px-3 py-3 font-medium">授权金额</th>
                      <th className="px-3 py-3 font-medium">支付创建时间</th>
                      <th className="px-3 py-3 font-medium">支付方式</th>
                      <th className="px-3 py-3 font-medium">渠道编码</th>
                      <th className="px-3 py-3 font-medium">MID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.paymentOrders.map((row) => (
                      <tr
                        key={row.paymentOrderId}
                        className="border-b border-[var(--color-ops-border)] hover:bg-[#fafafa]"
                      >
                        <td className="px-3 py-3 font-mono text-[12px]">{row.paymentOrderId}</td>
                        <td className="px-3 py-3">
                          <StatusBadge
                            label={ORDER_STATUS_LABELS[row.status] ?? row.status}
                            colorClass={ORDER_STATUS_COLORS[row.status] ?? ""}
                          />
                        </td>
                        <td className="px-3 py-3">
                          {row.amount.amount} {row.amount.currency}
                        </td>
                        <td className="px-3 py-3">
                          {row.authAmount
                            ? `${row.authAmount.amount} ${row.authAmount.currency}`
                            : "-"}
                        </td>
                        <td className="px-3 py-3 text-[#666]">{row.utcCreateTime}</td>
                        <td className="px-3 py-3">{row.paymentMethod}</td>
                        <td className="px-3 py-3">{row.channelCode}</td>
                        <td className="px-3 py-3">{row.mid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="w-full min-w-[1000px] border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-ops-border)] bg-[var(--color-ops-table-header)] text-left text-[#666]">
                      <th className="px-3 py-3 font-medium">退款订单号</th>
                      <th className="px-3 py-3 font-medium">商户退款订单号</th>
                      <th className="px-3 py-3 font-medium">退款状态</th>
                      <th className="px-3 py-3 font-medium">退款金额</th>
                      <th className="px-3 py-3 font-medium">退款创建时间</th>
                      <th className="px-3 py-3 font-medium">退款完成时间</th>
                      <th className="px-3 py-3 font-medium">退款原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.refundOrders.map((row) => (
                      <tr
                        key={row.gatewayRefundOrderId}
                        className="border-b border-[var(--color-ops-border)] hover:bg-[#fafafa]"
                      >
                        <td className="px-3 py-3 font-mono text-[12px]">
                          {row.gatewayRefundOrderId}
                        </td>
                        <td className="px-3 py-3 font-mono text-[12px]">{row.refundTransId}</td>
                        <td className="px-3 py-3">
                          <StatusBadge
                            label={REFUND_STATUS_LABELS[row.status] ?? row.status}
                            colorClass={REFUND_STATUS_COLORS[row.status] ?? ""}
                          />
                        </td>
                        <td className="px-3 py-3 font-medium">
                          {row.refundAmount.amount} {row.refundAmount.currency}
                        </td>
                        <td className="px-3 py-3 text-[#666]">{row.utcCreateTime}</td>
                        <td className="px-3 py-3 text-[#666]">
                          {row.utcRefundFinishTime ?? "-"}
                        </td>
                        <td className="px-3 py-3 text-[#666]">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--color-ops-border)] px-5 py-4">
          <Button
            className="h-[34px] bg-[var(--primary)] px-5 text-white hover:bg-[#4338ca]"
            onClick={() => setRefundOpen(true)}
          >
            退款
          </Button>
        </div>
      </div>

      <RefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        gatewayOrderId={data.gatewayOrderId}
        transId={data.transId}
        paymentMethodLabel={data.paymentMethod}
        refundableAmount={data.transAmount}
        onSubmit={() => setMessage("退款申请已提交，等待审核。")}
      />
    </div>
  );
}
