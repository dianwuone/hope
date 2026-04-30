<script setup>
/**
 * 空状态组件
 */
defineProps({
  title: { type: String, default: '暂无内容' },
  description: { type: String, default: '' },
  icon: { type: String, default: 'inbox' },
})
</script>

<template>
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-grey/20 flex items-center justify-center">
      <svg class="w-8 h-8 text-brand-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="icon === 'inbox'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        <path v-else-if="icon === 'search'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </div>
    <h3 class="font-medium text-lg mb-2">{{ title }}</h3>
    <p v-if="description" class="text-sm text-brand-charcoal/50 mb-6">{{ description }}</p>
    <slot />
  </div>
</template>
