<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { downloadsPage, products } from '@/data'

const feed = [
  { city: 'Shanghai', product: '个人助手', time: '1 分钟前' },
  { city: 'Hangzhou', product: '育儿助手', time: '3 分钟前' },
  { city: 'Shenzhen', product: 'AI 工具助手', time: '5 分钟前' },
  { city: 'Beijing', product: '个人助手', time: '8 分钟前' },
]
</script>

<template>
  <div>
    <PageHero eyebrow="Live Feed" title="下载动态墙" subtitle="用更具现场感的方式展示产品热度与增长状态。" :image="downloadsPage.banner" image-alt="下载动态墙" />
    <section class="section-shell">
      <div class="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="surface-panel p-8">
          <div class="space-y-4">
            <div v-for="item in feed" :key="`${item.city}-${item.product}-${item.time}`" class="flex items-center justify-between gap-4 rounded-card bg-brand-warm p-4">
              <div>
                <div class="font-medium text-brand-charcoal">{{ item.city }}</div>
                <div class="text-sm text-brand-text">下载了 {{ item.product }}</div>
              </div>
              <div class="text-xs text-brand-muted">{{ item.time }}</div>
            </div>
          </div>
        </div>
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">当前覆盖产品</h2>
          <div class="mt-6 space-y-4">
            <div v-for="product in products" :key="product.slug" class="flex items-center gap-4">
              <img :src="product.cover" :alt="product.name" class="h-14 w-14 rounded-xl object-cover" />
              <div>
                <div class="font-medium text-brand-charcoal">{{ product.name }}</div>
                <div class="text-xs text-brand-muted">{{ product.stage }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
