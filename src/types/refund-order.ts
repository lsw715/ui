export type GatewayRefundOrderStatus =
  | "REVIEWING"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILURE";

export interface Money {
  amount: string;
  currency: string;
}

export interface GatewayRefundOrder {
  refundTransId: string;
  refundGatewayOrderId: string;
  gatewayOrderId: string;
  merchantId: string;
  merchantName: string;
  refundStatus: GatewayRefundOrderStatus;
  refundTransAmount: Money;
  refundTime: string;
  refundFinishTime: string | null;
  refundErrorDescription: string | null;
  refundRemark: string;
  businessType: string;
}

export interface RefundSearchFilters {
  refundTimeStart: string;
  refundTimeEnd: string;
  refundFinishTimeStart: string;
  refundFinishTimeEnd: string;
  merchantId: string;
  merchantName: string;
  refundCurrency: string;
  refundGatewayOrderId: string;
  gatewayOrderId: string;
  refundStatus: string;
  merchantRefundId: string;
  arn: string;
}
