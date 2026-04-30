<script setup>
/**
 * 通用文章卡片
 * Props: article { title, slug, summary, coverImage, publishedAt, column, tags }
 */
defineProps({
  article: {
    type: Object,
    required: true,
  },
})

const columnColors = {
  kunting: 'badge-blue',
  qiming: 'badge-coral',
}
</script>

<template>
  <router-link
    :to="`/articles/${article.slug}`"
    class="card group block overflow-hidden"
  >
    <!-- Cover Image -->
    <div class="aspect-video bg-brand-grey/20 rounded-lg mb-4 overflow-hidden">
      <img
        v-if="article.coverImage"
        :src="article.coverImage"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-brand-charcoal/20">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div>
      <!-- Column Badge -->
      <span
        v-if="article.column"
        :class="columnColors[article.column] || 'badge-grey'"
        class="mb-2"
      >
        {{ article.column === 'kunting' ? '昆廷笔记' : '启鸣宝宝' }}
      </span>

      <!-- Title -->
      <h3 class="font-medium text-lg mb-2 group-hover:text-accent-blue-dark transition-colors line-clamp-2">
        {{ article.title }}
      </h3>

      <!-- Summary -->
      <p class="text-sm text-brand-charcoal/60 line-clamp-2 mb-3">
        {{ article.summary }}
      </p>

      <!-- Meta -->
      <div class="flex items-center gap-3 text-xs text-brand-charcoal/40">
        <span v-if="article.publishedAt">{{ article.publishedAt }}</span>
        <span v-if="article.viewCount">{{ article.viewCount }} 阅读</span>
      </div>

      <!-- Tags -->
      <div v-if="article.tags?.length" class="flex gap-1.5 mt-3 flex-wrap">
        <span v-for="tag in article.tags" :key="tag" class="badge-grey text-xs">
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>
