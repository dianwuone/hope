<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { products } from '@/data'

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '下载动态墙' },
]

const stats = [
  { title: '今日下载', value: '12,842', tone: 'blue' },
  { title: '实时活跃', value: '3,271', tone: 'cyan' },
  { title: '累计下载', value: '2,731,209', tone: 'blue' },
  { title: '覆盖地区', value: '128+', tone: 'blue' },
]

const liveFeed = [
  { product: '育儿助手', city: '上海', time: '刚刚', image: products.find((item) => item.slug === 'parenting-assistant')?.cover },
  { product: '拼音大冒险', city: '广州', time: '刚刚', image: products.find((item) => item.slug === 'personal-assistant')?.cover },
  { product: 'AI 工具助手', city: '北京', time: '1 分钟前', image: products.find((item) => item.slug === 'ai-tools')?.cover },
  { product: '个人助手', city: '杭州', time: '2 分钟前', image: products.find((item) => item.slug === 'personal-assistant')?.cover },
  { product: '拼音大冒险', city: '成都', time: '2 分钟前', image: products.find((item) => item.slug === 'parenting-assistant')?.cover },
  { product: '育儿助手', city: '深圳', time: '3 分钟前', image: products.find((item) => item.slug === 'parenting-assistant')?.cover },
]

const hotIcons = [
  products.find((item) => item.slug === 'parenting-assistant')?.cover,
  products.find((item) => item.slug === 'ai-tools')?.cover,
  products.find((item) => item.slug === 'personal-assistant')?.cover,
  products.find((item) => item.slug === 'parenting-assistant')?.cover,
  products.find((item) => item.slug === 'ai-tools')?.cover,
  products.find((item) => item.slug === 'personal-assistant')?.cover,
  products.find((item) => item.slug === 'parenting-assistant')?.cover,
  products.find((item) => item.slug === 'ai-tools')?.cover,
]

const productCards = [
  {
    title: '个人助手',
    desc: '高效管理日常事务，让每一天更有条理',
    to: '/products/personal-assistant',
    image: products.find((item) => item.slug === 'personal-assistant')?.cover,
    tone: 'blue',
  },
  {
    title: '育儿助手',
    desc: '记录成长，科学育儿，陪伴孩子每一步',
    to: '/products/parenting-assistant',
    image: products.find((item) => item.slug === 'parenting-assistant')?.cover,
    tone: 'coral',
  },
  {
    title: 'AI 工具助手',
    desc: '整理提示词、工作流与灵感，让 AI 成为你的效率伙伴',
    to: '/products/ai-tools',
    image: products.find((item) => item.slug === 'ai-tools')?.cover,
    tone: 'cyan',
  },
  {
    title: '拼音大冒险',
    desc: '趣味拼音学习游戏，在冒险中爱上拼音',
    to: '/games/pinyin-adventure',
    image: products.find((item) => item.slug === 'parenting-assistant')?.cover,
    tone: 'blue',
  },
]

const toneClassMap = {
  blue: 'bg-[#EAF3FF] text-[#4A86F0]',
  cyan: 'bg-[#E8FBFF] text-[#20A7D3]',
  coral: 'bg-[#FFF0EA] text-[#EB7D63]',
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(196,221,255,0.3),transparent_22%),radial-gradient(circle_at_90%_10%,rgba(210,235,255,0.34),transparent_16%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_42%,#F5FAFF_100%)] text-[#17233D]">
    <section class="relative overflow-hidden border-b border-[#E4ECF8] bg-[radial-gradient(circle_at_60%_10%,rgba(204,227,255,0.32),transparent_18%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(156,204,255,0.16),transparent_18%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.76),transparent_24%)]"></div>
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_260px]">
          <aside class="pt-8">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#2F7AF3]">
              ● LIVE
            </div>
            <div class="mt-8 text-2xl font-semibold text-[#2F7AF3]">下载动态墙</div>
            <h1 class="mt-4 font-serif text-5xl font-semibold leading-[1.16] text-[#17233D]">
              每一次下载，<br />都在让灵感落地
            </h1>
            <p class="mt-6 text-base leading-8 text-[#5A6E8C]">
              来自全球用户的每一次选择，都在为更好的产品与游戏注入能量。
            </p>

            <div class="mt-8 space-y-4">
              <div
                v-for="item in stats"
                :key="item.title"
                class="flex items-center justify-between rounded-[20px] border border-[#E7EEF9] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.94)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(76,108,168,0.07)] backdrop-blur"
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full text-xl" :class="toneClassMap[item.tone]">
                    ↓
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-[#7384A0]">{{ item.title }}</div>
                    <div class="mt-1 text-4xl font-semibold text-[#17233D]">{{ item.value }}</div>
                  </div>
                </div>
                <div class="h-10 w-20 rounded-full bg-[linear-gradient(90deg,#EEF5FF_0%,#DFF1FF_100%)]"></div>
              </div>
            </div>
          </aside>

          <main class="relative min-h-[700px] overflow-hidden rounded-[36px] border border-white/85 bg-[radial-gradient(circle_at_center,rgba(223,241,255,0.95)_0%,rgba(243,249,255,0.8)_48%,rgba(247,251,255,0.42)_100%),linear-gradient(180deg,#F5FAFF_0%,#EAF4FF_100%)] shadow-[0_28px_60px_rgba(76,108,168,0.12)]">
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(204,228,255,0.16)_18%,rgba(255,255,255,0)_36%,rgba(255,255,255,0)_100%)]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.52),transparent_26%)]"></div>
            <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_16%,rgba(255,255,255,0.1)_32%,rgba(255,255,255,0.02)_48%,rgba(255,255,255,0.12)_64%,rgba(255,255,255,0.02)_80%,rgba(255,255,255,0.08)_100%)] opacity-60"></div>

            <div class="absolute left-1/2 top-10 h-[540px] w-[2px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.22)_84%,rgba(255,255,255,0)_100%)]"></div>
            <div class="absolute left-[22%] top-8 h-[500px] w-[1px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_26%,rgba(255,255,255,0.1)_84%,rgba(255,255,255,0)_100%)]"></div>
            <div class="absolute right-[24%] top-8 h-[500px] w-[1px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.72)_26%,rgba(255,255,255,0.12)_84%,rgba(255,255,255,0)_100%)]"></div>

            <div
              v-for="(item, index) in hotIcons"
              :key="`${item}-${index}`"
              class="absolute flex h-20 w-20 items-center justify-center rounded-[22px] border border-white/85 bg-white/82 p-2 shadow-[0_18px_38px_rgba(76,108,168,0.16)] backdrop-blur"
              :style="[
                { left: `${10 + (index % 4) * 19}%`, top: `${9 + Math.floor(index / 4) * 24}%` },
                index % 2 === 0 ? 'transform: rotate(-12deg);' : 'transform: rotate(12deg);'
              ]"
            >
              <img :src="item" alt="产品图标" class="h-full w-full rounded-[16px] object-cover" />
            </div>

            <div class="absolute bottom-10 left-1/2 h-40 w-[72%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,rgba(179,224,255,0.58)_0%,rgba(179,224,255,0.26)_42%,rgba(179,224,255,0)_72%)] blur-md"></div>

            <div class="absolute bottom-10 left-1/2 flex w-[78%] -translate-x-1/2 flex-wrap items-end justify-center gap-3">
              <div
                v-for="(item, index) in [...hotIcons, ...hotIcons.slice(0, 6)]"
                :key="`${item}-pile-${index}`"
                class="flex h-20 w-20 items-center justify-center rounded-[22px] border border-white/88 bg-white/84 p-2 shadow-[0_18px_38px_rgba(76,108,168,0.14)]"
                :style="index % 3 === 0 ? 'transform: translateY(8px) rotate(-10deg);' : index % 3 === 1 ? 'transform: translateY(-4px) rotate(8deg);' : 'transform: rotate(-4deg);'"
              >
                <img :src="item" alt="产品图标" class="h-full w-full rounded-[16px] object-cover" />
              </div>
            </div>
          </main>

          <aside class="space-y-4 pt-6">
            <div class="rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
              <div class="text-xl font-semibold text-[#17233D]">实时下载</div>
              <div class="mt-5 space-y-4">
                <div v-for="item in liveFeed" :key="`${item.product}-${item.city}-${item.time}`" class="flex items-center gap-3">
                  <img :src="item.image" :alt="item.product" class="h-14 w-14 rounded-[16px] object-cover shadow-[0_10px_20px_rgba(76,108,168,0.08)]" />
                  <div class="min-w-0">
                    <div class="text-lg font-semibold text-[#17233D]">{{ item.product }}</div>
                    <div class="mt-1 text-sm text-[#7384A0]">{{ item.time}} · {{ item.city }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
              <div class="text-xl font-semibold text-[#17233D]">全球热力分布</div>
              <div class="mt-5 rounded-[18px] bg-[linear-gradient(180deg,#F3F8FF_0%,#FFFFFF_100%)] px-4 py-6 text-center">
                <div class="mx-auto h-28 w-full rounded-[16px] bg-[radial-gradient(circle_at_20%_50%,rgba(117,182,255,0.18),transparent_18%),radial-gradient(circle_at_50%_50%,rgba(117,182,255,0.14),transparent_18%),radial-gradient(circle_at_78%_46%,rgba(117,182,255,0.18),transparent_18%),linear-gradient(180deg,#F4F9FF_0%,#FFFFFF_100%)]"></div>
                <button type="button" class="mt-4 rounded-full border border-[#DDE8F7] bg-white px-4 py-2 text-sm font-semibold text-[#4B84EF]">
                  🌐 查看世界地图
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-4 rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] px-6 py-5 shadow-[0_14px_30px_rgba(76,108,168,0.06)]">
          <div class="text-2xl font-semibold text-[#17233D]">热门下载中</div>
          <div class="flex items-center gap-3 text-[#9BB2D1]">←</div>
          <div class="flex flex-wrap items-center gap-3">
            <div
              v-for="(item, index) in hotIcons.concat(hotIcons)"
              :key="`${item}-hot-${index}`"
              class="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-[0_10px_22px_rgba(76,108,168,0.08)]"
            >
              <img :src="item" alt="热门产品" class="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <router-link to="/community" class="ml-auto text-lg font-semibold text-[#2F7AF3]">
            加入他们，发现更多精彩 →
          </router-link>
        </div>
      </div>
    </section>

    <section class="pb-16 pt-8">
      <div class="container-content">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-3xl font-semibold text-[#17233D]">探索我们的产品</h2>
          <router-link to="/products" class="text-lg font-semibold text-[#2F7AF3]">查看全部产品 →</router-link>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="item in productCards"
            :key="item.title"
            :to="item.to"
            class="flex items-center gap-5 rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] px-6 py-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(76,108,168,0.11)]"
          >
            <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] p-2 shadow-[0_14px_28px_rgba(76,108,168,0.08)]" :class="toneClassMap[item.tone]">
              <img :src="item.image" :alt="item.title" class="h-full w-full rounded-[18px] object-cover" />
            </div>
            <div>
              <div class="text-2xl font-semibold text-[#17233D]">{{ item.title }}</div>
              <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
              <div class="mt-3 text-sm font-semibold text-[#2F7AF3]">了解更多 →</div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
