<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const sections = [
  {
    title: '内容',
    links: [
      { name: '文章中心', path: '/articles' },
      { name: '昆廷笔记', path: '/columns/kunting' },
      { name: '启鸣宝宝', path: '/columns/qiming' },
    ],
  },
  {
    title: '产品',
    links: [
      { name: '产品中心', path: '/products' },
      { name: '个人助手', path: '/products/personal-assistant' },
      { name: '育儿助手', path: '/products/parenting-assistant' },
      { name: 'AI工具助手', path: '/products/ai-tools' },
    ],
  },
  {
    title: '游戏',
    links: [
      { name: '游戏中心', path: '/games' },
      { name: '拼音大冒险', path: '/games/pinyin-adventure' },
      { name: '在线轻试玩', path: '/play' },
    ],
  },
  {
    title: '销售',
    links: [
      { name: '快来尝鲜', path: '/try' },
      { name: '下载与交付中心', path: '/downloads' },
    ],
  },
  {
    title: '实验室',
    links: [
      { name: '实验室', path: '/lab' },
    ],
  },
  {
    title: '社区',
    links: [
      { name: '心愿单', path: '/wishlist' },
      { name: '加入社区', path: '/community' },
    ],
  },
  {
    title: '关于',
    links: [
      { name: '关于', path: '/about' },
      { name: '隐私政策', path: '/privacy' },
    ],
  },
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '网站地图' }]" />
    <h1 class="text-3xl font-bold mb-8">网站地图</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="section in sections" :key="section.title" class="card">
        <h3 class="font-bold mb-3">{{ section.title }}</h3>
        <ul class="space-y-2">
          <li v-for="link in section.links" :key="link.path">
            <router-link :to="link.path" class="text-sm text-brand-charcoal/60 hover:text-accent-blue transition-colors">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
