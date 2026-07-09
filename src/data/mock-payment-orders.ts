import type { GatewayPaymentOrder } from "@/types/payment-order";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/data/mock-gateway-detail";

export { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS };

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CARD", label: "卡支付" },
  { value: "WALLET", label: "钱包" },
  { value: "PROMPTPAY", label: "PromptPay" },
  { value: "ALIPAY", label: "支付宝" },
  { value: "WECHAT", label: "微信支付" },
];

export const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "HKD", "CNY", "THB"];

export const mockPaymentOrders: GatewayPaymentOrder[] = [
  {
    gatewayOrderId: "GW211013325005848698",
    transId: "TXN202607131030001",
    merchantId: "10086001",
    merchantName: "Global Tech Trading Ltd",
    orderStatus: "SUCCESS",
    transAmount: { amount: "188.00", currency: "USD" },
    paymentTime: "2026-07-13 10:30:15",
    paymentFinishTime: "2026-07-13 10:32:08",
    paymentMethod: "WALLET",
    channelCode: "STRIPE",
    businessType: "WALLET",
  },
  {
    gatewayOrderId: "GW20620xxxxx6999",
    transId: "TXN-MPS-202607051030",
    merchantId: "10086001",
    merchantName: "Bangkok Retail Co.",
    orderStatus: "SUCCESS",
    transAmount: { amount: "1500.00", currency: "THB" },
    paymentTime: "2026-07-05 10:30:22",
    paymentFinishTime: "2026-07-05 10:32:18",
    paymentMethod: "PROMPTPAY",
    channelCode: "PAYLOCO",
    businessType: "ACQUIRING",
  },
  {
    gatewayOrderId: "GW211005332193944092",
    transId: "TXN202607071030001",
    merchantId: "10086001",
    merchantName: "Global Tech Trading Ltd",
    orderStatus: "SUCCESS",
    transAmount: { amount: "256.00", currency: "USD" },
    paymentTime: "2026-07-07 10:30:15",
    paymentFinishTime: "2026-07-07 10:32:08",
    paymentMethod: "WALLET",
    channelCode: "STRIPE",
    businessType: "WALLET",
  },
  {
    gatewayOrderId: "GW210985551234567890",
    transId: "TXN-MPS-202607041205",
    merchantId: "10086012",
    merchantName: "Euro Fashion Boutique",
    orderStatus: "PROCESSING",
    transAmount: { amount: "189.99", currency: "EUR" },
    paymentTime: "2026-07-04 12:05:44",
    paymentFinishTime: null,
    paymentMethod: "CARD",
    channelCode: "STRIPE",
    businessType: "ACQUIRING",
  },
];

export const mockPaymentDetail = {
  gatewayOrderId: "GW211013325005848698",
  transId: "TXN202607131030001",
  paymentTime: "2026-07-13 10:30:15",
  paymentFinishTime: "2026-07-13 10:32:08",
  merchantId: "10086001",
  merchantName: "Global Tech Trading Ltd",
  orderStatus: "SUCCESS",
  errorCode: null,
  errorDescription: null,
  disputeStatus: "NONE",
  transAmount: { amount: "188.00", currency: "USD" },
  captureAmount: { amount: "188.00", currency: "USD" },
  refundableAmount: { amount: "188.00", currency: "USD" },
  channelCode: "STRIPE",
  mid: "MID_US_001",
  paymentMethod: "WALLET",
  productCode: "ACQUIRING_WALLET",
  paymentType: "SALE",
  mcc: "5411",
  shopperReference: "SHOPPER_882910",
  businessType: "WALLET",
  showRefundBtn: true,
};
