<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import { columns, articles } from '@/data'

const column = columns.kunting
const items = articles.filter((item) => item.column === 'kunting')
</script>

<template>
  <div>
    <PageHero eyebrow="Column" :title="column.title" :subtitle="column.subtitle" :image="column.banner" image-alt="昆廷笔记" />
    <section class="section-shell pt-0">
      <div class="container-content">
        <FilterPills :items="column.tags" model-value="" />
        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ArticleCard v-for="article in items" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>
  </div>
</template>
