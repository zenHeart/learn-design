<script setup>
import { ref } from 'vue'

const layers = [
  {
    id: 'surface',
    level: 5,
    name: '表现层',
    enName: 'Surface Layer',
    abstraction: '最具体 (Concrete)',
    color: '#c8401e',
    focus: '感官视觉设计：配色、字阶、图标一致性、微动效、状态反馈',
    questions: [
      '色相与对比度是否满足 WCAG 2.2 AA (4.5:1)？',
      '字体排印是否遵循层级节奏，行高是否达标 (1.5 - 1.8)？',
      '按钮是否具备 Default/Hover/Active/Focus/Disabled 完整五态？'
    ],
    engineerAction: '检查 CSS 变量是否全部继承语义 Token，严禁任何硬编码十六进制色值。'
  },
  {
    id: 'skeleton',
    level: 4,
    name: '框架层',
    enName: 'Skeleton Layer',
    abstraction: '高保真界面排布',
    color: '#ea580c',
    focus: '界面设计、导航设计、信息设计：控件排布、视觉引导线、点击热区',
    questions: [
      '所有交互元素的触控热区是否达到 24×24px（移动端建议 44×44px）？',
      '导航和返回路径是否直观，是否在界面任何位置都能知道“我在哪”？',
      '重要操作按钮是否处于 Fitts’s Law 黄金舒适区？'
    ],
    engineerAction: '检查布局在极端视口与多语言长文本下的溢出表现，设置正确的 flex/grid 容器约束。'
  },
  {
    id: 'structure',
    level: 3,
    name: '结构层',
    enName: 'Structure Layer',
    abstraction: '信息拓扑与交互流',
    color: '#8b5cf6',
    focus: '交互设计与信息架构：用户如何到达下一屏、分支逻辑、异常流程容错',
    questions: [
      '用户从发起任务到完成闭环是否超过 3~4 步无意义跳转？',
      '发生网络中断或表单校验错误时，系统是否有明确可恢复的救济机制？',
      '信息分块是否遵循格式塔“共同区域”与“接近原则”？'
    ],
    engineerAction: '检查路由守卫、状态持久化、空状态（Empty State）与网络错误重试逻辑。'
  },
  {
    id: 'scope',
    level: 2,
    name: '范围层',
    enName: 'Scope Layer',
    abstraction: '功能与内容需求',
    color: '#3b82f6',
    focus: '明确做什么和不做什么：功能规格契约（Functional Specs）、内容资产清单',
    questions: [
      '当前页面是否存在与核心用户目标无关的冗余堆砌功能？',
      '所展示的数据字段是否具备真实的数据源接口支撑？',
      '是否划分了 P0/P1/P2 的 MVP 交付范围？'
    ],
    engineerAction: '审查 PRD 与接口协议字典，确认数据结构和分页加载策略。'
  },
  {
    id: 'strategy',
    level: 1,
    name: '战略层',
    enName: 'Strategy Layer',
    abstraction: '最抽象 (Abstract)',
    color: '#10b981',
    focus: '产品目标与用户需求：用户为什么用这个？商业成功指标是什么？',
    questions: [
      '这个产品/功能真正帮用户解决了什么痛点，还是自嗨伪需求？',
      '衡量该界面成功的核心业务指标是什么（留存/转化/降低客诉）？'
    ],
    engineerAction: '拒绝为了“视觉炫酷”而牺牲核心转化效率，从源头理解业务目标。'
  }
]

const isExploded = ref(true)
const activeLayerId = ref('surface')

function toggleExploded() {
  isExploded.value = !isExploded.value
}

function selectLayer(id) {
  activeLayerId.value = id
}
</script>

<template>
  <div class="garrett-card">
    <div class="garrett-header">
      <div>
        <div class="garrett-badge">SPATIAL STACK · 2.5D 立体分层透视模型</div>
        <h3 class="garrett-title">Jesse James Garrett 用户体验五层要素（从抽象战略到具象像素）</h3>
      </div>
      <button class="view-toggle-btn" @click="toggleExploded">
        {{ isExploded ? '⤡ 层叠合拢' : '⤢ 透视展开 (Exploded View)' }}
      </button>
    </div>

    <div class="garrett-body">
      <!-- 2.5D 立体分层展示区 -->
      <div class="stack-viewport">
        <div class="stack-container" :class="{ 'is-exploded': isExploded }">
          <div
            v-for="layer in layers"
            :key="layer.id"
            class="stack-plate"
            :class="{ active: activeLayerId === layer.id }"
            :style="{ '--plate-color': layer.color }"
            @click="selectLayer(layer.id)"
          >
            <div class="plate-inner">
              <span class="plate-level">L{{ layer.level }}</span>
              <span class="plate-name">{{ layer.name }}</span>
              <span class="plate-en">{{ layer.enName }}</span>
              <span class="plate-abs">{{ layer.abstraction }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 选定层级的审查检查器 -->
      <div v-if="layers.find(l => l.id === activeLayerId)" class="layer-detail">
        <div class="detail-header" :style="{ borderLeftColor: layers.find(l => l.id === activeLayerId).color }">
          <div class="detail-tag">层级检查焦点 · Level {{ layers.find(l => l.id === activeLayerId).level }}</div>
          <h4 class="detail-title">
            {{ layers.find(l => l.id === activeLayerId).name }}
            <small>({{ layers.find(l => l.id === activeLayerId).enName }})</small>
          </h4>
          <p class="detail-focus">{{ layers.find(l => l.id === activeLayerId).focus }}</p>
        </div>

        <div class="detail-section">
          <div class="section-title">🔍 专业设计师视角核心审视问题 (Critique Questions)</div>
          <ul class="question-list">
            <li v-for="(q, i) in layers.find(l => l.id === activeLayerId).questions" :key="i">
              {{ q }}
            </li>
          </ul>
        </div>

        <div class="detail-section engineer-box">
          <div class="section-title" style="color: #10b981">
            💻 前端工程师自查与代码防守要点
          </div>
          <p class="engineer-text">{{ layers.find(l => l.id === activeLayerId).engineerAction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.garrett-card {
  margin: 28px 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.garrett-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.garrett-badge {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #c8401e;
  font-weight: 700;
  margin-bottom: 4px;
}

.garrett-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.view-toggle-btn {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  padding: 6px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.view-toggle-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: #c8401e;
  color: #c8401e;
}

.garrett-body {
  display: grid;
  grid-template-columns: 320px 1fr;
  background: var(--vp-c-bg);
}

/* 2.5D Isometric Stack */
.stack-viewport {
  padding: 30px 20px;
  background: var(--vp-c-bg-alt);
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 900px;
}

.stack-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  transform: rotateX(25deg) rotateZ(-8deg);
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.stack-container.is-exploded {
  gap: 20px;
}

.stack-plate {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 12px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
}

.stack-plate::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--plate-color);
  opacity: 0.7;
}

.stack-plate:hover {
  transform: translateZ(12px) scale(1.02);
  border-color: var(--plate-color);
}

.stack-plate.active {
  transform: translateZ(24px) scale(1.04);
  border-color: var(--plate-color);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  background: var(--vp-c-bg-soft);
}

.plate-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 6px;
}

.plate-level {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.plate-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.plate-en {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.plate-abs {
  margin-left: auto;
  font-size: 10px;
  color: var(--plate-color);
  font-weight: 600;
}

/* Detail Section */
.layer-detail {
  padding: 24px;
  background: var(--vp-c-bg);
}

.detail-header {
  border-left: 3px solid #c8401e;
  padding-left: 14px;
  margin-bottom: 20px;
}

.detail-tag {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.detail-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.detail-title small {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.detail-focus {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.detail-section {
  margin-bottom: 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 14px 16px;
  border-radius: 2px;
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.question-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.engineer-box {
  background: rgba(16, 185, 129, 0.04);
  border-color: rgba(16, 185, 129, 0.2);
}

.engineer-text {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .garrett-body {
    grid-template-columns: 1fr;
  }
  .stack-viewport {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
