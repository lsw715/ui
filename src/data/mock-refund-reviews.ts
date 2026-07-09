import type { RefundReviewRecord } from "@/types/refund-review";
import type { InternalRefundStatus } from "@/types/payout-refund";
import { DEMO_PAYOUT_LINK } from "@/data/payout-refund-constants";

export const REVIEW_STATUS_LABELS: Record<string, string> = {
  REVIEWING: "待审核/审核中",
  APPROVED: "审核通过",
  REJECT: "审核拒绝",
};

export const REVIEW_STATUS_COLORS: Record<string, string> = {
  REVIEWING: "bg-amber-50 text-amber-600 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-200",
  REJECT: "bg-red-50 text-red-600 border-red-200",
};

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CARD", label: "卡支付" },
  { value: "WALLET", label: "钱包" },
  { value: "PROMPTPAY", label: "PromptPay" },
  { value: "PAYNOW", label: "PayNow" },
  { value: "DUITNOW", label: "DuitNow" },
  { value: "VIETQR", label: "VietQR" },
  { value: "QRIS", label: "QRIS" },
];

export const mockRefundReviews: RefundReviewRecord[] = [
  {
    id: 1,
    refundOrderId: "RG206xxxxx198",
    orderId: "GW20620xxxxx6999",
    memberId: "M10001",
    merchantId: "10086001",
    merchantName: "Global Tech Trading Ltd",
    refundReviewerId: null,
    refundReviewerName: null,
    refundReviewerUsername: null,
    refundReviewerEmail: null,
    reviewTime: null,
    reviewStatus: "REVIEWING",
    refundOpinion: null,
    paymentMethod: "PROMPTPAY",
    refundType: "PAYOUT_LINK",
    internalStatus: "REVIEWING",
    initiatorId: "MPS-U001",
    initiatorName: "商户操作员",
    refundTransAmount: { amount: "1500.00", currency: "THB" },
    transAmount: { amount: "1500.00", currency: "THB" },
    transCurrency: "THB",
    reason: "客户申请退款",
    createTime: "2026-07-08 14:30:22",
    updateTime: "2026-07-08 14:30:22",
  },
  {
    id: 2,
    refundOrderId: "GR20260707102833003",
    orderId: "GO20260705110244990",
    memberId: "M10025",
    merchantId: "10086025",
    merchantName: "Shenzhen Digital Commerce",
    refundReviewerId: "U001",
    refundReviewerName: "Zhang Wei",
    refundReviewerUsername: "zhangwei",
    refundReviewerEmail: "zhangwei@paykka.com",
    reviewTime: "2026-07-07 15:20:00",
    reviewStatus: "APPROVED",
    refundOpinion: null,
    paymentMethod: "CARD",
    refundType: "NATIVE",
    internalStatus: "PAYING",
    initiatorId: "OPS-U003",
    initiatorName: "运营-王芳",
    refundTransAmount: { amount: "2560.00", currency: "CNY" },
    transAmount: { amount: "2560.00", currency: "CNY" },
    transCurrency: "CNY",
    reason: "订单取消",
    createTime: "2026-07-07 10:28:33",
    updateTime: "2026-07-07 15:20:00",
  },
  {
    id: 3,
    refundOrderId: "GR20260706164512004",
    orderId: "GO20260704153322801",
    memberId: "M10033",
    merchantId: "10086033",
    merchantName: "London Premium Goods",
    refundReviewerId: "U002",
    refundReviewerName: "Li Ming",
    refundReviewerUsername: "liming",
    refundReviewerEmail: "liming@paykka.com",
    reviewTime: "2026-07-06 17:10:00",
    reviewStatus: "REJECT",
    refundOpinion: "退款金额超过可退余额",
    paymentMethod: "CARD",
    refundType: "NATIVE",
    internalStatus: "FAILURE",
    initiatorId: "MPS-U002",
    initiatorName: "商户财务",
    refundTransAmount: { amount: "45.00", currency: "GBP" },
    transAmount: { amount: "120.00", currency: "GBP" },
    transCurrency: "GBP",
    reason: "商品退货",
    createTime: "2026-07-06 16:45:12",
    updateTime: "2026-07-06 17:10:00",
  },
  {
    id: 4,
    refundOrderId: "RG211005336771096419",
    orderId: "GW20620xxxxx6999",
    memberId: "M10012",
    merchantId: "10086012",
    merchantName: "Bangkok Retail Co.",
    refundReviewerId: null,
    refundReviewerName: null,
    refundReviewerUsername: null,
    refundReviewerEmail: null,
    reviewTime: null,
    reviewStatus: "REVIEWING",
    refundOpinion: null,
    paymentMethod: "PROMPTPAY",
    refundType: "PAYOUT_LINK",
    internalStatus: "REVIEWING",
    initiatorId: "OPS-U003",
    initiatorName: "运营-王芳",
    refundTransAmount: { amount: "1500.00", currency: "THB" },
    transAmount: { amount: "1500.00", currency: "THB" },
    transCurrency: "THB",
    reason: "客诉协助退款",
    createTime: "2026-07-08 15:12:45",
    updateTime: "2026-07-08 15:12:45",
  },
];

export interface PayoutRefundListRecord {
  id: string;
  refundOrderId: string;
  orderId: string;
  merchantName: string;
  paymentMethod: string;
  refundType: "PAYOUT_LINK";
  internalStatus: InternalRefundStatus;
  refundTransAmount: { amount: string; currency: string };
  payoutMode: "AUTO" | "MANUAL";
  failureReason?: string;
  failureType?: "ACCOUNT" | "CHANNEL";
  payoutLinkUrl?: string;
  beneficiaryMasked?: string;
  channelPayoutOrderId?: string;
  channelCode?: string;
  createTime: string;
  completedTime?: string;
}

/** @deprecated 使用 PayoutRefundListRecord */
export type RefundTodoRecord = PayoutRefundListRecord;

export const mockPayoutRefundList: PayoutRefundListRecord[] = [
  {
    id: "todo-1",
    refundOrderId: "RG211005336771096419",
    orderId: "GW20620xxxxx6999",
    merchantName: "Bangkok Retail Co.",
    paymentMethod: "QRIS",
    refundType: "PAYOUT_LINK",
    internalStatus: "PAYING",
    refundTransAmount: { amount: "450000.00", currency: "IDR" },
    payoutMode: "MANUAL",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiaryMasked: "DANA ****1234",
    createTime: "2026-07-08 10:00:00",
  },
  {
    id: "todo-2",
    refundOrderId: "RG211004998877665544",
    orderId: "GW20620xxxxx7001",
    merchantName: "Singapore Shop Pte",
    paymentMethod: "PAYNOW",
    refundType: "PAYOUT_LINK",
    internalStatus: "FAILURE",
    refundTransAmount: { amount: "88.50", currency: "SGD" },
    payoutMode: "AUTO",
    failureReason: "渠道余额不足",
    failureType: "CHANNEL",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiaryMasked: "DBS ****5678",
    channelPayoutOrderId: "PL202607071830001234",
    channelCode: "PAYLOCO",
    createTime: "2026-07-07 18:30:00",
    completedTime: "2026-07-07 18:31:15",
  },
  {
    id: "todo-3",
    refundOrderId: "RG211004112233445566",
    orderId: "GW20620xxxxx7002",
    merchantName: "KL Fashion MY",
    paymentMethod: "DUITNOW",
    refundType: "PAYOUT_LINK",
    internalStatus: "FAILURE",
    refundTransAmount: { amount: "320.00", currency: "MYR" },
    payoutMode: "AUTO",
    failureReason: "户名与账户不符",
    failureType: "ACCOUNT",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiaryMasked: "Maybank ****9012",
    createTime: "2026-07-07 14:15:00",
    completedTime: "2026-07-07 14:20:00",
  },
  {
    id: "todo-4",
    refundOrderId: "RG211003556677889900",
    orderId: "GW20620xxxxx7003",
    merchantName: "Hanoi Digital VN",
    paymentMethod: "VIETQR",
    refundType: "PAYOUT_LINK",
    internalStatus: "WAITING_FILL",
    refundTransAmount: { amount: "2500000.00", currency: "VND" },
    payoutMode: "AUTO",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    createTime: "2026-07-06 09:00:00",
  },
  {
    id: "list-5",
    refundOrderId: "RG211003998877665500",
    orderId: "GW20620xxxxx7005",
    merchantName: "Bangkok Retail Co.",
    paymentMethod: "PROMPTPAY",
    refundType: "PAYOUT_LINK",
    internalStatus: "SUCCESS",
    refundTransAmount: { amount: "1500.00", currency: "THB" },
    payoutMode: "AUTO",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiaryMasked: "SCB ****8899",
    channelPayoutOrderId: "PL202607061200005678",
    channelCode: "PAYLOCO",
    createTime: "2026-07-06 10:00:00",
    completedTime: "2026-07-06 12:05:18",
  },
  {
    id: "list-6",
    refundOrderId: "RG211002111223344556",
    orderId: "GW20620xxxxx7006",
    merchantName: "Jakarta Shop ID",
    paymentMethod: "QRIS",
    refundType: "PAYOUT_LINK",
    internalStatus: "FAILURE",
    refundTransAmount: { amount: "125000.00", currency: "IDR" },
    payoutMode: "MANUAL",
    failureReason: "打款失败，商户可再发起新退款",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiaryMasked: "BCA ****4455",
    createTime: "2026-07-05 16:20:00",
    completedTime: "2026-07-07 09:30:00",
  },
];

/** @deprecated 使用 mockPayoutRefundList */
export const mockRefundTodos = mockPayoutRefundList;
