<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: '首页', to: '/' }, { label: '产品中心' }]
  },
})
</script>

<template>
  <nav class="text-sm text-brand-charcoal/50 mb-6" aria-label="面包屑">
    <ol class="flex items-center gap-1.5 flex-wrap">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <span v-if="index > 0" class="text-brand-grey">/</span>
        <router-link
          v-if="item.to"
          :to="item.to"
          class="hover:text-brand-charcoal transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-brand-charcoal/70">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
