<script setup>
import { computed } from 'vue'
import PageHero from '@/components/site/PageHero.vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const downloadsPageData = computed(() => siteStore.pageData('downloads', { requirements: [] }))

const deliverables = computed(() =>
  siteStore.offersData.map((item) => ({
    ...item,
    to: `/try/${item.slug}`,
    tone: item.statusTone === 'green'
      ? 'bg-[#EAF8F2] text-[#2EA46F]'
      : item.statusTone === 'amber'
        ? 'bg-[#FFF3E1] text-[#EA982A]'
        : item.statusTone === 'purple'
          ? 'bg-[#F1EEFF] text-[#7B6DEF]'
          : 'bg-[#EEF4FF] text-[#2F7AF3]',
  })),
)

const releaseItems = computed(() =>
  [...siteStore.productsData, ...siteStore.gamesData].map((item) => ({
    product: item.name,
    version: item.stage || item.status || '持续迭代',
    channel: item.projectType === 'game' ? 'game' : item.supportStatus || 'preview',
    notes: item.summary || item.shortDesc || '后台已配置，等待更多交付信息补充。',
    size: item.price ? `体验价 ${item.price}` : '持续更新',
    to: item.projectType === 'game' ? (item.route || `/games/${item.slug}`) : `/products/${item.slug}`,
  })),
)

const resources = computed(() => [
  {
    name: '可交付内容',
    desc: `当前后台已配置 ${siteStore.offersData.length} 个尝鲜项目，可直接进入详情页查看。`,
    actionLabel: '查看尝鲜内容',
    to: '/try',
  },
  {
    name: '产品体验入口',
    desc: `当前后台已配置 ${siteStore.productsData.length + siteStore.gamesData.length} 个产品与游戏入口。`,
    actionLabel: '查看产品与游戏',
    to: '/products',
  },
  {
    name: '下载说明',
    desc: downloadsPageData.value.requirements?.[0] || '下载、交付与设备支持说明统一由后台页面配置维护。',
    actionLabel: '联系支持',
    to: '/community',
  },
])

const productMap = computed(() =>
  Object.fromEntries(
    [...siteStore.productsData, ...siteStore.gamesData].map((item) => [item.name, item]),
  ),
)
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(198,223,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <PageHero eyebrow="Downloads" :title="downloadsPageData.title" :subtitle="downloadsPageData.subtitle" :image="downloadsPageData.banner" image-alt="下载中心" />

    <section class="section-shell pt-0">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <main class="space-y-6">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-semibold text-[#17233D]">可交付内容</h2>
              <router-link to="/try" class="text-sm font-semibold text-[#2F7AF3]">去快来尝鲜看看 →</router-link>
            </div>
            <div class="mt-6 space-y-4">
              <article v-for="item in deliverables" :key="item.slug" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="text-lg font-semibold text-[#17233D]">{{ item.title }}</div>
                    <div class="mt-1 text-sm text-[#8A9BB3]">{{ item.category || '尝鲜内容' }}</div>
                  </div>
                  <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="item.tone">{{ item.status || '持续开放' }}</span>
                </div>
                <div class="mt-4 flex items-center justify-between gap-4">
                  <p class="text-sm leading-7 text-[#61718B]">{{ item.summary }}</p>
                  <div class="text-right">
                    <div class="text-2xl font-semibold text-[#2F7AF3]">{{ item.price }}</div>
                    <router-link :to="item.to" class="mt-2 inline-flex text-sm font-semibold text-[#2F7AF3]">
                      {{ item.ctaLabel || '查看详情' }} →
                    </router-link>
                  </div>
                </div>
              </article>
              <div v-if="!deliverables.length" class="rounded-[18px] border border-dashed border-[#DCE7F8] bg-[#FBFDFF] p-6 text-sm text-[#7384A0]">
                后台暂未配置可交付内容。
              </div>
            </div>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">体验与下载入口</h2>
            <div class="mt-6 space-y-4">
              <article v-for="item in releaseItems" :key="`${item.product}-${item.version}`" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="text-lg font-semibold text-[#17233D]">{{ item.product }} · {{ item.version }}</div>
                    <div class="mt-1 text-sm text-[#8A9BB3]">{{ item.notes }}</div>
                  </div>
                  <span class="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#2F7AF3]">{{ item.channel }}</span>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm text-[#7384A0]">
                  <span>{{ item.size }}</span>
                  <router-link :to="item.to" class="font-semibold text-[#2F7AF3]">进入查看</router-link>
                </div>
              </article>
              <div v-if="!releaseItems.length" class="rounded-[18px] border border-dashed border-[#DCE7F8] bg-[#FBFDFF] p-6 text-sm text-[#7384A0]">
                后台暂未配置可体验的产品或游戏。
              </div>
            </div>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">使用说明</h2>
            <div class="mt-6 grid gap-4 md:grid-cols-3">
              <article v-for="item in resources" :key="item.name" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="text-lg font-semibold text-[#17233D]">{{ item.name }}</div>
                <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
                <router-link :to="item.to" class="mt-4 inline-flex text-sm font-semibold text-[#2F7AF3]">
                  {{ item.actionLabel }} →
                </router-link>
              </article>
            </div>
          </div>
        </main>

        <aside class="space-y-5">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">需要帮助？</div>
            <p class="mt-4 text-sm leading-7 text-[#61718B]">遇到下载、交付或体验问题，可以直接联系作者或加入社区。</p>
            <router-link to="/community" class="mt-5 inline-flex rounded-[12px] bg-[#2F7AF3] px-5 py-3 text-sm font-semibold text-white">联系支持</router-link>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">覆盖产品</div>
            <div class="mt-5 space-y-4">
              <div v-for="product in [...siteStore.productsData, ...siteStore.gamesData]" :key="product.slug" class="flex items-center gap-4">
                <img :src="product.cover" :alt="product.name" class="h-14 w-14 rounded-[16px] object-cover" />
                <div>
                  <div class="font-semibold text-[#17233D]">{{ product.name }}</div>
                  <div class="text-xs text-[#8A9BB3]">{{ product.supportStatus || product.stage || product.status }}</div>
                </div>
              </div>
              <div v-if="![...siteStore.productsData, ...siteStore.gamesData].length" class="text-sm text-[#7384A0]">
                后台暂未配置产品。
              </div>
            </div>
          </div>

          <div v-if="downloadsPageData.requirements?.length" class="rounded-[26px] border border-[#E7EEF9] bg-white p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">下载要求</div>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-[#61718B]">
              <li v-for="item in downloadsPageData.requirements" :key="item">• {{ item }}</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
