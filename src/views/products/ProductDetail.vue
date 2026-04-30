<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()
// TODO: 根据 route.params.slug 加载产品数据
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="container-content py-section">
      <BreadcrumbNav :items="[
        { label: '首页', to: '/' },
        { label: '产品中心', to: '/products' },
        { label: '产品名称' }
      ]]" />
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-3xl font-bold mb-4">产品名称</h1>
          <p class="text-lg text-brand-charcoal/60 mb-6">一句话价值主张</p>
          <button class="btn-primary">立即下载</button>
        </div>
        <div class="aspect-video bg-brand-grey/20 rounded-2xl flex items-center justify-center">
          <span class="text-brand-charcoal/10">产品截图</span>
        </div>
      </div>
    </section>

    <!-- 功能亮点 -->
    <section class="bg-white py-section">
      <div class="container-content">
        <h2 class="text-2xl font-bold mb-8 text-center">功能亮点</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="text-center">
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-blue/10 flex items-center justify-center">
              <span class="text-accent-blue">✦</span>
            </div>
            <h3 class="font-medium mb-2">功能 {{ i }}</h3>
            <p class="text-sm text-brand-charcoal/50">功能描述</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="container-content py-section">
      <h2 class="text-2xl font-bold mb-8 text-center">常见问题</h2>
      <div class="max-w-2xl mx-auto space-y-4">
        <details v-for="i in 3" :key="i" class="card group">
          <summary class="cursor-pointer font-medium">问题 {{ i }}？</summary>
          <p class="mt-3 text-sm text-brand-charcoal/60">回答内容...</p>
        </details>
      </div>
    </section>
  </div>
</template>
