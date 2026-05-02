<script setup>
import ProductCard from '@/components/ProductCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import PageHero from '@/components/site/PageHero.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import FilterPills from '@/components/site/FilterPills.vue'
import { homePage } from '@/data'
</script>

<template>
  <div>
    <PageHero
      :eyebrow="homePage.hero.badge"
      :title="homePage.hero.title"
      :subtitle="homePage.hero.subtitle"
      :image="homePage.hero.visual"
      image-alt="首页主视觉"
    >
      <div class="mt-8 flex flex-wrap gap-3">
        <router-link
          v-for="action in homePage.hero.actions"
          :key="action.to"
          :to="action.to"
          :class="action.variant === 'primary' ? 'btn-primary' : 'btn-outline'"
        >
          {{ action.label }}
        </router-link>
      </div>
      <div class="mt-10 grid gap-4 sm:grid-cols-3">
        <div v-for="stat in homePage.hero.stats" :key="stat.label" class="surface-panel p-4">
          <div class="text-2xl font-semibold text-brand-charcoal">{{ stat.value }}</div>
          <div class="mt-1 text-sm text-brand-muted">{{ stat.label }}</div>
        </div>
      </div>
    </PageHero>

    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="surface-panel p-6 md:p-8">
          <SectionTitle eyebrow="Explore" title="探索主题" subtitle="让用户能从内容和场景角度快速进入网站结构。" />
          <div class="mt-6">
            <FilterPills :items="homePage.exploreTags" model-value="" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <SectionTitle eyebrow="Products" title="核心产品" subtitle="围绕个人管理、育儿陪伴与 AI 提效，构成网站最核心的产品入口。" align="center" />
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="product in homePage.products" :key="product.slug" :product="product" />
        </div>
      </div>
    </section>

    <section class="section-shell pt-0">
      <div class="container-content">
        <div class="overflow-hidden rounded-panel bg-gradient-to-br from-accent-blue-dark via-accent-blue to-lab p-8 text-white shadow-hero md:p-10">
          <div class="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div>
              <div class="eyebrow !border-white/10 !bg-white/10 !text-gold-light">限时招募</div>
              <h2 class="mt-4 font-serif text-3xl md:text-4xl">{{ homePage.tryOffer.title }}</h2>
              <p class="mt-4 max-w-2xl text-white/80">{{ homePage.tryOffer.subtitle }}</p>
              <div class="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <span v-for="item in homePage.tryOffer.benefits" :key="item">{{ item }}</span>
              </div>
            </div>
            <div class="space-y-4 rounded-card bg-white/10 p-6 backdrop-blur">
              <div class="text-sm text-white/70">当前价格</div>
              <div class="flex items-end gap-3">
                <span class="text-4xl font-semibold">{{ homePage.tryOffer.price }}</span>
                <span class="text-sm text-white/45 line-through">{{ homePage.tryOffer.originalPrice }}</span>
              </div>
              <router-link to="/try" class="btn-white w-full justify-center">立即加入</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content">
        <SectionTitle eyebrow="Articles" title="最新内容" subtitle="用文章承接品牌表达，让产品之外的价值也能被持续看见。" />
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <ArticleCard v-for="article in homePage.featuredArticles" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <SectionTitle eyebrow="Interactive" title="互动体验区" subtitle="把下载、试玩和实时感知模块做成更轻量的参与入口。" />
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <router-link
            v-for="card in homePage.interactiveCards"
            :key="card.title"
            :to="card.to"
            class="card flex h-full flex-col"
          >
            <div class="mb-4 h-12 w-12 rounded-2xl bg-accent-soft"></div>
            <h3 class="text-xl font-semibold text-brand-charcoal">{{ card.title }}</h3>
            <p class="mt-3 flex-1 text-sm leading-7 text-brand-text">{{ card.desc }}</p>
            <span class="mt-5 text-sm font-semibold text-accent-blue">查看详情 →</span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content">
        <SectionTitle eyebrow="Lab" title="实验室" subtitle="探索下一步可能的产品方向，并把不确定的想法公开出来。" />
        <div class="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
          <router-link v-for="lab in homePage.labs" :key="lab.slug" :to="`/lab/${lab.slug}`" class="card overflow-hidden !p-0">
            <img :src="lab.cover" :alt="lab.name" class="aspect-[4/3] w-full object-cover" />
            <div class="p-6">
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in lab.tags" :key="tag" class="badge-purple">{{ tag }}</span>
              </div>
              <h3 class="mt-4 text-xl font-semibold text-brand-charcoal">{{ lab.name }}</h3>
              <p class="mt-3 text-sm leading-7 text-brand-text">{{ lab.description }}</p>
            </div>
          </router-link>
          <div class="surface-panel p-6">
            <h3 class="text-xl font-semibold text-brand-charcoal">正在开发中</h3>
            <div class="mt-5 space-y-4">
              <div v-for="item in ['AI 写作助手', '亲子共读 App', '更多游戏内容', '轻量知识整理台']" :key="item" class="flex items-center justify-between gap-4">
                <span class="text-sm text-brand-text">{{ item }}</span>
                <span class="badge-grey">规划中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content">
        <div class="overflow-hidden rounded-panel bg-brand-charcoal text-white shadow-hero">
          <div class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div class="p-8 md:p-10">
              <SectionTitle
                eyebrow="Community"
                :title="homePage.community.title"
                :subtitle="homePage.community.subtitle"
                class="text-white"
              />
              <div class="mt-6 flex flex-wrap gap-3">
                <span v-for="item in homePage.community.benefits" :key="item" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  {{ item }}
                </span>
              </div>
              <router-link to="/community" class="btn-white mt-8">了解更多</router-link>
            </div>
            <div class="flex items-center justify-center p-8">
              <div class="rounded-card bg-white p-4 text-center text-brand-charcoal">
                <img :src="homePage.community.qr" alt="社区二维码" class="h-48 w-48 rounded-xl object-cover" />
                <div class="mt-3 text-sm font-medium">扫码加入微信</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
