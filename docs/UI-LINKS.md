# UI 链接速查表

> 启动方式：`npm run dev`  
> 基础地址：**http://localhost:3000**

---

## 总导航

| 页面 | 链接 |
|------|------|
| 首页（三端入口） | http://localhost:3000/ |

---

## OPS 运营平台

| 页面 | 路由 | 完整链接 |
|------|------|----------|
| 网关退款订单列表 | `/gateway-order-refund-list` | http://localhost:3000/gateway-order-refund-list |
| 网关退款订单详情 | `/gateway-order-refund-detail/:id` | http://localhost:3000/gateway-order-refund-detail/GW211005332193944092?type=2&backPath=/gateway-order-refund-list&businessType=WALLET |
| 退款审核 | `/refund-review` | http://localhost:3000/refund-review |
| 代付退款列表 | `/payout-refund-list` | http://localhost:3000/payout-refund-list |
| 代付退款详情（OPS） | `/ops-payout-refund-detail/:id` | http://localhost:3000/ops-payout-refund-detail/RG211005336771096419?backPath=/payout-refund-list |

### 线上原型（需登录）

| 页面 | 链接 |
|------|------|
| 网关退款订单列表 | https://ops-card-dev.eu.paykka.com/gateway-order-refund-list |
| 网关退款订单详情 | https://ops-card-dev.eu.paykka.com/gateway-order-refund-detail/GW211005332193944092?type=2&backPath=/gateway-order-refund-list&businessType=WALLET |
| 退款审核 | https://ops-card-dev.eu.paykka.com/refund-review |

---

## MPS 商户端

| 页面 | 路由 | 完整链接 |
|------|------|----------|
| 退款订单列表 | `/order/refund-list` | http://localhost:3000/order/refund-list |
| 退款订单详情（代付退） | `/order/refund-detail/:id` | http://localhost:3000/order/refund-detail/RG211005336771096419?businessType=ACQUIRING |
| 交易订单列表 | `/order/transaction-list` | http://localhost:3000/order/transaction-list |
| 交易详情（代付退 PromptPay） | `/order/transaction-detail/:id` | http://localhost:3000/order/transaction-detail/GW20620xxxxx6999?businessType=ACQUIRING |
| 交易详情（原路退 CARD） | `/order/transaction-detail/:id` | http://localhost:3000/order/transaction-detail/GW210985551234567890?businessType=ACQUIRING |

### 线上原型（需登录）

| 页面 | 链接 |
|------|------|
| 退款订单列表 | https://portal-dev.paykka.com/order/refund-list |
| 退款订单详情 | https://portal-dev.paykka.com/order/refund-detail/RG211005336771096419?businessType=WALLET |
| 交易订单列表 | https://portal-dev.paykka.com/order/transaction-list |
| 交易订单详情 | https://portal-dev.paykka.com/order/transaction-detail/GW210992922008472655?businessType=WALLET |

---

## 消费者收款页

| 页面 | 路由 | 完整链接 |
|------|------|----------|
| Payout Link（PromptPay 示例） | `/payout/:token` | http://localhost:3000/payout/AbCd1234 |

---

## 路由一览（Next.js App Router）

```
/                                          首页导航
/gateway-order-refund-list                 OPS 网关退款列表
/gateway-order-refund-detail/[id]          OPS 网关退款详情
/refund-review                             OPS 退款审核
/payout-refund-list                               OPS 代付退款列表
/ops-payout-refund-detail/[id]             OPS 代付退款详情
/order/refund-list                         MPS 退款列表
/order/refund-detail/[id]                  MPS 退款详情
/order/transaction-list                    MPS 交易列表
/order/transaction-detail/[id]             MPS 交易详情
/payout/[token]                            消费者收款页
```
