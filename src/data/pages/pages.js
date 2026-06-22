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
    badge: '个人记录与生活灵感',
    title: '记录育儿心得、职场感悟与个人成长的日常思考',
    subtitle: '这里是启鸣随笔，一个以个人记录为主的网站。我会分享陪伴孩子成长时的体会，也会整理工作中的方法、情绪与阶段反思，留下一些真实而温和的生活切片。',
    actions: [
      { label: '阅读最新文章', to: '/articles', variant: 'primary' },
      { label: '关于这个网站', to: '/about', variant: 'secondary' },
    ],
    stats: [
      { value: '育儿心得', label: '持续记录' },
      { value: '职场感悟', label: '阶段整理' },
      { value: '个人成长', label: '长期更新' },
      { value: '个人网站', label: '真实表达' },
    ],
    slides: [
      { background: bannerPersonal, eyebrow: '工作与生活整理' },
      { background: bannerParenting, eyebrow: '育儿成长记录' },
      { background: bannerArcade, eyebrow: '亲子互动陪伴' },
    ],
  },
  exploreTags: ['育儿陪伴', '职场复盘', '成长笔记', '亲子启蒙', '个人应用'],
  products: products,
  tryOffer: tryOffers[0],
  featuredArticles: articles.slice(0, 4),
  interactiveCards: [
    { title: '资源整理页', desc: '查看个人应用与内容相关资源的集中入口。', to: '/download-wall' },
    { title: '在线体验页', desc: '保留网页内可直接体验的轻量互动功能。', to: '/play' },
    { title: '联系与订阅', desc: '通过订阅与联系入口，接收更新或交流想法。', to: '/community' },
  ],
  labs,
  community: {
    title: '联系我与订阅更新',
    subtitle: '如果你也关心育儿、成长和日常方法，欢迎通过邮件或微信保持联系。',
    background: communityBg,
    qr: qrPlaceholder,
    benefits: ['内容更新提醒', '育儿交流', '成长分享', '日常联系'],
  },
}

export const articleCenterPage = {
  title: '文章归档',
  subtitle: '汇聚全部记录，从育儿心得到职场感悟，再到日常成长笔记。',
  banner: bannerArticles,
}

export const gamesPage = {
  title: '亲子互动',
  subtitle: '把学习与陪伴放进更轻松的互动里，让孩子更愿意参与。',
  banner: bannerGames,
}

export const downloadsPage = {
  title: '资源整理页',
  subtitle: '集中整理可查看的内容、个人应用和相关资源入口。',
  banner: bannerDownloads,
  requirements: [
    '首批版本优先支持 Web 体验与报名收集',
    '移动端与桌面端能力将随产品迭代逐步开放',
    '部分产品当前仅提供内测或心愿单登记',
  ],
}

export const communityPage = {
  title: '联系我，继续保持更新',
  subtitle: '如果你想继续了解内容更新、App 动态或进一步交流，欢迎通过这里留下联系方式。',
  banner: bannerConnect,
  benefits: ['获取内容更新', '了解 App 动态', '留下联系线索', '继续保持联系'],
  faq: [
    { q: '这里主要是做什么的？', a: '这里主要用于承接内容更新提醒、产品动态沟通、留言咨询和后续联系。' },
    { q: '联系需要付费吗？', a: '不用，这里以交流、订阅更新和留下联系方式为主。' },
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
  title: '一个连接内容、App 与交流的网站',
  subtitle: '这里既有内容记录，也承接我正在做的 App 展示、线索收集、前置销售和后续交流。如果你关心育儿、成长和效率方向，欢迎继续了解。',
  eyebrow: '欢迎来到昆廷的窗口',
  actions: [
    { label: '加入社区', to: '/community', variant: 'primary' },
    { label: '了解更多', to: '#about-story', variant: 'secondary' },
  ],
  journeyTitle: '了解产品与保持联系，三步即可',
  journey: [
    { step: '1. 浏览内容 / 产品', detail: '先看看我正在持续更新的内容与 App 方向。' },
    { step: '2. 添加联系', detail: '如果你感兴趣，可以添加微信或留下联系方式。' },
    { step: '3. 获取后续更新', detail: '后续可继续接收产品动态、内容更新与体验通知。' },
  ],
  joinCard: {
    title: '联系说明',
    subtitle: '添加微信后备注来意即可，这里同时承担内容交流、线索承接与后续私域联系。',
    qrLabel: '',
  },
  privilegesTitle: '你可以在这里看到这些内容',
  privileges: [
    {
      icon: 'rocket',
      title: 'App 展示与体验入口',
      description: '集中展示我正在打磨的 App、工具和阶段性体验入口。',
    },
    {
      icon: 'note',
      title: '内容记录与个人表达',
      description: '持续记录育儿、工作、方法和一些阶段性的想法。',
    },
    {
      icon: 'chat',
      title: '线索收集与交流入口',
      description: '如果你对某个方向感兴趣，可以进一步交流或留下联系线索。',
    },
    {
      icon: 'gift',
      title: '前置销售与体验通知',
      description: '部分产品会先通过预售、尝鲜或预约方式验证需求。',
    },
    {
      icon: 'heart',
      title: '私域持续维护',
      description: '后续会通过微信、订阅等方式继续维护联系与更新。',
    },
  ],
  channelsTitle: '更新渠道',
  channelsSubtitle: '如果你想继续关注内容和产品动态，可以通过这些入口保持联系。',
  channels: [
    { name: '微信公众号', desc: '个人记录与文章更新' },
    { name: '小红书', desc: '育儿与生活日常' },
    { name: '邮件订阅', desc: '内容更新提醒' },
    { name: 'B站 / 视频号', desc: '一些轻量分享' },
  ],
  featureCard: {
    title: '用内容、产品与交流连接彼此',
    description: '从内容表达，到 App 展示、销售验证和后续交流，我希望把这些都自然地放进同一个网站里。',
  },
  author: {
    title: '关于我',
    name: 'Quentin',
    avatar: avatarQuentin,
    description: '两个孩子的爸爸。这里会继续记录我在生活、育儿和工作中的一些真实体会，希望你也能在这里找到一点共鸣。',
  },
  story: [
    '我想把做事过程、生活体会、产品尝试和阶段思考，放在同一个连续空间里持续整理。',
    '这个站点会持续整理内容、产品尝试与阶段思考，并保留后续交流入口。',
  ],
  timeline: [
    { year: '2024', title: '开始整理独立开发方向' },
    { year: '2025', title: '逐步整理内容、工具与产品承接方式' },
    { year: '2026', title: '把内容、App 与私域入口集中到同一个个人网站里' },
  ],
  stats: [
    '独立开发',
    '持续迭代',
    '内容与产品连接',
    '内容持续整理',
    '关注育儿与成长',
    '产品展示与私域维护',
  ],
  subscribe: {
    title: '获取最新更新',
    subtitle: '输入你的邮箱，获取内容更新、产品动态与体验提醒',
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
    { name: 'Hope Site', desc: '当前个人网站的前端工程骨架。', tags: ['Vue', 'Vite', '个人网站'] },
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
