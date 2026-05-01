<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '快来尝鲜', to: '/try' },
  { label: '购买' }
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="breadcrumbItems" />
    <div class="max-w-2xl mx-auto">
      <div class="card mb-6">
        <h2 class="font-bold text-lg mb-2">商品名称</h2>
        <p class="text-3xl font-bold text-amber mb-4">¥29</p>
        <ul class="text-sm text-brand-charcoal/60 space-y-2">
          <li>✓ 抢先体验资格</li>
          <li>✓ 优先技术支持</li>
          <li>✓ 终身更新</li>
        </ul>
      </div>
      <div class="card">
        <h3 class="font-medium mb-4">购买信息</h3>
        <div class="space-y-4">
          <input type="text" placeholder="姓名" class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none" />
          <input type="text" placeholder="联系方式（微信/邮箱）" class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none" />
          <button class="btn-warm w-full">确认购买</button>
        </div>
      </div>
    </div>
  </div>
</template>
