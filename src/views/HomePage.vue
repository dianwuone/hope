<script setup>
/**
 * 首页 — 全站总入口
 * 区块: Hero、产品矩阵、尝鲜横幅、双IP内容、游戏入口、实验室入口、社区入口、下载动态墙
 */
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'

// Mock data — 后续替换为API
const hero = ref({
  title: 'QUENTIN WINDOW',
  subtitle: '独立开发者的窗口 — 产品、内容与实验',
})

const products = ref([
  { name: '个人助手', slug: 'personal-assistant', shortDesc: '你的AI个人助理，管理日程、整理笔记、处理邮件', stage: 'published', supportStatus: 'download' },
  { name: '育儿助手', slug: 'parenting-assistant', shortDesc: 'AI育儿顾问，记录成长、解答疑惑、分享时光', stage: 'beta', supportStatus: 'beta_apply' },
  { name: 'AI工具助手', slug: 'ai-tools', shortDesc: '精选AI工具合集，提升工作效率', stage: 'coming_soon', supportStatus: 'wishlist' },
])

const featuredArticles = ref([
  { title: '用AI提升个人效率的5个实践', slug: 'ai-efficiency', summary: '分享我在日常工作中使用AI工具提效的真实经验', column: 'kunting', publishedAt: '2026-04-20', tags: ['AI提效'] },
  { title: '幼小衔接：拼音学习的正确姿势', slug: 'pinyin-learning', summary: '从教育理念出发，聊聊拼音启蒙的方法论', column: 'qiming', publishedAt: '2026-04-18', tags: ['幼小衔接'] },
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="container-content py-section-lg">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{{ hero.title }}</h1>
          <p class="text-lg text-brand-charcoal/60 mb-8">{{ hero.subtitle }}</p>
          <div class="flex gap-3">
            <router-link to="/products" class="btn-primary">探索产品</router-link>
            <router-link to="/try" class="btn-outline">快来尝鲜</router-link>
          </div>
        </div>
        <div class="aspect-square bg-accent-blue/5 rounded-2xl flex items-center justify-center">
          <span class="text-brand-charcoal/10 text-6xl font-bold">QW</span>
        </div>
      </div>
    </section>

    <!-- 产品矩阵 -->
    <section class="bg-white py-section">
      <div class="container-content">
        <h2 class="text-2xl font-bold mb-2">核心产品</h2>
        <p class="text-brand-charcoal/50 mb-8">三个独立应用，解决真实问题</p>
        <div class="grid md:grid-cols-3 gap-6">
          <ProductCard v-for="p in products" :key="p.slug" :product="p" />
        </div>
      </div>
    </section>

    <!-- 快来尝鲜横幅 -->
    <section class="bg-accent-blue/5 py-16">
      <div class="container-content text-center">
        <h2 class="text-2xl font-bold mb-2">快来尝鲜</h2>
        <p class="text-brand-charcoal/50 mb-6">抢先体验，支持独立开发</p>
        <router-link to="/try" class="btn-warm">发现好物</router-link>
      </div>
    </section>

    <!-- 双IP内容入口 -->
    <section class="container-content py-section">
      <h2 class="text-2xl font-bold mb-8">最新内容</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <ArticleCard v-for="a in featuredArticles" :key="a.slug" :article="a" />
      </div>
      <div class="text-center mt-8">
        <router-link to="/articles" class="btn-outline">查看全部文章</router-link>
      </div>
    </section>

    <!-- 游戏入口 -->
    <section class="bg-mint/5 py-section">
      <div class="container-content text-center">
        <h2 class="text-2xl font-bold mb-2">游戏与互动</h2>
        <p class="text-brand-charcoal/50 mb-6">寓教于乐，探索学习的新方式</p>
        <router-link to="/games" class="btn-outline">进入游戏中心</router-link>
      </div>
    </section>

    <!-- 实验室入口 -->
    <section class="bg-lab/5 py-section">
      <div class="container-content text-center">
        <h2 class="text-2xl font-bold mb-2">实验室</h2>
        <p class="text-brand-charcoal/50 mb-6">探索中的未来项目</p>
        <router-link to="/lab" class="btn-outline">进入实验室</router-link>
      </div>
    </section>

    <!-- 社区入口 -->
    <section class="container-content py-section text-center">
      <h2 class="text-2xl font-bold mb-2">加入社区</h2>
      <p class="text-brand-charcoal/50 mb-6">和志同道合的人一起交流</p>
      <router-link to="/community" class="btn-primary">加入我们</router-link>
    </section>
  </div>
</template>
