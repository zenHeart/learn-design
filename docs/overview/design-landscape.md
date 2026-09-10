---
title: 现代产品研发全景中的设计体系：UI/UX 的定位、SOP 与聚焦边界
description: 现代数字化软件生命周期大图、UI 与 UX 的具体职责与二十年交付 SOP 演进，以及本知识库的聚焦点与使命边界。
---

# 现代产品研发全景中的设计体系：UI/UX 的定位、SOP 与聚焦边界

> 目标：在深入具体设计细节前，先建立全局视野——**理清设计在整个现代软件工程生命周期中到底处于什么环节、UI 与 UX 的分工边界是什么、行业交付流程（SOP）如何演进，以及本站为何聚焦于“判断层”而非设计全集**。
> 理论依托：Airbnb 设计系统工程演进 [S1]、Linear 交付流程 [S2]、Jesse James Garrett 五层模型 [S3]、Figma 现代设计工程化报告 [S4]。

---

## 一、 现代产品研发全生命周期大图（The Big Picture）

现代数字化产品（Web 应用、移动端 App、B2B SaaS）的诞生绝非孤立的画图过程，而是一条精密咬合的**跨学科交付流水线** [S1][S2]。

下方交互式流水线直观呈现了从需求输入到质量门禁的完整工序流。**点击各个阶段节点可展开查看其输入依赖、交付契约与防守红线**：

<LandscapePipeline />

### 各阶段核心产物与责任链路

1. **战略与发现（Strategy & Discovery）**：回答“为什么要做（Why）”，产出商业目标与 PRD。
2. **体验架构（UX）**：回答“逻辑怎么跑通、信息怎么编排（How it works）”，产出信息架构树（IA）、任务流程图、交互线框稿。
3. **界面视觉（UI）**：回答“界面长什么样、传达什么情绪（How it looks & feels）”，产出 Design Tokens、组件形态、高保真视觉稿。
4. **工程协同（Engineering）**：将 Figma 中的设计元数据无损转译为代码中的 CSS 变量与组件属性，保证设计与实现的一致性。
5. **质量与度量（Design QA & Metrics）**：在代码合入前执行刚性走查（对齐度、对比度、无障碍、多态完备），上线后追踪体验指标（SUS、NPS、任务完成耗时）。

---

## 二、 UI 与 UX 的具体职责与二十年交付 SOP 演进

许多技术团队容易将“UI”与“UX”混为一谈统称为“美工”。在专业分工体系中，二者有着本质的关注点差异 [S3]：

| 维度 | UX（User Experience / 用户体验） | UI（User Interface / 用户界面） |
|---|---|---|
| **核心驱动** | 逻辑、效率、认知科学与可用性 | 视觉感知、品牌情绪、排版与空间美学 |
| **关心的核心问题** | • 用户的心智模型是什么？<br>• 信息架构（IA）层级是否过深？<br>• 完成任务的阻力与认知负荷大不大？ | • 视觉层级清晰吗？字阶有秩序吗？<br>• 间距系统是否符合 8pt 网格？<br>• 按钮与控件的 5 态反馈是否完备？ |
| **核心产出物** | 用户旅程图、IA 结构树、低保真交互原型、可用性测试报告 | 高保真 Figma 稿、Design Tokens 规范、组件库变体、动效曲线 |
| **成功标准** | 用户“毫不费力、不需思考地完成了任务” | 界面“秩序井然、克制美观、传达专业信赖感” |

---

### 行业交付标准作业流程（SOP）的三代演进

从“Photoshop 切图打包”到“Figma + DTCG Tokens 双向代码同构”，交付流程经历了 20 年的三次巨大范式跃迁：

<SopEvolutionTimeline />

1. **1.0 时代（Photoshop 时代）**：设计师在 PS 里画好几十个页面，导出切图（PNG/JPG）和文字标注文件打包发给前端。前端用绝对定位和浮动拼装，双方每逢验收必然争吵。
2. **2.0 时代（Sketch / Zeplin 时代）**：矢量工具普及，界面元素成为对象，自动生成 CSS 属性代码。但问题在于**“组件孤岛（Detached Components）”**——设计师改了 Figma 里的主色，前端代码里成百上千个写死的十六进制 Hex 值并不会同步更新。
3. **3.0 时代（现代设计工程化时代）**：
   - **Design Tokens 作为通用协议**：设计与开发不再沟通“具体数值”，而是沟通“Token 名称”（如 `--color-text-primary` 或 `--space-4`）[S1]。
   - **组件同构映射**：Figma 中的 Auto Layout、Variants 属性与 React/Vue 中的 Flexbox、Props 一对一精准映射。
   - **Design QA 前置（Shift-Left QA）**：设计走查不再等上线后被动找茬，而是在 PR 生成 Preview 环境时，作为 CI/CD 流水线的一环就地验收 [S4]。

---

## 三、 本站的战略定位与聚焦点（What We Focus On）

明确“我们不做什么”，才能把“我们专注的事情”做到极致：

```
                    ┌─────────────────────────────────────────┐
                    │            广袤的设计宇宙全集            │
                    │  (插画手绘、3D建模、品牌平面、摄影布光)  │
                    │                    │                    │
                    │      ┌─────────────▼─────────────┐      │
                    │      │     learn-design 核心聚焦  │      │
                    │      │     【判断层与认知基石】   │      │
                    │      │   让前端具备设计常识与审美 │      │
                    │      │   直达高频实战操作工作流   │      │
                    │      └───────────────────────────┘      │
                    └─────────────────────────────────────────┘
```

### 1. 明确的非目标（Non-Goals）
- ❌ **我们不是 Figma 软件操作教学**（不教怎么拉贝塞尔曲线、怎么画插画图标）。
- ❌ **我们不做 3D 渲染与动效参数玄学**（不探讨复杂 Blender 渲染管线）。
- ❌ **我们不做泛滥的灵感搬运工**（不罗列未经实证筛选、华而不实的 Dribbble 概念机动画）。

### 2. 我们的三大核心聚焦（Core Scopes）

#### 聚焦一：为前端工程师补齐「设计常识与底层认知」（Design Literacy）
消除工程师“觉得设计全靠艺术灵感”的误区，建立坚实的理性工程认知：
- 为什么 8pt 网格能解决 90% 的凌乱问题？（[工程师设计及格线](../foundations/quickstart.md)）
- 为什么留白与三级灰阶优于五颜六色？（[CRAP 四原则](../foundations/quickstart.md)）
- 为什么人类眼球会自然归类相邻元素？（[格式塔知觉组织原则](../principles/gestalt.md)）
- 跨平台度量衡（px / rem / dp / epx）在屏幕底层是如何渲染的？（[数字界面度量衡](../foundations/concept-unit.md)）
- 任何数字产品的信息骨架是如何组织的？（[信息架构核心体系](../foundations/information-architecture.md)）

#### 聚焦二：重塑「设计审美与辨别直觉」（Aesthetic Taste & Intuition）
审美不是主观偏好，而是一种**辨别优劣、识别克制、洞察反模式的专业直觉**：
- 洞察各大顶级设计语言（Apple HIG、Material 3、Ant Design v6、Fluent 2、Shopify Polaris）的最核心借鉴点（[主流设计系统索引](../languages/design-languages.md)）。
- 掌握 9 本经典设计著作共同指向的心智模型（[经典设计书籍共性](../books/design-books.md)）。
- 主动识别并坚决驳回“三次点击法则”、“首屏必须塞满”、“7±2 菜单上限”等被科学实证推翻的过时伪教条（[已证伪设计教条深度考据](../principles/falsified-dogmas.md)）。

#### 聚焦三：交付工程一线「高频聚焦的实战工作流」（Actionable Workflows）
当工程师坐在屏幕前，面对真实的需求、代码和界面时，本站提供**三套即拿即用的标准作业程序（Playbooks）**：
1. **[场景 A：设计走查体检表（Design Review）](../workflows/design-review.md)**：代码合入前花 10 分钟逐项过筛 WCAG 刚性数字与 Nielsen 启发式。
2. **[场景 B：风格选型与重构指南（Style Refactor）](../workflows/style-refactor.md)**：面对老旧系统，按选型决策树挑出最优设计系统，按 DTCG 变量体系稳妥重构。
3. **[场景 C：专业设计师视角的深度审视（Professional Critique）](../workflows/professional-critique.md)**：按 Garrett 五层提问阶梯与心智四问，产出有理有据、指导落地的设计批评。

---

## 信源合集

| 编号 | 来源 | 层级 | 出处 / URL | 取用日期 | 核心贡献 |
|---|---|---|---|---|---|
| **[S1]** | Building a Design System at Scale | L0 官方工程博客 | airbnb.design / Airbnb Engineering | 2026-09-10 | 跨平台统一设计系统与 Token 自动化交付架构 |
| **[S2]** | Linear Method: Product Delivery Principles | L0 官方方法论 | linear.app/method | 2026-09-10 | 极简、快节奏且高品质的设计与工程一体化交付模型 |
| **[S3]** | *The Elements of User Experience* (2nd Ed.) | L4 权威著作 | New Riders (Jesse James Garrett) | 2026-09-10 | 战略到表现五层模型、UI 与 UX 分工定义 |
| **[S4]** | State of Design Systems Report | L2 行业研究 | figma.com/design-systems/ | 2026-09-10 | 现代团队 Token 采用率、Design QA 移向开发前线数据 |
