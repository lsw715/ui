"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const THAI_BANKS = [
  { code: "002", name: "Bangkok Bank" },
  { code: "004", name: "Kasikorn Bank" },
  { code: "006", name: "Krung Thai Bank" },
  { code: "014", name: "Siam Commercial Bank" },
];

interface PayoutLinkFormProps {
  merchantName: string;
  amount: string;
  currency: string;
  orderId: string;
  paymentMethod?: string;
}

export function PayoutLinkForm({
  merchantName,
  amount,
  currency,
  orderId,
  paymentMethod = "PROMPTPAY",
}: PayoutLinkFormProps) {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!beneficiaryName || !bankCode || !accountNumber || !verifyCode) {
      setError("请填写所有必填项");
      return;
    }
    if (!agreed) {
      setError("请勾选合规声明");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle2 className="size-16 text-emerald-500" />
        <h2 className="text-xl font-medium text-[#333]">已提交，退款处理中</h2>
        <p className="text-[14px] text-[#666]">您的收款信息已提交，此页面已失效</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[8px] border border-[#e8e8ef] bg-[#fafafa] p-5 text-center">
        <p className="text-[14px] text-[#666]">{merchantName}</p>
        <p className="mt-2 text-[28px] font-semibold text-[#333]">
          {amount} <span className="text-[18px]">{currency}</span>
        </p>
        <p className="mt-2 font-mono text-[12px] text-[#999]">原订单号：{orderId}</p>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] text-[#666]">
          校验码 <span className="text-red-500">*</span>
        </label>
        <input
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          placeholder="请输入短信/邮件中的校验码"
          className="h-[40px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div className="space-y-4 rounded-[8px] border border-[#e8e8ef] p-4">
        <h3 className="text-[15px] font-medium text-[#333]">
          收款信息 — {paymentMethod === "PROMPTPAY" ? "PromptPay 银行账户" : "银行账户"}
        </h3>

        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            收款人姓名 <span className="text-red-500">*</span>
          </label>
          <input
            value={beneficiaryName}
            onChange={(e) => setBeneficiaryName(e.target.value)}
            placeholder="须与账户姓名一致"
            className="h-[40px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            银行 <span className="text-red-500">*</span>
          </label>
          <select
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            className="h-[40px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          >
            <option value="">请选择银行</option>
            {THAI_BANKS.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">
            银行账号 / 手机号 <span className="text-red-500">*</span>
          </label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="PromptPay 账号或绑定手机号"
            className="h-[40px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] text-[#666]">账户币种</label>
          <div className="h-[40px] rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] px-3 py-2 text-[14px] text-[#666]">
            {currency}（只读，与原交易一致）
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 accent-[var(--primary)]"
        />
        <span className="text-[13px] text-[#666]">
          我确认收款信息仅用于本次退款，信息真实有效
        </span>
      </label>

      {error ? <p className="text-[13px] text-red-500">{error}</p> : null}

      <Button
        onClick={handleSubmit}
        className="h-[44px] w-full bg-[var(--primary)] text-[15px] text-white hover:bg-[#4338ca]"
      >
        提交收款信息
      </Button>

      <p className="text-center text-[12px] text-[#999]">
        链接有效期 7 天 · 提交后页面失效 · 信息加密传输
      </p>
    </div>
  );
}
