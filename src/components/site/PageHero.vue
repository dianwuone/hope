<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  subtitle: String,
  image: String,
  imageAlt: { type: String, default: '' },
  dark: Boolean,
  compact: Boolean,
})
</script>

<template>
  <section :class="[dark ? 'bg-brand-charcoal text-white' : 'text-brand-charcoal', compact ? 'py-12' : 'py-16 md:py-20']">
    <div class="container-content">
      <div
        class="grid items-center gap-10"
        :class="image ? 'lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)]' : 'max-w-3xl'"
      >
        <div>
          <div v-if="eyebrow" class="eyebrow mb-5">{{ eyebrow }}</div>
          <h1 class="font-serif text-4xl leading-tight md:text-5xl lg:text-[3.5rem]">{{ title }}</h1>
          <p v-if="subtitle" :class="[dark ? 'text-white/72' : 'text-brand-text']" class="mt-5 max-w-2xl text-base leading-8 md:text-lg">
            {{ subtitle }}
          </p>
          <slot />
        </div>
        <div v-if="image" class="relative">
          <div class="absolute -left-6 bottom-8 h-20 w-20 rounded-full bg-gold/10 blur-2xl"></div>
          <img :src="image" :alt="imageAlt || title" class="w-full rounded-panel shadow-hero object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>
