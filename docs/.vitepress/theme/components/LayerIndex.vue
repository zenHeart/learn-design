<script setup>
const layers = [
  {
    num: '01', name: '认知入口', desc: '经典设计书籍的跨书共性 → 四层认知模型；术语、单位与印刷基础。',
    links: [['书籍共性', '/books/design-books'], ['术语', '/foundations/term']]
  },
  {
    num: '02', name: '判断依据', desc: 'UX 心理学法则 26 条、Nielsen 十启发式、WCAG 2.2 无障碍硬数字。',
    links: [['UX 法则', '/principles/lawsofux'], ['启发式与 WCAG', '/principles/heuristics-wcag']]
  },
  {
    num: '03', name: '方法流程', desc: '双钻模型、Design Sprint、IBM EDT、Lean UX 与设计系统工作流。',
    links: [['流程体系', '/process/design-process']]
  },
  {
    num: '04', name: '参照体系', desc: 'Material 3、Apple HIG、Fluent 2、Ant Design v6 等设计语言官方索引与借鉴点。',
    links: [['设计语言索引', '/languages/design-languages']]
  },
  {
    num: '05', name: '场景落地', desc: '七类产品的约束矩阵、高频模式，以及三条已证伪的过时教条。',
    links: [['产品约束矩阵', '/patterns/product-patterns']]
  },
  {
    num: '06', name: '持续追踪 · Hubs', desc: '设计师、灵感资源、学习索引、工具四类独立 hub，全部条目带存活状态与取用日期。',
    links: [['设计师', '/resources/hubs-designers'], ['灵感', '/resources/hubs-inspiration'], ['学习', '/resources/hubs-learning'], ['工具', '/resources/hubs-tools']]
  }
]
</script>

<template>
  <nav class="ld-layers" aria-label="知识地图">
    <p class="ld-eyebrow" style="margin:0 0 12px">知识地图 · Knowledge Map</p>
    <!-- 纪律：锚点不可嵌套（HTML 解析规则），行容器用 div，导航走右侧链接 -->
    <div v-for="l in layers" :key="l.num" class="ld-layer-row">
      <span class="ld-layer-num">{{ l.num }}</span>
      <span>
        <span class="ld-layer-name">{{ l.name }}</span>
        <span class="ld-layer-desc" style="display:block">{{ l.desc }}</span>
      </span>
      <span class="ld-layer-links">
        <a v-for="[t, href] in l.links" :key="href" :href="href">{{ t }}</a>
      </span>
    </div>
  </nav>
</template>
