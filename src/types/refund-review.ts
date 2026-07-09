export type RefundReviewStatus = "REVIEWING" | "APPROVED" | "REJECT";

import type { InternalRefundStatus, RefundType } from "@/types/payout-refund";

export interface RefundReviewRecord {
  id: number;
  refundOrderId: string;
  orderId: string;
  memberId: string;
  merchantId: string;
  merchantName: string;
  refundReviewerId: string | null;
  refundReviewerName: string | null;
  refundReviewerUsername: string | null;
  refundReviewerEmail: string | null;
  reviewTime: string | null;
  reviewStatus: RefundReviewStatus;
  refundOpinion: string | null;
  paymentMethod: string;
  refundType: RefundType;
  internalStatus?: InternalRefundStatus;
  initiatorId: string;
  initiatorName: string;
  refundTransAmount: { amount: string; currency: string };
  transAmount: { amount: string; currency: string };
  transCurrency: string;
  reason: string;
  createTime: string;
  updateTime: string;
}

export interface RefundReviewSearchFilters {
  createTimeStart: string;
  createTimeEnd: string;
  reviewStatus: string;
  merchantId: string;
  refundOrderId: string;
  orderId: string;
  paymentMethod: string;
}
