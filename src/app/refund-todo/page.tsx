import { redirect } from "next/navigation";
import { PAYOUT_REFUND_LIST_PATH } from "@/lib/ops-routes";

export default function RefundTodoRedirectPage() {
  redirect(PAYOUT_REFUND_LIST_PATH);
}
