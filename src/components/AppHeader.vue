<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '昆廷笔记', path: '/columns/kunting' },
  { name: '启鸣宝宝', path: '/columns/qiming' },
  { name: '产品中心', path: '/products' },
  { name: '游戏中心', path: '/games' },
  { name: '快来尝鲜', path: '/try' },
  { name: '实验室', path: '/lab' },
  { name: '关于', path: '/about' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent',
    ]"
  >
    <nav class="container-content flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 font-bold text-lg">
        <span class="text-accent-blue">Q</span>
        <span>QUENTIN WINDOW</span>
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-sm text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          active-class="!text-brand-charcoal font-medium"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <router-link to="/search" class="p-2 hover:bg-brand-grey/30 rounded-lg" aria-label="搜索">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </router-link>
        <router-link to="/wishlist" class="p-2 hover:bg-brand-grey/30 rounded-lg" aria-label="心愿单">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </router-link>

        <!-- Mobile Menu Toggle -->
        <button
          class="lg:hidden p-2 hover:bg-brand-grey/30 rounded-lg"
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

    <!-- Mobile Menu -->
    <transition name="menu">
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-brand-grey/30">
        <div class="container-content py-4 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2.5 rounded-lg text-sm hover:bg-brand-grey/20 transition-colors"
            active-class="!bg-accent-blue/10 !text-accent-blue-dark font-medium"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-16"></div>
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
