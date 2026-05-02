import appPersonalAssistant from '@/assets/images/shucai/products/app-personal-assistant.jpg'
import appParentingAssistant from '@/assets/images/shucai/products/app-parenting-assistant.jpg'
import appAiTools from '@/assets/images/shucai/products/app-ai-tools.jpg'
import bannerProducts from '@/assets/images/shucai/banners/banner-products.jpg'
import bannerTry from '@/assets/images/shucai/banners/banner-try.jpg'

export const products = [
  {
    id: 1,
    slug: 'personal-assistant',
    name: '个人助手',
    shortDesc: '你的全能生活管理助手，让每一天都井然有序、高效从容。',
    summary: '整合日程、待办、习惯、笔记和 AI 整理能力的个人效率中枢。',
    cover: appPersonalAssistant,
    banner: bannerProducts,
    status: 'new',
    stage: 'beta',
    supportStatus: 'beta_apply',
    price: '¥29',
    originalPrice: '¥99',
    tags: ['个人管理', '效率工具', '习惯养成'],
    features: [
      { title: '日程与任务联动', description: '把待办、提醒、时间块和目标放在同一工作流里。' },
      { title: 'AI 整理与复盘', description: '自动总结当天重点，让记录真正可回顾、可行动。' },
      { title: '成长型仪表盘', description: '用稳定指标追踪习惯、专注和阶段成果。' },
    ],
    highlights: ['效率提升', '日程管理', '习惯养成'],
    faq: [
      { q: '适合什么样的用户？', a: '适合希望把事务管理、复盘和 AI 辅助整合在一起的个人用户。' },
      { q: '是否支持多端？', a: '第一阶段以 Web 体验和轻量表单收集为主，后续会扩展更多端。' },
    ],
    testimonials: [
      { author: '自由职业者 Lin', content: '比单独用待办工具更顺，复盘和提醒结合后明显更容易坚持。' },
    ],
  },
  {
    id: 2,
    slug: 'parenting-assistant',
    name: '育儿助手',
    shortDesc: '科学育儿的好帮手，记录成长点滴，陪伴宝宝健康快乐成长。',
    summary: '围绕成长记录、启蒙建议、亲子互动和日常提醒设计的家庭型助手。',
    cover: appParentingAssistant,
    banner: bannerProducts,
    status: 'new',
    stage: 'beta',
    supportStatus: 'beta_apply',
    price: '¥39',
    originalPrice: '¥129',
    tags: ['育儿陪伴', '成长记录', '亲子教育'],
    features: [
      { title: '成长记录轻量化', description: '把睡眠、饮食、身高体重和关键事件都沉淀成可回看的轨迹。' },
      { title: '启蒙内容建议', description: '围绕年龄阶段给出亲子互动、阅读和学习建议。' },
      { title: '家庭共管视角', description: '让照护者协同更顺畅，减少信息割裂。' },
    ],
    highlights: ['育儿记录', '启蒙教育', '亲子互动'],
    faq: [
      { q: '适合什么年龄段？', a: '目前更偏向 0-8 岁家庭，后续会逐步扩展使用场景。' },
      { q: '会替代医生建议吗？', a: '不会，产品提供的是记录、提醒和内容参考，不替代专业诊疗意见。' },
    ],
    testimonials: [
      { author: '二孩妈妈 Zoe', content: '最有价值的是把零散记录变成体系，回看孩子成长特别直观。' },
    ],
  },
  {
    id: 3,
    slug: 'ai-tools',
    name: 'AI 工具助手',
    shortDesc: '你的随身智能工具箱，用 AI 赋能写作、总结与创意灵感。',
    summary: '把写作、提炼、翻译、头脑风暴等常用 AI 能力做成统一入口。',
    cover: appAiTools,
    banner: bannerProducts,
    status: 'new',
    stage: 'coming_soon',
    supportStatus: 'wishlist',
    price: '¥49',
    originalPrice: '¥149',
    tags: ['AI 提效', '创作工具', '效率应用'],
    features: [
      { title: '常用场景模板化', description: '把写作、总结、提纲、拆解等高频场景收纳成工具集。' },
      { title: '结果可编辑可再生', description: '不是一次性输出，而是支持继续改、继续提问。' },
      { title: '低门槛 AI 工作流', description: '让不懂提示词的人也能快速用起来。' },
    ],
    highlights: ['AI 写作', '内容总结', '灵感生成'],
    faq: [
      { q: '什么时候上线？', a: '当前处于规划与原型阶段，优先对外开放心愿单和早期体验名单。' },
      { q: '适合什么职业？', a: '创作者、自由职业者、小团队运营和知识工作者都会受益。' },
    ],
    testimonials: [
      { author: '内容运营 Amy', content: '如果把常用 AI 能力统一收纳，日常效率会稳定很多。' },
    ],
  },
]

export const tryOffers = [
  {
    slug: 'founding-pass',
    title: '首批体验官通行证',
    subtitle: '优先使用最新功能，参与共创与反馈。',
    price: '¥29',
    originalPrice: '¥99',
    benefits: ['抢先体验新功能', '专属权益与优惠', '内测资格解锁'],
    banner: bannerTry,
  },
]

export const getProductBySlug = (slug) => products.find((item) => item.slug === slug)
