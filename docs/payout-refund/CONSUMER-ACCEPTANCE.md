# 东南亚消费者会不会在链接上填退款账户？

**日期**：2026-07-10  
**版本**：v1.1（易懂版 + 出处清单）  
**给谁看**：产品 / 研发 / 业务评审  

**关联**：语雀 [代付退 Link 方案](https://jlpay.yuque.com/pmw77l/baps75/fx697c0ssy6ppuxa) · [`COMPETITOR-BENCHMARK.md`](./COMPETITOR-BENCHMARK.md)

---

## 先给结论（30 秒看完）

| 问题 | 答案 |
|------|------|
| 有没有调研说「X% 东南亚人愿意填」？ | **没有**。搜不到这种公开报告。 |
| 行业里有人这么干吗？ | **有**。Xendit 在泰国/印尼等推 **Payout Link**，就是让消费者自己填银行/钱包账号领退款。 |
| 消费者到底会不会填？ | **想退钱的人会填**——但不填陌生链接；要看起来像「官方退款页」。 |
| 最大障碍是什么？ | **怕诈骗**。泰国尤其多「假退款、假 QR、假链接」套路，用户很警惕。 |
| PayKKa 怎么办？ | **可以做**，页面要做信任感；上线后看 **打开率、填完率**，数据说话。 |

**一句话**：不是「东南亚人接不接受 Link」——是 **「这是不是一笔我知道的退款」**；像官方退款页就填，像诈骗短信就不填。

---

## 1. 我们在问什么

PromptPay、QRIS 等付出去的钱，**退不回原支付账户**。

PayKKa 的做法：发一条 **退款链接**，消费者在网页上填 **收款银行/钱包账号**，再打款过去。

评审真正关心的是：

> 东南亚消费者看到这个链接，**愿不愿意填？会不会当成诈骗？**

---

## 2. 行业里已经有人在做了（有据可查）

不能原路退时，各家 PSP 都要 **先拿到消费者收款账号，再代付**。  
差别只是：**谁去收集**——商户问、发邮件问、还是 **发链接让消费者自己填**。

### 2.1 Xendit Payout Link（和我们最像）

**是什么**：商户发起退款 → Xendit 发邮件给消费者 → 消费者打开 **托管网页** → 选银行/钱包 → 填账号 → 输密码确认 → 打款。

**官方怎么说的**（[Xendit 泰国产品页](https://www.xendit.co/en-th/products/xenpayout/)）：

- 用途：refunds、reimbursements、cashbacks
- 商户 **不用先收集** 消费者银行信息
- 消费者自己在 **hosted payout page** 填
- 邮件里带 **链接 + secret password**
- 泰国支持 **31+ 银行**

**操作文档**（[Xendit Dashboard 说明](https://docs.xendit.co/docs/payout-link-via-dashboard)）：

- 创建后 **Xendit 代发邮件** 给消费者
- 消费者填完账号、验证密码后才开始打款
- 填错或打款失败 → **重新建一条 Link** 让消费者再填
- Link 默认 **3 天过期**（[Help Center](https://help.xendit.co/hc/en-us/articles/4414948437529-How-Can-I-Simulate-Payout-Links-in-Test-Mode)）

**说明什么**：Xendit 在东南亚多国把这套当 **正式产品** 卖，专门解决退款场景——说明行业认为 **消费者填链领退款** 跑得通。  
**但**：Xendit **没公开**「多少人打开、多少人填完」的数据。

### 2.2 Stripe PromptPay（泰国 · 发邮件要账号）

**来源**：[Stripe PromptPay 文档](https://docs.stripe.com/payments/promptpay)

- PromptPay 可以发起 Refund，但 **不能自动退回原账户**
- Stripe **自动发邮件** 给消费者，要退款银行账户
- 消费者不提供账号 → 退不了

**说明什么**：不是 Link 页，但逻辑一样——**等退款的人，需要主动把账号告诉 PSP**。

### 2.3 其他（邮件收集）

| 平台 | 做法 | 出处 |
|------|------|------|
| dLocal | 缺收款信息时 **发邮件问买家** | [dLocal Refunds](https://docs.dlocal.com/docs/refunds) |
| PingPong / 连连 | **商户问消费者** 后 API 上送 | 见 [`COMPETITOR-BENCHMARK.md`](./COMPETITOR-BENCHMARK.md) |

---

## 3. 消费者什么时候会填、什么时候不会

| 情况 | 会不会填 | 为什么 |
|------|:--------:|--------|
| 我刚在这家店付过款，正在等退款 | ✅ 高 | 不填就拿不回钱 |
| 短信/LINE 里陌生「领奖/退款链接」 | ❌ 低 | 和诈骗话术一模一样 |
| 店铺客服微信/LINE 一对一要账号 | ⚠️ 中 | 习惯，但怕信息被乱用 |
| PayKKa 官方域名 + 能看到订单金额 | ✅ 高 | 对得上、像真的 |

**核心**：消费者不是拒绝「填账号」，是拒绝 **「不确定是不是骗子的链接」**。

---

## 4. 为什么要小心：东南亚「假退款」很多

Link 填账号最大的敌人不是「不会用手机银行」，是 **怕钓鱼**。

### 4.1 泰国：假「扫码领退款」是高发套路

骗子常冒充网店：**「商品有问题，给你退款」** → 发 **假 QR 或假链接** → 其实是让你 **转出** 钱。

**官方/媒体怎么提醒的**：

| 出处 | 说了什么 |
|------|----------|
| [泰国商务部警示](https://e-library.moc.go.th/news/detail/4094) | 真退款 **不用扫别人的 QR**；只要告诉 **自己的** 手机号或账号就行 |
| [曼谷商业新闻](https://www.bangkokbiznews.com/news/news-update/1221872) | 同上；还提醒：让你 **自己输入金额** 的多半是转出 |
| [泰国 SCB 银行防诈](https://www.scb.co.th/th/personal-banking/fraud-fighter/update-fraud/scan-or-scam) | 「Scan or Scam?」— 收钱的 QR 不该是别人发给你的 |
| [Thai PBS 核查](https://www.thaipbs.or.th/verify/content/4967) | 假退款 + 假 QR 已成新骗术 |

**对 PayKKa 的启示**：

- 页面文案要写清楚：**「填你的收款账号，不是扫码付钱」**
- **不要** 让消费者扫 QR 来「领退款」（和诈骗话术撞车）
- 用 **官方网页填表**，和骗子套路区分开

### 4.2 东盟整体：诈骗焦虑在涨

**GSMA 2025 东盟消费者诈骗报告**（[PDF 全文](https://www.gsma.com/about-us/regions/asia-pacific/wp-content/uploads/2025/11/GSMA-ASEAN-Consumer-Scam-Report-2025_FINAL_1024.pdf)）：

| 数据 | 含义 |
|------|------|
| **45%** 的人说过自己被骗过（2024 年还是 31%） | 用户对「链接/要钱/要账号」极度敏感 |
| **96%** 担心诈骗 | 页面必须一眼像官方 |
| 诈骗多从 **电话、LINE/WhatsApp** 来 | 短信/IM 里的裸链接信任度低 |
| **81%** 愿为更安全换金融服务 | 做得安全是加分项 |

**印尼 FICO 2024 调研**（[新闻稿](https://fico.gcs-web.com/news-releases/news-release-details/fico-survey-1-3-indonesian-consumers-blame-banks-scam-losses)）：

- **66%** 的人 2024 年收到过可疑消息  
- 多数人 **不指望** 被骗后能轻易退钱，但 **希望银行/平台防诈**

---

## 5. Xendit 怎么让消费者敢填（可对齐 PayKKa）

```
商户发起退款
    ↓
Xendit 发邮件（链接 + 密码 + 说明）
    ↓
消费者打开托管页（可带商户 Logo）
    ↓
选银行/钱包 → 填账号 → 输密码
    ↓
打款；失败则重新发 Link
```

| Xendit 做法 | 为什么 |
|-------------|--------|
| **邮件直发**（不只靠商户转发） | 减少假链 |
| **Secret password** | 链接泄露别人也领不走 |
| **商户品牌定制** | 消费者认得是谁退的钱 |
| **只对成功打款收费** | 接受「有人不填完」 |

PayKKa Link 方案里的 **校验码、一次性 token、订单金额展示**，和上面是同一思路。

---

## 6. PayKKa 建议

### 6.1 能不能做？

**可以做。** 有 Xendit/Stripe 先例，且「等退款」动机足够强。

### 6.2 页面必须让人信（上线前）

| # | 要做 |
|---|------|
| 1 | 固定官方域名（如 `pay.paykka.com`）+ HTTPS |
| 2 | 显示 **商户名、退款金额、原订单号** |
| 3 | 短信/邮件 **校验码** 或 Xendit 式 **密码** |
| 4 | 本地语言（泰语 / 印尼语 / 英语） |
| 5 | 写清楚：**「仅用于本次退款，不是付款页面」** |
| 6 | 提交后链接失效；完整账号不对外展示 |

### 6.3 上线后看什么数（自己造证据）

公开调研没有，**只能用自己的数据**：

| 指标 | 什么意思 |
|------|----------|
| **打开率** | 发链后多少人点开（低 = 不信任或文案差） |
| **提交率** | 打开后多少人填完（**核心指标**） |
| **过期率** | 多少人没填就过期了 |
| **一次打款成功率** | 字段设计是否合理 |

按 **国家 × 支付方式 × 短信还是邮件** 拆开看，跑 3 个月就有对内结论。

### 6.4 若填完率很低

可同时保留 **商户收集** 方案（见 [`REQUIREMENTS-API.md`](./REQUIREMENTS-API.md)）——让消费者继续通过熟悉的客服渠道提供账号。

---

## 7. 出处清单（按类型）

### 7.1 行业产品 / 官方文档（一手）

| 主题 | 链接 |
|------|------|
| Xendit Payout Links · 泰国 | https://www.xendit.co/en-th/products/xenpayout/ |
| Xendit Payout Links · 印尼 | https://www.xendit.co/en-id/products/xenpayout/ |
| Xendit 博客：Dashboard 创建退款 Link | https://www.xendit.co/en/blog/payouts-can-now-be-created-on-dashboard-enabling-you-to-simplify-refunds-even-more/ |
| Xendit Dashboard 操作文档 | https://docs.xendit.co/docs/payout-link-via-dashboard |
| Xendit Payout Links API | https://xendit-docs.document360.io/docs/integration-payout-links |
| Xendit 测试模式规则（3 天过期、密码错 3 次） | https://help.xendit.co/hc/en-us/articles/4414948437529-How-Can-I-Simulate-Payout-Links-in-Test-Mode |
| Stripe PromptPay 退款要账户 | https://docs.stripe.com/payments/promptpay |
| Stripe Refunds · requires_action | https://docs.stripe.com/refunds |
| dLocal Refunds | https://docs.dlocal.com/docs/refunds |

### 7.2 调研报告 / 学术

| 主题 | 链接 |
|------|------|
| GSMA 东盟消费者诈骗报告 2025（PDF） | https://www.gsma.com/about-us/regions/asia-pacific/wp-content/uploads/2025/11/GSMA-ASEAN-Consumer-Scam-Report-2025_FINAL_1024.pdf |
| FICO 2024 印尼诈骗调研 | https://fico.gcs-web.com/news-releases/news-release-details/fico-survey-1-3-indonesian-consumers-blame-banks-scam-losses |
| 泰国 PromptPay 与消费者保护 gap（学术） | https://doi.org/10.5281/zenodo.20065744 |
| 印尼/泰国电商消费者保护比较 | https://doi.org/10.56301/awl.v8i2.2047 |

### 7.3 新闻 / 银行防诈（泰国假退款）

| 主题 | 链接 |
|------|------|
| 泰国商务部 · 假退款 QR 警示 | https://e-library.moc.go.th/news/detail/4094 |
| 曼谷商业新闻 · 扫码领退款骗局 | https://www.bangkokbiznews.com/news/news-update/1221872 |
| 泰国 SCB 银行 · Scan or Scam | https://www.scb.co.th/th/personal-banking/fraud-fighter/update-fraud/scan-or-scam |
| Thai PBS 核查 · 假 QR 领退款 | https://www.thaipbs.or.th/verify/content/4967 |
| Stripe · 泰国电商欺诈指南 | https://stripe.com/resources/more/ecommerce-fraud-thailand |
| 泰国 2025 诈骗受害退款政策 | https://www.nationthailand.com/news/policy/40048551 |

### 7.4 视频（YouTube · 辅助理解本地防诈环境）

> 说明：**未找到** Xendit Payout Link 消费者填表过程的官方演示视频；下列为 **东南亚反诈 / 退款骗局** 相关，帮助理解「用户为什么怕链接」。

| 主题 | 链接 | 备注 |
|------|------|------|
| 泰国 AOC 1441 · 被骗后怎么办 | https://www.youtube.com/watch?v=iwOUuQEa1vw | 泰国公益短视频，650 万+播放；强调打 **1441** |
| 泰国 AOC 1441 · 网络安全意识 | https://www.youtube.com/watch?v=o0GPolwrqyk | 提醒勿点陌生 SMS/链接 |
| 亚洲反诈峰会 2025 回顾 | https://www.youtube.com/watch?v=cUy160wyXuQ | Global Anti-Scam Summit Asia |
| Xendit 支付集成（开发者向） | https://www.youtube.com/watch?v=oxdE3Y6viAE | 第三方教程，非 Payout Link 专项 |
| 东南亚电诈产业（DW 新闻） | https://www.youtube.com/watch?v=m6qFCdHvYuI | 背景：区域诈骗生态 |

**泰国 TikTok/短视频里的「假退款 QR」案例**（Thai PBS 文字核查，含视频截图）：  
https://www.thaipbs.or.th/verify/content/4967

---

## 8. 评审一句话

**没有**「东南亚 X% 愿意填 Link」的公开数据；**有** Xendit 等产品证明 **「让消费者填账号领退款」** 在行业里成立。真正决定填不填的是 **信任**——东盟诈骗高发，Link 必须像 **官方退款页**，不能像诈骗短信；PayKKa 上线后用 **打开率 / 提交率** 自己验证，必要时保留商户代收集兜底。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-10 | 初版 |
| 2026-07-10 | v1.1：口语化重写；补充新闻/YouTube 出处清单 |
