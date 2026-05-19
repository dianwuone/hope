export const siteMeta = {
  name: '启鸣随笔',
  titleSuffix: '启鸣随笔',
  tagline: '个人育儿、职场与成长记录',
  description: '记录育儿心得、职场感悟与个人成长的点滴思考。',
  copyright: '启鸣随笔',
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
  { name: '亲子互动', path: '/games' },
  { name: '我的小实验', path: '/lab' },
  { name: '关于我', path: '/about' },
]

export const footerSections = [
  {
    title: '我的记录',
    links: [
      { name: '职场手记', path: '/columns/kunting' },
      { name: '育儿随记', path: '/columns/qiming' },
      { name: '文章归档', path: '/articles' },
    ],
  },
  {
    title: '个人应用',
    links: [
      { name: '应用展示', path: '/products' },
      { name: '个人助手', path: '/products/personal-assistant' },
      { name: '育儿助手', path: '/products/parenting-assistant' },
      { name: 'AI 工具小帮手', path: '/products/ai-tools' },
    ],
  },
  {
    title: '陪伴互动',
    links: [
      { name: '亲子互动页', path: '/games' },
      { name: '拼音大冒险', path: '/games/pinyin-adventure' },
    ],
  },
  {
    title: '其他入口',
    links: [
      { name: '在线轻试玩', path: '/play' },
      { name: '下载动态墙', path: '/download-wall' },
      { name: '我的小实验', path: '/lab' },
    ],
  },
]

export const socialLinks = [
  { name: 'GitHub', href: '#' },
  { name: '微信', href: '#' },
  { name: 'Email', href: '' },
]
