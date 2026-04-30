<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '在线轻试玩' }]" />
    <h1 class="text-2xl font-bold mb-8 text-center">在线轻试玩</h1>

    <!-- 游戏区域 -->
    <div class="max-w-3xl mx-auto">
      <div class="aspect-video bg-mint/10 rounded-2xl border-2 border-mint/20 flex items-center justify-center mb-6">
        <div class="text-center">
          <p class="text-4xl mb-4">🎮</p>
          <p class="text-brand-charcoal/40 mb-4">拼音大冒险</p>
          <button class="btn-primary">开始游戏</button>
        </div>
      </div>

      <!-- 分数 -->
      <div class="flex justify-center gap-8 mb-8">
        <div class="text-center">
          <p class="text-2xl font-bold">0</p>
          <p class="text-xs text-brand-charcoal/40">当前分数</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold">0</p>
          <p class="text-xs text-brand-charcoal/40">最高记录</p>
        </div>
      </div>

      <!-- 排行榜 -->
      <div class="card">
        <h3 class="font-medium mb-4">排行榜</h3>
        <p class="text-center text-brand-charcoal/40 py-8 text-sm">还没有记录，成为第一个！</p>
      </div>
    </div>
  </div>
</template>
