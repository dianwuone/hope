<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { openSourcePage } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Open Source" :title="openSourcePage.title" :subtitle="openSourcePage.subtitle" compact />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="project in openSourcePage.projects" :key="project.name" class="card">
          <h2 class="text-xl font-semibold text-brand-charcoal">{{ project.name }}</h2>
          <p class="mt-3 text-sm leading-7 text-brand-text">{{ project.desc }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" class="badge-grey">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
