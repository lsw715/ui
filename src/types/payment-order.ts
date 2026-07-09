export type GatewayPaymentOrderStatus = "SUCCESS" | "PROCESSING" | "FAILURE" | "REVIEWING";

export interface Money {
  amount: string;
  currency: string;
}

export interface GatewayPaymentOrder {
  gatewayOrderId: string;
  transId: string;
  merchantId: string;
  merchantName: string;
  orderStatus: GatewayPaymentOrderStatus;
  transAmount: Money;
  paymentTime: string;
  paymentFinishTime: string | null;
  paymentMethod: string;
  channelCode: string;
  businessType: string;
}

export interface PaymentSearchFilters {
  paymentTimeStart: string;
  paymentTimeEnd: string;
  paymentFinishTimeStart: string;
  paymentFinishTimeEnd: string;
  merchantId: string;
  merchantName: string;
  currency: string;
  gatewayOrderId: string;
  transId: string;
  orderStatus: string;
  paymentMethod: string;
}
