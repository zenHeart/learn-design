import { defineConfig } from 'vitepress'

// 现代设计工程知识架构：顶栏克制意图化 + 侧边栏大图先行体系化
export default defineConfig({
  lang: 'zh-CN',
  title: 'Learn Design',
  description: '面向工程师与 Agent 的现代设计工程知识库：全景大图、及格线基石、三大实战工作流与资源雷达',
  srcExclude: ['_draft/**'],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }]
  ],
  themeConfig: {
    siteTitle: 'Learn Design',
    // 顶栏克制收敛：坚决杜绝平铺多个无意义章节目录，保留 4 个高阶心智意图入口
    nav: [
      { text: '全景大图', link: '/overview/design-landscape' },
      { text: '及格线与基石', link: '/foundations/quickstart' },
      { text: '实战工作流', link: '/workflows/design-review' },
      { text: '灵感与资源', link: '/resources/hubs-tools' }
    ],
    // 侧边栏：大图先行 -> 基础及格线 -> 法则与心理学 -> 实战 Playbooks -> 资源雷达
    sidebar: [
      {
        text: '🗺️ 全景与体系 (Overview)',
        collapsed: false,
        items: [
          { text: '现代研发全景大图与定位', link: '/overview/design-landscape' },
          { text: '设计工作流与协同 SOP', link: '/process/design-process' }
        ]
      },
      {
        text: '📐 工程师及格线与基石 (Foundations)',
        collapsed: false,
        items: [
          { text: '工程师设计及格线 (15分钟及格)', link: '/foundations/quickstart' },
          { text: '信息架构核心体系 (IA 全景)', link: '/foundations/information-architecture' },
          { text: '经典设计书籍共性提炼', link: '/books/design-books' },
          { text: 'UI/UX 核心术语速查表', link: '/foundations/term' },
          { text: '数字界面度量衡 (屏幕单位)', link: '/foundations/concept-unit' },
          { text: '从印刷出血到现代安全区', link: '/foundations/concept-bleeding' }
        ]
      },
      {
        text: '⚖️ 法则、心理学与红线 (Principles)',
        collapsed: false,
        items: [
          { text: '个人设计哲学与工作区原则', link: '/principles/personal-design-philosophy' },
          { text: 'UX 设计法则 (26 条全量)', link: '/principles/lawsofux' },
          { text: '格式塔知觉组织原则 (10 大法则)', link: '/principles/gestalt' },
          { text: '可用性启发式与 WCAG 基线', link: '/principles/heuristics-wcag' },
          { text: '已证伪设计教条深度考据', link: '/principles/falsified-dogmas' }
        ]
      },
      {
        text: '🛠️ 实战落地指南 (Playbooks)',
        collapsed: false,
        items: [
          { text: '场景 A：设计走查体检表 (Design Review)', link: '/workflows/design-review' },
          { text: '场景 B：风格选型与重构指南 (Style Refactor)', link: '/workflows/style-refactor' },
          { text: '场景 C：专业设计审视框架 (Critique)', link: '/workflows/professional-critique' },
          { text: '场景 D：产品类型设计约束矩阵', link: '/patterns/product-patterns' },
          { text: '场景 E：主流设计语言索引与借鉴', link: '/languages/design-languages' }
        ]
      },
      {
        text: '🧭 资源生态与符号雷达 (Hubs & Tools)',
        collapsed: false,
        items: [
          { text: '工具 Hub · 状态雷达', link: '/resources/hubs-tools' },
          { text: '学习索引 Hub · 官方博客与周刊', link: '/resources/hubs-learning' },
          { text: '设计师 Hub · 先驱与思想图谱', link: '/resources/hubs-designers' },
          { text: '灵感资源 Hub · 真实产品库', link: '/resources/hubs-inspiration' }
        ]
      }
    ],
    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zenHeart/learn-design' }],
    search: { provider: 'local' },
    footer: {
      message: '面向工程师与 Agent 的现代设计工程知识库 · 印刷档案 × 瑞士网格 × 编辑排版',
      copyright: 'zenHeart'
    }
  }
})
