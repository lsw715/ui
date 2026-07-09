# MPS 商户端页面拓扑

> 线上参考：https://portal-dev.paykka.com  
> 本地演示：http://localhost:3000  
> 代付退款需求：`docs/payout-refund/REQUIREMENTS.md`

## 全局布局

- 左侧浅色侧边栏（220px，白底）
- 顶部面包屑 + 商户名 / 语言 / 通知
- 主内容区浅灰背景 `#f5f6fa`

## 页面列表

| 路由 | 页面 | 本地链接 | 组件 |
|------|------|----------|------|
| `/order/refund-list` | 退款订单列表 | http://localhost:3000/order/refund-list | `MpsRefundList` |
| `/order/refund-detail/[id]` | 退款订单详情 | http://localhost:3000/order/refund-detail/RG211005336771096419?businessType=ACQUIRING | `MpsRefundDetail` |
| `/order/transaction-list` | 交易订单列表 | http://localhost:3000/order/transaction-list | `MpsTransactionList` |
| `/order/transaction-detail/[id]` | 交易订单详情 | http://localhost:3000/order/transaction-detail/GW20620xxxxx6999?businessType=ACQUIRING | `MpsTransactionDetail` |

## 侧边栏菜单

- 订单（展开）
  - 交易订单 → `/order/transaction-list`
  - 退款订单 → `/order/refund-list`

## 代付退款相关（Payout Link）

| 功能 | 入口 | 说明 |
|------|------|------|
| 发起代付退 | 交易详情 → 退款 | `RefundModal`，只填金额 + 原因 + 支付密码 |
| 查看链接 | 退款详情 | 可复制 `payout_link_url`（LINK_ONLY） |
| 脱敏收款 | 退款详情 | 消费者填完后显示后四位 |
