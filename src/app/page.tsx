import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#f5f6fa] p-8">
      <h1 className="text-2xl font-semibold text-[#333]">PayKKa 页面演示</h1>
      <p className="max-w-lg text-center text-[14px] text-[#666]">
        代付退款 UI 原型 · 点击下方链接直接预览页面
      </p>
      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">OPS 运营端</h2>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/gateway-order-payment-list" className="text-[var(--primary)] hover:underline">
                网关支付订单列表
              </Link>
            </li>
            <li>
              <Link
                href="/gateway-order-payment-detail/GW211013325005848698?type=1&businessType=WALLET"
                className="text-[var(--primary)] hover:underline"
              >
                支付订单详情（发起退款）
              </Link>
            </li>
            <li>
              <Link href="/refund-review" className="text-[var(--primary)] hover:underline">
                退款审核
              </Link>
            </li>
            <li>
              <Link href="/payout-refund-list" className="text-[var(--primary)] hover:underline">
                代付退款列表
              </Link>
            </li>
            <li>
              <Link
                href="/ops-payout-refund-detail/RG211005336771096419?backPath=/payout-refund-list"
                className="text-[var(--primary)] hover:underline"
              >
                代付详情 · 人工待确认
              </Link>
            </li>
            <li>
              <Link
                href="/ops-payout-refund-detail/RG211003998877665500?backPath=/payout-refund-list"
                className="text-[var(--primary)] hover:underline"
              >
                代付详情 · 退款成功
              </Link>
            </li>
            <li>
              <Link
                href="/ops-payout-refund-detail/RG211004998877665544?backPath=/payout-refund-list"
                className="text-[var(--primary)] hover:underline"
              >
                代付详情 · 自动代付失败
              </Link>
            </li>
            <li>
              <Link href="/gateway-order-refund-list" className="text-[var(--primary)] hover:underline">
                网关退款订单列表
              </Link>
            </li>
          </ul>
        </section>
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">MPS 商户端</h2>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link
                href="/order/transaction-detail/GW20620xxxxx6999?businessType=ACQUIRING"
                className="text-[var(--primary)] hover:underline"
              >
                交易详情（代付退）
              </Link>
            </li>
            <li>
              <Link href="/order/refund-detail/RG211005336771096419?businessType=ACQUIRING" className="text-[var(--primary)] hover:underline">
                退款详情
              </Link>
            </li>
            <li>
              <Link href="/order/transaction-list" className="text-[var(--primary)] hover:underline">
                交易列表
              </Link>
            </li>
            <li>
              <Link href="/order/refund-list" className="text-[var(--primary)] hover:underline">
                退款列表
              </Link>
            </li>
          </ul>
        </section>
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">消费者</h2>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/payout/AbCd1234" className="text-[var(--primary)] hover:underline">
                收款链接页
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
