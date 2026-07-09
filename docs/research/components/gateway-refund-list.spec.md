# GatewayRefundList Specification

## Overview
- **Target file:** `src/components/ops/GatewayRefundList.tsx`
- **Screenshot:** N/A (login required — spec from JS bundle `crud-CI2C-_nJ.js`)
- **Interaction model:** click-driven

## DOM Structure

```
LayoutPage (fixed-height)
└── FsCrud container
    ├── SearchPanel (grid)
    │   ├── DateRange: 退款创建时间 (default last 7 days)
    │   ├── DateRange: 退款完成时间
    │   ├── Input: 商户号 (number)
    │   ├── Input: 商户名
    │   ├── Select: 退款币种 (search only)
    │   ├── Input: PayKKa退款订单号
    │   ├── Input: 网关订单号
    │   ├── Select: 退款状态
    │   ├── Input: 商户退款订单号 (search only)
    │   ├── Input: arn (search only)
    │   └── Buttons: 查询 / 重置
    ├── ActionBar
    │   └── Button: 导出
    ├── Table
    │   └── columns (see below)
    └── Pagination
```

## Table Columns (in display order from crud config)

| key | title (zh) | width | search |
|-----|-----------|-------|--------|
| refundTransAmount | 退款金额 | auto | no |
| refundStatus | 退款状态 | auto | yes (order 8) |
| refundTime | 退款创建时间 | auto | yes (order 1, range, default 7d) |
| merchantName | 商户名 | auto | yes (order 4) |
| refundGatewayOrderId | PayKKa退款订单号 | 200px | yes (order 6) |
| gatewayOrderId | 网关订单号 | 200px | yes (order 7) |
| refundErrorDescription | 退款状态描述 | auto | no |
| refundFinishTime | 退款完成时间 | auto | yes (order 2, range) |
| merchantId | 商户号 | 155px | yes (order 3) |
| refundRemark | 退款原因 | auto | no |

## Status Values (GatewayRefundOrderStatusEnum)

- REVIEWING → 审核中
- PROCESSING → 退款中
- SUCCESS → 成功
- FAILURE → 失败

## States & Behaviors

### Export
- **Trigger:** click 导出
- **Implementation:** mock toast "导出任务已提交"

### Row View
- **Trigger:** click view icon in row handle (55px column)
- **Implementation:** console log / noop in clone

### Search date shortcuts
- 今天 / 昨天 / 近7天 / 近30天

## Text Content (verbatim labels)

- Page title breadcrumb: 网关退款订单
- Parent menu: 网关订单
- Export: 导出
- Query: 查询
- Reset: 重置

## Assets

- Logo: `public/images/ops-card-dev.eu.paykka.com/logo.png`
- Favicon: `public/seo/favicon.ico`

## Responsive Behavior

- **Desktop (1440px):** 4-column search grid, full sidebar
- **Mobile (390px):** N/A — OPS admin desktop-first
