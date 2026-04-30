<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div>
    <div class="container-content py-8">
      <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '下载动态墙' }]" />
      <h1 class="text-3xl font-bold mb-2">下载动态墙</h1>
      <p class="text-brand-charcoal/50 mb-8">看看大家都在下载什么</p>
    </div>

    <!-- 动态掉落区 -->
    <div class="h-96 bg-accent-blue/5 relative overflow-hidden mx-4 rounded-2xl">
      <div class="absolute inset-0 flex items-center justify-center">
        <p class="text-brand-charcoal/20">动态掉落动画区域</p>
      </div>
    </div>

    <!-- 统计 -->
    <div class="container-content py-8">
      <div class="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        <div class="text-center">
          <p class="text-2xl font-bold">0</p>
          <p class="text-xs text-brand-charcoal/40">总下载量</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold">0</p>
          <p class="text-xs text-brand-charcoal/40">今日下载</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold">-</p>
          <p class="text-xs text-brand-charcoal/40">最热门</p>
        </div>
      </div>
    </div>
  </div>
</template>
