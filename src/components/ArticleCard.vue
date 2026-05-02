<script setup>
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
    class="card group block overflow-hidden !p-0"
  >
    <div class="aspect-[16/10] overflow-hidden bg-brand-warm">
      <img
        v-if="article.cover"
        :src="article.cover"
        :alt="article.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-brand-charcoal/20">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <div class="p-6">
      <span
        v-if="article.column"
        :class="columnColors[article.column] || 'badge-grey'"
        class="mb-3"
      >
        {{ article.column === 'kunting' ? '昆廷笔记' : '启鸣宝宝' }}
      </span>

      <h3 class="line-clamp-2 text-xl font-semibold text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
        {{ article.title }}
      </h3>

      <p class="mt-3 line-clamp-3 text-sm leading-7 text-brand-text">
        {{ article.summary }}
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
        <span>{{ article.author }}</span>
        <span v-if="article.publishedAt">{{ article.publishedAt }}</span>
        <span v-if="article.viewCount">{{ article.viewCount }} 阅读</span>
      </div>

      <div v-if="article.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="badge-grey text-xs">
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>
