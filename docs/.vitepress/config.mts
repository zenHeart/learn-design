import { defineConfig } from 'vitepress'

// 知识架构：两轨四柱（实战任务轨 + 知识基座轨）
export default defineConfig({
  lang: 'zh-CN',
  title: 'Learn Design',
  description: '面向 Agent 与工程师的设计判断层知识库：实战工作流、基础认知、法则规范、产品模式与资源地图',
  srcExclude: ['_draft/**'],
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    siteTitle: 'Learn Design',
    nav: [
      { text: '知识地图', link: '/' },
      { text: '实战工作流', link: '/workflows/design-review' },
      { text: '基础认知', link: '/foundations/quickstart' },
      { text: '法则与规范', link: '/principles/lawsofux' },
      { text: '产品模式', link: '/patterns/product-patterns' },
      { text: '设计系统', link: '/languages/design-languages' },
      { text: '资源 Hubs', link: '/resources/hubs-tools' },
      { text: 'GitHub', link: 'https://github.com/zenHeart/learn-design' }
    ],
    sidebar: [
      {
        text: '🛠️ 实战工作流 (Playbooks)',
        collapsed: false,
        items: [
          { text: '场景 A：设计走查体检表', link: '/workflows/design-review' },
          { text: '场景 B：风格选型与重构指南', link: '/workflows/style-refactor' },
          { text: '场景 C：专业设计审视框架', link: '/workflows/professional-critique' }
        ]
      },
      {
        text: '📚 基础认知 (Foundations)',
        collapsed: false,
        items: [
          { text: '工程师设计及格线 (新手15分钟)', link: '/foundations/quickstart' },
          { text: '信息架构核心体系 (IA 全景)', link: '/foundations/information-architecture' },
          { text: '经典设计书籍共性提炼', link: '/books/design-books' },
          { text: 'UI/UX 核心术语速查表', link: '/foundations/term' },
          { text: '数字界面度量衡 (屏幕单位全解)', link: '/foundations/concept-unit' },
          { text: '从印刷出血到现代安全区', link: '/foundations/concept-bleeding' }
        ]
      },
      {
        text: '⚖️ 法则与合规基线 (Principles)',
        collapsed: false,
        items: [
          { text: 'UX 设计法则 (26 条全量)', link: '/principles/lawsofux' },
          { text: '可用性启发式与 WCAG 基线', link: '/principles/heuristics-wcag' },
          { text: '格式塔知觉组织原则 (10 大法则)', link: '/principles/gestalt' },
          { text: '已证伪设计教条深度考据', link: '/principles/falsified-dogmas' }
        ]
      },
      {
        text: '🔄 方法与流程 (Process)',
        collapsed: false,
        items: [
          { text: '设计工作流与流程体系', link: '/process/design-process' }
        ]
      },
      {
        text: '🏛️ 设计系统与语言 (Languages)',
        collapsed: false,
        items: [
          { text: '主流设计语言索引与借鉴点', link: '/languages/design-languages' }
        ]
      },
      {
        text: '📐 产品模式与约束 (Patterns)',
        collapsed: false,
        items: [
          { text: '产品类型设计约束矩阵', link: '/patterns/product-patterns' }
        ]
      },
      {
        text: '🧭 资源生态 (Resource Hubs)',
        collapsed: false,
        items: [
          { text: '工具与效能 Hub', link: '/resources/hubs-tools' },
          { text: '灵感资源 Hub', link: '/resources/hubs-inspiration' },
          { text: '学习索引 Hub', link: '/resources/hubs-learning' },
          { text: '设计师 Hub', link: '/resources/hubs-designers' }
        ]
      }
    ],
    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zenHeart/learn-design' }],
    search: { provider: 'local' },
    footer: {
      message: '面向 Agent 与工程师的设计判断层知识库',
      copyright: 'zenHeart'
    }
  }
})
