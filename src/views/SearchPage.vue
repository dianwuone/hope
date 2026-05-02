<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import { articles, products, labs } from '@/data'

const route = useRoute()
const router = useRouter()
const query = ref(route.query.q || '')
const filter = ref('全部')
const filters = ['全部', '文章', '产品', '实验室']

const results = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return []
  const mixed = [
    ...articles.map((item) => ({ type: '文章', title: item.title, summary: item.summary, to: `/articles/${item.slug}` })),
    ...products.map((item) => ({ type: '产品', title: item.name, summary: item.shortDesc, to: `/products/${item.slug}` })),
    ...labs.map((item) => ({ type: '实验室', title: item.name, summary: item.description, to: `/lab/${item.slug}` })),
  ]
  return mixed.filter((item) => item.title.toLowerCase().includes(keyword) || item.summary.toLowerCase().includes(keyword))
})

const filteredResults = computed(() => (filter.value === '全部' ? results.value : results.value.filter((item) => item.type === filter.value)))

const doSearch = () => {
  router.replace({ query: query.value ? { q: query.value } : {} })
}
</script>

<template>
  <div>
    <PageHero eyebrow="Search" title="搜索结果" subtitle="搜索结果页也按前端临时数据实现，但结构已经对齐未来 API。" compact />
    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="surface-panel p-6">
          <div class="flex flex-col gap-3 md:flex-row">
            <input v-model="query" type="text" placeholder="输入关键词..." class="flex-1 rounded-full border border-brand-grey px-5 py-3 outline-none focus:border-accent-blue" @keyup.enter="doSearch" />
            <button class="btn-primary justify-center" @click="doSearch">搜索</button>
          </div>
          <div class="mt-5">
            <FilterPills v-model="filter" :items="filters" />
          </div>
        </div>
        <div class="mt-8 space-y-4">
          <router-link v-for="item in filteredResults" :key="`${item.type}-${item.title}`" :to="item.to" class="card block">
            <span class="badge-blue">{{ item.type }}</span>
            <h3 class="mt-4 text-xl font-semibold text-brand-charcoal">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-7 text-brand-text">{{ item.summary }}</p>
          </router-link>
          <div v-if="!filteredResults.length" class="surface-panel p-10 text-center text-brand-muted">没有找到相关内容。</div>
        </div>
      </div>
    </section>
  </div>
</template>
