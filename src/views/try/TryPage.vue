<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '快来尝鲜' }]" />
    <h1 class="text-3xl font-bold mb-2">快来尝鲜</h1>
    <p class="text-brand-charcoal/50 mb-8">抢先体验，支持独立开发</p>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="f in ['全部', '订阅', '内测资格', '数字包']" :key="f"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-amber transition-all">
        {{ f }}
      </button>
    </div>
    <p class="text-center text-brand-charcoal/40 py-16">暂无可尝鲜的内容</p>
  </div>
</template>
