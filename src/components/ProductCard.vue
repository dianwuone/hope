<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const stageLabels = {
  published: '已发布',
  beta: 'Beta测试',
  coming_soon: '即将上线',
}

const stageColors = {
  published: 'badge-green',
  beta: 'badge-blue',
  coming_soon: 'badge-grey',
}

const statusLabels = {
  download: '获取体验',
  beta_apply: '申请内测',
  wishlist: '加入心愿单',
  purchase: '立即尝鲜',
}
</script>

<template>
  <router-link :to="`/products/${product.slug}`" class="card group flex h-full flex-col overflow-hidden !p-0">
    <div class="relative aspect-[4/3] overflow-hidden bg-brand-warm">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-soft to-lab-light"></div>
      <img
        v-if="product.cover"
        :src="product.cover"
        :alt="product.name"
        class="relative z-10 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <div class="flex flex-wrap items-center gap-2">
        <span :class="stageColors[product.stage] || 'badge-grey'">
          {{ stageLabels[product.stage] || product.stage }}
        </span>
        <span v-for="tag in product.highlights?.slice(0, 2)" :key="tag" class="badge-grey">{{ tag }}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
        {{ product.name }}
      </h3>
      <p class="mt-3 line-clamp-3 text-sm leading-7 text-brand-text">{{ product.shortDesc }}</p>
      <div class="mt-5 flex flex-wrap gap-2">
        <span v-for="tag in product.tags?.slice(0, 3)" :key="tag" class="rounded-full bg-brand-warm px-3 py-1 text-xs text-brand-muted">
          {{ tag }}
        </span>
      </div>
      <div class="mt-auto pt-6">
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue">
          {{ statusLabels[product.supportStatus] || '了解更多' }}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  </router-link>
</template>
