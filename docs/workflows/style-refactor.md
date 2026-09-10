---
title: 场景 B：设计系统选型与风格重构指南（Style Refactor Playbook）
description: 工程师与设计师的风格重构实战手册：主流设计系统选型决策树、Design Tokens 映射四步法与明暗模式落地。
---

# 场景 B：设计系统选型与风格重构指南（Style Refactor Playbook）

> 目标：指导团队与 Agent 在面临界面风格过时、缺乏规范或需要跨平台统一时，如何**理性选择参照体系，并将一套设计语言安全、无损地重构落地到现有代码库**。
> 参照标准：[主流设计语言索引](../languages/design-languages.md)、DTCG 设计令牌格式规范 [S1]、*Refactoring UI* [S2]。

---

## 一、 设计系统选型决策树（Decision Matrix）

不要因为盲目崇拜某家大厂而随意引入其设计系统。选型必须匹配**产品类型、目标用户心智与团队工程栈** [S2]：

```
                              你的产品面向什么场景？
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
      【B2B 企服 / 后台】       【消费者 Web / 移动端】       【跨平台原生客户端】
             │                          │                          │
      ┌──────┴──────┐            ┌──────┴──────┐            ┌──────┴──────┐
      ▼             ▼            ▼             ▼            ▼             ▼
  国内企业业务   国际化SaaS    Android/通识   iOS 生态     Windows桌面   全平台一处写
      │             │            │             │            │             │
  【Ant Design】 【Shopify】   【Material 3】 【Apple HIG】 【Fluent 2】 【Tailwind +】
     v6 确定性    Polaris 业务   动态主题弹性    决策理由长青   WinUI/Office  【Radix/Headless】
```

### 选型对照矩阵

| 候选设计系统 | 最适用场景 | 核心优势 | 潜在风险与反模式 |
|---|---|---|---|
| **Ant Design (v6)** | 国内中后台系统、数据密集型工具 | 组件极其丰富、天然支持 Agent 交互友好协议、中文排版适配极佳 | 强表达性弱、消费级移动端较厚重、高度定制化成本高 |
| **Material 3 (M3)** | 通用 Web 应用、Android 原生、个人生产力工具 | 动态颜色（Dynamic Color）系统、Expressive 情感化动效体系 | 空间留白偏大，用于企业级高密度表格后台时易造成信息稀疏 |
| **Apple HIG** | iOS / iPadOS / macOS 专用或追求极致质感的产品 | 决策理由式规范，平台原生一致性极强，设计长青 | 非苹果生态强行照搬会导致平台隐喻冲突（如在 Android 上用底部 Tab 栏） |
| **Microsoft Fluent 2** | Windows 桌面应用、大型协同工具（Office 类） | 无障碍工具化前置、多端（Web/iOS/Win/Android）形态对齐 | 样式偏向保守稳重，不适合潮流前卫的消费类营销站 |
| **Shopify Polaris** | 电商系统、商家运营后台、交易流界面 | 交易与金钱场景经过极致验证、输入表单极其克制 | 业务场景强绑定，通用型 SaaS 需要剥离特定业务属性 |
| **Tailwind + Radix / shadcn** | 自建品牌独特风格的高自由度现代化应用 | 零样式绑定、无障碍原子组件、按需编译轻量 | 必须自己定义整套 Design Tokens，无现成大厂现成规范背书 |

---

## 二、 风格重构四步落地法（Refactor Workflow）

确定选型的设计系统后，严禁在代码中直接全局查找替换 class。必须按以下四步稳妥推进：

### 第一步：类型约束审计（Constraint Audit）
- 检查目标产品类型的约束（参见 [产品类型设计约束矩阵](../patterns/product-patterns.md)）。
- ❌ **严重反模式**：将 Material 3 的移动端大圆角和大 Padding 直接搬进企业级财务对账后台，导致原本一屏能看 20 行的表格缩减到只能看 6 行，引发业务用户强烈反弹。
- **裁决准则**：当“设计系统的默认参数”与“产品类型的核心任务”冲突时，**产品类型的效率约束绝对优先于系统默认参数**。

### 第二步：提取与建立三层 Design Tokens
遵循 W3C DTCG 社区规范 [S1]，在 CSS 中建立清晰的三层变量架构：

```css
/* ============================================================
   1. Global Tokens（全局基础值：冷峻、无业务属性）
   ============================================================ */
:root {
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --gray-100: #f4f4f5;
  --gray-200: #e4e4e7;
  --gray-800: #27272a;
  --gray-900: #18181b;
}

/* ============================================================
   2. Semantic Tokens（语义别名：承担业务与模式切换角色）
   ============================================================ */
:root {
  --color-brand: var(--blue-500);
  --color-brand-hover: var(--blue-600);
  
  --bg-canvas: #ffffff;
  --bg-surface: var(--gray-100);
  --border-subtle: var(--gray-200);
  
  --text-primary: var(--gray-900);
  --text-secondary: #52565c;
  --text-muted: #8a8d93;

  /* 间距与网格：8pt 阶梯 */
  --space-unit: 8px;
  --radius-base: 4px;
}

/* 深色模式无缝映射（仅改动语义层，不碰组件层） */
.dark {
  --bg-canvas: var(--gray-900);
  --bg-surface: var(--gray-800);
  --border-subtle: rgba(255, 255, 255, 0.12);
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
}

/* ============================================================
   3. Component Tokens（组件层：直接与具体 DOM 绑定）
   ============================================================ */
.btn-primary {
  background-color: var(--color-brand);
  color: #ffffff;
  border-radius: var(--radius-base);
  padding: calc(var(--space-unit) * 1) calc(var(--space-unit) * 2);
}
```

### 第三步：组件形态与交互状态映射（Component Mapping）
挑选核心高频基础组件（Button, Input, Card, Modal, Table），进行状态与形态的统一迁移：
1. **替换边框与阴影**：剔除陈旧的粗重黑色阴影（如 `box-shadow: 0 4px 10px rgba(0,0,0,0.5)`），替换为现代精细的双层漫反射阴影（如 `0 1px 2px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02)`）或纯 1px 细线。
2. **统一圆角族谱**：全站确立主圆角（如中小控件 4px，弹窗与卡片 8px），消除随意设定的 3px、7px、15px 等碎片值。
3. **补全交互五态**：确保所有组件具备清晰的 Hover、Active、Focus-visible、Disabled 与 Loading 反馈（参见 [工程师设计及格线](../foundations/quickstart.md)）。

### 第四步：明暗模式与无障碍合规复核（Audit & Verification）
重构完成后，严密执行两项自动化与人工走查：
1. **对比度硬度量**：利用自动化工具（如 Lighthouse 或 A11y 插件）扫描所有文字，确保浅色与深色模式下正文均满足 $\ge 4.5:1$。
2. **主题翻转闪烁排查**：检查 CSS 变量在首次加载时是否有未定义的 FOUC（Flash of Unstyled Content）现象，确保脚本在 `<head>` 中前置注入。

---

## 信源合集

| 编号 | 来源 | 层级 | 出处 / URL | 取用日期 | 核心贡献 |
|---|---|---|---|---|---|
| **[S1]** | Design Tokens Community Group Format Module | L0 行业标准草案 | design-tokens.github.io/community-group/format/ | 2026-09-10 | DTCG 三层变量架构与跨工具交换规范 |
| **[S2]** | *Refactoring UI* | L4 权威著作 | refactoringui.com (Adam Wathan & Steve Schoger) | 2026-09-10 | 系统选型权衡、间距与灰阶系统落地手法 |
