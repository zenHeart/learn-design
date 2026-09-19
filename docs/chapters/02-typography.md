---
title: 字体排印：层级、节奏与中西文协同
description: 字体分类与回退顺序、Type Scale 数学比例、行高与行长（CPL）的感知原理、字重阶梯与字距、中文排版 clreq 与中英文字体分层实战。
---

# 字体排印：层级、节奏与中西文协同

> 取用日期：2026-09-20；来源层级：L0（w3.org、w3c.github.io、Apple HIG、Google Fonts）、L4（Refactoring UI、Thinking with Type）。
> 核心信源：W3C 中文排版需求 clreq [S1]、MDN font-family [S2]、Apple HIG Typography [S3]、Material Design Typography [S4]、Refactoring UI [S5]、Google Fonts Knowledge [S6]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 区分衬线、无衬线、等宽、中文四类字体的适用场景，并给出三套字体栈（英文 UI、英文阅读、中文 UI）。
- 按 Major Third (1.25)、Perfect Fourth (1.333)、Perfect Fifth (1.5) 三种模数生成 Type Scale，并解释为何不推荐"自由选字号"。
- 给一段正文选择合理的 line-height（中文 1.5–1.8、英文 1.4–1.6）和 max-width（CPL 60–75 字符），并解释其与阅读效率的关系。
- 输出一套 5 档字重阶梯（300/400/500/600/700），并在浏览器中验证每一档的实际可见差异。
- 处理中英文混排场景，正确声明中英文字体分层与 letter-spacing。
- 在 Chrome DevTools 中检查并修复一个真实页面的字体阶梯、断字、标点挤压问题。

---

## 一、字体分类与工程角色

### 1. 衬线（Serif）

笔画末端有装饰性"衬角"，传统上用于长文阅读（书籍、报纸）。在屏幕上，衬线字在小字号下容易产生噪点，因此 UI 正文通常不推荐 [S3]。但衬线字在**标题、大字号、营销文案**中能传达权威、传统、人文气质。

推荐英文字体：Playfair Display、Source Serif、IBM Plex Serif。
中文字体：思源宋体（Source Han Serif）、宋体（SimSun）。

### 2. 无衬线（Sans-serif）

笔画粗细均匀、无装饰，现代 UI 的默认选择。在小字号下清晰度更高，更适合屏幕阅读 [S3][S4]。

推荐英文字体：Inter、IBM Plex Sans、SF Pro、Helvetica Neue。
中文字体：思源黑体（Source Han Sans / Noto Sans CJK）、苹方（PingFang SC）。

### 3. 等宽（Monospace）

每个字符占据相同水平空间，用于代码、数据表格、坐标轴数字。**不要把等宽字体用于正文**——它在英文中的字符密度比正文低 10%–15%，会让段落显得空洞。

推荐英文字体：JetBrains Mono、IBM Plex Mono、SF Mono。
中文字体：思源等宽（Source Han Mono）、Sarasa Mono SC。

### 4. 中文（Han）

中文是方块字，没有衬线/无衬线的传统区分，但有"黑体"（粗细均匀）与"宋体"（横细竖粗带衬角）的分类。**中文网页正文几乎一律用黑体（无衬线类）**，宋体多用于文学站点或品牌调性需要"人文气质"的标题。

### 5. 字体角色分配表

| 角色 | 推荐字体（英文） | 推荐字体（中文） | 字号区间 |
|---|---|---|---|
| Display / H1 | Playfair Display / Inter Bold | 思源宋体 Heavy / 苹方 Bold | 32–48 px |
| Heading / H2-H4 | Inter SemiBold | 苹方 Medium / 思源黑体 Medium | 18–28 px |
| Body 正文 | Inter Regular | 苹方 Regular / 思源黑体 Regular | 14–16 px |
| Caption / 注释 | Inter Regular | 苹方 Regular | 12–13 px |
| Code / 数字 | JetBrains Mono | 思源等宽 Regular | 与正文同长度 |

---

## 二、字体栈（font-family stack）

### 1. 英文优先 + 中文回退

CSS `font-family` 解析按列表顺序回退。**必须先列英文字体，再列中文字体**，否则英文字符可能被中文字体按汉字字形绘制（许多中文字体对拉丁字母做了补充设计但风格不统一） [S2]：

```css
:root {
  --font-sans: 'Inter', 'PingFang SC', 'Hiragino Sans GB',
               'Microsoft YaHei', 'Source Han Sans CN', sans-serif;

  --font-serif: 'Source Serif Pro', 'Source Han Serif SC',
                'Songti SC', 'SimSun', serif;

  --font-mono: 'JetBrains Mono', 'SF Mono', 'Menlo',
               'Sarasa Mono SC', monospace;
}
```

### 2. 系统字体的回退策略

如果产品需要"零下载、即开即用"，可走系统字体栈 [S3]：

```css
--font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI',
               'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
               sans-serif;
```

`-apple-system` 在 macOS/iOS 上指向 SF Pro；`BlinkMacSystemFont` 在 Chrome 上指向系统 UI 字体；`Segoe UI` 是 Windows 默认。这样用户首屏渲染不需要等待字体下载完成。

### 3. 字体加载性能

字文件是性能重灾区。WOFF2 + subset + preload 是当前基线 [S6]：

```html
<link rel="preload" href="/fonts/Inter-Subset.woff2"
      as="font" type="font/woff2" crossorigin />
```

CSS 中用 `font-display: swap` 防止文字在字体加载期间消失（FOIT）：

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Subset.woff2') format('woff2');
  font-display: swap; /* 立即用 fallback 显示，加载完成后切换 */
}
```

---

## 三、Type Scale：字阶的数学比例

### 1. 模数制（Modular Scale）

页面上所有字号必须从一个**基础字号（base）** 按固定比例放大缩小，禁止自由取值 [S5]：

| 模数名称 | 比例 | 适用场景 |
|---|---|---|
| Minor Second | 1.067 | 密集 UI、数据表格 |
| Major Second | 1.125 | 文档站点 |
| Major Third | 1.250 | **最常用的 UI 模数** |
| Perfect Fourth | 1.333 | 营销页、阅读应用 |
| Perfect Fifth | 1.500 | 杂志式排版 |

### 2. 以 16px 为基数的 1.25 模数

```css
:root {
  --text-xs:   0.64rem;   /* 10.24px  —— 极小注释、版权 */
  --text-sm:   0.8rem;    /* 12.8px   —— Caption */
  --text-base: 1rem;      /* 16px     —— 正文 */
  --text-md:   1.25rem;   /* 20px     —— 小标题 H4 */
  --text-lg:   1.563rem;  /* 25px     —— H3 */
  --text-xl:   1.953rem;  /* 31.25px  —— H2 */
  --text-2xl:  2.441rem;  /* 39.06px  —— H1 */
  --text-3xl:  3.052rem;  /* 48.83px  —— Display */
}
```

### 3. 为何禁止"自由选字号"

工程经验：在 review 中看到 13px、15px、17px、19px 这种"自由字号"的页面，几乎一定存在可读性问题——字号差小到肉眼难辨，但又不足以让用户看出层次。Type Scale 的工程意义是**让所有字号间距都有固定数学关系**，肉眼一眼就能感知层级。

### 4. rem vs px

- **px**：固定像素，最直观但缺乏可访问性——浏览器文本缩放对 px 无效。
- **rem**：相对于根字号，浏览器"放大文字"时整页同步放大，符合 WCAG 1.4.4（Resize text）[S7]。
- **建议**：用 rem 定义字号，用 px 定义 border、shadow 等装饰属性。

---

## 四、行高与行长

### 1. 行高（line-height）

行高是行与行之间的垂直距离，决定阅读节奏 [S1][S4]：

| 场景 | 推荐 line-height |
|---|---|
| 中文正文 | 1.5 – 1.8 |
| 英文正文 | 1.4 – 1.6 |
| 大标题（H1+） | 1.1 – 1.3 |
| UI 控件（按钮、标签） | 1.2 – 1.4（按容器高度微调） |
| Caption / 注释 | 1.3 – 1.5 |

中文行高比英文大，是因为方块字占据更多视觉面积，需要更多"呼吸"。W3C 中文排版需求（clreq）建议正文行高不小于 1.5 [S1]。

### 2. 行长（CPL / Measure）

每行字符数（CPL, Characters Per Line）直接影响阅读舒适度。**最优区间是 60–75 字符**（英文），中文 30–45 汉字 [S1][S5]：

```css
.article {
  max-width: 65ch;   /* ch = 0 字符宽度，CPL≈65 */
  font-size: 1rem;
  line-height: 1.6;
}
```

`ch` 单位表示"数字 0 的宽度"，是 CSS 专门为行长控制引入的单位。过长的行（>90 字符）会导致读者回行时丢失位置；过短的行（<40 字符）会让眼睛频繁回扫。

### 3. 中文排版的特殊处理

中文标点挤压（puntuation kerning）是中文排版的独特需求。W3C clreq 规定全角标点不应在行首出现（避头尾标点），且左右括号应与相邻汉字留出适当空隙 [S1]。现代浏览器通过 CSS 支持部分规则：

```css
:lang(zh) {
  /* 标点挤压：让相邻标点视觉上不挤 */
  hanging-punctuation: allow-end;
  /* 全角空格处理（部分浏览器支持） */
  text-spacing-trim: space-all;
}
```

CSS Text Module Level 4 还在草案中的 `text-spacing-trim` 属性，专门用于中日韩（CJK）文本的标点间距调整。截至 2026 年 9 月，仅 Chrome / Edge 完整支持 [S2]。

---

## 五、字重阶梯

### 1. 五档字重

现代 UI 字体通常提供 300/400/500/600/700 五档字重。每一档都有明确的工程语义 [S4]：

| 字重 | 名称 | 用途 |
|---|---|---|
| 300 | Light | **几乎不用**——细到小字号时模糊 |
| 400 | Regular | 正文、表单输入 |
| 500 | Medium | 强调的正文、表格行高亮 |
| 600 | Semibold | 小标题、按钮文字 |
| 700 | Bold | 大标题、关键数据 |

### 2. 验证字重可见性

不同字重之间的差异必须**肉眼可分辨**。验证方法：

1. 在 DevTools 里把同一段文字依次切换到 400 / 500 / 600，截图对比。
2. 如果 400 与 500 看不出差别——说明字体厂商的子版本字重差异不够，应选用提供更多中间字重的字体（如 Inter、IBM Plex Sans）。

### 3. 字重 ≠ 字号

层级建立的第一手段是**字重与灰度**，字号放大是辅助。错误示范：所有标题都用 32px，仅靠字号区分。正确做法是同一字号下用 600 区分主副标题 [S5]。

---

## 六、字距（letter-spacing）

### 1. 标题字距收紧

英文标题字号大时，相邻字符自然间隙变大，需要手动收紧字距 [S3]：

```css
h1 { letter-spacing: -0.02em; }   /* 大标题收紧 */
h2 { letter-spacing: -0.01em; }
body { letter-spacing: 0; }       /* 正文不调整 */
```

中文标题不调整字距——方块字间隙均匀，强行 letter-spacing 会破坏对齐。

### 2. 小字号微调

英文极小字号（<12px）字符容易粘连，可适度拉宽：

```css
.text-xs { letter-spacing: 0.02em; }
```

### 3. 中英文字距协同

中英文混排时，由于汉字与拉丁字母宽度差异，需要确保整体视觉对齐。常用做法是在中文 body 中为英文片段单独声明字体（已在字体栈中处理），并通过 `vertical-align` 微调基线：

```css
.article :lang(en) {
  font-family: var(--font-sans-en);
  vertical-align: baseline;
}
```

---

## 真实任务

### 任务一：为一篇 3000 字技术文章选择字体阶梯

选一篇你过去写过的中文长文（技术博客、PRD、会议纪要均可），按下列要求改造并截图对比：

1. 引入 1.25 模数 Type Scale，正文 16px，H1 31px。
2. body 设 `max-width: 65ch; line-height: 1.7`（中文场景）。
3. 字体栈使用"英文优先 + 中文回退"，英文字体选 Inter，中文回退 PingFang SC。
4. 标题 letter-spacing -0.01em，正文不动。
5. 在 Chrome DevTools Lighthouse 中跑无障碍审计，确保没有字体相关违规。

### 任务二：中英文混排的视觉对齐测试

把同一段中英混排文字（"HTTP 503 错误的常见原因是 Service Unavailable"）分别放在：

- 字体栈 A：纯中文（PingFang SC）
- 字体栈 B：英文优先 + 中文回退（Inter + PingFang SC）

截图对比两者中"HTTP 503"四个字符的视觉基线与字宽差异，输出 1 段结论（100 字以内）。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 表格列设到 `width: 1000px`，每行显示 90+ 字符，单行密度极高 | 未考虑阅读节奏，行长超过 90 字符后读者回行易丢失位置 | 引入 CPL 概念，表格正文单元格 `max-width: 65ch`；或按列宽优先级收缩字段 |
| 2 | 字体只下载 400 一档，标题用 `font-weight: 700` 浏览器自动加粗，结果变细糊 | 浏览器"合成粗体"在小字号下锯齿严重 | 引入 600/700 实际字重的字体子集；或改用 `font-variation-settings` 加载可变字体 |
| 3 | 中英文混排没分层，全用 PingFang SC 一把梭 | PingFang 对拉丁字母做了设计但风格与正文英文字体不一致，视觉割裂 | 字体栈改为英文优先 + 中文回退：Inter, "PingFang SC", sans-serif |
| 4 | 所有行高统一写死 `line-height: 1.5`，标题也 1.5 导致大标题上下空旷 | 未区分场景，标题应紧凑（1.1–1.3）正文应舒展（中文 1.5–1.8） | 按角色定义 line-height token：标题紧凑、正文舒展、控件适中 |
| 5 | 所有标题统一 32px，仅靠字号区分 H1/H2/H3 | 字号层次单调，且破坏字阶比例 | 用 1.25 模数生成字阶；H1 32px、H2 25px、H3 20px；层级靠字重+灰度辅助 |

---

## 本章验收

1. **模数选择**：你的项目正文 16px、H1 31px、H2 25px、H3 20px，请问字号比例是哪个模数？给出计算过程。
2. **行高判断**：一段英文正文（中文回退）字号 16px，请给出推荐 line-height 并说明为何不是固定 1.5。
3. **字重阶梯审查**：现有页面只引入了字重 400 的字体子集，但 CSS 里大量使用 600/700。你会如何用一句话诊断根因，并给出两种修复方案？

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://www.w3.org/TR/clreq/ | 2026-09-20 | W3C 中文排版需求 (Requirements for Chinese Text Layout) |
| [S2] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/font-family | 2026-09-20 | MDN: font-family — MDN Web Docs |
| [S3] | L0 | https://developer.apple.com/design/human-interface-guidelines/typography | 2026-09-20 | Apple Human Interface Guidelines — Typography |
| [S4] | L0 | https://m3.material.io/styles/typography/ | 2026-09-20 | Material Design 3 — Typography |
| [S5] | L4 | https://refactoringui.com/ | 2026-09-20 | Refactoring UI — Actionable UI design tips (Adam Wathan & Steve Schoger) |
| [S6] | L2 | https://fonts.google.com/knowledge | 2026-09-20 | Google Fonts — Knowledge |
| [S7] | L0 | https://www.w3.org/TR/WCAG22/ | 2026-09-20 | WCAG 2.2 — Resize text (1.4.4) |