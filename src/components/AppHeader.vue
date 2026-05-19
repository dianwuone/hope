<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useSiteStore } from '@/stores/site'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const siteStore = useSiteStore()
const userStore = useUserStore()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isAboutPage = computed(() => route.name === 'About')
const {
  mainNavData: mainNav,
  siteMetaData: siteMeta,
} = storeToRefs(siteStore)
const { isLoggedIn, displayName, profile } = storeToRefs(userStore)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 16
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

function logout() {
  userStore.logout()
  router.push('/')
}
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
          <span class="font-serif text-lg font-bold">启</span>
        </div>
        <div class="min-w-0">
          <div
            class="truncate font-semibold"
            :class="isAboutPage ? 'text-lg tracking-[0.08em] text-[#3F2E23]' : 'text-sm tracking-[0.2em] text-brand-charcoal'"
          >
            {{ siteMeta.name || '启鸣随笔' }}
          </div>
          <div class="truncate text-xs" :class="isAboutPage ? 'text-[#9A7C62]' : 'text-brand-muted'">
            {{ siteMeta.tagline || siteMeta.description || '记录育儿、职场与个人成长' }}
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
        <div v-if="isLoggedIn" class="hidden items-center gap-2 md:flex">
          <router-link
            to="/user/profile"
            class="rounded-full border px-3 py-2 text-sm"
            :class="isAboutPage ? 'border-[#E9D7C2] text-[#5A4638] hover:bg-[#FFF0DE]' : 'border-brand-grey text-brand-text hover:bg-brand-warm'"
          >
            {{ displayName }}
          </router-link>
          <button
            type="button"
            class="rounded-full px-3 py-2 text-sm"
            :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
            @click="logout"
          >
            退出
          </button>
        </div>
        <div v-else class="hidden items-center gap-1 md:flex">
          <router-link
            to="/auth/login"
            class="rounded-full px-3 py-2 text-sm"
            :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
          >
            登录
          </router-link>
          <router-link
            to="/auth/register"
            class="rounded-full px-3 py-2 text-sm"
            :class="isAboutPage ? 'text-[#6F5847] hover:bg-[#FFF0DE]' : 'text-brand-text hover:bg-brand-warm'"
          >
            注册
          </router-link>
        </div>

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
          <template v-if="!isLoggedIn">
            <router-link
              to="/auth/login"
              class="block rounded-2xl px-4 py-3 text-sm transition-colors"
              :class="isAboutPage ? 'hover:bg-[#FFF0DE] hover:text-[#C67741]' : 'hover:bg-brand-warm'"
              @click="isMobileMenuOpen = false"
            >
              登录
            </router-link>
            <router-link
              to="/auth/register"
              class="block rounded-2xl px-4 py-3 text-sm transition-colors"
              :class="isAboutPage ? 'hover:bg-[#FFF0DE] hover:text-[#C67741]' : 'hover:bg-brand-warm'"
              @click="isMobileMenuOpen = false"
            >
              注册
            </router-link>
          </template>
          <div
            v-else
            class="rounded-2xl px-4 py-3 text-sm sm:col-span-2"
            :class="isAboutPage ? 'bg-[#FFF0DE] text-[#5A4638]' : 'bg-brand-warm text-brand-charcoal'"
          >
            <div>当前用户：{{ profile?.nickname || profile?.username }}</div>
            <router-link to="/user/profile" class="mt-2 inline-flex text-xs font-semibold underline underline-offset-4">
              进入个人中心
            </router-link>
          </div>
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
