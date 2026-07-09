import type { InternalRefundStatus } from "@/types/payout-refund";

export const TERMINAL_REFUND_STATUS: InternalRefundStatus[] = ["SUCCESS", "FAILURE"];

export function isPendingRefundStatus(status: InternalRefundStatus): boolean {
  return !TERMINAL_REFUND_STATUS.includes(status);
}

/** WAITING_FILL：消费者尚未提交，可重发链接 */
export function showResendLinkAction(status: InternalRefundStatus): boolean {
  return status === "WAITING_FILL";
}

/** 人工打款待确认：展示「确认打款成功」 */
export function showManualPayoutSuccessAction(
  status: InternalRefundStatus,
  payoutMode: "AUTO" | "MANUAL",
): boolean {
  return status === "PAYING" && payoutMode === "MANUAL";
}

/** 任意非终态均可登记打款失败 → FAILURE */
export function showPayoutFailureAction(status: InternalRefundStatus): boolean {
  return isPendingRefundStatus(status);
}

/** 人工打款且消费者已填收款信息：可查看完整账号（OPS 专用） */
export function showFullBeneficiaryAction(
  status: InternalRefundStatus,
  payoutMode: "AUTO" | "MANUAL",
  hasBeneficiary: boolean,
): boolean {
  return payoutMode === "MANUAL" && hasBeneficiary && status === "PAYING";
}
