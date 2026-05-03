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
  title: '成为首批体验官',
  subtitle: '加入体验计划，优先使用最新功能，享受专属优惠，与开发者一起打磨产品。',
  banner: bannerTry,
  benefits: ['抢先体验新功能', '专属权益与优惠', '内测资格解锁'],
  testimonials: [
    { author: '体验官 A', content: '能直接看到产品迭代的过程，也能把自己的反馈变成更新。' },
    { author: '体验官 B', content: '相比冷冰冰的下载页，这里更像在和开发者一起共创。' },
  ],
  faq: [
    { q: '体验官适合谁？', a: '适合愿意尝鲜、乐于反馈、对新工具有兴趣的用户。' },
    { q: '购买后会获得什么？', a: '会获得优先体验资格、后续更新通知和阶段权益。' },
  ],
}

export const aboutPage = {
  title: '关于 QUENTIN WINDOW',
  subtitle: '一个独立开发者的产品与内容窗口，连接产品、内容、实验与社区。',
  story: [
    '我希望把做产品、写内容、做实验和与用户对话，放在同一个连续空间里。',
    '这个站点不是简单的作品集，也不是单一博客，而是一套不断成长中的个人品牌系统。',
  ],
  timeline: [
    { year: '2024', title: '开始整理独立开发方向' },
    { year: '2025', title: '形成产品、内容与实验三线并行模式' },
    { year: '2026', title: '搭建统一品牌站点与互动体验' },
  ],
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
