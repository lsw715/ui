# MPS 商户端交互行为

> 本地演示链接见 [docs/README.md](../../README.md)

## 列表页（退款 / 交易）

- **查询**：点击「查询」应用筛选条件
- **重置**：清空所有筛选字段
- **导出**：点击后显示「导出任务已提交」提示
- **查看**：操作列眼睛图标跳转详情页
- **分页**：上一页 / 下一页

## 交易详情 · 退款（代付退）

- **退款按钮**：`refundStrategy !== NOT_SUPPORTED` 时显示
- **退款弹窗**：
  - 展示退款策略（原路退 / 代付退）
  - 金额、支付密码必填
  - 代付退可选链接发送方式（SMS / EMAIL / LINK_ONLY）
  - 不收集消费者卡号 / 联系方式
- **提交后**：提示等待审核

链接：http://localhost:3000/order/transaction-detail/GW20620xxxxx6999?businessType=ACQUIRING

## 退款详情

- **返回**：跳转回退款列表
- **跨页链接**：PayKKa 订单号可跳转交易详情
- **代付退**：展示收款链接（可复制）、脱敏收款信息
- **补救**：补发/重新签发链接需联系运营（页面有提示）

链接：http://localhost:3000/order/refund-detail/RG211005336771096419?businessType=ACQUIRING

## 响应式

- 搜索表单：4 列 → 2 列 → 1 列
- 表格横向滚动
