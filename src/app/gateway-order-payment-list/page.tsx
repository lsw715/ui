import { GatewayPaymentList } from "@/components/ops/GatewayPaymentList";
import { OpsLayout } from "@/components/ops/OpsLayout";

export default function GatewayOrderPaymentListPage() {
  return (
    <OpsLayout breadcrumbs={["网关订单", "网关支付订单"]}>
      <GatewayPaymentList />
    </OpsLayout>
  );
}
