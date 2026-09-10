<script setup>
const sections = [
  {
    num: '01',
    name: '实战工作流 · Playbooks',
    desc: '直接服务三大高频场景：设计走查体检表（可执行 Checklist）、风格选型与重构指南、专业设计师审视框架。',
    links: [
      ['设计走查', '/workflows/design-review'],
      ['风格重构', '/workflows/style-refactor'],
      ['专业审视', '/workflows/professional-critique']
    ]
  },
  {
    num: '02',
    name: '基础认知 · Foundations',
    desc: '工程师设计及格线（15分钟上手）、信息架构（IA）核心体系、9 本经典书籍共性、核心术语速查与屏幕单位。',
    links: [
      ['新手及格线', '/foundations/quickstart'],
      ['信息架构 IA', '/foundations/information-architecture'],
      ['书籍共性', '/books/design-books'],
      ['核心术语', '/foundations/term'],
      ['屏幕单位', '/foundations/concept-unit']
    ]
  },
  {
    num: '03',
    name: '法则与规范 · Principles',
    desc: 'UX 心理学法则 26 条全量沉淀、Nielsen 十启发式与 WCAG 2.2 硬数字、格式塔 10 大知觉法则、已证伪教条考据。',
    links: [
      ['UX 法则', '/principles/lawsofux'],
      ['启发式与 WCAG', '/principles/heuristics-wcag'],
      ['格式塔知觉', '/principles/gestalt'],
      ['已证伪教条', '/principles/falsified-dogmas']
    ]
  },
  {
    num: '04',
    name: '方法流程 · Process',
    desc: '双钻模型、Design Sprint、IBM EDT、Lean UX 流程对照与跨体系 7 条共性审查原则。',
    links: [['流程体系', '/process/design-process']]
  },
  {
    num: '05',
    name: '设计系统 · Languages',
    desc: 'Material 3、Apple HIG、Fluent 2、Ant Design v6 等主流设计语言官方索引与核心借鉴点。',
    links: [['设计系统索引', '/languages/design-languages']]
  },
  {
    num: '06',
    name: '场景模式 · Patterns',
    desc: 'B2B SaaS 仪表盘、AI 对话与 Agent（微软 HAX + Google PAIR）、落地页与移动端约束矩阵。',
    links: [['产品约束矩阵', '/patterns/product-patterns']]
  },
  {
    num: '07',
    name: '资源生态 · Hubs',
    desc: '工具效能、灵感资源、学习索引、设计师 4 类独立 Hub，全部条目带 HTTP 实证状态与存活标记。',
    links: [
      ['工具 Hub', '/resources/hubs-tools'],
      ['灵感 Hub', '/resources/hubs-inspiration'],
      ['学习 Hub', '/resources/hubs-learning'],
      ['设计师 Hub', '/resources/hubs-designers']
    ]
  }
]
</script>

<template>
  <nav class="ld-layers" aria-label="知识地图">
    <p class="ld-eyebrow" style="margin:0 0 12px">知识地图 · Knowledge Map</p>
    <div v-for="s in sections" :key="s.num" class="ld-layer-row">
      <span class="ld-layer-num">{{ s.num }}</span>
      <span>
        <span class="ld-layer-name">{{ s.name }}</span>
        <span class="ld-layer-desc" style="display:block">{{ s.desc }}</span>
      </span>
      <span class="ld-layer-links">
        <a v-for="[t, href] in s.links" :key="href" :href="href">{{ t }}</a>
      </span>
    </div>
  </nav>
</template>
