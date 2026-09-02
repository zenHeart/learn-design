---
layout: page
sidebar: false
aside: false
title: Learn Design — 体系化设计认知知识库
description: 面向 agent 与工程师的设计判断层知识库：UX 法则、启发式、WCAG 基线、设计流程、主流设计语言、产品模式与三类 hub 地图。
---

<HeroManifest />

<LayerIndex />

<StatsBand />

<div class="ld-layers vp-doc" style="padding-top:0">

## 三类高频判断场景

**判断现有设计是否有问题**（design review）——
先到「场景落地」确认产品类型的反模式，再用「判断依据」层的十启发式逐条走查、WCAG 硬数字判合规，最后用 UX 法则做心理学归因。输出结论区分"确定违规"（有硬数字支撑）与"风格建议"（注明主观），并主动排除已证伪教条。

**按某个设计风格重构**（style refactor）——
到「参照体系」选定语言体系（Material 3 / HIG / Fluent 2 / Ant Design v6…），提取该语言的 tokens、组件约定与明暗策略，回「场景落地」校验产品类型约束不冲突，落地优先复用该语言官方组件库。

**以专业设计师视角审视**（professional critique）——
按「方法流程」的提问顺序自战略层向表现层逐层检查，用「认知入口」的四问框架（心智模型匹配吗？五特征达标吗？流程想清楚了吗？情感层加分吗？），结论按"问题 → 根因（法则引用）→ 建议"组织。

## 引用纪律

- 凡涉及版本、状态、数值的论断均带取用日期（当前快照：2026-09-02）
- 事实性论断挂来源（L0 官方 / L2 行业 / E 实证）；厂商自测数据标注"声称"
- 三次点击法则、"必须全放首屏"、7±2 菜单上限等已证伪教条有专表，审稿时主动排除
- 本站是 agent 信息源：全部正文为静态 Markdown 渲染的稳定 HTML，页面元信息见各页 frontmatter 与站点根 `llms.txt`

## 给 Agent

本站为机器消费做了如下设计：

- 每页 `description` frontmatter 声明内容摘要；标题层级稳定，锚点为中文原文字段
- 站点根提供 [`llms.txt`](/llms.txt) 索引（页面清单 + 一句话摘要）
- 知识以长文 + 锚点为主，交互组件只承担导航索引，不承载正文
- 复用约定与扩展规则见仓库根 [AGENTS.md](https://github.com/zenHeart/learn-design/blob/master/AGENTS.md)

</div>
