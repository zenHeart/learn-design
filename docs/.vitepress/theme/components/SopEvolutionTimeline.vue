<script setup>
import { ref } from 'vue'

const eras = [
  {
    id: 'sop1',
    era: '2000 - 2012',
    name: 'SOP 1.0 · 像素切图与刀耕火种',
    tools: 'Photoshop / Fireworks / Word PRD',
    format: '压缩包 (ZIP) 内含切图 PNG + 标注图',
    handoverMode: '物理隔绝：设计负责导出图片，前端编写固定 HTML/CSS 绝对定位拼装',
    painPoints: [
      '每次改版设计师需手动重新切图数百张',
      '无响应式概念，移动端与 PC 割裂为多套 PSD',
      '文字行高、间距全凭前端量尺肉眼还原，误差极大',
      '状态机（Hover/Active）严重缺失，只有静态主视觉'
    ],
    efficiency: {
      syncCost: '极高（改一处耗费半天）',
      consistency: '极低（各页面间距随缘）',
      a11y: '几乎为 0（无障碍意识空白）'
    },
    codeSnippet: `<!-- SOP 1.0 时代典型产物：硬编码绝对定位与切片图 -->
<div class="banner-box">
  <img src="/images/header_slice_01.png" width="320" height="48" />
  <div style="position:absolute; top:12px; left:20px; font-size:14px; color:#333333;">
    提交订单
  </div>
</div>`
  },
  {
    id: 'sop2',
    era: '2012 - 2020',
    name: 'SOP 2.0 · 矢量组件化与自动标注',
    tools: 'Sketch + Zeplin / InVision / Abstract',
    format: 'Sketch Symbols 组件库 + 自动 CSS 标注',
    handoverMode: '半自动化：插件解析 Sketch 图层导出尺寸与色值，前端在网页上点选查看 CSS',
    painPoints: [
      'Zeplin 生成的代码往往为绝对定位或冗余 CSS，不可直接用于生产',
      'Mac 独占生态，Windows 工程师与产品无法查看源文件',
      '设计稿变更容易导致版本脱节，常出现“工程师按旧版做完”的悲剧',
      '暗黑模式适配需要人工画两套完整画板'
    ],
    efficiency: {
      syncCost: '中等（需手动上传更新版本）',
      consistency: '中等（依赖设计师自觉维护 Symbols）',
      a11y: '初级（个别团队关注对比度）'
    },
    codeSnippet: `/* SOP 2.0 时代从 Zeplin 复制出的静态 CSS */
.btn-primary {
  width: 120px;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ffffff;
  /* 往往缺少语义变量与响应式断点 */
}`
  },
  {
    id: 'sop3',
    era: '2020 - 2026+',
    name: 'SOP 3.0 · 云端协同、Tokens 同构与 Design QA',
    tools: 'Figma + DTCG Tokens + Dev Mode + CI/CD',
    format: 'W3C DTCG 标准 JSON Tokens + 代码组件映射',
    handoverMode: '全同构自动化：Token 直接编译为 CSS Variables/Tailwind，组件状态机前后端完全对齐',
    painPoints: [
      '对团队技术水位要求高，需建立 Design Tokens 治理管线',
      '需要设计师具备“参数化”思维，告别随意画矩形'
    ],
    efficiency: {
      syncCost: '极低（Token 变更走 PR 自动化构建）',
      consistency: '极高（三层 Token 强制约束）',
      a11y: '强制自动化门禁（CI 跑 Axe/WCAG）'
    },
    codeSnippet: `// SOP 3.0 现代标准：DTCG JSON Token 与语义变量
{
  "color": {
    "action": {
      "primary": {
        "$value": "{color.brand.500}",
        "$type": "color",
        "$description": "全局主操作按钮背景色，夜间模式自动映射为 brand.400"
      }
    }
  }
}
// 前端代码零魔法数字：
// <button class="bg-[var(--color-action-primary)] px-space-md ...">`
  }
]

const activeEraId = ref('sop3')

function selectEra(id) {
  activeEraId.value = id
}
</script>

<template>
  <div class="sop-card">
    <div class="sop-header">
      <div class="sop-badge">TEMPORAL MORPHING · 20年交付 SOP 演化对比器</div>
      <h3 class="sop-title">从“切图打包”到“Tokens 与代码双向同构”的三代范式跃迁</h3>
    </div>

    <!-- 年代切换轴 -->
    <div class="era-selector">
      <button
        v-for="e in eras"
        :key="e.id"
        class="era-btn"
        :class="{ active: activeEraId === e.id }"
        @click="selectEra(e.id)"
      >
        <span class="era-time">{{ e.era }}</span>
        <span class="era-name">{{ e.name.split('·')[0].trim() }}</span>
      </button>
    </div>

    <!-- 演化内容对比视窗 -->
    <div v-if="eras.find(e => e.id === activeEraId)" class="era-content">
      <div class="era-hero">
        <div class="era-full-title">{{ eras.find(e => e.id === activeEraId).name }}</div>
        <div class="era-meta-tags">
          <span class="era-tag"><strong>核心工具链：</strong>{{ eras.find(e => e.id === activeEraId).tools }}</span>
          <span class="era-tag"><strong>核心交付格式：</strong>{{ eras.find(e => e.id === activeEraId).format }}</span>
        </div>
      </div>

      <div class="era-grid">
        <!-- 协同工作方式 -->
        <div class="era-col">
          <div class="era-col-title">🔄 协同交付工作流</div>
          <p class="era-text">{{ eras.find(e => e.id === activeEraId).handoverMode }}</p>

          <div class="era-metrics">
            <div class="metric-item">
              <span class="metric-lbl">更新同步成本</span>
              <span class="metric-val">{{ eras.find(e => e.id === activeEraId).efficiency.syncCost }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-lbl">跨端设计一致性</span>
              <span class="metric-val">{{ eras.find(e => e.id === activeEraId).efficiency.consistency }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-lbl">无障碍保障深度</span>
              <span class="metric-val">{{ eras.find(e => e.id === activeEraId).efficiency.a11y }}</span>
            </div>
          </div>
        </div>

        <!-- 典型痛点 -->
        <div class="era-col">
          <div class="era-col-title">⚡ 时代特征与致命痛点</div>
          <ul class="era-list">
            <li v-for="(p, i) in eras.find(e => e.id === activeEraId).painPoints" :key="i">
              {{ p }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 交付产物物态对比代码 -->
      <div class="era-code-box">
        <div class="code-header">
          <span class="code-title">交付物本质形态对照 (Artifact Morphology)</span>
          <span class="code-badge">CODE MORPH</span>
        </div>
        <pre class="code-pre"><code>{{ eras.find(e => e.id === activeEraId).codeSnippet }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sop-card {
  margin: 28px 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.sop-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.sop-badge {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #c8401e;
  font-weight: 700;
  margin-bottom: 4px;
}

.sop-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.era-selector {
  display: flex;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.era-btn {
  flex: 1;
  padding: 14px 16px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}

.era-btn:last-child {
  border-right: none;
}

.era-btn:hover {
  background: var(--vp-c-bg-soft);
}

.era-btn.active {
  background: var(--vp-c-bg);
  box-shadow: inset 0 -2px 0 #c8401e;
}

.era-time {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.era-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.era-btn.active .era-name {
  color: #c8401e;
}

.era-content {
  padding: 20px 24px;
  background: var(--vp-c-bg);
}

.era-hero {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.era-full-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.era-meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.era-tag {
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 4px 10px;
  border-radius: 2px;
  color: var(--vp-c-text-2);
}

.era-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.era-col {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 16px;
  border-radius: 2px;
}

.era-col-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.era-text {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.era-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.metric-lbl {
  color: var(--vp-c-text-3);
}

.metric-val {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.era-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.era-code-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.code-badge {
  font-family: 'Space Grotesk', monospace;
  font-size: 10px;
  background: #c8401e;
  color: #fff;
  padding: 1px 6px;
  border-radius: 2px;
  font-weight: 700;
}

.code-pre {
  margin: 0;
  padding: 14px 16px;
  font-family: 'Space Grotesk', Menlo, Monaco, monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .era-grid {
    grid-template-columns: 1fr;
  }
  .era-selector {
    flex-direction: column;
  }
  .era-btn {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
