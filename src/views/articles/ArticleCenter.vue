<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const articles = [] // TODO: 接入API
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '文章中心' }]" />
    <h1 class="text-3xl font-bold mb-2">文章中心</h1>
    <p class="text-brand-charcoal/50 mb-8">来自两个专栏的思考与分享</p>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="f in ['全部', '昆廷笔记', '启鸣宝宝']" :key="f"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-accent-blue transition-all">
        {{ f }}
      </button>
    </div>
    <div v-if="articles.length" class="grid md:grid-cols-2 gap-6">
      <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
    </div>
    <EmptyState v-else title="暂无文章" description="去看看两个专栏吧">
      <div class="flex gap-3 justify-center">
        <router-link to="/columns/kunting" class="btn-outline text-sm">昆廷笔记</router-link>
        <router-link to="/columns/qiming" class="btn-outline text-sm">启鸣宝宝</router-link>
      </div>
    </EmptyState>
  </div>
</template>
