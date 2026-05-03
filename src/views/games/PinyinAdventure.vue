<script setup>
import { computed } from 'vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { articles, getProductBySlug, playPage } from '@/data'
import pinyinGameImage from '@/assets/images/shucai/products/app-pinyin-game.jpg'
import bannerArcade from '@/assets/images/shucai/banners/banner-arcade.jpg'
import articleThumb2 from '@/assets/images/shucai/articles/article-thumb-2.jpg'
import articleThumb4 from '@/assets/images/shucai/articles/article-thumb-4.jpg'
import articleThumb6 from '@/assets/images/shucai/articles/article-thumb-6.jpg'

const parentingProduct = computed(() => getProductBySlug('parenting-assistant'))

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '游戏中心', to: '/games' },
  { label: '拼音大冒险' },
]

const tags = ['4-7 岁', '拼音启蒙', '互动探索', '趣味学习']

const highlights = [
  { title: '科学分级', desc: '循序渐进，系统学习', icon: '◫' },
  { title: '互动探索', desc: '丰富场景，激发兴趣', icon: '✦' },
  { title: '即时反馈', desc: '智能反馈，巩固记忆', icon: '▣' },
  { title: '无广告', desc: '纯净体验，专注学习', icon: '◌' },
  { title: '离线可玩', desc: '部分内容支持离线', icon: '△' },
]

const gameplaySteps = [
  { title: '冒险闯关', desc: '循序渐进地闯过拼音王国的各个岛屿，解锁新关卡。', icon: '◫', tone: 'purple' },
  { title: '学习拼音', desc: '通过听、读、选、拼等多种互动方式认识拼音。', icon: '◎', tone: 'amber' },
  { title: '收集奖励', desc: '完成挑战后累积星星，解锁新角色和装饰。', icon: '★', tone: 'green' },
  { title: '复习巩固', desc: '趣味复习关卡，帮助孩子牢固掌握所学内容。', icon: '✿', tone: 'blue' },
]

const valueItems = [
  { title: '拼音启蒙', desc: '覆盖 23 声母、24 个韵母与 16 个整体认读音节', icon: '◌', tone: 'green' },
  { title: '发音标准', desc: '专业配音，标准发音帮助孩子准确读音', icon: '▣', tone: 'purple' },
  { title: '认读能力', desc: '看图识字，拼读练习提升认识能力', icon: '✦', tone: 'blue' },
  { title: '自主学习', desc: '游戏化设计，激发兴趣培养主动学习习惯', icon: '✿', tone: 'amber' },
  { title: '综合能力', desc: '观察力、反应力、记忆力全面提升', icon: '✪', tone: 'coral' },
]

const screenshots = [
  { title: '字母认知', image: bannerArcade },
  { title: '拼音卡片', image: pinyinGameImage },
  { title: '拼一拼，读一读', image: articleThumb6 },
  { title: '冒险地图', image: articleThumb4 },
]

const reviews = [
  { author: '糖糖妈妈', age: '孩子 5 岁', content: '孩子每天都主动要玩，拼音进步很快！' },
  { author: '小宇爸爸', age: '孩子 6 岁', content: '设计很用心，寓教于乐，强烈推荐！' },
]

const relatedArticles = computed(() =>
  articles
    .filter((article) => article.tags.some((tag) => ['拼音启蒙', '亲子游戏', '幼小衔接'].includes(tag)))
    .slice(0, 3)
)

const toneClassMap = {
  blue: 'bg-[#EAF3FF] text-[#4A86F0]',
  green: 'bg-[#E9FAF2] text-[#2CA36E]',
  amber: 'bg-[#FFF3E1] text-[#EA982A]',
  purple: 'bg-[#F1EEFF] text-[#7C6EEE]',
  coral: 'bg-[#FFF0EA] text-[#EB7D63]',
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(202,224,255,0.3),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_34%,#F7FAFF_100%)] text-[#17233D]">
    <section class="relative overflow-hidden border-b border-[#E4ECF8] bg-[radial-gradient(circle_at_78%_18%,rgba(205,228,255,0.32),transparent_16%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <img
        :src="bannerArcade"
        alt="拼音大冒险背景"
        class="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-center opacity-100"
      />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,#F9FCFF_0%,rgba(249,252,255,0.97)_28%,rgba(249,252,255,0.74)_56%,rgba(249,252,255,0.2)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.32),transparent_18%),radial-gradient(circle_at_58%_74%,rgba(170,211,255,0.16),transparent_18%)]"></div>
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="relative z-10 min-h-[520px] xl:min-h-[560px]">
          <div class="max-w-[560px] pt-4 md:pt-8">
            <div class="flex items-start gap-5">
              <img
                :src="pinyinGameImage"
                alt="拼音大冒险"
                class="h-24 w-24 rounded-[24px] object-cover shadow-[0_20px_36px_rgba(58,106,176,0.18)]"
              />
              <div>
                <div class="flex flex-wrap items-center gap-3">
                  <h1 class="font-serif text-5xl font-semibold leading-tight text-[#17233D]">拼音大冒险</h1>
                  <span class="rounded-full bg-[#EEF4FF] px-3 py-1 text-sm font-semibold text-[#4A84F0]">v1.0</span>
                </div>
                <p class="mt-3 text-2xl font-semibold text-[#30496E]">有趣的拼音探索之旅</p>
              </div>
            </div>

            <p class="mt-8 max-w-[520px] text-base leading-8 text-[#5A6E8C]">
              专为 4-7 岁孩子设计的拼音学习游戏。在冒险中认识声母、韵母和整体认读音节，边玩边学，轻松启蒙。
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="item in tags"
                :key="item"
                class="rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#4A84F0]"
              >
                {{ item }}
              </span>
            </div>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link
                to="/play"
                class="inline-flex items-center rounded-[14px] bg-[#2F7AF3] px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(47,122,243,0.22)] transition-colors hover:bg-[#2168DE]"
              >
                ▶ 在线轻试玩
              </router-link>
              <router-link
                to="/wishlist"
                class="inline-flex items-center rounded-[14px] border border-[#DCE7F8] bg-white px-7 py-4 text-sm font-semibold text-[#38537A] shadow-[0_12px_24px_rgba(76,108,168,0.06)] transition-colors hover:bg-[#F7FAFF]"
              >
                ♡ 加入心愿单
              </router-link>
            </div>

            <div class="mt-5 text-sm text-[#8A9BB3]">支持手机 / 平板 / 电脑浏览器</div>
          </div>
        </div>

        <div class="relative z-20 -mt-10 grid gap-4 rounded-[24px] border border-[#E7EEF9] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(76,108,168,0.1)] md:grid-cols-2 xl:grid-cols-5 xl:-mt-14">
          <div
            v-for="item in highlights"
            :key="item.title"
            class="flex items-center gap-3"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#4A84F0]">
              {{ item.icon }}
            </div>
            <div>
              <div class="text-base font-semibold text-[#17233D]">{{ item.title }}</div>
              <div class="mt-1 text-sm text-[#7384A0]">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)] xl:items-stretch">
        <article class="rounded-[26px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">✦</span>
            <h2 class="text-2xl font-semibold text-[#17233D]">游戏玩法</h2>
          </div>

          <div class="mt-6 space-y-5">
            <div v-for="item in gameplaySteps" :key="item.title" class="flex gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-xl" :class="toneClassMap[item.tone]">
                {{ item.icon }}
              </div>
              <div>
                <div class="text-lg font-semibold text-[#17233D]">{{ item.title }}</div>
                <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </article>

        <article class="rounded-[26px] border border-[#E6EDF8] bg-white p-4 shadow-[0_16px_34px_rgba(76,108,168,0.07)] md:p-5">
          <div class="relative overflow-hidden rounded-[22px] border border-[#DCE7F8] bg-[#0E1F45] shadow-[0_16px_30px_rgba(26,48,94,0.14)]">
            <img :src="bannerArcade" alt="拼音大冒险视频封面" class="absolute inset-0 h-full w-full object-cover opacity-92" />
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,48,0.06)_0%,rgba(8,18,42,0.38)_100%)]"></div>
            <div class="relative aspect-[16/9]">
              <div class="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F7AF3]">
                视频介绍
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-3xl text-[#2F7AF3] shadow-[0_20px_40px_rgba(34,72,138,0.18)]">
                  ▶
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(180deg,rgba(10,20,38,0)_0%,rgba(10,20,38,0.82)_100%)] px-6 pb-5 pt-12 text-white">
                <div class="text-sm font-semibold">0:00 / 1:12</div>
                <div class="flex items-center gap-4 text-sm text-white/88">
                  <span>🔊</span>
                  <span>⚙</span>
                  <span>⛶</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="py-4">
      <div class="container-content">
        <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">☆</span>
            <h2 class="text-2xl font-semibold text-[#17233D]">学习价值</h2>
          </div>

          <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <div v-for="item in valueItems" :key="item.title" class="flex gap-4 rounded-[20px] border border-[#EEF3FA] bg-white/80 p-5">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl" :class="toneClassMap[item.tone]">
                {{ item.icon }}
              </div>
              <div>
                <div class="text-lg font-semibold text-[#17233D]">{{ item.title }}</div>
                <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="container-content">
        <div class="flex items-center justify-between gap-4">
          <SectionTitle title="游戏截图" />
          <router-link to="/play" class="text-sm font-semibold text-[#3B7FF2]">查看全部截图 →</router-link>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in screenshots"
            :key="item.title"
            class="overflow-hidden rounded-[24px] border border-[#E6EDF8] bg-white shadow-[0_16px_34px_rgba(76,108,168,0.07)]"
          >
            <img :src="item.image" :alt="item.title" class="aspect-[16/10] w-full object-cover" />
            <div class="p-4">
              <div class="text-base font-semibold text-[#17233D]">{{ item.title }}</div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container-content grid gap-6 xl:grid-cols-3">
        <article class="rounded-[26px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">▷</span>
            <h2 class="text-2xl font-semibold text-[#17233D]">在线轻试玩</h2>
          </div>
          <p class="mt-3 text-sm leading-7 text-[#61718B]">无需下载，立即体验完整的拼音学习冒险之旅。</p>
          <div class="mt-5 overflow-hidden rounded-[20px] border border-[#E6EDF8] bg-white">
            <img :src="bannerArcade" alt="在线试玩" class="aspect-[16/10] w-full object-cover" />
          </div>
          <router-link
            to="/play"
            class="mt-5 flex items-center justify-center rounded-[14px] bg-[#2F7AF3] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(47,122,243,0.22)] transition-colors hover:bg-[#2168DE]"
          >
            立即开始游戏
          </router-link>
          <div class="mt-3 text-center text-sm text-[#8A9BB3]">首次体验约 5-10 分钟</div>
        </article>

        <article class="rounded-[26px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">♡</span>
            <h2 class="text-2xl font-semibold text-[#17233D]">推荐搭配：育儿助手</h2>
          </div>
          <p class="mt-3 text-sm leading-7 text-[#61718B]">搭配使用育儿助手，记录学习进度，定制学习计划，养成学习好习惯。</p>
          <ul class="mt-5 space-y-2 text-sm leading-7 text-[#61718B]">
            <li>✓ 学习计划定制</li>
            <li>✓ 学习时间提醒</li>
            <li>✓ 学习进度记录</li>
            <li>✓ 成就与成长报告</li>
          </ul>
          <div class="mt-6 flex items-end justify-between gap-4">
            <router-link to="/products/parenting-assistant" class="text-sm font-semibold text-[#3B7FF2]">了解育儿助手 →</router-link>
            <img :src="parentingProduct.cover" :alt="parentingProduct.name" class="h-36 w-28 rounded-[20px] object-cover shadow-[0_16px_30px_rgba(76,108,168,0.1)]" />
          </div>
        </article>

        <article class="rounded-[26px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">★</span>
            <h2 class="text-2xl font-semibold text-[#17233D]">家长评价</h2>
          </div>
          <div class="mt-6 space-y-4">
            <div v-for="item in reviews" :key="item.author" class="rounded-[18px] border border-[#EEF3FA] bg-white/82 p-5">
              <div class="text-[#F5A623]">★★★★★</div>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">“{{ item.content }}”</p>
              <div class="mt-4 flex items-center justify-between text-sm">
                <span class="font-semibold text-[#17233D]">{{ item.author }}</span>
                <span class="text-[#8A9BB3]">{{ item.age }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="pb-16 pt-10">
      <div class="container-content">
        <div class="flex items-center justify-between gap-4">
          <SectionTitle title="相关文章" />
          <router-link to="/articles" class="text-sm font-semibold text-[#3B7FF2]">查看全部 →</router-link>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <router-link
            v-for="item in relatedArticles"
            :key="item.slug"
            :to="`/articles/${item.slug}`"
            class="group grid grid-cols-[120px_1fr] gap-4 overflow-hidden rounded-[24px] border border-[#DCE7F8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-4 shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
          >
            <img :src="item.cover" :alt="item.title" class="h-24 w-full rounded-[16px] object-cover" />
            <div class="min-w-0">
              <div class="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold inline-flex text-[#4D84EF]">
                {{ item.column === 'qiming' ? '启鸣宝宝' : '昆廷笔记' }}
              </div>
              <h3 class="mt-3 line-clamp-2 text-lg font-semibold leading-tight text-[#17233D]">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-[#61718B]">{{ item.summary }}</p>
              <div class="mt-3 text-xs text-[#8A9BB3]">{{ item.publishedAt }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
