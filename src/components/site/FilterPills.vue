<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="item in items"
      :key="item"
      type="button"
      :class="modelValue === item ? 'bg-accent-blue text-white border-accent-blue' : 'bg-white text-brand-text border-brand-grey hover:border-accent-blue hover:text-accent-blue'"
      class="rounded-full border px-4 py-2 text-sm transition-colors"
      @click="emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>
