# GatewayRefundDetail Specification

## Overview
- **Target file:** `src/components/ops/GatewayRefundDetail.tsx`
- **Route:** `/gateway-order-refund-detail/[id]?type=2&backPath=...&businessType=WALLET`
- **Source:** `views/transaction/gateway-detail/DetailForWallet.vue`
- **Interaction model:** click-driven (tabs, back nav, refund action)

## Layout
- Back button → `backPath` query param
- Section card "网关"
- Description sections: 基本信息, 状态, 交易信息
- Tabs: 支付 / 退款 (default tab from `type` query: type=2 → refund)
- Footer: 退款 button

## 基本信息 Fields
- 网关订单号, 商户订单号, 支付创建时间, 支付完成时间, 商户号, 商户名

## 状态 Fields
- 订单状态, 网关订单状态码, 网关订单描述, 争议状态

## 交易信息 Fields
- 交易金额, 请款金额, 渠道编码, MID, 支付方式, 产品编码, 支付类型, 用户ID, MCC

## Refund Tab Columns
- 退款订单号, 商户退款订单号, 退款状态, 退款金额, 退款创建时间, 退款完成时间, 退款原因

## Mock Order ID
- `GW211005332193944092` (from user URL)
