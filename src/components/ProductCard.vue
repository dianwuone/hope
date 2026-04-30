<script setup>
/**
 * 通用产品卡片
 * Props: product { name, slug, shortDesc, icon, stage, supportStatus }
 */
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
  <router-link :to="`/products/${product.slug}`" class="card group block">
    <!-- Icon -->
    <div class="w-16 h-16 bg-brand-grey/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
      <img v-if="product.icon" :src="product.icon" :alt="product.name" class="w-12 h-12" />
      <span v-else class="text-2xl text-brand-charcoal/20">{{ product.name?.[0] }}</span>
    </div>

    <!-- Info -->
    <span :class="stageColors[product.stage] || 'badge-grey'" class="mb-2">
      {{ stageLabels[product.stage] || product.stage }}
    </span>
    <h3 class="font-medium text-lg mt-2 mb-2 group-hover:text-accent-blue-dark transition-colors">
      {{ product.name }}
    </h3>
    <p class="text-sm text-brand-charcoal/60 line-clamp-2 mb-4">
      {{ product.shortDesc }}
    </p>

    <!-- CTA -->
    <span class="btn-outline text-xs">
      {{ statusLabels[product.supportStatus] || '了解更多' }}
    </span>
  </router-link>
</template>
