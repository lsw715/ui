import { DEMO_PAYOUT_LINK } from "@/data/payout-refund-constants";
import type { ChannelPayoutInfo, FullBeneficiary, InternalRefundStatus } from "@/types/payout-refund";

export interface OpsPayoutRefundDetailRecord {
  gatewayRefundOrderId: string;
  gatewayOrderId: string;
  refundTransAmount: { amount: string; currency: string };
  refundType: "PAYOUT_LINK";
  internalStatus: InternalRefundStatus;
  payoutMode: "AUTO" | "MANUAL";
  paymentMethod: string;
  paymentMethodLabel: string;
  initiatorId: string;
  initiatorName: string;
  payoutLinkUrl?: string;
  linkDeliveryType?: "SMS" | "EMAIL" | "LINK_ONLY";
  beneficiary?: {
    beneficiaryName: string;
    accountNumberMasked: string;
    bankName?: string;
  };
  /** 人工打款时 OPS 可查看的完整收款信息 */
  fullBeneficiary?: FullBeneficiary;
  failureReason?: string;
  failureType?: "ACCOUNT" | "CHANNEL";
  channelPayout?: ChannelPayoutInfo | null;
}

/** 模拟 GET /int/refund/beneficiary/full/{id} */
export const mockFullBeneficiaries: Record<string, FullBeneficiary> = {
  RG211005336771096419: {
    beneficiaryName: "Budi Santoso",
    accountType: "WALLET",
    accountNumber: "08123456781234",
    accountCurrency: "IDR",
    walletBrand: "DANA",
    bankName: "DANA Wallet",
  },
};

export function resolveFullBeneficiary(
  refundOrderId: string,
  detail?: OpsPayoutRefundDetailRecord,
): FullBeneficiary | null {
  const record = detail ?? mockOpsPayoutDetails[refundOrderId];
  if (!record) return mockFullBeneficiaries[refundOrderId] ?? null;
  if (record.fullBeneficiary) return record.fullBeneficiary;
  if (mockFullBeneficiaries[refundOrderId]) return mockFullBeneficiaries[refundOrderId];
  if (record.payoutMode !== "MANUAL" || !record.beneficiary) return null;
  return {
    beneficiaryName: record.beneficiary.beneficiaryName,
    accountType: record.beneficiary.bankName?.toLowerCase().includes("wallet")
      ? "WALLET"
      : "BANK",
    accountNumber: "08123456781234",
    accountCurrency: record.refundTransAmount.currency,
    bankName: record.beneficiary.bankName,
    walletBrand: record.beneficiary.bankName?.includes("DANA") ? "DANA" : undefined,
  };
}

/** @deprecated 使用 resolveFullBeneficiary */
export function getMockFullBeneficiary(refundOrderId: string): FullBeneficiary | null {
  return resolveFullBeneficiary(refundOrderId);
}

export const mockOpsPayoutDetails: Record<string, OpsPayoutRefundDetailRecord> = {
  /** 人工打款待办 — QRIS 钱包，待回填 */
  RG211005336771096419: {
    gatewayRefundOrderId: "RG211005336771096419",
    gatewayOrderId: "GW20620xxxxx6999",
    refundTransAmount: { amount: "450000.00", currency: "IDR" },
    refundType: "PAYOUT_LINK",
    internalStatus: "PAYING",
    payoutMode: "MANUAL",
    paymentMethod: "QRIS",
    paymentMethodLabel: "QRIS",
    initiatorId: "OPS-U003",
    initiatorName: "运营-王芳",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    linkDeliveryType: "SMS",
    beneficiary: {
      beneficiaryName: "Budi Santoso",
      accountNumberMasked: "DANA ****1234",
      bankName: "DANA Wallet",
    },
    fullBeneficiary: {
      beneficiaryName: "Budi Santoso",
      accountType: "WALLET",
      accountNumber: "08123456781234",
      accountCurrency: "IDR",
      walletBrand: "DANA",
      bankName: "DANA Wallet",
    },
    channelPayout: null,
  },
  /** 待消费者填链接 — 可重发 */
  RG211003556677889900: {
    gatewayRefundOrderId: "RG211003556677889900",
    gatewayOrderId: "GW20620xxxxx7003",
    refundTransAmount: { amount: "2500000.00", currency: "VND" },
    refundType: "PAYOUT_LINK",
    internalStatus: "WAITING_FILL",
    payoutMode: "AUTO",
    paymentMethod: "VIETQR",
    paymentMethodLabel: "VietQR",
    initiatorId: "MPS-U001",
    initiatorName: "商户操作员",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    linkDeliveryType: "EMAIL",
  },
  /** 自动代付失败 — 终态 FAILURE，商户可再退一笔 */
  RG211004998877665544: {
    gatewayRefundOrderId: "RG211004998877665544",
    gatewayOrderId: "GW20620xxxxx7001",
    refundTransAmount: { amount: "88.50", currency: "SGD" },
    refundType: "PAYOUT_LINK",
    internalStatus: "FAILURE",
    payoutMode: "AUTO",
    paymentMethod: "PAYNOW",
    paymentMethodLabel: "PayNow",
    initiatorId: "MPS-U001",
    initiatorName: "商户操作员",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiary: {
      beneficiaryName: "Tan Wei Ming",
      accountNumberMasked: "DBS ****5678",
      bankName: "DBS Bank",
    },
    failureReason: "渠道余额不足",
    failureType: "CHANNEL",
    channelPayout: {
      channelPayoutOrderId: "PL202607071830001234",
      channelCode: "PAYLOCO",
      payoutCompletedAt: "2026-07-07 18:31:02",
    },
  },
  /** 自动代付成功 — 渠道订单已回写 */
  RG211003998877665500: {
    gatewayRefundOrderId: "RG211003998877665500",
    gatewayOrderId: "GW20620xxxxx7005",
    refundTransAmount: { amount: "1500.00", currency: "THB" },
    refundType: "PAYOUT_LINK",
    internalStatus: "SUCCESS",
    payoutMode: "AUTO",
    paymentMethod: "PROMPTPAY",
    paymentMethodLabel: "PromptPay",
    initiatorId: "MPS-U001",
    initiatorName: "商户操作员",
    payoutLinkUrl: DEMO_PAYOUT_LINK,
    beneficiary: {
      beneficiaryName: "Somchai P.",
      accountNumberMasked: "SCB ****8899",
      bankName: "Siam Commercial Bank",
    },
    channelPayout: {
      channelPayoutOrderId: "PL202607061200005678",
      channelCode: "PAYLOCO",
      payoutCompletedAt: "2026-07-06 12:05:18",
    },
  },
};

export function getOpsPayoutDetail(orderId: string): OpsPayoutRefundDetailRecord {
  return (
    mockOpsPayoutDetails[orderId] ?? {
      ...mockOpsPayoutDetails.RG211005336771096419,
      gatewayRefundOrderId: orderId,
    }
  );
}
