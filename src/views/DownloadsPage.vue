<script setup>
import PageHero from '@/components/site/PageHero.vue'
import { downloadsPage, products } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Downloads" :title="downloadsPage.title" :subtitle="downloadsPage.subtitle" :image="downloadsPage.banner" image-alt="下载中心" />
    <section class="section-shell">
      <div class="container-content">
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="product in products" :key="product.slug" class="card">
            <img :src="product.cover" :alt="product.name" class="aspect-[16/10] w-full rounded-xl object-cover" />
            <h3 class="mt-5 text-xl font-semibold text-brand-charcoal">{{ product.name }}</h3>
            <p class="mt-3 text-sm leading-7 text-brand-text">{{ product.shortDesc }}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span class="badge-blue">{{ product.stage }}</span>
              <span class="badge-grey">{{ product.supportStatus }}</span>
            </div>
          </div>
        </div>
        <div class="surface-panel mt-8 p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">说明</h2>
          <ul class="mt-5 space-y-3 text-sm leading-7 text-brand-text">
            <li v-for="item in downloadsPage.requirements" :key="item">• {{ item }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
