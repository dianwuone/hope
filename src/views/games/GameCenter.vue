<script setup>
import { computed, ref } from 'vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const gamesPageData = computed(() => siteStore.pageData('games', { title: '游戏中心', subtitle: '', banner: '' }))
const activeCategory = ref('全部游戏')
const activeAge = ref('全部')

const games = computed(() =>
  siteStore.gamesData.map((game) => ({
    ...game,
    title: game.name,
    subtitle: game.summary || game.shortDesc || '后台已配置，等待更多游戏内容补充。',
    age: game.age || '全年龄',
    category: game.category || '精选推荐',
    to: game.route || `/games/${game.slug}`,
  })),
)

const categories = computed(() => ['全部游戏', ...new Set(games.value.map((item) => item.category).filter(Boolean))])
const ages = computed(() => ['全部', ...new Set(games.value.map((item) => item.age).filter(Boolean))])

const learningDirections = [
  { title: '语言表达', desc: '拼音 识字 阅读', icon: '♟', color: 'bg-[#E7FAF2] text-[#25A97F]' },
  { title: '逻辑思维', desc: '推理 观察 计算', icon: '✽', color: 'bg-[#EAF3FF] text-[#3F83F6]' },
  { title: '创造力', desc: '想象 设计 艺术', icon: '◆', color: 'bg-[#FFF0F0] text-[#EA6A76]' },
  { title: '专注力', desc: '记忆 反应 训练', icon: '▰', color: 'bg-[#EAFBF3] text-[#38A76A]' },
  { title: '团队协作', desc: '合作 沟通 竞争', icon: '◫', color: 'bg-[#F0EDFF] text-[#7568EE]' },
  { title: '生活技能', desc: '时间管理 财商培养', icon: '▣', color: 'bg-[#EBF5FF] text-[#4B91F7]' },
]

const relatedArticles = computed(() =>
  siteStore.articlesData
    .filter((article) =>
      article.category.includes('亲子')
      || article.tags.some((tag) => ['亲子游戏', '幼小衔接', '拼音启蒙'].includes(tag)),
    )
    .slice(0, 3),
)

const parentingProduct = computed(() => siteStore.productBySlug('parenting-assistant') || siteStore.productsData[0] || { name: '', cover: '' })
const heroGame = computed(() => games.value[0] || { cover: '', to: '/play', title: '', subtitle: '' })

const updates = computed(() => [
  ...games.value.slice(0, 1).map((item) => ({
    title: `${item.title} 已上线`,
    desc: item.subtitle,
    time: item.age,
    cover: item.cover,
  })),
  ...relatedArticles.value.slice(0, 2).map((item) => ({
    title: item.title,
    desc: item.summary,
    time: item.publishedAt,
    cover: item.cover,
  })),
])

const filteredGames = computed(() =>
  games.value.filter((game) => {
    const categoryMatched = activeCategory.value === '全部游戏' || game.category === activeCategory.value
    const ageMatched = activeAge.value === '全部' || game.age === activeAge.value
    return categoryMatched && ageMatched
  }),
)
</script>

<template>
  <div class="bg-[linear-gradient(180deg,#F5FAFF_0%,#FFFFFF_46%,#F8FBFF_100%)] text-[#17233D]">
    <section class="overflow-hidden border-b border-[#E3ECF8] bg-white">
      <div class="relative">
        <img
          :src="gamesPageData.banner"
          alt="游戏中心"
          class="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-center opacity-95"
        />
        <div class="absolute inset-0 bg-[linear-gradient(90deg,#F8FBFF_0%,rgba(248,251,255,0.97)_30%,rgba(248,251,255,0.74)_56%,rgba(248,251,255,0.18)_100%)]"></div>

        <div class="container-content relative z-10 grid min-h-[300px] gap-8 py-10 lg:grid-cols-[minmax(0,0.72fr)_320px] lg:items-center">
          <div>
            <h1 class="font-serif text-5xl font-semibold leading-tight text-[#17233D]">{{ gamesPageData.title || '游戏中心' }}</h1>
            <p class="mt-4 text-2xl font-semibold text-[#2379F6]">好玩 · 有用 · 帮助成长</p>
            <p class="mt-5 max-w-[420px] text-base leading-8 text-[#51627A]">
              {{ gamesPageData.subtitle || '我们相信，优秀的游戏不仅带来快乐，还能启发思考、培养能力、连接彼此。' }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link to="/play" class="inline-flex items-center rounded-[10px] bg-[#2379F6] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(35,121,246,0.22)] transition-colors hover:bg-[#1868DB]">
                在线轻试玩
                <span class="ml-2">▶</span>
              </router-link>
              <router-link to="/lab/games" class="inline-flex items-center rounded-[10px] border border-[#D7E4F5] bg-white/82 px-6 py-3 text-sm font-semibold text-[#35445F] transition-colors hover:bg-white">
                游戏实验室
              </router-link>
            </div>
          </div>

          <aside class="hidden rounded-[18px] border border-white/80 bg-white/82 p-6 shadow-[0_18px_42px_rgba(61,105,165,0.12)] backdrop-blur lg:block">
            <h2 class="text-xl font-semibold text-[#17233D]">今日游戏灵感</h2>
            <p class="mt-4 text-sm leading-7 text-[#51627A]">“在探索与挑战中，发现更好的自己。”</p>
            <div class="mt-6 grid grid-cols-3 gap-5 border-y border-[#E4ECF8] py-5 text-center">
              <div>
                <div class="text-2xl font-semibold text-[#2379F6]">{{ games.length }}</div>
                <div class="mt-1 text-xs text-[#7A89A2]">可见游戏</div>
              </div>
              <div>
                <div class="text-2xl font-semibold text-[#2379F6]">{{ relatedArticles.length }}</div>
                <div class="mt-1 text-xs text-[#7A89A2]">相关文章</div>
              </div>
              <div>
                <div class="text-2xl font-semibold text-[#2379F6]">{{ siteStore.labsData.length }}</div>
                <div class="mt-1 text-xs text-[#7A89A2]">实验项目</div>
              </div>
            </div>
            <router-link to="/articles" class="mt-5 inline-flex text-sm font-semibold text-[#2379F6]">
              了解我们的设计理念 →
            </router-link>
          </aside>
        </div>
      </div>
    </section>

    <section class="py-6">
      <div class="container-content">
        <div class="flex flex-col gap-4 border-b border-[#E5EDF8] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-3">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="h-10 rounded-full border px-5 text-sm font-semibold transition-all"
              :class="category === activeCategory ? 'border-[#2379F6] bg-[#2379F6] text-white shadow-[0_10px_20px_rgba(35,121,246,0.18)]' : 'border-[#DFE8F5] bg-white text-[#6E7D96] hover:text-[#2379F6]'"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-sm text-[#6E7D96]">
            <span class="font-semibold text-[#51627A]">年龄推荐：</span>
            <button
              v-for="age in ages"
              :key="age"
              type="button"
              class="rounded-full px-3 py-1.5 font-semibold transition-colors"
              :class="age === activeAge ? 'bg-[#EFF6FF] text-[#2379F6]' : 'hover:bg-white hover:text-[#2379F6]'"
              @click="activeAge = age"
            >
              {{ age }}
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <main class="min-w-0">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-semibold text-[#17233D]">精选游戏推荐</h2>
                <span class="rounded-full bg-[#F1F6FF] px-3 py-1 text-xs font-semibold text-[#7A89A2]">全部来自后台项目数据</span>
              </div>
              <router-link to="/play" class="hidden text-sm font-semibold text-[#2379F6] md:inline-flex">查看全部游戏 →</router-link>
            </div>

            <div class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <router-link
                v-for="game in filteredGames"
                :key="game.slug"
                :to="game.to"
                class="group overflow-hidden rounded-[16px] border border-[#DFE8F5] bg-white shadow-[0_12px_28px_rgba(57,94,150,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(57,94,150,0.13)]"
              >
                <img :src="game.cover" :alt="game.title" class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div class="p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h3 class="text-lg font-semibold text-[#17233D]">{{ game.title }}</h3>
                      <p class="mt-1 line-clamp-2 text-sm leading-6 text-[#51627A]">{{ game.subtitle }}</p>
                    </div>
                    <span class="shrink-0 rounded-full bg-[#FFF4E7] px-2.5 py-1 text-xs font-semibold text-[#F08A2F]">{{ game.age }}</span>
                  </div>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span v-for="tag in game.tags?.slice(0, 3)" :key="tag" class="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#4D91F7]">{{ tag }}</span>
                  </div>
                  <div class="mt-4 flex justify-end">
                    <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#DFE8F5] text-[#2379F6] transition-colors group-hover:border-[#2379F6] group-hover:bg-[#2379F6] group-hover:text-white">→</span>
                  </div>
                </div>
              </router-link>
              <div v-if="!filteredGames.length" class="rounded-[16px] border border-dashed border-[#DFE8F5] bg-white p-6 text-sm text-[#7384A0]">
                后台暂未配置符合筛选条件的游戏。
              </div>
            </div>

            <section class="mt-6 rounded-[16px] border border-[#DFE8F5] bg-white p-5 shadow-[0_10px_24px_rgba(57,94,150,0.06)]">
              <h2 class="text-xl font-semibold text-[#17233D]">按学习方向探索</h2>
              <p class="mt-1 text-sm text-[#7A89A2]">不同主题的游戏帮助不同能力成长</p>
              <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <div v-for="item in learningDirections" :key="item.title" class="flex items-center gap-3">
                  <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg" :class="item.color">{{ item.icon }}</span>
                  <div>
                    <h3 class="text-sm font-semibold text-[#17233D]">{{ item.title }}</h3>
                    <p class="mt-1 text-xs text-[#7A89A2]">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="mt-7">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-semibold text-[#17233D]">游戏相关文章</h2>
                <router-link to="/articles" class="text-sm font-semibold text-[#2379F6]">查看更多文章 →</router-link>
              </div>
              <div class="mt-5 grid gap-4 md:grid-cols-3">
                <router-link
                  v-for="article in relatedArticles"
                  :key="article.slug"
                  :to="`/articles/${article.slug}`"
                  class="grid grid-cols-[88px_1fr] gap-4 rounded-[14px] border border-[#DFE8F5] bg-white p-4 shadow-[0_8px_20px_rgba(57,94,150,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(57,94,150,0.1)]"
                >
                  <img :src="article.cover" :alt="article.title" class="h-20 w-20 rounded-[10px] object-cover" />
                  <div class="min-w-0">
                    <h3 class="line-clamp-2 text-sm font-semibold leading-6 text-[#17233D]">{{ article.title }}</h3>
                    <p class="mt-2 text-xs text-[#7A89A2]">{{ article.publishedAt }} · {{ article.readingTime }}</p>
                  </div>
                </router-link>
              </div>
            </section>
          </main>

          <aside class="space-y-5">
            <section class="overflow-hidden rounded-[16px] border border-[#DCE7F8] bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF6FF_100%)] p-5 shadow-[0_12px_28px_rgba(57,94,150,0.08)]">
              <div class="grid grid-cols-[1fr_118px] items-center gap-4">
                <div>
                  <h2 class="text-xl font-semibold text-[#17233D]">推荐搭配使用</h2>
                  <h3 class="mt-2 text-2xl font-semibold text-[#2379F6]">{{ parentingProduct.name }}</h3>
                  <p class="mt-2 text-sm leading-6 text-[#51627A]">记录成长，设置目标，让游戏与成长更有意义</p>
                  <router-link to="/products/parenting-assistant" class="mt-4 inline-flex rounded-[8px] bg-[#2379F6] px-4 py-2.5 text-sm font-semibold text-white">了解更多 →</router-link>
                </div>
                <img :src="parentingProduct.cover" :alt="parentingProduct.name" class="w-full rotate-6 rounded-[18px] object-cover shadow-[0_14px_26px_rgba(57,94,150,0.16)]" />
              </div>
            </section>

            <section class="overflow-hidden rounded-[16px] border border-[#DCE7F8] bg-[linear-gradient(135deg,#2385F8_0%,#62C7F3_100%)] p-5 text-white shadow-[0_14px_30px_rgba(35,121,246,0.18)]">
              <div class="grid grid-cols-[1fr_116px] items-center gap-4">
                <div>
                  <h2 class="text-xl font-semibold">在线轻试玩</h2>
                  <p class="mt-2 text-sm leading-6 text-white/88">无需下载，立即体验当前已公开的小游戏入口。</p>
                  <router-link :to="heroGame.to || '/play'" class="mt-5 inline-flex rounded-[8px] bg-white px-4 py-2.5 text-sm font-semibold text-[#2379F6]">立即开始 →</router-link>
                </div>
                <img :src="heroGame.cover" :alt="heroGame.title || '在线轻试玩'" class="w-full rounded-[18px] object-cover shadow-[0_14px_26px_rgba(20,68,130,0.2)]" />
              </div>
            </section>

            <section class="rounded-[16px] border border-[#DFE8F5] bg-white p-5 shadow-[0_10px_24px_rgba(57,94,150,0.06)]">
              <h2 class="text-xl font-semibold text-[#17233D]">最新动态</h2>
              <div class="mt-5 space-y-4">
                <div v-for="item in updates" :key="item.title" class="grid grid-cols-[48px_1fr_auto] items-center gap-3">
                  <img :src="item.cover" :alt="item.title" class="h-12 w-12 rounded-[10px] object-cover" />
                  <div class="min-w-0">
                    <h3 class="truncate text-sm font-semibold text-[#17233D]">{{ item.title }}</h3>
                    <p class="mt-1 truncate text-xs text-[#7A89A2]">{{ item.desc }}</p>
                  </div>
                  <span class="text-xs text-[#7A89A2]">{{ item.time }}</span>
                </div>
              </div>
              <router-link to="/download-wall" class="mt-5 inline-flex text-sm font-semibold text-[#2379F6]">查看全部动态 →</router-link>
            </section>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
