---
layout: page
sidebar: false
aside: false
title: Learn Design — 面向现代工程师的设计工程与判断层知识库
description: 现代产品研发全景大图先行，厘清 UI/UX 环节与 SOP 演进；提供工程师及格线、三大高频实战工作流、心理学硬基线与交互式资源雷达。
---

<HeroManifest />

<LayerIndex />

<StatsBand />

<div class="ld-layers vp-doc" style="padding-top:0">

## 知识架构与设计战略

本站秉承**「全景大图先行（Landscape First） × 实战工作流驱动（Playbooks-Driven）」**的设计哲学。我们坚信：设计不是后期的装饰贴皮，而是贯穿整个产品生命周期的严密判断与决策。

### 00. 全景大图：UI/UX 处于哪个环节？
- **[现代研发全景中的设计体系：UI/UX 的定位、SOP 与聚焦边界](/overview/design-landscape)** ——
  跳出孤立的界面画图思维。首先通过研发流水线全景图理清 UI 与 UX 的核心职责差异（一个管感知表现，一个管认知路径与信息流转）；系统回顾过去 20 年间从 Photoshop 1.0（标注切图痛苦期）到 Sketch/Zeplin 2.0（组件化起步）再到如今 Figma+DTCG Tokens 3.0（设计与代码双向同构）的交付演进。
- **本站的聚焦边界**：这里不是包罗万象的平面艺术设计全集，而是**专注于让现代前端工程师具备扎实的设计常识、敏锐的审美直觉与无障碍硬红线意识**，从而在缺乏专职设计师时能独立输出专业级及格界面，在与设计师协同中能实现零损耗沟通。

---

### 01. 工程师及格线与基础基石
- **[工程师设计及格线（15 分钟建立专业直觉）](/foundations/quickstart)**：不靠玄学。掌握 8pt 间距系统、三级灰阶对比与 CRAP 原则极简前端代码实战。
- **[信息架构核心体系（IA 全景）](/foundations/information-architecture)**：北极熊书四大系统（组织、标签、导航、搜索）、Dan Brown 八原则与 Diátaxis 文档四象限。
- **[数字界面度量衡全解](/foundations/concept-unit)**：彻底搞懂 px、rem、dp、epx 跨平台对账法则与屏幕物理像素密度。

---

### 02. 三大高频实战工作流（Playbooks）
1. **[场景 A：设计走查体检表（Design Review）](/workflows/design-review)** ——
   代码合入与上线前 10 分钟自查。先定产品形态约束，再用 WCAG 2.2 刚性数字（对比度 4.5:1、点击热区 24px、焦点可见性）拦截阻断性缺陷，接着通过 Nielsen 十大启发式与 UX 心理学定律做根因归因，并主动排除“首屏必须塞满”等已证伪教条。

2. **[场景 B：风格选型与重构指南（Style Refactor）](/workflows/style-refactor)** ——
   从零构建或改造老旧界面。提供主流设计系统（Material 3 / HIG / Fluent 2 / Ant Design v6 / Polaris 等）选型决策树，通过 DTCG 三层 Token 架构（全局-语义-组件）与四步重构法稳步落地，兼顾明暗模式与无障碍。

3. **[场景 C：专业设计师视角的深度审视（Professional Critique）](/workflows/professional-critique)** ——
   拒绝“我觉得不好看”的主观臆测。借助 Garrett 五层提问阶梯（战略→范围→结构→框架→表现），配合“四问心智框架”与跨体系七大共性原则，产出对事不对人、有心理学依据与改进行动的专业级设计批评。

---

### 03. 资源生态与符号系统雷达
- **[工具 Hub · 工具状态雷达](/resources/hubs-tools)**：集成交互式状态雷达（活跃/维护/关停变动），直击 SF Symbols 商用限制、Galileo AI/v0 变动等实证陷阱。
- **[学习索引 Hub · 顶级设计博客矩阵](/resources/hubs-learning)**：汇总大厂官方团队（Linear、Airbnb、Stripe、Vercel 等）博客与高质量中文周刊专栏，提供分类切换与直达。
- **[设计师 Hub · 先驱思想图谱](/resources/hubs-designers)**：14 位大师单色徽章墙与第一手信源检索。
- **[灵感资源 Hub · 真实产品库](/resources/hubs-inspiration)**：以 Mobbin、Page Flows 为核心的真实生产级产品与流程调研方法。

---

## 引用与事实契约

- 凡涉及版本、状态、数值的论断均带取用日期（基准快照：2026-09）
- 事实性论断挂来源编号 `[Sn]`（L0 官方 / L2 行业研究 / L4 权威著作 / E 本地实证）；厂商自测宣称一律标注“声称”
- 三次点击法则、“必须全放首屏”、7±2 菜单上限等已证伪教条设有专篇考据，评审与代码审查时主动拦截排除
- 正文为 Markdown 渲染的静态稳定 HTML，页面元信息详见各页 frontmatter 与站点根 `llms.txt`

## 给 Agent

本站为机器消费做了如下专门优化：
- 每页 `description` frontmatter 声明内容摘要；标题层级语义稳定，锚点为中文原文字段
- 站点根提供 [`llms.txt`](/llms.txt) 完整机器索引（页面清单 + 核心摘要）
- 知识以长文 + 语义锚点为主，交互组件只承担导航索引，不承载孤立正文
- 复用约定与扩展规则详见仓库根 [AGENTS.md](https://github.com/zenHeart/learn-design/blob/master/AGENTS.md)

</div>
