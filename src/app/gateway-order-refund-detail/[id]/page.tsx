import { Suspense } from "react";
import { GatewayRefundDetail } from "@/components/ops/GatewayRefundDetail";
import { OpsLayout } from "@/components/ops/OpsLayout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GatewayOrderRefundDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <OpsLayout breadcrumbs={["网关订单", "网关退款订单", "网关订单详情"]}>
      <Suspense fallback={<div className="p-4 text-[#666]">加载中...</div>}>
        <GatewayRefundDetail orderId={id} />
      </Suspense>
    </OpsLayout>
  );
}
