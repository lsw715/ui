import { PayoutLinkForm } from "@/components/payout/PayoutLinkForm";

export default function PayoutLinkPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
      <div className="w-full max-w-[480px] rounded-[12px] bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <span className="text-[20px] font-semibold text-[var(--primary)]">PayKKa</span>
          <p className="mt-1 text-[13px] text-[#999]">退款收款</p>
        </div>
        <PayoutLinkForm
          merchantName="Bangkok Retail Co."
          amount="1,500.00"
          currency="THB"
          orderId="GW20620xxxxx6999"
          paymentMethod="PROMPTPAY"
        />
      </div>
    </div>
  );
}
