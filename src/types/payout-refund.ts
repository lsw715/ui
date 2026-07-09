/** 退款方式：原路退 / 代付退 */
export type RefundType = "NATIVE" | "PAYOUT_LINK";

/** 可退策略（查可退金额接口返回） */
export type RefundStrategy = "NATIVE" | "PAYOUT_LINK" | "NOT_SUPPORTED";

/** 链接发送方式 */
export type LinkDeliveryType = "SMS" | "EMAIL" | "LINK_ONLY";

/** 对外状态（MPS / API）— 4 态 */
export type ExternalRefundStatus = "REVIEWING" | "PROCESSING" | "SUCCESS" | "FAILURE";

/** 内部状态（OPS）— 5 态（方案 A） */
export type InternalRefundStatus =
  | "REVIEWING"
  | "WAITING_FILL"
  | "PAYING"
  | "SUCCESS"
  | "FAILURE";

/** 打款失败类型（终态 FAILURE 时展示原因） */
export type PayoutFailureType = "ACCOUNT" | "CHANNEL";

export interface MaskedBeneficiary {
  beneficiaryName: string;
  accountType: "BANK" | "WALLET";
  accountNumberMasked: string;
  bankName?: string;
  walletBrand?: string;
}

/** OPS 人工打款时查看的完整收款信息（需权限 + 审计） */
export interface FullBeneficiary {
  beneficiaryName: string;
  accountType: "BANK" | "WALLET";
  accountNumber: string;
  accountCurrency: string;
  bankName?: string;
  bankCode?: string;
  walletBrand?: string;
  clearingSysType?: string;
  clearingSysNumber?: string;
}

export interface PayoutRefundInfo {
  refundType: RefundType;
  refundStrategy?: RefundStrategy;
  internalStatus?: InternalRefundStatus;
  payoutLinkUrl: string | null;
  linkDeliveryType?: LinkDeliveryType;
  beneficiary?: MaskedBeneficiary | null;
  failureReason?: string | null;
  failureType?: PayoutFailureType | null;
  payoutMode?: "AUTO" | "MANUAL";
  initiatorId?: string;
  initiatorName?: string;
  channelPayout?: ChannelPayoutInfo | null;
}

/** 渠道代付/打款凭证 */
export interface ChannelPayoutInfo {
  channelPayoutOrderId: string;
  channelCode: string;
  payoutCompletedAt?: string;
  operatorName?: string;
  backfillRemark?: string;
}

export interface ManualPayoutBackfillPayload {
  outcome: "SUCCESS" | "FAILURE";
  channelPayoutOrderId?: string;
  channelCode?: string;
  payoutCompletedAt?: string;
  failureReason?: string;
  remark?: string;
}
