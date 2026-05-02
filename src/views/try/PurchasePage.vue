<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/site/PageHero.vue'
import { tryOffers } from '@/data'

const route = useRoute()
const offer = computed(() => tryOffers.find((item) => item.slug === route.params.offerSlug) || tryOffers[0])
</script>

<template>
  <div>
    <PageHero eyebrow="Checkout" :title="offer.title" :subtitle="offer.subtitle" compact />
    <section class="section-shell">
      <div class="container-reading">
        <div class="surface-panel p-8">
          <div class="flex items-end gap-3">
            <span class="text-4xl font-semibold text-accent-blue">{{ offer.price }}</span>
            <span class="text-sm text-brand-muted line-through">{{ offer.originalPrice }}</span>
          </div>
          <div class="mt-6 space-y-3">
            <div v-for="item in offer.benefits" :key="item" class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">{{ item }}</div>
          </div>
          <div class="mt-8 grid gap-4">
            <input type="text" placeholder="姓名" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <input type="email" placeholder="邮箱" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <button type="button" class="btn-primary justify-center">模拟支付并继续</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
