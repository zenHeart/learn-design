# 主流设计语言索引

> 目标：回答"做一个产品时该参照哪套体系、去哪里查、每套最值得偷师什么"。不做规范拷贝——规范以官方站为准，这里沉淀判断依据。
> 取用日期 2026-09-02，全部信源当日验证。

## 总表

| 设计语言 | 官方站点 | 核心理念关键词 | 版本/状态 | 工具生态 |
|---|---|---|---|---|
| Material | <https://m3.material.io> | 动态主题、情感化表达、开源、跨平台 | Material 3 为现行版本；Expressive 已随 Android 16 落地 | Figma 库、Material Symbols、主题编辑器 |
| Apple HIG | <https://developer.apple.com/design> | 平台一致性优先、决策理由化、无障碍默认内建 | HIG 长青；Liquid Glass 新设计语言（2025） | Design Resources 官方模板、SF Symbols 7000+、Icon Composer |
| Fluent | <https://fluent2.microsoft.design> | 跨平台一处设计多端复用、无障碍工具化 | Fluent 2 为现行体系，Teams/Outlook 已落地 | Figma UI kits、Fluent UI 四端组件、A11y Figma 插件 |
| Ant Design | <https://ant.design> | 确定性、意义感、生长性、自然；AI friendly | v6 | Kitchen、Theme Editor、CSS-in-JS 动态主题、Pro/X/Mobile 子生态 |
| Netflix | 无公开设计系统 | 灵活性 > 标准化、A/B 实验驱动 | 唯一官方对外渠道为 Medium 出版物（疑似停更） | 无 |
| Shopify Polaris | <https://polaris.shopify.com> | 商家场景专注、token 前置到输入端 | v12 新设计语言 | Figma、VS Code token 补全、400+ 图标 |
| IBM Carbon | <https://carbondesignsystem.com> | 全开源、AI 工作流接入最激进 | 活跃（React 1.114+，2026-08） | 六框架组件库、Figma/Sketch、Carbon MCP / AI Chat |
| Atlassian | <https://atlassian.design> | 统一设计语言、AI Patterns 独立成区 | 活跃迭代 | 命名空间 tokens（`color.text.accent.blue`）、DESIGN.md、Atlaskit |
| Salesforce Lightning | <https://www.lightningdesignsystem.com> | 企业级最重体系：动效 Kinetics + 无障碍 + Blueprints | **SLDS 2 已随 Winter '26 正式 GA**（旧站静默为迁移前兆）；新架构主打主题/品牌扩展与 agentic experiences | Validator、Design Tokens、分平台蓝图 |

## 各体系要点与"最值得借鉴的一点"

### Material 3（Google）

- 命名关系澄清：**Material 3 是设计系统本体，Material You 是面向消费者的个性化卖点**（壁纸取色等），不要混用两个词。
- 2025-05 I/O 发布 Material 3 Expressive（弹性动效、形状、大字体的情感化方向），随 Android 16 交付，2025-11 开源进 AOSP。
- 官网板块：guidelines / styles / components；站点为 SPA，服务端只渲染 meta。
- **借鉴点：把"个性化"做成系统级能力**——用户内容（壁纸）直接反推全套设计 tokens，而不是提供几套预设换肤。

### Apple HIG

- 入口 developer.apple.com/design（Overview / What's New / Get Started / Guidelines / Resources）；HIG 正文按平台无关的 Foundations / Patterns / Components / Resources 组织。
- 2025 年随系统更新推出 Liquid Glass 新设计语言；图标配套工具 Icon Composer。
- **借鉴点：guidance 以"决策理由"而非"参数表"写成**，因此 HIG 十几年不过时——写设计文档时的范文。

### Fluent 2（Microsoft）

- 专属站 fluent2.microsoft.design：Figma kits / Develop / Components（Web·iOS·Android·Windows 四平台）/ Resources（A11y 标注、对比度检查、Content Reel、Icon Scaling）。
- **借鉴点：把无障碍做成设计师工具链的一部分**（焦点顺序、对比度在设计稿阶段由 Figma 插件校验），而不是上线后审计。
- 本地深度证据：Windows 桌面研究笔记 6 篇（基于 Microsoft Learn，含 Win32 UX Guide 时效性标注；本地提取物，待正式入库）——Windows 桌面应用设计决策可直接复用。

### Ant Design

- 设计价值观四条：确定性、意义感、生长性、自然；当前版本 v6.x。
- **借鉴点：首个把"机器可读性"当一等公民的设计系统**——设有 "For Agents" 页面为 AI 编码代理提供文档。这是 2026 年设计系统行业的方向信号。
- 中文产品参照它的一致性与企业中台组件覆盖。

### Netflix（证伪结论）

- **不存在公开的设计系统站点**。网络流传的 "Netflix 设计系统" 均为第三方仿作；唯一官方对外设计渠道是 Medium 出版物 "Netflix Design"（设计团队随笔，抓取页面已无活跃文章列表）。
- 第三方分析指出 Netflix 有意反向选择：**"灵活性比标准化更重要"**，界面演进靠大规模 A/B 测试驱动而非规范约束；2026-01 与 Koto 合作的品牌视觉焕新属品牌识别更新，不是设计系统发布。
- 判断启示：设计系统不是唯一正确解——**实验驱动的内容型产品可以刻意不建系统**。审阅"是否该建设计系统"问题时，Netflix 是反例锚点。

### 快速补充

- **Polaris**：VS Code 里补全 token——设计 token 用到"输入端"而非只到"样式端"。
- **Carbon**：Carbon MCP / Carbon AI Chat——设计系统知识接入 AI 工作流的最激进样本。
- **Atlassian**：DESIGN.md——把设计上下文做成随仓库可携带的文件（类似 AGENTS.md 思路在设计域的落地）。
- **Lightning**：体系最重；**SLDS 2 已 GA（Winter '26）**，官方将其定位为"人类与 agent 协作"的下一代体验基础（dark mode、高级主题、agentic capabilities）——又一个设计系统 AI 化趋势的印证。

## 行业趋势综合（2026-09 视角）

1. **设计系统的"AI 消费接口"成为新战场**：Ant For Agents、Carbon MCP、Atlassian DESIGN.md 指向同一件事——设计系统的下一位主要读者不再是人，而是 agent。
2. **个性化系统级化**（Material You → Expressive）与 **无障碍工具链化**（Fluent）分别是消费者端与企业端的两个确定性趋势。
3. "写决策理由"（HIG）与"实验驱动"（Netflix）代表规范光谱的两端：前者适合平台生态，后者适合内容分发产品。

## 信源合集

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S1 | Material Design 3 官网 | L0 | https://m3.material.io/ | 2026-09-02 |
| S2 | Apple Developer Design 门户 | L0 | https://developer.apple.com/design/ | 2026-09-02 |
| S4 | Fluent 2 官网 | L0 | https://fluent2.microsoft.design/ | 2026-09-02 |
| S5 | Ant Design 官网 | L0 | https://ant.design/ | 2026-09-02 |
| S6 | Shopify Polaris 官网 | L0 | https://polaris.shopify.com/ | 2026-09-02 |
| S7 | IBM Carbon 官网 | L0 | https://carbondesignsystem.com/ | 2026-09-02 |
| S8 | Atlassian Design 官网 | L0 | https://atlassian.design/ | 2026-09-02 |
| S9 | Salesforce Lightning 官网 | L0 | https://www.lightningdesignsystem.com/ | 2026-09-02 |
| S10 | Netflix Design（Medium） | L0 | https://medium.com/netflix-design | 2026-09-02 |
| S11 | M3 官方博客（Expressive） | L1 | https://m3.material.io/blog/building-with-m3-expressive | 2026-09-02 |
| S13 | 流媒体网 Netflix 大屏交互分析 | L3 | https://lmtw.com/mzw/content/detail/id/177180/keyword_id/-2 | 2026-09-02 |

## 缺口

- m3.material.io 与 Apple HIG 为 JS 渲染，板块结构由 meta 与转引支撑，未逐页 L0 核验。
- Fluent 3 / microsoft.design 全站导航未查证。
- Netflix Medium 出版物"彻底停更"仍为推断；补充佐证：Netflix Tech Blog 2026 年发布 GenPage（生成式 Homepage 端到端构建），进一步印证其"生成/实验驱动而非规范约束"的路线（netflixtechblog.com）。

## 增补信源（GLM websearch 复核，2026-09-02）

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S15 | Salesforce 官方博客：SLDS 2 GA（Winter '26） | L0 | https://www.salesforce.com/blog/experience-design-with-slds-2/ | 2026-09-02 |
| S16 | Trailhead：SLDS 2 GA 说明 | L0 | https://trailhead.salesforce.com/content/learn/modules/salesforce-lightning-design-system-2-for-admins/plan-your-transition-from-slds-1-to-slds-2 | 2026-09-02 |
| S17 | Netflix Tech Blog：GenPage 生成式 Homepage 构建 | L0 | https://netflixtechblog.com/genpage-towards-end-to-end-generative-homepage-construction-at-netflix-77146fba8a08 | 2026-09-02 |
