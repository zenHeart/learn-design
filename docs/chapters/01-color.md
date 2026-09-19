---
title: 色彩：从感知理论到可访问色板工程
description: 色彩理论基础（HSL/OKLCH）、WCAG 2.2 与 APCA 对比度差异、语义化色板与中性灰阶构建、暗色模式映射原则、Tailwind 与 CSS Variables 落地。
---

# 色彩：从感知理论到可访问色板工程

> 取用日期：2026-09-20；来源层级：L0（W3C、MDN、Material Design、Apple HIG）、L4（Refactoring UI）。
> 核心信源：WCAG 2.2 [S1]、CSS Color Module Level 4 [S2]、MDN OKLCH [S3]、Material Design 3 Color [S4]、Apple HIG Dark Mode [S5]、APCA [S6]、Refactoring UI [S7]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 用 HSL 与 OKLCH 两种色彩空间解释同一颜色，并指出二者在感知均匀性上的差异。
- 为一段文本与背景计算对比度，并判断是否满足 WCAG 2.2 AA（≥4.5:1 / 大文本 ≥3:1）。
- 输出一套包含 primary / secondary / neutral / semantic（success、warning、error、info）的语义色板，并给出 CSS Variables 与 Tailwind 配置两种实现。
- 独立构建一组从 gray-50 到 gray-900 的中性色阶，曲线平滑且相邻档位亮度差控制在感知均匀范围内。
- 为已有的浅色色板推导暗色模式映射，并解释为何不能简单 invert。
- 在浏览器中用 DevTools 对一个真实组件做对比度审计并修复不达标项。

---

## 一、色彩理论基础

### 1. 色彩三属性：色相、明度、饱和度

任何颜色都可以用三个独立属性描述 [S2]：

- **色相（Hue）**：颜色在色环上的角度位置（0–360°），红橙黄绿青蓝紫构成连续圆环。
- **饱和度（Saturation）**：颜色偏离灰色的程度，0 表示纯灰，100% 表示最大饱和度。
- **明度（Lightness / Value）**：颜色的明暗程度，0 表示全黑，100% 表示全白。

三属性共同决定了颜色的"身份"，但**人眼对它们的感知是非线性的**——这正是 HSL 与 OKLCH 差异的根源。

### 2. HSL / HSV 与它们的工程缺陷

HSL 是工程师最熟悉的色彩空间，因为它直观、容易在颜色选择器里挑色。但 HSL 的"L"是**数学意义上的亮度**，与人眼感知不一致：

```css
/* HSL 中两个 L=50% 的颜色，主观亮度截然不同 */
--color-warm-50: hsl(20, 100%, 50%);   /* 鲜艳橙色，主观亮度极高 */
--color-cool-50: hsl(240, 100%, 50%); /* 鲜艳蓝色，主观亮度很低 */
```

这意味着按 HSL 等距生成的"色阶 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900"，黄色与蓝色档位的实际感知亮度并不连续——蓝色在 L=20% 时已接近全黑，黄色在 L=80% 时仍然刺眼。这就是为什么 Material Design 3 已经从 HSL 转向 HCT（基于 CAM16 的 Hue-Chroma-Tone）[S4]。

### 3. OKLCH：感知均匀色彩空间

CSS Color Module Level 4 引入了 **OKLCH**（Oklab LCh），其中 L 是感知亮度（perceptual lightness），C 是色度（chroma），H 是色相 [S3]：

```css
:root {
  /* 三个不同色相，相同 L=0.7，主观亮度一致 */
  --warm-70: oklch(70% 0.15 30);   /* 暖橙 */
  --green-70: oklch(70% 0.15 145); /* 翠绿 */
  --cool-70: oklch(70% 0.15 250);  /* 冷蓝 */
}
```

OKLCH 的工程优势：

- 调整 L 时，颜色的主观明暗变化是均匀的，适合构建 gray-50 → gray-900 色阶。
- 色相旋转时亮度的"抖动"远小于 HSL，避免蓝色档位突然变暗或黄色档位突然变亮。
- 现代浏览器（Chrome 111+、Safari 15.4+、Firefox 113+）已全部原生支持 [S3]。

### 4. 何时仍可用 HSL

HSL 在"挑选颜色起点"阶段仍然有用——颜色选择器、Sketch/Figma 取色器都仍以 HSL 显示。一旦需要构建色阶、做暗色模式映射、做数据可视化色板，**立刻切换到 OKLCH**。

---

## 二、对比度：WCAG 2.2 与 APCA

### 1. WCAG 2.2 的硬性数字

WCAG 2.2（2023-10-05 Recommendation，2024-12-12 更新）明确规定了文本与背景的对比度下限 [S1]：

| 等级 | 正文文本 | 大文本（≥18pt / ≥14pt 粗体） | 非文本组件 |
|---|---|---|---|
| AA | ≥ 4.5:1 | ≥ 3:1 | ≥ 3:1 |
| AAA | ≥ 7:1 | ≥ 4.5:1 | — |

行业基线是 **AA**。所有正文、按钮文字、表单标签必须满足 4.5:1；图标边界、输入框边框、焦点指示器必须满足 3:1（WCAG 2.2 强化的 1.4.11 条目）。

### 2. 计算工具与工程嵌入

WebAIM Contrast Checker 是工程验证的首选工具 [S8]。把它接入 CI：

```javascript
// scripts/check-contrast.js
import { chromium } from 'playwright';

const ratio = (hex1, hex2) => {
  const lum = (hex) => {
    const [r, g, b] = hex.match(/\w\w/g).map(h => parseInt(h, 16) / 255);
    const f = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const [l1, l2] = [lum(hex1), lum(hex2)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
};

const cases = [
  { fg: '#1A1C1E', bg: '#FFFFFF', need: 4.5 }, // 正文
  { fg: '#52565C', bg: '#FFFFFF', need: 4.5 }, // 正文灰
  { fg: '#3B82F6', bg: '#FFFFFF', need: 4.5 }, // 主色文字
];
for (const c of cases) {
  const r = ratio(c.fg, c.bg);
  console.log(`${c.fg} on ${c.bg}: ${r.toFixed(2)}:1 ${r >= c.need ? '✅' : '❌'}`);
}
```

### 3. APCA：仍是 draft，2026 年未进 WCAG

APCA（Accessible Perceptual Contrast Algorithm）由 Andrew Somers 提出，试图用感知模型替代 WCAG 2.x 的简单比值 [S6]。W3C 已发布 APCA 作为 Note，但**截至 2026 年 9 月，APCA 仍未进入 WCAG 3.0 正式推荐版**，WCAG 3.0 仍处于 Working Draft 阶段。

工程实践建议：

- 合规底线继续按 **WCAG 2.2 AA** 走——任何宣称"通过无障碍审计"的产品必须能报出 AA 数字。
- APCA 可以作为辅助参考，用于发现 WCAG 通过但实际阅读困难的搭配（例如浅灰文字在白底上 4.5:1 通过但视觉吃力）。
- 不要在合规报告里把 APCA 当作"取代 WCAG"的依据。

---

## 三、语义化色板结构

### 1. 三层 Token 架构

现代设计系统采用 **Global → Semantic → Component** 三层架构，把"是什么颜色"与"用来做什么"解耦 [S7][S4]：

```css
:root {
  /* Layer 1: Global Token — 原始色阶 */
  --blue-50:  oklch(97% 0.02 250);
  --blue-100: oklch(93% 0.04 250);
  --blue-500: oklch(60% 0.18 250);
  --blue-600: oklch(52% 0.20 250);
  --blue-700: oklch(44% 0.20 250);

  /* Layer 2: Semantic Token — 用途语义 */
  --color-primary:        var(--blue-600);
  --color-primary-hover:  var(--blue-700);
  --color-on-primary:     oklch(99% 0.005 250); /* 主按钮上的文字 */
  --color-success:        oklch(60% 0.16 145);
  --color-warning:        oklch(75% 0.15 80);
  --color-error:          oklch(55% 0.20 25);
  --color-info:           oklch(60% 0.12 230);

  /* Layer 3: Component Token — 组件具体应用 */
  --btn-primary-bg:     var(--color-primary);
  --btn-primary-color:  var(--color-on-primary);
  --alert-error-border: var(--color-error);
}
```

### 2. Primary / Secondary / Neutral / Semantic 四象限

任何界面色板最终应归入四个语义桶：

- **Primary（主色）**：品牌色，用于主操作按钮、关键链接、强调态。**全文只允许出现一个主色** [S7]。
- **Secondary（次色）**：辅助强调，用于次操作、对比区块、标签。允许与主色同色相但不同明度（如 blue-500 与 blue-200），或同明度但不同色相。
- **Neutral（中性色）**：灰阶，用于背景、边框、分隔线、文本。它是页面 80% 像素的颜色载体 [S7]。
- **Semantic（语义色）**：成功 / 警告 / 错误 / 信息四种状态色，**不能由品牌色兼任**。

### 3. Semantic 色的常见误用

把品牌色当作"成功"或"错误"是典型错误——品牌色在语义上是中性的"主操作"，与状态语义冲突。正确做法是让 success / warning / error / info 在色相上互相区分：

| 状态 | 推荐色相区间 | 用途示例 |
|---|---|---|
| Success | 145°（绿） | 操作成功、保存完成 |
| Warning | 38°（橙黄） | 注意事项、非阻塞提醒 |
| Error | 25°（红） | 错误、删除、必填校验失败 |
| Info | 230°（蓝） | 中性提示、帮助说明 |

---

## 四、中性色阶的工程构建

### 1. 为何不能用纯灰 `#808080` 阶梯

直接把 gray-50 到 gray-900 设为 `#F5F5F5 / #E5E5E5 / ... / #1A1A1A` 的等距灰，会出现两个问题：

- **色相偏冷或偏暖不一致**：纯灰在不同背光屏上看起来带蓝或带黄，缺乏品牌一致性。
- **相邻档位感知差异不均**：人眼对中段亮度敏感，对极亮极暗迟钝，等距灰在中段会出现"挤"的感觉。

### 2. OKLCH 中性色阶模板

推荐在 OKLCH 里把色相锚定到一个偏冷的色相（如 250°），饱和度保持极低，让色阶自然带一点冷调，与多数品牌色和谐：

```css
:root {
  --gray-50:  oklch(98% 0.005 250);
  --gray-100: oklch(96% 0.005 250);
  --gray-200: oklch(92% 0.005 250);
  --gray-300: oklch(86% 0.005 250);
  --gray-400: oklch(74% 0.005 250);
  --gray-500: oklch(60% 0.005 250);
  --gray-600: oklch(50% 0.005 250);
  --gray-700: oklch(40% 0.005 250);
  --gray-800: oklch(28% 0.005 250);
  --gray-900: oklch(18% 0.005 250);
  --gray-950: oklch(12% 0.005 250);
}
```

L 值的间距从暗端到亮端逐步缩小（12 → 18 → 28 → 40 → 50 → 60 → 74 → 86 → 92 → 96 → 98），相邻档位的主观亮度差接近均匀。

### 3. 文本灰阶的三档规则

90% 的页面只需要三档文本灰 [S7]：

| 层级 | Token | 浅色模式 | 暗色模式 | 用途 |
|---|---|---|---|---|
| Primary | `--text-primary` | `--gray-900` | `--gray-50` | 标题、关键数据 |
| Body | `--text-body` | `--gray-700` | `--gray-200` | 正文、表单、表格 |
| Muted | `--text-muted` | `--gray-500` | `--gray-400` | 占位、辅助元数据 |

---

## 五、暗色模式色板映射

### 1. 为什么不能简单 invert

直接把浅色模式的色板 `invert()` 过滤一遍，会产生两个灾难：

- 黑色背景上纯白文字对比度过高（21:1），造成"光晕"和阅读疲劳。
- 色相翻转，红色变青绿、蓝色变橙黄，品牌识别彻底崩塌。

Apple HIG 与 Material Design 3 都明确指出：**暗色模式不是反相，是重新设计** [S5][S4]。

### 2. OKLCH 映射公式

Material Design 3 推荐在 OKLCH / HCT 空间做映射，遵循两条工程规则 [S4]：

1. **背景 L 值取浅色模式的反面**：浅色页面背景 L=98%，暗色页面背景 L=10%。
2. **主色降饱和、提亮度**：浅色模式主色 blue-600 (L=52%) 在暗色模式可映射到 blue-400 (L=70%)，避免在深背景上刺眼。

```css
[data-theme="dark"] {
  --color-bg:           oklch(12% 0.01 250);
  --color-surface:      oklch(18% 0.01 250);
  --color-text-primary: oklch(96% 0.005 250);
  --color-text-body:    oklch(82% 0.005 250);
  --color-text-muted:   oklch(64% 0.005 250);
  --color-primary:      oklch(70% 0.15 250); /* 浅色模式是 52% */
  --color-primary-hover: oklch(78% 0.15 250);
}
```

### 3. 暗色模式的特殊处理

- **阴影**：暗色背景上投影几乎不可见，改用**边框 + 内阴影**表达层级 [S5]。
- **图像**：避免纯黑照片，叠加一层 `background: rgba(255,255,255,0.04)` 提高可识别度。
- **饱和度**：所有彩色在暗色背景上都要降饱和（饱和度砍半），否则会"荧光化"。

---

## 六、Tailwind 与 CSS Variables 落地

### 1. Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        50: 'oklch(98% 0.005 250)',
        100: 'oklch(96% 0.005 250)',
        200: 'oklch(92% 0.005 250)',
        300: 'oklch(86% 0.005 250)',
        400: 'oklch(74% 0.005 250)',
        500: 'oklch(60% 0.005 250)',
        600: 'oklch(50% 0.005 250)',
        700: 'oklch(40% 0.005 250)',
        800: 'oklch(28% 0.005 250)',
        900: 'oklch(18% 0.005 250)',
      },
      primary: {
        DEFAULT: 'oklch(52% 0.20 250)',
        hover:   'oklch(44% 0.20 250)',
      },
      success: 'oklch(60% 0.16 145)',
      warning: 'oklch(75% 0.15 80)',
      error:   'oklch(55% 0.20 25)',
      info:    'oklch(60% 0.12 230)',
    },
  },
};
```

### 2. CSS Variables 实现

```css
:root {
  --color-bg: white;
  --color-text: var(--gray-900);
}
[data-theme="dark"] {
  --color-bg: var(--gray-950);
  --color-text: var(--gray-50);
}
body {
  background: var(--color-bg);
  color: var(--color-text);
}
```

### 3. 一键切换

```html
<html data-theme="light">
  <body>
    <button onclick="document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'">
      切换主题
    </button>
  </body>
</html>
```

---

## 真实任务

### 任务一：为一个 SaaS 控制台设计完整色板

为一家虚构的"团队协作 SaaS"产品设计色板，输出 **Tailwind config + CSS Variables + 暗色模式映射**。约束：

1. 品牌主色定为蓝绿色相（hue=180°），要求在浅色和暗色模式都通过 WCAG AA。
2. 必须包含 gray-50 到 gray-900 的中性色阶，文字使用三档（primary / body / muted）。
3. 必须包含 success / warning / error / info 四个语义色，每个语义色与主色对比度 ≥ 3:1。
4. 暗色模式不能用 `filter: invert()`，必须逐 Token 重新定义。
5. 在 README 里用 WebAIM Contrast Checker 截图证明所有文本组合 ≥ 4.5:1 [S8]。

### 任务二：修复现有项目的对比度违规

1. 用浏览器 DevTools 的"Inspect → Accessibility → Contrast"走查一个真实组件，记录所有不达标项。
2. 用 OKLCH 微调违规 Token，直到所有正文 ≥ 4.5:1、大文本 ≥ 3:1。
3. 把修复前后的对比度数字做成表格，提交 PR。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 浅色背景上用纯黑 `#000` 正文，长时间阅读眼疲劳 | 纯黑与纯白对比度 21:1，远超阅读舒适区（4.5:1 ~ 7:1），产生光晕与震颤 | 改用带轻微冷调的深灰，如 `#1A1C1E` 或 `oklch(18% 0.005 250)` |
| 2 | 把品牌色（蓝）当作 success 色，绿色状态用蓝色按钮显示 | 品牌色在语义上是中性"主操作"，与状态语义冲突，用户无法区分"确认"与"成功" | 引入独立的 semantic 桶，success 用 `oklch(60% 0.16 145)`，与品牌 blue (hue=250) 色相分离 |
| 3 | 上线前从不验证对比度，假设"看得清就行" | 未引入自动化对比度检查，颜色凭感觉选取 | 在 CI 中集成 `scripts/check-contrast.js`，PR 必须显示所有 token 组合通过 AA |
| 4 | 暗色模式用 `filter: invert(1)` 一键反色 | 反相会翻转色相、破坏品牌识别、且纯白文字对比度过高 | 在 OKLCH 空间逐 Token 重新映射：背景取浅色模式反面 L，主色降饱和、提亮度 |
| 5 | 用 HSL 等距生成 blue-100 到 blue-900，蓝色档位在 L=20% 时已近黑 | HSL 的 L 是数学亮度，不是感知亮度，蓝色在低 L 时主观亮度衰减极快 | 改用 OKLCH 构建色阶，并在构建后用 WebAIM Contrast Checker 抽查相邻档位亮度差 |

---

## 本章验收

1. **色空间辨析**：给你同一颜色的 HSL `hsl(220, 100%, 50%)` 与 OKLCH `oklch(54% 0.20 264)`，请说明二者在感知均匀性上的根本差异，并解释为何 blue-900 在 HSL 与 OKLCH 中的视觉亮度不同。
2. **对比度计算**：白底背景 `#FFFFFF` 上使用 `#52565C` 正文，请计算对比度并判断是否满足 WCAG 2.2 AA。改用 `#8A8D93` 重新计算并给出判断。
3. **暗色模式推导**：浅色模式主按钮背景为 `oklch(52% 0.20 250)`，请写出暗色模式对应的色值（要求：暗色背景 `oklch(12%)` 上主按钮对比度 ≥ 4.5:1，且按钮不出现荧光感）。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://www.w3.org/TR/WCAG22/ | 2026-09-20 | Web Content Accessibility Guidelines (WCAG) 2.2 |
| [S2] | L0 | https://www.w3.org/TR/css-color-4/ | 2026-09-20 | CSS Color Module Level 4 |
| [S3] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch | 2026-09-20 | MDN: oklch() — MDN Web Docs |
| [S4] | L0 | https://m3.material.io/styles/color/ | 2026-09-20 | Material Design 3 — Color system |
| [S5] | L0 | https://developer.apple.com/design/human-interface-guidelines/dark-mode | 2026-09-20 | Apple Human Interface Guidelines — Dark Mode |
| [S6] | L2 | https://www.myndex.com/APCA/ | 2026-09-20 | APCA — Accessible Perceptual Contrast Algorithm |
| [S7] | L4 | https://refactoringui.com/ | 2026-09-20 | Refactoring UI — Actionable UI design tips (Adam Wathan & Steve Schoger) |
| [S8] | L2 | https://webaim.org/resources/contrastchecker/ | 2026-09-20 | WebAIM Contrast Checker |