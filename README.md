# learn-design — 体系化设计认知知识库

面向 Agent 与工程师的设计判断层知识库。**不做权威信息的简单拷贝**：规范以官方站为准，这里沉淀的是判断层——跨信源综合的共性、可执行的硬数字、已验证的信源地图，以及“什么已被证伪”。

## 定位与架构理念

采用**「实战任务轨（Task-Driven）」**与**「知识基座轨（Knowledge-Based）」**两轨四柱架构，服务于三类高频判断场景，直达硬结论：

1. **判断现有设计是否有问题**（design review）→ 载入 [场景 A：设计走查体检表](docs/workflows/design-review.md)
2. **按某个设计风格重构**（style refactor）→ 载入 [场景 B：风格选型与重构指南](docs/workflows/style-refactor.md)
3. **以专业设计师视角审视**（professional critique）→ 载入 [场景 C：专业设计审视框架](docs/workflows/professional-critique.md)

与 `learn-css` 互补：这里记设计判断与认知架构，那边记前端实现手法。

---

## 知识地图（两轨四柱全景）

```
├─ README.md                                  ← 本文件：站点宪法、放置规则、执行 goal
├─ AGENTS.md                                  ← Agent 消费与贡献指南（机器可读入口）
└─ docs/
   ├─ workflows/                              【第一轨：实战任务轨 Playbooks】
   │  ├─ design-review.md                     场景 A：10分钟设计走查体检表（WCAG 红线+启发式）
   │  ├─ style-refactor.md                    场景 B：设计系统选型与重构指南（决策树+Token落地）
   │  └─ professional-critique.md             场景 C：专业设计师视角的深度审视（Garrett 五层提问）
   ├─ foundations/                            【第二轨：知识基座轨 - 基础与架构】
   │  ├─ quickstart.md                        工程师设计及格线（15分钟上手：间距、灰阶、CRAP）
   │  ├─ information-architecture.md          信息架构核心体系（北极熊书四大系统、八原则、Diátaxis）
   │  ├─ term.md                              UI/UX 核心术语与概念速查表（Affordance、Signifier等）
   │  ├─ concept-unit.md                      数字界面度量衡（px/rem/pt/dp/epx 跨平台对账）
   │  └─ concept-bleeding.md                  物理介质到数字屏幕（从印刷出血到现代安全区）
   ├─ books/                                  【认知入口：经典著作提炼】
   │  └─ design-books.md                      9 本公认经典共性提炼 → 四层认知模型
   ├─ principles/                             【第二轨：知识基座轨 - 法则与规约】
   │  ├─ lawsofux.md                          UX 设计法则 26 条全量沉淀（含 BAD/GOOD 对比与 SVG）
   │  ├─ heuristics-wcag.md                   Nielsen 十大启发式走查问句 + WCAG 2.2 AA 硬指标
   │  ├─ gestalt.md                           格式塔知觉组织原则（5 经典 + 5 现代扩展法则）
   │  ├─ falsified-dogmas.md                  已证伪设计教条深度考据（3次点击、首屏折叠、7±2 迷思）
   │  └─ images/                              法则与心理学配图
   ├─ process/                                【方法流程】
   │  └─ design-process.md                    双钻模型 / Sprint / IBM EDT / Lean UX / 跨体系 7 共性
   ├─ languages/                              【参照体系：设计系统】
   │  └─ design-languages.md                  Material 3 / Apple HIG / Fluent 2 / Ant Design v6 等索引与借鉴
   ├─ patterns/                               【场景落地：产品模式】
   │  └─ product-patterns.md                  七类产品约束矩阵（SaaS 仪表盘、AI Agent、落地页等）
   ├─ resources/                              【持续追踪：资源生态 Hubs】
   │  ├─ hubs-tools.md                        工具与效能 Hub（42 站实证 + 改名关停证伪清单）
   │  ├─ hubs-inspiration.md                  真实产品流与落地页灵感 Hub
   │  ├─ hubs-learning.md                     研究文章与学习索引 Hub
   │  └─ hubs-designers.md                    14 位大师与学者主页 Hub（全部实证可达）
   ├─ index.md                                站点首页（双轨看板 + 统计数据 + 给 Agent 指南）
   ├─ public/llms.txt                         Agent 全站机器索引入口
   └─ .vitepress/theme/                       站点自身的设计系统（印刷档案 × 瑞士网格）
```

---

## 核心认知摘要

- **实战 Playbooks**：将 README 口号实体化为落地单。Review 阶段用 4.5:1 对比度与 24px 触控目标一票否决；重构阶段用 DTCG 三层 Token（Global-Semantic-Component）解耦样式；评审阶段用 Garrett 五层模型逆向提问。
- **信息架构（IA）**：任何数字界面的骨架均由四大系统（组织、标签、导航、搜索）构成；遵循 Dan Brown 渐进披露与前门原则；技术文档严格按 Diátaxis 四象限（教程/操作/参考/解释）分流。
- **基础及格线**：工程师界面的核心是“视觉秩序”。8pt 网格建立间距数学节奏，三级灰阶取代彩色滥用，CRAP 四原则（对比、重复、对齐、亲密性）统揽排版。
- **法则与知觉**：Nielsen 十启发式负责走查发现问题，Laws of UX 26 条负责归因心理机制，格式塔知觉法则（接近、相似、连续、闭合、图底、共同区域）负责解释视觉编组。
- **已证伪教条（红线拦截）**：三次点击法则（与成功率零相关）、首屏必须塞满（现代用户自然滚动）、7±2 菜单上限（人机界面依赖视觉识别而非工作记忆回忆）已被科学实证彻底推翻，**严禁作为设计批评依据**。

---

## 站点自身的设计语言

站点按“印刷档案 × 瑞士网格 × 编辑排版”方向设计：
- **签名元素**：藏品编号系统（Space Grotesk tabular figures）+ 朱砂批注红 + 档案戳
- **纪律**：层级靠字阶与 1px 细线，不靠厚重阴影；圆角 $\le 2\text{px}$；动效只动 transform/opacity 且必须尊重 `prefers-reduced-motion`；正文遵循 W3C clreq 中文排版（行高 1.75~1.8）
- **实现位置**：`docs/.vitepress/theme/`（CSS 变量与组件规则见 `custom.css`）

---

## 维护与扩展约定

| 内容性质 | 放置位置 | 规范要求 |
|---|---|---|
| 可执行的场景落地手册 | `docs/workflows/` | 提供明确的步骤、Checklist 与评级模板 |
| 基础概念/术语/单位 | `docs/foundations/` | 无空壳、消灭历史无意义占位符、附跨平台对账 |
| 法则、原则、合规数字 | `docs/principles/` | 挂载 L0 国际规范或权威实验证据，一主题一文件 |
| 流程体系与工作流 | `docs/process/` | 强调跨体系共性与适用边界 |
| 设计系统与语言深度展开 | `docs/languages/` | 提炼“最值得借鉴的一点”，链接官方 Canonical URL |
| 产品形态约束与前沿模式 | `docs/patterns/` | 区分产品类型，强化 AI Agent 与 SaaS 约束 |
| 工具/灵感/站点生态 | `docs/resources/` | 必须附带 HTTP 实证状态与取用日期 |
| 未完成主题 | `_draft/` | 完成并通过验证后迁入正式层 |

---

## 执行队列进展

1. ✅ **三大实战场景 Playbook 实体化**：`workflows/design-review.md`、`style-refactor.md`、`professional-critique.md` 正式上线。
2. ✅ **信息架构（IA）核心体系入库**：北极熊书、Dan Brown 八原则、Abby Covert 模型、Diátaxis、卡片分类全景沉淀在 `foundations/information-architecture.md`。
3. ✅ **历史残卷与占位符清剿**：彻底删除 `term.md` 2017 年 `foo/bar`，重写为现代 UI/UX 核心术语表；补全 `concept-unit.md` 现代屏幕单位。
4. ✅ **工程师设计及格线实战入库**：`foundations/quickstart.md` 提供 15 分钟建立界面视觉秩序指南。
5. ✅ **格式塔知觉组织原则专篇**：`principles/gestalt.md` 沉淀 5 经典 + 5 现代扩展法则。
6. ✅ **已证伪设计教条深度考据专篇**：`principles/falsified-dogmas.md` 沉淀三次点击、首屏折叠与 7±2 迷思的铁证。
7. ✅ **AI 对话 / Agent 交互模式深化**：`patterns/product-patterns.md` 深度整合微软 HAX 18 条与 Google PAIR 23 模式。
8. ⏳ **Windows 桌面设计知识正式入库**：Windows 桌面研究笔记（6 篇基于 Microsoft Learn 提取物）待整理迁入。
9. ⏳ **lawsofux.md 增量同步**：由 26 条快照同步至最新 30 条词条。

---

## 信源合集与检索档案

基准快照日期：**2026-09-10**。全站论断带 `[Sn]` 引用编号，文内附完整信源合集表（层级 + URL + 取用日期）。
核心信源覆盖：W3C WCAG 2.2、Diátaxis、Material 3、Apple HIG、Fluent 2、Ant Design v6、NN/g、UIE (Joshua Porter)、Miller (1956)、Wertheimer (1923)、Rosenfeld (Polar Bear Book)、Garrett (Elements of UX)。
