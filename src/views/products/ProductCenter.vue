<script setup>
import { computed, ref } from 'vue'
import bannerProducts from '@/assets/images/shucai/banners/banner-products.jpg'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
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
  siteStore.productsData.map((product) => ({
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

const tryBenefits = [
  '优先体验最新功能',
  '线索收集承接',
  '直接反馈通道',
  '前置销售验证',
]

const downloadProducts = computed(() =>
  enhancedProducts.value.map((product) => ({
    name: product.name,
    icon: product.icon,
    tone: product.accent,
  })),
)

</script>

<template>
  <div class="bg-[linear-gradient(180deg,#F6FAFF_0%,#FFFFFF_48%,#F8FBFF_100%)]">
    <section class="overflow-hidden border-b border-[#E4ECF8] bg-[linear-gradient(180deg,#F5FAFF_0%,#FFFFFF_100%)]">
      <div class="container-content py-5 md:py-7">
        <div class="text-xs font-medium text-[#6E7D96]">
          <router-link to="/" class="transition-colors hover:text-[#2379F6]">首页</router-link>
          <span class="mx-2">›</span>
          <span>产品中心</span>
        </div>

        <div class="relative mt-5 min-h-[178px] overflow-hidden rounded-[18px]">
          <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,250,255,0.98)_0%,rgba(246,250,255,0.94)_39%,rgba(246,250,255,0.58)_63%,rgba(246,250,255,0.12)_100%)]"></div>
          <img
            :src="bannerProducts"
            alt="产品中心展示图"
            class="absolute right-[-18px] top-[-42px] h-[268px] w-[680px] max-w-none object-contain opacity-95 md:right-[-6px] lg:right-0"
          />

          <div class="relative z-10 max-w-[560px] px-1 py-4 md:px-0 md:py-6">
            <div class="flex flex-wrap items-center gap-4">
              <h1 class="font-serif text-4xl font-semibold leading-tight text-[#17233D] md:text-5xl">
                产品中心
              </h1>
              <span class="inline-flex items-center rounded-full border border-[#BFD9FF] bg-[#F1F7FF] px-3 py-1 text-sm font-semibold text-[#2379F6]">
                3 款核心产品
              </span>
            </div>
            <p class="mt-4 max-w-[520px] text-base leading-7 text-[#51627A]">
              打造简单、好用、持续进化的工具与游戏，帮助你更高效地工作、更好地成长，更从容地陪伴家人。
            </p>
          </div>
        </div>

        <div class="mt-5 rounded-[16px] border border-[#E2EBF8] bg-white/92 p-3 shadow-[0_12px_28px_rgba(57,94,150,0.07)]">
          <div class="flex flex-wrap items-center gap-3">
            <div class="inline-flex h-10 items-center rounded-full bg-[#F6F9FE] px-5 text-sm font-semibold text-[#17233D]">
              适用场景
            </div>
            <button
              v-for="scene in sceneItems.slice(1)"
              :key="scene.label"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all"
              :class="scene.label === activeScene
                ? 'border-[#BFD9FF] bg-[#F0F6FF] text-[#2379F6] shadow-[0_6px_14px_rgba(35,121,246,0.08)]'
                : 'border-transparent bg-white text-[#6E7D96] hover:border-[#DFE9F7] hover:text-[#17233D]'"
              @click="activeScene = scene.label"
            >
              <span :class="scene.tone">{{ scene.icon }}</span>
              <span>{{ scene.label }}</span>
            </button>
            <button
              type="button"
              class="ml-auto hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-[#2379F6] transition-colors hover:bg-[#F2F7FF] lg:inline-flex"
              @click="activeScene = '全部场景'"
            >
              查看全部场景 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-10 pt-5">
      <div class="container-content">
        <div class="grid gap-5 lg:grid-cols-3">
          <router-link
            v-for="product in filteredProducts"
            :key="product.slug"
            :to="`/products/${product.slug}`"
            class="group flex h-full flex-col overflow-hidden rounded-[16px] border bg-white p-5 shadow-[0_12px_28px_rgba(57,94,150,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(57,94,150,0.13)]"
            :class="[product.border, product.panel]"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] text-2xl font-bold shadow-[0_10px_20px_rgba(112,135,171,0.14)]" :class="product.iconWrap">
                {{ product.icon }}
              </div>
              <div class="min-w-0">
                <h2 class="text-2xl font-semibold leading-tight text-[#17233D]">{{ product.name }}</h2>
                <p class="mt-2 text-sm leading-6 text-[#51627A]">{{ product.shortDesc }}</p>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-4 text-sm text-[#7A89A2]">
              <span v-for="platform in product.platforms" :key="platform" class="inline-flex items-center gap-2">
                <span class="text-[#A5B0C1]">◌</span>
                <span>{{ platform }}</span>
              </span>
            </div>

            <div class="mt-4 overflow-hidden rounded-[12px] border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" :class="product.imageWrap">
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

            <p class="mt-4 text-sm leading-7 text-[#51627A]">
              {{ product.description }}
            </p>

            <div class="mt-auto flex items-center justify-between gap-4 pt-6">
              <span class="text-sm font-semibold transition-colors" :class="product.accent">
                了解更多 →
              </span>
              <span
                class="inline-flex items-center rounded-[8px] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(65,104,171,0.18)] transition-all"
                :class="product.button"
              >
                {{ product.primaryLabel }}
              </span>
            </div>
          </router-link>
        </div>

        <div class="mt-5 grid gap-5 md:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
          <section class="relative overflow-hidden rounded-[16px] border border-[#DCE7F8] bg-[linear-gradient(135deg,#F7FAFF_0%,#EEF5FF_46%,#F6FAFF_100%)] p-6 shadow-[0_12px_28px_rgba(57,94,150,0.08)]">
            <div class="absolute inset-y-0 right-0 w-[36%] bg-[radial-gradient(circle_at_70%_38%,rgba(102,164,255,0.18),transparent_38%),radial-gradient(circle_at_50%_84%,rgba(255,255,255,0.96),rgba(255,255,255,0.18)_46%,transparent_72%)]"></div>
            <div class="absolute bottom-[-24px] right-[12%] h-[132px] w-[132px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_46%,transparent_72%)] blur-sm"></div>
            <div class="absolute bottom-[22px] right-[8%] hidden h-14 w-[180px] rounded-full bg-[radial-gradient(circle,rgba(153,188,243,0.36),rgba(153,188,243,0.12)_52%,transparent_76%)] blur-xl md:block"></div>

            <div class="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_188px] md:items-center">
              <div>
                <h2 class="font-serif text-2xl font-semibold leading-tight text-[#17233D] md:text-3xl">抢先体验，了解这些 App 与产品方向</h2>
                <p class="mt-2 max-w-[520px] text-sm leading-7 text-[#51627A]">
                  这里会继续承接我正在打磨的 App 展示、体验申请、线索收集与前置销售，方便你按兴趣进一步了解。
                </p>
                <div class="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-sm text-[#6E7D96]">
                  <span v-for="benefit in tryBenefits" :key="benefit" class="inline-flex items-center gap-2">
                    <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F1FF] text-[11px] font-semibold text-[#4E83E7]">✦</span>
                    <span>{{ benefit }}</span>
                  </span>
                </div>
                <div class="mt-6">
                  <router-link
                    to="/try"
                    class="inline-flex items-center rounded-[8px] bg-[linear-gradient(135deg,#2F7AF3_0%,#215FD8_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(65,104,171,0.18)] transition-all hover:brightness-105"
                  >
                    立即加入早期体验
                    <span class="ml-2" aria-hidden="true">→</span>
                  </router-link>
                </div>
              </div>

              <div class="relative hidden h-[170px] md:block">
                <div class="absolute right-[34px] top-[8px] text-[6.2rem] leading-none text-[#2F7AF3] drop-shadow-[0_14px_20px_rgba(47,122,243,0.18)]">
                  🚀
                </div>
                <div class="absolute bottom-[10px] right-[58px] h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(255,255,255,0.22)_52%,transparent_76%)] blur-[1px]"></div>
                <div class="absolute bottom-[0] right-[24px] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.2)_48%,transparent_74%)] blur-[1px]"></div>
              </div>
            </div>
          </section>

          <section class="overflow-hidden rounded-[16px] border border-[#DCE7F8] bg-[linear-gradient(135deg,#FBFDFF_0%,#F3F8FF_100%)] p-6 shadow-[0_12px_28px_rgba(57,94,150,0.08)]">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="font-serif text-2xl font-semibold leading-tight text-[#17233D] md:text-3xl">下载动态墙</h2>
                <p class="mt-2 text-sm leading-7 text-[#51627A]">
                  实时汇聚每一次下载与支持，感谢你的信任与陪伴。
                </p>
              </div>
              <router-link to="/download-wall" class="hidden text-sm font-semibold text-[#4E83E7] md:block">
                进入查看 →
              </router-link>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-2.5">
              <span
                v-for="item in downloadProducts"
                :key="item.name"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5EDFA] bg-white text-sm font-semibold shadow-[0_8px_18px_rgba(92,111,146,0.08)]"
                :class="item.tone"
              >
                {{ item.icon }}
              </span>
              <span
                v-for="avatar in ['🙂', '🧠', '🎮', '👩', '🧒']"
                :key="avatar"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5EDFA] bg-[#F7FAFF] text-base shadow-[0_8px_18px_rgba(92,111,146,0.05)]"
              >
                {{ avatar }}
              </span>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-end">
              <div class="whitespace-nowrap">
                <div class="text-sm text-brand-muted">已有 <span class="text-4xl font-semibold leading-none text-[#4E83E7]">12,458</span> 次下载与体验</div>
              </div>
              <div class="flex h-20 items-end gap-[5px]">
                <span v-for="height in [14, 18, 24, 12, 28, 34, 20, 42, 16, 30, 48, 26, 38, 22, 54, 18, 32, 44, 24, 36, 20, 46, 28, 40]" :key="height" class="block w-[4px] rounded-full bg-[linear-gradient(180deg,#6CA7FF_0%,#D6E7FF_100%)]" :style="{ height: `${height}px` }"></span>
              </div>
            </div>
          </section>
        </div>

        <div class="mt-4 rounded-[12px] border border-[#E2EBF8] bg-white/92 px-5 py-4 shadow-[0_10px_24px_rgba(57,94,150,0.06)]">
          <div class="flex flex-col gap-3 text-sm text-[#51627A] md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-3">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#EFF6FF] text-[#2379F6]">▣</span>
              <span class="font-semibold text-[#17233D]">想了解更多使用技巧与产品故事？</span>
              <span class="hidden md:inline">访问文章中心，阅读使用教程、产品更新与真实案例。</span>
            </div>
            <router-link to="/articles" class="font-semibold text-[#2379F6]">
              前往文章中心 →
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
