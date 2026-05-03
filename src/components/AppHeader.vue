<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { mainNav } from '@/data'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isAboutPage = computed(() => route.name === 'About')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 16
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
      isAboutPage
        ? (isScrolled
          ? 'border-[#EAD9C4] bg-[#FFF9F0]/94 shadow-[0_10px_30px_rgba(140,102,58,0.08)] backdrop-blur-xl'
          : 'border-[#F0E0CD] bg-[#FFF9F0]/90 backdrop-blur-xl')
        : (isScrolled
          ? 'border-brand-grey/70 bg-white/90 shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-white/75 backdrop-blur-xl'),
    ]"
  >
    <nav
      class="container-content flex items-center justify-between gap-6"
      :class="isAboutPage ? 'py-3.5' : 'py-4'"
    >
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border shadow-sm"
          :class="isAboutPage ? 'border-[#D4A878] bg-[#FFF5E8] text-[#B17A49]' : 'border-transparent bg-accent-soft text-accent-blue-dark'"
        >
          <span class="font-serif text-lg font-bold">Q</span>
        </div>
        <div class="min-w-0">
          <div
            class="truncate font-semibold"
            :class="isAboutPage ? 'text-lg tracking-[0.08em] text-[#3F2E23]' : 'text-sm tracking-[0.2em] text-brand-charcoal'"
          >
            QUENTIN WINDOW
          </div>
          <div class="truncate text-xs" :class="isAboutPage ? 'text-[#9A7C62]' : 'text-brand-muted'">
            用户产品与热爱，让生活更美好
          </div>
        </div>
      </router-link>

      <div class="hidden xl:flex items-center gap-1">
        <router-link
          v-for="item in mainNav"
          :key="item.path"
          :to="item.path"
          class="rounded-full px-3 py-2 text-sm transition-colors"
          :class="isAboutPage ? 'text-[#5A4638] hover:bg-[#FFF0DE] hover:text-[#C67741]' : 'text-brand-text hover:bg-accent-soft hover:text-accent-blue'"
          :active-class="isAboutPage ? '!bg-[#FFF0DE] !text-[#C67741] !font-semibold' : '!bg-accent-soft !text-accent-blue !font-semibold'"
        >
          {{ item.name }}
        </router-link>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/search"
          class="rounded-full p-2"
          :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
          aria-label="搜索"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </router-link>
        <router-link
          to="/wishlist"
          class="hidden rounded-full p-2 md:inline-flex"
          :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
          aria-label="心愿单"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </router-link>
        <router-link
          to="/try"
          class="hidden md:inline-flex"
          :class="isAboutPage ? 'rounded-[10px] bg-[#C97545] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B76739]' : 'btn-primary'"
        >
          快来尝鲜
        </router-link>

        <button
          class="xl:hidden rounded-full p-2"
          :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="菜单"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <transition name="menu">
      <div
        v-if="isMobileMenuOpen"
        class="border-t xl:hidden"
        :class="isAboutPage ? 'border-[#E9D7C2] bg-[#FFF9F0]' : 'border-brand-grey/60 bg-white'"
      >
        <div class="container-content grid gap-2 py-4 sm:grid-cols-2">
          <router-link
            v-for="item in mainNav"
            :key="item.path"
            :to="item.path"
            class="block rounded-2xl px-4 py-3 text-sm transition-colors"
            :class="isAboutPage ? 'hover:bg-[#FFF0DE] hover:text-[#C67741]' : 'hover:bg-brand-warm'"
            :active-class="isAboutPage ? '!bg-[#FFF0DE] !text-[#C67741] !font-medium' : '!bg-accent-soft !text-accent-blue-dark !font-medium'"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <router-link
            to="/try"
            class="mt-1 justify-center sm:col-span-2"
            :class="isAboutPage ? 'inline-flex rounded-[12px] bg-[#C97545] px-5 py-3 text-sm font-semibold text-white' : 'btn-primary'"
            @click="isMobileMenuOpen = false"
          >
            成为体验官
          </router-link>
        </div>
      </div>
    </transition>
  </header>

  <div class="h-[88px]"></div>
</template>

<style scoped>
.menu-enter-active, .menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
