<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import EmptyState from '@/components/EmptyState.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '心愿单' }]" />
    <h1 class="text-3xl font-bold mb-2">我的心愿单</h1>
    <p class="text-brand-charcoal/50 mb-8">你感兴趣的所有项目，都在这里</p>
    <div class="flex gap-2 mb-8 flex-wrap">
      <button v-for="f in ['全部', '想体验', '想下载', '想内测', '想购买', '已实现']" :key="f"
        class="px-4 py-1.5 rounded-full text-sm border border-brand-grey hover:border-[#D4A0A0] transition-all">
        {{ f }}
      </button>
    </div>
    <EmptyState title="还没有心愿" description="去发现感兴趣的项目吧">
      <div class="flex gap-3 justify-center">
        <router-link to="/products" class="btn-outline text-sm">产品中心</router-link>
        <router-link to="/games" class="btn-outline text-sm">游戏中心</router-link>
        <router-link to="/lab" class="btn-outline text-sm">实验室</router-link>
      </div>
    </EmptyState>
  </div>
</template>
