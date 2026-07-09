import { RefundReviewList } from "@/components/ops/RefundReviewList";
import { OpsLayout } from "@/components/ops/OpsLayout";

export default function RefundReviewPage() {
  return (
    <OpsLayout breadcrumbs={["网关订单", "退款审核"]}>
      <RefundReviewList />
    </OpsLayout>
  );
}
