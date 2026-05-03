<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { footerSections, siteMeta } from '@/data'

const route = useRoute()
const isAboutPage = computed(() => route.name === 'About')
</script>

<template>
  <footer
    :class="isAboutPage ? 'border-t border-[#E8D7C3] bg-[linear-gradient(180deg,#FFF8EE_0%,#FFF6EA_100%)] text-[#705847]' : 'mt-section bg-brand-charcoal text-white/80'"
  >
    <div class="container-content" :class="isAboutPage ? 'py-10' : 'py-16'">
      <template v-if="isAboutPage">
        <div class="grid gap-8 xl:grid-cols-[1.1fr_repeat(4,minmax(0,0.72fr))_1.12fr]">
          <div>
            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A878] bg-[#FFF4E5] text-[#B17A49] shadow-[0_10px_20px_rgba(167,122,73,0.08)]">
                <span class="font-serif text-lg font-bold">Q</span>
              </div>
              <div>
                <div class="text-lg font-semibold tracking-[0.08em] text-[#433024]">{{ siteMeta.name }}</div>
                <div class="text-xs text-[#9A7C62]">用户产品与热爱，让生活更美好。</div>
              </div>
            </div>

            <p class="mt-4 max-w-[260px] text-sm leading-7 text-[#8A7463]">
              这里是昆廷的窗口，也是你我的入口。
            </p>

            <div class="mt-5 flex gap-3 text-[#A27E60]">
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/86 shadow-[0_8px_18px_rgba(143,101,55,0.06)]">✦</span>
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/86 shadow-[0_8px_18px_rgba(143,101,55,0.06)]">✉</span>
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/86 shadow-[0_8px_18px_rgba(143,101,55,0.06)]">⌂</span>
            </div>
          </div>

          <div v-for="section in footerSections" :key="section.title">
            <h4 class="mb-4 text-sm font-semibold text-[#5A4333]">{{ section.title }}</h4>
            <ul class="space-y-2.5">
              <li v-for="link in section.links.slice(0, 4)" :key="link.path">
                <router-link :to="link.path" class="text-sm text-[#8B7462] transition-colors hover:text-[#C67741]">
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="rounded-[20px] border border-[#E9D8C5] bg-white/82 p-5 shadow-[0_14px_30px_rgba(143,101,55,0.06)]">
            <h4 class="text-base font-semibold text-[#5A4333]">获取最新更新</h4>
            <p class="mt-2 text-sm leading-6 text-[#8A7463]">输入你的邮箱，获取产品更新与精选内容</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_88px]">
              <input
                type="email"
                placeholder="你的邮箱"
                class="h-11 rounded-[10px] border border-[#E8D4BF] bg-white px-4 text-sm text-[#5A4333] outline-none placeholder:text-[#B39A86] focus:border-[#D38B56]"
              />
              <button type="button" class="h-11 rounded-[10px] bg-[#C97545] text-sm font-semibold text-white transition-colors hover:bg-[#B96738]">
                订阅
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-[#EADCCB] pt-5 text-center text-xs text-[#9A7C62]">
          © 2026 QUENTIN WINDOW. All rights reserved.
        </div>
      </template>

      <template v-else>
        <div class="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div>
            <div class="mb-4 text-lg font-bold tracking-[0.2em] text-white">{{ siteMeta.name }}</div>
            <p class="max-w-sm text-sm leading-relaxed text-white/50">
              一个独立开发者的产品与内容窗口。探索 AI、生产力、育儿与教育的更多可能。
            </p>
            <div class="mt-6">
              <router-link to="/subscribe" class="btn-white">订阅更新</router-link>
            </div>
          </div>

          <div v-for="section in footerSections" :key="section.title">
            <h4 class="mb-4 text-sm font-medium text-white">{{ section.title }}</h4>
            <ul class="space-y-2.5">
              <li v-for="link in section.links" :key="link.path">
                <router-link
                  :to="link.path"
                  class="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs text-white/30">
            &copy; {{ new Date().getFullYear() }} {{ siteMeta.copyright }}
            <a
              :href="siteMeta.beian.href"
              target="_blank"
              rel="noreferrer"
              class="ml-2 hover:text-white/60"
            >
              {{ siteMeta.beian.label }}
            </a>
          </p>
          <div class="flex gap-4">
            <router-link to="/privacy" class="text-xs text-white/40 hover:text-white/70">隐私政策</router-link>
            <router-link to="/terms" class="text-xs text-white/40 hover:text-white/70">服务条款</router-link>
            <router-link to="/sitemap" class="text-xs text-white/40 hover:text-white/70">网站地图</router-link>
            <a href="#" class="text-white/30 hover:text-white/60 transition-colors" aria-label="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </template>
    </div>
  </footer>
</template>
