import { MpsLayout } from "@/components/mps/MpsLayout";
import { MpsRefundDetail } from "@/components/mps/MpsRefundDetail";

export default async function MpsRefundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <MpsLayout breadcrumbs={["订单", "退款订单", "退款详情"]}>
      <MpsRefundDetail orderId={id} />
    </MpsLayout>
  );
}
