# AGENTS.md — agent 消费与贡献指南

本站是 agent 的设计信息源。人类读者看 [README.md](README.md)（站点宪法），agent 按本文件消费与贡献。

## 如何消费本站

1. **站点根 `llms.txt`** 是机器索引入口：页面清单 + 一句话摘要。先读它定位目标页。
2. 每页 frontmatter 的 `description` 声明该页内容范围；正文为静态 HTML（Markdown 渲染），锚点为中文原文，可深链引用。
3. **信任规则**：任何事实性论断都带来源编号（[S#]）与取用日期；层级 L0 官方 > L2 行业研究 > L3 转述 > E 实证；厂商自测数据一律写作"X 声称"。引用前按编号核对文内信源合集表。
4. **已证伪教条**（三次点击法则、"必须全放首屏"、7±2 菜单上限等）载于 [产品类型约束矩阵](docs/patterns/product-patterns.md) 的证伪表——产出设计批评时不得引用它们作为依据。
5. 数值类规范（对比度、触控目标、动效时长）以 principles 层与 languages 层的表为准，注明快照日期；引用时保留日期。

## 三大判断场景的推荐路径

- **design review**：patterns（定产品类型与反模式）→ heuristics-wcag（走查问句 + 硬数字）→ lawsofux（根因归因）
- **style refactor**：design-languages（选参照体系，进 L0 官方站取规范）→ patterns（校验产品类型不冲突）
- **professional critique**：design-process（五层/双钻提问顺序）→ design-books（四问框架）→ 跨体系 7 共性作检查维度

## 如何贡献内容

放置规则（哪类内容进哪层）见 README.md「维护与扩展约定」。硬性纪律：

- **无空壳**：不建没有首个真实文件的目录；未完成主题放 `_draft/`
- **时效标注**：版本/状态/数值必须带取用日期；hub 类条目必须先做 HTTP 实证再收录，失效即进证伪清单
- **来源引用**：事实性论断挂 [S#]，文末给信源合集表（层级 + URL + 取用日期）
- **证伪优先**：新增"最佳实践"前先搜反例
- **综合而非拷贝**：提炼 + 交叉对照，规范细节链到官方 canonical URL
- **frontmatter**：新页面必须带 `title` 与 `description`（供 llms.txt 与 agent 索引）
- **隐私红线**：不写入本机路径、个人邮箱、任何 token/密钥；提交前跑 secret 扫描

## 站点自身的设计规范

站点按"印刷档案 × 瑞士网格 × 编辑排版"方向设计（签名元素：藏品编号 + 朱砂批注红）。改主题前先读 `docs/.vitepress/theme/custom.css` 顶部注释的设计纪律：

- 层级靠字阶与 1px 线，不靠阴影；圆角 ≤2px
- 动效只动 transform/opacity；duration/easing 用既有 token；必须尊重 `prefers-reduced-motion`
- 中文排版遵循 W3C clreq（正文行高 1.75–1.8，英文优先字体栈）
- 新组件进 `docs/.vitepress/theme/components/`，交互组件只承担导航索引，正文一律保持静态 Markdown
