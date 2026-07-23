import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { siteMeta as localSiteMeta } from '@/data'

const routes = [
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
    meta: { title: '关于我', breadcrumb: ['首页', '关于我'] },
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
    path: '/privacy-policy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyPage.vue'),
    meta: { title: '隐私政策', breadcrumb: ['首页', '隐私政策'] },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/TermsPage.vue'),
    meta: { title: '服务条款', breadcrumb: ['首页', '服务条款'] },
  },
  {
    path: '/columns/kunting',
    name: 'ColumnKunting',
    component: () => import('@/views/columns/KuntingPage.vue'),
    meta: { title: '职场手记', breadcrumb: ['首页', '职场手记'] },
  },
  {
    path: '/columns/qiming',
    name: 'ColumnQiming',
    component: () => import('@/views/columns/QimingPage.vue'),
    meta: { title: '育儿随记', breadcrumb: ['首页', '育儿随记'] },
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/views/articles/ArticleCenter.vue'),
    meta: { title: '文章归档', breadcrumb: ['首页', '文章归档'] },
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
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/products/ProductCenter.vue'),
    meta: { title: '个人应用', breadcrumb: ['首页', '个人应用'] },
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/products/ProductDetail.vue'),
    meta: { title: '产品详情', breadcrumb: ['首页', '产品中心', '产品'] },
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('@/views/games/GameCenter.vue'),
    meta: { title: '亲子互动', breadcrumb: ['首页', '亲子互动'] },
  },
  {
    path: '/games/pinyin-adventure',
    name: 'PinyinAdventure',
    component: () => import('@/views/games/PinyinAdventure.vue'),
    meta: { title: '拼音大冒险', breadcrumb: ['首页', '游戏中心', '拼音大冒险'] },
  },
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
  {
    path: '/lab',
    name: 'Lab',
    component: () => import('@/views/lab/LabPage.vue'),
    meta: { title: '我的小实验', breadcrumb: ['首页', '我的小实验'] },
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
  {
    path: '/download-wall',
    name: 'DownloadWall',
    component: () => import('@/views/DownloadWall.vue'),
    meta: { title: '资源整理页', breadcrumb: ['首页', '资源整理页'] },
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('@/views/PlayPage.vue'),
    meta: { title: '在线体验页', breadcrumb: ['首页', '在线体验页'] },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/WishlistPage.vue'),
    meta: { title: '心愿单', breadcrumb: ['首页', '心愿单'] },
  },
  {
    path: '/wishlist/submit',
    name: 'WishlistSubmit',
    component: () => import('@/views/WishlistSubmitPage.vue'),
    meta: { title: '提交心愿', breadcrumb: ['首页', '心愿单', '提交心愿'] },
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/UserProfilePage.vue'),
    meta: { title: '个人中心', breadcrumb: ['首页', '个人中心'] },
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/CommunityPage.vue'),
    meta: { title: '联系我', breadcrumb: ['首页', '联系我'] },
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: () => import('@/views/SubscribePage.vue'),
    meta: { title: '订阅更新', breadcrumb: ['首页', '订阅更新'] },
  },
  {
    path: '/auth/login',
    name: 'UserLogin',
    component: () => import('@/views/auth/UserLoginPage.vue'),
    meta: { title: '用户登录', breadcrumb: ['首页', '登录'] },
  },
  {
    path: '/auth/register',
    name: 'UserRegister',
    component: () => import('@/views/auth/UserRegisterPage.vue'),
    meta: { title: '用户注册', breadcrumb: ['首页', '注册'] },
  },
  {
    path: '/auth/forgot-password',
    name: 'UserForgotPassword',
    component: () => import('@/views/auth/UserForgotPasswordPage.vue'),
    meta: { title: '找回密码', breadcrumb: ['首页', '找回密码'] },
  },
  {
    path: '/open-source',
    name: 'OpenSource',
    component: () => import('@/views/OpenSourcePage.vue'),
    meta: { title: '开源项目', breadcrumb: ['首页', '开源项目'] },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogPage.vue'),
    meta: { title: '博客', breadcrumb: ['首页', '博客'] },
  },
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

// 默认适配 GitHub Pages(hash)，宝塔使用 history 模式
const history = import.meta.env.VITE_BAOTA === 'true'
  ? createWebHistory(import.meta.env.BASE_URL)
  : createWebHashHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to) => {
  const titleSuffix = localSiteMeta.titleSuffix || localSiteMeta.name || '琨庭笔记'
  document.title = to.meta.title
    ? `${to.meta.title} — ${titleSuffix}`
    : titleSuffix
})

export default router
