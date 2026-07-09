import { MpsLayout } from "@/components/mps/MpsLayout";
import { MpsTransactionDetail } from "@/components/mps/MpsTransactionDetail";

export default async function MpsTransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <MpsLayout breadcrumbs={["订单", "交易订单", "交易详情"]}>
      <MpsTransactionDetail orderId={id} />
    </MpsLayout>
  );
}
