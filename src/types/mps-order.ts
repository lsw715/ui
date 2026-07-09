import type { ExternalRefundStatus, PayoutRefundInfo, RefundStrategy } from "@/types/payout-refund";

export type MpsOrderStatus = ExternalRefundStatus | "PENDING";

export interface Money {
  amount: string;
  currency: string;
}

export interface MpsRefundListItem {
  refundTransId: string;
  gatewayRefundOrderId: string;
  gatewayOrderId: string;
  merchantId: string;
  merchantName: string;
  paymentMethod: string;
  status: MpsOrderStatus;
  refundType: "NATIVE" | "PAYOUT_LINK";
  refundTransAmount: Money;
  utcCreateTime: string;
  utcRefundFinishTime: string | null;
  businessType: string;
}

export interface MpsTransactionListItem {
  transId: string;
  gatewayOrderId: string;
  merchantId: string;
  merchantName: string;
  paymentMethod: string;
  last4: string;
  cardOrg: string;
  status: MpsOrderStatus;
  transAmount: Money;
  refundable: boolean;
  utcCreateTime: string;
  utcPaymentFinishTime: string | null;
  businessType: string;
  scenarioType: string;
}

export interface MpsRefundDetail extends PayoutRefundInfo {
  gatewayRefundOrderId: string;
  gatewayOrderId: string;
  transId: string;
  refundTransId: string;
  merchantId: string;
  merchantName: string;
  refundTransAmount: Money;
  reason: string;
  paymentMethod: string;
  paymentType: string;
  utcRefundFinishTime: string | null;
  status: MpsOrderStatus;
  productCode: string;
  cardNo: string;
  errorCode: string | null;
  errorDescription: string | null;
  utcCreateTime: string;
  businessType: string;
}

export interface MpsTransactionDetail {
  gatewayOrderId: string;
  transId: string;
  cardNo: string;
  transAmount: Money;
  orderAmount: Money;
  captureAmount: Money | null;
  fee: Money | null;
  utcCreateTime: string;
  utcPaymentFinishTime: string | null;
  merchantId: string;
  merchantName: string;
  status: MpsOrderStatus;
  errorCode: string | null;
  errorDescription: string | null;
  remark: string | null;
  paymentMethod: string;
  channelCode: string;
  recurringAgreementId: string | null;
  termNo: string;
  businessType: string;
  merchantProductName: string;
  showRefundBtnFlag: boolean;
  refundableAmount: Money;
  refundStrategy: RefundStrategy;
}

export interface MpsListFilters {
  commonKeyWord: string;
  timeStart: string;
  timeEnd: string;
  transId: string;
  gatewayOrderId: string;
  gatewayRefundOrderId: string;
  refundTransId: string;
  paymentMethod: string;
  status: string;
  currency: string;
  billEmail: string;
}
