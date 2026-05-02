import article1 from '@/assets/images/shucai/articles/article-thumb-1.jpg'
import article2 from '@/assets/images/shucai/articles/article-thumb-2.jpg'
import article3 from '@/assets/images/shucai/articles/article-thumb-3.jpg'
import article4 from '@/assets/images/shucai/articles/article-thumb-4.jpg'
import article5 from '@/assets/images/shucai/articles/article-thumb-5.jpg'
import article6 from '@/assets/images/shucai/articles/article-thumb-6.jpg'
import { columns } from './columns'

export const articleCategories = ['全部', 'AI 提效', 'App 开发', '幼小衔接', '亲子游戏', '产品思考']
export const articleHotTopics = ['AI 提效', '独立开发', '育儿启蒙', '亲子游戏', '产品思考', '阅读成长']

export const articles = [
  {
    id: 1,
    slug: 'ai-workflow-output',
    title: '我的 AI 提效工作流：从信息输入到高质量输出',
    summary: '分享我如何把搜集、整理、提炼、写作和复盘串起来，形成稳定可复用的 AI 工作流。',
    content: [
      '高质量输出，往往不是从一个更强的模型开始，而是从更清晰的信息输入开始。',
      '我会先把碎片输入分成三类：原始素材、待验证线索、可直接引用的结构化结论。只有这样，后续的 AI 总结才不会越走越散。',
      '第二步是把问题拆成更小的动作，比如提纲、归纳、改写、补例子，而不是一次把所有工作丢给模型。',
      '真正提高效率的关键，不是每次都追求神奇输出，而是让同一套流程可以被重复执行。',
    ],
    cover: article1,
    column: 'kunting',
    category: 'AI 提效',
    tags: ['AI 提效', '工作流', '效率工具'],
    publishedAt: '2026-04-20',
    viewCount: '1.2k',
    author: columns.kunting.author,
    authorAvatar: columns.kunting.avatar,
  },
  {
    id: 2,
    slug: 'kindergarten-transition-rhythm',
    title: '幼小衔接，不焦虑的节奏感养成指南',
    summary: '从作息调整到心理准备，从学习习惯到社交能力，帮助家长和孩子平稳过渡。',
    content: [
      '幼小衔接最容易被误解成“提前学很多知识”，但更重要的是节奏感。',
      '规律作息、任务意识、独立表达和情绪稳定，往往比多做几页练习更有价值。',
      '如果家庭能把“准备入学”变成一套可持续的小习惯，孩子会更从容。',
    ],
    cover: article2,
    column: 'qiming',
    category: '幼小衔接',
    tags: ['幼小衔接', '育儿启蒙'],
    publishedAt: '2026-04-18',
    viewCount: '856',
    author: columns.qiming.author,
    authorAvatar: columns.qiming.avatar,
  },
  {
    id: 3,
    slug: 'first-app-in-90-days',
    title: '独立开发者的第一个 App：从 0 到 1 的 90 天',
    summary: '记录从想法萌芽到 App 上架的完整过程，包括技术选型、产品设计和上线后的反馈。',
    content: [
      '从 0 到 1 的困难，很多时候不是“不会做”，而是“不知道先做哪一步”。',
      '我把 90 天拆成调研、原型、 MVP、验证和上线五个阶段，每个阶段只抓一个主目标。',
      '最有效的节奏不是连续高强度冲刺，而是每周都能对外看到一点进展。',
    ],
    cover: article3,
    column: 'kunting',
    category: 'App 开发',
    tags: ['独立开发', 'App 开发', '产品思考'],
    publishedAt: '2026-04-15',
    viewCount: '1.6k',
    author: columns.kunting.author,
    authorAvatar: columns.kunting.avatar,
  },
  {
    id: 4,
    slug: 'family-boardgame-list',
    title: '亲子桌游推荐：让陪伴变得更有趣',
    summary: '精选适合 3-8 岁孩子的亲子桌游，从益智启蒙到策略思维，附带年龄适配建议。',
    content: [
      '真正适合亲子陪伴的桌游，不一定是规则最复杂的，而是能让孩子愿意反复参与的。',
      '我会优先挑选反馈快、挫败感低、家长也愿意一起玩的桌游。',
      '如果一款游戏能自然带出轮流、观察、表达和情绪管理，它的价值会远大于“学到了什么知识”。',
    ],
    cover: article4,
    column: 'qiming',
    category: '亲子游戏',
    tags: ['亲子游戏', '陪伴成长'],
    publishedAt: '2026-04-12',
    viewCount: '732',
    author: columns.qiming.author,
    authorAvatar: columns.qiming.avatar,
  },
  {
    id: 5,
    slug: 'shipping-small-products-fast',
    title: '小产品快速上线的三个原则',
    summary: '减少功能幻想、尽快触达真实用户、让反馈驱动迭代，是小产品生存的关键。',
    content: [
      '小产品最大的风险不是功能少，而是做得太慢。',
      '如果一件事情三周后才能让用户看到，你很可能已经在错误方向上投入太多。',
    ],
    cover: article5,
    column: 'kunting',
    category: '产品思考',
    tags: ['产品思考', '独立开发'],
    publishedAt: '2026-04-09',
    viewCount: '967',
    author: columns.kunting.author,
    authorAvatar: columns.kunting.avatar,
  },
  {
    id: 6,
    slug: 'pinyin-learning-at-home',
    title: '在家学拼音，怎么把练习变成愿意参与的游戏',
    summary: '与其追求每天练很多，不如把一次次短时、有效、愿意继续做的体验建立起来。',
    content: [
      '拼音启蒙最怕的是孩子只记住“好难”。',
      '把节奏拆短、反馈变快、挑战变轻，孩子更容易愿意重复。',
    ],
    cover: article6,
    column: 'qiming',
    category: '育儿启蒙',
    tags: ['拼音启蒙', '幼小衔接'],
    publishedAt: '2026-04-06',
    viewCount: '648',
    author: columns.qiming.author,
    authorAvatar: columns.qiming.avatar,
  },
]

export const blogPosts = articles.slice(0, 4)

export const getArticleBySlug = (slug) => articles.find((item) => item.slug === slug)
