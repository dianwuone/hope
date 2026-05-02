<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/site/PageHero.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import FaqList from '@/components/site/FaqList.vue'
import { getProductBySlug } from '@/data'

const route = useRoute()
const product = computed(() => getProductBySlug(route.params.slug) || getProductBySlug('personal-assistant'))
</script>

<template>
  <div>
    <PageHero
      eyebrow="Product Detail"
      :title="product.name"
      :subtitle="product.summary"
      :image="product.cover"
      :image-alt="product.name"
    >
      <div class="mt-7 flex flex-wrap gap-3">
        <router-link to="/try" class="btn-primary">获取体验</router-link>
        <router-link to="/products" class="btn-outline">返回产品中心</router-link>
      </div>
      <div class="mt-8 flex flex-wrap gap-2">
        <span v-for="tag in product.tags" :key="tag" class="badge-grey">{{ tag }}</span>
      </div>
    </PageHero>

    <section class="section-shell">
      <div class="container-content">
        <SectionTitle title="核心能力" subtitle="三个产品详情页共用一套模板，只通过数据驱动差异内容。" />
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <div v-for="feature in product.features" :key="feature.title" class="card">
            <div class="h-12 w-12 rounded-2xl bg-accent-soft"></div>
            <h3 class="mt-5 text-xl font-semibold text-brand-charcoal">{{ feature.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-brand-text">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="surface-panel p-8">
          <SectionTitle title="当前定位" />
          <p class="mt-4 text-base leading-8 text-brand-text">{{ product.shortDesc }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <span v-for="item in product.highlights" :key="item" class="rounded-full bg-brand-warm px-4 py-2 text-sm text-brand-text">{{ item }}</span>
          </div>
        </div>
        <div class="surface-panel p-8">
          <SectionTitle title="用户反馈" />
          <div class="mt-6 space-y-4">
            <div v-for="item in product.testimonials" :key="item.author" class="rounded-card bg-brand-warm p-5">
              <p class="text-sm leading-7 text-brand-text">{{ item.content }}</p>
              <div class="mt-3 text-sm font-medium text-brand-charcoal">{{ item.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-reading">
        <SectionTitle title="常见问题" align="center" />
        <div class="mt-8">
          <FaqList :items="product.faq" />
        </div>
      </div>
    </section>
  </div>
</template>
