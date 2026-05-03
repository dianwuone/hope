<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '网站地图' },
]

const sections = [
  {
    title: '内容',
    icon: '▣',
    items: [
      { name: '昆廷笔记', path: '/columns/kunting' },
      { name: '启鸣宝宝', path: '/columns/qiming' },
      { name: '文章中心', path: '/articles' },
      { name: '文章分类聚合页', path: '/articles/tags/:slug' },
      { name: '文章详情页', path: '/articles/:slug' },
    ],
  },
  {
    title: '产品',
    icon: '◫',
    items: [
      { name: '产品中心', path: '/products' },
      { name: '个人助手详情页', path: '/products/personal-assistant' },
      { name: '育儿助手详情页', path: '/products/parenting-assistant' },
      { name: 'AI 工具助手详情页', path: '/products/ai-tools' },
    ],
  },
  {
    title: '游戏',
    icon: '✦',
    items: [
      { name: '游戏中心', path: '/games' },
      { name: '拼音大冒险详情页', path: '/games/pinyin-adventure' },
    ],
  },
  {
    title: '互动体验',
    icon: '◌',
    items: [
      { name: '在线轻试玩', path: '/play' },
      { name: '下载动态墙', path: '/download-wall' },
    ],
  },
  {
    title: '销售与交付',
    icon: '↓',
    items: [
      { name: '快来尝鲜', path: '/try' },
      { name: '购买页', path: '/try/:offerSlug' },
      { name: '购买成功页', path: '/try/success' },
      { name: '下载与交付中心', path: '/downloads' },
    ],
  },
  {
    title: '实验室',
    icon: '△',
    items: [
      { name: '实验室总页', path: '/lab' },
      { name: '实验室详情页', path: '/lab/:slug' },
      { name: '内测报名页', path: '/lab/:slug/apply' },
    ],
  },
  {
    title: '社区与关系',
    icon: '♡',
    items: [
      { name: '心愿单', path: '/wishlist' },
      { name: '提交心愿页', path: '/wishlist/submit' },
      { name: '加入社区 / 联系页', path: '/community' },
    ],
  },
  {
    title: '信息与辅助',
    icon: '◇',
    items: [
      { name: '关于页', path: '/about' },
      { name: '搜索结果页', path: '/search' },
      { name: '网站地图', path: '/sitemap' },
      { name: '隐私政策', path: '/privacy' },
      { name: '服务条款', path: '/terms' },
      { name: '404 页面', path: '/404' },
    ],
  },
]

const flows = [
  {
    title: '内容转化流',
    steps: ['首页', '昆廷笔记 / 启鸣宝宝', '文章详情页', '产品详情页', '快来尝鲜', '购买页', '购买成功页', '加入社区'],
  },
  {
    title: '产品体验流',
    steps: ['首页 / 产品中心', '产品详情页', '下载动态墙 / 心愿单 / 快来尝鲜', '购买页', '购买成功页', '下载与交付中心'],
  },
  {
    title: '游戏互动流',
    steps: ['首页 / 游戏中心', '拼音大冒险详情页', '在线轻试玩', '心愿单', '育儿助手详情页', '快来尝鲜'],
  },
  {
    title: '实验室承接流',
    steps: ['首页 / 实验室', '实验室详情页', '内测报名 / 心愿单 / 加入社区 / 快来尝鲜'],
  },
  {
    title: '心愿征集流',
    steps: ['产品详情 / 游戏详情 / 心愿单页', '提交心愿页', '加入社区', '后续内测 / 更新通知'],
  },
  {
    title: '辅助入口',
    steps: ['搜索结果页', '网站地图页', '404 页面'],
  },
]

const goals = [
  { title: '我想看文章', to: '/articles', icon: '▣' },
  { title: '我想找产品', to: '/products', icon: '◫' },
  { title: '我想玩游戏', to: '/games', icon: '✦' },
  { title: '我想尝鲜购买', to: '/try', icon: '↓' },
  { title: '我想加入内测', to: '/lab', icon: '△' },
  { title: '我想提交心愿', to: '/wishlist/submit', icon: '♡' },
]
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(196,221,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_42%,#F6FAFF_100%)] text-[#17233D]">
    <section class="border-b border-[#E5EDF8] bg-[radial-gradient(circle_at_72%_18%,rgba(207,231,255,0.24),transparent_18%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />
        <div class="max-w-[880px]">
          <div class="inline-flex rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#2F7AF3]">Sitemap</div>
          <h1 class="mt-5 font-serif text-5xl font-semibold text-[#17233D]">网站地图</h1>
          <p class="mt-5 text-lg leading-8 text-[#61718B]">
            汇总当前项目 29 个页面，并梳理主要访问关系，方便继续查漏补缺、收敛闭环。
          </p>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="container-content">
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="section in sections"
            :key="section.title"
            class="rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">
                {{ section.icon }}
              </span>
              <h2 class="text-2xl font-semibold text-[#17233D]">{{ section.title }}</h2>
            </div>

            <div class="mt-5 space-y-3">
              <div
                v-for="item in section.items"
                :key="`${section.title}-${item.path}`"
                class="rounded-[16px] border border-[#EDF2FA] bg-white px-4 py-3"
              >
                <div class="text-base font-semibold text-[#17233D]">{{ item.name }}</div>
                <div class="mt-1 text-sm text-[#7384A0]">{{ item.path }}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container-content">
        <div class="rounded-[28px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)] md:p-7">
          <h2 class="text-3xl font-semibold text-[#17233D]">主要流转关系</h2>
          <div class="mt-6 space-y-5">
            <div
              v-for="flow in flows"
              :key="flow.title"
              class="rounded-[22px] border border-[#EDF2FA] bg-white p-5"
            >
              <div class="text-xl font-semibold text-[#17233D]">{{ flow.title }}</div>
              <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <template v-for="(step, index) in flow.steps" :key="`${flow.title}-${step}`">
                  <span class="rounded-full bg-[#EEF4FF] px-4 py-2 font-semibold text-[#4A84F0]">{{ step }}</span>
                  <span v-if="index < flow.steps.length - 1" class="text-[#A4B4C9]">→</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 pt-8">
      <div class="container-content">
        <h2 class="text-3xl font-semibold text-[#17233D]">按目标浏览</h2>
        <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <router-link
            v-for="item in goals"
            :key="item.title"
            :to="item.to"
            class="flex items-center justify-between rounded-[22px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] px-6 py-5 shadow-[0_14px_30px_rgba(76,108,168,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(76,108,168,0.1)]"
          >
            <div class="flex items-center gap-4">
              <span class="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">
                {{ item.icon }}
              </span>
              <span class="text-xl font-semibold text-[#17233D]">{{ item.title }}</span>
            </div>
            <span class="text-[#2F7AF3]">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
