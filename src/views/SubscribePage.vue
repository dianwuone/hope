<script setup>
import { computed } from 'vue'
import PageHero from '@/components/site/PageHero.vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const subscribePage = computed(() => siteStore.pageData('subscribe', { highlights: [] }))
</script>

<template>
  <div>
    <PageHero eyebrow="Subscribe" :title="subscribePage.title" :subtitle="subscribePage.subtitle" compact />
    <section class="section-shell">
      <div class="container-reading">
        <div class="surface-panel p-8">
          <div class="grid gap-4">
            <input type="email" placeholder="your@email.com" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <button type="button" class="btn-primary justify-center">订阅更新</button>
          </div>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="item in subscribePage.highlights" :key="item" class="badge-grey">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
