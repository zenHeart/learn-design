---
title: 设计工作流与流程体系
description: 双钻模型、Systemic Design、Design Sprint、IBM EDT、Lean UX 与设计系统工作流对照；跨体系 7 条共性原则；DTCG token 标准澄清。
---

# 设计工作流与流程体系

> 目标：回答"一个设计从想法到落地经过哪些阶段、每个阶段有什么产物、不同体系如何取舍"。流程是审视产品的提问顺序，也是 agent 做设计评审时的方法论骨架。
> 取用日期 2026-09-02，全部信源当日验证。

## 流程体系对照

| 体系 | 出处 | 骨架 | 适用场景 | 产物 |
|---|---|---|---|---|
| 双钻模型 Double Diamond | British Design Council（2003 前后提出，至今未被取代） | Discover → Define → Develop → Deliver（两对发散/收敛） | 通用问题定义框架，最适合做"我们先解决的是什么问题"的对齐 | 问题定义 → 设计概要 → 方案 → 上线方案 |
| Systemic Design Framework | Design Council（2021 官方增补） | Explore → Reframe → Create → Catalyse + 外圈四类不可见活动 | 系统性/可持续挑战；是双钻的**扩展而非替代** | 系统地图 + 干系人关系 |
| Design Sprint | GV（Jake Knapp），designsprintkit.withgoogle.com | 5 天：Map → Sketch → Decide → Prototype → Test（GV DIY 版命名） | 一周内对单个高风险问题做出可验证原型 | storyboard 假设 + 原型 + 真实用户测试数据 |
| Enterprise Design Thinking | IBM | The Loop（Observe / Reflect / Make）+ 三把 Keys：Hills、Playbacks、Sponsor Users | 大规模组织协作 | 以用户成果表述的 Hill 目标 + 阶段对齐回放 |
| Lean UX | Gothelf & Seiden | 假设 → 最小可行设计 → 度量 → 学习（Build-Measure-Learn 搬进设计） | 敏捷团队内设计 | 可证伪的假设声明 + 迭代度量 |
| 设计系统工作流 | Material / Carbon 等各系统自定 | tokens → 组件库 → 文档站 → 治理（contribution 模型） | 多产品线一致性 | [languages/design-languages.md](../languages/design-languages.md) |

### 关键澄清（引用时勿踩坑）

- **DTCG 设计 token 标准**：格式模块 2025.10（2025-10-28 发布，2026-07-30 更新）是当前唯一的跨工具 token 交换格式，但它**是 W3C 社区组报告（Draft Community Group Report），不在 W3C 正式标准轨道上**——引用时应称"社区组报告"而非"标准"。
- **双钻未被替换**：Systemic Design Framework 是面向系统性挑战的官方扩展；常规产品问题仍用双钻。
- **Design Sprint 有两套 5 天命名并存**（Design Sprint Kit 的 Understand/…/Validate 与 GV DIY 的 Map/Sketch/Decide/Prototype/Test），本文统一采用 GV DIY 版。
- **Garrett 五层模型**（战略 → 范围 → 结构 → 框架 → 表现）与双钻是同一件事的两种切法：五层纵向切"抽象度"，双钻横向切"发散收敛节奏"。完整对照见 [books/design-books.md](../books/design-books.md)。

## 跨体系共性原则（7 条，全部有 ≥2 体系支撑）

1. **先发散后收敛**——双钻两对钻 [S7]、Design Sprint 周二发散周三收敛 [S8a]、IBM Loop 强调多解并行 [S9]。
2. **以真实用户任务为中心**——NN/g 启发式的任务语境 [S1]、IBM Sponsor Users / Hills [S9]、GV 周五用户测试 [S8a]。
3. **早测快验、可证伪**——Sprint 五天出验证数据 [S8a]、Lean UX 的 Build-Measure-Learn [S10]、WCAG 可测成功标准 [S3]。
4. **降低认知负荷、识别优先于回忆**——NN/g #6 [S1]、Laws of UX（米勒/希克）[S5]、格式塔简洁律 [S2]。
5. **一致性与惯例复用**——NN/g #4 [S1]、雅各布定律 [S5]、设计系统 token/组件复用 [S11]。
6. **极简与"少即是好"**——Rams 第 10 条 [S4]、NN/g #8 极简美学 [S1]、格式塔 Prägnanz。
7. **渐进披露与分阶段对齐**——NN/g #10 语境帮助 [S1]、IBM Playbacks / Hills 分阶段收敛 [S9]、双钻阶段门 [S7]。

这 7 条是 README 中「设计评审场景」的默认检查维度来源。

## 原则体系补充索引

| 体系 | 权威出处 | 状态 |
|---|---|---|
| 格式塔原理 | 源于 Wertheimer 1923 / Koffka 1935；IxDF 条目较全 | **无权威定本条目数**：核心 5 项（接近/相似/连续/闭合/图底）+ 现代扩展 3–5 项（共同区域、共同命运、均匀连通、对称、简洁律）。表述时勿写死"N 条" |
| Dieter Rams 十原则 | vitsoe.com/us/about/good-design（CC BY-NC-ND） | 1970 年代末成文，稳定 |
| principles.design | principles.design | 存活但已改版为"决策框架式原则合集"，不再适合作为公司原则的聚合索引 |
| designprinciples.ft.com | — | **已死**（HTTP 000，2026-09-02 实测），引用 FT 公司原则需回溯 FT 官方源 |
| Laws of UX | lawsofux.com | 存活，当前 30 个词条（约 24 条定律 + 6 个概念条目）；本站全量中文沉淀见 [principles/lawsofux.md](../principles/lawsofux.md)（26 条快照，可安排一次增量同步） |

## 信源合集

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S1 | NN/g 10 Usability Heuristics | L0 | https://www.nngroup.com/articles/ten-usability-heuristics/ | 2026-09-02 |
| S2 | IxDF Gestalt Principles | L2 权威社区 | https://www.interaction-design.org/literature/topics/gestalt-principles | 2026-09-02 |
| S3 | W3C WAI WCAG Overview | L0 | https://www.w3.org/WAI/standards-guidelines/wcag/ | 2026-09-02 |
| S4 | Vitsoe: Ten principles for good design | L0（CC BY-NC-ND） | https://www.vitsoe.com/us/about/good-design | 2026-09-02 |
| S5 | Laws of UX | L0 | https://lawsofux.com | 2026-09-02 |
| S6a | principles.design | L2 | https://principles.design | 2026-09-02 |
| S6b | designprinciples.ft.com | L0（已死） | http://designprinciples.ft.com（HTTP 000） | 2026-09-02 |
| S7 | Design Council: Double Diamond | L0 | https://www.designcouncil.org.uk/our-resources/the-double-diamond/ | 2026-09-02 |
| S7b | Design Council: Systemic Design Framework | L0 | https://www.designcouncil.org.uk/our-resources/systemic-design-framework/ | 2026-09-02 |
| S8a | GV: The Design Sprint | L0 | https://gv.com/sprint/ | 2026-09-02 |
| S8b | Google Design Sprint Kit | L0 | https://designsprintkit.withgoogle.com | 2026-09-02 |
| S9 | IBM Enterprise Design Thinking | L0 | https://www.ibm.com/training/enterprise-design-thinking/framework | 2026-09-02 |
| S10 | Jeff Gothelf: Lean UX | L0 作者官方 | https://jeffgothelf.com/lean-ux/ | 2026-09-02 |
| S11 | W3C DTCG Format Module 2025.10 | L0 社区组报告 | https://design-tokens.github.io/community-group/format/ | 2026-09-02 |

## 缺口

- IBM Loop/Keys 详情页为 JS SPA，Hills 定义原文未逐字核验（仅官方培训页摘要句）。
- 格式塔条目数无权威定本——这是知识边界，不是调研缺口。
