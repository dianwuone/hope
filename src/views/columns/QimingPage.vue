<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const articles = [
  { title: '幼小衔接：拼音学习的正确姿势', slug: 'pinyin-learning', summary: '从教育理念出发，聊聊拼音启蒙的方法论', column: 'qiming', publishedAt: '2026-04-18', tags: ['幼小衔接'] },
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '启鸣宝宝' }]" />
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">启鸣宝宝</h1>
      <p class="text-brand-charcoal/50">关于成长、陪伴与爱的育儿笔记</p>
    </div>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="tag in ['全部', '幼小衔接', '亲子游戏', '启蒙教育', '育儿心得']" :key="tag"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-coral transition-all">
        {{ tag }}
      </button>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <ArticleCard v-for="a in articles" :key="a.slug" :article="a" />
    </div>
  </div>
</template>
