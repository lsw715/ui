# MpsRefundList Specification

## Overview
- **Target file:** `src/components/mps/MpsRefundList.tsx`
- **Interaction model:** click-driven (search, pagination, export, view detail)

## Features
- 全局搜索 + 8 个筛选字段
- 导出按钮
- 表格列：操作、退款金额、退款状态、退款创建时间、商户退款订单号、PayKKa退款订单号、支付方式、退款完成时间
- 分页 10 条/页

## Mock Data
- `src/data/mock-mps-orders.ts` → `mockMpsRefunds`
