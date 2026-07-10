"use client";

import { THAI_BANKS } from "@/data/beneficiary-templates";

export interface BeneficiaryFormPayload {
  beneficiaryName: string;
  accountType: "BANK" | "WALLET";
  accountNumber: string;
  bankCode?: string;
  bankName?: string;
  walletBrand?: string;
}

interface BeneficiaryFieldsProps {
  paymentMethod: string;
  accountCurrency: string;
  value: BeneficiaryFormPayload;
  onChange: (value: BeneficiaryFormPayload) => void;
}

const WALLET_BRANDS: Record<string, string[]> = {
  QRIS: ["DANA", "OVO", "GoPay", "ShopeePay"],
};

export function emptyBeneficiary(paymentMethod: string): BeneficiaryFormPayload {
  const supportsWallet = paymentMethod === "QRIS";
  return {
    beneficiaryName: "",
    accountType: supportsWallet ? "BANK" : "BANK",
    accountNumber: "",
    bankCode: "",
    bankName: "",
    walletBrand: "",
  };
}

export function BeneficiaryFields({
  paymentMethod,
  accountCurrency,
  value,
  onChange,
}: BeneficiaryFieldsProps) {
  const supportsWallet = paymentMethod === "QRIS";
  const walletOptions = WALLET_BRANDS[paymentMethod] ?? [];

  const set = (patch: Partial<BeneficiaryFormPayload>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div className="space-y-3 rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] p-3">
      <h4 className="text-[14px] font-medium text-[#333]">收款信息</h4>
      <p className="text-[12px] text-[#999]">
        请填写消费者收款账户（须与线下收集信息一致），币种：{accountCurrency}
      </p>

      {supportsWallet ? (
        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            账户类型 <span className="text-red-500">*</span>
          </label>
          <select
            value={value.accountType}
            onChange={(e) =>
              set({
                accountType: e.target.value as "BANK" | "WALLET",
                bankCode: "",
                bankName: "",
                walletBrand: "",
              })
            }
            className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          >
            <option value="BANK">银行账户</option>
            <option value="WALLET">电子钱包</option>
          </select>
        </div>
      ) : null}

      <div>
        <label className="mb-1.5 block text-[13px] text-[#666]">
          收款人姓名 <span className="text-red-500">*</span>
        </label>
        <input
          value={value.beneficiaryName}
          onChange={(e) => set({ beneficiaryName: e.target.value })}
          placeholder="须与账户姓名一致"
          className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
        />
      </div>

      {value.accountType === "BANK" ? (
        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            银行 <span className="text-red-500">*</span>
          </label>
          <select
            value={value.bankCode ?? ""}
            onChange={(e) => {
              const bank = THAI_BANKS.find((b) => b.code === e.target.value);
              set({ bankCode: e.target.value, bankName: bank?.name ?? "" });
            }}
            className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          >
            <option value="">请选择银行</option>
            {THAI_BANKS.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            钱包品牌 <span className="text-red-500">*</span>
          </label>
          <select
            value={value.walletBrand ?? ""}
            onChange={(e) => set({ walletBrand: e.target.value })}
            className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          >
            <option value="">请选择钱包</option>
            {walletOptions.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-[13px] text-[#666]">
          {value.accountType === "BANK" ? "银行账号" : "钱包账号"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          value={value.accountNumber}
          onChange={(e) => set({ accountNumber: e.target.value })}
          placeholder={value.accountType === "BANK" ? "请输入银行账号" : "请输入钱包账号"}
          className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
        />
      </div>
    </div>
  );
}

export function validateBeneficiary(
  value: BeneficiaryFormPayload,
  paymentMethod: string,
): string | null {
  if (!value.beneficiaryName.trim()) return "请填写收款人姓名";
  if (!value.accountNumber.trim()) return "请填写收款账号";
  if (value.accountType === "BANK" && !value.bankCode) return "请选择银行";
  if (value.accountType === "WALLET" && !value.walletBrand) return "请选择钱包品牌";
  if (paymentMethod !== "QRIS" && value.accountType === "WALLET") {
    return "该支付方式仅支持银行账户";
  }
  return null;
}
