<script setup>
import LegalContentLayout from '@/components/legal/LegalContentLayout.vue'
import { legalPages } from '@/data'
</script>

<template>
  <LegalContentLayout :page="legalPages.terms" />
</template>
