"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ManualPayoutBackfillPayload } from "@/types/payout-refund";

const CHANNEL_OPTIONS = [
  { value: "PAYLOCO", label: "Payloco" },
  { value: "MANUAL_BANK", label: "线下银行转账" },
  { value: "MANUAL_WALLET", label: "线下钱包转账" },
  { value: "OTHER", label: "其他渠道" },
];

interface ManualPayoutBackfillModalProps {
  open: boolean;
  outcome: "SUCCESS" | "FAILURE";
  refundOrderId: string;
  refundAmount: string;
  currency: string;
  beneficiaryMasked?: string;
  /** 自动代付失败时预填渠道返回的失败原因 */
  initialFailureReason?: string;
  onClose: () => void;
  onSubmit?: (payload: ManualPayoutBackfillPayload) => void;
}

export function ManualPayoutBackfillModal({
  open,
  outcome,
  refundOrderId,
  refundAmount,
  currency,
  beneficiaryMasked,
  initialFailureReason,
  onClose,
  onSubmit,
}: ManualPayoutBackfillModalProps) {
  const [channelPayoutOrderId, setChannelPayoutOrderId] = useState("");
  const [channelCode, setChannelCode] = useState("MANUAL_BANK");
  const [payoutCompletedAt, setPayoutCompletedAt] = useState("");
  const [failureReason, setFailureReason] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setChannelPayoutOrderId("");
      setChannelCode("MANUAL_BANK");
      setPayoutCompletedAt(new Date().toISOString().slice(0, 16));
      setFailureReason(initialFailureReason ?? "");
      setRemark("");
      setError("");
    }
  }, [open, outcome, initialFailureReason]);

  if (!open) return null;

  const isSuccess = outcome === "SUCCESS";
  const title = isSuccess ? "确认打款成功" : "打款失败登记";

  const handleSubmit = () => {
    if (isSuccess) {
      if (!channelPayoutOrderId.trim()) {
        setError("请填写渠道代付订单号（或线下打款凭证号）");
        return;
      }
      if (!channelCode) {
        setError("请选择渠道");
        return;
      }
      if (!payoutCompletedAt) {
        setError("请选择打款完成时间");
        return;
      }
    } else if (!failureReason.trim()) {
      setError("请填写失败原因");
      return;
    }

    setError("");
    onSubmit?.({
      outcome,
      channelPayoutOrderId: isSuccess ? channelPayoutOrderId.trim() : undefined,
      channelCode: isSuccess ? channelCode : undefined,
      payoutCompletedAt: isSuccess ? payoutCompletedAt : undefined,
      failureReason: isSuccess ? undefined : failureReason.trim(),
      remark: remark.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[480px] rounded-[6px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#e8e8ef] px-5 py-4">
          <h3 className="text-[16px] font-medium text-[#333]">{title}</h3>
          <button type="button" onClick={onClose} className="text-[#999] hover:text-[#333]">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <p className="rounded-[4px] bg-[#f5f6fa] px-3 py-2 text-[12px] text-[#666]">
            {isSuccess
              ? "运营在线下完成打款后，回填渠道订单号与打款时间，系统将退款单置为成功并通知商户。"
              : "登记打款失败原因，退款单将置为 FAILURE（任意非终态均可操作），商户可再发起新退款。"}
          </p>

          <div className="rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] px-3 py-2 text-[12px] text-[#666]">
            <div>退款单号：{refundOrderId}</div>
            <div className="mt-1">
              退款金额：{refundAmount} {currency}
            </div>
            {beneficiaryMasked ? <div className="mt-1">收款账户：{beneficiaryMasked}</div> : null}
          </div>

          {isSuccess ? (
            <>
              <div>
                <label className="mb-1.5 block text-[13px] text-[#666]">
                  渠道代付订单号 <span className="text-red-500">*</span>
                </label>
                <input
                  value={channelPayoutOrderId}
                  onChange={(e) => setChannelPayoutOrderId(e.target.value)}
                  placeholder="Payloco 返回的 payout id，或银行/钱包转账流水号"
                  className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] text-[#666]">
                  渠道 <span className="text-red-500">*</span>
                </label>
                <select
                  value={channelCode}
                  onChange={(e) => setChannelCode(e.target.value)}
                  className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
                >
                  {CHANNEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] text-[#666]">
                  打款完成时间 <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={payoutCompletedAt}
                  onChange={(e) => setPayoutCompletedAt(e.target.value)}
                  className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="mb-1.5 block text-[13px] text-[#666]">
                失败原因 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                placeholder="如：账户不存在、银行拒绝、渠道余额不足等"
                rows={3}
                className="w-full resize-none rounded-[4px] border border-[#e0e0e6] px-3 py-2 text-[14px] outline-none focus:border-[var(--primary)]"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[13px] text-[#666]">备注（选填）</label>
            <input
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="运营内部备注"
              className="h-[36px] w-full rounded-[4px] border border-[#e0e0e6] px-3 text-[14px] outline-none focus:border-[var(--primary)]"
            />
          </div>

          {error ? <p className="text-[13px] text-red-500">{error}</p> : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e8e8ef] px-5 py-4">
          <Button variant="outline" onClick={onClose} className="h-[34px]">
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            className={
              isSuccess
                ? "h-[34px] bg-emerald-600 px-5 text-white hover:bg-emerald-700"
                : "h-[34px] bg-amber-600 px-5 text-white hover:bg-amber-700"
            }
          >
            {isSuccess ? "确认打款成功" : "确认登记"}
          </Button>
        </div>
      </div>
    </div>
  );
}
