import type { GatewayDetailData } from "@/types/gateway-detail";

export const mockGatewayDetail: GatewayDetailData = {
  gatewayOrderId: "GW211005332193944092",
  transId: "TXN202607071030001",
  paymentTime: "2026-07-07 10:30:15",
  paymentFinishTime: "2026-07-07 10:32:08",
  merchantId: "10086001",
  merchantName: "Global Tech Trading Ltd",
  orderStatus: "SUCCESS",
  errorCode: null,
  errorDescription: null,
  disputeStatus: "NONE",
  transAmount: { amount: "256.00", currency: "USD" },
  captureAmount: { amount: "256.00", currency: "USD" },
  channelCode: "STRIPE",
  mid: "MID_US_001",
  paymentMethod: "WALLET",
  productCode: "ACQUIRING_WALLET",
  paymentType: "SALE",
  mcc: "5411",
  shopperReference: "SHOPPER_882910",
  paymentOrders: [
    {
      paymentOrderId: "PO202607071030001",
      status: "SUCCESS",
      amount: { amount: "256.00", currency: "USD" },
      authAmount: null,
      utcCreateTime: "2026-07-07 10:30:15",
      utcPaymentFinishTime: "2026-07-07 10:32:08",
      paymentMethod: "WALLET",
      channelCode: "STRIPE",
      mid: "MID_US_001",
      errorCode: null,
      errorDescription: null,
    },
  ],
  refundOrders: [
    {
      gatewayRefundOrderId: "GR20260708143022001",
      refundTransId: "REF202607080001",
      status: "SUCCESS",
      refundAmount: { amount: "128.50", currency: "USD" },
      utcCreateTime: "2026-07-08 14:30:22",
      utcRefundFinishTime: "2026-07-08 14:32:18",
      errorCode: null,
      errorDescription: null,
      reason: "客户申请退款",
    },
    {
      gatewayRefundOrderId: "GR20260705182208005",
      refundTransId: "REF202607050005",
      status: "PROCESSING",
      refundAmount: { amount: "64.00", currency: "USD" },
      utcCreateTime: "2026-07-05 18:22:08",
      utcRefundFinishTime: null,
      errorCode: null,
      errorDescription: null,
      reason: "部分退款",
    },
  ],
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  SUCCESS: "成功",
  PROCESSING: "处理中",
  FAILURE: "失败",
  REVIEWING: "审核中",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  SUCCESS: "bg-emerald-50 text-emerald-600 border-emerald-200",
  PROCESSING: "bg-blue-50 text-blue-600 border-blue-200",
  FAILURE: "bg-red-50 text-red-600 border-red-200",
  REVIEWING: "bg-amber-50 text-amber-600 border-amber-200",
};
