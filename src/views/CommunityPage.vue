<script setup>
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { communityPage, homePage } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Community" :title="communityPage.title" :subtitle="communityPage.subtitle" :image="communityPage.banner" image-alt="加入社区" />
    <section class="section-shell">
      <div class="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">加入后你会获得什么</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div v-for="item in communityPage.benefits" :key="item" class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">{{ item }}</div>
          </div>
        </div>
        <div class="surface-panel p-8 text-center">
          <img :src="homePage.community.qr" alt="加入社区二维码" class="mx-auto h-56 w-56 rounded-xl object-cover" />
          <p class="mt-4 text-sm text-brand-text">扫码加入微信</p>
        </div>
      </div>
    </section>
    <section class="section-shell bg-white">
      <div class="container-reading">
        <FaqList :items="communityPage.faq" />
      </div>
    </section>
  </div>
</template>
