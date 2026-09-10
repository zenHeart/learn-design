<script setup>
const designers = [
  {
    name: '唐·诺曼',
    nameEn: 'Don Norman',
    role: '《设计心理学》作者 · 认知科学泰斗',
    quote: '好的设计让用户不需要看说明书。',
    contribution: '提出可供性（Affordance）、示标（Signifier）、心智模型与情感三层次。',
    book: '《日常的设计》《情感化设计》',
    url: 'https://jnd.org',
    domain: 'jnd.org',
    color: '#C8401E'
  },
  {
    name: '雅各布·尼尔森',
    nameEn: 'Jakob Nielsen',
    role: 'NN/g 联合创始人 · 网页可用性之父',
    quote: '用户在其他网站上花的时间最多。',
    contribution: '提出 Nielsen 十大可用性启发式评估法则、雅各布定律与廉价可用性测试。',
    book: '《可用性工程》《用户体验先锋》',
    url: 'https://www.nngroup.com',
    domain: 'nngroup.com',
    color: '#2E7D4F'
  },
  {
    name: '迪特·拉姆斯',
    nameEn: 'Dieter Rams',
    role: '前博朗（Braun）首席设计官 · 工业设计传奇',
    quote: '少，却更好（Weniger, aber besser）。',
    contribution: '提出好设计的十项原则（Rams 十原则），奠定现代极简设计与苹果产品美学基石。',
    book: '《Less and More》',
    url: 'https://www.vitsoe.com/us/about/good-design',
    domain: 'vitsoe.com',
    color: '#1A1C1E'
  },
  {
    name: '史蒂夫·克鲁格',
    nameEn: 'Steve Krug',
    role: '可用性咨询专家 · 畅销书作者',
    quote: '可用性的第一定律：别让我思考。',
    contribution: '提出自解释界面原则、后备箱测试（Trunk Test）与 3 人极简测试法。',
    book: '《点石成金 (Don\'t Make Me Think)》',
    url: 'https://sensible.com',
    domain: 'sensible.com',
    color: '#B25E09'
  },
  {
    name: '罗宾·威廉姆斯',
    nameEn: 'Robin Williams',
    role: '资深平面设计师 · 排版先驱',
    quote: '一旦能够说出什么东西的名字，你就会注意到它。',
    contribution: '系统化提炼视觉排版四大基石：CRAP 原则（对比、重复、对齐、亲密性）。',
    book: '《写给大家看的设计书》',
    url: 'https://www.peachpit.com',
    domain: 'peachpit.com',
    color: '#7C3AED'
  },
  {
    name: '杰西·詹姆斯·加勒特',
    nameEn: 'Jesse James Garrett',
    role: '自适应路径（Adaptive Path）创始人',
    quote: '战略决定范围，范围决定结构，结构决定框架，框架决定表现。',
    contribution: '提出传世的用户体验五层模型，定义了结构层中信息架构（IA）的核心地位。',
    book: '《用户体验要素》',
    url: 'https://www.jjg.net',
    domain: 'jjg.net',
    color: '#0284C7'
  },
  {
    name: '乔恩·雅布隆斯基',
    nameEn: 'Jon Yablonski',
    role: 'Laws of UX 创作者 · 资深产品设计师',
    quote: '用心理学解读用户潜意识的蓝图。',
    contribution: '系统性收集并开源整理 26+ 条人机交互心理学法则，打通认知科学与数字 UI。',
    book: '《Laws of UX (用户体验定律)》',
    url: 'https://lawsofux.com',
    domain: 'lawsofux.com',
    color: '#E11D48'
  },
  {
    name: '布拉德·弗罗斯特',
    nameEn: 'Brad Frost',
    role: '原子设计方法论提出者 · 设计系统咨询专家',
    quote: '我们不是在设计单一页面，而是在创造一套设计组件语言。',
    contribution: '提出原子设计（Atomic Design）：原子、分子、生物、模板、页面五层递进。',
    book: '《Atomic Design》',
    url: 'https://bradfrost.com',
    domain: 'bradfrost.com',
    color: '#4B5563'
  },
  {
    name: '卢克·沃罗布莱夫斯基',
    nameEn: 'Luke Wroblewski',
    role: '前 Google 产品总监 · 移动体验先锋',
    quote: '移动优先（Mobile First）。',
    contribution: '确立单列单表单最佳实践、置顶 Label 交互、多设备断点响应式法则。',
    book: '《Web Form Design》《Mobile First》',
    url: 'https://www.lukew.com',
    domain: 'lukew.com',
    color: '#059669'
  },
  {
    name: '亚当·瓦森 & 史蒂夫·肖格',
    nameEn: 'Adam Wathan & Steve Schoger',
    role: 'Tailwind CSS 创始人 & 界面设计师',
    quote: '你不需要艺术天赋，只需要一套排版度量尺。',
    contribution: '将高级设计视觉法则工程化为 8pt 间距系统、三级灰阶与组件视觉做减法。',
    book: '《Refactoring UI》',
    url: 'https://refactoringui.com',
    domain: 'refactoringui.com',
    color: '#0D9488'
  },
  {
    name: '原研哉',
    nameEn: 'Kenya Hara',
    role: '无印良品（MUJI）艺术总监 · 日本设计中心代表',
    quote: '设计不是把事物装饰得更华丽，而是让它恢复原本自然的状态。',
    contribution: '阐述“白”与“空（Emptiness）”的负空间哲学，信息建筑视角的克制美学。',
    book: '《设计中的设计》《白》',
    url: 'https://www.ndc.co.jp',
    domain: 'ndc.co.jp',
    color: '#374151'
  },
  {
    name: '理查德·索·沃尔曼',
    nameEn: 'Richard Saul Wurman',
    role: 'TED 创始人 · 信息架构概念提出者',
    quote: '信息本身并不存在，除非它被结构化理解。',
    contribution: '提出信息架构术语、信息焦虑理论、终极五大信息分类法 LATCH。',
    book: '《Information Anxiety (信息焦虑)》',
    url: 'https://www.wurman.com',
    domain: 'wurman.com',
    color: '#D97706'
  },
  {
    name: '深泽直人',
    nameEn: 'Naoto Fukasawa',
    role: '日本工业设计大师 · ±0 品牌创始人',
    quote: '无意识设计（Without Thought）。',
    contribution: '主张顺应人类潜意识的行为直觉进行物化设计，拉近人与物品的自然距离。',
    book: '《无意识设计》',
    url: 'https://naotofukasawa.com',
    domain: 'naotofukasawa.com',
    color: '#6B7280'
  },
  {
    name: 'J.J. 吉布森',
    nameEn: 'James J. Gibson',
    role: '生态心理学创立者',
    quote: '可供性不是施加在物体上的属性，而是环境与感知者之间的客观潜在关系。',
    contribution: '首创 Affordance（可供性）概念，深刻启蒙了唐·诺曼与现代人机交互理论。',
    book: '《生态学视知觉方法》',
    url: 'https://plato.stanford.edu/entries/perception-episprob/',
    domain: 'stanford.edu',
    color: '#4338CA'
  }
]
</script>

<template>
  <div class="ld-designer-wall">
    <div class="ld-designer-grid">
      <a 
        v-for="d in designers" 
        :key="d.nameEn" 
        :href="d.url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="ld-designer-card"
      >
        <div class="ld-d-header">
          <div class="ld-d-avatar" :style="{ borderColor: d.color, color: d.color }">
            {{ d.nameEn.split(' ').map(n => n[0]).join('') }}
          </div>
          <div class="ld-d-names">
            <span class="ld-d-zh">{{ d.name }}</span>
            <span class="ld-d-en">{{ d.nameEn }}</span>
          </div>
          <span class="ld-d-live-dot" title="官方站点可达"></span>
        </div>

        <p class="ld-d-role">{{ d.role }}</p>

        <blockquote class="ld-d-quote">
          “{{ d.quote }}”
        </blockquote>

        <p class="ld-d-contrib">
          <strong>核心贡献：</strong>{{ d.contribution }}
        </p>

        <div class="ld-d-footer">
          <span class="ld-d-book">{{ d.book }}</span>
          <span class="ld-d-site">{{ d.domain }} ↗</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.ld-designer-wall {
  margin: 24px 0 40px;
}

.ld-designer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 16px;
}

.ld-designer-card {
  padding: 18px;
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

.ld-designer-card:hover {
  transform: translateY(-2px);
  border-color: var(--ld-accent);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.ld-d-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.ld-d-avatar {
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: var(--ld-bg);
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ld-font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}

.ld-d-names {
  flex: 1;
  min-width: 0;
}

.ld-d-zh {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--ld-text);
  line-height: 1.3;
}

.ld-d-en {
  display: block;
  font-size: 12px;
  font-family: var(--ld-font-mono);
  color: var(--ld-text-3);
}

.ld-d-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2e7d4f;
  box-shadow: 0 0 0 2px rgba(46, 125, 79, 0.2);
}

.ld-d-role {
  font-size: 12px;
  font-weight: 500;
  color: var(--ld-accent);
  margin: 0 0 10px 0;
}

.ld-d-quote {
  font-size: 13px;
  font-style: italic;
  line-height: 1.5;
  color: var(--ld-text);
  margin: 0 0 12px 0;
  padding: 6px 10px;
  background: var(--ld-bg);
  border-left: 2px solid var(--ld-accent);
  border-radius: 0 2px 2px 0;
}

.ld-d-contrib {
  font-size: 12px;
  line-height: 1.6;
  color: var(--ld-text-2);
  margin: 0 0 14px 0;
  flex: 1;
}

.ld-d-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px dashed var(--ld-line);
}

.ld-d-book {
  font-size: 11px;
  color: var(--ld-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.ld-d-site {
  font-size: 11px;
  font-family: var(--ld-font-mono);
  color: var(--ld-accent);
  font-weight: 500;
}
</style>
