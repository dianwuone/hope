<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import ProductCard from '@/components/ProductCard.vue'

const products = [
  { name: '个人助手', slug: 'personal-assistant', shortDesc: '你的AI个人助理', stage: 'published', supportStatus: 'download' },
  { name: '育儿助手', slug: 'parenting-assistant', shortDesc: 'AI育儿顾问', stage: 'beta', supportStatus: 'beta_apply' },
  { name: 'AI工具助手', slug: 'ai-tools', shortDesc: '精选AI工具合集', stage: 'coming_soon', supportStatus: 'wishlist' },
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '产品中心' }]" />
    <h1 class="text-3xl font-bold mb-2">产品中心</h1>
    <p class="text-brand-charcoal/50 mb-8">三个独立应用，解决真实问题</p>
    <div class="grid md:grid-cols-3 gap-6">
      <ProductCard v-for="p in products" :key="p.slug" :product="p" />
    </div>
  </div>
</template>
