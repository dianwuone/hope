export const siteMeta = {
  name: '琨庭笔记',
  titleSuffix: '琨庭笔记',
  tagline: '琨庭笔记',
  description: '琨庭笔记',
  copyright: '琨庭笔记',
  beian: {
    label: '蜀ICP备19016117号-1',
    href: 'https://beian.miit.gov.cn/',
  },
}

export const mainNav = [
  { name: '首页', path: '/' },
  { name: '职场手记', path: '/columns/kunting' },
  { name: '育儿随记', path: '/columns/qiming' },
  { name: '文章归档', path: '/articles' },
  { name: '个人应用', path: '/products' },
  { name: '我的小实验', path: '/lab' },
  { name: '关于我', path: '/about' },
]

export const footerSections = [
  {
    title: '我的记录',
    links: [
      { name: '职场手记', path: '/columns/kunting' },
      { name: '育儿随记', path: '/columns/qiming' },
      { name: '全部文章', path: '/articles' },
    ],
  },
  {
    title: '我的工具',
    links: [
      { name: '我的应用', path: '/products' },
      { name: '生活小助手', path: '/products/personal-assistant' },
      { name: '育儿小助手', path: '/products/parenting-assistant' },
      { name: 'AI 效率工具', path: '/products/ai-tools' },
    ],
  },
  {
    title: '更多页面',
    links: [
      { name: '资源下载页', path: '/download-wall' },
      { name: '随手小实验', path: '/lab' },
      { name: '联系我', path: '/community' },
    ],
  },
]

export const socialLinks = [
  { name: 'GitHub', href: '#' },
  { name: '微信', href: '#' },
  { name: 'Email', href: '' },
]
