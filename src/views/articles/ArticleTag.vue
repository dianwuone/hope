<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import { articles } from '@/data'

const route = useRoute()
const slug = computed(() => route.params.slug)
const normalizedTag = computed(() => decodeURIComponent(slug.value).replace(/-/g, ' '))
const filtered = computed(() => articles.filter((item) => item.tags.includes(normalizedTag.value) || item.category === normalizedTag.value))
</script>

<template>
  <div>
    <PageHero eyebrow="Tag" :title="normalizedTag" subtitle="按分类聚合内容，方便后续用后台标签体系接管。" compact />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ArticleCard v-for="article in filtered" :key="article.slug" :article="article" />
      </div>
    </section>
  </div>
</template>
