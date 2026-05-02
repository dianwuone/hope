<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  subtitle: String,
  align: { type: String, default: 'left' },
})
</script>

<template>
  <div :class="align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'">
    <div v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</div>
    <h2 class="font-serif text-3xl leading-tight text-brand-charcoal md:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 text-base leading-7 text-brand-text md:text-lg">{{ subtitle }}</p>
  </div>
</template>
