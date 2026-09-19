---
title: 暗色模式：从用户偏好到 OKLCH 颜色映射
description: 暗色模式的工程目标（OLED 省电、视觉舒适、品牌表达）、prefers-color-scheme 媒体查询与三种策略、OKLCH 颜色映射、阴影与图片适配、localStorage 持久化与 Tailwind dark: 落地。
---

# 暗色模式：从用户偏好到 OKLCH 颜色映射

> 取用日期：2026-09-20；来源层级：L0（W3C、MDN、Material Design、Apple HIG）、L2（Smashing Magazine、Tailwind CSS 文档）。
> 核心信源：WCAG 2.2 [S1]、MDN prefers-color-scheme [S2]、Apple HIG Dark Mode [S3]、Material Design 3 Color [S4]、CSS Color Module Level 4 [S5]、Smashing Magazine Dark Mode [S6]、Tailwind Dark Mode [S7]、WebAIM Contrast Checker [S8]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 解释暗色模式的三层动机（OLED 省电、视觉舒适、品牌表达）及其在 B2B SaaS、营销站、阅读类应用中的权重差异。
- 用 `prefers-color-scheme` 媒体查询读取用户系统级偏好，并写出"系统跟随 / 手动切换 / 强制"三种策略的取舍矩阵。
- 为已有的浅色色板推导暗色变体，使用 OKLCH 调整 L 与 C，并解释为何不能简单 `filter: invert()`。
- 区分暗色模式下阴影失效的根因，给出用边框 / lighter surface 替代投影的工程方案。
- 处理暗色模式下的图像过亮问题，使用 `mix-blend-mode` 或半透明白色遮罩适配。
- 实现 localStorage 持久化 + UI 控件 + 系统偏好回退的三态切换，并说明闪烁（FOUC）预防。

---

## 一、为什么需要暗色模式

### 1. 三层动机

暗色模式不是装饰性需求，而是有清晰的工程与生理依据 [S3][S4][S6]：

- **OLED 省电**：在 OLED 屏幕上，黑色像素不发光。系统级深色主题在长时间阅读时（手机备忘录、阅读 App）可降低 30%–60% 的屏幕功耗。
- **视觉舒适**：在低光环境下，深色背景减少瞳孔持续收缩带来的疲劳。夜间使用 LCD 屏幕的场景中收益最显著。
- **品牌表达**：深色背景让品牌色（霓虹紫、电光蓝）更具冲击力，是面向开发者与创意工作者产品的常用差异化手段（Vercel、Linear、GitHub Dark）。

### 2. 不是所有产品都应做

| 产品类型 | 暗色模式优先级 | 理由 |
|---|---|---|
| 开发者工具 / IDE | 高 | 用户长时间凝视屏幕，省电与舒适收益最大 |
| 阅读 / 笔记 / 写作 | 高 | 弱光环境长时使用，OLED 设备续航直接受益 |
| B2B SaaS 控制台 | 中 | 数据密度高，部分仪表盘图表依赖浅色编码（如热力图） |
| 营销落地页 | 低 | 浅色背景更易传达"明亮、亲切"的品牌情绪 |
| 电商 / 内容消费 | 低 | 图片/视频占主导，深色背景反而降低产品图视觉表现 |

强行给落地页加暗色模式常常是错配——用户的注意力应集中在产品图而非 UI 配色。

---

## 二、用户偏好：`prefers-color-scheme` 媒体查询

### 1. 系统级偏好的本质

操作系统（macOS、iOS、Windows、Android、ChromeOS）允许用户在系统设置中声明"外观偏好：浅色 / 深色"。CSS 通过 `prefers-color-scheme` 媒体查询读取该声明 [S2]：

```css
/* 用户系统设置为浅色 */
:root {
  --color-bg: oklch(98% 0.005 250);
  --color-text: oklch(18% 0.005 250);
}

/* 用户系统设置为深色 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: oklch(12% 0.005 250);
    --color-text: oklch(96% 0.005 250);
  }
}
```

媒体查询的值域为 `light` 与 `dark`，部分浏览器还支持 `no-preference`（用户未设置）。工程上只需处理前两种，第三种按浅色回退即可。

### 2. JS 端读取

若需要在脚本里判断用户偏好或切换主题，可用 `window.matchMedia`：

```javascript
const mq = window.matchMedia('(prefers-color-scheme: dark)');
const systemPrefersDark = mq.matches;

// 监听用户系统设置变化
mq.addEventListener('change', (e) => {
  console.log('系统主题切换为', e.matches ? 'dark' : 'light');
  // 应用刷新：调用 applyTheme() 重新计算主题
});
```

注意：`prefers-color-scheme` 只反映系统级偏好，**不代表用户当前在你的网站上想要的主题**——用户可能系统是浅色，但对你的站点明确选了深色。因此，业务层需要一个独立的"站点主题状态"叠加在系统偏好之上。

---

## 三、三种策略与取舍

### 1. 策略 A：系统跟随（默认推荐）

网站完全跟随 `prefers-color-scheme`，用户切换系统主题，网站立即生效。优点是无需任何 UI 控件，零维护成本。缺点是无法覆盖用户的"站点级偏好"——一个系统浅色但想夜间用深色模式看你的站点的用户无法实现。

### 2. 策略 B：手动切换 + 系统跟随回退

提供 UI 控件让用户主动选择"浅色 / 深色 / 自动"。选择持久化到 localStorage；选择"自动"时回退到 `prefers-color-scheme`。这是 Linear、GitHub、Vercel 等成熟产品的做法：

```javascript
function applyTheme(mode) {
  // mode ∈ 'light' | 'dark' | 'auto'
  const resolved = mode === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;
  document.documentElement.dataset.theme = resolved;
}

// 初始化：localStorage 优先，缺失时回退 'auto'
const stored = localStorage.getItem('theme') ?? 'auto';
applyTheme(stored);
```

### 3. 策略 C：强制暗色（或强制浅色）

某些产品（如 IDE、屏幕保护类应用）只服务深色场景，可以省略浅色模式。**反过来不可取**——一个浅色产品强行加暗色模式往往是因为"竞品做了我也得做"，缺乏用户调研支撑 [S6]。

### 4. 反模式：暴露"自动"给所有用户的开关

不要在用户没要求的情况下提供"自定义主色"控件——色板是设计系统的资产，让用户改单一颜色会破坏视觉一致性 [S4]。

---

## 四、颜色映射：OKLCH 调整 L 与 C

### 1. 为什么不能简单 `invert()`

最常见的反模式是用 CSS 滤镜一键反色：

```css
.dark-mode { filter: invert(1) hue-rotate(180deg); }
```

这种做法有四个致命问题 [S3][S4][S6]：

- **色相翻转**：品牌色（蓝色）变橙黄，红色变青绿，品牌识别彻底崩塌。
- **对比度爆炸**：纯白文字在纯黑背景上对比度 21:1，远超阅读舒适区（4.5:1–7:1），产生光晕。
- **图像一并反色**：照片、表情包被一起翻转，必须额外豁免 `filter: invert(0)`。
- **阴影失效**：浅色模式下用阴影表达层级，深色下反相后阴影变白点，反而成为视觉噪点。

### 2. OKLCH 映射规则

Apple HIG 与 Material Design 3 都明确：暗色模式不是反相，是重新设计 [S3][S4]。在 OKLCH 空间做映射遵循两条规则：

- **背景 L 值取浅色模式反面**：浅色页面背景 L=98%，暗色页面背景 L=12%–15%。
- **主色降饱和、提亮度**：浅色模式主色 `oklch(52% 0.20 250)` 在暗色模式可映射到 `oklch(70% 0.15 250)`，避免在深背景上刺眼。

```css
:root {
  --color-bg:           oklch(98% 0.005 250);
  --color-surface:      oklch(96% 0.005 250);
  --color-text-primary: oklch(18% 0.005 250);
  --color-text-body:    oklch(40% 0.005 250);
  --color-text-muted:   oklch(60% 0.005 250);
  --color-primary:      oklch(52% 0.20 250);
}

[data-theme="dark"] {
  --color-bg:           oklch(14% 0.008 250);
  --color-surface:      oklch(20% 0.008 250);
  --color-text-primary: oklch(96% 0.005 250);
  --color-text-body:    oklch(82% 0.005 250);
  --color-text-muted:   oklch(64% 0.005 250);
  --color-primary:      oklch(72% 0.16 250);
  --color-primary-hover: oklch(78% 0.16 250);
}
```

注意表面（surface）并非纯背景——它是"上浮一层"的卡片、Modal、悬浮层。暗色模式下 surface 的 L 值应比 bg 高 4%–8%，提供层级感而不依赖阴影 [S3]。

### 3. 纯黑 vs 深灰的选择

常见的选择题：底色用 `#000` 还是 `#121212` 或 `oklch(14% 0 0)`？

- **纯黑 `#000`**：OLED 上完全不发光，省电最大化；但与白色文字对比度 21:1，且长时间阅读眼疲劳。
- **Material 推荐 `#121212`**：5% 亮度灰，避免 OLED 拖影与高对比度问题 [S4]。
- **OKLCH 推荐 `oklch(14% 0.008 hue)`**：可带极轻微的冷调或暖调，与品牌色和谐。

工程建议：B2B 与长时阅读产品选深灰；面向 OLED 用户的纯娱乐场景可选纯黑，但必须把文字调到 `oklch(85%+)` 而非纯白。

---

## 五、暗色模式专属处理

### 1. 阴影失效与替代

浅色模式下用阴影表达卡片层级（`box-shadow: 0 1px 3px rgba(0,0,0,0.08)`）。在暗色背景上，黑色阴影几乎不可见，反而显得"卡片浮不起来" [S3]。

三种替代方案：

- **边框 + 半透明背景**：

  ```css
  .card {
    background: oklch(20% 0.008 250);
    border: 1px solid oklch(100% 0.005 250 / 0.08); /* 8% 白色描边 */
  }
  ```

- **Lighter Surface 替代阴影**：

  ```css
  .card { background: oklch(18% 0.008 250); }    /* 默认层级 */
  .card.elevated { background: oklch(22% 0.008 250); } /* 上浮一层 */
  .card.modal { background: oklch(26% 0.008 250); }    /* Modal 最上 */
  ```

- **聚焦阴影保留（用于 focus ring）**：键盘焦点环仍应使用高对比度颜色（如品牌色），不要因为阴影"难看见"而削弱无障碍信号 [S1]。

### 2. 图像与媒体适配

浅色模式下明亮的照片在暗色背景下会"灼烧"视线。三种适配方式：

- **CSS filter 调暗**：

  ```css
  [data-theme="dark"] img:not(.preserve-color) {
    filter: brightness(0.85) contrast(0.95);
  }
  ```

- **半透明白色遮罩叠加**：

  ```css
  .image-wrapper {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
  }
  ```

- **`mix-blend-mode: lighten`（图片本身已经是深底时）**：避免在白底 logo 上使用，否则颜色翻转。

### 3. 图表与数据可视化

数据可视化的色板在暗色模式下不能简单 invert：

- 类别色（categorical）需降饱和度 30%–50%。
- 顺序色（sequential）从深色到亮色的方向在暗色模式下应从亮色到深色，因为人眼对亮度的感知在深背景下更敏感。
- 注释、网格线、坐标轴文字用 `oklch(70%+)` 而非纯白，避免对比度过高。

---

## 六、持久化与闪烁预防

### 1. localStorage 持久化

```javascript
// 主题切换函数（与本系列 chapters/01-color.md 联动）
function setTheme(mode) {
  localStorage.setItem('theme', mode);
  applyTheme(mode);
}

function applyTheme(mode) {
  const resolved = mode === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;
  document.documentElement.dataset.theme = resolved;
}
```

### 2. FOUC（Flash of Unstyled Content）预防

如果主题在 `<body>` 加载后才应用，用户会先看到浅色页面再切换到深色，造成闪烁。正确做法是在 `<head>` 内联一段同步脚本：

```html
<script>
  (function() {
    try {
      var stored = localStorage.getItem('theme') || 'auto';
      var resolved = stored === 'auto'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : stored;
      document.documentElement.dataset.theme = resolved;
    } catch (e) {}
  })();
</script>
```

这段脚本必须在 CSS 加载前执行，否则浏览器会用默认主题绘制首帧，再切换造成白闪。

### 3. 系统偏好变化监听

用户切换系统主题后，若当前是"自动"模式，应自动跟随：

```javascript
const mq = window.matchMedia('(prefers-color-scheme: dark)');
mq.addEventListener('change', () => {
  if ((localStorage.getItem('theme') || 'auto') === 'auto') {
    applyTheme('auto');
  }
});
```

---

## 七、CSS 变量 + Tailwind dark: 实战

### 1. CSS Variables 方案

最轻量、与框架解耦的方案：

```css
:root { /* 默认浅色 */ }
@media (prefers-color-scheme: dark) {
  :root { /* 暗色变量 */ }
}
[data-theme="light"] { /* 显式浅色，覆盖系统 */ }
[data-theme="dark"]  { /* 显式暗色，覆盖系统 */ }
```

四个规则的优先级：显式属性 > 媒体查询属性。`[data-theme]` 显式属性始终生效，仅当 `data-theme` 不存在时回退到媒体查询。

### 2. Tailwind dark: 方案

Tailwind v3+ 支持两种 dark mode 模式 [S7]：

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 切换为 class 模式，由 [data-theme="dark"] 触发
  // 或 darkMode: 'media'，跟随系统偏好
  theme: { /* ... */ },
};
```

```html
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  <!-- 切换主题时颜色自动变化 -->
</div>
```

`media` 模式适合"系统跟随"产品；`class` 模式适合"手动切换"产品。两种模式不可同时启用——选一个贯穿全站。

### 3. 验证清单

实现暗色模式后，用 WebAIM Contrast Checker [S8] 逐 Token 验证：

- 正文文本对背景 ≥ 4.5:1
- 大文本对背景 ≥ 3:1
- 主按钮文字对主按钮背景 ≥ 4.5:1
- 次要文本（如 placeholder、helper text）≥ 4.5:1
- 图标按钮轮廓对背景 ≥ 3:1

未通过的 Token 一律调整 L 值而非改色相，避免破坏品牌识别。

---

## 真实任务

### 任务一：为现有 SaaS 控制台加暗色模式

选择一个已有的浅色 SaaS 控制台（例如自己的 Side Project），完成以下工作：

1. 审计现有 CSS Token（颜色、阴影、边框），列出哪些需要在暗色模式下重新映射。
2. 在 OKLCH 空间中推导暗色变体，遵守"L 反面 + 主色降饱和提亮度"规则。
3. 实现"系统跟随 + 手动切换 + localStorage 持久化"三态控件，并在 `<head>` 内联防闪烁脚本。
4. 用 WebAIM Contrast Checker 截图证明所有正文组合 ≥ 4.5:1，大文本 ≥ 3:1 [S8]。
5. 提交 PR 时附带"修复前 vs 修复后"截图与对比度数字表。

约束：不得使用 `filter: invert()` 一键反色；不得破坏品牌色色相。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 暗色背景用纯黑 `#000`，白色文字对比度 21:1，长时间阅读眼疲劳，且 OLED 设备在低亮度下出现"黑色拖影" | 纯黑与纯白超过阅读舒适区间（4.5:1–7:1），瞳孔持续高收缩 | 底色改用 `oklch(14% 0.008 250)`，文字改用 `oklch(85%–92%)` 而非纯白 |
| 2 | 直接对浅色页面套 `filter: invert(1) hue-rotate(180deg)` 一键反色 | 反相会翻转品牌色色相、破坏识别；图像一并反色；阴影反向 | 在 OKLCH 空间逐 Token 重新映射，背景取浅色反面 L、主色降饱和提亮度 |
| 3 | 暗色模式下照片和插画依然用浅色模式原图，过亮灼眼 | 浅色调图像在深背景上对比度过高，注意力被图片夺走 | 给 `img` 加 `filter: brightness(0.85)`，或在 `.image-wrapper` 上叠加 `rgba(255,255,255,0.04)` 遮罩 |
| 4 | 暗色模式下仍然用阴影表达卡片层级，几乎不可见 | 暗背景上黑色阴影对比度低，无法表达"上浮"层级 | 改用 `1px solid oklch(100% 0.005 250 / 0.08)` 边框，或 L+4%–8% 的 lighter surface 表达层级 |
| 5 | 暗色模式主按钮 `:hover` 时背景色加深，文字未跟随调整，导致 hover 态文字对比度跌破 4.5:1 | hover 用同一色相加深，但未重新校验文字 vs 新背景的对比度 | 把按钮 hover 态放进对照表逐项验证，必要时把文字色也向"更亮"档切换，而非统一加深 |

---

## 本章验收

1. **三策略取舍**：你的产品是开发者工具（面向工程师），团队决定加暗色模式。请说明你会选择"系统跟随 / 手动切换 / 强制暗色"中的哪一种，给出两条理由，并描述 UI 控件的呈现位置与文案。
2. **OKLCH 推导**：浅色模式主按钮背景 `oklch(52% 0.20 250)`，文字白色。在暗色模式背景 `oklch(14% 0.008 250)` 上，请写出按钮背景与文字的目标 OKLCH 色值，并说明你如何验证对比度 ≥ 4.5:1。
3. **阴影失效解释**：为什么暗色模式下 `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` 失效？请给出两种替代方案，并解释为何焦点环（focus ring）必须保留高对比度。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://www.w3.org/TR/WCAG22/ | 2026-09-20 | Web Content Accessibility Guidelines (WCAG) 2.2 |
| [S2] | L0 | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme | 2026-09-20 | MDN: prefers-color-scheme |
| [S3] | L0 | https://developer.apple.com/design/human-interface-guidelines/dark-mode | 2026-09-20 | Apple Human Interface Guidelines — Dark Mode |
| [S4] | L0 | https://m3.material.io/styles/color/ | 2026-09-20 | Material Design 3 — Color system |
| [S5] | L0 | https://www.w3.org/TR/css-color-4/ | 2026-09-20 | CSS Color Module Level 4 |
| [S6] | L2 | https://www.smashingmagazine.com/2020/01/dark-mode-ux-design/ | 2026-09-20 | Smashing Magazine — Dark Mode in UX Design |
| [S7] | L0 | https://tailwindcss.com/docs/dark-mode | 2026-09-20 | Tailwind CSS — Dark Mode |
| [S8] | L2 | https://webaim.org/resources/contrastchecker/ | 2026-09-20 | WebAIM Contrast Checker |