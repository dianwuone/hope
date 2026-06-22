<script setup>
import { computed, ref } from 'vue'
import { columns, articles, products } from '@/data'
import appPinyinGame from '@/assets/images/shucai/products/app-pinyin-game.jpg'

const props = defineProps({
  columnKey: {
    type: String,
    required: true,
  },
})

const activeCategory = ref('全部')
const visibleCount = ref(4)

const column = computed(() => columns[props.columnKey])
const columnArticles = computed(() =>
  articles
    .filter((item) => item.column === props.columnKey)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
)
const categoryItems = computed(() => [
  '全部',
  ...new Set(columnArticles.value.map((item) => item.category)),
])

const filteredArticles = computed(() =>
  columnArticles.value.filter((item) => activeCategory.value === '全部' || item.category === activeCategory.value)
)

const featuredArticle = computed(() => filteredArticles.value[0] || columnArticles.value[0])
const spotlightArticles = computed(() =>
  filteredArticles.value
    .filter((item) => item.slug !== featuredArticle.value?.slug)
    .slice(0, 2)
)
const feedArticles = computed(() =>
  filteredArticles.value
    .filter((item) => item.slug !== featuredArticle.value?.slug && !spotlightArticles.value.some((entry) => entry.slug === item.slug))
    .slice(0, visibleCount.value)
)
const hasMore = computed(() => {
  const remaining = filteredArticles.value.filter((item) =>
    item.slug !== featuredArticle.value?.slug && !spotlightArticles.value.some((entry) => entry.slug === item.slug)
  )
  return feedArticles.value.length < remaining.length
})

const recommendationMap = {
  'personal-assistant': {
    title: '个人助手',
    desc: '管理任务、节奏与复盘，让个人成长更有秩序。',
    image: products.find((item) => item.slug === 'personal-assistant')?.cover,
    to: '/products/personal-assistant',
    cta: '了解更多',
    accent: 'from-[#E7F3EC] to-[#F8FCFA]',
  },
  'parenting-assistant': {
    title: '育儿助手',
    desc: '科学记录与亲子陪伴，让成长轨迹更清晰。',
    image: products.find((item) => item.slug === 'parenting-assistant')?.cover,
    to: '/products/parenting-assistant',
    cta: '了解更多',
    accent: 'from-[#E9F5EE] to-[#F9FCFA]',
  },
  'ai-tools': {
    title: 'AI 工具助手',
    desc: '把写作、总结和灵感工具收纳进一个轻巧入口。',
    image: products.find((item) => item.slug === 'ai-tools')?.cover,
    to: '/products/ai-tools',
    cta: '了解更多',
    accent: 'from-[#EEF3F8] to-[#FBFCFE]',
  },
  'pinyin-adventure': {
    title: '拼音大冒险',
    desc: '把拼音练习做成更愿意参与的闯关体验。',
    image: appPinyinGame,
    to: '/games/pinyin-adventure',
    cta: '立即体验',
    accent: 'from-[#FFF1DF] to-[#FFF9F2]',
  },
  community: {
    title: '保持联系',
    desc: '继续了解内容更新、产品动态，也可以直接留言交流。',
    image: column.value?.avatar,
    to: '/community',
    cta: '去联系',
    accent: 'from-[#FFF1E6] to-[#FFF9F5]',
  },
}

const recommendations = computed(() =>
  (column.value?.recommendations || [])
    .map((key) => recommendationMap[key])
    .filter(Boolean)
)
const topicTags = computed(() => {
  const tags = columnArticles.value.flatMap((item) => item.tags || [])
  return [...new Set(tags)].slice(0, 8)
})

const formatDate = (value) => value?.replaceAll('-', '-') || ''
const columnStats = computed(() => [
  { label: '文章数量', value: `${columnArticles.value.length}+` },
  { label: '栏目主题', value: `${column.value?.directions?.length || 0}` },
  { label: '关键词', value: `${topicTags.value.length}+` },
])
</script>

<template>
  <div v-if="column">
    <section class="overflow-hidden border-b border-brand-grey/50 bg-white">
      <div class="bg-[radial-gradient(circle_at_left_center,rgba(248,210,170,0.28),transparent_28%),linear-gradient(135deg,#fff9f1_0%,#fffdf9_42%,#fff9f3_100%)]">
        <div class="container-content">
          <div class="grid items-center gap-8 pb-0 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div class="pb-8 lg:pb-12">
              <div class="inline-flex items-center gap-2 text-sm font-medium text-brand-muted">
                <span class="text-base" :class="column.accent.text">◔</span>
                <span>{{ column.eyebrow }}</span>
              </div>
              <h1 class="mt-4 max-w-xl font-serif text-4xl leading-[1.22] text-brand-charcoal md:text-5xl">
                {{ column.title }}
              </h1>
              <p class="mt-5 max-w-xl text-base leading-8 text-brand-text">
                {{ column.intro }}
              </p>
              <div class="mt-7 flex flex-wrap gap-3">
                <span
                  v-for="tag in column.tags"
                  :key="tag"
                  class="rounded-full border border-[#E9D9C8] bg-white/70 px-4 py-2 text-sm text-brand-text"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <div
                  v-for="item in columnStats"
                  :key="item.label"
                  class="rounded-[18px] border border-white/70 bg-white/60 px-4 py-3 shadow-[0_10px_24px_rgba(98,77,55,0.06)]"
                >
                  <div class="text-2xl font-semibold text-brand-charcoal">{{ item.value }}</div>
                  <div class="mt-1 text-xs uppercase tracking-[0.14em] text-brand-muted">{{ item.label }}</div>
                </div>
              </div>
            </div>
            <div class="self-end">
              <img :src="column.banner" :alt="column.name" class="w-full object-cover" />
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
              <section class="rounded-[24px] border border-[#EFE3D7] bg-[linear-gradient(135deg,#fffaf4_0%,#ffffff_100%)] p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)] md:p-6">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="text-sm font-semibold tracking-[0.16em]" :class="column.accent.text">栏目方向</div>
                    <h2 class="mt-2 text-2xl font-serif font-semibold text-brand-charcoal">这个 IP 在写什么</h2>
                  </div>
                  <router-link
                    to="/articles"
                    class="hidden rounded-full border border-[#E9D9C8] bg-white px-4 py-2 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF] md:inline-flex"
                  >
                    查看全部内容
                  </router-link>
                </div>
                <div class="mt-5 grid gap-4 md:grid-cols-3">
                  <div
                    v-for="item in column.directions"
                    :key="item.title"
                    class="rounded-[20px] border border-[#F2E7DC] bg-white p-4"
                  >
                    <div class="text-lg font-semibold text-brand-charcoal">{{ item.title }}</div>
                    <p class="mt-2 text-sm leading-7 text-brand-text">{{ item.desc }}</p>
                  </div>
                </div>
              </section>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  v-for="item in categoryItems"
                  :key="item"
                  type="button"
                  class="rounded-full border px-4 py-2 text-sm transition-colors"
                  :class="activeCategory === item
                    ? `${column.accent.strong} border-transparent text-white`
                    : 'border-[#E9D9C8] bg-white text-brand-text hover:border-[#D9B38C] hover:text-brand-charcoal'"
                  @click="activeCategory = item"
                >
                  {{ item }}
                </button>
              </div>

              <section v-if="featuredArticle" class="mt-6">
                <div class="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div class="text-sm font-semibold tracking-[0.16em]" :class="column.accent.text">精选文章</div>
                    <h2 class="mt-1 text-2xl font-serif font-semibold text-brand-charcoal">先看这几篇</h2>
                  </div>
                </div>
                <router-link
                  :to="`/articles/${featuredArticle.slug}`"
                  class="group grid overflow-hidden rounded-[24px] border border-[#EFE3D7] bg-white shadow-[0_10px_28px_rgba(98,77,55,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(98,77,55,0.1)] md:grid-cols-[220px_1fr]"
                >
                  <div class="aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                    <img :src="featuredArticle.cover" :alt="featuredArticle.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div class="flex min-w-0 flex-col p-5 md:p-6">
                    <div class="flex flex-wrap items-center gap-3 text-xs">
                      <span class="rounded-full px-3 py-1 font-semibold" :class="column.accent.tag">{{ featuredArticle.category }}</span>
                      <span class="rounded-full border border-[#F1E5D8] bg-[#FFF8F1] px-3 py-1 text-brand-muted">推荐阅读</span>
                    </div>
                    <h3 class="mt-4 text-2xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                      {{ featuredArticle.title }}
                    </h3>
                    <p class="mt-3 text-sm leading-7 text-brand-text">{{ featuredArticle.summary }}</p>
                    <div class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm text-brand-muted">
                      <span>{{ column.author }}</span>
                      <span>{{ formatDate(featuredArticle.publishedAt) }}</span>
                      <span>{{ featuredArticle.viewCount }} 阅读</span>
                    </div>
                  </div>
                </router-link>
              </section>

              <section v-if="spotlightArticles.length" class="mt-6">
                <div class="mb-4">
                  <div class="text-sm font-semibold tracking-[0.16em]" :class="column.accent.text">专题精选</div>
                  <h2 class="mt-1 text-2xl font-serif font-semibold text-brand-charcoal">继续深入看看</h2>
                </div>
                <div class="grid gap-4 md:grid-cols-2">
                  <router-link
                    v-for="article in spotlightArticles"
                    :key="article.slug"
                    :to="`/articles/${article.slug}`"
                    class="group overflow-hidden rounded-[22px] border border-[#EFE3D7] bg-white shadow-[0_10px_28px_rgba(98,77,55,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(98,77,55,0.1)]"
                  >
                    <div class="aspect-[16/10] overflow-hidden">
                      <img :src="article.cover" :alt="article.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div class="p-5">
                      <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="column.accent.tag">{{ article.category }}</span>
                      <h3 class="mt-4 text-xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                        {{ article.title }}
                      </h3>
                      <p class="mt-3 line-clamp-2 text-sm leading-7 text-brand-text">{{ article.summary }}</p>
                    </div>
                  </router-link>
                </div>
              </section>

              <section class="mt-6">
                <div class="mb-4">
                  <div class="text-sm font-semibold tracking-[0.16em]" :class="column.accent.text">最新更新</div>
                  <h2 class="mt-1 text-2xl font-serif font-semibold text-brand-charcoal">栏目文章流</h2>
                </div>
                <div class="space-y-4">
                  <router-link
                    v-for="article in feedArticles"
                    :key="article.slug"
                    :to="`/articles/${article.slug}`"
                    class="group grid overflow-hidden rounded-[24px] border border-[#EFE3D7] bg-white shadow-[0_10px_28px_rgba(98,77,55,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(98,77,55,0.1)] md:grid-cols-[220px_1fr]"
                  >
                    <div class="aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                      <img :src="article.cover" :alt="article.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div class="flex min-w-0 flex-col p-5 md:p-6">
                      <div class="flex flex-wrap items-center gap-3 text-xs">
                        <span class="rounded-full px-3 py-1 font-semibold" :class="column.accent.tag">{{ article.category }}</span>
                      </div>
                      <h3 class="mt-4 text-2xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                        {{ article.title }}
                      </h3>
                      <p class="mt-3 line-clamp-2 text-sm leading-7 text-brand-text">{{ article.summary }}</p>
                      <div class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm text-brand-muted">
                        <span>{{ column.author }}</span>
                        <span>{{ formatDate(article.publishedAt) }}</span>
                        <span>{{ article.viewCount }} 阅读</span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </section>

              <div class="mt-5 flex justify-center" v-if="hasMore">
                <button
                  type="button"
                  class="inline-flex items-center rounded-full border border-[#D9B38C] bg-white px-6 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
                  @click="visibleCount += 4"
                >
                  加载更多文章
                  <span class="ml-2" aria-hidden="true">⌄</span>
                </button>
              </div>
            </div>

            <aside class="space-y-4">
              <div class="rounded-[24px] border border-[#EFE3D7] bg-[linear-gradient(135deg,#fffaf4_0%,#ffffff_100%)] p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <div class="flex items-center gap-4">
                  <img :src="column.avatar" :alt="column.author" class="h-14 w-14 rounded-2xl object-cover" />
                  <div>
                    <div class="text-sm font-semibold tracking-[0.16em]" :class="column.accent.text">{{ column.name }}</div>
                    <div class="mt-1 text-lg font-semibold text-brand-charcoal">{{ column.author }}</div>
                  </div>
                </div>
                <p class="mt-4 text-sm leading-7 text-brand-text">{{ column.subtitle }}</p>
                <router-link
                  to="/articles"
                  class="mt-5 inline-flex items-center rounded-full border border-[#E9D9C8] bg-white px-4 py-2 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
                >
                  返回文章中心
                </router-link>
              </div>

              <div class="rounded-[20px] border border-dashed border-[#EDB790] bg-[#FFF9F4] p-5 text-center text-sm text-brand-muted">
                {{ column.adSlots.topBanner }}
              </div>

              <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <h3 class="text-xl font-semibold text-brand-charcoal">为你推荐</h3>
                <div class="mt-4 space-y-3">
                  <router-link
                    v-for="item in recommendations"
                    :key="item.to"
                    :to="item.to"
                    class="flex items-center gap-4 rounded-[20px] border border-[#F2E7DC] bg-gradient-to-br p-4 transition-transform duration-300 hover:-translate-y-0.5"
                    :class="item.accent"
                  >
                    <div class="min-w-0 flex-1">
                      <div class="text-lg font-semibold text-brand-charcoal">{{ item.title }}</div>
                      <div class="mt-2 text-xs leading-6 text-brand-text">{{ item.desc }}</div>
                      <div class="mt-3 inline-flex items-center text-sm font-semibold" :class="column.accent.text">
                        {{ item.cta }}
                      </div>
                    </div>
                    <img :src="item.image" :alt="item.title" class="h-20 w-20 rounded-2xl object-cover" />
                  </router-link>
                </div>
              </div>

              <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-xl font-semibold text-brand-charcoal">热门话题</h3>
                  <span class="text-brand-muted">◌</span>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    v-for="tag in topicTags"
                    :key="tag"
                    type="button"
                    class="rounded-full border border-[#E9D9C8] bg-[#FAF7F2] px-3 py-2 text-sm text-brand-text transition-colors hover:border-[#D9B38C] hover:bg-white hover:text-brand-charcoal"
                    @click="activeCategory = '全部'"
                  >
                    #
                    {{ tag }}
                  </button>
                </div>
              </div>

              <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
                <h3 class="text-xl font-semibold text-brand-charcoal">获取最新灵感</h3>
                <p class="mt-2 text-sm leading-7 text-brand-text">每周精选文章、产品进展与活动消息，发送到你的邮箱。</p>
                <div class="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="输入你的邮箱地址"
                    class="h-11 min-w-0 flex-1 rounded-[14px] border border-[#E9D9C8] bg-[#FFFDFC] px-4 text-sm outline-none placeholder:text-[#B7A593] focus:border-[#D9B38C]"
                  />
                  <router-link
                    to="/subscribe"
                    class="inline-flex h-11 items-center justify-center rounded-[14px] px-5 text-sm font-semibold text-white transition-colors"
                    :class="[column.accent.strong, column.accent.strongHover]"
                  >
                    订阅
                  </router-link>
                </div>
              </div>

              <div class="rounded-[20px] border border-dashed border-[#EDB790] bg-[#FFF9F4] p-5 text-center text-sm text-brand-muted">
                {{ column.adSlots.bottomBox }}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <div class="pointer-events-none fixed bottom-10 left-6 z-10 hidden xl:block">
      <div class="flex h-[250px] w-[170px] items-center justify-center rounded-[24px] border border-dashed border-[#EDB790] bg-[#FFF9F4]/92 px-6 text-center text-sm text-brand-muted shadow-[0_14px_30px_rgba(98,77,55,0.08)]">
        {{ column.adSlots.sideA }}
      </div>
    </div>
  </div>
</template>
