<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { articles, getArticleBySlug, products } from '@/data'

const route = useRoute()
const article = computed(() => getArticleBySlug(route.params.slug) || articles[0])
const relatedArticles = computed(() => articles.filter((item) => item.slug !== article.value.slug).slice(0, 3))
</script>

<template>
  <div>
    <section class="section-shell pt-12">
      <div class="container-reading">
        <span class="badge-blue">{{ article.column === 'kunting' ? '昆廷笔记' : '启鸣宝宝' }}</span>
        <h1 class="mt-5 font-serif text-4xl leading-tight text-brand-charcoal md:text-5xl">{{ article.title }}</h1>
        <p class="mt-5 text-lg leading-8 text-brand-text">{{ article.summary }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
          <span>{{ article.author }}</span>
          <span>{{ article.publishedAt }}</span>
          <span>{{ article.viewCount }} 阅读</span>
        </div>
        <img :src="article.cover" :alt="article.title" class="mt-8 w-full rounded-panel shadow-hero object-cover" />
      </div>
    </section>

    <section class="section-shell pt-0">
      <div class="container-reading">
        <div class="surface-panel p-8 md:p-10">
          <div class="prose prose-lg max-w-none">
            <p v-for="paragraph in article.content" :key="paragraph">{{ paragraph }}</p>
          </div>
          <div class="mt-8 flex flex-wrap gap-2">
            <span v-for="tag in article.tags" :key="tag" class="badge-grey">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionTitle title="相关文章" />
          <div class="mt-6 grid gap-6 md:grid-cols-3">
            <router-link v-for="item in relatedArticles" :key="item.slug" :to="`/articles/${item.slug}`" class="card">
              <img :src="item.cover" :alt="item.title" class="aspect-[16/10] w-full rounded-xl object-cover" />
              <h3 class="mt-4 line-clamp-2 text-lg font-semibold text-brand-charcoal">{{ item.title }}</h3>
              <p class="mt-2 line-clamp-3 text-sm text-brand-text">{{ item.summary }}</p>
            </router-link>
          </div>
        </div>
        <aside class="surface-panel p-6">
          <SectionTitle title="产品推荐" />
          <div class="mt-5 space-y-4">
            <router-link v-for="product in products" :key="product.slug" :to="`/products/${product.slug}`" class="block rounded-card bg-brand-warm p-4 hover:bg-accent-soft">
              <div class="font-medium text-brand-charcoal">{{ product.name }}</div>
              <div class="mt-2 text-xs leading-6 text-brand-muted">{{ product.shortDesc }}</div>
            </router-link>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
