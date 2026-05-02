<script setup>
import { computed, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import { useWishlistStore } from '@/stores/wishlist'

const store = useWishlistStore()
const filter = ref('全部')
const filters = ['全部', '想体验', '想下载', '想内测', '想购买', '已实现']

const filtered = computed(() =>
  filter.value === '全部'
    ? store.items
    : store.items.filter((item) => item.wishState === filter.value)
)
</script>

<template>
  <div>
    <PageHero eyebrow="Wishlist" title="我的心愿单" subtitle="把感兴趣的项目先存起来，后续可继续跟踪状态变化。" compact />
    <section class="section-shell pt-0">
      <div class="container-content">
        <FilterPills v-model="filter" :items="filters" />
        <div v-if="filtered.length" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="item in filtered" :key="item.slug" :product="item" />
        </div>
        <div v-else class="surface-panel mt-8 p-10 text-center text-brand-muted">
          还没有加入任何项目，先去产品中心或实验室看看吧。
        </div>
      </div>
    </section>
  </div>
</template>
