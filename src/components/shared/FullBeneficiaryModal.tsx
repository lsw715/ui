"use client";

import { useState } from "react";
import { AlertTriangle, Copy, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FullBeneficiary } from "@/types/payout-refund";

interface FullBeneficiaryModalProps {
  open: boolean;
  refundOrderId: string;
  beneficiary: FullBeneficiary;
  onClose: () => void;
  onAuditLog?: (refundOrderId: string) => void;
}

function copyText(text: string, onCopied: () => void) {
  void navigator.clipboard.writeText(text).then(onCopied);
}

export function FullBeneficiaryModal({
  open,
  refundOrderId,
  beneficiary,
  onClose,
  onAuditLog,
}: FullBeneficiaryModalProps) {
  const [revealed, setRevealed] = useState(false);
  const [copyHint, setCopyHint] = useState("");

  if (!open) return null;

  const handleReveal = () => {
    setRevealed(true);
    onAuditLog?.(refundOrderId);
  };

  const handleClose = () => {
    setRevealed(false);
    setCopyHint("");
    onClose();
  };

  const fields = [
    { label: "收款人姓名", value: beneficiary.beneficiaryName },
    {
      label: "账户类型",
      value: beneficiary.accountType === "BANK" ? "银行账户" : "电子钱包",
    },
    { label: "收款账号", value: beneficiary.accountNumber, mono: true },
    { label: "币种", value: beneficiary.accountCurrency },
    ...(beneficiary.bankName ? [{ label: "银行", value: beneficiary.bankName }] : []),
    ...(beneficiary.bankCode ? [{ label: "银行编码", value: beneficiary.bankCode, mono: true }] : []),
    ...(beneficiary.walletBrand ? [{ label: "钱包品牌", value: beneficiary.walletBrand }] : []),
    ...(beneficiary.clearingSysType
      ? [{ label: "清算系统", value: beneficiary.clearingSysType }]
      : []),
    ...(beneficiary.clearingSysNumber
      ? [{ label: "清算号", value: beneficiary.clearingSysNumber, mono: true }]
      : []),
  ];

  const copyAll = () => {
    const lines = fields.map((f) => `${f.label}: ${f.value}`);
    copyText(lines.join("\n"), () => {
      setCopyHint("已复制全部收款信息");
      setTimeout(() => setCopyHint(""), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[520px] rounded-[6px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#e8e8ef] px-5 py-4">
          <h3 className="text-[16px] font-medium text-[#333]">完整收款信息</h3>
          <button type="button" onClick={handleClose} className="text-[#999] hover:text-[#333]">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="flex gap-2 rounded-[4px] border border-amber-200 bg-amber-50 px-3 py-2.5 text-[12px] text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>
              完整账号仅用于人工打款，禁止外传商户或第三方。本次查看将记入审计日志。
            </span>
          </div>

          <div className="rounded-[4px] border border-[#e8e8ef] bg-[#fafafa] px-3 py-2 text-[12px] text-[#666]">
            退款单号：{refundOrderId}
          </div>

          {!revealed ? (
            <div className="rounded-[4px] border border-dashed border-[#d0d0d8] bg-[#fafafa] px-4 py-8 text-center">
              <Eye className="mx-auto mb-2 size-8 text-[#bbb]" />
              <p className="text-[13px] text-[#666]">点击下方按钮查看完整收款账号</p>
              <p className="mt-1 text-[12px] text-[#999]">用于 PayKKa 财务或合作机构线下打款</p>
            </div>
          ) : (
            <div className="space-y-2">
              {fields.map((field) => (
                <div
                  key={field.label}
                  className="flex items-start justify-between gap-3 rounded-[4px] border border-[#e8e8ef] px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] text-[#999]">{field.label}</div>
                    <div
                      className={`mt-0.5 break-all text-[14px] text-[#333] ${
                        field.mono ? "font-mono" : ""
                      }`}
                    >
                      {field.value}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-[#999] hover:text-[var(--primary)]"
                    onClick={() =>
                      copyText(field.value, () => {
                        setCopyHint(`已复制：${field.label}`);
                        setTimeout(() => setCopyHint(""), 2000);
                      })
                    }
                    aria-label={`复制${field.label}`}
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {copyHint ? <p className="text-[12px] text-[var(--primary)]">{copyHint}</p> : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e8e8ef] px-5 py-4">
          <Button variant="outline" onClick={handleClose} className="h-[34px]">
            关闭
          </Button>
          {!revealed ? (
            <Button onClick={handleReveal} className="h-[34px] bg-[var(--primary)] text-white">
              <Eye className="mr-1.5 size-4" />
              确认查看
            </Button>
          ) : (
            <Button onClick={copyAll} className="h-[34px] bg-[var(--primary)] text-white">
              <Copy className="mr-1.5 size-4" />
              复制全部
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
