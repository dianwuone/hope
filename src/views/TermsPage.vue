<script setup>
import { computed } from 'vue'
import LegalContentLayout from '@/components/legal/LegalContentLayout.vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const page = computed(() => siteStore.pageData('legal_terms', { sections: [] }))
</script>

<template>
  <LegalContentLayout :page="page" />
</template>
