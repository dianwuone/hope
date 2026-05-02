<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { playPage } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Play Online" :title="playPage.title" :subtitle="playPage.subtitle" :image="playPage.banner" image-alt="在线轻试玩" />
    <section class="section-shell">
      <div class="container-content">
        <div class="surface-panel p-8">
          <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 class="text-2xl font-semibold text-brand-charcoal">试玩入口</h2>
              <p class="mt-4 text-sm leading-7 text-brand-text">这里先保留为前端展示版，后续可以接真正的浏览器小游戏或轻交互试玩模块。</p>
              <router-link to="/games/pinyin-adventure" class="btn-primary mt-6">查看拼音大冒险</router-link>
            </div>
            <div class="rounded-panel bg-gradient-to-br from-accent-soft to-mint-light p-10 text-center">
              <div class="text-7xl">🦖</div>
              <div class="mt-4 text-lg font-medium text-brand-charcoal">浏览器轻试玩占位区</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
