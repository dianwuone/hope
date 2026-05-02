<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { articles, articleCategories, articleCenterPage, articleHotTopics, products } from '@/data'

const activeCategory = ref('全部')

const filteredArticles = computed(() =>
  activeCategory.value === '全部'
    ? articles
    : articles.filter((item) => item.category === activeCategory.value || item.tags.includes(activeCategory.value))
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Articles"
      :title="articleCenterPage.title"
      :subtitle="articleCenterPage.subtitle"
      :image="articleCenterPage.banner"
      image-alt="文章中心"
      dark
    />
    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="surface-panel p-6 md:p-8">
          <FilterPills v-model="activeCategory" :items="articleCategories" />
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div class="grid gap-6 md:grid-cols-2">
          <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
        </div>
        <aside class="space-y-6">
          <div class="surface-panel p-6">
            <SectionTitle title="热门主题" />
            <div class="mt-5 flex flex-wrap gap-2">
              <span v-for="topic in articleHotTopics" :key="topic" class="badge-grey">{{ topic }}</span>
            </div>
          </div>
          <div class="surface-panel p-6">
            <SectionTitle title="产品推荐" />
            <div class="mt-5 space-y-4">
              <router-link v-for="product in products" :key="product.slug" :to="`/products/${product.slug}`" class="flex items-center gap-4 rounded-card bg-brand-warm p-4 hover:bg-accent-soft">
                <img :src="product.cover" :alt="product.name" class="h-14 w-14 rounded-xl object-cover" />
                <div class="min-w-0">
                  <div class="font-medium text-brand-charcoal">{{ product.name }}</div>
                  <div class="line-clamp-2 text-xs text-brand-muted">{{ product.shortDesc }}</div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
