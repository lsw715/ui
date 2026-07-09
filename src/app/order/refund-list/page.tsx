import { MpsLayout } from "@/components/mps/MpsLayout";
import { MpsRefundList } from "@/components/mps/MpsRefundList";

export default function MpsRefundListPage() {
  return (
    <MpsLayout breadcrumbs={["订单", "退款订单"]}>
      <MpsRefundList />
    </MpsLayout>
  );
}
