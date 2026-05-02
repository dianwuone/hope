<script setup>
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { tryPage, tryOffers } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Try First" :title="tryPage.title" :subtitle="tryPage.subtitle" :image="tryPage.banner" image-alt="快来尝鲜" />
    <section class="section-shell">
      <div class="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">为什么加入体验计划</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div v-for="item in tryPage.benefits" :key="item" class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">{{ item }}</div>
          </div>
        </div>
        <div class="surface-panel p-8">
          <div class="text-sm text-brand-muted">当前主推方案</div>
          <div class="mt-3 text-3xl font-semibold text-brand-charcoal">{{ tryOffers[0].title }}</div>
          <div class="mt-6 flex items-end gap-3">
            <span class="text-4xl font-semibold text-accent-blue">{{ tryOffers[0].price }}</span>
            <span class="text-sm text-brand-muted line-through">{{ tryOffers[0].originalPrice }}</span>
          </div>
          <router-link :to="`/try/${tryOffers[0].slug}`" class="btn-primary mt-6">立即加入</router-link>
        </div>
      </div>
    </section>
    <section class="section-shell bg-white">
      <div class="container-content grid gap-8 lg:grid-cols-2">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">体验官反馈</h2>
          <div class="mt-6 space-y-4">
            <div v-for="item in tryPage.testimonials" :key="item.author" class="rounded-card bg-brand-warm p-4">
              <p class="text-sm leading-7 text-brand-text">{{ item.content }}</p>
              <div class="mt-3 text-sm font-medium text-brand-charcoal">{{ item.author }}</div>
            </div>
          </div>
        </div>
        <div class="surface-panel p-8">
          <FaqList :items="tryPage.faq" />
        </div>
      </div>
    </section>
  </div>
</template>
