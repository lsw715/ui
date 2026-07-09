import { OpsLayout } from "@/components/ops/OpsLayout";
import { OpsPayoutRefundDetail } from "@/components/ops/OpsPayoutRefundDetail";

export default async function OpsPayoutRefundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <OpsLayout breadcrumbs={["网关订单", "代付退款列表", "退款详情"]}>
      <OpsPayoutRefundDetail orderId={id} />
    </OpsLayout>
  );
}
