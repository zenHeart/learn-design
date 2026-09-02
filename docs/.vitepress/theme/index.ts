// 站点主题入口：默认主题 + 自有设计语言（印刷档案 × 瑞士网格 × 编辑排版）
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import './custom.css'
import HeroManifest from './components/HeroManifest.vue'
import LayerIndex from './components/LayerIndex.vue'
import StatsBand from './components/StatsBand.vue'
import LawIndex from './components/LawIndex.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HeroManifest', HeroManifest)
    app.component('LayerIndex', LayerIndex)
    app.component('StatsBand', StatsBand)
    app.component('LawIndex', LawIndex)
  }
}
