<script setup>
import PageHero from '@/components/site/PageHero.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { aboutPage } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="About" :title="aboutPage.title" :subtitle="aboutPage.subtitle" compact />
    <section class="section-shell">
      <div class="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="surface-panel p-8">
          <SectionTitle title="为什么会有这个站点" />
          <p v-for="paragraph in aboutPage.story" :key="paragraph" class="mt-4 text-base leading-8 text-brand-text">
            {{ paragraph }}
          </p>
        </div>
        <div class="surface-panel p-8">
          <SectionTitle title="发展时间线" />
          <div class="mt-6 space-y-6">
            <div v-for="item in aboutPage.timeline" :key="item.year" class="border-l-2 border-accent-blue/20 pl-4">
              <div class="text-sm font-semibold text-accent-blue">{{ item.year }}</div>
              <div class="mt-1 text-base text-brand-charcoal">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
