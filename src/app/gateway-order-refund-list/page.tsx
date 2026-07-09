import { GatewayRefundList } from "@/components/ops/GatewayRefundList";
import { OpsLayout } from "@/components/ops/OpsLayout";

export default function GatewayOrderRefundListPage() {
  return (
    <OpsLayout breadcrumbs={["网关订单", "网关退款订单"]}>
      <GatewayRefundList />
    </OpsLayout>
  );
}
