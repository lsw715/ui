import { OpsLayout } from "@/components/ops/OpsLayout";
import { PayoutRefundList } from "@/components/ops/PayoutRefundList";

export default function PayoutRefundListPage() {
  return (
    <OpsLayout breadcrumbs={["网关订单", "代付退款列表"]}>
      <PayoutRefundList />
    </OpsLayout>
  );
}
