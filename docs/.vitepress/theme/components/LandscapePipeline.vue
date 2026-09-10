<script setup>
import { ref } from 'vue'

const stages = [
  {
    id: 'strategy',
    num: '01',
    name: '战略与发现',
    enName: 'Strategy & Discovery',
    tag: '输入端',
    color: '#3b82f6',
    summary: '明确商业诉求、业务定位与核心用户画像，输出结构化 PRD。',
    role: '产品经理 (PM) / 用户研究员 (UR)',
    inputs: ['市场商业目标', '业务战略规划', '用户调研问卷 / 访谈录音'],
    outputs: ['产品需求规格说明书 (PRD)', '用户画像 (Personas)', '关键业务成功指标 (KPI/OKR)'],
    contract: '需求边界清晰、业务优先级明确（P0/P1/P2），不存在模棱两可的技术黑话。',
    redLine: '严禁在业务目标尚不清晰、无真实用户诉求验证的情况下直接越级进入 UI 界面绘制。',
    tools: ['Feishu / Notion 文档', 'Miro / FigJam 头脑风暴', '用户访谈分析平台']
  },
  {
    id: 'ux',
    num: '02',
    name: '体验架构',
    enName: 'UX Architecture',
    tag: '认知层',
    color: '#8b5cf6',
    summary: '梳理信息架构（IA）、用户核心任务旅程与线框骨架，验证心智模型。',
    role: '用户体验架构师 (UX Architect) / 交互设计师',
    inputs: ['PRD 业务需求文档', '目标用户使用场景矩阵', '遗留系统数据字典'],
    outputs: ['信息架构图 (IA Map)', '用户旅程图 (User Journey)', '低保真交互原型 (Wireframes)'],
    contract: '任务链路闭环（主干路径不超过 3-4 步跳转）、容错与回退路径完备、遵循认知心理学定律。',
    redLine: '严禁死扣按钮颜色与阴影等表面装饰，而忽视核心任务路径中断、命名认知混淆等致命架构硬伤。',
    tools: ['Figma 线框图', 'Excalidraw 流程图', 'Whimsical 拓扑', 'Maze 原型测试']
  },
  {
    id: 'ui',
    num: '03',
    name: '界面与系统',
    enName: 'UI & Design System',
    tag: '感知层',
    color: '#c8401e',
    summary: '构建 Design Tokens、高保真响应式布局与微动效，统领视觉语言。',
    role: 'UI 设计师 / 视觉系统专家 (Visual Designer)',
    inputs: ['UX 交互线框图', '品牌 VI 调性规范', 'DTCG 跨平台 Token 库'],
    outputs: ['高保真界面设计稿 (Figma Hi-Fi)', '组件变体库 (Variants & States)', '可交互原型与动效规范'],
    contract: '严格基于 8pt 间距系统、定义完整的交互 5 态（Default/Hover/Active/Focus/Disabled）、遵循三层 Token 架构。',
    redLine: '严禁输出脱离工程实现的“反物理概念稿”；严禁随意使用未在设计系统注册的自定义十六进制色值。',
    tools: ['Figma Auto Layout', 'Tokens Studio', 'ProtoPie 复杂动效', 'Jitter 微动效']
  },
  {
    id: 'dev',
    num: '04',
    name: '工程实现',
    enName: 'FE Engineering',
    tag: '代码层',
    color: '#10b981',
    summary: '自动化解析 Design Tokens，映射业务组件库，产出像素级 Staging 环境。',
    role: '前端研发工程师 (FE Engineer) / 设计工程师 (Design Engineer)',
    inputs: ['Figma 标注与 Dev Mode', 'DTCG JSON Tokens', '产品与组件状态机定义'],
    outputs: ['可运行的前端代码 (Vue/React)', 'Storybook 组件文档沙盒', 'PR 预览环境 (Preview Staging)'],
    contract: 'CSS 变量百分之百绑定语义 Token、组件具备完整 TypeScript 接口定义、Storybook 全覆盖边界态。',
    redLine: '严禁前端硬编码行内 `px` 间距或任意魔法数字；严禁丢弃 Hover/Focus/Loading 等非正常默认态。',
    tools: ['Vite / Next.js / Nuxt', 'Tailwind CSS / UnoCSS', 'Storybook', 'Git & CI/CD']
  },
  {
    id: 'qa',
    num: '05',
    name: '质量与度量',
    enName: 'QA & Growth',
    tag: '验收门禁',
    color: '#f59e0b',
    summary: '执行 Design QA 像素比对与 WCAG 2.2 无障碍自动化拦截，埋点数据回流。',
    role: 'Design QA 走查专家 / 测试工程师 / 前端工程师',
    inputs: ['Staging 预发布环境', 'Figma 高保真原稿', 'WCAG 2.2 AA 标准规范'],
    outputs: ['走查 Bug 缺陷清单', 'Lighthouse 无障碍合规审计报告', '线上真实转化埋点看板'],
    contract: '文本对比度必须 $\\ge 4.5:1$、触控热区 $\\ge 24\\text{px}$、键盘 Tab 焦点环 100% 可见、主流视口 0 溢出。',
    redLine: 'WCAG AA 级可访问性硬红线不达标者**拥有一票否决权，严禁合入生产主干**！',
    tools: ['Lighthouse / Axe A11y', 'PixelPerfect 视觉比对', 'BrowserStack 跨端兼容', 'PostHog / Mixpanel']
  }
]

const activeStageId = ref('ux')

function selectStage(id) {
  activeStageId.value = id
}
</script>

<template>
  <div class="pipeline-card">
    <div class="pipeline-header">
      <div class="pipeline-title-group">
        <span class="pipeline-badge">INTERACTIVE PIPELINE · 图形拓扑流水线</span>
        <h3 class="pipeline-title">现代产品研发全生命周期中的设计定位与交互管线</h3>
      </div>
      <span class="pipeline-hint">点击任意阶段节点可下钻查看其输入、契约交付物与防守门禁</span>
    </div>

    <!-- 拓扑流水线视图 (Macro Pipeline Flow) -->
    <div class="pipeline-flow-container">
      <div class="pipeline-track">
        <div
          v-for="(stage, idx) in stages"
          :key="stage.id"
          class="pipeline-node"
          :class="{ active: activeStageId === stage.id }"
          @click="selectStage(stage.id)"
        >
          <!-- 连接线与流动指示 (除最后一个外) -->
          <div v-if="idx < stages.length - 1" class="node-connector">
            <div class="connector-line"></div>
            <div class="connector-pulse"></div>
          </div>

          <div class="node-header">
            <span class="node-num">{{ stage.num }}</span>
            <span class="node-tag" :style="{ borderColor: stage.color, color: stage.color }">{{ stage.tag }}</span>
          </div>
          <div class="node-name">{{ stage.name }}</div>
          <div class="node-en">{{ stage.enName }}</div>
          
          <div class="node-indicator" :style="{ backgroundColor: stage.color }"></div>
        </div>
      </div>
    </div>

    <!-- 微观检查器联动面板 (Micro Inspector View) -->
    <transition name="inspector-fade" mode="out-in">
      <div
        v-if="stages.find(s => s.id === activeStageId)"
        :key="activeStageId"
        class="inspector-panel"
      >
        <div class="inspector-top" :style="{ borderLeftColor: stages.find(s => s.id === activeStageId).color }">
          <div class="inspector-headline">
            <span class="inspector-stage-num">{{ stages.find(s => s.id === activeStageId).num }}</span>
            <div class="inspector-names">
              <h4>{{ stages.find(s => s.id === activeStageId).name }} <small>({{ stages.find(s => s.id === activeStageId).enName }})</small></h4>
              <p class="inspector-summary">{{ stages.find(s => s.id === activeStageId).summary }}</p>
            </div>
          </div>
          <div class="inspector-role">
            <span class="role-label">主导角色</span>
            <span class="role-val">{{ stages.find(s => s.id === activeStageId).role }}</span>
          </div>
        </div>

        <div class="inspector-grid">
          <!-- 上下游数据契约 -->
          <div class="inspector-col">
            <div class="col-title">
              <span class="col-icon">📥</span> 必备输入依赖 (Inputs)
            </div>
            <ul class="col-list">
              <li v-for="(inp, i) in stages.find(s => s.id === activeStageId).inputs" :key="i">{{ inp }}</li>
            </ul>
          </div>

          <div class="inspector-col">
            <div class="col-title">
              <span class="col-icon">📤</span> 标准交付契约物 (Artifacts)
            </div>
            <ul class="col-list contract-out">
              <li v-for="(out, i) in stages.find(s => s.id === activeStageId).outputs" :key="i">{{ out }}</li>
            </ul>
          </div>

          <div class="inspector-col full-width">
            <div class="col-title">
              <span class="col-icon">⚖️</span> 契约标准与成败准则 (Contract Criterion)
            </div>
            <p class="contract-text">{{ stages.find(s => s.id === activeStageId).contract }}</p>
          </div>

          <div class="inspector-col full-width red-line-box">
            <div class="col-title" style="color:#ef4444">
              <span class="col-icon">🛑</span> 严防红线 (Blocking Red Line)
            </div>
            <p class="red-line-text">{{ stages.find(s => s.id === activeStageId).redLine }}</p>
          </div>

          <div class="inspector-col full-width tools-box">
            <span class="tools-label">工序核心工具集：</span>
            <span
              v-for="(tool, i) in stages.find(s => s.id === activeStageId).tools"
              :key="i"
              class="tool-chip"
            >{{ tool }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.pipeline-card {
  margin: 28px 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}

.pipeline-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.pipeline-badge {
  font-family: 'Space Grotesk', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #c8401e;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.pipeline-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.pipeline-hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* Flow Track */
.pipeline-flow-container {
  padding: 24px 20px;
  overflow-x: auto;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.pipeline-track {
  display: flex;
  align-items: stretch;
  gap: 20px;
  min-width: 720px;
}

.pipeline-node {
  flex: 1;
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 14px 16px 16px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.pipeline-node:hover {
  border-color: var(--vp-c-text-2);
  transform: translateY(-2px);
}

.pipeline-node.active {
  border-color: #c8401e;
  background: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(200, 64, 30, 0.08);
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.node-num {
  font-family: 'Space Grotesk', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.pipeline-node.active .node-num {
  color: #c8401e;
}

.node-tag {
  font-size: 10px;
  padding: 1px 6px;
  border: 1px solid;
  border-radius: 2px;
  font-weight: 600;
}

.node-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.node-en {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

.node-indicator {
  height: 3px;
  width: 100%;
  margin-top: auto;
  border-radius: 1px;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.pipeline-node.active .node-indicator {
  opacity: 1;
}

/* Connector Line & Pulse */
.node-connector {
  position: absolute;
  top: 50%;
  right: -21px;
  width: 20px;
  height: 2px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
}

.connector-line {
  width: 100%;
  height: 100%;
  background: var(--vp-c-divider);
}

.connector-pulse {
  position: absolute;
  top: -2px;
  left: 0;
  width: 6px;
  height: 6px;
  background: #c8401e;
  border-radius: 50%;
  animation: pulseMove 2.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
}

@keyframes pulseMove {
  0% { left: 0; opacity: 0.2; }
  50% { opacity: 1; }
  100% { left: 16px; opacity: 0.2; }
}

/* Inspector Panel */
.inspector-panel {
  padding: 20px 24px;
  background: var(--vp-c-bg);
}

.inspector-top {
  border-left: 3px solid #c8401e;
  padding-left: 14px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.inspector-stage-num {
  font-family: 'Space Grotesk', monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  line-height: 1;
  margin-right: 12px;
}

.inspector-headline {
  display: flex;
  align-items: center;
}

.inspector-headline h4 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.inspector-headline small {
  font-size: 13px;
  font-weight: normal;
  color: var(--vp-c-text-3);
}

.inspector-summary {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.inspector-role {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  padding: 6px 12px;
  border-radius: 2px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
}

.role-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

.role-val {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.inspector-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.inspector-col {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 14px 16px;
  border-radius: 2px;
}

.inspector-col.full-width {
  grid-column: 1 / -1;
}

.col-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.col-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.contract-out li {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.contract-text {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.red-line-box {
  background: rgba(239, 68, 68, 0.04);
  border-color: rgba(239, 68, 68, 0.2);
}

.red-line-text {
  margin: 0;
  font-size: 13px;
  color: #dc2626;
  font-weight: 600;
  line-height: 1.6;
}

.tools-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 14px;
}

.tools-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.tool-chip {
  font-size: 11px;
  font-family: 'Space Grotesk', monospace;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 8px;
  border-radius: 2px;
  color: var(--vp-c-text-1);
}

/* Animations */
.inspector-fade-enter-active,
.inspector-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.inspector-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.inspector-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .inspector-grid {
    grid-template-columns: 1fr;
  }
}
</style>
