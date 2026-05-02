<script setup>
defineProps({
  page: { type: Object, required: true },
})
</script>

<template>
  <section class="section-shell">
    <div class="container-reading">
      <div class="surface-panel p-8 md:p-10">
        <h1 class="font-serif text-4xl text-brand-charcoal">{{ page.title }}</h1>
        <p class="mt-4 text-base leading-8 text-brand-text">{{ page.intro }}</p>
        <div class="mt-10 space-y-10">
          <section v-for="section in page.sections" :key="section.title">
            <h2 class="text-xl font-semibold text-brand-charcoal">{{ section.title }}</h2>
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="mt-4 text-sm leading-8 text-brand-text md:text-base"
            >
              {{ paragraph }}
            </p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
