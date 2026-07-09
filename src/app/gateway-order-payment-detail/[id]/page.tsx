import { GatewayPaymentDetail } from "@/components/ops/GatewayPaymentDetail";
import { OpsLayout } from "@/components/ops/OpsLayout";

export default async function GatewayOrderPaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <OpsLayout breadcrumbs={["网关订单", "网关支付订单", "订单详情"]}>
      <GatewayPaymentDetail orderId={id} />
    </OpsLayout>
  );
}
