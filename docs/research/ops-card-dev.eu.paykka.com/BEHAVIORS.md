# OPS 运营平台交互行为

> 本地演示链接见 [docs/README.md](../../README.md)

## 网关退款列表

- 搜索 / 重置 / 导出 / 分页
- 查看跳转详情（带 `type`、`backPath`、`businessType` 参数）

链接：http://localhost:3000/gateway-order-refund-list

## 退款审核

- 多选待审核订单 → 批量通过 / 拒绝
- 拒绝弹窗填写原因
- 展示退款方式（原路退 / 代付退）、发起人
- 自己发起的不能自己审（业务规则，详情页有提示）

链接：http://localhost:3000/refund-review

## 代付退款列表

- Tab 筛选：全部 / 人工打款待办 / 打款失败待办
- 按 `internal_status` 展示不同操作按钮：
  - `WAITING_FILL` / `LINK_EXPIRED` → 继续跟进（补发 / 重新签发）
  - `PAY_FAILED` + 渠道问题 → 继续跟进（重新代付）；账号问题 → 继续跟进（重新签发）
  - `PAYING` + 人工 → 确认打款成功 / 打款失败

链接：http://localhost:3000/payout-refund-list

## 代付退款详情（OPS）

- 展示内部 7 态 + 对外映射
- 收款链接、脱敏收款信息、失败原因
- 底部操作栏：继续跟进 / 确认打款成功 / 打款失败

链接：http://localhost:3000/ops-payout-refund-detail/RG211005336771096419?backPath=/payout-refund-list

## 消费者收款页（关联）

链接：http://localhost:3000/payout/AbCd1234
