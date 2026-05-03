<script setup>
import { computed, ref } from 'vue'
import { articles, articleCategories, articleCenterPage, articleHotTopics, columns, products } from '@/data'

const searchQuery = ref('')
const activeColumn = ref('全部 IP')
const activeCategory = ref('全部分类')
const activeTopic = ref('全部主题')
const visibleCount = ref(4)

const columnOptions = ['全部 IP', '昆廷笔记', '启鸣宝宝']
const categoryOptions = ['全部分类', ...articleCategories.filter((item) => item !== '全部')]
const topicOptions = ['全部主题', ...articleHotTopics]

const filteredArticles = computed(() =>
  articles
    .filter((item) => {
      const query = searchQuery.value.trim().toLowerCase()
      const matchQuery = !query
        || item.title.toLowerCase().includes(query)
        || item.summary.toLowerCase().includes(query)
        || item.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchColumn = activeColumn.value === '全部 IP'
        || (activeColumn.value === '昆廷笔记' && item.column === 'kunting')
        || (activeColumn.value === '启鸣宝宝' && item.column === 'qiming')

      const matchCategory = activeCategory.value === '全部分类'
        || item.category === activeCategory.value

      const matchTopic = activeTopic.value === '全部主题'
        || item.tags.includes(activeTopic.value)
        || item.category === activeTopic.value

      return matchQuery && matchColumn && matchCategory && matchTopic
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
)

const visibleArticles = computed(() => filteredArticles.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleArticles.value.length < filteredArticles.value.length)

const featuredProducts = computed(() => products.slice(0, 3))

const columnMetaMap = {
  kunting: {
    label: '昆廷笔记',
    className: 'bg-[#E8F3EF] text-[#5B8479]',
  },
  qiming: {
    label: '启鸣宝宝',
    className: 'bg-[#FFF0E6] text-[#D07E61]',
  },
}

const quickCategories = computed(() => articleCategories)
</script>

<template>
  <div>
    <section class="overflow-hidden border-b border-brand-grey/50 bg-white">
      <div class="bg-[radial-gradient(circle_at_left_center,rgba(244,209,168,0.28),transparent_28%),linear-gradient(135deg,#fff8ef_0%,#fffdf9_42%,#fff8f0_100%)]">
        <div class="container-content">
          <div class="grid items-center gap-8 pb-0 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div class="pb-8 lg:pb-12">
              <h1 class="font-serif text-4xl leading-[1.2] text-brand-charcoal md:text-5xl">
                {{ articleCenterPage.title }}
              </h1>
              <p class="mt-5 max-w-2xl text-base leading-8 text-brand-text">
                在这里，探索关于 AI 提效、App 开发、成长思考、育儿启蒙、亲子时光与生活方式的真实记录。所有内容来自昆廷笔记与启鸣宝宝，持续更新中。
              </p>
            </div>
            <div class="self-end">
              <img :src="articleCenterPage.banner" alt="文章中心" class="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="-mt-6 rounded-[28px] border border-white/80 bg-white/92 p-4 shadow-[0_18px_48px_rgba(98,77,55,0.1)] backdrop-blur md:p-5">
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_170px_170px_170px]">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索文章、关键词、主题..."
                    class="h-12 w-full rounded-[14px] border border-[#E9D9C8] bg-[#FFFDFC] pl-4 pr-12 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-[#B7A593] focus:border-[#D9B38C]"
                  />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted">⌕</span>
                </div>

                <select v-model="activeColumn" class="h-12 rounded-[14px] border border-[#E9D9C8] bg-white px-4 text-sm text-brand-charcoal outline-none focus:border-[#D9B38C]">
                  <option v-for="item in columnOptions" :key="item" :value="item">{{ item }}</option>
                </select>

                <select v-model="activeCategory" class="h-12 rounded-[14px] border border-[#E9D9C8] bg-white px-4 text-sm text-brand-charcoal outline-none focus:border-[#D9B38C]">
                  <option v-for="item in categoryOptions" :key="item" :value="item">{{ item }}</option>
                </select>

                <select v-model="activeTopic" class="h-12 rounded-[14px] border border-[#E9D9C8] bg-white px-4 text-sm text-brand-charcoal outline-none focus:border-[#D9B38C]">
                  <option v-for="item in topicOptions" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>

              <div class="mt-4 flex flex-wrap gap-3">
                <button
                  v-for="item in quickCategories"
                  :key="item"
                  type="button"
                  class="rounded-full border px-4 py-2 text-sm transition-colors"
                  :class="(item === '全部' && activeCategory === '全部分类') || item === activeCategory
                    ? 'border-transparent bg-[#D97B37] text-white'
                    : 'border-[#E9D9C8] bg-white text-brand-text hover:border-[#D9B38C] hover:text-brand-charcoal'"
                  @click="activeCategory = item === '全部' ? '全部分类' : item"
                >
                  {{ item }}
                </button>
              </div>

              <div class="mt-4 space-y-4">
                <router-link
                  v-for="article in visibleArticles"
                  :key="article.slug"
                  :to="`/articles/${article.slug}`"
                  class="group grid overflow-hidden rounded-[24px] border border-[#EFE3D7] bg-white shadow-[0_10px_28px_rgba(98,77,55,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(98,77,55,0.1)] md:grid-cols-[220px_1fr]"
                >
                  <div class="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                    <div class="absolute left-3 top-3 z-10 h-8 w-8 rounded-lg bg-white/88 text-center text-sm leading-8 text-brand-charcoal shadow-sm">
                      ▣
                    </div>
                    <img :src="article.cover" :alt="article.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>

                  <div class="flex min-w-0 flex-col p-5 md:p-6">
                    <div class="flex flex-wrap items-center gap-3 text-xs">
                      <span
                        class="rounded-full px-3 py-1 font-semibold"
                        :class="columnMetaMap[article.column]?.className || 'bg-brand-warm text-brand-muted'"
                      >
                        {{ columnMetaMap[article.column]?.label || article.column }}
                      </span>
                    </div>

                    <h3 class="mt-4 text-2xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                      {{ article.title }}
                    </h3>

                    <p class="mt-3 line-clamp-2 text-sm leading-7 text-brand-text">{{ article.summary }}</p>

                    <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-sm text-brand-muted">
                      <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <span>{{ article.author }}</span>
                        <span>{{ article.publishedAt }}</span>
                        <span>{{ article.category }}</span>
                      </div>
                      <span>阅读 {{ article.viewCount }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="mt-5 flex justify-center" v-if="hasMore">
                <button
                  type="button"
                  class="inline-flex items-center rounded-full border border-[#D9B38C] bg-white px-6 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
                  @click="visibleCount += 4"
                >
                  下一页
                  <span class="ml-2" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <aside class="space-y-4">
              <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <div class="flex items-center gap-2 text-[#D97B37]">
                  <span>★</span>
                  <h3 class="text-xl font-semibold text-brand-charcoal">热门主题</h3>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    v-for="topic in articleHotTopics"
                    :key="topic"
                    type="button"
                    class="rounded-full border border-[#E9D9C8] bg-[#FAF7F2] px-3 py-2 text-sm text-brand-text transition-colors hover:border-[#D9B38C] hover:bg-white hover:text-brand-charcoal"
                    @click="activeTopic = topic"
                  >
                    {{ topic }}
                  </button>
                </div>
              </div>

              <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-[#D97B37]">
                    <span>⌘</span>
                    <h3 class="text-xl font-semibold text-brand-charcoal">产品推荐</h3>
                  </div>
                  <router-link to="/products" class="text-sm text-brand-muted hover:text-brand-charcoal">更多产品</router-link>
                </div>

                <div class="mt-4 space-y-3">
                  <router-link
                    v-for="product in featuredProducts"
                    :key="product.slug"
                    :to="`/products/${product.slug}`"
                    class="flex items-center gap-4 rounded-[20px] border border-[#F2E7DC] bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <img :src="product.cover" :alt="product.name" class="h-16 w-16 rounded-2xl object-cover" />
                    <div class="min-w-0 flex-1">
                      <div class="text-lg font-semibold text-brand-charcoal">{{ product.name }}</div>
                      <div class="mt-1 line-clamp-2 text-xs leading-6 text-brand-text">{{ product.shortDesc }}</div>
                    </div>
                    <span class="text-brand-muted">→</span>
                  </router-link>
                </div>
              </div>

              <div class="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#DE6F2B_0%,#E98033_48%,#D95E1D_100%)] p-6 text-white shadow-[0_16px_36px_rgba(217,111,52,0.24)]">
                <div class="text-4xl leading-none text-white/20">✦</div>
                <h3 class="mt-2 text-3xl font-serif font-semibold">快来尝鲜</h3>
                <p class="mt-3 text-sm leading-7 text-white/85">
                  抢先体验最新 App 与游戏，加入首批体验用户，享受专属权益。
                </p>
                <router-link to="/try" class="mt-5 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#D96F34] transition-colors hover:bg-[#FFF1E8]">
                  立即加入
                  <span class="ml-2" aria-hidden="true">→</span>
                </router-link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
