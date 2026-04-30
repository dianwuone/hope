<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const route = useRoute()
const slug = route.params.slug
const articles = [] // TODO: 按标签筛选
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '文章中心', to: '/articles' }, { label: slug }]" />
    <h1 class="text-3xl font-bold mb-2">{{ slug }}</h1>
    <p class="text-brand-charcoal/50 mb-8">标签下的文章</p>
    <div v-if="articles.length" class="grid md:grid-cols-2 gap-6">
      <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
    </div>
    <p v-else class="text-center text-brand-charcoal/40 py-16">该标签下暂无文章</p>
  </div>
</template>
