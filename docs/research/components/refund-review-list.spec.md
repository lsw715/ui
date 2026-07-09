# RefundReviewList Specification

## Overview
- **Target file:** `src/components/ops/RefundReviewList.tsx`
- **Route:** `/refund-review`
- **Source:** `views/transaction/refund-review-list/crud.tsx` (`crud-BjgcsZma.js`)
- **API:** `POST /ops/refund/review/page`, `POST /ops/refund/review`
- **Interaction model:** click-driven (search, batch approve/reject, row selection)

## Features
- Default search: `reviewStatus = REVIEWING`
- Row selection: multi-select, only REVIEWING rows enabled
- Action bar: 通过 / 拒绝 (batch)
- Reject opens modal with optional opinion textarea (max 120 chars)

## Column Groups
1. **退款风险信息:** 审核状态, 拒绝原因
2. **退款订单信息:** 金额, 网关订单号, 退款网关订单号, 退款创建时间, 商户号, 商户名, 支付方式, 退款原因
3. **审核人信息:** 姓名, 邮箱, 用户名, 用户ID

## Search Fields
- 退款创建时间 (range)
- 审核状态 (default REVIEWING)
- 商户号
- 退款网关订单号
- 网关订单号
- 支付方式
