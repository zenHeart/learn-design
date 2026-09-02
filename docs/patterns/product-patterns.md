# 产品类型设计约束矩阵

> 目标：回答"这是哪类产品 → 该满足什么约束 → 该用什么模式 → 该警惕什么反模式"。
> 通用心理学与法则见 [principles/lawsofux.md](../principles/lawsofux.md) 与 [principles/heuristics-wcag.md](../principles/heuristics-wcag.md)；平台视觉语言见 [languages/design-languages.md](../languages/design-languages.md)。
> 取用日期 2026-09-02。

## 类型矩阵

| 产品类型 | 核心目标 | 典型约束 | 高频模式 | 主要参考 |
|---|---|---|---|---|
| 营销/落地页 | 转化（注册/留资） | 注意力稀缺、横幅失明、加载性能 | 首屏单一价值主张 + 主 CTA；社会证明；CTA 随滚动重复出现；F 型排版 | [S12] |
| 电商 | 成交 + 复购信任 | 结账摩擦、意外成本、信任缺失 | 费用前置、游客结算、进度指示、评论与退换政策显性化；理想结账表单仅 12–14 个元素 | [S5] |
| B2B SaaS / 仪表盘 | 支持快速决策 | 信息密度 vs 认知负荷、数据准确性 | KPI 卡 + 趋势 + 下钻；表格排序筛选；避免 3D 饼图与透视变形 | [S10][S12] |
| 移动 App | 单手碎片化场景下的高效 | 拇指可达区、触控目标、平台约定、隐私时机 | 底部导航/底部操作、骨架屏、按情境请求权限、复用系统能力 | [S6][S9] |
| 桌面应用 | 长时复杂任务的效率 | 多窗口/多文档状态管理、键盘效率 | 快捷键全覆盖、状态持久化、遵循 OS 窗口约定、命令面板 | 本地 Kimi 提取物 + [S6] |
| 开发者/文档站 | 帮开发者快速成功 | 任务型与学习型内容混排、可复制性 | Diataxis 四象限（教程/如何做/参考/解释）、可复制代码块、搜索 + 左侧树 | [S1] |
| AI 对话 / Agent | 校准的信任与控制权 | 不确定性表达、错误恢复、心智模型建立 | 声明能力边界、流式 + 可打断、引用溯源、可撤销/确认门槛 | [S2][S3][S4] |

### 各类型一句话判断锚点

- **落地页**：首屏的任务是建立"往下滚的理由"，不是塞满信息（"折叠"一词源自报纸，眼动研究显示用户会滚动，折叠以下仍获得约 20% 注意力）[S12]。
- **电商**：平均 70.22% 的弃车率中，"额外费用突现"是最大归因——费用前置比优惠营销更能提升成交 [S5]。
- **仪表盘**：先定义决策，再定义图表。3D 效果与透视会扭曲数值感知，属于确定性反模式 [S10]。
- **移动 App**：49% 用户单手拇指持机，底部可达区决定导航与主操作位置 [S9]；触控目标硬数字见 [heuristics-wcag.md](../principles/heuristics-wcag.md)。
- **桌面应用**：效率优先于可发现性，快捷键与命令面板是专家用户的一等公民；窗口/多文档状态管理是 Web 没有的问题域。Microsoft 官方数值规范见 Windows 桌面研究笔记（本地提取物，待正式入库）。
- **文档站**：Diataxis 四象限回答"内容放哪"——教程（学习）/how-to（完成任务）/reference（查阅）/explanation（理解），混排是文档站最大质量问题来源 [S1]。
- **AI 产品**：微软 HAX 18 条指南按"初次交互/交互中/出错时/长期"四阶段组织；Google PAIR Guidebook 23 个模式；两家在"设定预期、可解释、可纠正"上高度重叠 [S2][S3]。目前尚无跨厂商统一权威标准，属新兴共识区。

## 跨类型共识

1. **表单**：单列布局、label 置顶（减少注视移动）、错误就近就地提示、字段最少化 [S5][S7][S8]。
2. **渐进披露**：核心功能居中显眼，高级/低频功能下沉二级界面；同时提升新手可学性与专家效率 [S12]。Microsoft Win32 指南的"为大概率设计"是同一原则的功能侧表述。
3. **三态完备**：空态、错误态、加载态与主流程同等设计；骨架屏优于旋转菊花（传达结构预期）[S5][S12]。
4. **移动优先/响应式**：小屏先定内容优先级——多列表单在小屏不可用会倒逼信息架构收敛 [S8]。
5. **可访问性是底线不是加分项**：对比度、键盘可达、焦点管理在任何产品类型都适用（硬数字见 [heuristics-wcag.md](../principles/heuristics-wcag.md)）。

## 已证伪的过时教条（审稿时主动排除）

| 教条 | 证伪证据 | 正确姿势 |
|---|---|---|
| 三次点击法则（任何内容 3 次点击内到达） | Porter 2003 实测点击数与成功率/满意度零相关；NN/g 明确其为"无数据支持的任意经验法则" [S11] | 关注任务结构与信息气味，不数点击数 |
| 关键内容必须全放首屏（above the fold） | "折叠"源自报纸；NN/g 眼动研究：用户会滚动，首屏价值在于建立滚动预期 [S12] | 首屏给价值主张 + 滚动线索 |
| 7±2 决定菜单项上限 | 米勒定律是短时记忆广度，非菜单上限；识别优于回忆，实测可用菜单可远超 7 项 [S11] | 菜单项按任务分组 + 可扫读性组织 |

> 审视现有设计时，遇到引用以上教条的批评意见应先降权，再验证真实任务流。

## 信源合集

| 编号 | 来源 | 层级 | URL | 取用日期 |
|---|---|---|---|---|
| S1 | Diataxis 官网 | L0 | https://diataxis.fr | 2026-09-02 |
| S2 | 微软 HAX 与 Google PAIR 对比研究（论文） | L4 | https://arxiv.org/pdf/2010.11761v1 | 2026-09-02 |
| S3 | Google People+AI Guidebook | L0 | https://pair.withgoogle.com/guidebook | 2026-09-02 |
| S4 | Windows RAI 指南（HAX 现挂载点） | L0 | https://learn.microsoft.com/en-us/windows/ai/rai | 2026-09-02 |
| S5 | Baymard 弃车率统计 | L2 行业研究 | https://baymard.com/lists/cart-abandonment-rate | 2026-09-02 |
| S6 | Apple HIG: Notifications | L0 | https://developer.apple.com/design/human-interface-guidelines/notifications | 2026-09-02 |
| S7 | Luke Wroblewski《Web Form Design》 | L3 专家 | https://lukew.com/resources/web_form_design.asp | 2026-09-02 |
| S8 | Stripe 移动结算 UI 指南 | L2 行业权威 | https://stripe.com/resources/more/mobile-checkout-ui | 2026-09-02 |
| S9 | Hoober 持机研究 | L3 专家研究 | https://uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php | 2026-09-02 |
| S10 | Stephen Few《Save the Pies for Dessert》 | L3 专家 | perceptualedge.com（Visual BI Newsletter, 2007） | 2026-09-02 |
| S11 | 三次点击原则（含 Porter 2003 证伪） | L3 百科 | https://zh.wikipedia.org/zh-sg/三次点击原则 | 2026-09-02 |
| S12 | NN/g Web UX Study Guide | L0 | https://www.nngroup.com/articles/web-ux-study-guide/ | 2026-09-02 |

## 缺口

- 3-click 法则原文页经二手交叉确认，引用前建议人工核一次 NN/g 原链。
- "社会证明"效应量研究噪声大，仅作共识性模式列出，无单一一手实验支撑。
- AI/Agent 交互无跨厂商统一标准，量化共识（流式节奏、撤销门槛）仍缺——新增内容时的活跃扩展区。
