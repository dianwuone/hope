<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  fallbackLabel: {
    type: String,
    default: '',
  },
  imgClass: {
    type: [String, Array, Object],
    default: '',
  },
  fallbackClass: {
    type: [String, Array, Object],
    default: '',
  },
})

const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

const shouldShowImage = computed(() => !!props.src && !hasError.value)
const displayLabel = computed(() => props.fallbackLabel || props.alt || props.title || '图片暂不可用')

function handleError() {
  hasError.value = true
}
</script>

<template>
  <img
    v-if="shouldShowImage"
    :src="src"
    :alt="alt || title || fallbackLabel"
    :class="imgClass"
    @error="handleError"
  />
  <div
    v-else
    :class="fallbackClass || imgClass"
    class="relative overflow-hidden bg-[linear-gradient(135deg,rgba(243,248,255,0.95)_0%,rgba(232,241,252,0.9)_100%)]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(130,179,255,0.22),transparent_20%),radial-gradient(circle_at_80%_78%,rgba(191,225,255,0.3),transparent_24%)]"></div>
    <div class="relative flex h-full w-full flex-col items-center justify-center px-5 text-center text-[#6D809D]">
      <svg class="h-12 w-12 text-[#7DA9E8]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="12" fill="currentColor" fill-opacity="0.12" />
        <path d="M18 42l10.5-11a3 3 0 014.3-.1l7.7 7.8 5.1-5.3a3 3 0 014.2 0L56 40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="24" cy="24" r="4" fill="currentColor" fill-opacity="0.7" />
      </svg>
      <p class="mt-3 line-clamp-2 text-sm font-semibold">{{ displayLabel }}</p>
      <p class="mt-1 text-xs text-[#90A0BA]">图片暂未就绪</p>
    </div>
  </div>
</template>
