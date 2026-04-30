<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()
// TODO: 根据 route.params.slug 加载文章数据
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[
      { label: '首页', to: '/' },
      { label: '昆廷笔记', to: '/columns/kunting' },
      { label: '文章标题' }
    ]]" />

    <article class="max-w-prose mx-auto">
      <h1 class="text-3xl font-bold mb-4">文章标题</h1>
      <div class="flex items-center gap-3 text-sm text-brand-charcoal/50 mb-8">
        <span>昆廷</span>
        <span>·</span>
        <span>2026-04-30</span>
        <span>·</span>
        <span>128 阅读</span>
      </div>
      <div class="flex gap-2 mb-8">
        <span class="badge-blue">AI提效</span>
      </div>

      <!-- 正文占位 -->
      <div class="prose prose-neutral max-w-none">
        <p>文章正文内容将在这里渲染。支持 Markdown 格式。</p>
        <h2>第一个章节</h2>
        <p>章节内容...</p>
      </div>

      <!-- 互动 -->
      <div class="mt-12 pt-8 border-t border-brand-grey/30 flex items-center gap-6">
        <button class="flex items-center gap-2 text-brand-charcoal/50 hover:text-coral transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>点赞</span>
        </button>
      </div>
    </article>
  </div>
</template>
