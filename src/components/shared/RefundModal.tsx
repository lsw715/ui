"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BeneficiaryFields,
  emptyBeneficiary,
  validateBeneficiary,
  type BeneficiaryFormPayload,
} from "@/components/shared/BeneficiaryFields";
import type { Money } from "@/types/mps-order";

export interface RefundFormPayload {
  amount: string;
  reason: string;
  payPassword?: string;
  beneficiary?: BeneficiaryFormPayload;
}

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  gatewayOrderId: string;
  transId?: string;
  paymentMethod?: string;
  paymentMethodLabel?: string;
  refundableAmount: Money;
  requirePayPassword?: boolean;
  requireBeneficiary?: boolean;
  payoutHint?: string;
  onSubmit?: (payload: RefundFormPayload) => void;
}

export function RefundModal({
  open,
  onClose,
  title = "发起退款",
  gatewayOrderId,
  transId,
  paymentMethod = "PROMPTPAY",
  paymentMethodLabel,
  refundableAmount,
  requirePayPassword = false,
  requireBeneficiary = false,
  payoutHint,
  onSubmit,
}: RefundModalProps) {
  const [amount, setAmount] = useState(refundableAmount.amount);
  const [reason, setReason] = useState("");
  const [payPassword, setPayPassword] = useState("");
  const [beneficiary, setBeneficiary] = useState<BeneficiaryFormPayload>(() =>
    emptyBeneficiary(paymentMethod),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setAmount(refundableAmount.amount);
      setReason("");
      setPayPassword("");
      setBeneficiary(emptyBeneficiary(paymentMethod));
      setError("");
    }
  }, [open, refundableAmount.amount, paymentMethod]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      setError("请输入有效退款金额");
      return;
    }
    if (!reason.trim()) {
      setError("请填写退款原因");
      return;
    }
    if (requireBeneficiary) {
      const beneficiaryError = validateBeneficiary(beneficiary, paymentMethod);
      if (beneficiaryError) {
        setError(beneficiaryError);
        return;
      }
    }
    if (requirePayPassword && !payPassword) {
      setError("请输入支付密码");
      return;
    }
    setError("");
    onSubmit?.({
      amount,
      reason: reason.trim(),
      payPassword: requirePayPassword ? payPassword : undefined,
      beneficiary: requireBeneficiary ? { ...beneficiary } : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-[440px] flex-col rounded-[6px] bg-white shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e8e8ef] px-5 py-4">
          <h3 className="text-[16px] font-medium text-[#333]">{title}</h3>
          <button type="button" onClick={onClose} className="text-[#999] hover:text-[#333]">
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {payoutHint ? (
            <p className="rounded-[4px] bg-[#f5f6fa] px-3 py-2 text-[12px] text-[#666]">{payoutHint}</p>
          ) : null}

          <div>
            <label className="mb-1.5 block text-[13px] text-[#666]">
              退款金额 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-[36px] flex-1 rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
              />
              <span className="text-[14px] text-[#666]">{refundableAmount.currency}</span>
            </div>
            <p className="mt-1 text-[12px] text-[#999]">
              可退：{refundableAmount.amount} {refundableAmount.currency}
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] text-[#666]">
              退款原因 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="请输入退款原因"
              rows={2}
              className="w-full resize-none rounded-[4px] border border-[#e0e0e6] px-3 py-2 text-[14px] outline-none focus:border-[var(--primary)]"
            />
          </div>

          {requireBeneficiary ? (
            <BeneficiaryFields
              paymentMethod={paymentMethod}
              accountCurrency={refundableAmount.currency}
              value={beneficiary}
              onChange={setBeneficiary}
            />
          ) : null}

          <div className="rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] px-3 py-2 text-[12px] text-[#666]">
            <div>网关订单号：{gatewayOrderId}</div>
            {transId ? <div className="mt-1">商户订单号：{transId}</div> : null}
            {paymentMethodLabel ? <div className="mt-1">支付方式：{paymentMethodLabel}</div> : null}
          </div>

          {requirePayPassword ? (
            <div>
              <label className="mb-1.5 block text-[13px] text-[#666]">
                支付密码 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={payPassword}
                onChange={(e) => setPayPassword(e.target.value)}
                placeholder="请输入支付密码"
                className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
              />
            </div>
          ) : null}

          {error ? <p className="text-[13px] text-red-500">{error}</p> : null}
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-[#e8e8ef] px-5 py-4">
          <Button variant="outline" onClick={onClose} className="h-[34px]">
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-[34px] bg-[var(--primary)] px-5 text-white hover:bg-[#4338ca]"
          >
            确认退款
          </Button>
        </div>
      </div>
    </div>
  );
}
