---
title: 视觉层次：阅读路径、信息密度与焦点引导
description: 视觉层次四要素（大小/颜色/粗细/空间）与 CRAP 对齐落地、F/Z/Gutenberg 阅读模式适用边界、信息密度与留白取舍、主次三级层级与 CTA 焦点引导实战。
---

# 视觉层次：阅读路径、信息密度与焦点引导

> 取用日期：2026-09-20；来源层级：L0（w3.org、nngroup.com、developer.mozilla.org）、L2（Nielsen Norman Group 研究报告）、L4（Refactoring UI、《写给大家看的设计书》）。
> 核心信源：Nielsen Norman Group F-pattern 研究 [S1]、NN/g Z-pattern 与 Landing Page 研究 [S2]、Gutenberg Diagram 原始提出 [S3]、Refactoring UI [S4]、《写给大家看的设计书》CRAP [S5]、WCAG 2.2 非文本对比度 [S6]、MDN Visual Hierarchy 实践 [S7]、Interaction Design Foundation [S8]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 用大小、颜色、粗细、空间四要素描述同一界面的视觉层次，并解释每一要素如何独立或叠加地引导眼球。
- 区分 F-pattern、Z-pattern、Gutenberg diagram 三种阅读模式，给出各自最适用的内容类型，并指出 Z-pattern 在 2020 年后被多项 NN/g 研究质疑的边界条件。
- 为一段长文章设计三级文字层级（Primary / Secondary / Tertiary），并输出对应的字号、字重、灰度与行距组合。
- 用视觉重量（visual weight）评估一个界面区块的焦点强度，计算三个候选 CTA 的相对重量并选出最优。
- 解释"信息密度"与"留白"之间的取舍函数，并给出一篇产品文档的最优字符密度区间（单位：字符 / 平方英寸）。
- 在浏览器 DevTools 中对一个真实博客文章页做层次审计，修复所有"层次信号互相冲突"的反例。

---

## 一、视觉层次的四要素

视觉层次（Visual Hierarchy）是引导用户**按设计预期的先后顺序获取信息**的视觉组织体系 [S4][S7]。所有视觉层次信号最终都能归结到四个独立维度的组合——大小、颜色、粗细、空间。理解这四要素的独立贡献与叠加效应，是构建任何界面的基础。

### 1. 大小（Size）：第一信号

字号是工程师最容易调动的层次工具，但**应当作为最后手段而非第一手段** [S4]。在视觉层次建立过程中，字号大小主要承担"决定主标题与正文之间的根本性差异"，而不是层级内的精细区分。

```css
:root {
  /* 主标题（H1 / 页面 Title）—— 32px，是正文 2 倍 */
  --text-display: 2rem;       /* 32px */
  /* 二级标题（H2 / Section Heading）—— 24px */
  --text-heading: 1.5rem;     /* 24px */
  /* 三级标题（H3 / Subsection）—— 20px */
  --text-subheading: 1.25rem; /* 20px */
  /* 正文 —— 16px */
  --text-body: 1rem;          /* 16px */
  /* 注释 —— 14px */
  --text-caption: 0.875rem;   /* 14px */
}
```

### 2. 颜色与灰度（Color & Value）：第二信号

90% 的页面不需要彩色来传达层级。三档文本灰阶足以建立完美的视觉深度 [S4]：

| 层级 | 推荐色值（浅色模式） | 视觉重量 | 适用场景 |
|---|---|---|---|
| Primary | `#1A1C1E` (depth 100%) | 最重 | 标题、关键 KPI、主要按钮文字 |
| Body | `#52565C` (depth 70%) | 中等 | 段落、表格内容、表单输入 |
| Muted | `#8A8D93` (depth 50%) | 最轻 | 时间戳、占位、辅助元数据 |

颜色的角色不仅是灰度，还包括**饱和度控制**。一个全饱和的品牌色按钮和灰色文字按钮，主观视觉重量完全不同——饱和度越高，视觉重量越大。

### 3. 粗细（Weight）：第三信号

字重阶梯独立于字号存在。同字号下，用字重区分主副标题，是远比"放大字号"更克制的层级建立手段 [S4]：

```css
.text-strong  { font-weight: 700; } /* 大标题 */
.text-medium  { font-weight: 600; } /* 小标题、按钮 */
.text-regular { font-weight: 400; } /* 正文 */
.text-light   { font-weight: 300; } /* 几乎不用 */
```

工程经验：字号差小于 1.25 倍时，肉眼难辨；但字重差 200 单位（400→600）在同字号下视觉差异极为明显。**层级应当先用字重与灰度表达，字号只承担最后一档粗粒度区分**。

### 4. 空间（Space）：第四信号也是最强信号

空间（间距与留白）在视觉层次中的权重常常被低估。**一个元素周围的留白越少，它在版面上的视觉重量越大** [S4][S5]：

- **亲密性（Proximity）**：相关元素靠拢（间距 8px），无关元素分离（间距 32px+）。
- **隔离（Isolation）**：把单一元素用大量留白包围，让它成为视觉焦点——这是 Apple 官网产品图的经典手法。
- **节奏（Rhythm）**：垂直方向上模块之间的留白形成"呼吸节奏"，长文阅读疲劳度直接受此影响。

格式塔亲密性法则的几何推论 [S5]：

$$\text{子元素内部间距} < \text{同组相邻元素间距} < \text{不同组之间的间距}$$

### 5. 四要素的叠加与冲突

四个维度可以独立运作，但**维度之间会互相放大或互相抵消**：

| 组合 | 视觉层次强度 | 典型场景 |
|---|---|---|
| 大 + 粗 + 深灰 + 多留白 | 极强 | 营销页主标题 |
| 中 + 粗 + 深灰 + 正常留白 | 强 | 文章 H2 标题 |
| 中 + 粗 + 深灰 + 极小留白 | 中 | 卡片标题 |
| 小 + 细 + 浅灰 + 少留白 | 弱 | 辅助元数据 |

当四个维度**互相冲突**时（如"小字 + 加粗 + 深灰 + 多留白"），用户会感到视觉困惑——这是页面层次崩坏的常见起点。

---

## 二、CRAP 四原则中的 Contrast 与 Alignment

Robin Williams 在《写给大家看的设计书》中提炼的 CRAP 四原则——Contrast（对比）、Repetition（重复）、Alignment（对齐）、Proximity（亲密性）——是界面层次评审的四把硬标尺 [S5]。其中 **Contrast 与 Alignment** 直接决定了视觉层次的强度与秩序。

### 1. Contrast（对比）：强弱分明

**如果两个元素不同，就让它们截然不同** [S5]。

- 反模式：主按钮 `#3B82F6`，次按钮 `#60A5FA`（同色相、仅明度差 5%，用户分不清谁是主操作）。
- 正确做法：主操作 = 高反差实心按钮（Solid）；次操作 = 描边按钮（Outlined）或文字按钮（Ghost / Text）。

WCAG 2.2 进一步给出非文本组件的对比度硬指标：图标边界、输入框边框、焦点指示器必须满足 **3:1** [S6]。

### 2. Alignment（对齐）：消灭像素孤岛

每一个元素都必须与页面中其他元素有一条看不见的对齐线 [S5]：

- 文本与表单左对齐。
- 数字表格内容一律**右对齐**（便于小数点纵向比对）。
- 操作列居中或右对齐。
- **避免文字居中排版**——居中只适用于简短的 Slogan 或空状态插图标题；超过 3 行的文本居中会导致左边缘凹凸不平，视线回扫成本陡增。

左对齐的工程优势：用户的左眼在垂直扫描时能锁定稳定的左侧基线，回行时无需重新寻找起点。

---

## 三、阅读模式：F、Z、Gutenberg 及其适用边界

不同内容类型有不同的最优阅读路径。理解这些路径的适用条件，远比"默认选一个"更工程化。

### 1. F-pattern：搜索型文本

Nielsen Norman Group 2006 年通过眼动实验发现：在**文字密集、以信息查找为目的**的页面（如搜索结果页、新闻列表、FAQ 页面）上，用户视线呈"F 形"分布 [S1]：

1. 首先沿页面顶部从左到右横扫（顶部横线）。
2. 然后视线稍微下移，沿左侧从左到右较短地扫描（次级横线）。
3. 最后视线沿页面左侧垂直向下扫描（左竖线）。

工程含义：

- **左侧首词承载最高权重**——段落首句必须包含关键信息点。
- **小标题、列表、关键词必须放在段落最左端**，避免被埋在右侧。
- **避免在大段无视觉锚点的纯文本中放关键 CTA**——用户的视线到不了那里。

### 2. Z-pattern：着陆页与极简内容

Z-pattern 来自 Roger Dooley 在 *Brainfluence* 中的提炼，更适合**内容稀疏、视觉线索明确**的着陆页（Landing Page） [S2]。视线轨迹：左上 → 右上 → 左下 → 右下，呈 Z 字形。

适用条件：
- 单一明确的视觉焦点（如产品图）。
- 内容极少（标题 + 副标题 + CTA + 一张图）。
- 干扰元素少（无侧栏、无次级导航）。

NN/g 在 2020 年后多次指出：**Z-pattern 在内容超过两个视觉区块时就失效**——视线会从 Z 字切换回 F 字或其他路径 [S2]。把 Z-pattern 当成万能公式是常见误用。

### 3. Gutenberg diagram：均匀内容流

Gutenberg diagram 由 Edmund Arnold 提出，把页面分为四个象限（左上 = 主光学区 / 右上 = 强闲置区 / 左下 = 弱闲置区 / 右下 = 终端区）[S3]：

- 用户自然视线从左上扫到右下（对角线流）。
- **左上角是阅读起点**，放置 Logo 与主导航。
- **右下角是行动终点**，放置 CTA 与价格信息。
- 左下、右上是"弱视觉区"，适合放置辅助内容。

适用条件：报纸式均匀内容流（如博客列表、文档目录）。**不适用于任何有强视觉焦点的页面**——焦点元素会立即打破 Gutenberg 的均匀流假设。

### 4. 三种模式对照

| 模式 | 内容密度 | 主要焦点 | 典型页面 | 误用风险 |
|---|---|---|---|---|
| F-pattern | 高 | 文字 + 信息查找 | 搜索结果、新闻列表、FAQ | 把广告条放在段落中间，期待被看到 |
| Z-pattern | 低 | 单一焦点 + CTA | 营销着陆页、产品发布页 | 内容超过 2 块后视线会切换 |
| Gutenberg | 中 | 无强焦点 | 博客列表、文档目录 | 强行套用到模态框、卡片列表 |

工程实战：选模式前先回答两个问题——**这个页面用户是来"找"还是来"看"？内容是否稀疏？** "找" + 高密度 → F-pattern；"看" + 极稀疏 → Z-pattern；均匀内容流 → Gutenberg。

---

## 四、信息密度与留白

### 1. 信息密度的工程定义

信息密度（Information Density）指单位面积承载的可读信息量。Nielsen Norman Group 给出的常见工程值 [S2]：

| 内容类型 | 推荐字符密度（字符 / 平方英寸） |
|---|---|
| 营销着陆页 | 50 – 100 |
| 产品文档 | 150 – 250 |
| 数据密集仪表盘 | 300 – 500 |
| 长文阅读 | 60 – 100 |

### 2. 密度的代价曲线

信息密度与阅读效率不是线性关系：

- **密度过低（< 50）**：用户需要频繁翻页、视线跳跃成本高，每屏认知收益小。
- **密度适中（150 – 250）**：阅读效率峰值区。
- **密度过高（> 500）**：扫读难度陡增，关键信息被淹没，"全部都重要"等价于"全部都不重要"。

### 3. 留白不是浪费

留白（Negative Space / White Space）的工程意义 [S4][S8]：

- **降低认知负荷**：眼睛处理空白区域不需要消耗工作记忆。
- **建立焦点隔离**：单一元素被大量留白包围时，自动成为视觉中心。
- **传达品牌气质**：高留白 = 高端、克制、慢节奏；低留白 = 高效、密集、工具感。

Apple 官网的产品图是"极致留白建立单一焦点"的范本：单一产品被 80% 以上的留白包围，留白本身就是品牌语言。

### 4. 密度 vs 留白的决策函数

工程实践中的取舍规则：

1. **目标用户任务决定起点**：完成型任务（订机票、写代码）需要高密度；浏览型任务（看新闻、读博客）可以高留白。
2. **先满足 WCAG 触控目标与对比度硬指标**，再谈密度优化。
3. **A/B 测试是密度决策的唯一可靠裁判**——主观感觉与真实扫读行为常常相反。

---

## 五、主次层级：Primary / Secondary / Tertiary

界面元素按视觉重要性应归入三个层级。层级的核心价值是**让用户在 3 秒内分辨"先做什么、其次做什么、可以忽略什么"** [S4]。

### 1. 三级层级的工程定义

| 层级 | 视觉重量 | 字号 | 字重 | 颜色 | 用途 |
|---|---|---|---|---|---|
| **Primary（主）** | 最重 | 32 – 48px | 600 – 700 | `--text-primary` | 页面大标题、关键 KPI |
| **Secondary（次）** | 中等 | 18 – 24px | 500 – 600 | `--text-body` 或主色 | 二级标题、CTA 按钮 |
| **Tertiary（辅）** | 最轻 | 14 – 16px | 400 | `--text-muted` | 注释、辅助链接、元数据 |

### 2. 一屏只允许一个 Primary

**单一页面只能有一个 Primary 视觉焦点** [S4]。如果同时有两个"最重要"元素——比如页面顶端一个超大标题，正中间又有一个超大主按钮——用户会在 0.5 秒内反复犹豫，扫读效率骤降。

反模式：一个 Dashboard 顶部有四个统计卡片，每张卡片都是 48px 数字、同样的颜色、同样的字重。"四个一样重要"等于"四个都不重要"。

### 3. 实战：为博客文章页设计三级层次

```html
<article class="post">
  <header class="post-header">
    <!-- Primary：页面唯一焦点 -->
    <h1 class="post-title">理解视觉层次：四要素工程实战</h1>

    <!-- Tertiary：辅助元数据，与 Primary 拉开灰度与字重差 -->
    <div class="post-meta">
      <span>2026-09-20</span> · <span>作者：张三</span> · <span>15 分钟阅读</span>
    </div>
  </header>

  <section class="post-body">
    <!-- Secondary：章节标题 -->
    <h2>一、视觉层次的四要素</h2>

    <p>正文段落，16px / 400 / #52565C / line-height 1.7 ...</p>

    <h3>1.1 大小：第一信号</h3>

    <p>...</p>
  </section>

  <aside class="post-aside">
    <!-- Secondary：相关阅读 -->
    <h2>相关阅读</h2>
    <ul>
      <li><a href="#">文章 A</a></li>
    </ul>
  </aside>
</article>
```

```css
:root {
  --text-primary: oklch(18% 0.005 250);
  --text-body:    oklch(40% 0.005 250);
  --text-muted:   oklch(60% 0.005 250);
}

.post-title {
  font-size: 2rem;       /* 32px — 唯一 Primary */
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 16px;
}

.post-meta {
  font-size: 0.875rem;   /* 14px — Tertiary */
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: 48px;   /* 用大间距把元数据与正文隔离 */
}

.post-body h2 {
  font-size: 1.5rem;     /* 24px — Secondary */
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 48px;
  margin-bottom: 16px;
}

.post-body h3 {
  font-size: 1.25rem;    /* 20px — 次 Secondary */
  font-weight: 600;
  color: var(--text-body);
  margin-top: 32px;
}

.post-body p {
  font-size: 1rem;       /* 16px */
  font-weight: 400;
  color: var(--text-body);
  line-height: 1.7;      /* 中文 1.7 */
  max-width: 65ch;
  margin-bottom: 24px;
}
```

---

## 六、焦点引导：视觉重量与 CTA 设计

### 1. 视觉重量的构成

视觉重量（Visual Weight）是把界面元素"称重"的工程化抽象。一个元素的视觉重量由四个独立变量决定 [S4]：

$$\text{Visual Weight} \approx f(\text{size}, \text{value\_contrast}, \text{color\_saturation}, \frac{1}{\text{isolation\_space}})$$

- **size**：元素占的像素面积。
- **value_contrast**：与背景的灰度差。
- **color_saturation**：色彩饱和度。
- **isolation_space**：元素周围留白（留白越多，重量越大，因为视线被强制聚焦）。

### 2. CTA 的视觉重量最大化

主操作按钮（Primary CTA）应当是页面中**视觉重量最大的元素**——用户扫到它时不需要思考"这是干什么的"。设计动作：

1. **大字号 + 高字重**：按钮文字 16px / 600。
2. **主品牌色背景 + 白文字**：与正文灰形成色相对比。
3. **充足留白**：按钮上下左右至少 24px 净空。
4. **孤立位置**：周围不放同色同尺寸的次按钮。

### 3. CTA 与正文的颜色冲突

最常见的反模式：主按钮用品牌色（蓝），正文中的链接也用品牌色（蓝）。用户无法区分"这是可以点的链接"与"这是主操作"。

正确做法：

| 元素 | 颜色 | 视觉重量 | 角色 |
|---|---|---|---|
| 正文链接 | 品牌色（蓝）+ 下划线 | 中 | 信息流中的可点击项 |
| 主 CTA 按钮 | 品牌色实心背景 + 白文字 | 高 | 页面唯一主操作 |
| 次 CTA 按钮 | 透明背景 + 品牌色边框 + 品牌色文字 | 中 | 与主 CTA 区分 |

通过"实心 vs 描边"和"背景填充实心 vs 文字色"的两个维度，把主次 CTA 分到不同视觉重量档。

### 4. 焦点引导的实战对照

```html
<!-- ❌ 反例：CTA 与正文链接同色，主按钮视觉重量不足 -->
<button class="btn-primary" style="background: #3B82F6; color: white;">
  立即注册
</button>
<p>已有账号？<a href="#" style="color: #3B82F6;">登录</a></p>

<!-- ✅ 正确：主 CTA 实心 + 高对比，次 CTA 描边 + 弱化 -->
<button class="btn-primary" style="
  background: #3B82F6; color: white;
  padding: 12px 24px; font-weight: 600;
">
  立即注册
</button>
<a href="#" class="btn-ghost" style="
  color: #52565C; text-decoration: underline;
">
  已有账号？登录
</a>
```

---

## 真实任务

### 任务一：为一篇 3000 字博客文章设计完整层次

选一篇你过去写过的中文长文（技术博客、PRD、会议纪要均可），按下列要求改造并截图对比：

1. 用四要素（大小 / 颜色 / 粗细 / 空间）建立 Primary / Secondary / Tertiary 三级层次。
2. 顶部 H1 用 32px / 700 / `#1A1C1E`，次级标题用 24px / 600，正文 16px / 400 / `#52565C`，辅助元数据 14px / 400 / `#8A8D93`。
3. 段落间距 24px，章节之间 48px，用留白代替分割线。
4. 正文 `max-width: 65ch; line-height: 1.7`。
5. 用 Chrome DevTools 的"Accessibility → Contrast"逐项验证对比度，把违规项修复到 ≥ 4.5:1。
6. 把改造前后截图提交评审，说明四要素如何独立或叠加地建立层次。

### 任务二：评估并优化一个落地页的 CTA 焦点

选一个你产品中的真实落地页（如注册页、活动页），按下列步骤审计：

1. 用视觉重量公式估算页面中三个候选 CTA 按钮的相对重量。
2. 检查是否有多个"视觉重量最大"元素并存——如果有，标注并提供修复方案。
3. 检查主 CTA 是否与正文链接色相同或灰度相近——如果相同，标注并提供分离方案。
4. 在主 CTA 周围至少留出 24px 净空，确保孤立感。
5. 输出 1 段结论（100 字以内）说明调整前后的焦点清晰度变化。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | Dashboard 顶部四个统计卡片，每张都是 48px 数字 + 同色 + 同字重，"四个一样重要"等于"四个都不重要" | 未建立 Primary / Secondary / Tertiary 三级层次，多个元素竞争焦点 | 选定一个数字为 Primary（最大字号 + 高字重），其余降为 Secondary 或 Tertiary；用灰度与字重而非字号区分 |
| 2 | 卡片标题用大字号 + 浅灰 + 阴影代替字重与灰度对比 | 把"层次建立"等同于"加阴影 / 加大字号"，阴影承担了字阶应承担的角色 | 阴影只用于表达 Z 轴海拔（Elevation），不用于层次；卡片标题用 16-20px / 600 / `--text-primary`，与正文拉开字重 + 灰度差 |
| 3 | 主按钮用品牌蓝，正文链接也用品牌蓝，用户分不清"主操作"与"链接" | 主 CTA 与正文链接色相同，视觉权重模糊 | 主 CTA = 实心填色 + 白字；正文链接 = 品牌色 + 下划线；通过"实心 vs 描边 + 下划线"分离 |
| 4 | 数据密集仪表盘也套用 Z-pattern，把统计卡片排成 Z 字轨迹 | Z-pattern 仅适用于稀疏、单焦点页面；2020 年后 NN/g 多项研究质疑其在多区块页面的通用性 | 内容超过两个视觉区块时改用 F-pattern（左侧对齐关键信息）；让视线自然沿左侧垂直流动 |
| 5 | 整页 padding / margin 全部 8px / 16px，相邻模块之间没有任何留白区分 | 把"留白"等同于"padding"，未用间距系统区分亲密性 | 建立 8pt 间距阶梯：模块内 16px、模块间 32px、章节间 48-64px；用间距而非分割线建立层级 |

---

## 本章验收

1. **阅读模式判断**：给你三个页面——(a) 搜索引擎结果页、(b) Apple iPhone 产品发布页、(c) 个人博客文章列表页。请为每个页面选择最合适的阅读模式（F / Z / Gutenberg），并解释为何不选其他两种。
2. **视觉重量评估**：一个页面有 A、B、C 三个按钮：A 是 16px 蓝色实心按钮（背景 `#3B82F6`，白字），周围留白 24px；B 是 14px 蓝色文字按钮（`#3B82F6`，无背景），周围留白 8px；C 是 12px 灰色文字按钮（`#8A8D93`，无背景），周围留白 4px。请估算三者视觉重量并指出哪个最适合做主 CTA。
3. **层次冲突识别**：一段正文段落里，标题用 14px / 700 / `#1A1C1E`，且与上方段落的间距只有 8px。这个层次有什么问题？请用四要素分析。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L2 | https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ | 2026-09-20 | F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Eyetracking Research) |
| [S2] | L2 | https://www.nngroup.com/articles/landing-pages/ | 2026-09-20 | The Z-Pattern for Landing Page Design (NN/g) |
| [S3] | L4 | https://www.edmundarnold.com/ | 2026-09-20 | Gutenberg Diagram: A Designer's Guide (Edmund Arnold, 1960s) |
| [S4] | L4 | https://refactoringui.com/ | 2026-09-20 | Refactoring UI — Actionable UI design tips (Adam Wathan & Steve Schoger) |
| [S5] | L4 | https://www.robinwilliamsdesign.com/ | 2026-09-20 | The Non-Designer's Design Book — CRAP 四原则 (Robin Williams) |
| [S6] | L0 | https://www.w3.org/TR/WCAG22/ | 2026-09-20 | WCAG 2.2 — Non-text Contrast (1.4.11) |
| [S7] | L0 | https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Design_for_accessibility | 2026-09-20 | MDN — Design for accessibility |
| [S8] | L2 | https://www.interaction-design.org/literature/topics/visual-hierarchy | 2026-09-20 | Interaction Design Foundation — Visual Hierarchy |
