<script setup>
import { computed, ref } from 'vue'
import { products } from '@/data'
import bannerProducts from '@/assets/images/shucai/banners/banner-products.jpg'

const activeScene = ref('全部场景')

const sceneItems = [
  { label: '全部场景', match: null, icon: '◌', tone: 'text-brand-charcoal' },
  { label: '个人效率', match: ['个人管理', '效率工具', '习惯养成'], icon: '◔', tone: 'text-[#4E83E7]' },
  { label: '目标管理', match: ['个人管理'], icon: '◫', tone: 'text-[#4E83E7]' },
  { label: '学习成长', match: ['习惯养成', '成长记录'], icon: '⟳', tone: 'text-[#57A7A0]' },
  { label: '家庭陪伴', match: ['育儿陪伴', '成长记录'], icon: '⌂', tone: 'text-[#D58E57]' },
  { label: '亲子教育', match: ['亲子教育'], icon: '♡', tone: 'text-[#E08C87]' },
  { label: 'AI 创作', match: ['AI 提效', '创作工具'], icon: '✦', tone: 'text-[#7D78E8]' },
  { label: '灵感收集', match: ['AI 提效', '效率应用'], icon: '⬡', tone: 'text-[#7D78E8]' },
]

const productMeta = {
  'personal-assistant': {
    icon: '◫',
    iconWrap: 'bg-[linear-gradient(135deg,#EEF4FF_0%,#D9E9FF_100%)] text-[#3777E5]',
    panel: 'bg-[linear-gradient(180deg,#FFFFFF_0%,#FAFCFF_100%)]',
    button: 'bg-[linear-gradient(135deg,#3A82F6_0%,#2E68DA_100%)] hover:brightness-105',
    accent: 'text-[#3777E5]',
    border: 'border-[#DCE7F9]',
    imageWrap: 'bg-[linear-gradient(180deg,rgba(234,243,255,0.9)_0%,rgba(245,249,255,0.3)_100%)]',
    platforms: ['iOS', 'Android', 'Web'],
    chips: ['任务管理', '目标追踪', '习惯养成', '复盘系统'],
    description: '从计划到复盘，构建完整的个人效能闭环，让每一天都更有方向。',
    primaryLabel: '进入产品',
  },
  'parenting-assistant': {
    icon: '◉',
    iconWrap: 'bg-[linear-gradient(135deg,#E7FBF5_0%,#CCF4E9_100%)] text-[#26A78E]',
    panel: 'bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFEFD_100%)]',
    button: 'bg-[linear-gradient(135deg,#28B99E_0%,#1A8E79_100%)] hover:brightness-105',
    accent: 'text-[#26A78E]',
    border: 'border-[#DCEFEA]',
    imageWrap: 'bg-[linear-gradient(180deg,rgba(233,250,246,0.95)_0%,rgba(248,253,251,0.35)_100%)]',
    platforms: ['iOS', 'Android'],
    chips: ['成长记录', '日程提醒', '早教任务', '亲子时光'],
    description: '为家长提供贴心的育儿工具，记录、提醒、学习，一站式陪伴成长。',
    primaryLabel: '进入产品',
  },
  'ai-tools': {
    icon: 'AI',
    iconWrap: 'bg-[linear-gradient(135deg,#F0EDFF_0%,#DDD8FF_100%)] text-[#726AE8]',
    panel: 'bg-[linear-gradient(180deg,#FFFFFF_0%,#FCFBFF_100%)]',
    button: 'bg-[linear-gradient(135deg,#8A74FF_0%,#6550E8_100%)] hover:brightness-105',
    accent: 'text-[#726AE8]',
    border: 'border-[#E3DFF8]',
    imageWrap: 'bg-[linear-gradient(180deg,rgba(241,238,255,0.95)_0%,rgba(250,249,255,0.35)_100%)]',
    platforms: ['Web', 'Chrome 插件'],
    chips: ['提示词库', '工具集合', '工作流', '模板中心'],
    description: '收集、整理、复用你的 AI 工作流与提示词，释放 AI 的真正价值。',
    primaryLabel: '进入产品',
  },
}

const enhancedProducts = computed(() =>
  products.map((product) => ({
    ...product,
    ...productMeta[product.slug],
  }))
)

const filteredProducts = computed(() => {
  const scene = sceneItems.find((item) => item.label === activeScene.value)

  if (!scene?.match) {
    return enhancedProducts.value
  }

  return enhancedProducts.value.filter((product) =>
    scene.match.some((tag) => product.tags.includes(tag))
  )
})

const selectedScene = computed(() => sceneItems.find((item) => item.label === activeScene.value) || sceneItems[0])

const tryBenefits = [
  '优先体验最新功能',
  '专属用户社区',
  '直接反馈通道',
  '专题福利与活动',
]

const downloadProducts = enhancedProducts.value.map((product) => ({
  name: product.name,
  icon: product.icon,
  tone: product.accent,
}))

const heroHighlights = [
  { title: '隐私安全', desc: '本地优先，数据可控', icon: '⬡' },
  { title: '持续迭代', desc: '每周更新，快速进化', icon: '⚡' },
  { title: '用户共创', desc: '倾听反馈，共同成长', icon: '♡' },
]
</script>

<template>
  <div>
    <section class="overflow-hidden border-b border-brand-grey/40 bg-white">
      <div class="bg-[radial-gradient(circle_at_center_top,rgba(244,201,145,0.20),transparent_34%),radial-gradient(circle_at_right_center,rgba(247,213,167,0.30),transparent_24%),linear-gradient(180deg,#FFF9F1_0%,#FFFFFF_74%)]">
        <div class="container-content py-8 md:py-10">
          <div class="text-sm text-brand-muted">
            <router-link to="/" class="transition-colors hover:text-brand-charcoal">首页</router-link>
            <span class="mx-2">›</span>
            <span>产品中心</span>
          </div>

          <div class="relative mt-6 overflow-hidden rounded-[36px] px-1 pb-24 pt-1 md:pb-20 lg:pb-8">
            <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:gap-10">
              <div class="relative z-10">
              <div class="inline-flex items-center rounded-full border border-[#F2DAB9] bg-white/78 px-4 py-2 text-sm font-semibold text-[#C38742] shadow-[0_8px_20px_rgba(163,117,52,0.08)]">
                产品中心
              </div>

              <h1 class="mt-7 max-w-4xl font-serif text-5xl leading-[1.08] text-brand-charcoal md:text-6xl">
                更聪明的工具，更从容的生活
              </h1>

              <p class="mt-5 max-w-2xl text-lg leading-8 text-brand-text">
                我们专注于打造实用、好用、有温度的 AI 与效率工具，帮助你解决工作与生活中的真实问题。
              </p>

              <div class="mt-8 flex flex-wrap gap-6 border-t border-[#F2E7D8] pt-6">
                <div v-for="item in heroHighlights" :key="item.title" class="flex min-w-[150px] items-start gap-3">
                  <span class="mt-0.5 text-xl text-[#C58A43]">{{ item.icon }}</span>
                  <div>
                    <div class="text-base font-semibold text-brand-charcoal">{{ item.title }}</div>
                    <div class="mt-1 text-sm text-brand-muted">{{ item.desc }}</div>
                  </div>
                </div>
              </div>
              </div>

              <div class="relative hidden min-h-[300px] lg:block">
                <div class="absolute right-[4%] top-[4%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(248,216,166,0.60),rgba(248,216,166,0.14)_62%,transparent_74%)]"></div>
                <div class="absolute inset-x-[12%] bottom-[8%] h-12 rounded-full bg-[radial-gradient(circle,rgba(220,189,145,0.28),transparent_70%)] blur-2xl"></div>
                <img
                  :src="bannerProducts"
                  alt="产品中心展示图"
                  class="absolute right-0 top-0 z-10 w-full max-w-[720px] object-contain opacity-[0.94] drop-shadow-[0_24px_34px_rgba(137,107,62,0.12)]"
                />
              </div>
            </div>

            <div class="pointer-events-none absolute bottom-2 right-0 z-30 w-full max-w-[290px] overflow-hidden rounded-[26px] border border-[#F0DFCF] bg-white/92 p-5 shadow-[0_20px_36px_rgba(143,111,70,0.14)] md:pointer-events-auto">
                <div class="flex items-center gap-3">
                  <div class="text-xl font-semibold text-brand-charcoal">下载动态墙</div>
                  <span class="rounded-full bg-[#F58A33] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    New
                  </span>
                </div>
                <p class="mt-3 text-sm leading-7 text-brand-text">
                  实时查看大家正在下载的 App 与游戏，感知每一次支持与热度变化。
                </p>
                <div class="mt-4 flex items-center justify-between gap-4">
                  <router-link
                    to="/download-wall"
                    class="inline-flex items-center rounded-full border border-[#F0DCC7] bg-[#FFF8F1] px-4 py-2 text-sm font-semibold text-[#C98339] transition-colors hover:bg-white"
                  >
                    去看看
                    <span class="ml-2" aria-hidden="true">→</span>
                  </router-link>
                  <div class="flex items-end gap-2">
                    <span v-for="item in [18, 26, 14, 22, 28, 16]" :key="item" class="block w-2 rounded-full bg-[linear-gradient(180deg,#F7B26C_0%,#F7D7B0_100%)]" :style="{ height: `${item}px` }"></span>
                  </div>
                </div>
            </div>
          </div>

          <div class="mt-8 rounded-[24px] border border-[#E7EEF9] bg-white/88 p-3 shadow-[0_14px_32px_rgba(86,118,168,0.08)]">
            <div class="flex flex-wrap items-center gap-3">
              <div class="inline-flex h-11 items-center rounded-full bg-[#F5F8FE] px-5 text-sm font-semibold text-brand-charcoal">
                适用场景
              </div>
              <button
                v-for="scene in sceneItems"
                :key="scene.label"
                type="button"
                class="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all"
                :class="scene.label === activeScene
                  ? 'border-[#CFE0FF] bg-[#F4F8FF] text-brand-charcoal shadow-[0_6px_16px_rgba(75,122,194,0.08)]'
                  : 'border-transparent bg-white text-brand-muted hover:border-[#E1EAF7] hover:text-brand-charcoal'"
                @click="activeScene = scene.label"
              >
                <span :class="scene.tone">{{ scene.icon }}</span>
                <span>{{ scene.label }}</span>
              </button>
              <div class="ml-auto hidden text-sm font-semibold text-[#4E83E7] md:block">
                查看全部场景 →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell pt-8">
      <div class="container-content">
        <div class="grid gap-6 xl:grid-cols-3">
          <router-link
            v-for="product in filteredProducts"
            :key="product.slug"
            :to="`/products/${product.slug}`"
            class="group flex h-full flex-col overflow-hidden rounded-[28px] border bg-white p-6 shadow-[0_14px_34px_rgba(92,111,146,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(92,111,146,0.12)]"
            :class="[product.border, product.panel]"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] text-2xl font-bold shadow-[0_10px_20px_rgba(112,135,171,0.14)]" :class="product.iconWrap">
                {{ product.icon }}
              </div>
              <div class="min-w-0">
                <h2 class="text-[2rem] font-semibold leading-none text-brand-charcoal">{{ product.name }}</h2>
                <p class="mt-3 text-sm leading-7 text-brand-text">{{ product.shortDesc }}</p>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-4 text-sm text-brand-muted">
              <span v-for="platform in product.platforms" :key="platform" class="inline-flex items-center gap-2">
                <span class="text-[#A5B0C1]">◌</span>
                <span>{{ platform }}</span>
              </span>
            </div>

            <div class="mt-5 overflow-hidden rounded-[24px] border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" :class="product.imageWrap">
              <img
                :src="product.cover"
                :alt="product.name"
                class="aspect-[16/10] w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="chip in product.chips"
                :key="chip"
                class="rounded-full px-3 py-1.5 text-xs font-semibold"
                :class="[
                  product.slug === 'personal-assistant' && 'bg-[#EDF4FF] text-[#3F7EE8]',
                  product.slug === 'parenting-assistant' && 'bg-[#EBFAF5] text-[#1D9E87]',
                  product.slug === 'ai-tools' && 'bg-[#F1EEFF] text-[#716AE7]',
                ]"
              >
                {{ chip }}
              </span>
            </div>

            <p class="mt-5 text-sm leading-7 text-brand-text">
              {{ product.description }}
            </p>

            <div class="mt-auto flex items-center justify-between gap-4 pt-6">
              <span class="text-sm font-semibold transition-colors" :class="product.accent">
                了解更多 →
              </span>
              <span
                class="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(65,104,171,0.18)] transition-all"
                :class="product.button"
              >
                {{ product.primaryLabel }}
              </span>
            </div>
          </router-link>
        </div>

        <div class="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <section class="relative overflow-hidden rounded-[26px] border border-[#D9E5F8] bg-[#F3F7FF] p-6 shadow-[0_14px_30px_rgba(92,111,146,0.08)] md:p-7">
            <div class="absolute right-6 top-3 text-[9rem] leading-none text-[#CFE0FF]/55">↑</div>
            <div class="relative grid gap-5 md:grid-cols-[minmax(0,1fr)_170px] md:items-end">
              <div>
                <h2 class="text-[2rem] font-serif font-semibold text-brand-charcoal">抢先体验，参与产品共创</h2>
                <p class="mt-3 max-w-[520px] text-sm leading-7 text-brand-text">
                  我们正在不断打磨产品体验，邀请你成为早期用户，提供反馈建议，一起让产品变得更好。
                </p>
                <div class="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-sm text-brand-muted">
                  <span v-for="benefit in tryBenefits" :key="benefit" class="inline-flex items-center gap-2">
                    <span class="text-[#4E83E7]">◌</span>
                    <span>{{ benefit }}</span>
                  </span>
                </div>
                <div class="mt-6">
                  <router-link
                    to="/try"
                    class="inline-flex items-center rounded-full bg-[linear-gradient(135deg,#3A82F6_0%,#2E68DA_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(65,104,171,0.18)] transition-all hover:brightness-105"
                  >
                    立即加入早期体验
                    <span class="ml-2" aria-hidden="true">→</span>
                  </router-link>
                </div>
              </div>
              <div class="relative hidden h-full min-h-[150px] md:block">
                <div class="absolute bottom-0 right-4 text-[7rem] leading-none text-[#A7CCFF]/75">↑</div>
              </div>
            </div>
          </section>

          <section class="overflow-hidden rounded-[26px] border border-[#D9E5F8] bg-[#F7FAFF] p-6 shadow-[0_14px_30px_rgba(92,111,146,0.08)] md:p-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-[2rem] font-serif font-semibold text-brand-charcoal">下载动态墙</h2>
                <p class="mt-3 text-sm leading-7 text-brand-text">
                  实时汇聚每一次下载与支持，感谢你的信任与陪伴。
                </p>
              </div>
              <router-link to="/download-wall" class="hidden text-sm font-semibold text-[#4E83E7] md:block">
                进入查看 →
              </router-link>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <span
                v-for="item in downloadProducts"
                :key="item.name"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white text-sm font-semibold shadow-[0_8px_18px_rgba(92,111,146,0.08)]"
                :class="item.tone"
              >
                {{ item.icon }}
              </span>
              <span
                v-for="avatar in ['🙂', '🧠', '🎮', '👩', '🧒']"
                :key="avatar"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-[#F7FAFF] text-base shadow-[0_8px_18px_rgba(92,111,146,0.05)]"
              >
                {{ avatar }}
              </span>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-end">
              <div>
                <div class="text-sm text-brand-muted">已有</div>
                <div class="mt-1 text-4xl font-semibold leading-none text-[#4E83E7]">12,458</div>
                <div class="mt-1 text-sm text-brand-muted">次下载与体验</div>
              </div>
              <div class="flex h-20 items-end gap-1.5">
                <span v-for="height in [16, 22, 12, 30, 18, 42, 24, 48, 28, 56, 34, 46, 20, 40, 26, 52]" :key="height" class="block flex-1 rounded-full bg-[linear-gradient(180deg,#8BB8FF_0%,#DCE9FF_100%)]" :style="{ height: `${height}px` }"></span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
