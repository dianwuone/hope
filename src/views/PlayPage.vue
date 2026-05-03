<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import pinyinGameImage from '@/assets/images/shucai/products/app-pinyin-game.jpg'
import bannerArcade from '@/assets/images/shucai/banners/banner-arcade.jpg'

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '在线轻试玩' },
]

const tips = [
  { title: '即开即玩', desc: '无需下载，点击开始即可体验游戏乐趣', icon: '◌', tone: 'blue' },
  { title: '轻松上手', desc: '简单操作，轻松上手适合所有年龄段', icon: '⚡', tone: 'purple' },
  { title: '挑战自我', desc: '不断突破最高分，挑战更好的自己', icon: '★', tone: 'amber' },
  { title: '灵感能量', desc: '收集能量晶体，解锁惊喜彩蛋', icon: '♡', tone: 'coral' },
]

const rankings = [
  { name: '星空漫游者', score: '2,680', rank: 1 },
  { name: 'CodeDreamer', score: '2,350', rank: 2 },
  { name: 'LightChaser', score: '1,980', rank: 3 },
  { name: '未来玩家', score: '1,680', rank: 4 },
  { name: '昆廷窗口', score: '1,320', rank: 5, active: true },
]

const exploreCards = [
  { title: '游戏中心', desc: '发现更多好游戏', to: '/games', icon: '✦' },
  { title: '实验室', desc: '体验创新互动项目', to: '/lab', icon: '△' },
  { title: '下载动态墙', desc: '查看实时下载热度', to: '/download-wall', icon: '↓' },
  { title: '文章中心', desc: '阅读更多精彩内容', to: '/articles', icon: '▣' },
]

const toneClassMap = {
  blue: 'bg-[#EAF3FF] text-[#4A86F0]',
  purple: 'bg-[#F1EEFF] text-[#7C6EEE]',
  amber: 'bg-[#FFF3E1] text-[#EA982A]',
  coral: 'bg-[#FFF0EA] text-[#EB7D63]',
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(197,222,255,0.28),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_42%,#F5FAFF_100%)] text-[#17233D]">
    <section class="py-8 md:py-10">
      <div class="container-content">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_250px] xl:items-start">
          <aside class="rounded-[26px] border border-[#E5EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#4A84F0]">
              ⚡ 在线轻试玩
            </div>
            <h1 class="mt-6 font-serif text-5xl font-semibold leading-[1.18] text-[#17233D]">
              轻松一局，<span class="text-[#2F7AF3]">快乐充电</span>
            </h1>
            <p class="mt-6 text-base leading-8 text-[#5A6E8C]">
              一个简单有趣的横版跑酷小游戏，收集灵感能量，挑战更高分数！无需下载，随时开玩。
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                class="inline-flex items-center rounded-[14px] bg-[#2F7AF3] px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(47,122,243,0.22)] transition-colors hover:bg-[#2168DE]"
              >
                开始游戏 ▶
              </button>
              <button
                type="button"
                class="inline-flex items-center rounded-[14px] border border-[#DCE7F8] bg-white px-7 py-4 text-sm font-semibold text-[#38537A] shadow-[0_12px_24px_rgba(76,108,168,0.06)] transition-colors hover:bg-[#F7FAFF]"
              >
                ⓘ 玩法说明
              </button>
            </div>

            <div class="mt-8 rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_12px_28px_rgba(76,108,168,0.06)]">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF4FF] text-[#4A84F0]">✦</span>
                <h2 class="text-xl font-semibold text-[#17233D]">小贴士</h2>
              </div>
              <p class="mt-4 text-sm leading-7 text-[#61718B]">
                跳跃躲避障碍，收集能量晶体，连续收集可触发加速效果！
              </p>
              <img :src="pinyinGameImage" alt="试玩提示" class="ml-auto mt-4 h-20 w-20 rounded-[18px] object-cover shadow-[0_12px_24px_rgba(76,108,168,0.12)]" />
            </div>
          </aside>

          <main class="rounded-[28px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-4 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:p-5">
            <div class="relative overflow-hidden rounded-[24px] border border-[#DCE7F8] bg-[#0F234A] shadow-[0_18px_40px_rgba(37,69,129,0.14)]">
              <img :src="bannerArcade" alt="在线轻试玩场景" class="absolute inset-0 h-full w-full object-cover opacity-95" />
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(17,34,76,0.08)_100%)]"></div>
              <div class="relative aspect-[16/9]">
                <div class="absolute left-6 top-5 flex gap-2">
                  <span class="text-3xl text-[#FF6F8F]">♥</span>
                  <span class="text-3xl text-[#FF6F8F]">♥</span>
                  <span class="text-3xl text-white/70">♥</span>
                </div>

                <button
                  type="button"
                  class="absolute right-6 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#273A63]/86 text-2xl text-white shadow-[0_12px_24px_rgba(16,30,63,0.22)]"
                >
                  ❚❚
                </button>

                <div class="absolute bottom-[26%] left-[16%]">
                  <img :src="pinyinGameImage" alt="角色" class="h-24 w-24 rounded-[20px] object-cover shadow-[0_16px_30px_rgba(41,73,136,0.22)]" />
                </div>

                <div class="absolute bottom-[28%] left-[34%] flex gap-8 text-6xl text-[#77F5FF]">
                  <span>◈</span>
                  <span>◈</span>
                  <span>◈</span>
                  <span>◈</span>
                  <span>◈</span>
                </div>

                <div class="absolute bottom-[22%] right-[10%] text-6xl text-[#FFCA44]">★</div>

                <div class="absolute bottom-0 left-0 right-0 h-20 bg-[linear-gradient(180deg,rgba(12,28,62,0)_0%,rgba(12,28,62,0.66)_100%)]"></div>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-[18px] border border-[#E8EEF8] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(76,108,168,0.04)]">
              <div class="inline-flex items-center gap-2 rounded-full border border-[#E2EAF7] px-4 py-2 text-sm font-semibold text-[#53709A]">
                ✦ 跳跃
                <span class="rounded-full bg-[#F5F8FD] px-2 py-0.5 text-xs">↑ 或 空格</span>
              </div>
              <div class="inline-flex items-center gap-2 rounded-full border border-[#E2EAF7] px-4 py-2 text-sm font-semibold text-[#53709A]">
                ▽ 下蹲 / 滑行
                <span class="rounded-full bg-[#F5F8FD] px-2 py-0.5 text-xs">↓</span>
              </div>
              <div class="inline-flex items-center gap-2 rounded-full border border-[#E2EAF7] px-4 py-2 text-sm font-semibold text-[#53709A]">
                ↻ 重新开始
                <span class="rounded-full bg-[#F5F8FD] px-2 py-0.5 text-xs">R</span>
              </div>
            </div>
          </main>

          <aside class="space-y-4">
            <div class="rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
              <div class="text-base font-semibold text-[#5B6F8D]">当前得分</div>
              <div class="mt-3 text-right text-6xl font-semibold text-[#2F7AF3]">320</div>
            </div>

            <div class="rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
              <div class="text-base font-semibold text-[#5B6F8D]">历史最高分</div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-[#F3B23A]">👑</span>
                <span class="text-5xl font-semibold text-[#3E567A]">1,680</span>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div class="rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
                <div class="text-base font-semibold text-[#5B6F8D]">收集进度</div>
                <div class="mt-4 text-3xl font-semibold text-[#17233D]">16 / 50</div>
              </div>
              <div class="rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
                <div class="text-base font-semibold text-[#5B6F8D]">游戏时长</div>
                <div class="mt-4 text-3xl font-semibold text-[#17233D]">00:32</div>
              </div>
            </div>

            <div class="rounded-[22px] border border-[#E7EEF9] bg-white p-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)]">
              <div class="flex items-center justify-between gap-3">
                <div class="text-base font-semibold text-[#5B6F8D]">今日排行榜</div>
                <router-link to="/games" class="text-sm font-semibold text-[#3B7FF2]">更多榜单 →</router-link>
              </div>

              <div class="mt-4 space-y-3">
                <div
                  v-for="item in rankings"
                  :key="item.rank"
                  class="flex items-center justify-between gap-3 rounded-[14px] px-3 py-2"
                  :class="item.active ? 'bg-[#F4F8FF]' : 'bg-transparent'"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
                      :class="item.rank === 1 ? 'bg-[#FFF1D8] text-[#F0A128]' : item.rank === 2 ? 'bg-[#F2F5FA] text-[#7D8CA3]' : item.rank === 3 ? 'bg-[#FFE9DF] text-[#E57B44]' : 'bg-[#F2F5FA] text-[#7D8CA3]'"
                    >
                      {{ item.rank }}
                    </span>
                    <span class="text-sm font-medium" :class="item.active ? 'text-[#2F7AF3]' : 'text-[#4E6180]'">{{ item.name }}</span>
                  </div>
                  <span class="text-sm font-semibold text-[#667A98]">{{ item.score }}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container-content">
        <div class="grid gap-4 overflow-hidden rounded-[26px] border border-[#E7EEF9] bg-white shadow-[0_16px_34px_rgba(76,108,168,0.07)] md:grid-cols-[repeat(4,minmax(0,1fr))_320px]">
          <div
            v-for="item in tips"
            :key="item.title"
            class="flex items-center gap-4 px-6 py-5"
          >
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl" :class="toneClassMap[item.tone]">
              {{ item.icon }}
            </div>
            <div>
              <div class="text-lg font-semibold text-[#17233D]">{{ item.title }}</div>
              <p class="mt-1 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-[linear-gradient(135deg,#DBEEFF_0%,#F0F8FF_100%)] px-6 py-5">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-[0_12px_24px_rgba(76,108,168,0.08)]">
              🏆
            </div>
            <div>
              <div class="text-xl font-semibold text-[#17233D]">喜欢挑战？</div>
              <p class="mt-2 text-sm leading-7 text-[#61718B]">来游戏中心，发现更多精彩游戏！</p>
              <router-link to="/games" class="mt-3 inline-flex rounded-full bg-[#2F7AF3] px-5 py-2.5 text-sm font-semibold text-white">
                探索游戏中心 →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 pt-8">
      <div class="bg-[linear-gradient(90deg,#DFF6FF_0%,#F4FBFF_52%,#F9FCFF_100%)]">
        <div class="container-content py-8">
          <h2 class="text-3xl font-semibold text-[#17233D]">更多探索</h2>
          <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <router-link
              v-for="item in exploreCards"
              :key="item.title"
              :to="item.to"
              class="flex items-center justify-between rounded-[22px] border border-white/80 bg-white/90 px-6 py-5 shadow-[0_14px_30px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(76,108,168,0.1)]"
            >
              <div class="flex items-center gap-4">
                <span class="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-2xl text-[#4A84F0]">
                  {{ item.icon }}
                </span>
                <div>
                  <div class="text-xl font-semibold text-[#17233D]">{{ item.title }}</div>
                  <div class="mt-1 text-sm text-[#61718B]">{{ item.desc }}</div>
                </div>
              </div>
              <span class="text-[#3B7FF2]">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
