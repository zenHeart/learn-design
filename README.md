# learn-design — 体系化设计认知知识库

面向 agent 与工程师的设计知识站点。**不做权威信息的拷贝**：规范以官方站为准，这里沉淀的是判断层——跨信源综合的共性、可执行的硬数字、已验证的信源地图，以及"什么已被证伪"。

## 定位

服务于三类高频判断场景，每次都应有据可查、直达硬结论：

1. **判断现有设计是否有问题**（design review）→ 按 principles 层检查链走查
2. **按某个设计风格重构**（style refactor）→ 按 languages 层选型后映射落地
3. **以专业设计师视角审视**（professional critique）→ 按 process 层的提问顺序 + books 层的四问框架

与 `learn-css` 互补：这里记设计判断，那边记实现手法。

## 知识地图

六层构成一条完整的认知管线：**认知入口 → 判断依据 → 方法流程 → 参照体系 → 场景落地 → 持续追踪**。

```
├─ README.md                      ← 本文件：站点宪法、放置规则、执行 goal
└─ docs/
   ├─ books/                      ① 认知入口：经典书籍共性 → 四层认知模型
   │  └─ design-books.md
   ├─ foundations/                ① 认知入口：术语、单位、印刷/屏幕基础
   │  ├─ term.md
   │  ├─ concept-unit.md
   │  └─ concept-bleeding.md
   ├─ principles/                 ② 判断依据：心理学法则 + 启发式 + 无障碍硬数字
   │  ├─ lawsofux.md              UX 法则 26 条（lawsofux.com 中文沉淀，含 BAD/GOOD SVG 对比图）
   │  ├─ heuristics-wcag.md       Nielsen 十启发式走查问句 + WCAG 2.2 关键数值
   │  └─ images/                  法则配图（11 张 SVG）
   ├─ process/                    ③ 方法流程：双钻/Sprint/IBM EDT/Lean UX/设计系统工作流
   │  └─ design-process.md
   ├─ languages/                  ④ 参照体系：主流设计语言官方索引与借鉴点
   │  └─ design-languages.md
   ├─ patterns/                   ⑤ 场景落地：产品类型约束矩阵 + 反模式 + 已证伪教条
   │  └─ product-patterns.md
   └─ resources/                  ⑥ 持续追踪：工具版图、灵感 hub、存活状态
      └─ hubs-tools.md
```

草稿区 `_draft/` 放未完成主题（当前：design-navifation.md 导航设计）。

## 核心认知摘要（各层一句话版）

**① books — 设计由四层构成**：理解用户为何这样行为（心理层）→ 好设计的行为特征：可感知/有反馈/不思考/能容错/有秩序（原则层）→ 从想法到界面的路径：五层模型与双钻是同一件事的两种切法（流程层）→ 可用之上是情感与意义（体验层）。新增任何内容都应能映射到某一层。

**② principles — 走查用两套框架**：心理学法则（lawsofux 26 条，用于归因"为什么这里难受"）+ Nielsen 十启发式（每条一个评审问句）+ WCAG 2.2 硬数字（对比度 4.5:1 / 3:1，目标 24×24 CSS px，AA 为行业底线）。注意 lawsofux.com 现有 30 词条，本站为 26 条快照，增量同步在执行队列。

**③ process — 评审的提问顺序**：先问它在战略层想达成什么（Garrett 五层向下逐层检查），发散收敛节奏看双钻，一周验证用 Design Sprint，组织协作看 IBM EDT（Loop + Hills/Playbacks）。跨体系 7 条共性原则是默认检查维度；DTCG token 标准是"社区组报告"而非 W3C 正式标准，引用勿升格。

**④ languages — 参照谁取决于产品形态**：Material 3（动态主题做成系统级能力）、Apple HIG（以决策理由而非参数表写规范，因此长青）、Fluent 2（无障碍做成设计稿阶段工具链）、Ant Design v6（首个设 For Agents 页的设计系统）。**Netflix 没有公开设计系统**——"灵活性 > 标准化、A/B 驱动"是其刻意反选，审阅"该不该建设计系统"问题时的反例锚点。行业趋势：设计系统的下一位主要读者是 agent（Ant For Agents、Carbon MCP、Atlassian DESIGN.md）。

**⑤ patterns — 先定类型再谈约束**：落地页首屏的任务是建立滚动理由而非塞满信息；电商最大弃车归因是费用突现；仪表盘先定义决策再定义图表；移动端底部可达区决定导航；桌面端效率优先于可发现性；文档站按 Diataxis 四象限分流；AI 产品当前共识是"设定预期、可解释、可纠正"，无统一标准。**三次点击法则、"必须全放首屏"、7±2 菜单上限均已被证伪**，遇到引用这些教条的批评先降权。

**⑥ resources — 引用前查状态**：42 站 2026-09-02 实证快照；AI 设计工具是改名/关停高发区（Galileo→Google Stitch、v0.dev→v0.app、XD 维护模式），表内未标注"活跃"的条目引用前先复核。

## Agent 使用指南（三大场景工作流）

### 场景 A：判断现有设计是否有问题

1. `patterns/product-patterns.md` — 确认产品类型，对照该类型反模式与高频模式
2. `principles/heuristics-wcag.md` — 十启发式逐条问 + WCAG 硬数字合规判定
3. `principles/lawsofux.md` — 对可疑点做心理学归因（违反了哪条法则、为什么）
4. 输出结论时区分：确定违规（有硬数字/法则支撑）vs 风格建议（需注明主观）
5. 排除已证伪教条（patterns 层证伪表），不将其作为批评依据

### 场景 B：按某个设计风格重构

1. `languages/design-languages.md` — 选定参照体系，进官方站取该语言最新规范
2. 提取该语言的：tokens（色/距/字/动效数值）、组件形态约定、明暗模式策略
3. 回到 `patterns/` 校验：目标产品类型的约束与该风格不冲突（如企业后台慎用强表达性风格）
4. 落地时优先复用该语言的官方组件库/设计资源（languages 表"工具生态"列）

### 场景 C：专业设计师视角审视

1. `process/design-process.md` — 按五层/双钻的提问顺序审视：战略层目标 → 范围 → 结构 → 框架 → 表现
2. `books/design-books.md` — 用四问框架：用户心智模型匹配吗？五特征达标吗？流程层是否想清楚了？情感层有无加分？
3. 跨体系 7 共性作为检查维度；结论按"问题 → 根因（法则引用）→ 建议"组织
4. 平台相关细节进入对应语言体系查证（languages 层），Windows 桌面可直接用本地提取物（见执行队列 #3）

## 维护与扩展约定

**放置规则**：新增内容先问它属于哪一层——

| 内容性质 | 放置位置 | 命名 |
|---|---|---|
| 术语/单位/概念解释 | docs/foundations/ | `concept-*.md` / `term.md` 追加 |
| 法则、原则、硬数字 | docs/principles/ | 一主题一文件 |
| 流程、方法论、工作流 | docs/process/ | 一体系一文件或并入 design-process.md |
| 某设计语言的深度展开 | docs/languages/ | `<lang>-<topic>.md` |
| 某产品类型的约束/案例 | docs/patterns/ | `<type>-patterns.md` |
| 书籍读书沉淀 | docs/books/ | 一书一文件或并入共性文档 |
| 新工具/新 hub/存活状态变更 | docs/resources/hubs-tools.md | 直接改表 + 更新取用日期 |
| 未完成主题 | _draft/ | 完成后迁入正式层 |

**纪律**：

- **无空壳**：不建没有首个真实文件的目录；草稿进 `_draft/`。
- **时效标注**：凡涉及版本、状态、数值的论断必须带取用日期；工具/hub 状态引用前复核。
- **来源引用**：事实性论断挂来源（层级 L0 官方 / L2 行业 / E 实证）；厂商自测数据写"X 声称"。
- **证伪优先**：新增"最佳实践"前先搜反例；发现新的过时教条进 patterns 层证伪表。
- **综合而非拷贝**：每篇文档的价值在于提炼与交叉对照，规范细节链接到官方 canonical URL。

## 执行队列（后续 agent 持续推进的 goal）

按优先级：

1. **lawsofux.md 增量同步**：站点现有 30 词条（约 24 定律 + 6 概念条目）vs 本站 26 条快照，补齐差额并核对分类。
2. **CRAP 四原则小篇**：principles 层，与 lawsofux 的视觉类法则互链（来源 books 层提炼）。
3. **Windows 桌面设计知识正式入库**：Windows 桌面研究笔记（6 篇，基于 Microsoft Learn，现存于本地提取物未入库）+ `windows-app-design` skill 迁入 languages/ 与 patterns/，消除外部依赖。
4. **格式塔原理专篇**：principles 层，表述采用"核心 5 项 + 现代扩展 3–5 项"，勿写死条目数。
5. **AI 对话/Agent 产品模式细化**：patterns 层最活跃扩展区（微软 HAX 18 条 + Google PAIR 23 模式的深度拆解与案例化）。
6. **书籍缺口补验**：《点石成金》《用户体验要素》《写给大家看的设计书》在微信读书的电子书在架情况复核；有在架则补热门划线证据。
7. **状态复核**：Netflix Medium 出版物是否彻底停更；SLDS 2 迁移进度；NN/g 3-click 原文链接人工核验。

## 本次建站调研档案（2026-09-02）

四路并行调研（设计语言 / 原则与流程 / 产品模式 / 工具与 hub）+ 本地实证 + 微信读书书籍层。各文档内附完整信源合集表（层级 + URL + 取用日期）。

**核心 L0 信源注册表**（下次调研可直接复用，跳过重复扫描）：

| 信源 | URL | 用途 | 验证日期 |
|---|---|---|---|
| Material 3 | m3.material.io | 设计语言 | 2026-09-02 |
| Apple Design / HIG | developer.apple.com/design | 设计语言 | 2026-09-02 |
| Fluent 2 | fluent2.microsoft.design | 设计语言 | 2026-09-02 |
| Ant Design | ant.design | 设计语言 | 2026-09-02 |
| NN/g 启发式 | nngroup.com/articles/ten-usability-heuristics/ | 原则 | 2026-09-02 |
| WCAG 2.2 | w3.org/TR/WCAG22/ | 无障碍基线 | 2026-09-02 |
| Laws of UX | lawsofux.com | 法则 | 2026-09-02 |
| Double Diamond / Systemic | designcouncil.org.uk/our-resources/ | 流程 | 2026-09-02 |
| GV Design Sprint | gv.com/sprint/ | 流程 | 2026-09-02 |
| IBM EDT | ibm.com/training/enterprise-design-thinking/framework | 流程 | 2026-09-02 |
| DTCG Format | design-tokens.github.io/community-group/format/ | tokens | 2026-09-02 |
| Diataxis | diataxis.fr | 文档站 | 2026-09-02 |
| Google PAIR Guidebook | pair.withgoogle.com/guidebook | AI 模式 | 2026-09-02 |
| Vitsoe（Rams 十原则） | vitsoe.com/us/about/good-design | 原则 | 2026-09-02 |

**已证伪/死亡清单**（不再作为信源或教条引用）：designprinciples.ft.com（HTTP 000）、Galileo AI（→ Google Stitch）、v0.dev（→ v0.app）、Screenlane（→ Page Flows）、Godly（→ recent.design）、Adobe XD 新功能开发、三次点击法则、"必须全放首屏"、7±2 菜单上限。

**检索日志（汇总）**：WebSearch 广角 30+ 轮（中英双角度，tools-hubs 路留下逐轮日志：Galileo/XD/Uizard/Figma Make/Screenlane+Lapa/adele+designsystems/Cosmos+Savee+Godly/Zeplin/Mobbin/Penpot/Tokens+DTCG/Relume/SF Symbols/v0 改名/UX Collective/Radix/tldraw+Excalidraw/Sketch/Dribbble/ProtoPie，其中 4 轮 429 限流后重试成功）；curl E 层实证 42 站 + LICENSE 抓取 4 + 重定向链核验；微信读书 API 3 次（书城搜索 ×3 + 热门划线 ×1，取 20/55 条）；其余三路子代理未逐条回传查询式原文（缺口）。

**未裁决项**：Netflix Medium 停更推断；"社会证明"效应量无单一一手实验；AI 产品量化共识（流式节奏、撤销门槛）尚不存在——发现新证据时更新对应文档并改本档案。
