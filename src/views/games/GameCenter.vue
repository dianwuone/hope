<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '游戏中心' }]" />
    <h1 class="text-3xl font-bold mb-2">游戏中心</h1>
    <p class="text-brand-charcoal/50 mb-8">寓教于乐，探索学习的新方式</p>
    <div class="grid md:grid-cols-2 gap-6">
      <router-link to="/games/pinyin-adventure" class="card">
        <div class="aspect-video bg-mint/10 rounded-lg mb-4 flex items-center justify-center">
          <span class="text-4xl">🎮</span>
        </div>
        <h3 class="font-bold text-lg mb-2">拼音大冒险</h3>
        <p class="text-sm text-brand-charcoal/60 mb-4">在冒险中学习拼音，在游戏中快乐成长</p>
        <div class="flex gap-2">
          <span class="badge-green">适合 4-8 岁</span>
          <span class="badge-blue">已发布</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
