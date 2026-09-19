---
title: 无障碍设计：WCAG 2.2、POUR 原则与键盘 / 屏幕阅读器工程实战
description: WCAG 2.2 四大原则（POUR）核心成功标准与硬数字、键盘导航（Tab order、Skip links、focus trap）、ARIA 与屏幕阅读器（NVDA / VoiceOver）、表单与媒体无障碍、组件可达性修复实战。
---

# 无障碍设计：WCAG 2.2、POUR 原则与键盘 / 屏幕阅读器工程实战

> 取用日期：2026-09-20；来源层级：L0（w3.org、developer.mozilla.org、webaim.org）、L4（Inclusive Components by Heydon Pickering）。
> 核心信源：WCAG 2.2 Recommendation [S1]、MDN ARIA [S2]、WebAIM Screen Reader Survey [S3]、Inclusive Components [S4]、The A11y Project [S5]、WAI-ARIA Authoring Practices [S6]、axe-core Rules [S7]、Material Design Accessibility [S8]。

---

## 本章目标

完成本章后，你应能够独立完成下列可验证行为：

- 复述 WCAG 2.2 的四大原则（POUR）并对应到具体的成功标准（success criteria），包括 2.2 新增的 2.4.11 焦点不遮挡、2.5.7 拖拽替代、2.5.8 目标尺寸最小值。
- 给任意一组文本与背景计算对比度，判断是否满足 AA（≥4.5:1 / 大文本 ≥3:1 / 非文本组件 ≥3:1）。
- 用键盘（Tab / Shift+Tab / Enter / Esc / 方向键）走通一个真实页面，识别焦点环缺失、焦点跳序、模态框无法聚焦等所有键盘可达性问题。
- 为一个真实表单实现 label 关联、错误提示、required 字段与 aria-describedby 错误信息关联，并通过 axe DevTools 审计无障碍违规。
- 为一个模态对话框实现 focus trap（焦点陷阱）、Esc 关闭、关闭后焦点回到触发按钮三个核心行为。
- 区分装饰性图片与信息性图片，分别给出正确的 `alt` 属性处理；为视频内容输出 closed captions 与 transcript 文本。

---

## 一、POUR 四大原则与 WCAG 2.2 核心标准

### 1. WCAG 是什么

Web Content Accessibility Guidelines（WCAG）由 W3C 维护，是国际公认的数字内容无障碍基线 [S1]。**WCAG 2.2 于 2023-10-05 正式发布 Recommendation**，已纳入 ISO/IEC 40500；2024-12-12 进行过一次更新。**WCAG 3.0 截至 2026 年 9 月仍处于 Working Draft 阶段**，任何合规报告必须以 WCAG 2.2 AA 为准。

WCAG 的所有成功标准归入四大原则：**Perceivable（可感知）、Operable（可操作）、Understandable（可理解）、Robust（健壮）**——首字母合称 POUR [S1]。

### 2. Perceivable（可感知）：信息必须以多种感官通道呈现

**核心标准**：

| 标准 | 编号 | 硬指标 | 含义 |
|---|---|---|---|
| Non-text Contrast | 1.4.11 | ≥ 3:1 | 图标边界、输入框边框、焦点指示器与背景的对比度 |
| Text Contrast | 1.4.3 | 正文 ≥ 4.5:1，大文本 ≥ 3:1 | 文本与背景的对比度 |
| Alt Text | 1.1.1 | 必须提供 | 所有非装饰性图片必须有 `alt` 属性 |
| Captions | 1.2.2 | 必须提供 | 预录视频必须有同步字幕 |
| Audio Description | 1.2.5 | 视频必须有 | 视觉信息必须以音频形式补充说明 |

### 3. Operable（可操作）：界面元素必须可被操作

**核心标准**：

| 标准 | 编号 | 硬指标 | 含义 |
|---|---|---|---|
| Keyboard | 2.1.1 | 必须支持 | 所有功能必须可由键盘访问 |
| Focus Visible | 2.4.7 | 必须可见 | 键盘焦点必须有可见指示器 |
| **Focus Not Obscured**（新增） | **2.4.11** | **焦点不可被遮挡** | 焦点指示器必须完整可见，不能被 sticky 元素覆盖 |
| Target Size Minimum（新增） | 2.5.8 | ≥ 24×24 CSS px | 触控目标最小尺寸；增强级 AAA SC 2.5.5 为 44×44 |
| Dragging Movements（新增） | 2.5.7 | 必须提供单指针替代 | 拖拽手势必须可由单击替代 |

WCAG 2.2 新增的 2.4.11 与 2.5.8 是过去常被忽略的硬指标——焦点环不可见、目标尺寸过小、必须拖拽才能完成操作，都直接判定 AA 违规 [S1]。

### 4. Understandable（可理解）：信息与操作必须可被理解

**核心标准**：

| 标准 | 编号 | 含义 |
|---|---|---|
| Language of Page | 3.1.1 | `<html lang="zh-CN">` 必须正确声明 |
| Consistent Navigation | 3.2.3 | 导航顺序在多页面间保持一致 |
| Consistent Help（新增） | 3.2.6 | 帮助入口必须在同一位置提供 |

### 5. Robust（健壮）：内容必须可被未来技术兼容

**核心标准**：

| 标准 | 编号 | 含义 |
|---|---|---|
| Name, Role, Value | 4.1.2 | 自定义组件必须正确暴露 name / role / state |
| Status Messages | 4.1.3 | 状态消息（成功 / 错误）必须能被辅助技术无焦点通知（`aria-live`） |

WCAG 2.2 共 87 条成功标准，分为 A / AA / AAA 三级。**行业合规底线是 AA**——本文以下讨论的硬指标均以 AA 为准。

---

## 二、关键硬数字速查

| 指标 | AA 数值 | 来源 |
|---|---|---|
| 正文文本对比度 | ≥ 4.5:1 | WCAG 1.4.3 [S1] |
| 大文本对比度（≥18pt 或 ≥14pt 粗体） | ≥ 3:1 | WCAG 1.4.3 [S1] |
| 非文本组件对比度（图标、边框、焦点环） | ≥ 3:1 | WCAG 1.4.11 [S1] |
| 触控目标最小尺寸 | ≥ 24×24 CSS px | WCAG 2.5.8 [S1] |
| 触控目标（增强级 AAA） | ≥ 44×44 CSS px | WCAG 2.5.5 |
| 焦点指示器最小厚度 | ≥ 2px | WCAG 2.4.11 [S1] + 行业实践 |

iOS HIG（44pt）与 Material Design（48dp / 56dp）的触控目标尺寸都高于 WCAG 2.2 AA 最低值，平台规范与 WCAG 不冲突时优先遵循平台规范。

---

## 三、键盘导航：Tab Order、Skip Links、Focus Trap

### 1. Tab Order 必须符合视觉顺序

**键盘 Tab 顺序应当与视觉阅读顺序一致**——这是 2.4.3 Focus Order 的硬指标 [S1]。

```html
<!-- ❌ 反例：tabindex 强制跳序，破坏视觉顺序 -->
<button>次要操作</button>
<button tabindex="1">主操作</button> <!-- Tab 时第一个聚焦，跳过次要操作 -->

<!-- ✅ 正确：按 DOM 顺序自然聚焦 -->
<button>次要操作</button>
<button>主操作</button>
```

`tabindex` 仅在以下场景使用：
- `tabindex="0"`：把非交互元素（如自定义 `<div>`）加入 Tab 流。
- `tabindex="-1"`：可被 `element.focus()` 编程聚焦，但不参与 Tab。
- **永远不要用 `tabindex` > 0**——它会破坏视觉顺序。

### 2. Skip Links：键盘用户跳过重复导航

**每个长页面的最顶部必须放置 Skip Link**，让键盘与屏幕阅读器用户直接跳到主内容 [S4]：

```html
<body>
  <a class="skip-link" href="#main-content">
    跳到主内容
  </a>

  <header class="site-header">
    <nav>...</nav>
  </header>

  <main id="main-content" tabindex="-1">
    <!-- 页面主内容 -->
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -40px;       /* 默认隐藏在视口外 */
  left: 8px;
  background: #1A1C1E;
  color: white;
  padding: 8px 16px;
  z-index: 9999;
}

.skip-link:focus {
  top: 8px;         /* 聚焦时滑入视口 */
}
```

### 3. Focus Trap：模态对话框的焦点锁定

模态对话框打开时，焦点必须被"困"在对话框内——按 Tab 不会跑到背后的主页面，按 Esc 关闭对话框，对话框关闭后焦点必须回到触发按钮 [S4][S6]。

```javascript
function openModal(modalElement, triggerButton) {
  // 1. 记录触发按钮，关闭时还原焦点
  const previouslyFocused = triggerButton;

  // 2. 找出模态框内所有可聚焦元素
  const focusable = modalElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  // 3. 把焦点移到模态框第一个元素
  modalElement.showModal();
  firstFocusable?.focus();

  // 4. 监听 Tab 键，在首尾循环
  modalElement.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  function closeModal() {
    modalElement.close();
    previouslyFocused?.focus(); // 焦点回到触发按钮
  }
}
```

### 4. 焦点可见性：永远不要 outline: none

WCAG 2.4.7 Focus Visible 与 2.4.11 Focus Not Obscured 是 AA 硬指标 [S1]。移除 outline 而不提供替代焦点指示器**直接判定违规**。

```css
/* ❌ 反模式：直接移除 outline */
button { outline: none; }

/* ✅ 正确：使用 :focus-visible 仅在键盘聚焦时显示 */
button:focus { outline: none; } /* 鼠标点击时无视觉变化 */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 四、屏幕阅读器与 ARIA

### 1. 屏幕阅读器主流用户分布

WebAIM 2023 年屏幕阅读器调查显示 [S3]：

| 屏幕阅读器 | 平台 | 用户占比 |
|---|---|---|
| **NVDA** | Windows | 53.5% |
| **JAWS** | Windows | 33.0% |
| **VoiceOver** | macOS / iOS | 11.0% |
| 其他（TalkBack、ChromeVox 等） | — | 2.5% |

测试建议：Windows 上用 NVDA（免费）+ Firefox，macOS / iOS 上用 VoiceOver + Safari。三大组合覆盖 95% 以上屏幕阅读器用户。

### 2. ARIA 三大属性：Roles、States、Properties

ARIA（Accessible Rich Internet Applications）通过补充语义弥补 HTML 元素的可达性缺口 [S2][S6]：

```html
<!-- 1. Role：告诉辅助技术这是什么组件 -->
<div role="button" tabindex="0" aria-pressed="false">
  切换
</div>

<!-- 2. State：动态状态（折叠/展开、勾选/未勾选） -->
<button aria-expanded="false" aria-controls="menu-1">
  菜单
</button>

<!-- 3. Property：补充信息（标签、描述） -->
<input aria-label="电子邮箱" aria-describedby="email-help" />
<small id="email-help">用于接收登录验证码</small>
```

### 3. aria-live：状态消息的无焦点通知

表单提交成功、保存完成等提示必须能被屏幕阅读器**自动播报**，而不需要用户主动聚焦到提示区域 [S1][S6]：

```html
<div aria-live="polite" aria-atomic="true" class="toast">
  设置已保存
</div>
```

- `aria-live="polite"`：在当前播报结束后插入播报，不打断用户。
- `aria-live="assertive"`：立即打断当前播报，仅用于紧急错误。

### 4. ARIA 的"第一规则"

**ARIA 的第一规则是"不要用 ARIA"** [S6]——能用原生 HTML 元素实现的，绝不用 ARIA。

```html
<!-- ❌ 反例：用 div + ARIA 模拟按钮 -->
<div role="button" tabindex="0" onclick="submit()">提交</div>

<!-- ✅ 正确：直接用 button -->
<button type="submit">提交</button>
```

`<button>` 自带键盘支持（Enter / Space）、焦点管理、可访问性语义。用 `<div>` 模拟需要手动补全 tabindex、role、键盘事件、focus 管理——任何一个遗漏都判定违规。

---

## 五、表单无障碍

### 1. Label 必须显式关联

每个表单控件必须有显式 label，不能仅靠 `placeholder` 充当标签 [S1][S4]：

```html
<!-- ✅ 正确：用 <label for> 显式关联 -->
<label for="email">电子邮箱</label>
<input type="email" id="email" name="email" />

<!-- ✅ 也正确：用 aria-label 兜底 -->
<input type="email" aria-label="电子邮箱" name="email" />

<!-- ❌ 反例：仅 placeholder，焦点离开后即消失 -->
<input type="email" placeholder="电子邮箱" name="email" />
```

### 2. 错误提示与 aria-describedby 关联

错误消息必须**与输入框程序化关联**，让屏幕阅读器在聚焦输入框时自动播报错误 [S1][S4]：

```html
<label for="password">密码</label>
<input
  type="password"
  id="password"
  name="password"
  aria-required="true"
  aria-invalid="true"
  aria-describedby="password-error"
/>
<span id="password-error" class="error">
  密码必须包含至少 8 个字符
</span>
```

### 3. required 字段的双重声明

```html
<input type="email" required aria-required="true" />
```

- HTML `required` 属性：原生表单校验。
- `aria-required="true"`：辅助技术识别（部分屏幕阅读器对 `required` 支持不一致）。

### 4. 错误不能只用颜色传达

WCAG 1.4.1 Use of Color 明确禁止仅用颜色传达信息 [S1]。错误输入框必须同时具备**红色边框 + 错误图标 + 文字提示**：

```html
<label for="email">电子邮箱</label>
<div class="input-wrapper" aria-invalid="true">
  <input type="email" id="email" aria-describedby="email-error" />
  <span class="error-icon" aria-hidden="true">⚠</span>
</div>
<span id="email-error">电子邮箱格式不正确</span>
```

---

## 六、媒体替代

### 1. alt 属性的三层决策

| 图片类型 | `alt` 属性 | 含义 |
|---|---|---|
| **信息性图片** | `alt="具体描述"` | 图片承载独立信息 |
| **功能型图片**（如 Logo、可点击图标） | `alt="按钮功能"` | 图片触发操作 |
| **装饰性图片** | `alt=""` | 图片仅装饰，屏幕阅读器跳过 |

```html
<!-- 信息性 -->
<img src="chart.png" alt="2026 年 9 月用户增长曲线，峰值 12,400" />

<!-- 功能型 -->
<a href="/home">
  <img src="logo.png" alt="返回首页" />
</a>

<!-- 装饰性：必须显式 alt=""，不要省略 alt 属性 -->
<img src="divider.svg" alt="" />
```

### 2. 视频字幕与音频转录

WCAG 1.2.2 Captions（AA）要求所有预录视频必须提供同步字幕 [S1]。字幕必须：

- 与音频内容同步。
- 包含对话、说话人标识、关键音效（如 `[音乐]`、`[掌声]`）。
- 不可被关闭（除非另有音频描述轨道）。

```html
<video controls>
  <source src="tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="captions.zh.vtt" srclang="zh" label="中文字幕" default />
  <track kind="descriptions" src="descriptions.vtt" srclang="zh" label="音频描述" />
</video>
```

`<track kind="captions">` 用于字幕；`<track kind="descriptions">` 用于音频描述（WCAG 1.2.5）。

---

## 七、真实任务

### 任务一：表单 + 模态框 + 自定义组件的可达性修复

选一个你项目中的真实页面（包含至少一个表单、一个模态对话框、一个自定义下拉菜单），按下列步骤做无障碍修复：

1. **表单审计**：
   - 所有 input 必须有显式 `<label>` 关联。
   - 必填字段同时声明 `required` 与 `aria-required`。
   - 错误提示必须用 `aria-describedby` 与输入框关联，且包含图标 + 文字。

2. **模态框审计**：
   - 打开时焦点进入模态框第一个元素。
   - Tab / Shift+Tab 在模态框内循环（focus trap）。
   - Esc 关闭，焦点回到触发按钮。
   - 模态框背后内容必须设 `aria-hidden="true"` 与 `inert` 属性。

3. **自定义下拉菜单审计**：
   - 不能用 `<div>` 模拟，必须用 `<button>` 触发 + `<ul role="listbox">`。
   - 选中状态用 `aria-selected="true"`。
   - 键盘支持：方向键切换选项、Enter 确认、Esc 关闭。

4. **键盘走查**：用 Tab / Shift+Tab / Enter / Esc / 方向键完整走通页面，记录所有问题。
5. **屏幕阅读器测试**：用 NVDA + Firefox 走一遍，听播报是否合理。
6. **自动化审计**：用 axe DevTools 或 Lighthouse Accessibility Audit 扫描，记录违规数。
7. 输出修复前后的对比表（违规数 + 关键交互问题列表）。

### 任务二：图片与视频资源的可达性标注

选一个内容页面（如博客文章、产品介绍），按下列步骤审计：

1. 列出所有 `<img>`，按"信息性 / 功能型 / 装饰性"分类，标注每张图应当的 `alt` 值。
2. 检查视频是否包含 `<track kind="captions">`，字幕文件是否同步。
3. 对仅用颜色传达信息的图表（如图例无文字），增加图案或文字标签。
4. 输出审计报告（按 WCAG 标准编号引用违规项）。

---

## 失败模式（5 个常见错误）

| # | 错误表现 | 根因 | 修复方法 |
|---|---|---|---|
| 1 | 整个产品用 `<div onClick={...}>` 实现"按钮"，完全不可键盘访问 | 把可点击 div 当作 button，缺少 tabindex、role="button"、键盘事件（Enter / Space） | 全部改用原生 `<button>`；只有真正需要自定义交互（如复杂排版）时才考虑 `<div role="button" tabindex="0">` 并手动补全键盘事件 |
| 2 | 装饰性图片写成 `alt="image1"`、`alt="图片"`，屏幕阅读器读出冗余信息 | 工程师对装饰性图片的 alt 处理不熟悉，写了无意义文案 | 装饰性图片必须显式 `alt=""`（空字符串），告诉屏幕阅读器跳过；信息性图片才写具体描述 |
| 3 | 表单错误只把输入框边框变红，没有文字提示、没有图标 | 错误信息仅靠颜色传达（违反 WCAG 1.4.1 Use of Color） | 错误必须三件套：红色边框 + 错误图标 + 文字提示；通过 `aria-describedby` 关联到输入框 |
| 4 | 模态对话框打开后，按 Tab 焦点跑到背后的主页元素上 | 没有 focus trap，模态框内的 Tab 循环未实现 | 实现 Tab 循环：监听 keydown，在首尾焦点元素之间 wrap；同时给模态框背后内容设 `inert` 属性 |
| 5 | 页面顶部没有 Skip Link，键盘用户每次新页面都要按 15 次 Tab 跳过导航 | 工程师认为"导航栏也是内容"，未考虑键盘用户 | 每个页面的最顶部必须有 Skip Link，链接到主内容区域；视觉上默认隐藏，`focus` 时显现 |

---

## 本章验收

1. **WCAG 标准引用**：一段正文使用 `#52565C` 颜色，背景是 `#FFFFFF`，请计算对比度并判断是否满足 WCAG 2.2 AA；同时说明该颜色是否适用于 16px / 600 字重的标题（属于"大文本"吗？）。
2. **键盘可达性诊断**：一个 `<div role="button" tabindex="0" onclick={handleClick}>` 看起来可以点击，但用键盘 Tab 不到。请列出至少三个修复要点。
3. **alt 属性决策**：一张博客文章底部的"分隔线"图片（纯装饰、无信息）、一张产品截图（展示功能）、一个网站 Logo（点击返回首页）——请分别为它们写出正确的 `alt` 属性，并解释为什么分隔线不能省略 alt。

---

## 信源合集

| 编号 | 层级 | URL | 取用日期 | 标题 |
|---|---|---|---|---|
| [S1] | L0 | https://www.w3.org/TR/WCAG22/ | 2026-09-20 | Web Content Accessibility Guidelines (WCAG) 2.2 |
| [S2] | L0 | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA | 2026-09-20 | MDN — ARIA |
| [S3] | L2 | https://webaim.org/projects/screenreadersurvey9/ | 2026-09-20 | WebAIM Screen Reader User Survey #9 (2023) |
| [S4] | L4 | https://inclusive-components.design/ | 2026-09-20 | Inclusive Components (Heydon Pickering) |
| [S5] | L2 | https://www.a11yproject.com/ | 2026-09-20 | The A11Y Project — Community-driven Accessibility Resources |
| [S6] | L0 | https://www.w3.org/WAI/ARIA/apg/ | 2026-09-20 | WAI-ARIA Authoring Practices Guide |
| [S7] | L0 | https://github.com/dequelabs/axe-core | 2026-09-20 | axe-core — Accessibility testing engine |
| [S8] | L0 | https://m3.material.io/foundations/accessible-design/accessibility-basics | 2026-09-20 | Material Design 3 — Accessibility |
