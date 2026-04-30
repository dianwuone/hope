<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '关于' }]" />

    <!-- Hero -->
    <div class="text-center mb-16">
      <div class="w-32 h-32 mx-auto rounded-full bg-brand-grey/20 mb-6 flex items-center justify-center">
        <span class="text-4xl text-brand-charcoal/20">Q</span>
      </div>
      <h1 class="text-3xl font-bold mb-2">昆廷</h1>
      <p class="text-brand-charcoal/50 mb-4">独立开发者 / 内容创作者 / 终身学习者</p>
      <p class="max-w-xl mx-auto text-brand-charcoal/60">
        用技术创造有价值的产品，用内容分享真实的思考。
      </p>
    </div>

    <!-- 核心理念 -->
    <div class="grid md:grid-cols-4 gap-6 mb-16">
      <div v-for="value in ['独立创作', '真实有用', '持续迭代', '用户至上']" :key="value"
        class="text-center p-6 rounded-card">
        <h3 class="font-medium mb-2">{{ value }}</h3>
        <p class="text-sm text-brand-charcoal/50">理念描述</p>
      </div>
    </div>

    <!-- 双IP -->
    <div class="grid md:grid-cols-2 gap-6 mb-16">
      <router-link to="/columns/kunting" class="card">
        <h3 class="font-bold text-lg mb-2 text-accent-blue-dark">昆廷笔记</h3>
        <p class="text-sm text-brand-charcoal/60">关于技术、思考与生活的个人笔记</p>
      </router-link>
      <router-link to="/columns/qiming" class="card">
        <h3 class="font-bold text-lg mb-2 text-coral">启鸣宝宝</h3>
        <p class="text-sm text-brand-charcoal/60">关于成长、陪伴与爱的育儿笔记</p>
      </router-link>
    </div>

    <!-- 发展历程 -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold mb-8 text-center">发展历程</h2>
      <div class="max-w-2xl mx-auto space-y-8">
        <div v-for="milestone in ['2024.01 — 开始独立开发之路', '2024.06 — 发布个人助手 v1.0', '2025.01 — 昆廷笔记专栏上线', '2025.06 — 育儿助手 Beta 发布']"
          :key="milestone" class="flex gap-4">
          <div class="w-3 h-3 rounded-full bg-accent-blue mt-1.5 shrink-0"></div>
          <div>
            <p class="font-medium">{{ milestone }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系 -->
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">联系我</h2>
      <router-link to="/community" class="btn-primary">加入社区</router-link>
    </div>
  </div>
</template>
