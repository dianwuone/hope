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
    subtitle: '这里是启鸣随笔，主要记录我在育儿、工作与个人成长中的真实体会。没有复杂包装，更多是把一些有用的方法、阶段感受和生活切片慢慢整理出来。',
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
    { title: '资源整理页', desc: '集中看看我整理过的内容入口、应用信息和相关资源。', to: '/download-wall' },
    { title: '在线体验页', desc: '直接在网页里体验一些轻量功能和互动内容。', to: '/play' },
    { title: '联系与订阅', desc: '如果你想继续关注更新，或想和我交流，可以从这里进入。', to: '/community' },
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
  subtitle: '如果你想继续看看我最近在写什么、做什么，或只是想简单聊一聊，都可以在这里留下联系方式。',
  banner: bannerConnect,
  benefits: ['获取内容更新', '看看最近在做什么', '留下联系方式', '继续保持联系'],
  faq: [
    { q: '这里主要是做什么的？', a: '这里主要用来收留言、同步更新近况，以及保留一个继续联系的入口。' },
    { q: '联系需要付费吗？', a: '不用，这里只是提供交流、获取更新和留下联系方式的入口。' },
  ],
}

export const tryPage = {
  title: '快来尝鲜',
  subtitle: '这里集中放一些正在验证中的内容、工具和体验名额，方便你更早了解，也方便我判断哪些方向值得继续做。',
  banner: bannerTry,
  hero: {
    badge: '文档/资料包',
    title: '独立开发实战手册',
    description: '把独立开发从想法、规划、实现到上线的关键经验整理成一份更容易上手的实战资料。',
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
    subtitle: '这些方向还在验证阶段，你的支持能帮助我判断是否继续投入打磨。',
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
    subtitle: '这一组内容会先小范围开放，方便尽快拿到真实反馈。',
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
    subtitle: '你的每一次支持，我都会认真交付和回应。',
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
    subtitle: '如果你想进一步了解内容、交付方式或当前进度，可以直接联系我。',
    label: '联系作者',
    to: '/community',
  },
}

export const aboutPage = {
  title: '一个连接内容、App 与交流的网站',
  subtitle: '这里一边记录内容，一边放我正在整理的产品方向和联系入口。整体还是以个人表达为主，只是顺带把一些持续在做的东西放在同一个地方。',
  eyebrow: '欢迎来到昆廷的窗口',
  actions: [
    { label: '联系我', to: '/community', variant: 'primary' },
    { label: '了解更多', to: '#about-story', variant: 'secondary' },
  ],
  journeyTitle: '了解产品与保持联系，三步即可',
  journey: [
    { step: '1. 浏览内容 / 产品', detail: '先看看我最近在写什么、做什么。' },
    { step: '2. 留下联系方式', detail: '如果某个方向对你有帮助，可以继续联系我。' },
    { step: '3. 保持后续更新', detail: '后续可以继续收到内容更新和近况分享。' },
  ],
  joinCard: {
    title: '联系说明',
    subtitle: '添加微信后备注来意即可，方便我知道你是想交流内容、了解产品，还是单纯保持联系。',
    qrLabel: '',
  },
  privilegesTitle: '你可以在这里看到这些内容',
  privileges: [
    {
      icon: 'rocket',
      title: '正在整理的项目记录',
      description: '看看我正在慢慢打磨的一些 App、工具和阶段性尝试。',
    },
    {
      icon: 'note',
      title: '内容记录与个人表达',
      description: '持续记录育儿、工作方法和一些阶段性的真实想法。',
    },
    {
      icon: 'chat',
      title: '交流与联系入口',
      description: '如果你对某个方向感兴趣，可以继续交流或留下联系方式。',
    },
    {
      icon: 'gift',
      title: '小范围尝试与更新提醒',
      description: '有些内容会先小范围放出，再慢慢根据反馈继续整理。',
    },
    {
      icon: 'heart',
      title: '持续更新',
      description: '后续会通过微信或订阅方式继续同步更新。',
    },
  ],
  channelsTitle: '更新渠道',
  channelsSubtitle: '如果你想继续关注内容和最近在做的事，可以通过这些入口保持联系。',
  channels: [
    { name: '微信公众号', desc: '个人记录与文章更新' },
    { name: '小红书', desc: '育儿与生活日常' },
    { name: '邮件订阅', desc: '内容更新提醒' },
    { name: 'B站 / 视频号', desc: '一些轻量分享' },
  ],
  featureCard: {
    title: '用内容、产品与交流连接彼此',
    description: '我希望把内容记录、项目尝试和后续交流自然放在同一个网站里，减少割裂感。',
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
    { year: '2025', title: '逐步整理内容、工具与个人表达方式' },
    { year: '2026', title: '把内容、项目尝试与联系入口集中到同一个个人网站里' },
  ],
  stats: [
    '独立开发',
    '持续迭代',
    '内容与项目连接',
    '内容持续整理',
    '关注育儿与成长',
    '个人记录与持续更新',
  ],
  subscribe: {
    title: '获取最新更新',
    subtitle: '留下邮箱后，可以更方便收到内容更新、近况分享和一些新内容提醒。',
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
  subtitle: '输入你的邮箱，获取最近更新的内容、近况分享和新整理的记录。',
  highlights: ['最近写了什么', '正在整理什么', '内容持续更新'],
}

export const playPage = {
  title: '在线轻试玩',
  subtitle: '无需下载，直接在浏览器里体验核心玩法与互动节奏。',
  banner: bannerArcade,
}
