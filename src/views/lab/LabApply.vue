<script setup>
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const route = useRoute()

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '实验室', to: '/lab' },
  { label: '内测报名' }
]
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="breadcrumbItems" />
    <div class="max-w-lg mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">申请内测</h1>
        <p class="text-brand-charcoal/50">填写以下信息，我们会尽快审核并联系你</p>
      </div>
      <div class="card space-y-4">
        <input type="text" placeholder="姓名或昵称" class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-lab focus:ring-2 focus:ring-lab/20 outline-none" />
        <input type="text" placeholder="联系方式（微信/邮箱）" class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-lab focus:ring-2 focus:ring-lab/20 outline-none" />
        <select class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-lab focus:ring-2 focus:ring-lab/20 outline-none">
          <option value="">选择申请角色</option>
          <option>探索者 — 我想体验新功能</option>
          <option>共创者 — 我想参与产品改进</option>
          <option>家长用户 — 我为孩子寻找好工具</option>
          <option>效率用户 — 我想提升工作效率</option>
        </select>
        <textarea placeholder="场景说明（可选）" rows="3" class="w-full px-4 py-3 rounded-lg border border-brand-grey focus:border-lab focus:ring-2 focus:ring-lab/20 outline-none resize-none"></textarea>
        <button class="btn-primary w-full">提交申请</button>
      </div>
    </div>
  </div>
</template>
