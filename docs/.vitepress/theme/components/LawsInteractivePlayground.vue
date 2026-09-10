<script setup>
import { ref, computed } from 'vue'

// --- 实验 1: 菲茨定律 (Fitts's Law) ---
const targetWidth = ref(48) // px
const targetDistance = ref(200) // px
const clickState = ref('ready') // ready, testing, done
const startTime = ref(0)
const lastTime = ref(null)

const fittsID = computed(() => {
  // ID = log2(2D / W)
  const val = Math.log2((2 * targetDistance.value) / targetWidth.value)
  return Math.max(0, val).toFixed(2)
})

function startFittsTest() {
  clickState.value = 'testing'
  startTime.value = performance.now()
}

function hitTarget() {
  if (clickState.value === 'testing') {
    const elapsed = Math.round(performance.now() - startTime.value)
    lastTime.value = elapsed
    clickState.value = 'done'
  }
}

function resetFitts() {
  clickState.value = 'ready'
  lastTime.value = null
}

// --- 实验 2: WCAG 2.2 对比度实时演练盘 ---
const textColor = ref('#333333')
const bgColor = ref('#ffffff')

// 相对亮度算法 (sRGB to relative luminance)
function getLuminance(hex) {
  let rgb = hex.replace('#', '')
  if (rgb.length === 3) {
    rgb = rgb.split('').map(c => c + c).join('')
  }
  const r = parseInt(rgb.substring(0, 2), 16) / 255
  const g = parseInt(rgb.substring(2, 4), 16) / 255
  const b = parseInt(rgb.substring(4, 6), 16) / 255

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

const contrastRatio = computed(() => {
  try {
    const lum1 = getLuminance(textColor.value)
    const lum2 = getLuminance(bgColor.value)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    const ratio = (brightest + 0.05) / (darkest + 0.05)
    return parseFloat(ratio.toFixed(2))
  } catch (e) {
    return 1.0
  }
})

const isAaPass = computed(() => contrastRatio.value >= 4.5)
const isAaaPass = computed(() => contrastRatio.value >= 7.0)
const isLargePass = computed(() => contrastRatio.value >= 3.0)

const activeTab = ref('fitts')
</script>

<template>
  <div class="playground-card">
    <div class="playground-header">
      <div>
        <div class="playground-badge">INTERACTIVE LAB · 交互式法则与物理实验室</div>
        <h3 class="playground-title">亲手验证：从菲茨定律动力学到 WCAG 2.2 刚性色差</h3>
      </div>
      <div class="tab-switch">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'fitts' }"
          @click="activeTab = 'fitts'"
        >
          🎯 菲茨定律靶场
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'contrast' }"
          @click="activeTab = 'contrast'"
        >
          🎨 WCAG 对比度刻度盘
        </button>
      </div>
    </div>

    <!-- 实验 1: 菲茨定律 -->
    <div v-show="activeTab === 'fitts'" class="lab-body">
      <div class="lab-intro">
        <p>
          <strong>菲茨定律 (Fitts's Law)</strong>：到达一个目标的时间取决于<strong>目标的距离 \(D\)</strong> 和<strong>目标的尺寸 \(W\)</strong>。公式：\(ID = \log_2(2D/W)\)。
          调整下方参数并在右侧靶场中测速，体验为什么移动端核心按钮必须做成<strong>大尺寸贴边</strong>。
        </p>
      </div>

      <div class="controls-bar">
        <div class="ctrl-group">
          <label>目标宽度 \(W\)：<strong>{{ targetWidth }}px</strong></label>
          <input type="range" v-model.number="targetWidth" min="16" max="96" step="4" />
        </div>
        <div class="ctrl-group">
          <label>目标距离 \(D\)：<strong>{{ targetDistance }}px</strong></label>
          <input type="range" v-model.number="targetDistance" min="80" max="360" step="20" />
        </div>
        <div class="metric-badge">
          <span>难度指数 (Index of Difficulty)</span>
          <strong>ID: {{ fittsID }} bit</strong>
        </div>
      </div>

      <!-- 点击测试靶场区域 -->
      <div class="target-arena">
        <div class="arena-track">
          <!-- 起点按钮 -->
          <button
            class="start-point-btn"
            :disabled="clickState === 'testing'"
            @click="startFittsTest"
          >
            {{ clickState === 'ready' ? '1. 点击起跑' : clickState === 'testing' ? '正在计时...' : '再测一次' }}
          </button>

          <!-- 动态距离标尺与连线 -->
          <div class="distance-rule" :style="{ width: targetDistance + 'px' }">
            <span class="rule-lbl">{{ targetDistance }}px</span>
          </div>

          <!-- 目标靶心 -->
          <button
            class="target-disc"
            :class="{ active: clickState === 'testing', hit: clickState === 'done' }"
            :style="{
              width: targetWidth + 'px',
              height: targetWidth + 'px'
            }"
            @click="hitTarget"
          >
            2. 击中
          </button>
        </div>

        <!-- 结果反馈 -->
        <div v-if="lastTime !== null" class="fitts-result">
          <span>⏱️ 实测耗时：<strong>{{ lastTime }} ms</strong></span>
          <span class="res-tip">
            {{ targetWidth <= 24 ? '⚠️ 尺寸小于 24px 时失误率显著增加！' : '✅ 尺寸与距离比例舒适，触达迅捷。' }}
          </span>
          <button class="reset-btn" @click="resetFitts">重置数据</button>
        </div>
      </div>
    </div>

    <!-- 实验 2: WCAG 2.2 对比度刻度盘 -->
    <div v-show="activeTab === 'contrast'" class="lab-body">
      <div class="lab-intro">
        <p>
          <strong>WCAG 2.2 视觉对比度准则</strong>：普通正文必须达到 <strong>4.5:1 (AA 级)</strong>，大字号或界面控件必须达到 <strong>3:1</strong>，严苛 AAA 级要求 <strong>7:1</strong>。
          直接输入色值或滑动调整，实时检验色差与破坏性。
        </p>
      </div>

      <div class="contrast-config-row">
        <div class="color-picker-item">
          <label>文字颜色 (Foreground)</label>
          <div class="picker-input-wrap">
            <input type="color" v-model="textColor" />
            <input type="text" v-model="textColor" class="hex-text" />
          </div>
        </div>
        <div class="color-picker-item">
          <label>背景颜色 (Background)</label>
          <div class="picker-input-wrap">
            <input type="color" v-model="bgColor" />
            <input type="text" v-model="bgColor" class="hex-text" />
          </div>
        </div>
        <!-- 预设快速测试 -->
        <div class="presets-group">
          <span class="preset-title">典型场景预设：</span>
          <button class="preset-btn" @click="textColor='#18181b'; bgColor='#ffffff'">标准黑白</button>
          <button class="preset-btn" @click="textColor='#9ca3af'; bgColor='#ffffff'">典型浅灰 (反人类)</button>
          <button class="preset-btn" @click="textColor='#c8401e'; bgColor='#ffffff'">朱砂红标</button>
          <button class="preset-btn" @click="textColor='#e4e4e7'; bgColor='#18181b'">深色模式</button>
        </div>
      </div>

      <!-- 对比度仪表展示 -->
      <div class="contrast-meters">
        <div class="ratio-display">
          <span class="ratio-val">{{ contrastRatio }} : 1</span>
          <span class="ratio-caption">相对亮度对比度</span>
        </div>

        <div class="badges-row">
          <div class="check-pill" :class="{ pass: isAaPass, fail: !isAaPass }">
            <span class="pill-name">WCAG AA 正文 (4.5:1)</span>
            <span class="pill-res">{{ isAaPass ? '✓ 达标' : '✕ 阻断' }}</span>
          </div>
          <div class="check-pill" :class="{ pass: isLargePass, fail: !isLargePass }">
            <span class="pill-name">大字号/图标 (3:1)</span>
            <span class="pill-res">{{ isLargePass ? '✓ 达标' : '✕ 阻断' }}</span>
          </div>
          <div class="check-pill" :class="{ pass: isAaaPass, fail: !isAaaPass }">
            <span class="pill-name">WCAG AAA 严苛 (7:1)</span>
            <span class="pill-res">{{ isAaaPass ? '✓ 极致' : '✕ 未达' }}</span>
          </div>
        </div>
      </div>

      <!-- 实时破坏与渲染视窗 -->
      <div
        class="preview-window"
        :style="{ backgroundColor: bgColor, color: textColor }"
      >
        <div class="preview-headline">这是一段实时大标题展示文本 (18pt+)</div>
        <div class="preview-body">
          这是一段常规 14px 正文内容。在日常 UI 设计中，滥用浅灰色文字是造成视力不佳读者和强光环境下用户完全无法阅读的第一大元凶。WCAG 2.2 AA 级红线要求对比度必须不低于 4.5:1。
        </div>
        <div class="preview-actions">
          <button class="preview-btn" :style="{ borderColor: textColor, color: textColor }">操作按钮</button>
          <span class="preview-hint">辅助提示信息 (12px)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-card {
  margin: 28px 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.playground-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.playground-badge {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #c8401e;
  font-weight: 700;
  margin-bottom: 4px;
}

.playground-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tab-switch {
  display: flex;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.tab-btn {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-bg);
  color: #c8401e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.lab-body {
  padding: 20px 24px;
  background: var(--vp-c-bg);
}

.lab-intro {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
}

.controls-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  background: var(--vp-c-bg-alt);
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.ctrl-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ctrl-group label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ctrl-group input[type='range'] {
  width: 140px;
}

.metric-badge {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.metric-badge span {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.metric-badge strong {
  font-family: 'Space Grotesk', monospace;
  font-size: 18px;
  color: #c8401e;
}

/* Fitts Arena */
.target-arena {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 2px;
  padding: 24px;
  overflow-x: auto;
}

.arena-track {
  display: flex;
  align-items: center;
  min-height: 120px;
  min-width: 500px;
}

.start-point-btn {
  font-family: 'Space Grotesk', sans-serif;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.start-point-btn:hover {
  background: #2563eb;
}

.distance-rule {
  height: 2px;
  background: var(--vp-c-divider);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.rule-lbl {
  position: absolute;
  top: -18px;
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.target-disc {
  font-family: 'Space Grotesk', sans-serif;
  background: #e2e8f0;
  border: 2px solid #94a3b8;
  border-radius: 50%;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.target-disc.active {
  background: #ef4444;
  border-color: #b91c1c;
  color: #fff;
  animation: targetPulse 1s infinite alternate;
}

.target-disc.hit {
  background: #10b981;
  border-color: #047857;
  color: #fff;
}

@keyframes targetPulse {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}

.fitts-result {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.res-tip {
  color: var(--vp-c-text-2);
}

.reset-btn {
  margin-left: auto;
  font-size: 12px;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  cursor: pointer;
}

/* Contrast Tab */
.contrast-config-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background: var(--vp-c-bg-alt);
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
}

.color-picker-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.color-picker-item label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.picker-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.picker-input-wrap input[type='color'] {
  width: 32px;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  padding: 0;
  border-radius: 2px;
  cursor: pointer;
}

.hex-text {
  font-family: 'Space Grotesk', monospace;
  font-size: 12px;
  width: 80px;
  padding: 4px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.presets-group {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.preset-title {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.preset-btn {
  font-size: 11px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: #c8401e;
  color: #c8401e;
}

.contrast-meters {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.ratio-display {
  display: flex;
  flex-direction: column;
}

.ratio-val {
  font-family: 'Space Grotesk', monospace;
  font-size: 32px;
  font-weight: 700;
  color: #c8401e;
  line-height: 1;
}

.ratio-caption {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.badges-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.check-pill {
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  border: 1px solid;
  border-radius: 2px;
  font-size: 12px;
}

.check-pill.pass {
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
  color: #047857;
}

.check-pill.fail {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
  color: #b91c1c;
}

.pill-name {
  font-size: 11px;
}

.pill-res {
  font-weight: 700;
  margin-top: 2px;
}

.preview-window {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: all 0.2s;
}

.preview-headline {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.preview-body {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-btn {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  background: transparent;
  border: 1px solid;
  border-radius: 2px;
}

.preview-hint {
  font-size: 12px;
  opacity: 0.8;
}
</style>
