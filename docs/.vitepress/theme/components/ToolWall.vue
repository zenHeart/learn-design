<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initialGroup: {
    type: String,
    default: 'all'
  }
})

const tools = [
  // 1. 原型与设计系统协同
  {
    name: 'Figma',
    group: 'prototype',
    groupLabel: '原型与协同',
    category: 'UI 协同',
    status: 'active',
    statusText: '行业标准',
    domain: 'figma.com',
    url: 'https://www.figma.com',
    desc: '全球设计协同与设计系统事实标准。强大的 Auto Layout、Variables 与 Dev Mode。',
    note: '已全面支持跨端变量与设计令牌导出。'
  },
  {
    name: 'Penpot',
    group: 'prototype',
    groupLabel: '原型与协同',
    category: '开源替代',
    status: 'active',
    statusText: '开源标杆',
    domain: 'penpot.app',
    url: 'https://penpot.app',
    desc: '基于 Web 与 SVG 标准的开源设计与原型平台。天然贴合 CSS Grid 与 Flexbox。',
    note: '适合企业私有化部署与代码高度洁癖团队。'
  },
  {
    name: 'Framer',
    group: 'prototype',
    groupLabel: '原型与协同',
    category: '代码级原型',
    status: 'active',
    statusText: '生产级发布',
    domain: 'framer.com',
    url: 'https://www.framer.com',
    desc: '从设计稿直接发布为高保真响应式网站，动效曲线与 React 组件无缝连接。',
    note: '适合独立创作者与产品营销落地页。'
  },
  {
    name: 'Adobe XD',
    group: 'prototype',
    groupLabel: '原型与协同',
    category: '历史工具',
    status: 'eol',
    statusText: '停止新功能',
    domain: 'adobe.com',
    url: 'https://www.adobe.com/products/xd.html',
    desc: '曾作为 Sketch/Figma 竞品，目前处于维护模式，已停止新功能开发。',
    note: '审阅选型时应排除，避免技术栈锁定。'
  },

  // 2. 矢量图标与字体工程
  {
    name: 'SF Symbols',
    group: 'icons',
    groupLabel: '图标与字体',
    category: 'Apple 官方',
    status: 'active',
    statusText: '7000+ 矢量',
    domain: 'developer.apple.com',
    url: 'https://developer.apple.com/sf-symbols/',
    desc: '与 San Francisco 系统字体精密对齐的图标库，支持 9 种字重、分层色彩与动效预设。',
    note: '支持通过 Icon Composer 制作自定义符号。'
  },
  {
    name: 'Lucide Icons',
    group: 'icons',
    groupLabel: '图标与字体',
    category: '开源图标',
    status: 'active',
    statusText: '现代标准',
    domain: 'lucide.dev',
    url: 'https://lucide.dev',
    desc: 'Feather Icons 的社区传承版。1000+ 严格基于 24px 网格与 2px 笔画的极简开源图标。',
    note: '全框架支持（React, Vue, Svelte, Angular）。'
  },
  {
    name: 'Tabler Icons',
    group: 'icons',
    groupLabel: '图标与字体',
    category: '开源图标',
    status: 'active',
    statusText: '5000+ 图标',
    domain: 'tabler.io/icons',
    url: 'https://tabler.io/icons',
    desc: '高密度的开源矢量图标库，支持在线调整线条粗细与尺寸，适配各种后台仪表盘。',
    note: 'MIT 协议，商用免费。'
  },
  {
    name: 'Google Fonts',
    group: 'icons',
    groupLabel: '图标与字体',
    category: '字体与符号',
    status: 'active',
    statusText: '全球 CDN',
    domain: 'fonts.google.com',
    url: 'https://fonts.google.com',
    desc: 'Material Symbols 官方宿主与全球开源字体分发网络，支持变量字体（Variable Fonts）。',
    note: 'Material Symbols 包含 3000+ 可调节粗细/填充度的图标。'
  },

  // 3. 真实产品流与灵感探索
  {
    name: 'Mobbin',
    group: 'inspiration',
    groupLabel: '真实产品流',
    category: '截屏走查',
    status: 'active',
    statusText: '移动与Web',
    domain: 'mobbin.com',
    url: 'https://mobbin.com',
    desc: '全球顶尖 iOS/Android/Web 真实应用完整流程截屏库。查看真实产品的登录、结账与空态。',
    note: '严禁参考未经验证的飞机稿，Mobbin 只收录真实落地产品。'
  },
  {
    name: 'Page Flows',
    group: 'inspiration',
    groupLabel: '真实产品流',
    category: '交互录屏',
    status: 'active',
    statusText: '录屏走查',
    domain: 'pageflows.com',
    url: 'https://pageflows.com',
    desc: 'Screenlane 品牌升级后身。提供顶级产品的端到端视频交互录屏与微交互细节。',
    note: '原 Screenlane 域名已重定向于此。'
  },
  {
    name: 'Godly (recent.design)',
    group: 'inspiration',
    groupLabel: '真实产品流',
    category: '现代 Web 灵感',
    status: 'active',
    statusText: '审美天花板',
    domain: 'godly.website',
    url: 'https://godly.website',
    desc: '严苛精选的现代高审美 Web 站点案例库。排版、微动效与暗黑模式的最佳风向标。',
    note: '已自动迁移至 recent.design 体系，保持每日更新。'
  },
  {
    name: 'Savee',
    group: 'inspiration',
    groupLabel: '真实产品流',
    category: '极简画廊',
    status: 'active',
    statusText: '瑞士排版',
    domain: 'savee.it',
    url: 'https://savee.it',
    desc: '设计师专用的无算法纯粹视觉画廊，汇聚极简主义、瑞士网格与杂志编辑排版灵感。',
    note: '无噪声、无广告的纯净审美补给站。'
  },

  // 4. AI 探索与界面生成 (含已证伪改名清单)
  {
    name: 'v0.app',
    group: 'ai',
    groupLabel: 'AI 探索',
    category: '生成式 UI',
    status: 'active',
    statusText: 'Vercel 出品',
    domain: 'v0.app',
    url: 'https://v0.app',
    desc: '输入自然语言直接生成无障碍 React + Tailwind 代码。快速将抽象想法原型化。',
    note: '由原 v0.dev 正式改名迁移为 v0.app。'
  },
  {
    name: 'Google Stitch',
    group: 'ai',
    groupLabel: 'AI 探索',
    category: 'AI 原型',
    status: 'active',
    statusText: '收购整合',
    domain: 'stitch.withgoogle.com',
    url: 'https://stitch.withgoogle.com',
    desc: '原先著名的 Galileo AI 被 Google 官方团队收购后重组，融入 Google AI 设计生态。',
    note: '已证伪：原 Galileo AI 独立品牌不再存在。'
  },
  {
    name: 'Relume',
    group: 'ai',
    groupLabel: 'AI 探索',
    category: 'IA 与线框生成',
    status: 'active',
    statusText: '信息架构',
    domain: 'relume.io',
    url: 'https://library.relume.io',
    desc: '基于网站地图与信息架构（IA）直接生成全套线框图原型并一键同步进 Figma。',
    note: '极其契合产品早期结构发散阶段。'
  },

  // 5. 交付与设计系统工程
  {
    name: 'Storybook',
    group: 'delivery',
    groupLabel: '交付工程',
    category: '组件驱动开发',
    status: 'active',
    statusText: '组件工坊',
    domain: 'storybook.js.org',
    url: 'https://storybook.js.org',
    desc: '隔离开发 UI 组件的事实标准。自动化进行视觉回归测试（Chromatic）与无障碍扫描。',
    note: '支持设计令牌（Tokens）与 Figma 插件双向联动。'
  },
  {
    name: 'Tokens Studio',
    group: 'delivery',
    groupLabel: '交付工程',
    category: 'Token 协议',
    status: 'active',
    statusText: 'DTCG 标准',
    domain: 'tokens.studio',
    url: 'https://tokens.studio',
    desc: '将 Figma 中的颜色、间距、字体与 GitHub 代码仓库中的 JSON Tokens 实时双向同步。',
    note: '支持直接导出为 Style Dictionary / Tailwind 配置。'
  }
]

const currentGroup = ref(props.initialGroup)

const groups = [
  { id: 'all', label: '全部工具 (20)' },
  { id: 'prototype', label: '📐 原型与协同 (4)' },
  { id: 'icons', label: '🔤 图标与字体 (4)' },
  { id: 'inspiration', label: '👁️ 真实流灵感 (4)' },
  { id: 'ai', label: '🤖 AI 生成与探索 (3)' },
  { id: 'delivery', label: '🛠️ 规范与工程交付 (3)' }
]

const filteredTools = computed(() => {
  if (currentGroup.value === 'all') return tools
  return tools.filter(t => t.group === currentGroup.value)
})
</script>

<template>
  <div class="ld-tool-wall">
    <!-- 分组过滤 -->
    <div class="ld-tool-tabs">
      <button 
        v-for="g in groups" 
        :key="g.id"
        :class="['ld-tool-tab', { active: currentGroup === g.id }]"
        @click="currentGroup = g.id"
      >
        {{ g.label }}
      </button>
    </div>

    <!-- 聚合网格 -->
    <div class="ld-tool-grid">
      <a 
        v-for="tool in filteredTools" 
        :key="tool.name" 
        :href="tool.url" 
        target="_blank" 
        rel="noopener noreferrer"
        :class="['ld-tool-card', `status-${tool.status}`]"
      >
        <div class="ld-t-top">
          <div class="ld-t-title-row">
            <span class="ld-t-name">{{ tool.name }}</span>
            <span class="ld-t-category">{{ tool.category }}</span>
          </div>
          <span :class="['ld-t-status', `st-${tool.status}`]">
            {{ tool.statusText }}
          </span>
        </div>

        <p class="ld-t-desc">{{ tool.desc }}</p>

        <div class="ld-t-note" v-if="tool.note">
          <span class="ld-t-note-dot"></span>
          {{ tool.note }}
        </div>

        <div class="ld-t-bottom">
          <span class="ld-t-domain">{{ tool.domain }}</span>
          <span class="ld-t-link">直达 ↗</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.ld-tool-wall {
  margin: 24px 0 40px;
}

.ld-tool-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--ld-line);
  padding-bottom: 12px;
}

.ld-tool-tab {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 2px;
  border: 1px solid var(--ld-line);
  background: transparent;
  color: var(--ld-text-2);
  cursor: pointer;
  transition: all var(--ld-d-base) ease;
}

.ld-tool-tab:hover {
  border-color: var(--ld-accent);
  color: var(--ld-accent);
}

.ld-tool-tab.active {
  background: var(--ld-accent);
  border-color: var(--ld-accent);
  color: #fff;
  font-weight: 500;
}

.ld-tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
}

.ld-tool-card {
  padding: 16px;
  border: 1px solid var(--ld-line);
  border-radius: 2px;
  background: var(--ld-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform var(--ld-d-base) ease, border-color var(--ld-d-base) ease;
}

.ld-tool-card:hover {
  transform: translateY(-2px);
  border-color: var(--ld-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.ld-tool-card.status-eol {
  opacity: 0.75;
  background: rgba(192, 48, 40, 0.03);
  border-color: rgba(192, 48, 40, 0.2);
}

.ld-t-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.ld-t-title-row {
  display: flex;
  flex-direction: column;
}

.ld-t-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--ld-text);
}

.ld-t-category {
  font-size: 11px;
  color: var(--ld-text-3);
  font-family: var(--ld-font-mono);
}

.ld-t-status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 2px;
  font-weight: 500;
  white-space: nowrap;
}

.ld-t-status.st-active {
  background: rgba(46, 125, 79, 0.1);
  color: #2e7d4f;
}

.ld-t-status.st-eol {
  background: rgba(192, 48, 40, 0.1);
  color: #c03028;
}

.ld-t-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ld-text-2);
  margin: 0 0 12px 0;
  flex: 1;
}

.ld-t-note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--ld-text);
  background: var(--ld-bg);
  padding: 6px 10px;
  border-radius: 2px;
  border-left: 2px solid var(--ld-accent);
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.ld-t-note-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--ld-accent);
  flex-shrink: 0;
}

.ld-t-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px dashed var(--ld-line);
}

.ld-t-domain {
  font-size: 11px;
  font-family: var(--ld-font-mono);
  color: var(--ld-text-3);
}

.ld-t-link {
  font-size: 12px;
  color: var(--ld-accent);
  font-weight: 500;
}
</style>
