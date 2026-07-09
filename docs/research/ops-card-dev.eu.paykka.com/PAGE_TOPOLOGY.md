# PayKKa OPS 页面拓扑

> 线上参考：https://ops-card-dev.eu.paykka.com  
> 本地演示：http://localhost:3000  
> 代付退款需求：`docs/payout-refund/REQUIREMENTS.md`

## 页面列表

| 路由 | 页面 | 本地链接 | 组件 |
|------|------|----------|------|
| `/gateway-order-refund-list` | 网关退款订单列表 | http://localhost:3000/gateway-order-refund-list | `GatewayRefundList` |
| `/gateway-order-refund-detail/[id]` | 网关退款订单详情 | http://localhost:3000/gateway-order-refund-detail/GW211005332193944092?type=2&backPath=/gateway-order-refund-list&businessType=WALLET | `GatewayRefundDetail` |
| `/refund-review` | 退款审核 | http://localhost:3000/refund-review | `RefundReviewList` |
| `/payout-refund-list` | 代付退款列表 | http://localhost:3000/payout-refund-list | `PayoutRefundList` |
| `/ops-payout-refund-detail/[id]` | 代付退款详情（运营操作） | http://localhost:3000/ops-payout-refund-detail/RG211005336771096419?backPath=/payout-refund-list | `OpsPayoutRefundDetail` |

## 全局布局

```
┌─────────────────────────────────────────────────────────────┐
│ OpsHeader (breadcrumb + user actions)                       │
├──────────┬──────────────────────────────────────────────────┤
│ OpsSide  │ Main content (search / table / pagination)       │
│ bar      │                                                  │
│ (dark)   │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

## 侧边栏菜单（网关订单）

- 网关支付订单
- 网关退款订单 → `/gateway-order-refund-list`
- 退款审核 → `/refund-review`
- **代付退款列表** → `/payout-refund-list`（新增）
- 交易日志

## 代付退款 OPS 职责

| 环节 | 页面 | 操作 |
|------|------|------|
| 审核 | 退款审核 | 通过 / 拒绝（发起人 ≠ 审核人） |
| 待办 | 代付退款列表 | 人工打款 / 打款失败筛选 |
| 补救 | 待办 + 详情 | 继续跟进 / 打款结果确认 |

## Auth Note

线上页面未登录会跳转 `/login`。本地克隆无鉴权。
