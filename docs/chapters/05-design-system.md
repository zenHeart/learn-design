---
title: 设计系统：Token / Pattern / Component 三层架构与 DTCG 工程落地
description: 设计系统三层架构（Token / Pattern / Component）、W3C DTCG 规范与 JSON Schema、三层 Token（global/alias/component）、原子设计五层级、Storybook 文档化与变更日志工程实战。
---

# 设计系统：Token / Pattern / Component 三层架构与 DTCG 工程落地

> 取用日期：2026-09-20；来源层级：L0（design-tokens.github.io、w3.org、storybook.js.org）、L4（Atomic Design、Refactoring UI、Design Systems by Alla Kholmatova）。
> 核心信源：W3C Design Tokens Community Group Format [S1]、DTCG JSON Schema [S2]、Atomic Design 五层级 [S3]、Storybook 官方文档 [S4]、Material Design 3 Token 系统 [S5]、Refactoring UI [S6]、Design Systems by Alla Kholmatova [S7]、Style Dictionary [S8]、Tokens Studio Figma Plugin [S9]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 解释设计系统的 Token / Pattern / Component 三层架构，并说明每一层的输入、输出与变更影响面。
- 输出一套符合 W3C DTCG 规范的 JSON Token 文件，包含 global / alias / component 三层结构与 `$type` / `$value` 字段。
- 为一个 Tailwind 项目构建三层 Token（`--blue-600` → `--color-primary` → `--btn-primary-bg`），并解释每一层解耦的工程价值。
- 把现有的原子组件（Button、Input、Card）按状态矩阵（default / hover / active / focus / disabled）补全，并输出一份状态缺失审查报告。
- 用 Storybook 8.x 为组件库搭建文档站点，包含 autodocs、controls、a11y addon 三个核心能力。
- 为设计系统写一份符合 SemVer 的 CHANGELOG，并解释何时升级 MAJOR / MINOR / PATCH。

---

## 一、设计系统的三层架构

设计系统（Design System）是把界面设计中"可复用的视觉与交互决策"沉淀为可被多端、多人、多项目复用的资产集合。一个合格的现代设计系统至少包含三层：Token、Pattern、Component [S6][S7]。

### 1. Token：原子化的视觉变量

**Token（设计令牌 / Design Tokens）** 是把界面视觉属性（颜色、间距、字体、圆角、动效等）抽象为跨平台、跨框架的最小原子键值对 [S1]。

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "oklch(52% 0.20 250)"
    },
    "spacing": {
      "md": {
        "$type": "dimension",
        "$value": "16px"
      }
    }
  }
}
```

### 2. Pattern：可复用交互模板

**Pattern** 是解决某一类通用交互问题的"模板配方"——它不绑定具体组件，但提供布局与行为的标准化范式。例如：搜索栏模式、表单校验模式、空状态模式、分页模式、Toast 通知模式。

Pattern 与 Component 的区别：Pattern 是"配方"，可以由多个 Component 组合实现；Component 是"成品"，可以直接拖入页面使用。

### 3. Component：可复用的成品组件

**Component** 是可被直接 import 使用的成品 UI 元素。它内部消费 Token + Pattern，外部暴露 Props 接口。

### 4. 三层架构的输入输出关系

| 层级 | 输入 | 输出 | 变更影响 |
|---|---|---|---|
| **Token** | 品牌色板、间距阶梯、字阶 | CSS Variables / 跨平台 JSON | 影响所有消费该 Token 的 Component |
| **Pattern** | Token + 交互规则 | 布局模板、状态机 | 影响所有实现该 Pattern 的页面 |
| **Component** | Token + Pattern + Props API | 可 import 的 UI 元素 | 影响所有引用该 Component 的页面 |

变更频率的反向规律：Token 变更最少（季度级），Pattern 中等（月度级），Component 最频繁（周级）。把频繁变更的东西沉淀到下层，把稳定的东西暴露在上层。

---

## 二、W3C DTCG 规范与 JSON Schema

### 1. DTCG 是什么

Design Tokens Community Group（DTCG）是 W3C 下属的社区工作组，成立于 2019 年，目标是为设计 Token 制定**跨工具、跨平台、可互操作**的开放标准 [S1]。其核心交付物是 *Design Tokens Format Module* 与配套的 JSON Schema [S2]。

DTCG 的工程价值：

- **跨工具兼容**：Figma Tokens / Tokens Studio、Style Dictionary、Adobe Spectrum、Salesforce Lightning、Material Design 3 等均已支持 DTCG 输出 [S8][S9]。
- **多端代码生成**：同一份 Token JSON 可以编译为 CSS Variables、iOS Swift、Android XML、React Native StyleSheet。
- **避免厂商锁定**：不再依赖任何单一厂商的私有格式。

### 2. DTCG JSON 基础结构

DTCG 规定的最小字段是 `$type` 与 `$value` [S1][S2]：

```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "oklch(60% 0.18 250)"
      },
      "600": {
        "$type": "color",
        "$value": "oklch(52% 0.20 250)"
      }
    },
    "spacing": {
      "md": {
        "$type": "dimension",
        "$value": "16px"
      },
      "lg": {
        "$type": "dimension",
        "$value": "24px"
      }
    },
    "font": {
      "body": {
        "$type": "fontFamily",
        "$value": "Inter, 'PingFang SC', sans-serif"
      }
    },
    "duration": {
      "fast": {
        "$type": "duration",
        "$value": "150ms"
      }
    }
  }
}
```

### 3. 支持的 `$type` 类型

DTCG 当前正式定义的类型包括 [S1][S2]：

| `$type` | 用途 | 示例值 |
|---|---|---|
| `color` | 颜色 | `"oklch(52% 0.20 250)"`、`"#3B82F6"` |
| `dimension` | 尺寸（px/rem/em） | `"16px"`、`"1rem"` |
| `fontFamily` | 字体栈 | `"Inter, sans-serif"` |
| `fontWeight` | 字重 | `400`、`600` |
| `duration` | 时长 | `"150ms"` |
| `cubicBezier` | 缓动函数 | `"cubic-bezier(0.4, 0, 0.2, 1)"` |
| `number` | 纯数字（行高、不透明度等） | `1.5` |
| `typography` | 复合类型（字号+行高+字重+字体栈） | 见下文 |
| `shadow` | 阴影 | `"0 4px 12px rgba(0,0,0,0.08)"` |
| `border` | 边框 | `"1px solid #E5E7EB"` |
| `transition` | 过渡 | `"150ms cubic-bezier(0.4, 0, 0.2, 1)"` |

### 4. 复合类型：`typography` 与 `shadow`

DTCG 支持复合类型，输出时自动展开为多个原子属性 [S2]：

```json
{
  "typography": {
    "heading-2": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Inter, sans-serif",
        "fontSize": "1.5rem",
        "fontWeight": 600,
        "lineHeight": 1.3,
        "letterSpacing": "-0.01em"
      }
    }
  },
  "shadow": {
    "elevation-2": {
      "$type": "shadow",
      "$value": {
        "color": "rgba(0, 0, 0, 0.08)",
        "offsetX": "0px",
        "offsetY": "4px",
        "blur": "12px",
        "spread": "0px"
      }
    }
  }
}
```

### 5. 别名（Alias）与引用

DTCG 通过 `{group.token}` 语法实现 Token 之间的引用，解耦"原始值"与"语义用途" [S1][S2]：

```json
{
  "color": {
    "blue": {
      "600": { "$type": "color", "$value": "oklch(52% 0.20 250)" }
    },
    "primary": {
      "$type": "color",
      "$value": "{color.blue.600}"
    }
  }
}
```

引用解析由编译器（Style Dictionary / Tokens Studio）负责。

---

## 三、三层 Token：global / alias / component

### 1. 三层架构的工程价值

把 Token 拆成三层是设计系统能否支持**规模化、多主题、可演进**的关键 [S5][S6]：

- **Layer 1 Global Token**：原始原子值，是色板、间距阶梯、字体阶梯的最小单位。命名如 `blue-600`、`space-16`、`font-16`。
- **Layer 2 Alias Token（语义 Token）**：把 Global Token 绑定到用途语义，是"做什么用"而非"是什么颜色"。命名如 `color-primary`、`text-body`、`spacing-card`。
- **Layer 3 Component Token**：组件内部使用的具体 Token，绑定到具体组件的某个属性。命名如 `btn-primary-bg`、`input-border-color`。

### 2. 三层 Token 的 DTCG 实现

```json
{
  "color": {
    "blue": {
      "50":  { "$type": "color", "$value": "oklch(97% 0.02 250)" },
      "600": { "$type": "color", "$value": "oklch(52% 0.20 250)" },
      "700": { "$type": "color", "$value": "oklch(44% 0.20 250)" }
    },

    "primary": {
      "$type": "color",
      "$value": "{color.blue.600}",
      "$extensions": {
        "purpose": "primary brand color for main actions"
      }
    },
    "primary-hover": {
      "$type": "color",
      "$value": "{color.blue.700}"
    },
    "on-primary": {
      "$type": "color",
      "$value": "oklch(99% 0.005 250)"
    }
  },

  "component": {
    "button": {
      "primary": {
        "bg":         { "$type": "color", "$value": "{color.primary}" },
        "bg-hover":   { "$type": "color", "$value": "{color.primary-hover}" },
        "fg":         { "$type": "color", "$value": "{color.on-primary}" },
        "padding-x":  { "$type": "dimension", "$value": "{spacing.lg}" },
        "padding-y":  { "$type": "dimension", "$value": "{spacing.md}" },
        "radius":     { "$type": "dimension", "$value": "{radius.md}" },
        "font-weight":{ "$type": "fontWeight", "$value": 600 }
      }
    }
  }
}
```

### 3. 编译到 CSS Variables

用 Style Dictionary 把 DTCG JSON 编译成 CSS [S8]：

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
      }],
    },
  },
};
```

编译输出：

```css
:root {
  --color-blue-600: oklch(52% 0.20 250);
  --color-primary: var(--color-blue-600);
  --component-button-primary-bg: var(--color-primary);
  --component-button-primary-padding-x: var(--spacing-lg);
}
```

### 4. 三层架构的工程收益

| 收益 | 描述 |
|---|---|
| **主题切换零成本** | 暗色模式只需覆盖 Alias 层与 Component 层，Global 层不变 |
| **品牌迭代低成本** | 换品牌色只需改 Global 层（如 `blue-600` 改为 `purple-600`），所有页面同步 |
| **跨端一致性** | 同一份 DTCG JSON 编译为 iOS / Android / Web，色板永远一致 |
| **可测试性** | Alias 与 Component Token 可在 CI 中校验对比度（详见 [01-color](../01-color)） |

---

## 四、组件库：从原子到模板

### 1. 原子设计的五层级

Brad Frost 在 *Atomic Design* 中提出五层级模型 [S3]：

| 层级 | 定义 | 示例 |
|---|---|---|
| **Atoms（原子）** | 不可再分的基础元素 | Button、Input、Icon、Label |
| **Molecules（分子）** | 2-3 个原子组合 | SearchForm（Input + Button）、FormField（Label + Input + Helper） |
| **Organisms（生物）** | 较复杂的组合组件 | TopNav、ProductCard、CommentList |
| **Templates（模板）** | 页面级线框骨架 | CheckoutPageTemplate（无真实数据） |
| **Pages（页面）** | 填充真实数据的最终实体 | CheckoutPage（用户、订单、商品） |

工程经验：**80% 的日常复用集中在 Atom 与 Molecule 两层**。Template 与 Page 应当尽量晚建——它们的复用性最低、维护成本最高。

### 2. 组件的 Props API 设计

Props API 是组件的"对外契约"。三个设计原则 [S6][S7]：

1. **语义优先**：`variant="primary"` 优于 `color="blue"`——后者绑定了视觉实现，前者表达意图。
2. **默认值合理**：`size="medium"` 是默认；用户不传 Props 时组件应当有合理表现。
3. **类型严格**：用 TypeScript 限定 Props 取值范围，避免字符串拼写错误。

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}
```

### 3. 组件状态矩阵

每个交互组件都必须提供**完整状态矩阵**（详见 [01-color](../01-color) 与 [foundations/quickstart](../foundations/quickstart)）：

| 状态 | 触发条件 | 视觉变化 | 必须可观察 |
|---|---|---|---|
| Default | 默认渲染 | 基线样式 | 视觉线索清晰 |
| Hover | 鼠标悬浮 | 亮度 / 阴影变化 | 颜色对比 ≥ 3:1 |
| Active | 按下 / 鼠标左键按住 | 下沉 1px 或进一步深色 | 物理反馈 |
| Focus-visible | 键盘聚焦 | 2px outline | 无障碍硬指标 |
| Disabled | disabled 属性 | opacity 0.5 + cursor not-allowed | 阻断交互 |

---

## 五、文档化：Storybook / Figma Library / Zeroheight

### 1. Storybook：组件级实时文档

Storybook 是组件库文档的事实标准 [S4]。最新版本（8.x）的三大核心能力：

1. **Autodocs**：从组件源码自动生成 Props 文档、类型签名、默认值。
2. **Controls**：在文档页面直接调节 Props 实时预览，无需改代码。
3. **a11y Addon**：集成 axe-core，自动审计 WCAG 违规并标红。

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: '立即注册' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: '已停用' },
};
```

### 2. Figma Library 与 Zeroheight

- **Figma Library**：把 Token 与 Component 发布为 Figma Library，设计师与工程师共享同一份组件源。
- **Zeroheight / Notion**：把 Token 决策记录、组件使用规范、品牌指南沉淀为可检索的设计文档。
- **Storybook + Figma**：通过 *Storybook Figma Plugin* 实现双向链接——Story 里点按钮跳到 Figma 源组件，Figma 里点组件跳到 Story 文档。

### 3. 三者的工程分工

| 工具 | 受众 | 输出 |
|---|---|---|
| **Storybook** | 工程师 | 组件代码、Props 实时预览、a11y 审计 |
| **Figma Library** | 设计师 | 设计稿组件源、可复用资产、设计变体 |
| **Zeroheight** | 全员 | 使用规范、设计原则、品牌指南 |

---

## 六、版本管理与变更日志

### 1. SemVer 在设计系统的应用

设计系统的版本号必须遵循 SemVer（Semantic Versioning）：`MAJOR.MINOR.PATCH` [S7]。

| 变更类型 | 版本号 | 触发条件 | 影响 |
|---|---|---|---|
| **MAJOR** | 1.0.0 → 2.0.0 | 破坏性变更：移除 Token、组件重命名、Props 删除 | 所有消费方必须升级 |
| **MINOR** | 1.0.0 → 1.1.0 | 向后兼容：新增 Token / 组件 / Props、视觉调整 | 可选升级 |
| **PATCH** | 1.0.0 → 1.0.1 | Bug 修复：颜色偏差、对比度修复、文档错别字 | 推荐升级 |

### 2. CHANGELOG 模板

```markdown
# Changelog

## [1.2.0] - 2026-09-20

### ✨ New
- 新增 `color.success` 语义 Token（`#22C55E`）
- 新增 `<Toast>` 组件（Molecule 层）

### 🔧 Changed
- 调整 `color.primary` 默认值为 `oklch(52% 0.20 250)`，对比度从 4.2:1 提升至 4.7:1
- `<Button>` 的 `padding-y` 从 8px 调整为 10px

### ⚠️ Deprecated
- `<Button variant="link">` 将在 2.0 移除，请改用 `<Link>`

### 🐛 Fixed
- 修复 `<Input>` 错误态边框在暗色模式对比度仅 2.8:1 的问题

## [1.1.0] - 2026-08-15
...
```

### 3. 视觉回归测试

每次改动 Token 或组件，必须跑视觉回归测试（Visual Regression Testing）：

- **工具**：Chromatic、Percy、Loki、BackstopJS。
- **流程**：CI 中渲染所有 Story 截图，与基线对比像素差异（阈值通常 0.1%）。
- **目的**：防止"修复一个 Token 导致 50 个组件视觉异常"的连锁反应。

---

## 真实任务

### 任务一：把现有 Tailwind 项目重构为 DTCG 结构

选一个你现有的 Tailwind 项目，按下列步骤改造：

1. 在 `tokens/` 目录下新建 `global.json`、`alias.json`、`component.json` 三份 DTCG 文件，按上文三层结构组织。
2. 安装 Style Dictionary，配置 `style-dictionary.config.js`，编译到 `dist/css/variables.css`。
3. 修改 Tailwind config，让 `theme.colors` 引用编译后的 CSS Variables（不要硬编码色值）。
4. 验证：把 `--blue-600` 全局改为 `--purple-600`，刷新页面确认所有主色按钮、链接、文本焦点环同步变化。
5. 输出 1 段结论（200 字以内）说明三层 Token 改造前后的工程差异。

### 任务二：补全 Button 组件的状态矩阵与文档

1. 选取一个现有的 Button 组件，按 default / hover / active / focus-visible / disabled / loading 六态补全 CSS。
2. 接入 Storybook 8.x，开启 autodocs、controls、a11y 三个 addon。
3. 用 a11y addon 跑一次审计，记录所有违规项并修复。
4. 输出一份 CHANGELOG 条目（按上文模板），描述本次变更。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 所有 Token 平铺在一层，`--blue-600` 同时被组件与全局直接引用 | 没有 Alias 语义层，换品牌色时要全局搜索替换 | 引入三层结构：Global（blue-600）→ Alias（color-primary）→ Component（btn-primary-bg），禁止组件直接引用 Global Token |
| 2 | 组件 CSS 里硬编码 `#3B82F6`、`padding: 12px` 等具体值 | 缺少 Component Token 层，组件无法跟随主题切换 | 所有视觉值用 Component Token 引用（`background: var(--btn-primary-bg)`），具体值只出现在 DTCG JSON 中 |
| 3 | 团队内出现 5 个"差不多"的 Button 组件——PrimaryButton、MainBtn、SubmitButton、CTAButton、BlueButton | 缺少统一的 Component 层抽象，开发者复制粘贴现有组件做"小修改" | 收敛到 1 个 Button，通过 `variant` / `size` Props 表达差异；新增需求先评估能否扩展现有组件，再考虑新建 |
| 4 | Button 只有 default 与 disabled 两态，hover / active / focus-visible 缺失 | 状态矩阵补全是体力活，工程师常常跳过 | 强制要求每个交互组件必须定义六态（详见 [foundations/quickstart](../foundations/quickstart)）；CI 中用 a11y addon 校验 focus-visible |
| 5 | 暗色模式覆盖到 80% 的 Token，但剩下 20%（如 error 文字色、focus ring 颜色）仍是浅色模式值 | 暗色模式映射时只跑了 Token 列表的前 N 个，未跑全量 | 用 Style Dictionary 的主题插件（`themes/dark.json`）覆盖整个 Alias 层；CI 中对比暗色模式下每个 Token 的对比度，不达标项直接报错 |

---

## 本章验收

1. **三层 Token 命名**：给你一个按钮"主要操作、悬停加深的背景色"，请分别写出它在 Global / Alias / Component 三层的 Token 名称，并解释为何不直接从 Global 引用到组件。
2. **DTCG 字段校验**：一份 DTCG JSON 文件只写 `{ "primary": "#3B82F6" }`，缺失了哪些必填字段？为什么 `$type` 不能省略？
3. **SemVer 决策**：下列三个变更分别应当触发 MAJOR / MINOR / PATCH 中哪一种？(a) 新增 `<Modal>` 组件；(b) 把 `<Button variant="primary">` 的 Props 改名为 `variant="action"`；(c) 修复 `<Input>` 错误态在 Safari 16 上边框消失的 bug。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://design-tokens.github.io/community-group/format/ | 2026-09-20 | Design Tokens Community Group — Format Module |
| [S2] | L0 | https://design-tokens.github.io/community-group/format/#schema-2021-10-01 | 2026-09-20 | DTCG JSON Schema (2021-10-01) |
| [S3] | L4 | https://atomicdesign.bradfrost.com/ | 2026-09-20 | Atomic Design (Brad Frost) |
| [S4] | L0 | https://storybook.js.org/docs/react/get-started/introduction | 2026-09-20 | Storybook Documentation — React |
| [S5] | L0 | https://m3.material.io/foundations/design-tokens/overview | 2026-09-20 | Material Design 3 — Design Tokens |
| [S6] | L4 | https://refactoringui.com/ | 2026-09-20 | Refactoring UI — Actionable UI design tips (Adam Wathan & Steve Schoger) |
| [S7] | L4 | https://www.smashingmagazine.com/printed-books/design-systems/ | 2026-09-20 | Design Systems by Alla Kholmatova (Smashing Magazine) |
| [S8] | L0 | https://amzn.github.io/style-dictionary/ | 2026-09-20 | Style Dictionary — Multi-platform Token transformer |
| [S9] | L0 | https://tokens.studio/ | 2026-09-20 | Tokens Studio for Figma — DTCG Plugin |
