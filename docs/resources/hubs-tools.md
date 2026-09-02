---
title: 工具 Hub
description: 设计工具版图索引：UI 协作、原型、白板、图标、字体、交接与 AI 工具；42 站实证快照，改名/关停高发区标注清楚。取用日期 2026-09-02。
---

# 工具 Hub

> 选型前先查"状态"列。本表 42 个站点经 curl 状态码/重定向链实证（E 层），AI 工具是改名/关停高发区，未标注"活跃"的条目引用前先复核。快照日期：2026-09-02。
> 灵感类站点见 [灵感资源 Hub](/resources/hubs-inspiration)；学习型站点见 [学习索引 Hub](/resources/hubs-learning)。

## UI 设计 / 协作

| 工具 | URL | 定位 | 状态 |
|---|---|---|---|
| Figma | <https://figma.com> | 行业主导者；Config 2025 后扩张为"设计+AI 建站+Make"平台 | 活跃 |
| Sketch | <https://sketch.com> | Mac 原生设计工具 | 活跃（2026 仍在发版） |
| Penpot | <https://penpot.app> | 开源（MPL-2.0）Figma 替代，设计与代码同源，可自托管 | 活跃 |
| Adobe XD | adobe.com | — | **维护模式**（2023-05 起仅修 bug，无新功能），勿再作为主力推荐 |

## 原型

Figma 内置原型覆盖多数场景；按需补位：Framer（可发布级网站 + AI 建站）、ProtoPie（无代码复杂交互逻辑，2025 推出 AI 公测）。

## 白板 / 流程

| 工具 | URL | 定位 | 状态 |
|---|---|---|---|
| FigJam | <https://figma.com/jam> | Figma 家族白板 | 活跃 |
| Miro | <https://miro.com> | 通用协作白板；2024-06 收购 AI 原型工具 Uizard | 活跃 |
| tldraw | <https://tldraw.com> | 手绘感画布 + 开发者 canvas SDK | 活跃（2025-04 Series A） |
| Excalidraw | <https://excalidraw.com> | 开源手绘白板，Excalidraw+ 商业版 | 活跃 |

## 图标

| 图标库 | URL | 许可 | 注意 |
|---|---|---|---|
| Material Symbols | <https://fonts.google.com/icons> | Apache 2.0 | 谷歌官方 |
| SF Symbols | <https://developer.apple.com/sf-symbols> | 仅限 Apple 平台 App UI | **不可用于 Web/Android** |
| Lucide | <https://lucide.dev> | ISC | Feather 继任，开源线条风 |
| Heroicons | <https://heroicons.com> | MIT | Tailwind Labs 官方 |
| Iconify | <https://iconify.design> | 聚合 200+ 集 | 各集许可不一，用前逐集核对 |

## 字体

Google Fonts（<https://fonts.google.com>，最大免费库，OFL/Apache 为主）、Fontsource（<https://fontsource.org>，npm 自托管字体包）。

## 设计到开发交接

- **Design tokens**：W3C DTCG 格式（<https://design-tokens.github.io/community-group/format/>）2025-10-28 发布首个稳定版 2025.10，跨工具交换的事实标准；注意其法律地位是**社区组报告而非 W3C 正式标准**（见[流程体系](/process/design-process)的澄清）。Tokens Studio 插件支持该格式。
- **Storybook**（<https://storybook.js.org>）：组件开发/文档/测试工作台，事实标准。
- **Zeplin**（<https://zeplin.io>）：仍活跃但生态被 Figma Dev Mode 蚕食。

## AI 辅助设计（2026-09 快照，改名/关停高发区）

| 工具 | URL | 定位 | 变动 |
|---|---|---|---|
| v0 | <https://v0.app> | prompt → 全栈应用 | **v0.dev 已改名 v0.app**（307 实证） |
| Google Stitch | <https://stitch.withgoogle.com> | prompt → UI 设计 + 前端代码 | **前身即 Galileo AI**，2025-05 被 Google 收购改名（308 实证） |
| Figma AI / Make | <https://figma.com> | prompt → 代码原型 | Config 2025 正式发布 |
| Relume | <https://relume.ai> | AI 站点地图 + 线框 → Webflow | 域名 relume.io → relume.ai（301 实证） |
| Uizard | uizard.io | AI 线框/原型 | 2024-06 被 Miro 收购 |

## React 组件库参考

| 组件库 | URL | 定位 | 状态 |
|---|---|---|---|
| shadcn/ui | <https://ui.shadcn.com> | 复制粘贴式组件集（事实标准） | 活跃 |
| Radix UI | <https://radix-ui.com> | headless 无样式原语 | 活跃但迭代放缓，社区向 Base UI 转移 |
| Mantine | <https://mantine.dev> | 电池全包式 | 活跃 |
| Chakra UI | <https://chakra-ui.com> | 可主题化 | 活跃（v3 后声量下降） |
| Headless UI | <https://headlessui.com> | Tailwind 系 headless | 活跃（节奏慢于 Tailwind 本体） |

## 证伪清单（索引时主动排除）

| 过时认知 | 实际状态 |
|---|---|
| Galileo AI | 已死——被 Google 收购改名 Stitch |
| v0.dev | 已改名 v0.app |
| Adobe XD | 维护模式 |
| Screenlane / Godly | 独立站已消亡（分别并入 Page Flows / recent.design） |
| "Radix 2025 被收购" | 实为 2022 被 WorkOS 收购；2025 话题是迭代放缓 + Base UI v1.0 崛起 |
| Kortux / Bento（设计聚合） | 无法证实为设计站点，已从索引移除 |

## 关键信源

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S2 | Adobe XD release notes | L0 | helpx.adobe.com/xd/desktop/introduction/whats-new.html | 2026-09-02 |
| S4 | Figma Config 2025 Recap | L0 | figma.com/blog/config-2025-recap | 2026-09-02 |
| S5 | Vercel 官方（v0.app） | L0 | vercel.com/blog/v0-app | 2026-09-02 |
| S6 | Google Stitch（+308 重定向实证） | L0/E | stitch.withgoogle.com | 2026-09-02 |
| S11 | W3C DTCG 2025.10 稳定版公告 | L0 | w3.org/community/design-tokens/2025/10/28 | 2026-09-02 |
| S17 | 各图标库 LICENSE 原文 | E | raw.githubusercontent.com | 2026-09-02 |
| S18 | SF Symbols 许可条款 | L0 | developer.apple.com/design/human-interface-guidelines/sf-symbols | 2026-09-02 |
| S23 | curl 批量验证 42 站 | E | 本机执行 | 2026-09-02 |

## 缺口

- Framer/FigJam/Miro/Storybook/shadcn 未做独立时效检索，仅 E 层可达性实证。
- Iconify 聚合的各图标集许可需逐集核对，无统一结论。
