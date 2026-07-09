import { MpsLayout } from "@/components/mps/MpsLayout";
import { MpsTransactionList } from "@/components/mps/MpsTransactionList";

export default function MpsTransactionListPage() {
  return (
    <MpsLayout breadcrumbs={["订单", "交易订单"]}>
      <MpsTransactionList />
    </MpsLayout>
  );
}
