import type { ReactNode } from "react";

export interface DescriptionItem {
  label: string;
  value: ReactNode;
  span?: number;
  display?: boolean;
}

export interface GatewayDetailData {
  gatewayOrderId: string;
  transId: string;
  paymentTime: string;
  paymentFinishTime: string;
  merchantId: string;
  merchantName: string;
  orderStatus: string;
  errorCode: string | null;
  errorDescription: string | null;
  disputeStatus: string;
  transAmount: { amount: string; currency: string };
  captureAmount: { amount: string; currency: string } | null;
  channelCode: string;
  mid: string;
  paymentMethod: string;
  productCode: string;
  paymentType: string;
  mcc: string;
  shopperReference: string;
  refundOrders: GatewayRefundOrderItem[];
  paymentOrders: GatewayPaymentOrderItem[];
}

export interface GatewayRefundOrderItem {
  gatewayRefundOrderId: string;
  refundTransId: string;
  status: string;
  refundAmount: { amount: string; currency: string };
  utcCreateTime: string;
  utcRefundFinishTime: string | null;
  errorCode: string | null;
  errorDescription: string | null;
  reason: string;
}

export interface GatewayPaymentOrderItem {
  paymentOrderId: string;
  status: string;
  amount: { amount: string; currency: string };
  authAmount: { amount: string; currency: string } | null;
  utcCreateTime: string;
  utcPaymentFinishTime: string | null;
  paymentMethod: string;
  channelCode: string;
  mid: string;
  errorCode: string | null;
  errorDescription: string | null;
}
