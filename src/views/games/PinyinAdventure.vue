<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
</script>

<template>
  <div>
    <section class="container-content py-section">
      <BreadcrumbNav :items="[
        { label: '首页', to: '/' },
        { label: '游戏中心', to: '/games' },
        { label: '拼音大冒险' }
      ]]" />
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-3xl font-bold mb-4">拼音大冒险</h1>
          <p class="text-lg text-brand-charcoal/60 mb-6">在冒险中学习拼音，在游戏中快乐成长</p>
          <div class="flex gap-3">
            <router-link to="/play" class="btn-primary">立即试玩</router-link>
            <button class="btn-outline">加入心愿单</button>
          </div>
        </div>
        <div class="aspect-video bg-mint/10 rounded-2xl flex items-center justify-center">
          <span class="text-6xl">🎮</span>
        </div>
      </div>
    </section>

    <section class="bg-white py-section">
      <div class="container-content">
        <h2 class="text-2xl font-bold mb-8 text-center">怎么玩？</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="(step, i) in ['选择关卡', '学习拼音', '完成挑战', '获得奖励']" :key="step" class="text-center">
            <div class="w-10 h-10 mx-auto mb-3 rounded-full bg-mint/20 flex items-center justify-center font-bold text-mint">
              {{ i + 1 }}
            </div>
            <h3 class="font-medium">{{ step }}</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
