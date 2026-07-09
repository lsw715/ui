import type {
  InternalRefundStatus,
  LinkDeliveryType,
  PayoutFailureType,
  RefundStrategy,
  RefundType,
} from "@/types/payout-refund";

export const REFUND_TYPE_LABELS: Record<RefundType, string> = {
  NATIVE: "原路退",
  PAYOUT_LINK: "代付退",
};

export const REFUND_STRATEGY_LABELS: Record<RefundStrategy, string> = {
  NATIVE: "原路退",
  PAYOUT_LINK: "代付退（收款链接）",
  NOT_SUPPORTED: "不可退",
};

export const LINK_DELIVERY_LABELS: Record<LinkDeliveryType, string> = {
  SMS: "短信代发",
  EMAIL: "邮件代发",
  LINK_ONLY: "仅返回链接（商户自行转发）",
};

export const INTERNAL_STATUS_LABELS: Record<InternalRefundStatus, string> = {
  REVIEWING: "待审核",
  WAITING_FILL: "待消费者填链接",
  PAYING: "打款中",
  SUCCESS: "退款成功",
  FAILURE: "退款失败",
};

export const INTERNAL_STATUS_COLORS: Record<InternalRefundStatus, string> = {
  REVIEWING: "bg-amber-50 text-amber-600 border-amber-200",
  WAITING_FILL: "bg-blue-50 text-blue-600 border-blue-200",
  PAYING: "bg-indigo-50 text-indigo-600 border-indigo-200",
  SUCCESS: "bg-emerald-50 text-emerald-600 border-emerald-200",
  FAILURE: "bg-slate-50 text-slate-600 border-slate-200",
};

export const FAILURE_TYPE_LABELS: Record<PayoutFailureType, string> = {
  ACCOUNT: "账号问题",
  CHANNEL: "渠道问题",
};

export const CHANNEL_CODE_LABELS: Record<string, string> = {
  PAYLOCO: "Payloco",
  MANUAL_BANK: "线下银行转账",
  MANUAL_WALLET: "线下钱包转账",
  OTHER: "其他渠道",
};

export const SEA_PAYMENT_METHODS = [
  { value: "PROMPTPAY", label: "PromptPay（THB）" },
  { value: "PAYNOW", label: "PayNow（SGD）" },
  { value: "DUITNOW", label: "DuitNow（MYR）" },
  { value: "VIETQR", label: "VietQR（VND）" },
  { value: "QRIS", label: "QRIS（IDR）" },
];

export const DEMO_PAYOUT_LINK = "https://pay.paykka.com/r/AbCd1234";
