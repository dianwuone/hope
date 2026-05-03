<script setup>
import { computed, ref } from 'vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { products } from '@/data'
import { useWishlistStore } from '@/stores/wishlist'

const store = useWishlistStore()

const stateMeta = {
  want_try: { label: '想体验', tone: 'bg-[#EAF3FF] text-[#4A86F0]' },
  want_download: { label: '想下载', tone: 'bg-[#EAFBF7] text-[#2CA98B]' },
  want_beta: { label: '想内测', tone: 'bg-[#F1EEFF] text-[#7B6DEF]' },
  want_buy: { label: '想购买', tone: 'bg-[#FFF2E2] text-[#EA8F32]' },
  realized: { label: '已实现', tone: 'bg-[#EEF7FF] text-[#4A84F0]' },
}

const sourceMeta = {
  product: { label: '应用工具', tone: 'bg-[#F4F7FC] text-[#7384A0]' },
  game: { label: '游戏娱乐', tone: 'bg-[#F4F7FC] text-[#7384A0]' },
  lab: { label: '实验项目', tone: 'bg-[#F4F7FC] text-[#7384A0]' },
}

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '心愿单' },
]

const activeTab = ref('all')
const activeSource = ref('all')

const inferSource = (item) => {
  if (item.slug === 'pinyin-adventure' || item.name?.includes('拼音')) return 'game'
  if (item.slug?.includes('lab')) return 'lab'
  return 'product'
}

const enhancedItems = computed(() =>
  store.items.map((item) => {
    const source = inferSource(item)
    const state = stateMeta[item.wishState] || stateMeta.want_try
    return {
      ...item,
      source,
      sourceLabel: sourceMeta[source].label,
      sourceTone: sourceMeta[source].tone,
      stateLabel: state.label,
      stateTone: state.tone,
      addedLabel: item.addedAt ? item.addedAt.slice(0, 10) : '2024-05-20',
    }
  })
)

const tabs = computed(() => [
  { key: 'all', label: '全部', count: enhancedItems.value.length, icon: '◌' },
  { key: 'want_try', label: '想体验', count: enhancedItems.value.filter((item) => item.wishState === 'want_try').length, icon: '✦' },
  { key: 'want_download', label: '想下载', count: enhancedItems.value.filter((item) => item.wishState === 'want_download').length, icon: '↓' },
  { key: 'want_beta', label: '想内测', count: enhancedItems.value.filter((item) => item.wishState === 'want_beta').length, icon: '♡' },
  { key: 'want_buy', label: '想购买', count: enhancedItems.value.filter((item) => item.wishState === 'want_buy').length, icon: '▣' },
  { key: 'realized', label: '已实现', count: enhancedItems.value.filter((item) => item.wishState === 'realized').length, icon: '✓' },
])

const sourceFilters = computed(() => [
  { key: 'all', label: '全部类型', count: enhancedItems.value.length, icon: '◫' },
  { key: 'product', label: '应用工具', count: enhancedItems.value.filter((item) => item.source === 'product').length, icon: '▣' },
  { key: 'game', label: '游戏娱乐', count: enhancedItems.value.filter((item) => item.source === 'game').length, icon: '✦' },
  { key: 'lab', label: '实验项目', count: enhancedItems.value.filter((item) => item.source === 'lab').length, icon: '△' },
])

const sourceStats = computed(() => [
  { label: '已收藏', count: enhancedItems.value.length },
  { label: '想体验', count: enhancedItems.value.filter((item) => item.wishState === 'want_try').length },
  { label: '已实现', count: enhancedItems.value.filter((item) => item.wishState === 'realized').length },
])

const filteredItems = computed(() =>
  enhancedItems.value.filter((item) => {
    const matchTab = activeTab.value === 'all' || item.wishState === activeTab.value
    const matchSource = activeSource.value === 'all' || item.source === activeSource.value
    return matchTab && matchSource
  })
)

const suggestions = computed(() => [
  {
    title: '育儿助手',
    desc: '科学育儿，轻松陪伴成长',
    to: '/products/parenting-assistant',
    image: products.find((item) => item.slug === 'parenting-assistant')?.cover,
  },
  {
    title: '灵感实验场',
    desc: '新玩法、新灵感、新灵感',
    to: '/lab',
    image: products.find((item) => item.slug === 'ai-tools')?.cover,
  },
  {
    title: '在线轻试玩',
    desc: '随时开玩，轻松体验',
    to: '/play',
    image: products.find((item) => item.slug === 'personal-assistant')?.cover,
  },
])

const iconMap = {
  personal: '✓',
  game: '✦',
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(198,223,255,0.28),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <section class="relative overflow-hidden border-b border-[#E6EEF9] bg-[radial-gradient(circle_at_70%_18%,rgba(207,231,255,0.3),transparent_18%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_300px] xl:items-start">
          <div class="pt-6">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#66A4FF_0%,#2F7AF3_100%)] text-3xl text-white shadow-[0_18px_34px_rgba(47,122,243,0.24)]">
                ❤
              </div>
              <h1 class="font-serif text-5xl font-semibold text-[#17233D]">心愿单</h1>
            </div>
            <p class="mt-6 text-2xl leading-10 text-[#5A6E8C]">
              收藏你喜欢的应用、游戏与项目<br />未来的灵感清单，从这里开始
            </p>
          </div>

          <div class="relative min-h-[220px] overflow-hidden rounded-[32px] border border-white/85 bg-[radial-gradient(circle_at_center,rgba(230,243,255,0.95)_0%,rgba(244,249,255,0.82)_52%,rgba(247,251,255,0.44)_100%),linear-gradient(180deg,#F8FBFF_0%,#EEF5FF_100%)] shadow-[0_22px_48px_rgba(76,108,168,0.08)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.88),transparent_24%)]"></div>
            <div class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-[linear-gradient(135deg,#7EAFFF_0%,#2F7AF3_100%)] shadow-[0_26px_50px_rgba(47,122,243,0.24)]"></div>
            <div class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[58%] -translate-y-[54%] rounded-[28px] border border-white/70 bg-white/36 backdrop-blur"></div>
            <div class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[42%] -translate-y-[46%] rounded-[28px] border border-white/70 bg-white/28 backdrop-blur"></div>
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white">❤</div>
            <div class="absolute left-[22%] top-[34%] flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/80 text-[#5A98F6] shadow-[0_14px_30px_rgba(76,108,168,0.08)]">☁</div>
            <div class="absolute right-[24%] top-[28%] flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/80 text-[#F7BF47] shadow-[0_14px_30px_rgba(76,108,168,0.08)]">★</div>
            <div class="absolute right-[18%] top-[42%] flex h-10 w-10 items-center justify-center rounded-full bg-white/78 text-[#71B3FF] shadow-[0_10px_22px_rgba(76,108,168,0.08)]">♡</div>
          </div>

          <aside class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-3xl font-semibold text-[#17233D]">Hi, Quentin👋</div>
            <p class="mt-3 text-lg text-[#7384A0]">你的心愿正在慢慢实现</p>
            <div class="mt-6 grid grid-cols-3 gap-4 border-t border-[#EEF3FA] pt-6">
              <div v-for="item in sourceStats" :key="item.label" class="text-center">
                <div class="text-sm font-semibold text-[#8EA0BA]">{{ item.label }}</div>
                <div class="mt-3 text-5xl font-semibold text-[#2F7AF3]">{{ item.count }}</div>
                <div class="mt-2 text-sm text-[#8EA0BA]">个项目</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="container-content grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
        <aside class="space-y-5">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="space-y-2">
              <button
                v-for="item in tabs"
                :key="item.key"
                type="button"
                class="flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-sm font-semibold transition-all"
                :class="activeTab === item.key ? 'bg-[#EEF4FF] text-[#2F7AF3]' : 'text-[#5A6E8C] hover:bg-[#F7FAFF]'"
                @click="activeTab = item.key"
              >
                <span class="flex items-center gap-3">
                  <span>{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                </span>
                <span class="rounded-full bg-white/86 px-2.5 py-0.5 text-xs text-[#7F91AC]">{{ item.count }}</span>
              </button>
            </div>

            <div class="mt-6 border-t border-[#EEF3FA] pt-5">
              <div class="text-sm font-semibold text-[#8EA0BA]">类型筛选</div>
              <div class="mt-3 space-y-2">
                <button
                  v-for="item in sourceFilters"
                  :key="item.key"
                  type="button"
                  class="flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-sm font-semibold transition-all"
                  :class="activeSource === item.key ? 'bg-[#EEF4FF] text-[#2F7AF3]' : 'text-[#5A6E8C] hover:bg-[#F7FAFF]'"
                  @click="activeSource = item.key"
                >
                  <span class="flex items-center gap-3">
                    <span>{{ item.icon }}</span>
                    <span>{{ item.label }}</span>
                  </span>
                  <span class="rounded-full bg-white/86 px-2.5 py-0.5 text-xs text-[#7F91AC]">{{ item.count }}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main class="min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-3">
              <button
                v-for="item in [
                  { key: 'all', label: '全部' },
                  { key: 'product', label: '应用' },
                  { key: 'game', label: '游戏' },
                  { key: 'lab', label: '实验项目' },
                ]"
                :key="item.key"
                type="button"
                class="rounded-full px-5 py-3 text-sm font-semibold transition-all"
                :class="activeSource === item.key || (item.key === 'all' && activeSource === 'all')
                  ? 'bg-[#2F7AF3] text-white shadow-[0_12px_22px_rgba(47,122,243,0.18)]'
                  : 'bg-white text-[#5A6E8C] shadow-[0_8px_18px_rgba(76,108,168,0.04)] hover:text-[#2F7AF3]'"
                @click="activeSource = item.key"
              >
                {{ item.label }}
              </button>
            </div>

            <div class="flex items-center gap-3">
              <button class="rounded-[12px] border border-[#E4ECF8] bg-white px-4 py-3 text-sm font-semibold text-[#7384A0]">最新收藏 ▾</button>
              <button class="rounded-[12px] border border-[#E4ECF8] bg-white px-4 py-3 text-sm font-semibold text-[#7384A0]">全部状态 ▾</button>
            </div>
          </div>

          <div v-if="filteredItems.length" class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="item in filteredItems"
              :key="item.slug"
              class="overflow-hidden rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
            >
              <div class="flex items-start justify-between gap-3">
                <img :src="item.cover" :alt="item.name" class="h-24 w-24 rounded-[24px] object-cover shadow-[0_14px_28px_rgba(76,108,168,0.08)]" />
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="item.stateTone">{{ item.stateLabel }}</span>
              </div>

              <h3 class="mt-5 text-2xl font-semibold text-[#17233D]">{{ item.name }}</h3>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">{{ item.shortDesc || item.summary }}</p>

              <div class="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold" :class="item.sourceTone">
                {{ item.sourceLabel }}
              </div>

              <div class="mt-6 flex items-center justify-between text-sm text-[#8A9BB3]">
                <span>收藏于 {{ item.addedLabel }}</span>
                <button type="button" class="text-xl text-[#FF5C73]">♥</button>
              </div>
            </article>
          </div>

          <div v-else class="mt-6 rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-10 text-center shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-3xl font-semibold text-[#17233D]">还没有找到符合条件的心愿</div>
            <p class="mt-4 text-base text-[#7384A0]">去产品中心、游戏中心或实验室继续探索吧。</p>
            <div class="mt-6 flex justify-center gap-4">
              <router-link to="/products" class="rounded-[12px] bg-[#2F7AF3] px-5 py-3 text-sm font-semibold text-white">去产品中心</router-link>
              <router-link to="/games" class="rounded-[12px] border border-[#DCE7F8] bg-white px-5 py-3 text-sm font-semibold text-[#38537A]">去游戏中心</router-link>
            </div>
          </div>
        </main>

        <aside class="space-y-5">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">心愿单小贴士</div>
            <div class="mt-5 space-y-4 text-sm leading-7 text-[#61718B]">
              <p>• 在产品、游戏或实验页点击 ❤ 即可加入心愿单</p>
              <p>• 支持多种状态标记，帮助你管理兴趣优先级</p>
              <p>• 我们会根据你的心愿推荐相关内容与更新</p>
            </div>
            <router-link to="/wishlist/submit" class="mt-6 inline-flex rounded-[14px] border border-[#DCE7F8] bg-white px-5 py-3 text-sm font-semibold text-[#2F7AF3]">
              了解更多心愿单功能
            </router-link>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="flex items-center justify-between gap-3">
              <div class="text-2xl font-semibold text-[#17233D]">猜你喜欢</div>
              <button type="button" class="text-sm font-semibold text-[#2F7AF3]">换一换</button>
            </div>
            <div class="mt-5 space-y-4">
              <router-link
                v-for="item in suggestions"
                :key="item.title"
                :to="item.to"
                class="flex items-center gap-4 rounded-[18px] border border-[#EEF3FA] bg-white/82 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(76,108,168,0.08)]"
              >
                <img :src="item.image" :alt="item.title" class="h-16 w-16 rounded-[18px] object-cover shadow-[0_10px_20px_rgba(76,108,168,0.08)]" />
                <div>
                  <div class="text-lg font-semibold text-[#17233D]">{{ item.title }}</div>
                  <div class="mt-1 text-sm text-[#7384A0]">{{ item.desc }}</div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="pb-16 pt-4">
      <div class="container-content">
        <div class="overflow-hidden rounded-[28px] bg-[linear-gradient(90deg,#C8F4FF_0%,#EAF8FF_36%,#F7FBFF_100%)] px-6 py-7 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:px-8">
          <div class="grid gap-6 lg:grid-cols-[1.2fr_2fr_auto] lg:items-center">
            <div>
              <h2 class="text-4xl font-semibold text-[#17233D]">找不到想要的？</h2>
              <p class="mt-3 text-base text-[#61718B]">告诉我们你期待的应用或游戏</p>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <div class="rounded-[20px] bg-white/82 px-5 py-4 shadow-[0_12px_26px_rgba(76,108,168,0.06)]">
                <div class="text-lg font-semibold text-[#17233D]">提交心愿</div>
                <div class="mt-2 text-sm text-[#7384A0]">告诉我们你的想法</div>
              </div>
              <div class="rounded-[20px] bg-white/82 px-5 py-4 shadow-[0_12px_26px_rgba(76,108,168,0.06)]">
                <div class="text-lg font-semibold text-[#17233D]">加入社区</div>
                <div class="mt-2 text-sm text-[#7384A0]">参与讨论与投票</div>
              </div>
              <div class="rounded-[20px] bg-white/82 px-5 py-4 shadow-[0_12px_26px_rgba(76,108,168,0.06)]">
                <div class="text-lg font-semibold text-[#17233D]">优先体验</div>
                <div class="mt-2 text-sm text-[#7384A0]">优先获取内测资格</div>
              </div>
            </div>

            <router-link to="/wishlist/submit" class="inline-flex items-center rounded-full bg-[#FF8A47] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(255,138,71,0.22)] transition-colors hover:bg-[#F57A34]">
              提交我的心愿 →
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
