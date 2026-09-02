import { defineConfig } from 'vitepress'

// 知识地图与 README.md 保持一致：六层认知管线
export default defineConfig({
  lang: 'zh-CN',
  title: 'Learn Design',
  description: '体系化设计认知知识库：法则、启发式、流程、设计语言、产品模式与三类 hub 地图',
  srcExclude: ['_draft/**'],
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    siteTitle: 'Learn Design',
    nav: [
      { text: '知识地图', link: '/' },
      { text: '法则', link: '/principles/lawsofux' },
      { text: 'Hub', link: '/resources/hubs-designers' },
      { text: 'GitHub', link: 'https://github.com/zenHeart/learn-design' }
    ],
    sidebar: [
      {
        text: '① 认知入口',
        collapsed: false,
        items: [
          { text: '经典书籍共性提炼', link: '/books/design-books' },
          { text: '术语', link: '/foundations/term' },
          { text: '设计单位', link: '/foundations/concept-unit' },
          { text: '出血 Bleed', link: '/foundations/concept-bleeding' }
        ]
      },
      {
        text: '② 判断依据',
        collapsed: false,
        items: [
          { text: 'UX 设计法则（26 条）', link: '/principles/lawsofux' },
          { text: '启发式与 WCAG 基线', link: '/principles/heuristics-wcag' }
        ]
      },
      {
        text: '③ 方法流程',
        collapsed: false,
        items: [{ text: '设计工作流与流程体系', link: '/process/design-process' }]
      },
      {
        text: '④ 参照体系',
        collapsed: false,
        items: [{ text: '主流设计语言索引', link: '/languages/design-languages' }]
      },
      {
        text: '⑤ 场景落地',
        collapsed: false,
        items: [{ text: '产品类型约束矩阵', link: '/patterns/product-patterns' }]
      },
      {
        text: '⑥ 持续追踪 · Hubs',
        collapsed: false,
        items: [
          { text: '设计师 Hub', link: '/resources/hubs-designers' },
          { text: '灵感资源 Hub', link: '/resources/hubs-inspiration' },
          { text: '学习索引 Hub', link: '/resources/hubs-learning' },
          { text: '工具 Hub', link: '/resources/hubs-tools' }
        ]
      }
    ],
    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zenHeart/learn-design' }],
    search: { provider: 'local' },
    footer: {
      message: '面向 agent 与工程师的设计判断层知识库',
      copyright: 'zenHeart'
    }
  }
})
