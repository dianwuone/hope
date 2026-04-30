<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '下载与交付中心' }]" />
    <h1 class="text-3xl font-bold mb-2">下载与交付中心</h1>
    <p class="text-brand-charcoal/50 mb-8">你的下载、订单和版本更新，都在这里</p>

    <!-- 我的订单 -->
    <div class="mb-12">
      <h2 class="text-xl font-bold mb-4">我的订单</h2>
      <p class="text-center text-brand-charcoal/40 py-12">暂无订单</p>
    </div>

    <!-- 版本历史 -->
    <div>
      <h2 class="text-xl font-bold mb-4">版本更新</h2>
      <p class="text-center text-brand-charcoal/40 py-12">暂无版本信息</p>
    </div>
  </div>
</template>
