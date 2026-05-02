<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { labs } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Lab" title="探索未来的更多可能" subtitle="把不确定但值得尝试的方向放进实验室，持续验证用户价值。" :image="labs[0].banner" image-alt="实验室" />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-2">
        <router-link v-for="lab in labs" :key="lab.slug" :to="`/lab/${lab.slug}`" class="card overflow-hidden !p-0">
          <img :src="lab.cover" :alt="lab.name" class="aspect-[16/10] w-full object-cover" />
          <div class="p-6">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in lab.tags" :key="tag" class="badge-purple">{{ tag }}</span>
            </div>
            <h3 class="mt-4 text-2xl font-semibold text-brand-charcoal">{{ lab.name }}</h3>
            <p class="mt-3 text-sm leading-7 text-brand-text">{{ lab.description }}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
