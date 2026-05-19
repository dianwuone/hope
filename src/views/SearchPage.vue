<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SmartImage from '@/components/SmartImage.vue'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import EmptyState from '@/components/EmptyState.vue'
import { searchApi } from '@/api'

const route = useRoute()
const router = useRouter()

const FILTERS = ['全部', '文章', '产品', '游戏', '实验室', '快来尝鲜']
const hotKeywords = ['AI 工具', '拼音', '育儿', '工作流', '独立开发', '内测']

const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const filter = ref(FILTERS.includes(route.query.type) ? route.query.type : '全部')
const loading = ref(false)
const error = ref('')
const result = ref({
  query: '',
  items: [],
  total: 0,
  counts: {
    全部: 0,
    文章: 0,
    产品: 0,
    游戏: 0,
    实验室: 0,
    快来尝鲜: 0,
  },
})

const activeQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))
const activeFilter = computed(() => (FILTERS.includes(route.query.type) ? route.query.type : '全部'))
const resultItems = computed(() => result.value?.items || [])
const resultCountText = computed(() => {
  const count = result.value?.total || 0
  if (!activeQuery.value) return '输入关键词后开始搜索'
  return `找到 ${count} 条与“${activeQuery.value}”相关的结果`
})

const suggestions = [
  { label: '产品中心', to: '/products' },
  { label: '文章中心', to: '/articles' },
  { label: '快来尝鲜', to: '/try' },
  { label: '加入社区', to: '/community' },
]

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

async function loadResults() {
  const keyword = activeQuery.value
  const type = activeFilter.value

  if (!keyword) {
    result.value = {
      query: '',
      items: [],
      total: 0,
      counts: {
        全部: 0,
        文章: 0,
        产品: 0,
        游戏: 0,
        实验室: 0,
        快来尝鲜: 0,
      },
    }
    error.value = ''
    return
  }

  loading.value = true
  error.value = ''
  try {
    result.value = await searchApi.search(keyword, type === '全部' ? {} : { type })
  } catch (err) {
    error.value = err instanceof Error ? err.message : '搜索失败，请稍后再试'
    result.value = {
      query: keyword,
      items: [],
      total: 0,
      counts: {
        全部: 0,
        文章: 0,
        产品: 0,
        游戏: 0,
        实验室: 0,
        快来尝鲜: 0,
      },
    }
  } finally {
    loading.value = false
  }
}

function updateRoute() {
  const nextQuery = query.value.trim()
  const nextFilter = filter.value
  router.replace({
    query: {
      ...(nextQuery ? { q: nextQuery } : {}),
      ...(nextQuery && nextFilter !== '全部' ? { type: nextFilter } : {}),
    },
  })
}

function doSearch() {
  updateRoute()
}

function applyFilter(value) {
  filter.value = value
  updateRoute()
}

function useHotKeyword(keyword) {
  query.value = keyword
  filter.value = '全部'
  updateRoute()
}

watch(
  () => route.query,
  () => {
    query.value = typeof route.query.q === 'string' ? route.query.q : ''
    filter.value = FILTERS.includes(route.query.type) ? route.query.type : '全部'
    loadResults()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Search"
      title="搜索结果"
      :subtitle="activeQuery ? `正在为你检索“${activeQuery}”相关内容。` : '从文章、产品、游戏、实验室与尝鲜内容里快速找到你要的内容。'"
      compact
    />

    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="surface-panel overflow-hidden">
          <div class="bg-[linear-gradient(135deg,rgba(236,244,255,0.75),rgba(255,249,240,0.8))] p-6 md:p-7">
            <div class="flex flex-col gap-3 md:flex-row">
              <input
                v-model="query"
                type="text"
                placeholder="输入关键词，比如 AI 工具、拼音、育儿..."
                class="flex-1 rounded-full border border-brand-grey bg-white px-5 py-3 outline-none transition-colors focus:border-accent-blue"
                @keyup.enter="doSearch"
              />
              <button class="btn-primary justify-center" @click="doSearch">搜索</button>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="text-sm font-medium text-brand-muted">热门搜索</span>
              <button
                v-for="keyword in hotKeywords"
                :key="keyword"
                type="button"
                class="rounded-full border border-brand-grey bg-white px-3 py-1.5 text-sm text-brand-text transition-colors hover:border-accent-blue hover:text-accent-blue"
                @click="useHotKeyword(keyword)"
              >
                {{ keyword }}
              </button>
            </div>
          </div>

          <div class="border-t border-brand-grey/60 p-6 md:p-7">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <FilterPills :model-value="filter" :items="FILTERS" @update:model-value="applyFilter" />
              <p class="text-sm text-brand-muted">{{ resultCountText }}</p>
            </div>
          </div>
        </div>

        <div v-if="loading" class="mt-8 grid gap-4">
          <div v-for="index in 5" :key="index" class="surface-panel p-6">
            <div class="skeleton h-5 w-20"></div>
            <div class="skeleton mt-4 h-8 w-1/2"></div>
            <div class="skeleton mt-3 h-4 w-full"></div>
            <div class="skeleton mt-2 h-4 w-4/5"></div>
          </div>
        </div>

        <div v-else-if="error" class="mt-8 surface-panel p-10 text-center">
          <p class="text-lg font-semibold text-brand-charcoal">搜索暂时失败</p>
          <p class="mt-3 text-sm leading-7 text-brand-text">{{ error }}</p>
          <button class="btn-outline mt-6" @click="loadResults">重新搜索</button>
        </div>

        <div v-else-if="resultItems.length" class="mt-8 space-y-4">
          <router-link
            v-for="item in resultItems"
            :key="`${item.type}-${item.slug}`"
            :to="item.to"
            class="card block overflow-hidden"
          >
            <div class="flex flex-col gap-5 md:flex-row md:items-start">
              <SmartImage
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                :fallback-label="item.title"
                img-class="h-36 w-full rounded-2xl object-cover md:w-48"
                fallback-class="h-36 w-full rounded-2xl md:w-48"
              />
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    :class="{
                      'badge-blue': item.type === '文章' || item.type === '产品',
                      'badge-amber': item.type === '游戏',
                      'badge-purple': item.type === '实验室',
                      'badge-green': item.type === '快来尝鲜',
                    }"
                  >
                    {{ item.type }}
                  </span>
                  <span v-if="item.source" class="text-sm text-brand-muted">{{ item.source }}</span>
                  <span v-if="item.publishedAt" class="text-sm text-brand-muted">{{ formatDate(item.publishedAt) }}</span>
                </div>

                <h3 class="mt-4 text-2xl font-semibold text-brand-charcoal">{{ item.title }}</h3>
                <p class="mt-3 line-clamp-3 text-sm leading-7 text-brand-text">
                  {{ item.summary || '这个条目已经匹配到关键词，点击即可查看详情。' }}
                </p>
                <div class="mt-5 text-sm font-medium text-accent-blue-dark">查看详情 →</div>
              </div>
            </div>
          </router-link>
        </div>

        <div v-else class="mt-8 surface-panel p-6 md:p-10">
          <EmptyState
            icon="search"
            title="未找到相关内容"
            :description="activeQuery ? `没有找到与“${activeQuery}”相关的结果，试试换个关键词。` : '输入关键词后可以搜索站内内容。'"
          >
            <div class="flex flex-wrap justify-center gap-3">
              <router-link
                v-for="item in suggestions"
                :key="item.to"
                :to="item.to"
                class="btn-outline"
              >
                {{ item.label }}
              </router-link>
            </div>
          </EmptyState>
        </div>
      </div>
    </section>
  </div>
</template>
