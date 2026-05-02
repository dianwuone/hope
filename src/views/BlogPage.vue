<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import { blogPosts } from '@/data'
</script>

<template>
  <div>
    <PageHero eyebrow="Blog" title="博客" subtitle="作为文章中心之外的轻量频道入口，后续也可以随时并回统一内容体系。" compact />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ArticleCard v-for="post in blogPosts" :key="post.slug" :article="post" />
      </div>
    </section>
  </div>
</template>
