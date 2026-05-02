<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { mainNav, footerSections } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Sitemap" title="网站地图" subtitle="把核心频道、内容入口和辅助页面集中展示，方便后续继续扩展。" compact />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="surface-panel p-6">
          <h2 class="text-xl font-semibold text-brand-charcoal">主导航</h2>
          <div class="mt-5 space-y-3">
            <router-link v-for="item in mainNav" :key="item.path" :to="item.path" class="block text-sm text-brand-text hover:text-accent-blue">{{ item.name }}</router-link>
          </div>
        </div>
        <div v-for="section in footerSections" :key="section.title" class="surface-panel p-6">
          <h2 class="text-xl font-semibold text-brand-charcoal">{{ section.title }}</h2>
          <div class="mt-5 space-y-3">
            <router-link v-for="item in section.links" :key="item.path" :to="item.path" class="block text-sm text-brand-text hover:text-accent-blue">{{ item.name }}</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
