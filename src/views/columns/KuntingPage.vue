<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const articles = [
  { title: '用AI提升个人效率的5个实践', slug: 'ai-efficiency-5', summary: '分享我在日常工作中使用AI工具提效的真实经验', column: 'kunting', publishedAt: '2026-04-20', tags: ['AI提效'] },
  { title: '独立开发者的技术选型思考', slug: 'tech-stack-thinking', summary: '从Astro到Vue，我是怎么做技术决策的', column: 'kunting', publishedAt: '2026-04-15', tags: ['独立开发'] },
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '昆廷笔记' }]" />
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">昆廷笔记</h1>
      <p class="text-brand-charcoal/50">关于技术、思考与成长的个人笔记</p>
    </div>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="tag in ['全部', 'AI提效', '产品开发', '独立开发', '技术笔记']" :key="tag"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-accent-blue transition-all">
        {{ tag }}
      </button>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
    </div>
  </div>
</template>
