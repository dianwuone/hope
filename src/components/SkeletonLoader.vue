<script setup>
/**
 * 骨架屏组件
 * Props: lines (行数), avatar (是否显示头像占位)
 */
defineProps({
  lines: { type: Number, default: 3 },
  avatar: { type: Boolean, default: false },
  image: { type: Boolean, default: false },
})
</script>

<template>
  <div class="animate-pulse">
    <div v-if="image" class="skeleton aspect-video rounded-lg mb-4"></div>
    <div v-if="avatar" class="skeleton w-12 h-12 rounded-full mb-3"></div>
    <div class="space-y-2.5">
      <div
        v-for="i in lines"
        :key="i"
        class="skeleton h-4 rounded"
        :style="{ width: i === lines ? '60%' : '100%' }"
      ></div>
    </div>
  </div>
</template>
