<script setup>
import { computed } from 'vue'
import SmartImage from '@/components/SmartImage.vue'
import { labs, products } from '@/data'
import bannerLab from '@/assets/images/shucai/banners/banner-lab.jpg'
import bannerArcade from '@/assets/images/shucai/banners/banner-arcade.jpg'
import avatarQuentin from '@/assets/images/shucai/avatars/avatar-quentin.jpg'

const stats = [
  { value: '18+', label: '实验构想' },
  { value: '6', label: '进行中' },
  { value: '12', label: '已发布体验' },
  { value: '∞', label: '灵感与想法' },
]

const labCards = computed(() => [
  {
    ...labs[0],
    icon: '⌘',
    accent: 'from-[#F7FBFF] via-[#FCFEFF] to-[#FFFFFF]',
    border: 'border-[#E3EEFA]',
    buttonClass: 'bg-[#4B89F5] text-white hover:bg-[#3D7CEB]',
    badgeClass: 'bg-[#EAF4FF] text-[#4687F0]',
    imageGlow: 'bg-[radial-gradient(circle_at_30%_40%,rgba(104,163,255,0.18),rgba(104,163,255,0.05)_42%,transparent_74%)]',
    features: ['AI 助手', '知识管理', '工作流搭建'],
    ctaLabel: '进入工具实验室',
  },
  {
    ...labs[1],
    icon: '✦',
    accent: 'from-[#F8FBFF] via-[#FCFDFF] to-[#FFFFFF]',
    border: 'border-[#E5EEF9]',
    buttonClass: 'bg-[#4B89F5] text-white hover:bg-[#3D7CEB]',
    badgeClass: 'bg-[#EDF4FF] text-[#578CF0]',
    imageGlow: 'bg-[radial-gradient(circle_at_72%_58%,rgba(113,179,255,0.16),rgba(113,179,255,0.04)_44%,transparent_72%)]',
    features: ['寓教于乐', '学习体验', '情绪反馈'],
    ctaLabel: '进入游戏实验室',
  },
])

const latestExperiences = [
  {
    title: '灵感卡片流',
    summary: 'AI 帮你捕捉灵感并生成每日卡片笔记。',
    badge: '体验',
    image: products.find((item) => item.slug === 'ai-tools')?.cover,
    to: '/products/ai-tools',
  },
  {
    title: '拼音星球 2.0',
    summary: '全新关卡与互动反馈，更多线上试玩入口上线。',
    badge: '更新',
    image: bannerArcade,
    to: '/games/pinyin-adventure',
  },
  {
    title: 'AI 写作小助手',
    summary: '一句话生成、更流畅的写作助手原型体验。',
    badge: '体验',
    image: products.find((item) => item.slug === 'personal-assistant')?.cover,
    to: '/lab/tools',
  },
  {
    title: '记忆地图',
    summary: '可视化知识回顾的轻量原型，帮助建立长期记忆链路。',
    badge: '新',
    image: products.find((item) => item.slug === 'parenting-assistant')?.cover,
    to: '/lab/tools',
  },
]

const progressProjects = [
  {
    title: 'AI 家庭日志',
    summary: '为家庭日常建立轻量记录与提醒系统。',
    progress: 45,
    to: '/lab/tools',
  },
  {
    title: '学习岛计划',
    summary: '学习节奏辅助器，帮助把目标拆成更小行动。',
    progress: 60,
    to: '/lab/tools',
  },
  {
    title: '自动化灵感工作流',
    summary: '让灵感采集、整理、沉淀形成稳定闭环。',
    progress: 30,
    to: '/lab/tools',
  },
  {
    title: '亲子共玩空间',
    summary: '探索更适合亲子协作的数字游戏空间。',
    progress: 25,
    to: '/lab/games',
  },
]

const quote = '实验，是为了让未来更值得期待。'
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(171,216,255,0.22),transparent_28%),linear-gradient(180deg,#F4F9FF_0%,#F9FCFF_18%,#FFFFFF_42%,#F6FAFF_100%)]">
    <section class="relative overflow-hidden border-b border-[#E6EEF9]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(124,183,255,0.18),transparent_20%),radial-gradient(circle_at_74%_22%,rgba(166,220,255,0.22),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.54))]"></div>
      <img
        :src="bannerLab"
        alt="实验室"
        class="absolute inset-y-0 right-0 h-full w-[76%] object-cover object-center opacity-100 saturate-[1.08]"
      />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,#F7FBFF_0%,rgba(247,251,255,0.97)_28%,rgba(247,251,255,0.76)_54%,rgba(247,251,255,0.16)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(116,191,255,0.14),transparent_24%),radial-gradient(circle_at_66%_80%,rgba(255,255,255,0.62),transparent_20%)]"></div>

      <div class="container-content relative z-10 py-6 md:py-8">
        <div class="text-xs font-medium text-[#73829B]">
          <router-link to="/" class="transition-colors hover:text-[#367CF2]">首页</router-link>
          <span class="mx-2">/</span>
          <span>实验室</span>
        </div>

        <div class="relative mt-5 overflow-hidden rounded-[30px] border border-white/80 bg-white/36 px-6 py-8 shadow-[0_24px_64px_rgba(86,126,183,0.12)] backdrop-blur-[6px] md:px-8 md:py-10">
          <div class="absolute -left-10 top-8 h-28 w-28 rounded-full bg-[#B9DEFF]/30 blur-3xl"></div>
          <div class="absolute bottom-6 left-[34%] h-24 w-24 rounded-full bg-white/55 blur-2xl"></div>
          <div class="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,1fr)] lg:items-center">
          <div>
            <div class="flex items-center gap-4">
              <h1 class="font-serif text-5xl font-semibold leading-tight text-[#17233D] md:text-[3.6rem]">实验室</h1>
              <span class="text-sm font-semibold uppercase tracking-[0.26em] text-[#5A8CF3]">Lab</span>
            </div>
            <p class="mt-4 text-2xl font-semibold text-[#253C66]">好奇心驱动，探索更好的可能</p>
            <p class="mt-5 max-w-[520px] text-base leading-8 text-[#5C6E88]">
              这里是 QUENTIN WINDOW 的试验田和孵化站。我们在工具与游戏的边界上，做想法验证、原型迭代与未来方向的评估，一步步把真实需求变成真实体验。
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="item in stats"
                :key="item.label"
                class="rounded-[18px] border border-[#E7F0FC] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,249,255,0.92)_100%)] px-5 py-4 shadow-[0_16px_32px_rgba(90,126,180,0.1)] backdrop-blur"
              >
                <div class="text-3xl font-semibold text-[#3E7EF1]">{{ item.value }}</div>
                <div class="mt-2 text-sm text-[#70809A]">{{ item.label }}</div>
              </div>
            </div>
          </div>

          <div class="hidden min-h-[320px] lg:block"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="container-content grid gap-6 lg:grid-cols-2">
        <router-link
          v-for="lab in labCards"
          :key="lab.slug"
          :to="`/lab/${lab.slug}`"
          class="group relative overflow-hidden rounded-[24px] border bg-[linear-gradient(135deg,#F5FAFF_0%,#FFFFFF_52%,#F9FCFF_100%)] p-6 shadow-[0_22px_46px_rgba(58,97,160,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_rgba(58,97,160,0.16)]"
          :class="lab.border"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(119,182,255,0.12),transparent_22%),radial-gradient(circle_at_74%_64%,rgba(197,235,255,0.16),transparent_24%)]"></div>
          <div class="absolute inset-y-0 right-0 w-[46%]">
            <div class="absolute inset-0" :class="lab.imageGlow"></div>
            <SmartImage
              :src="lab.cover"
              :alt="lab.name"
              :fallback-label="lab.name"
              img-class="absolute bottom-0 right-0 h-full w-full object-cover object-center opacity-92 saturate-[1.05]"
              fallback-class="absolute bottom-0 right-0 h-full w-full"
            />
            <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.99)_0%,rgba(248,251,255,0.9)_28%,rgba(248,251,255,0.18)_100%)]"></div>
          </div>

          <div class="relative z-10 max-w-[60%] min-w-[260px]">
            <div class="flex items-center gap-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-lg font-semibold" :class="lab.badgeClass">
                {{ lab.icon }}
              </span>
              <h2 class="text-2xl font-semibold text-[#18243C]">{{ lab.name }}</h2>
            </div>
            <p class="mt-4 text-sm leading-7 text-[#61718B]">{{ lab.description }}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="feature in lab.features"
                :key="feature"
                class="rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[#5686E4] shadow-[0_8px_16px_rgba(94,130,189,0.08)]"
              >
                {{ feature }}
              </span>
            </div>

            <span
              class="mt-6 inline-flex items-center rounded-[10px] px-5 py-3 text-sm font-semibold shadow-[0_12px_24px_rgba(70,116,198,0.2)] transition-all"
              :class="lab.buttonClass"
            >
              {{ lab.ctaLabel }}
              <span class="ml-2">→</span>
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <section class="pb-6">
      <div class="container-content">
        <div class="rounded-[26px] border border-[#E7EFFA] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(246,250,255,0.92)_100%)] p-6 shadow-[0_18px_42px_rgba(74,107,160,0.07)] md:p-7">
        <div class="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-semibold text-[#17233D]">最新体验</h2>
            <p class="mt-2 text-sm leading-7 text-[#6E7F98]">优先体验最近更新的试验性作品。</p>
          </div>
          <router-link to="/try" class="text-sm font-semibold text-[#3B7FF2]">
            查看全部体验 →
          </router-link>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="item in latestExperiences"
            :key="item.title"
            :to="item.to"
            class="group overflow-hidden rounded-[20px] border border-[#E3ECF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FCFF_100%)] shadow-[0_14px_32px_rgba(66,95,145,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(66,95,145,0.12)]"
          >
            <div class="relative">
              <SmartImage
                :src="item.image"
                :alt="item.title"
                :fallback-label="item.title"
                img-class="aspect-[16/11] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fallback-class="aspect-[16/11] w-full"
              />
              <span class="absolute left-4 top-4 rounded-full bg-[#4F88F5] px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(79,136,245,0.22)]">
                {{ item.badge }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-semibold text-[#17233D]">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">{{ item.summary }}</p>
              <div class="mt-5 text-sm font-semibold text-[#3B7FF2]">立即体验</div>
            </div>
          </router-link>
        </div>
        </div>
      </div>
    </section>

    <section class="py-6">
      <div class="container-content">
        <div class="rounded-[26px] border border-[#E7EFFA] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(246,250,255,0.92)_100%)] p-6 shadow-[0_18px_42px_rgba(74,107,160,0.07)] md:p-7">
        <div class="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-semibold text-[#17233D]">进行中的项目</h2>
            <p class="mt-2 text-sm leading-7 text-[#6E7F98]">这些想法还在探索阶段，部分会先以原型或验证版出现。</p>
          </div>
          <router-link to="/community" class="text-sm font-semibold text-[#3B7FF2]">
            查看幕后进展 →
          </router-link>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="item in progressProjects"
            :key="item.title"
            :to="item.to"
            class="rounded-[20px] border border-[#E3ECF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FCFF_100%)] p-5 shadow-[0_14px_32px_rgba(66,95,145,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(66,95,145,0.12)]"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#EAF3FF] text-[#4C84F3]">◌</div>
            <h3 class="mt-4 text-xl font-semibold text-[#17233D]">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-[#61718B]">{{ item.summary }}</p>

            <div class="mt-5">
              <div class="flex items-center justify-between text-xs font-semibold text-[#6E7F98]">
                <span>开发进度</span>
                <span>{{ item.progress }}%</span>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#EBF1FA]">
                <div class="h-full rounded-full bg-[linear-gradient(90deg,#5D90F5_0%,#6AD1FF_100%)]" :style="{ width: `${item.progress}%` }"></div>
              </div>
            </div>
          </router-link>
        </div>
        </div>
      </div>
    </section>

    <section class="py-6">
      <div class="container-content grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div class="overflow-hidden rounded-[24px] border border-[#DDEAF9] bg-[radial-gradient(circle_at_18%_18%,rgba(168,217,255,0.26),transparent_24%),linear-gradient(135deg,#F4F9FF_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_40px_rgba(58,97,160,0.08)]">
          <div class="flex items-start justify-between gap-4">
            <div class="max-w-[320px]">
              <h2 class="text-2xl font-semibold text-[#17233D]">Beta 招募计划</h2>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">
                邀请愿意参与真实体验反馈的早期用户，一起把这些想法打磨成更稳定的产品。
              </p>
              <ul class="mt-5 space-y-2 text-sm text-[#61718B]">
                <li>• 优先体验新功能和原型</li>
                <li>• 获取产品更新说明</li>
                <li>• 参与早期内测名单</li>
                <li>• 与开发者直接交流</li>
              </ul>
              <router-link
                to="/community"
                class="mt-6 inline-flex items-center rounded-[10px] bg-[#3F81F4] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(63,129,244,0.2)] transition-colors hover:bg-[#3373E3]"
              >
                申请成为体验者
                <span class="ml-2">→</span>
              </router-link>
            </div>

            <div class="hidden lg:flex h-[220px] flex-1 items-end justify-center">
              <img :src="avatarQuentin" alt="Quentin" class="h-[220px] rounded-[24px] object-cover shadow-[0_18px_40px_rgba(67,102,155,0.14)]" />
            </div>
          </div>
        </div>

        <div class="rounded-[24px] border border-[#DDEAF9] bg-[radial-gradient(circle_at_86%_14%,rgba(173,226,255,0.18),transparent_18%),linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)] p-6 shadow-[0_18px_40px_rgba(58,97,160,0.08)]">
          <h2 class="text-2xl font-semibold text-[#17233D]">互动原型入口</h2>
          <p class="mt-3 text-sm leading-7 text-[#61718B]">这些互动原型还在不断迭代，欢迎试玩、探索、记录。</p>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <router-link
              to="/downloads"
              class="rounded-[18px] border border-[#E4ECF8] bg-[linear-gradient(135deg,#F4F8FF_0%,#FFFFFF_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EAF3FF] text-[#4C84F3]">▣</div>
              <h3 class="mt-4 text-xl font-semibold text-[#17233D]">下载动态墙</h3>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">看看大家都在下载和体验什么，感受真实的使用热度。</p>
              <div class="mt-4 text-sm font-semibold text-[#3B7FF2]">进入动态墙 →</div>
            </router-link>

            <router-link
              to="/play"
              class="rounded-[18px] border border-[#E4ECF8] bg-[linear-gradient(135deg,#F6FBFF_0%,#FFFFFF_100%)] p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#E8FBF9] text-[#25A7AA]">✦</div>
              <h3 class="mt-4 text-xl font-semibold text-[#17233D]">在线轻试玩</h3>
              <p class="mt-3 text-sm leading-7 text-[#61718B]">进入浏览器中的小游戏和实验，试试看，再决定是否深入。</p>
              <div class="mt-4 text-sm font-semibold text-[#3B7FF2]">进入体验 →</div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 pt-4">
      <div class="container-content">
        <div class="overflow-hidden rounded-[24px] border border-[#DDEAF9] bg-[radial-gradient(circle_at_90%_30%,rgba(172,220,255,0.24),transparent_18%),linear-gradient(90deg,#F8FBFF_0%,#EDF6FF_48%,#F8FCFF_100%)] px-6 py-6 shadow-[0_16px_36px_rgba(58,97,160,0.08)] md:px-8">
          <div class="flex flex-col gap-5 md:flex-row md:items-center">
            <img :src="avatarQuentin" alt="Quentin" class="h-16 w-16 rounded-full object-cover shadow-[0_10px_24px_rgba(58,97,160,0.12)]" />
            <div class="min-w-0 flex-1">
              <div class="text-2xl font-semibold text-[#22324A]">“ {{ quote }} ”</div>
              <p class="mt-2 text-sm leading-7 text-[#71819A]">每一个小步的实验，都是离理想更近的一步。</p>
            </div>
            <router-link to="/about" class="text-sm font-semibold text-[#3B7FF2]">
              了解作者 →
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
