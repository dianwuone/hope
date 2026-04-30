import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 核心主页面
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
    meta: { title: '关于', breadcrumb: ['首页', '关于'] },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchPage.vue'),
    meta: { title: '搜索结果', breadcrumb: ['首页', '搜索结果'] },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { title: '404' },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyPage.vue'),
    meta: { title: '隐私政策', breadcrumb: ['首页', '隐私政策'] },
  },

  // 专栏
  {
    path: '/columns/kunting',
    name: 'ColumnKunting',
    component: () => import('@/views/columns/KuntingPage.vue'),
    meta: { title: '昆廷笔记', breadcrumb: ['首页', '昆廷笔记'] },
  },
  {
    path: '/columns/qiming',
    name: 'ColumnQiming',
    component: () => import('@/views/columns/QimingPage.vue'),
    meta: { title: '启鸣宝宝', breadcrumb: ['首页', '启鸣宝宝'] },
  },

  // 文章
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/views/articles/ArticleCenter.vue'),
    meta: { title: '文章中心', breadcrumb: ['首页', '文章中心'] },
  },
  {
    path: '/articles/tags/:slug',
    name: 'ArticleTag',
    component: () => import('@/views/articles/ArticleTag.vue'),
    meta: { title: '文章分类', breadcrumb: ['首页', '文章中心', '标签'] },
  },
  {
    path: '/articles/:slug',
    name: 'ArticleDetail',
    component: () => import('@/views/articles/ArticleDetail.vue'),
    meta: { title: '文章详情', breadcrumb: ['首页', '文章中心', '文章'] },
  },

  // 产品
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/products/ProductCenter.vue'),
    meta: { title: '产品中心', breadcrumb: ['首页', '产品中心'] },
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/products/ProductDetail.vue'),
    meta: { title: '产品详情', breadcrumb: ['首页', '产品中心', '产品'] },
  },

  // 游戏
  {
    path: '/games',
    name: 'Games',
    component: () => import('@/views/games/GameCenter.vue'),
    meta: { title: '游戏中心', breadcrumb: ['首页', '游戏中心'] },
  },
  {
    path: '/games/pinyin-adventure',
    name: 'PinyinAdventure',
    component: () => import('@/views/games/PinyinAdventure.vue'),
    meta: { title: '拼音大冒险', breadcrumb: ['首页', '游戏中心', '拼音大冒险'] },
  },

  // 销售
  {
    path: '/try',
    name: 'Try',
    component: () => import('@/views/try/TryPage.vue'),
    meta: { title: '快来尝鲜', breadcrumb: ['首页', '快来尝鲜'] },
  },
  {
    path: '/try/:offerSlug',
    name: 'Purchase',
    component: () => import('@/views/try/PurchasePage.vue'),
    meta: { title: '购买', breadcrumb: ['首页', '快来尝鲜', '购买'] },
  },
  {
    path: '/try/success',
    name: 'PurchaseSuccess',
    component: () => import('@/views/try/PurchaseSuccess.vue'),
    meta: { title: '购买成功', breadcrumb: ['首页', '快来尝鲜', '购买成功'] },
  },

  // 实验室
  {
    path: '/lab',
    name: 'Lab',
    component: () => import('@/views/lab/LabPage.vue'),
    meta: { title: '实验室', breadcrumb: ['首页', '实验室'] },
  },
  {
    path: '/lab/:slug',
    name: 'LabDetail',
    component: () => import('@/views/lab/LabDetail.vue'),
    meta: { title: '实验室详情', breadcrumb: ['首页', '实验室', '项目'] },
  },
  {
    path: '/lab/:slug/apply',
    name: 'LabApply',
    component: () => import('@/views/lab/LabApply.vue'),
    meta: { title: '内测报名', breadcrumb: ['首页', '实验室', '内测报名'] },
  },

  // 互动
  {
    path: '/download-wall',
    name: 'DownloadWall',
    component: () => import('@/views/DownloadWall.vue'),
    meta: { title: '下载动态墙', breadcrumb: ['首页', '下载动态墙'] },
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('@/views/PlayPage.vue'),
    meta: { title: '在线轻试玩', breadcrumb: ['首页', '在线轻试玩'] },
  },

  // 社区
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/WishlistPage.vue'),
    meta: { title: '心愿单', breadcrumb: ['首页', '心愿单'] },
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/CommunityPage.vue'),
    meta: { title: '加入社区', breadcrumb: ['首页', '加入社区'] },
  },

  // 辅助
  {
    path: '/downloads',
    name: 'Downloads',
    component: () => import('@/views/DownloadsPage.vue'),
    meta: { title: '下载与交付中心', breadcrumb: ['首页', '下载与交付中心'] },
  },
  {
    path: '/sitemap',
    name: 'Sitemap',
    component: () => import('@/views/SitemapPage.vue'),
    meta: { title: '网站地图', breadcrumb: ['首页', '网站地图'] },
  },

  // 兜底 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

// 路由守卫 — 设置页面标题
router.beforeEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} — QUENTIN WINDOW`
    : 'QUENTIN WINDOW'
})

export default router
