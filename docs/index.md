---
layout: page
sidebar: false
aside: false
title: Learn Design — 体系化设计认知知识库
description: 面向 Agent 与工程师的设计判断层知识库：实战工作流、UX 法则、启发式与 WCAG 基线、设计流程、主流设计语言、产品模式与资源地图。
---

<HeroManifest />

<LayerIndex />

<StatsBand />

<div class="ld-layers vp-doc" style="padding-top:0">

## 双轨驱动架构

本站采用**「实战任务轨（Task-Driven）」**与**「知识基座轨（Knowledge-Based）」**双轨制组织架构，既为人类工程师提供即拿即用的任务指南，也为 Agent 提供原子化、可严密反向索引的客观规约。

### 轨 A：三大高频实战工作流（Playbooks）

1. **[场景 A：设计走查体检表（Design Review）](/workflows/design-review)** ——
   代码合入与上线前 10 分钟自查。先定产品形态约束，再用 WCAG 2.2 刚性数字（对比度 4.5:1、点击热区 24px、焦点可见性）拦截阻断性缺陷，接着通过 Nielsen 十大启发式与 UX 心理学定律做根因归因，并主动排除“首屏必须塞满”等已证伪教条。

2. **[场景 B：风格选型与重构指南（Style Refactor）](/workflows/style-refactor)** ——
   从零构建或改造老旧界面。提供主流设计系统（Material 3 / HIG / Fluent 2 / Ant Design v6 / Polaris 等）选型决策树，通过 DTCG 三层 Token 架构（全局-语义-组件）与四步重构法稳步落地，兼顾明暗模式与无障碍。

3. **[场景 C：专业设计师视角的深度审视（Professional Critique）](/workflows/professional-critique)** ——
   拒绝“我觉得不好看”的主观臆测。借助 Garrett 五层提问阶梯（战略→范围→结构→框架→表现），配合“四问心智框架”与跨体系七大共性原则，产出对事不对人、有心理学依据与改进行动的专业级设计批评。

---

### 轨 B：知识基座与理论支柱（Foundations & Standards）

- **工程师初次入坑？** 建议从 **[工程师设计及格线（15分钟上手）](/foundations/quickstart)** 开始，掌握 8pt 间距系统、三级灰阶与 CRAP 四原则工程实战。
- **系统性学习架构？** 深入 **[信息架构核心体系（IA 全景）](/foundations/information-architecture)**，领会北极熊书四大系统、Dan Brown 八原则、Diátaxis 四象限与卡片分类验证。
- **排版度量混淆？** 查阅 **[数字界面度量衡](/foundations/concept-unit)** 与 **[从印刷出血到现代安全区](/foundations/concept-bleeding)**，厘清 px/rem/dp/epx 与异形屏避让。
- **需要客观裁决法典？** 直达 **[UX 设计法则 26 条](/principles/lawsofux)**、**[格式塔知觉组织原则](/principles/gestalt)** 与 **[已证伪设计教条深度考据](/principles/falsified-dogmas)**。

---

## 引用与事实契约

- 凡涉及版本、状态、数值的论断均带取用日期（基准快照：2026-09-10）
- 事实性论断挂来源编号 `[Sn]`（L0 官方 / L2 行业研究 / L4 权威著作 / E 本地实证）；厂商自测宣称一律标注“声称”
- 三次点击法则、“必须全放首屏”、7±2 菜单上限等已证伪教条设有专篇考据，评审时主动排除
- 正文为 Markdown 渲染的静态稳定 HTML，页面元信息详见各页 frontmatter 与站点根 `llms.txt`

## 给 Agent

本站为机器消费做了如下专门优化：
- 每页 `description` frontmatter 声明内容摘要；标题层级语义稳定，锚点为中文原文字段
- 站点根提供 [`llms.txt`](/llms.txt) 完整机器索引（页面清单 + 核心摘要）
- 知识以长文 + 语义锚点为主，交互组件只承担导航索引，不承载孤立正文
- 复用约定与扩展规则详见仓库根 [AGENTS.md](https://github.com/zenHeart/learn-design/blob/master/AGENTS.md)

</div>
