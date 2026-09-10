<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    default: 'all'
  }
})

const resources = [
  // —— 顶级大厂设计团队与官方博客 ——
  {
    name: 'Airbnb Design',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'airbnb.design',
    url: 'https://airbnb.design',
    badge: '设计系统先驱',
    status: 'active',
    desc: '全球设计系统工程化标杆。首创跨平台 Token 交付流水线，深度探讨设计与工程的一体化协同机制。',
    tag: 'Design System · Tokens'
  },
  {
    name: 'Linear Readme',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'linear.app/readme',
    url: 'https://linear.app/readme',
    badge: '极简与速度',
    status: 'active',
    desc: '现代软件质感的天花板。探讨工匠精神、键盘优先（Keyboard-first）交互与微动效细节设计。',
    tag: 'Craft · Interaction'
  },
  {
    name: 'Stripe Increment',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'increment.com',
    url: 'https://increment.com',
    badge: '工程与设计季刊',
    status: 'archive',
    desc: 'Stripe 出品的顶级软件工程与设计杂志。对 API 设计、Design Systems 治理有系统性长篇复盘。',
    tag: 'Architecture · Engineering'
  },
  {
    name: 'Apple Developer Design',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'developer.apple.com/design',
    url: 'https://developer.apple.com/design',
    badge: '平台一致性',
    status: 'active',
    desc: 'Human Interface Guidelines 官方策源地。以“决策理由”撰写规范的范本，无障碍默认内建。',
    tag: 'HIG · Liquid Glass'
  },
  {
    name: 'Vercel Design',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'vercel.com/design',
    url: 'https://vercel.com/design',
    badge: '现代 Web 审美',
    status: 'active',
    desc: '极简黑白灰阶、精准 1px 细线边框与极致排版韵律的代表。Geist 设计系统官方出处。',
    tag: 'Geist · Typography'
  },
  {
    name: 'Figma Blog',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'figma.com/blog',
    url: 'https://www.figma.com/blog',
    badge: '工具与协作',
    status: 'active',
    desc: '现代设计工具演进前沿。深度探讨 Auto Layout、Variables、Dev Mode 与设计工程化生态。',
    tag: 'Tooling · Collaboration'
  },
  {
    name: '腾讯 CDC',
    category: 'tech-team',
    categoryLabel: '国内顶尖',
    domain: 'cdc.tencent.com',
    url: 'https://cdc.tencent.com',
    badge: '用户研究殿堂',
    status: 'active',
    desc: '腾讯用户研究与体验设计部。二十年来国内用研、服务设计与大型互联网产品体验评估的权威源泉。',
    tag: 'User Research · UX'
  },
  {
    name: 'Uber Design',
    category: 'tech-team',
    categoryLabel: '大厂官方',
    domain: 'uber.design',
    url: 'https://uber.design',
    badge: 'Base 设计系统',
    status: 'active',
    desc: '复杂物理世界与数字世界调度的界面范本。开源 Base Web 组件库与严苛的无障碍体系。',
    tag: 'Base Web · Global'
  },

  // —— 独立设计周刊与先锋专栏 (含 rss-workflow 精选) ——
  {
    name: 'DEX 周刊',
    category: 'publication',
    categoryLabel: '精选周刊',
    domain: 'dexgroup.substack.com',
    url: 'https://dexgroup.substack.com',
    badge: '中文产品精选',
    status: 'active',
    desc: '前沿产品、设计思潮与独立开发者视角的中文优质周刊。跨界审视技术、商业与体验设计。',
    tag: 'Product · Thoughts'
  },
  {
    name: 'Smashing Magazine',
    category: 'publication',
    categoryLabel: '权威杂志',
    domain: 'smashingmagazine.com',
    url: 'https://www.smashingmagazine.com',
    badge: 'Web 体验常青树',
    status: 'active',
    desc: '全球前端与 UX 设计师必读杂志。深度探讨可访问性、流体排版、CSS 架构与真实用户测试案例。',
    tag: 'UX · CSS · A11y'
  },
  {
    name: 'CSS-Tricks',
    category: 'publication',
    categoryLabel: '经典专栏',
    domain: 'css-tricks.com',
    url: 'https://css-tricks.com',
    badge: '前端视觉解密',
    status: 'active',
    desc: '从布局网格、微动效到 SVG 高级滤镜，前端工程师理解视觉呈现最直接的代码级灵感宝库。',
    tag: 'CSS · Layout'
  },
  {
    name: 'Sidebar.io',
    category: 'publication',
    categoryLabel: '每日精选',
    domain: 'sidebar.io',
    url: 'https://sidebar.io',
    badge: '每日 5 链接',
    status: 'active',
    desc: '十余年如一日，每天人工精选 5 个全球最值得看的设计与工程链接，信噪比极高。',
    tag: 'Daily Curation'
  },
  {
    name: 'Lynn Fisher',
    category: 'publication',
    categoryLabel: '先锋艺术',
    domain: 'lynnandtonic.com',
    url: 'https://lynnandtonic.com',
    badge: 'CSS 纯手工艺术',
    status: 'active',
    desc: 'A Single Div 创作者。探索纯 CSS 的表现力极限与响应式流体设计的趣味实验。',
    tag: 'Creative · Single Div'
  },
  {
    name: 'Bram.us',
    category: 'publication',
    categoryLabel: '规范先锋',
    domain: 'bram.us',
    url: 'https://www.bram.us',
    badge: 'Chrome 开发者倡导者',
    status: 'active',
    desc: '深度解析 View Transitions、Scroll-driven 动效等前沿 W3C 规范的第一手实验报告。',
    tag: 'View Transitions · W3C'
  },
  {
    name: '张鑫旭 - 鑫空间',
    category: 'publication',
    categoryLabel: '中文经典',
    domain: 'zhangxinxu.com',
    url: 'https://www.zhangxinxu.com/wordpress/',
    badge: 'CSS 世界探微',
    status: 'active',
    desc: '国内 CSS 领域的定海神针。对视觉呈现原理、原生语义化控件与边界特性的剖析深入骨髓。',
    tag: 'CSS 原理 · 可访问性'
  },
  {
    name: 'UX Collective',
    category: 'publication',
    categoryLabel: '行业思潮',
    domain: 'uxdesign.cc',
    url: 'https://uxdesign.cc',
    badge: 'Medium 顶流刊物',
    status: 'active',
    desc: '全球 UX 思考者与批评者的大本营。深度反思 Dark Patterns、AI 时代的界面伦理与设计批判。',
    tag: 'Critique · Ethics'
  }
]

const activeCategory = ref(props.category)

const filteredResources = computed(() => {
  if (activeCategory.value === 'all') return resources
  return resources.filter(r => r.category === activeCategory.value)
})
</script>

<template>
  <div class="ld-resource-section">
    <!-- 聚类过滤控制条 -->
    <div class="ld-filter-tabs">
      <button 
        :class="['ld-filter-tab', { active: activeCategory === 'all' }]"
        @click="activeCategory = 'all'"
      >
        全部源 ({{ resources.length }})
      </button>
      <button 
        :class="['ld-filter-tab', { active: activeCategory === 'tech-team' }]"
        @click="activeCategory = 'tech-team'"
      >
        🏛️ 大厂设计团队 ({{ resources.filter(r => r.category === 'tech-team').length }})
      </button>
      <button 
        :class="['ld-filter-tab', { active: activeCategory === 'publication' }]"
        @click="activeCategory = 'publication'"
      >
        📰 精品周刊与先锋专栏 ({{ resources.filter(r => r.category === 'publication').length }})
      </button>
    </div>

    <!-- 卡片网格墙 -->
    <div class="ld-resource-grid">
      <a 
        v-for="item in filteredResources" 
        :key="item.name" 
        :href="item.url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="ld-res-card"
      >
        <div class="ld-res-header">
          <div class="ld-res-avatar">
            {{ item.name.charAt(0) }}
          </div>
          <div class="ld-res-meta">
            <span class="ld-res-title">{{ item.name }}</span>
            <span class="ld-res-domain">{{ item.domain }}</span>
          </div>
          <span class="ld-res-badge">{{ item.badge }}</span>
        </div>

        <p class="ld-res-desc">{{ item.desc }}</p>

        <div class="ld-res-footer">
          <span class="ld-res-tag">{{ item.tag }}</span>
          <span class="ld-res-link-btn">
            访问 ↗
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.ld-resource-section {
  margin: 24px 0 40px;
}

.ld-filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--ld-line);
  padding-bottom: 12px;
}

.ld-filter-tab {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 2px;
  border: 1px solid var(--ld-line);
  background: transparent;
  color: var(--ld-text-2);
  cursor: pointer;
  transition: all var(--ld-d-base) ease;
}

.ld-filter-tab:hover {
  border-color: var(--ld-accent);
  color: var(--ld-accent);
}

.ld-filter-tab.active {
  background: var(--ld-accent);
  border-color: var(--ld-accent);
  color: #fff;
  font-weight: 500;
}

.ld-resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.ld-res-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--ld-line);
  border-radius: 2px;
  background: var(--ld-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: transform var(--ld-d-base) ease, border-color var(--ld-d-base) ease;
}

.ld-res-card:hover {
  transform: translateY(-2px);
  border-color: var(--ld-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.ld-res-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.ld-res-avatar {
  width: 38px;
  height: 38px;
  border-radius: 2px;
  background: var(--ld-bg);
  border: 1px solid var(--ld-line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ld-font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--ld-accent);
  flex-shrink: 0;
}

.ld-res-meta {
  flex: 1;
  min-width: 0;
}

.ld-res-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--ld-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ld-res-domain {
  display: block;
  font-size: 11px;
  font-family: var(--ld-font-mono);
  color: var(--ld-text-3);
}

.ld-res-badge {
  font-size: 11px;
  padding: 2px 6px;
  background: var(--ld-accent-soft);
  color: var(--ld-accent);
  border-radius: 2px;
  white-space: nowrap;
}

.ld-res-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ld-text-2);
  margin: 0 0 16px 0;
  flex: 1;
}

.ld-res-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px dashed var(--ld-line);
}

.ld-res-tag {
  font-size: 11px;
  font-family: var(--ld-font-mono);
  color: var(--ld-text-3);
}

.ld-res-link-btn {
  font-size: 12px;
  font-weight: 500;
  color: var(--ld-accent);
}
</style>
