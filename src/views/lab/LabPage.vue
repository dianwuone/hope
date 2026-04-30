<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '实验室' }]" />
    <h1 class="text-3xl font-bold mb-2">实验室</h1>
    <p class="text-brand-charcoal/50 mb-8">探索中的未来项目</p>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="f in ['全部', '想法中', '原型中', '内测中']" :key="f"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-lab transition-all">
        {{ f }}
      </button>
    </div>
    <p class="text-center text-brand-charcoal/40 py-16">实验室还在准备中...</p>
  </div>
</template>
