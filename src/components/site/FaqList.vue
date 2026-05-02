<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="space-y-4">
    <details
      v-for="item in items"
      :key="item.q"
      class="surface-panel group p-5"
    >
      <summary class="cursor-pointer list-none font-medium text-brand-charcoal">
        {{ item.q }}
      </summary>
      <p class="mt-3 text-sm leading-7 text-brand-text">{{ item.a }}</p>
    </details>
  </div>
</template>
