import heroVisual from '@/assets/images/shucai/home/hero-visual.jpg'
import communityBg from '@/assets/images/shucai/home/community-bg.jpg'
import qrPlaceholder from '@/assets/images/shucai/home/qr-placeholder.jpg'
import bannerArticles from '@/assets/images/shucai/banners/banner-articles.jpg'
import bannerGames from '@/assets/images/shucai/banners/banner-games.jpg'
import bannerDownloads from '@/assets/images/shucai/banners/banner-downloads.jpg'
import bannerConnect from '@/assets/images/shucai/banners/banner-connect.jpg'
import bannerTry from '@/assets/images/shucai/banners/banner-try.jpg'
import bannerPersonal from '@/assets/images/shucai/banners/banner-personal.jpg'
import bannerParenting from '@/assets/images/shucai/banners/banner-parenting.jpg'
import bannerArcade from '@/assets/images/shucai/banners/banner-arcade.jpg'
import { products, tryOffers } from '@/data/products/products'
import { articles } from '@/data/articles/articles'
import { labs } from '@/data/lab/labs'
import avatarQuentin from '@/assets/images/shucai/avatars/avatar-quentin.jpg'

export const homePage = {
  hero: {
    badge: 'AI x 产品 x 游戏',
    title: '用 AI 提升工作与生活，用产品与游戏解决真实问题',
    subtitle: '我是 Quentin，一名独立开发者与产品探索者。在这里，我将 AI 能力融入产品与游戏，打造可持续迭代的工具与体验，陪伴每一个认真生活的人。',
    actions: [
      { label: '探索产品与游戏', to: '/products', variant: 'primary' },
      { label: '了解我的故事', to: '/about', variant: 'secondary' },
    ],
    stats: [
      { value: '4', label: '个核心入口' },
      { value: '2', label: '大内容 IP' },
      { value: '10K+', label: '社区成员' },
      { value: '持续更新中', label: '迭代状态' },
    ],
    slides: [
      { background: bannerPersonal, eyebrow: 'AI 助力提效' },
      { background: bannerParenting, eyebrow: '育儿成长记录' },
      { background: bannerArcade, eyebrow: '拼音游戏体验' },
    ],
  },
  exploreTags: ['AI 提效', 'App 开发', '育儿助手', '拼音游戏', '最新体验'],
  products: products,
  tryOffer: tryOffers[0],
  featuredArticles: articles.slice(0, 4),
  interactiveCards: [
    { title: '下载动态墙', desc: '实时展示产品热度与增长状态。', to: '/download-wall' },
    { title: '在线轻试玩', desc: '无需下载，浏览器即可体验核心功能。', to: '/play' },
    { title: '在线人数', desc: '用轻量化互动模块增强现场感。', to: '/community' },
  ],
  labs,
  community: {
    title: '加入我的私域社区',
    subtitle: '获取最新动态、产品内测资格、限时福利与深度交流。',
    background: communityBg,
    qr: qrPlaceholder,
    benefits: ['获取最新动态', '产品内测', '限时福利', '深度交流'],
  },
}

export const articleCenterPage = {
  title: '文章中心',
  subtitle: '汇聚全部内容，从 AI 提效到育儿启蒙，从独立开发到亲子成长。',
  banner: bannerArticles,
}

export const gamesPage = {
  title: '游戏中心',
  subtitle: '把学习与互动放进更轻松的体验里，让探索更愿意持续。',
  banner: bannerGames,
}

export const downloadsPage = {
  title: '下载中心',
  subtitle: '统一查看可用产品、体验状态、下载方式和设备说明。',
  banner: bannerDownloads,
  requirements: [
    '首批版本优先支持 Web 体验与报名收集',
    '移动端与桌面端能力将随产品迭代逐步开放',
    '部分产品当前仅提供内测或心愿单登记',
  ],
}

export const communityPage = {
  title: '加入我的私域社区',
  subtitle: '和我一起，持续探索 AI 提效与产品创造。',
  banner: bannerConnect,
  benefits: ['获取最新动态', '产品内测资格', '限时福利', '深度交流'],
  faq: [
    { q: '社区里会分享什么？', a: '包括产品动态、实验进展、内容更新和阶段性福利。' },
    { q: '是否收费？', a: '当前以免费关注和早期名单收集为主，后续如有付费服务会明确说明。' },
  ],
}

export const tryPage = {
  title: '快来尝鲜',
  subtitle: '新想法的验证场，限定内容的首发站。文档、工具、体验资格、内测名额，先到先得。',
  banner: bannerTry,
  hero: {
    badge: '文档/资料包',
    title: '独立开发实战手册',
    description: '从零到一的完整开发经验，包含项目规划、技术选型、产品设计、上线运营全流程。',
    price: '¥29',
    originalPrice: '早鸟体验价',
    ctaLabel: '立即购买',
    ctaTo: '/try/founding-pass',
    secondaryLabel: '查看更多',
    secondaryTo: '#try-grid',
    visual: '📖',
  },
  filters: ['全部', '文档/资料包', '方法模板', '软件小工具', '游戏体验资格', '资源体验包', '内测资格'],
  offerGroups: [
    {
      title: '全部',
      items: [
        {
          slug: 'founding-pass',
          category: '文档/资料包',
          status: '早鸟尝鲜中',
          statusTone: 'green',
          title: '独立开发实战手册',
          summary: '从零到一的完整开发经验，涵盖项目规划、技术选型、产品设计与上线运营全流程。',
          meta: ['人', '独立开发者', 'PDF 下载'],
          price: '¥29',
          ctaLabel: '立即购买',
        },
        {
          slug: 'ai-toolkit',
          category: '方法模板',
          status: '限量首发',
          statusTone: 'amber',
          title: 'AI 效率工具包',
          summary: '精选 AI 工具使用方法与高频工作流清单，让内容生产和信息整理效率提升。',
          meta: ['人', '内容创作者', '在线查阅'],
          price: '¥19',
          ctaLabel: '立即购买',
        },
        {
          slug: '育儿时间管理模板',
          category: '方法模板',
          status: '早鸟尝鲜中',
          statusTone: 'green',
          title: '育儿时间管理模板',
          summary: '科学规划育儿日程，帮助新手爸妈高效安排日常，减少混乱，提升陪伴质量。',
          meta: ['人', '新手爸妈', 'PDF 下载'],
          price: '¥9',
          ctaLabel: '立即购买',
        },
        {
          slug: '拼音大冒险完整版',
          category: '游戏体验资格',
          status: '首发测试',
          statusTone: 'coral',
          title: '拼音大冒险完整版',
          summary: '完整拼音学习游戏包，更多关卡、更多陪练，让孩子在趣味中掌握拼音。',
          meta: ['人', '4-8 岁儿童', '游戏版'],
          price: '¥15',
          ctaLabel: '立即购买',
        },
        {
          slug: '智能写作伴侣内测',
          category: '内测资格',
          status: '限时验证中',
          statusTone: 'purple',
          title: '智能写作伴侣内测',
          summary: '基于上下文理解的写作辅助工具，让内容表达更流畅，抢先体验连贯写作链路。',
          meta: ['人', '写作爱好者', '会员资格'],
          price: '¥1',
          ctaLabel: '特别验证',
        },
        {
          slug: '产品设计检查清单',
          category: '文档/资料包',
          status: '早鸟尝鲜中',
          statusTone: 'green',
          title: '产品设计检查清单',
          summary: '系统化的产品设计自查工具，覆盖需求分析到上线前验收的关键节点。',
          meta: ['人', '产品经理', 'PDF 下载'],
          price: '¥5',
          ctaLabel: '立即购买',
        },
      ],
    },
  ],
  validatingOffers: {
    title: '预付费验证中',
    subtitle: '这些项目还在探索阶段，你的预付费支持是对想法的投票',
    items: [
      {
        slug: '智能写作伴侣内测',
        category: '内测资格',
        status: '特别验证中',
        statusTone: 'purple',
        title: '智能写作伴侣内测',
        summary: '基于上下文理解的写作辅助工具，让表达更流畅自然。仅需 1 元可参与早期验证，项目启动后优先获得内测资格。',
        price: '¥1',
        ctaLabel: '特别验证',
      },
      {
        slug: '家庭时间管理器',
        category: '软件小工具',
        status: '特别验证中',
        statusTone: 'purple',
        title: '家庭时间管理器',
        summary: '为家庭协同规划日程与任务而生，帮助全家人规划日程，预付验证后会优先同步后续动态。',
        price: '¥1',
        ctaLabel: '特别验证',
      },
    ],
  },
  limitedDrop: {
    title: '限时首发',
    subtitle: '限量首发，先到先得，错过不再',
    items: [
      {
        slug: '拼音大冒险完整版',
        category: '游戏体验资格',
        status: '首发测试',
        statusTone: 'coral',
        title: '拼音大冒险完整版',
        summary: '游戏试用升级版，抢先体验更多关卡与成长反馈，适合亲子陪伴场景。',
        price: '¥15',
        ctaLabel: '立即购买',
      },
      {
        slug: 'ai-toolkit',
        category: '方法模板',
        status: '限量首发',
        statusTone: 'amber',
        title: 'AI 效率工具包',
        summary: '限量首发包，精选 AI 工具方法，让提示词、写作和灵感整理更快进入状态。',
        price: '¥19',
        ctaLabel: '立即购买',
      },
      {
        slug: '创意灵感卡片',
        category: '资源体验包',
        status: '首发测试',
        statusTone: 'coral',
        title: '创意灵感卡片',
        summary: '帮助记录灵感、激发思路的数字卡片包，适合创作者和头脑风暴场景。',
        price: '¥3',
        ctaLabel: '立即购买',
      },
    ],
  },
  trust: {
    title: '安心购买',
    subtitle: '你的每一笔支持都值得被认真对待',
    items: [
      {
        icon: 'lock',
        title: '安全支付',
        description: '支持微信、支付宝等主流支付方式，交易安全有保障。',
      },
      {
        icon: 'shield',
        title: '售后保障',
        description: '对内容不满意可联系客服售后或退款，购买无后顾之忧。',
      },
      {
        icon: 'user',
        title: '作者直连',
        description: '独立开发者直接交付，认真对待每一位支持者。',
      },
    ],
  },
  faq: [
    { q: '购买后多久能收到内容？', a: '已上架内容通常为即时获取；预付验证类项目会在页面说明中标注交付节奏。' },
    { q: '预付费验证是什么意思？', a: '表示项目仍处于验证阶段，你的支持会帮助判断是否继续投入开发与交付。' },
    { q: '对购买的内容不满意怎么办？', a: '可先通过社区或联系页反馈问题，已交付的数字内容会按说明处理售后与补充。' },
    { q: '限量首发和普通尝鲜有什么区别？', a: '限量首发更强调时效和名额，通常附带首发价、优先权或早期反馈资格。' },
  ],
  cta: {
    title: '有任何问题？',
    subtitle: '欢迎联系作者，我们会尽快回复',
    label: '联系作者',
    to: '/community',
  },
}

export const aboutPage = {
  title: '一起创造有价值的产品，让生活更美好',
  subtitle: '这里是 QUENTIN WINDOW 的私人社区入口。如果你认同我的理念，想第一时间体验新产品、参与共建、获取独家内容，欢迎加入我们，期待与你相遇。',
  eyebrow: '欢迎来到昆廷的窗口',
  actions: [
    { label: '加入社区', to: '/community', variant: 'primary' },
    { label: '了解更多', to: '#about-story', variant: 'secondary' },
  ],
  journeyTitle: '加入社区，三步完成',
  journey: [
    { step: '1. 扫码 / 添加微信', detail: '添加我的助手，发送「加入社区」。' },
    { step: '2. 通过审核', detail: '简单沟通后，确认是同频的小伙伴。' },
    { step: '3. 进入社区', detail: '获取专属内容、内测资格与更新。' },
  ],
  joinCard: {
    title: '加入方式',
    subtitle: '添加助手后，备注「加入社区」，通过后即可获得专属邀请。',
    qrLabel: '',
  },
  privilegesTitle: '你将获得这些专属权益',
  privileges: [
    {
      icon: 'rocket',
      title: '新产品内测资格',
      description: '第一时间体验我正在打磨的 App 与游戏。',
    },
    {
      icon: 'note',
      title: '独家内容与笔记',
      description: '沉淀思考、产品复盘与方法论，优先分享。',
    },
    {
      icon: 'chat',
      title: '共建与反馈通道',
      description: '你的建议会被认真看见，一起让产品变得更好。',
    },
    {
      icon: 'gift',
      title: '限时福利与活动',
      description: '内测福利、专属折扣，不定期社区活动。',
    },
    {
      icon: 'heart',
      title: '长期陪伴与信任',
      description: '一个温暖、真诚、长期创作的创作者社区。',
    },
  ],
  channelsTitle: '社区动态 & 更新渠道',
  channelsSubtitle: '不想错过重要更新，关注以下渠道。',
  channels: [
    { name: '微信公众号', desc: '产品更新 & 深度文章' },
    { name: '小红书', desc: '育儿 & 产品日常' },
    { name: '邮件订阅', desc: '每周精选简报' },
    { name: 'B站 / 视频号', desc: '教程问答 & 轻度分享' },
  ],
  featureCard: {
    title: '做有价值的产品，陪伴更多人成长',
    description: '从工具到内容，再到互动体验，我希望把温柔、实用和长期主义放进每一次创作里。',
  },
  author: {
    title: '关于我',
    name: 'Quentin',
    avatar: avatarQuentin,
    description: '独立开发者、产品创造者、两个孩子的爸爸。我相信，好产品可以解决真实问题，好的陪伴可以让孩子和我们一起成长。希望你在这里也能找到共鸣。',
  },
  story: [
    '我希望把做产品、写内容、做实验和与用户对话，放在同一个连续空间里。',
    '这个站点不是简单的作品集，也不是单一博客，而是一套不断成长中的个人品牌系统。',
  ],
  timeline: [
    { year: '2024', title: '开始整理独立开发方向' },
    { year: '2025', title: '形成产品、内容与实验三线并行模式' },
    { year: '2026', title: '搭建统一品牌站点与互动体验' },
  ],
  stats: [
    '独立开发',
    '持续迭代',
    '已发布 3 款 App',
    '服务用户 10 万+',
    '专注教育与效率方向',
    '长期主义，真诚创造',
  ],
  subscribe: {
    title: '获取最新更新',
    subtitle: '输入你的邮箱，获取产品更新与精选内容',
    placeholder: '你的邮箱',
    buttonLabel: '订阅',
  },
}

export const legalPages = {
  privacy: {
    title: '隐私政策',
    intro: '我们尊重并保护访问者的个人信息。本页面为当前阶段的前端示意内容，后续会按真实业务进一步完善。',
    sections: [
      { title: '信息收集', paragraphs: ['我们可能收集你主动提交的邮箱、昵称、反馈内容和体验申请信息。'] },
      { title: '信息用途', paragraphs: ['主要用于通知产品动态、处理咨询、发送体验资格与改进服务。'] },
      { title: '信息安全', paragraphs: ['我们会采取合理措施保护信息安全，不会无故向无关第三方披露。'] },
    ],
  },
  terms: {
    title: '服务条款',
    intro: '访问和使用本网站，即表示你同意遵守当前站点规则与后续公开更新的服务条款。',
    sections: [
      { title: '服务说明', paragraphs: ['本站提供产品介绍、内容展示、体验报名与社区连接等信息服务。'] },
      { title: '用户责任', paragraphs: ['请勿以违法或干扰服务稳定性的方式使用本站。'] },
      { title: '内容变更', paragraphs: ['我们可能在不另行通知的情况下更新页面内容、产品状态和活动信息。'] },
    ],
  },
}

export const openSourcePage = {
  title: '开源项目',
  subtitle: '把一部分能力、方法和实验开放出来，让更多人复用与延展。',
  projects: [
    { name: 'Hope Site', desc: '当前品牌站点的前端工程骨架。', tags: ['Vue', 'Vite', '品牌站点'] },
    { name: 'Prompt Fragments', desc: '围绕常用 AI 工作场景整理的提示模板集合。', tags: ['AI', '工作流'] },
    { name: 'Learning Toybox', desc: '面向亲子互动和启蒙练习的轻量游戏原型。', tags: ['教育', '互动体验'] },
  ],
}

export const subscribePage = {
  title: '订阅更新',
  subtitle: '输入你的邮箱，获取最新产品动态、内测信息和内容更新。',
  highlights: ['产品新进展', '优先体验资格', '深度内容更新'],
}

export const playPage = {
  title: '在线轻试玩',
  subtitle: '无需下载，直接在浏览器里体验核心玩法与互动节奏。',
  banner: bannerArcade,
}
