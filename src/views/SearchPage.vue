<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const query = ref(route.query.q || '')
const activeFilter = ref('全部')
const filters = ['全部', '文章', '产品', '游戏', '实验室']

const results = ref([]) // Mock — 后续接入API

const filteredResults = computed(() => {
  if (activeFilter.value === '全部') return results.value
  return results.value.filter(r => r.type === activeFilter.value)
})

const doSearch = () => {
  if (query.value.trim()) {
    router.replace({ query: { q: query.value } })
    // TODO: 调用搜索API
  }
}
</script>

<template>
  <div class="container-content py-section">
    <BreadcrumbNav :items="[{ label: '首页', to: '/' }, { label: '搜索结果' }]" />

    <!-- 搜索框 -->
    <div class="max-w-2xl mx-auto mb-8">
      <div class="flex gap-2">
        <input
          v-model="query"
          type="text"
          placeholder="输入关键词..."
          class="flex-1 px-4 py-3 rounded-lg border border-brand-grey focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none transition-all"
          @keyup.enter="doSearch"
        />
        <button class="btn-primary" @click="doSearch">搜索</button>
      </div>
    </div>

    <!-- 筛选标签 -->
    <div class="flex gap-2 mb-8 justify-center flex-wrap">
      <button
        v-for="f in filters"
        :key="f"
        :class="activeFilter === f ? 'bg-accent-blue text-white' : 'bg-white text-brand-charcoal/60 border border-brand-grey'"
        class="px-4 py-1.5 rounded-full text-sm transition-all"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <!-- 结果 -->
    <div v-if="filteredResults.length" class="space-y-4 max-w-3xl mx-auto">
      <div v-for="r in filteredResults" :key="r.slug" class="card">
        <span class="badge-blue text-xs mb-2">{{ r.type }}</span>
        <h3 class="font-medium text-lg">{{ r.title }}</h3>
        <p class="text-sm text-brand-charcoal/60">{{ r.summary }}</p>
      </div>
    </div>

    <!-- 空状态 -->
    <EmptyState
      v-else
      icon="search"
      title="未找到相关内容"
      description="试试其他关键词，或浏览以下页面"
    >
      <div class="flex gap-3 justify-center flex-wrap">
        <router-link to="/products" class="btn-outline text-sm">产品中心</router-link>
        <router-link to="/articles" class="btn-outline text-sm">文章中心</router-link>
        <router-link to="/community" class="btn-outline text-sm">加入社区</router-link>
      </div>
    </EmptyState>
  </div>
</template>
