---
title: 网格与布局：8pt 模数、断点与响应式工程
description: 12 栏网格与 8pt 间距系统、断点设计（320/768/1024/1280/1536）、流式 vs 固定、Container queries、CSS Grid 与 Flexbox 取舍、SaaS 三栏布局实战。
---

# 网格与布局：8pt 模数、断点与响应式工程

> 取用日期：2026-09-20；来源层级：L0（w3.org、developer.mozilla.org、material.io）、L4（Refactoring UI）。
> 核心信源：MDN CSS Grid [S1]、MDN Flexbox [S2]、MDN Container Queries [S3]、Material Design Layout [S4]、Bootstrap 5 Breakpoints [S5]、Apple HIG Layout [S6]、Refactoring UI [S7]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 解释 12 栏网格的工程起源与"为何不是 16、不是 10"，并给出一个标准 12 栏系统的 gutter / margin 数值。
- 输出一套断点表（mobile / tablet / desktop / wide）并对应 Tailwind / CSS 媒体查询两种实现。
- 用 CSS Grid 与 Flexbox 分别实现同一个卡片列表，解释二者的取舍点。
- 用 Container Queries（`@container`）实现一个"组件级响应式"案例（不依赖视口宽度）。
- 用 8pt 模数设计一个 SaaS 控制台三栏布局（侧栏 + 主内容 + 详情面板），并标注所有 padding / margin 都落在 4/8 倍数上。
- 在浏览器 DevTools 中切换视口宽度，验证布局在每个断点都不破版。

---

## 一、12 栏网格的工程起源

### 1. 为什么是 12

Bootstrap、Material Design、Tailwind UI 的默认网格系统都选了 12 栏——因为 12 是**最小可被 2、3、4、6 整除的偶数** [S5]：

| 划分 | 栏数组合 |
|---|---|
| 整版 | 12 |
| 二等分 | 6 + 6 |
| 三等分 | 4 + 4 + 4 |
| 四等分 | 3 + 3 + 3 + 3 |
| 主+侧 | 8 + 4 |
| 侧+主+侧 | 3 + 6 + 3 |

10 栏也能做"侧+主"，但不能整除成 3 等分；16 栏太细，跨栏组合会失控。

### 2. 标准 12 栏系统参数

```css
:root {
  --grid-columns: 12;
  --grid-gutter: 16px;     /* 栏间距（推荐 16，复杂场景用 24） */
  --grid-margin: 24px;     /* 页面左右安全留白 */
  --grid-max-width: 1440px;
}
```

总宽度计算公式：

```
container-width = margin*2 + gutter*(columns-1) + column * columns
                = 24*2   + 16*(12-1)         + column*12
```

解得 column = (1440 - 48 - 176) / 12 ≈ 101.33px。

### 3. 用 CSS Grid 实现 12 栏

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter);
  padding-inline: var(--grid-margin);
  max-width: var(--grid-max-width);
  margin-inline: auto;
}

/* 子元素跨栏 */
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-6  { grid-column: span 6; }
.col-8  { grid-column: span 8; }
.col-12 { grid-column: span 12; }
```

---

## 二、8pt 间距系统

### 1. 间距 token

所有 padding / margin / gap 必须是 4 或 8 的倍数。常见 token 表 [S4][S7]：

```css
:root {
  --space-1:  4px;   /* 紧凑：Badge 内边距、图标与文字间距 */
  --space-2:  8px;   /* 紧密关联：按钮内边距 */
  --space-3: 12px;
  --space-4: 16px;   /* 基础：表单项、卡片内边距 */
  --space-5: 20px;
  --space-6: 24px;   /* 模块内间距 */
  --space-8: 32px;   /* 模块间间距 */
  --space-10: 40px;
  --space-12: 48px;  /* Section 大区块 */
  --space-16: 64px;  /* 页面级呼吸感 */
}
```

### 2. 亲密性映射

间距不仅是装饰，它表达**逻辑分组**。CRAP 中的 Proximity 原则在 CSS 中的工程映射 [S7]：

```
元素内部间距  < 同组元素间距  < 不同组元素间距

例子：表单字段
  label (内部 4px) input (内部 4px)
  field-1 ↔ field-2 之间 16px（紧密关联的相邻表单项）
  表单 ↔ 提交按钮 24px（不同模块）
```

```css
.form-field { margin-bottom: 16px; }      /* 紧密相邻字段 */
.form-field label { margin-bottom: 4px; } /* label 紧贴 input */
.form-actions { margin-top: 24px; }       /* 按钮区独立模块 */
```

### 3. 4pt vs 8pt 的选择

- **8pt 网格**：主流（Material Design、Tailwind UI 早期默认）[S4]。粗犷、整齐，适合桌面应用。
- **4pt 网格**：更精细（Apple HIG 推荐 4pt 基线，部分设计系统使用）[S6]。允许 4 / 8 / 12 / 16 全部倍数，适合密集数据界面。
- **建议**：从 8pt 起步，遇到密集场景再增加 4pt 这一档（不要反过来）。

---

## 三、断点设计

### 1. 工程断点 vs 设备断点

错误做法：按设备命名（iPhone、iPad、MacBook）。这些名字会随设备更新而过时。

正确做法：按**视口宽度区间**命名。工程基线如下：

| 名称 | 区间 | 典型设备 |
|---|---|---|
| mobile | 320 – 767 px | iPhone SE、小屏安卓 |
| tablet | 768 – 1023 px | iPad mini / Air、9 寸平板 |
| laptop | 1024 – 1279 px | 13 寸笔记本 |
| desktop | 1280 – 1535 px | 主流显示器 |
| wide | ≥ 1536 px | 大屏显示器、4K |

### 2. CSS 媒体查询实现

```css
/* 默认：移动优先（mobile-first） */
.grid-12 { grid-template-columns: repeat(4, 1fr); }

/* tablet：768 起 */
@media (min-width: 768px) {
  .grid-12 { grid-template-columns: repeat(8, 1fr); }
}

/* desktop：1024 起 */
@media (min-width: 1024px) {
  .grid-12 { grid-template-columns: repeat(12, 1fr); }
}
```

### 3. Tailwind 断点

Tailwind 默认提供 5 个断点 [S5]，与上表几乎一致：

| 断点 | 最小宽度 | CSS 前缀 |
|---|---|---|
| (默认) | 0 | — |
| sm | 640 px | `sm:` |
| md | 768 px | `md:` |
| lg | 1024 px | `lg:` |
| xl | 1280 px | `xl:` |
| 2xl | 1536 px | `2xl:` |

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div class="bg-white p-4 rounded">卡片 1</div>
  <div class="bg-white p-4 rounded">卡片 2</div>
  <div class="bg-white p-4 rounded">卡片 3</div>
  <div class="bg-white p-4 rounded">卡片 4</div>
</div>
```

### 4. 断点之间的"塌陷区"

常见错误：只设计断点处的样式，忽略断点之间（768–1023 这一整段）。正确做法是写**区间样式**而非断点样式：

```css
/* ❌ 错误：只在断点处变化，中间区间是空的 */
@media (min-width: 768px) { .card { padding: 24px; } }

/* ✅ 正确：用 clamp() 写连续区间 */
.card { padding: clamp(12px, 2vw, 24px); }
```

---

## 四、流式 vs 固定宽度

### 1. 何时流式（fluid）

流式布局指容器宽度始终等于视口宽度（或父容器宽度），元素用 `max-width: 100%` 或 fr 单位适配。适合：

- 内容宽度不可预测（用户生成内容、表格）
- 移动端（视口窄，不浪费空间）

### 2. 何时固定（fixed）

固定布局指容器有 `max-width`，超宽屏上居中显示、两侧留白。适合：

- 阅读型页面（行宽受 CPL 约束，太宽影响阅读）
- 控制台、仪表盘（过宽导致眼睛左右扫视疲劳）

### 3. 工程混合方案

主流方案是 **container 固定 + 内部流式**：

```css
.app-container {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 48px);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}
```

---

## 五、Container Queries

### 1. 容器查询 vs 媒体查询

媒体查询看视口宽度，容器查询看**父容器宽度**。这是 2023 年后布局工程的最大变化 [S3]：

| 维度 | 媒体查询 | 容器查询 |
|---|---|---|
| 触发条件 | viewport width | container inline-size |
| 典型用途 | 整页布局（顶栏、侧栏） | 组件级响应式（卡片、表格） |
| 浏览器支持 | 全部 | Chrome 105+、Safari 16+、Firefox 110+（2026 年已全支持） |

### 2. 实战：自适应卡片

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 父容器 ≥ 400px 时改成横排 */
@container card (min-width: 400px) {
  .card { grid-template-columns: 200px 1fr; }
}
```

**工程意义**：同一个 `<Card>` 组件，放在侧栏（窄）和主区（宽）里会自动调整布局，不依赖全局视口。这让"组件库真正可移植"。

### 3. container-name 与短路

当页面有多个 container 时，必须显式命名才能精准查询：

```css
@container sidebar (min-width: 300px) { ... }
@container main (min-width: 600px) { ... }
```

---

## 六、CSS Grid vs Flexbox 取舍

### 1. 一句话判断

- **Flexbox**：一维布局，行**或**列。
- **CSS Grid**：二维布局，行**和**列。

### 2. 典型场景对照

| 场景 | 推荐 | 原因 |
|---|---|---|
| 导航栏（横排图标） | Flexbox | 单维行布局 |
| 卡片网格 | Grid | 多行多列二维 |
| 表单字段（label + input 横排） | Grid | 二维精确对齐 |
| 按钮组（横排） | Flexbox | 一维 |
| 仪表盘多区块 | Grid | 二维 |
| 居中单个元素 | Flexbox | `place-items: center` |
| 复杂的非对称布局 | Grid | `grid-area` 命名 |

### 3. 混用范式

**Grid 做整体骨架，Flexbox 做组件内部**：

```css
/* 整体：Grid 二维 */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  gap: var(--space-4);
}

/* 侧栏内部：Flexbox 一维 */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
```

---

## 七、实战：SaaS 三栏布局

### 1. 场景

一个团队协作 SaaS 控制台：左侧导航（240px 固定）、中间任务列表（流式）、右侧任务详情面板（320px 固定）。

### 2. 完整 CSS

```css
:root {
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --grid-gutter: 16px;
}

.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  gap: var(--grid-gutter);
  min-height: 100vh;
  padding: var(--space-4);
}

/* 中间任务列表：流式卡片网格 */
.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.task-card {
  container-type: inline-size;
  padding: var(--space-4);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

/* 卡片宽时横排，窄时竖排 */
@container (min-width: 320px) {
  .task-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-4);
  }
}

/* 移动端：三栏塌为单栏 */
@media (max-width: 1023px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
  .sidebar, .detail-panel { display: none; }
}

/* 平板：两栏（侧栏 + 主区） */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-shell {
    grid-template-columns: 200px 1fr;
  }
}
```

### 3. 走查清单

| 检查项 | 通过判定 |
|---|---|
| 移动端（<768）三栏全部塌为单栏 | ✅ 侧栏与详情面板隐藏 |
| 平板（768–1023）变成两栏 | ✅ 侧栏 200px + 主区 |
| 桌面（≥1024）完整三栏 | ✅ 240 + 1fr + 320 |
| 所有间距为 4 或 8 倍数 | ✅ `--space-2/4/6` |
| 卡片窄时竖排、宽时横排 | ✅ container query 触发 |
| 横屏 / 竖屏切换不破版 | ✅ grid 自适应 |

---

## 真实任务

### 任务一：为一个 SaaS 三栏控制台设计完整响应式布局

为虚构的"项目看板 SaaS"产品设计三栏布局（导航 + 内容 + 详情），输出 HTML + CSS：

1. 严格使用 8pt 间距系统，所有 padding / margin 落在 4 或 8 倍数上。
2. 用 CSS Grid 实现整体骨架，断点为 768 / 1024 / 1280 / 1536。
3. 中间内容区使用 `auto-fit + minmax` 实现自适应卡片网格。
4. 卡片内部用 container query 实现"窄竖排 / 宽横排"。
5. 用 Chrome DevTools 切换视口宽度，分别截图 375 / 768 / 1280 / 1920 四档验证。
6. 输出 1 段 100 字以内的走查结论（说明哪几个断点有视觉问题、如何修复）。

### 任务二：审计现有项目的间距合规性

1. 用 DevTools "Computed" 面板扫描页面所有 padding / margin / gap 值。
2. 把所有非 4/8 倍数的值列成表格（元素 / 当前值 / 应改为 / 根因）。
3. 修复后用 grep / lwc 等工具验证 0 个违规。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 卡片用 `width: 320px` 硬编码，移动端横向溢出 | 把固定像素当响应式使用，未切换到 fr / % / clamp() | 改用 `minmax(280px, 1fr)` 或 `width: clamp(280px, 90vw, 320px)` |
| 2 | 桌面布局直接缩到移动端字号变小但栏数不变，结果内容被压扁 | 没有"重排"概念，只是简单缩放 | 每个断点都重新设计布局：桌面 3 栏 → 平板 2 栏 → 移动 1 栏 |
| 3 | 页面到处是 `gap: 13px`、`padding: 7px`，间距系统完全崩塌 | 未建立 8pt 间距 token，凭手感写值 | 在 :root 定义 `--space-1..16` token，全局禁用任意值 |
| 4 | padding / margin 不在 8pt 模数上：卡片内 padding 18px、按钮 padding 10px 14px | 设计师用 Sketch 任意拖拽，未对齐 8pt 网格 | 用 Figma / Sketch 的 8pt baseline grid；CI 用 stylelint-declaration-strict-value 强制 spacing token |
| 5 | 没有断点 fallback：只在桌面端设计，移动端打开就是横向滚动条 | 只考虑了"主流视口"，未走查边界宽度（如 600–768 之间） | 移动优先 + 用 clamp() 写连续区间；在 320、375、414、768、1024、1280、1536 全部验证 |

---

## 本章验收

1. **断点判断**：用户报告"我的页面在 800px 宽度下破版"，请列出排查步骤（从 CSS 媒体查询、container width、浏览器 DevTools、flex/grid 行为四个维度）。
2. **Grid vs Flexbox**：让你实现一个"3 列等宽卡片网格 + 每张卡片内头像在左、用户名在右"，请说明哪部分用 Grid、哪部分用 Flexbox，并解释为什么不能全程用同一种。
3. **8pt 合规审计**：给你的代码片段 `padding: 13px; margin: 18px 7px; gap: 12px;`，请列出所有不合规值及替换方案（要求替换值都在 4 或 8 倍数上）。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout | 2026-09-20 | MDN: CSS Grid Layout — MDN Web Docs |
| [S2] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout | 2026-09-20 | MDN: CSS Flexible Box Layout — MDN Web Docs |
| [S3] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries | 2026-09-20 | MDN: CSS Container Queries — MDN Web Docs |
| [S4] | L0 | https://m3.material.io/layout/responsive/layout-baseline | 2026-09-20 | Material Design 3 — Responsive layout |
| [S5] | L0 | https://getbootstrap.com/docs/5.3/layout/breakpoints/ | 2026-09-20 | Bootstrap 5 — Breakpoints |
| [S6] | L0 | https://developer.apple.com/design/human-interface-guidelines/layout | 2026-09-20 | Apple Human Interface Guidelines — Layout |
| [S7] | L4 | https://refactoringui.com/ | 2026-09-20 | Refactoring UI — Actionable UI design tips (Adam Wathan & Steve Schoger) |