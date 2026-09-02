# 工具版图与信息 Hub 地图

> 目标：需要工具或灵感时直接按类查表。**每项含状态标注**——这个领域变化快，本表以 2026-09-02 为快照，引用前若涉及选型决策建议复核。
> 本表 42 个站点经 curl 状态码/重定向链实证（E 层），AI 工具改名/关停均拿到重定向级证据。

## A. 设计工具

### UI 设计/协作

| 工具 | URL | 定位 | 状态 |
|---|---|---|---|
| Figma | <https://figma.com> | 行业主导者；Config 2025 后扩张为"设计+AI 建站+Make"平台 | 活跃 |
| Sketch | <https://sketch.com> | Mac 原生设计工具 | 活跃（2026 仍在发版） |
| Penpot | <https://penpot.app> | 开源（MPL-2.0）Figma 替代，设计与代码同源，可自托管 | 活跃 |
| Adobe XD | adobe.com | — | **维护模式**（2023-05 起仅修 bug，无新功能） |

### 原型

Figma 内置原型覆盖多数场景；Framer（可发布级网站 + AI 建站）、ProtoPie（无代码复杂交互逻辑，2025 推出 AI 公测）按需补位。

### 白板/流程

FigJam、Miro（2024-06 收购 AI 原型工具 Uizard）、tldraw（手绘感画布 + 开发者 canvas SDK，2025-04 获 Series A）、Excalidraw（开源手绘白板）。

### 图标

| 图标库 | URL | 许可 | 注意 |
|---|---|---|---|
| Material Symbols | <https://fonts.google.com/icons> | Apache 2.0 | 谷歌官方 |
| SF Symbols | <https://developer.apple.com/sf-symbols> | 仅限 Apple 平台 App UI | **不可用于 Web/Android** |
| Lucide | <https://lucide.dev> | ISC | Feather 继任，开源线条风 |
| Heroicons | <https://heroicons.com> | MIT | Tailwind Labs 官方 |
| Iconify | <https://iconify.design> | 聚合 200+ 集 | 各集许可不一，用前逐集核对 |

### 字体

Google Fonts（最大免费库，OFL/Apache 为主）、Fontsource（npm 自托管字体包）。

### 设计到开发交接

- **Design tokens 标准：W3C DTCG 格式已于 2025-10-28 发布首个稳定版（2025.10）**——跨工具 token 交换的事实标准已成立；Tokens Studio 插件支持该格式转换。注意其法律地位是 **W3C 社区组报告，不在 W3C 正式标准轨道**（见 [process/design-process.md](../process/design-process.md) 的澄清）。
- Storybook（组件开发/文档/测试工作台，事实标准）；Zeplin 仍活跃但生态被 Figma Dev Mode 蚕食。

### AI 辅助设计（2026-09 快照，改名/关停高发区）

| 工具 | URL | 定位 | 变动 |
|---|---|---|---|
| v0 | <https://v0.app> | prompt → 全栈应用 | **v0.dev 已改名 v0.app**（307 实证） |
| Google Stitch | <https://stitch.withgoogle.com> | prompt → UI 设计 + 前端代码 | **前身即 Galileo AI**，2025-05 被 Google 收购改名（usegalileo.ai 308 实证） |
| Figma AI / Make | <https://figma.com> | prompt → 代码原型 | Config 2025 正式发布 |
| Relume | <https://relume.ai> | AI 站点地图 + 线框 → Webflow | 域名 relume.io → relume.ai（301 实证） |
| Uizard | uizard.io | AI 线框/原型 | 2024-06 被 Miro 收购 |

## B. 信息/灵感 Hub

| 类别 | 站点 | URL | 定位 | 状态 |
|---|---|---|---|---|
| 灵感-真实产品 | Mobbin | <https://mobbin.com> | 40 万+ 真实 App 截图与流程库 | 活跃；免费浏览 + Pro 付费 |
| 灵感-真实产品 | Page Flows | <https://pageflows.com> | 真实产品用户流视频 | 活跃；**已吸收 Screenlane**（301 实证） |
| 灵感-落地页 | Lapa Ninja | <https://lapa.ninja> | 7000+ 落地页精选，免费 | 活跃 |
| 灵感-作品集 | Behance | <https://behance.net> | Adobe 旗下综合作品集 | 在线 |
| 灵感-作品集 | Dribbble | <https://dribbble.com> | 设计师作品展示 + 接单市场 | 运营中但社区信任受损（新 ToS 强制站内交易，2025 年设计师出走潮，属 L2 单方叙事保留双向） |
| 灵感-moodboard | Cosmos | <https://cosmos.so> | 视觉搜索型收藏墙 | 活跃；免费约 500 项上限 |
| 灵感-moodboard | Savee | <https://savee.com> | 设计师灵感收藏 | 活跃；域名 savee.it → savee.com（301 实证） |
| 灵感-最新网站 | recent.design | <https://recent.design> | 精选最新网站 | **Godly 已 301 并入至此** |
| 学习 | NN/g Articles | <https://nngroup.com/articles> | 可用性研究权威文章库 | 活跃 |
| 学习 | Laws of UX | <https://lawsofux.com> | UX 心理学法则可视化索引（Jon Yablonski） | 活跃、开源；本站有全量中文沉淀（见 principles 层） |
| 学习 | Refactoring UI | <https://refactoringui.com> | 开发者向视觉设计方法论（付费书） | 在线（书籍产品） |
| 学习 | Smashing Magazine | <https://smashingmagazine.com> | 前端/UX 深度文章 | 活跃 |
| 学习 | UX Collective | <https://uxdesign.cc> | Medium 最大设计刊物 | 活跃（更新至 2026-08） |
| 系统索引 | Adele (UXPin) | <https://adele.uxpin.com> | 公开设计系统索引库 | 维护中 |
| 系统索引 | designsystems.com | <https://designsystems.com> | 设计系统资源画廊 | 可访问但更新缓慢 |
| 组件库 | shadcn/ui | <https://ui.shadcn.com> | 复制粘贴式 React 组件集（事实标准） | 活跃 |
| 组件库 | Radix UI | <https://radix-ui.com> | headless 无样式原语 | 活跃但迭代放缓，社区向 Base UI 转移 |
| 组件库 | Mantine / Chakra / Headless UI | — | 电池全包 / 可主题化 / Tailwind 系 headless | 均活跃 |

## 证伪清单（索引时主动排除的过时条目）

| 过时认知 | 实际状态 |
|---|---|
| Galileo AI | 已死——被 Google 收购改名 Stitch |
| v0.dev | 已改名 v0.app |
| Adobe XD | 维护模式，勿再作为推荐主力工具 |
| Screenlane / Godly | 独立站已消亡（分别并入 Page Flows / recent.design） |
| "Radix 2025 被收购" | 实为 2022 被 WorkOS 收购；2025 话题是迭代放缓 + Base UI v1.0 崛起 |
| Kortux / Bento（设计聚合） | 无法证实为设计站点，已从索引移除 |

## 缺口

- Framer/FigJam/Miro/Storybook/shadcn 未做独立时效检索，仅 E 层可达性实证。
- Dribbble"信任受损"为 L2 单方叙事，官方回应未采集。
- Iconify 聚合的各图标集许可需逐集核对，无统一结论。

## 信源合集（关键项）

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S2 | Adobe XD release notes | L0 | helpx.adobe.com/xd/desktop/introduction/whats-new.html | 2026-09-02 |
| S3 | Uizard joins Miro | L0 | uizard.io/blog/uizard-joins-miro | 2026-09-02 |
| S4 | Figma Config 2025 Recap | L0 | figma.com/blog/config-2025-recap | 2026-09-02 |
| S5 | Vercel 官方（v0.app） | L0 | vercel.com/blog/v0-app | 2026-09-02 |
| S6 | Google Stitch（+308 重定向实证） | L0/E | stitch.withgoogle.com | 2026-09-02 |
| S11 | W3C DTCG 2025.10 稳定版公告 | L0 | w3.org/community/design-tokens/2025/10/28 | 2026-09-02 |
| S15 | Sketch releases | L0 | sketch.com/releases/mac | 2026-09-02 |
| S17 | 各图标库 LICENSE 原文 | E | raw.githubusercontent.com | 2026-09-02 |
| S18 | SF Symbols 许可条款 | L0 | developer.apple.com/design/human-interface-guidelines/sf-symbols | 2026-09-02 |
| S20 | tldraw issue #7584（Radix/Base UI） | L2 | github.com/tldraw/tldraw/issues/7584 | 2026-09-02 |
| S23 | curl 批量验证 42 站 | E | 本机执行 | 2026-09-02 |
