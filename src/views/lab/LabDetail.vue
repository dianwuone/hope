<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '实验室', to: '/lab' },
  { label: '项目名称' }
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="breadcrumbItems" />
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-lab/10 flex items-center justify-center">
          <span class="text-3xl">🔬</span>
        </div>
        <span class="badge-purple mb-3">原型中</span>
        <h1 class="text-3xl font-bold mt-2 mb-4">项目名称</h1>
        <p class="text-brand-charcoal/60">项目一句话描述</p>
        <div class="flex gap-3 justify-center mt-6">
          <button class="btn-outline">加入心愿单</button>
          <router-link to="/community" class="btn-primary">加入社区关注</router-link>
        </div>
      </div>
      <div class="prose prose-neutral max-w-none">
        <h2>关于这个项目</h2>
        <p>项目背景和目标...</p>
        <h2>开发进度</h2>
        <p>路线图...</p>
      </div>
    </div>
  </div>
</template>
