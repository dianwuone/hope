<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import { products } from '@/data'

const filter = ref('全部')
const filters = ['全部', 'AI 提效', '个人管理', '育儿陪伴', '创作工具', '效率工具']

const filteredProducts = computed(() =>
  filter.value === '全部'
    ? products
    : products.filter((item) => item.tags.includes(filter.value))
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Products"
      title="更聪明的工具，更从容的生活"
      subtitle="围绕个人效率、育儿陪伴与 AI 提效构建统一产品矩阵。"
      :image="products[0].banner"
      image-alt="产品中心"
    />
    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="surface-panel p-6 md:p-8">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div class="text-lg font-semibold text-brand-charcoal">场景探索</div>
              <p class="mt-2 text-sm text-brand-text">让列表页支持未来后台动态增减内容，而不是写死三个卡片。</p>
            </div>
            <FilterPills v-model="filter" :items="filters" />
          </div>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="product in filteredProducts" :key="product.slug" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>
