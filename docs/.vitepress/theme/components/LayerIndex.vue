<script setup>
const sections = [
  {
    num: '00',
    name: '全景大图与体系定位 · Overview',
    desc: '从现代产品研发全生命周期（PRD → UI/UX → Dev → QA）审视设计的真实定位、20 年交付 SOP 演化（Photoshop → Sketch → Figma/Tokens）与本站聚焦边界。',
    links: [
      ['全景大图与定位', '/overview/design-landscape'],
      ['设计工作流与 SOP', '/process/design-process']
    ]
  },
  {
    num: '01',
    name: '工程师及格线与基石 · Foundations',
    desc: '让工程师 15 分钟建立专业设计及格线（8pt 间距、三级灰阶、CRAP 原则）、信息架构（IA）核心系统、9 本经典书籍共性提炼与界面度量衡。',
    links: [
      ['工程师设计及格线', '/foundations/quickstart'],
      ['信息架构 IA 全景', '/foundations/information-architecture'],
      ['经典书籍共性提炼', '/books/design-books'],
      ['核心术语速查', '/foundations/term'],
      ['屏幕度量衡', '/foundations/concept-unit']
    ]
  },
  {
    num: '02',
    name: '法则、心理学与红线 · Principles',
    desc: 'UX 心理学法则 26 条全量沉淀、格式塔知觉组织原则 10 大定律、WCAG 2.2 无障碍硬指标与已证伪设计教条深度考据。',
    links: [
      ['UX 心理学法则', '/principles/lawsofux'],
      ['格式塔知觉原则', '/principles/gestalt'],
      ['启发式与 WCAG', '/principles/heuristics-wcag'],
      ['已证伪设计教条', '/principles/falsified-dogmas']
    ]
  },
  {
    num: '03',
    name: '三大高频实战工作流 · Playbooks',
    desc: '直接服务工程高频场景：上线前 10 分钟设计走查（Checklist）、设计系统风格选型与 DTCG Token 重构指南、专业级设计批评与审视框架。',
    links: [
      ['设计走查体检表', '/workflows/design-review'],
      ['风格选型与重构', '/workflows/style-refactor'],
      ['专业设计审视', '/workflows/professional-critique'],
      ['产品约束矩阵', '/patterns/product-patterns'],
      ['设计语言索引', '/languages/design-languages']
    ]
  },
  {
    num: '04',
    name: '资源生态与符号雷达 · Hubs & Tools',
    desc: '交互式工具状态雷达（带生命周期与协议风险）、大厂官方设计团队博客与精品周刊矩阵、14 位大师思想图谱与真实产品交互库。',
    links: [
      ['工具状态雷达', '/resources/hubs-tools'],
      ['学习与博客矩阵', '/resources/hubs-learning'],
      ['先驱思想图谱', '/resources/hubs-designers'],
      ['真实产品灵感库', '/resources/hubs-inspiration']
    ]
  }
]
</script>

<template>
  <nav class="ld-layers" aria-label="知识体系大图">
    <p class="ld-eyebrow" style="margin:0 0 12px">知识大图与层次演进 · Knowledge Architecture</p>
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
