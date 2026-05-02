<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/site/PageHero.vue'
import { getLabBySlug } from '@/data'

const route = useRoute()
const lab = computed(() => getLabBySlug(route.params.slug) || getLabBySlug('tools'))
</script>

<template>
  <div>
    <PageHero eyebrow="Lab Detail" :title="lab.title" :subtitle="lab.subtitle" :image="lab.cover" :image-alt="lab.name" />
    <section class="section-shell">
      <div class="container-content grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">实验方向</h2>
          <p class="mt-4 text-base leading-8 text-brand-text">{{ lab.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in lab.tags" :key="tag" class="badge-purple">{{ tag }}</span>
          </div>
        </div>
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">项目状态</h2>
          <div class="mt-6 space-y-4">
            <div v-for="project in lab.projects" :key="project.name" class="flex items-center justify-between gap-4 rounded-card bg-brand-warm p-4">
              <span class="text-sm text-brand-text">{{ project.name }}</span>
              <span class="badge-grey">{{ project.status }}</span>
            </div>
          </div>
          <router-link :to="`/lab/${lab.slug}/apply`" class="btn-primary mt-6">申请内测</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
