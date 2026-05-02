<script setup>
import PageHero from '@/components/site/PageHero.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { gamesPage } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Games" :title="gamesPage.title" :subtitle="gamesPage.subtitle" :image="gamesPage.banner" image-alt="游戏中心" />
    <section class="section-shell">
      <div class="container-content grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <router-link to="/games/pinyin-adventure" class="card overflow-hidden !p-0">
          <div class="aspect-[16/10] bg-gradient-to-br from-mint-light to-accent-soft p-8">
            <div class="text-6xl">🦖</div>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap gap-2">
              <span class="badge-green">适合 4-8 岁</span>
              <span class="badge-blue">主打项目</span>
            </div>
            <h3 class="mt-4 text-2xl font-semibold text-brand-charcoal">拼音大冒险</h3>
            <p class="mt-3 text-sm leading-7 text-brand-text">在冒险中学习拼音，在游戏中快乐成长，把启蒙练习变成愿意反复参与的体验。</p>
          </div>
        </router-link>
        <div class="surface-panel p-6">
          <SectionTitle title="为什么做游戏化入口" />
          <p class="mt-4 text-sm leading-7 text-brand-text">游戏中心不仅是一个独立频道，也是产品、内容和实验室之间的互动桥梁。</p>
          <div class="mt-6 space-y-4">
            <div class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">把启蒙内容做得更容易开始</div>
            <div class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">把试玩成本降低到“打开网页即可开始”</div>
            <div class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">为后续实验性内容提供自然试验场</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
