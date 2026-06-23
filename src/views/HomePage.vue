<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { articles, columns, homePage } from '@/data'

const activeHeroIndex = ref(0)
let heroTimer

const activeHeroSlide = computed(() => homePage.hero.slides[activeHeroIndex.value])
const formatDate = (value) => value?.replaceAll('-', '/') || ''
const homeProductMatrix = computed(() => [
  {
    ...homePage.products[0],
    accent: 'from-[#CFE8DF] via-[#E4F2EB] to-[#F7FBF8]',
    buttonClass: 'border-[#90B8AA] text-[#46685E] hover:bg-white/80',
    frameClass: 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.82),rgba(255,255,255,0.35)_58%,rgba(255,255,255,0)_100%)]',
    bulletClass: 'text-[#6E9C8B]',
    platformMarks: ['iOS', 'Android'],
    cta: '随手看看',
    summaryLine: '日常生活里的个人小工具',
  },
  {
    ...homePage.products[1],
    accent: 'from-[#F8DDD2] via-[#FCEADF] to-[#FFF8F2]',
    buttonClass: 'border-[#D6A08B] text-[#B06C55] hover:bg-white/80',
    frameClass: 'bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.8),rgba(255,244,237,0.48)_55%,rgba(255,255,255,0)_100%)]',
    bulletClass: 'text-[#D17D62]',
    platformMarks: ['iOS', 'Android'],
    cta: '随手看看',
    summaryLine: '记录陪伴孩子成长时想到的小方法',
  },
  {
    ...homePage.products[2],
    accent: 'from-[#CADDEA] via-[#DDEAF2] to-[#F4F8FB]',
    buttonClass: 'border-[#94AFC0] text-[#5A7685] hover:bg-white/80',
    frameClass: 'bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.82),rgba(241,248,252,0.45)_56%,rgba(255,255,255,0)_100%)]',
    bulletClass: 'text-[#7391A1]',
    platformMarks: ['Web', 'AI'],
    cta: '随手看看',
    summaryLine: '用于整理工作与表达的效率工具',
  },
])
const homeContentColumns = computed(() => [
  {
    ...columns.kunting,
    accent: 'from-[#EAF3F2] via-[#F7FBFA] to-[#FEFEFD]',
    borderClass: 'border-[#D7E7E5]',
    linkClass: 'text-[#5B8479]',
    tagClass: 'bg-[#E8F3EF] text-[#6D9287]',
    items: [...articles]
      .filter((item) => item.column === 'kunting')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3),
  },
  {
    ...columns.qiming,
    accent: 'from-[#FFF0E8] via-[#FFF8F4] to-[#FFFEFD]',
    borderClass: 'border-[#F1DDD3]',
    linkClass: 'text-[#D07E61]',
    tagClass: 'bg-[#FFF0E8] text-[#D58A6D]',
    items: [...articles]
      .filter((item) => item.column === 'qiming')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3),
  },
])
const homeInteractiveCards = computed(() => [
  {
    ...homePage.interactiveCards[0],
    accent: 'from-[#FFF6EC] via-[#FFF9F4] to-[#FFFEFC]',
    borderClass: 'border-[#F1E2CF]',
    buttonClass: 'bg-[#E67E43] text-white hover:bg-[#d96f34]',
    iconWrapClass: 'bg-white/80 text-[#E67E43]',
    metricLabel: '今日整理',
    metricValue: '1,248',
    metricClass: 'bg-[#355A58] text-white',
    decoration: 'bubbles',
  },
  {
    ...homePage.interactiveCards[1],
    accent: 'from-[#FFF8EE] via-[#FFFDF9] to-[#FFFEFC]',
    borderClass: 'border-[#F0E3D3]',
    buttonClass: 'bg-[#E67E43] text-white hover:bg-[#d96f34]',
    iconWrapClass: 'bg-white/80 text-[#E67E43]',
    metricLabel: '体验进度',
    metricValue: '0236',
    metricClass: 'bg-transparent text-brand-charcoal',
    decoration: 'dino',
  },
  {
    ...homePage.interactiveCards[2],
    accent: 'from-[#EEF5F8] via-[#F7FBFD] to-[#FEFEFE]',
    borderClass: 'border-[#DCE8ED]',
    buttonClass: 'bg-[#5F8BA0] text-white hover:bg-[#4f778b]',
    iconWrapClass: 'bg-white/80 text-[#5F8BA0]',
    metricLabel: '联系入口',
    metricValue: 'OPEN',
    metricClass: 'bg-[#EFF6F9] text-[#5F8BA0]',
    decoration: 'reserve',
  },
])
const homeLabCards = computed(() => [
  {
    ...homePage.labs[0],
    accent: 'from-[#F5F2EB] via-[#FBF8F2] to-[#FFFEFC]',
    borderClass: 'border-[#E7DDD0]',
    buttonClass: 'bg-[#4F847F] text-white hover:bg-[#44736f]',
    buttonLabel: '看看记录',
    imageMaskClass: 'from-[#FBF8F2] via-[#FBF8F2]/40 to-transparent',
    imageGlowClass: 'bg-[radial-gradient(circle_at_28%_52%,rgba(255,248,238,0.95),rgba(255,248,238,0.32)_42%,rgba(255,248,238,0)_72%)]',
  },
  {
    ...homePage.labs[1],
    accent: 'from-[#F8F0E6] via-[#FCF7F0] to-[#FFFEFC]',
    borderClass: 'border-[#E8DCCC]',
    buttonClass: 'bg-[#C97C4B] text-white hover:bg-[#b86d3f]',
    buttonLabel: '继续阅读',
    imageMaskClass: 'from-[#FCF7F0] via-[#FCF7F0]/42 to-transparent',
    imageGlowClass: 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,247,238,0.92),rgba(255,247,238,0.28)_42%,rgba(255,247,238,0)_72%)]',
  },
])
const homeLabHighlights = computed(() => [
  '育儿日常补充记录',
  '工作方法继续整理',
  '亲子互动想法收集',
])

onMounted(() => {
  heroTimer = window.setInterval(() => {
    activeHeroIndex.value = (activeHeroIndex.value + 1) % homePage.hero.slides.length
  }, 4500)
})

onUnmounted(() => {
  window.clearInterval(heroTimer)
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden pb-8 pt-4 md:pb-10">
      <div class="absolute inset-0">
        <div
          v-for="(slide, index) in homePage.hero.slides"
          :key="slide.background"
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          :class="activeHeroIndex === index ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundImage: `url(${slide.background})` }"
        />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(255,252,247,0.97),rgba(255,249,241,0.93)_30%,rgba(255,248,242,0.72)_56%,rgba(255,248,242,0.26)_78%,rgba(255,248,242,0.08)_100%)]" />
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,245,0.96)_0%,rgba(255,249,242,0.9)_34%,rgba(255,248,242,0.54)_62%,rgba(255,248,242,0.12)_100%)]" />
      </div>

      <div class="container-content relative z-10">
        <div class="overflow-hidden rounded-[32px] bg-white/10 shadow-hero">
          <div class="grid gap-8 px-6 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div class="text-sm font-semibold tracking-[0.18em] text-gold">{{ homePage.hero.badge }}</div>
              <h1 class="mt-5 max-w-2xl font-serif text-4xl leading-[1.22] text-brand-charcoal md:text-5xl lg:text-[3.45rem]">
                {{ homePage.hero.title }}
              </h1>
              <p class="mt-5 max-w-xl text-base leading-8 text-brand-text md:text-lg">
                {{ homePage.hero.subtitle }}
              </p>

              <div class="mt-8 flex flex-wrap gap-4">
                <component
                  v-for="action in homePage.hero.actions"
                  :key="action.label"
                  :is="RouterLink"
                  :to="action.to"
                  :class="action.variant === 'primary' ? 'btn-primary shadow-md shadow-gold/20' : 'btn-outline bg-white/72'"
                >
                  {{ action.label }}
                </component>
              </div>

              <div class="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-text">
                <div v-for="stat in homePage.hero.stats" :key="stat.label" class="flex items-center gap-2">
                  <span class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/35 text-[10px] text-gold">✦</span>
                  <span class="font-medium text-brand-charcoal">{{ stat.value }}</span>
                  <span class="text-brand-muted">{{ stat.label }}</span>
                </div>
              </div>
            </div>

            <div class="relative min-h-[320px] md:min-h-[420px]">
              <div class="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(255,252,247,0.18),transparent_65%)]" />
              <div class="absolute right-[10%] top-[2%] z-40 rounded-full bg-mint/90 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                {{ activeHeroSlide.eyebrow }}
              </div>
              <img
                :src="homePage.products[0].cover"
                :alt="homePage.products[0].name"
                class="absolute left-[28%] top-[4%] z-20 w-[44%] rotate-[-6deg] object-contain drop-shadow-[0_24px_38px_rgba(85,66,44,0.18)]"
              />
              <img
                :src="homePage.products[1].cover"
                :alt="homePage.products[1].name"
                class="absolute right-[6%] top-[14%] z-30 w-[31%] rotate-[7deg] object-contain drop-shadow-[0_18px_30px_rgba(85,66,44,0.16)]"
              />
              <img
                :src="homePage.products[2].cover"
                :alt="homePage.products[2].name"
                class="absolute left-[8%] top-[18%] z-10 w-[26%] rotate-[2deg] object-contain drop-shadow-[0_18px_28px_rgba(85,66,44,0.14)]"
              />
              <img
                :src="activeHeroSlide.background"
                alt="首页轮播场景"
                class="absolute bottom-[8%] left-[24%] z-20 w-[42%] rotate-[5deg] object-cover opacity-92 mix-blend-multiply drop-shadow-[0_18px_28px_rgba(85,66,44,0.16)]"
              />
              <div class="absolute bottom-[7%] left-[18%] z-30 rounded-[24px] bg-[#D97757] px-5 py-3 text-sm font-semibold text-white shadow-lg">
                留下真实记录
              </div>
            </div>
          </div>

          <div class="px-4 pb-4 md:px-8 md:pb-6">
            <div class="rounded-[26px] border border-white/70 bg-white/80 p-3 shadow-[0_12px_30px_rgba(85,66,44,0.08)] backdrop-blur">
              <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div class="flex min-w-0 items-center gap-3 rounded-full bg-[#FBF6EE] px-4 py-3 text-sm text-brand-text lg:min-w-[280px]">
                  <span class="text-lg text-gold">⌕</span>
                  <span class="truncate">探索你感兴趣的话题</span>
                </div>
                <div class="flex flex-1 flex-wrap gap-2">
                  <button
                    v-for="tag in homePage.exploreTags"
                    :key="tag"
                    type="button"
                    class="rounded-full border border-[#EADFCC] bg-white px-4 py-2 text-sm text-brand-text transition-colors hover:border-gold hover:text-brand-charcoal"
                  >
                    {{ tag }}
                  </button>
                </div>
                <button
                  type="button"
                  class="flex h-11 w-11 items-center justify-center self-end rounded-full bg-[#E8D9C1] text-brand-charcoal transition-colors hover:bg-gold hover:text-white lg:self-auto"
                  @click="activeHeroIndex = (activeHeroIndex + 1) % homePage.hero.slides.length"
                  aria-label="切换轮播"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <SectionTitle eyebrow="个人展示" title="个人记录中的几个内容方向" subtitle="这里用静态方式展示我平时持续整理的几类个人内容与生活主题。" align="center" />
        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="product in homeProductMatrix"
            :key="product.slug"
            class="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_18px_44px_rgba(94,77,59,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(94,77,59,0.14)]"
            :class="`bg-gradient-to-br ${product.accent}`"
          >
            <div class="relative z-10 flex min-h-[430px] gap-4">
              <div class="flex min-w-0 flex-1 flex-col">
                <h3 class="text-[1.7rem] font-serif font-semibold leading-tight text-brand-charcoal">
                  {{ product.name }}
                </h3>
                <p class="mt-2 text-sm text-brand-text">
                  {{ product.summaryLine }}
                </p>
                <ul class="mt-7 space-y-3 text-sm text-brand-text">
                  <li
                    v-for="feature in product.features.slice(0, 3)"
                    :key="feature.title"
                    class="flex items-start gap-2"
                  >
                    <span class="mt-[2px] text-xs" :class="product.bulletClass">★</span>
                    <span>{{ feature.title }}</span>
                  </li>
                </ul>
                <div class="mt-auto pt-8">
                  <RouterLink
                    :to="`/products/${product.slug}`"
                    class="inline-flex items-center rounded-full border bg-white/60 px-4 py-2 text-sm font-medium transition-colors"
                    :class="product.buttonClass"
                  >
                    {{ product.cta }}
                  </RouterLink>
                  <div class="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                    <span
                      v-for="mark in product.platformMarks"
                      :key="mark"
                      class="rounded-full border border-white/60 bg-white/55 px-3 py-1"
                    >
                      {{ mark }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="relative flex w-[42%] min-w-[120px] items-center justify-center">
                <div class="pointer-events-none absolute inset-0 z-0 rounded-[30px] blur-3xl" :class="product.frameClass"></div>
                <img
                  :src="product.cover"
                  :alt="product.name"
                  class="relative z-10 max-h-[310px] w-full max-w-[180px] rounded-[26px] object-contain drop-shadow-[0_20px_34px_rgba(45,38,28,0.22)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content">
        <SectionTitle eyebrow="双内容 IP" title="育儿与职场的双线记录" subtitle="一边记录陪伴孩子成长的心得，一边整理职场中的思考与方法。" align="center" />
        <div class="mt-10 grid gap-6 xl:grid-cols-2">
          <section
            v-for="column in homeContentColumns"
            :key="column.slug"
            class="rounded-[30px] border bg-gradient-to-br p-4 shadow-[0_16px_38px_rgba(92,73,54,0.08)] md:p-5"
            :class="[column.accent, column.borderClass]"
          >
            <div class="flex items-center justify-between gap-4 rounded-[24px] border border-white/70 bg-white/72 px-4 py-3 shadow-[0_8px_26px_rgba(92,73,54,0.06)]">
              <div class="flex min-w-0 items-center gap-3">
                <img :src="column.avatar" :alt="column.name" class="h-12 w-12 rounded-2xl object-cover shadow-sm" />
                <div class="min-w-0">
                  <h3 class="text-xl font-serif font-semibold text-brand-charcoal">{{ column.name }}</h3>
                  <p class="mt-1 truncate text-sm text-brand-text">{{ column.subtitle }}</p>
                </div>
              </div>
              <RouterLink :to="`/columns/${column.slug}`" class="shrink-0 text-sm font-semibold" :class="column.linkClass">进入专栏</RouterLink>
            </div>

            <div class="mt-4 space-y-3">
              <div
                v-for="article in column.items"
                :key="article.slug"
                class="group grid gap-4 overflow-hidden rounded-[22px] border border-white/70 bg-white/80 p-3 shadow-[0_10px_26px_rgba(92,73,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(92,73,54,0.1)] sm:grid-cols-[148px_1fr]"
              >
                <div class="overflow-hidden rounded-[18px] bg-brand-warm">
                  <img
                    :src="article.cover"
                    :alt="article.title"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div class="flex min-w-0 flex-col justify-between">
                  <div>
                    <h4 class="line-clamp-2 text-xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                      {{ article.title }}
                    </h4>
                    <p class="mt-2 line-clamp-2 text-sm leading-7 text-brand-text">{{ article.summary }}</p>
                  </div>

                  <div class="mt-4 flex items-end justify-between gap-4">
                    <div class="text-sm text-brand-muted">
                      {{ formatDate(article.publishedAt) }}
                    </div>
                    <RouterLink :to="`/articles/${article.slug}`" class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold" :class="column.tagClass">
                      {{ article.category }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <SectionTitle eyebrow="补充说明" title="个人记录补充说明" subtitle="首页仅保留静态说明，用来展示这个个人网站主要记录和整理的内容方向。" align="center" />
        <div class="mt-10 grid gap-6 xl:grid-cols-2">
          <div
            v-for="card in homeInteractiveCards"
            :key="card.title"
            class="group relative overflow-hidden rounded-[30px] border bg-gradient-to-br p-6 shadow-[0_16px_38px_rgba(92,73,54,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(92,73,54,0.12)] md:p-7"
            :class="[card.accent, card.borderClass]"
          >
            <div class="relative z-10 flex min-h-[230px] flex-col justify-between gap-6 sm:min-h-[250px] sm:flex-row sm:items-stretch">
              <div class="flex max-w-[240px] flex-1 flex-col">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm" :class="card.iconWrapClass">
                  <span class="text-xl font-semibold">{{ card.title === '资源整理页' ? '◫' : card.title === '联系与订阅' ? '☏' : '✦' }}</span>
                </div>
                <div class="mt-5">
                  <h3 class="text-[2rem] font-serif font-semibold leading-tight text-brand-charcoal">{{ card.title }}</h3>
                  <p class="mt-3 text-sm leading-7 text-brand-text">{{ card.desc }}</p>
                </div>
                <div class="mt-auto pt-6">
                  <RouterLink :to="card.to" class="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_12px_24px_rgba(230,126,67,0.22)] transition-colors" :class="card.buttonClass">
                    进入页面
                  </RouterLink>
                </div>
              </div>

              <div class="relative flex flex-1 items-end justify-end overflow-hidden rounded-[24px] border border-white/70 bg-white/30 p-4">
                <template v-if="card.decoration === 'bubbles'">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),rgba(255,255,255,0.18)_52%,transparent_75%)]"></div>
                  <div class="absolute left-8 top-7 h-3 w-3 rounded-full bg-[#84D0D7]/90 shadow-[0_0_0_8px_rgba(132,208,215,0.08)]"></div>
                  <div class="absolute right-16 top-6 h-4 w-4 rounded-full bg-[#FDBA74]/90 shadow-[0_0_0_10px_rgba(253,186,116,0.1)]"></div>
                  <div class="absolute left-1/2 top-10 h-2.5 w-2.5 rounded-full bg-[#93C5FD]/90 shadow-[0_0_0_8px_rgba(147,197,253,0.12)]"></div>
                  <div class="absolute inset-x-8 bottom-5 top-5 opacity-60">
                    <div class="absolute left-[14%] top-[18%] h-14 w-px rotate-[14deg] bg-[#E6D7C9]"></div>
                    <div class="absolute left-[35%] top-[8%] h-24 w-px rotate-[-10deg] bg-[#E6D7C9]"></div>
                    <div class="absolute left-[57%] top-[16%] h-20 w-px rotate-[8deg] bg-[#E6D7C9]"></div>
                    <div class="absolute left-[76%] top-[4%] h-28 w-px rotate-[-6deg] bg-[#E6D7C9]"></div>
                  </div>
                  <div class="absolute left-[16%] top-[34%] grid grid-cols-4 gap-3 sm:left-[18%]">
                    <span v-for="n in 12" :key="n" class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/92 text-xs font-semibold text-brand-charcoal shadow-[0_8px_20px_rgba(94,77,59,0.12)]">
                      {{ ['A','M','✦','□','∞','◎','W','P','AI','N','◈','✳'][n - 1] }}
                    </span>
                  </div>
                </template>

                <template v-else-if="card.decoration === 'dino'">
                  <div class="absolute left-6 right-6 top-7 flex items-center justify-between text-[#C7D9E5]">
                    <span class="text-4xl leading-none">··</span>
                    <span class="text-5xl leading-none">··</span>
                  </div>
                  <div class="absolute inset-x-0 bottom-6 h-px bg-[#D8CFC0]"></div>
                  <div class="absolute bottom-[24px] left-[16%] font-mono text-[2rem] font-bold tracking-tight text-[#3E4A44]">LIFE</div>
                  <div class="absolute bottom-[29px] left-[58%] font-mono text-xl font-semibold tracking-[0.18em] text-[#7E8E67]">||</div>
                  <div class="absolute bottom-[29px] left-[76%] font-mono text-lg font-semibold tracking-[0.18em] text-[#93A67A]">|||</div>
                  <div class="absolute right-5 top-5 text-right">
                    <div class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{{ card.metricLabel }}</div>
                    <div class="mt-1 text-3xl font-semibold tracking-[0.14em] text-brand-charcoal">{{ card.metricValue }}</div>
                    <div class="mt-3 flex justify-end gap-1 text-[#F37F62]">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </div>
                  </div>
                </template>

                <div
                  v-if="card.decoration === 'bubbles'"
                  class="relative z-10 ml-auto rounded-[22px] px-5 py-4 shadow-[0_18px_30px_rgba(48,74,72,0.22)]"
                  :class="card.metricClass"
                >
                  <div class="text-xs text-white/80">{{ card.metricLabel }}</div>
                  <div class="mt-1 text-4xl font-semibold">{{ card.metricValue }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content">
        <SectionTitle eyebrow="补充内容" title="一些还在慢慢整理的主题" subtitle="这里展示几个仍在持续整理中的个人记录主题，不涉及经营性引导。" align="center" />
        <div class="mt-10 grid gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
          <div
            v-for="lab in homeLabCards"
            :key="lab.slug"
            class="group overflow-hidden rounded-[30px] border bg-gradient-to-br p-4 shadow-[0_16px_38px_rgba(92,73,54,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(92,73,54,0.12)] md:p-5"
            :class="[lab.accent, lab.borderClass]"
          >
            <div class="grid min-h-[220px] gap-4 md:grid-cols-[0.86fr_1.14fr] md:items-center">
              <div class="flex flex-col">
                <h3 class="text-[2rem] font-serif font-semibold leading-tight text-brand-charcoal">{{ lab.title }}</h3>
                <p class="mt-3 text-sm leading-7 text-brand-text">{{ lab.description }}</p>
                <div class="mt-auto pt-6">
                  <RouterLink :to="`/lab/${lab.slug}`" class="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_12px_24px_rgba(88,74,52,0.16)] transition-colors" :class="lab.buttonClass">
                    {{ lab.buttonLabel }}
                  </RouterLink>
                </div>
              </div>
              <div class="relative min-h-[180px] overflow-hidden rounded-[24px]">
                <div class="absolute inset-0 z-10" :class="`bg-gradient-to-r ${lab.imageMaskClass}`"></div>
                <div class="absolute inset-0 z-10" :class="lab.imageGlowClass"></div>
                <div class="absolute inset-y-0 left-0 z-10 w-20 bg-[linear-gradient(90deg,rgba(252,248,242,0.92),rgba(252,248,242,0.38)_58%,rgba(252,248,242,0))]"></div>
                <img
                  :src="lab.cover"
                  :alt="lab.name"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>

          <section class="rounded-[30px] border border-[#EEE1CF] bg-gradient-to-br from-[#FFF8EE] via-[#FFFDF9] to-[#FFFEFC] p-6 shadow-[0_16px_38px_rgba(92,73,54,0.08)]">
            <div class="flex items-center gap-4">
              <h3 class="text-[1.8rem] font-serif font-semibold text-[#C97C4B]">持续整理中</h3>
              <div class="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,124,75,0.22),rgba(201,124,75,0))]"></div>
            </div>
            <div class="mt-6 space-y-4">
              <div
                v-for="item in homeLabHighlights"
                :key="item"
                class="flex items-center justify-between gap-4 rounded-[18px] border border-white/70 bg-white/70 px-4 py-3"
              >
                <div class="flex items-center gap-3">
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF1E4] text-xs text-[#C97C4B]">✦</span>
                  <span class="text-sm font-medium text-brand-charcoal">{{ item }}</span>
                </div>
                <span class="rounded-full bg-[#FFB25B] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  New
                </span>
              </div>
            </div>
            <p class="mt-6 text-sm font-medium text-brand-muted">更多内容，会慢慢补充。</p>
          </section>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <div class="overflow-hidden rounded-[34px] border border-[#E9D8C6] bg-[linear-gradient(135deg,#F7E8D4_0%,#FCF7F0_24%,#FFFDF9_56%,#F9E9D7_100%)] shadow-[0_22px_54px_rgba(97,73,45,0.12)]">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 hidden w-[26%] bg-[radial-gradient(circle_at_left_center,rgba(215,182,145,0.22),rgba(247,232,212,0)_72%)] lg:block"></div>
            <div class="absolute right-10 top-8 hidden text-[4rem] leading-none text-[#F0C7A3] lg:block">♡</div>

            <div class="relative px-5 py-6 md:px-7 md:py-7 lg:px-8">
              <div class="text-center">
                <div class="text-sm font-semibold tracking-[0.18em] text-[#C98A48]">联系说明</div>
                <h2 class="mt-3 font-serif text-3xl leading-tight text-brand-charcoal md:text-4xl">
                  如果你愿意，也可以和我简单交流
                </h2>
                <p class="mx-auto mt-3 max-w-3xl text-sm leading-7 text-brand-text md:text-base">
                  这里不做产品推广或平台引导，仅保留个人记录说明与基础联系信息展示。
                </p>
              </div>

              <div class="mt-6 grid gap-3 md:grid-cols-3">
                <div class="flex items-start gap-3 rounded-[20px] border border-white/80 bg-white/60 p-4 backdrop-blur">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D98B2D] text-base text-white">✉</div>
                  <div>
                    <h3 class="text-base font-semibold text-brand-charcoal">记录持续更新</h3>
                    <p class="mt-1 text-sm leading-6 text-brand-text">这个网站会继续补充育儿、职场和成长相关记录。</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 rounded-[20px] border border-white/80 bg-white/60 p-4 backdrop-blur">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D98B2D] text-base text-white">◔</div>
                  <div>
                    <h3 class="text-base font-semibold text-brand-charcoal">内容持续整理</h3>
                    <p class="mt-1 text-sm leading-6 text-brand-text">一些专题内容会按个人记录节奏陆续补充完善。</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 rounded-[20px] border border-white/80 bg-white/60 p-4 backdrop-blur">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D98B2D] text-base text-white">☏</div>
                  <div>
                    <h3 class="text-base font-semibold text-brand-charcoal">直接留言交流</h3>
                    <p class="mt-1 text-sm leading-6 text-brand-text">可以通过微信或邮箱与我简单交流。</p>
                  </div>
                </div>
              </div>

              <div class="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <div class="rounded-[24px] border border-white/80 bg-white/72 p-5 shadow-[0_14px_34px_rgba(97,73,45,0.08)] backdrop-blur md:p-6">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="text-sm font-semibold tracking-[0.16em] text-[#C98A48]">方式 1</div>
                      <h3 class="mt-2 text-xl font-serif font-semibold text-brand-charcoal">邮箱展示</h3>
                      <p class="mt-2 max-w-xl text-sm leading-6 text-brand-text">
                        页面仅展示联系信息与说明，不作为经营性通知或营销入口使用。
                      </p>
                    </div>
                    <span class="hidden rounded-full border border-[#E9D5BF] bg-[#FFF7EF] px-4 py-2 text-sm font-semibold text-[#B7763B] md:inline-flex">
                      信息展示
                    </span>
                  </div>

                  <div class="mt-4 flex flex-col gap-3 md:flex-row">
                    <input
                      type="email"
                      placeholder="输入你的邮箱地址"
                      class="h-12 flex-1 rounded-[16px] border border-[#E9D5BF] bg-white px-4 text-sm text-brand-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-[#B8A99A] focus:border-[#D98B2D]"
                    />
                    <span class="inline-flex h-12 items-center justify-center rounded-[16px] bg-[#D96F34] px-7 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(217,111,52,0.24)]">
                      邮箱展示
                    </span>
                  </div>

                  <div class="mt-3 flex items-center gap-2 text-sm text-brand-muted">
                    <span class="text-[#C98A48]">⌁</span>
                    <span>我们尊重你的隐私，页面仅作信息展示使用。</span>
                  </div>
                </div>

                <div class="rounded-[24px] border border-[#E9D8C6] bg-[linear-gradient(135deg,rgba(228,134,67,0.96),rgba(210,120,53,0.92))] p-5 text-white shadow-[0_18px_38px_rgba(193,111,52,0.24)] md:p-6">
                  <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div class="text-sm font-semibold tracking-[0.16em] text-white/80">方式 2</div>
                      <h3 class="mt-2 text-xl font-serif font-semibold">扫码联系我</h3>
                      <p class="mt-2 text-sm leading-6 text-white/85">
                        如果你想交流育儿、职场或个人成长话题，可以直接联系我。
                      </p>
                      <div class="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                        <span>内容更新</span>
                        <span>育儿心得</span>
                        <span>职场感悟</span>
                      </div>
                    </div>
                    <div class="mx-auto rounded-[20px] bg-white p-3 text-center text-brand-charcoal shadow-[0_14px_30px_rgba(104,57,18,0.18)]">
                      <img :src="homePage.community.qr" alt="社区二维码" class="h-28 w-28 rounded-xl object-cover md:h-32 md:w-32" />
                      <div class="mt-2 text-xs font-medium md:text-sm">扫码联系我</div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white">
                      联系方式展示
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
