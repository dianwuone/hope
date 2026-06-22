<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { getLabBySlug } from '@/data'

const route = useRoute()
const lab = computed(() => getLabBySlug(route.params.slug) || getLabBySlug('tools'))

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '实验室', to: '/lab' },
  { label: lab.value.name },
])

const timeline = computed(() =>
  lab.value.slug === 'tools'
    ? [
        { title: '需求收集', desc: '先把高频效率痛点收进原型池' },
        { title: '原型验证', desc: '快速验证信息流与操作路径' },
        { title: '灰度内测', desc: '邀请少量用户参与真实测试' },
        { title: '持续迭代', desc: '按反馈优化核心链路' },
      ]
    : [
        { title: '概念探索', desc: '围绕亲子互动和学习习惯做方向验证' },
        { title: '关卡试验', desc: '把玩法拆成更轻的学习节奏' },
        { title: '内测准备', desc: '收集真实家庭的试用反馈' },
        { title: '版本打磨', desc: '迭代出更稳定的体验' },
      ]
)

const prototypes = computed(() => [
  lab.value.cover,
  lab.value.banner,
  lab.value.cover,
])

const faq = computed(() => [
  { q: '这个项目现在处于什么阶段？', a: `当前为 ${lab.value.title} 的探索阶段，持续更新中。` },
  { q: '怎么参与内测？', a: '可点击申请内测按钮提交信息，后续会通知适合的体验者。' },
  { q: '我能先加入心愿单吗？', a: '可以，适合先记录期待、再决定是否参与试用。' },
])
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(196,223,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <PageHero eyebrow="Lab Detail" :title="lab.title" :subtitle="lab.subtitle" :image="lab.cover" :image-alt="lab.name">
      <div class="mt-6 flex flex-wrap gap-3">
        <router-link to="/wishlist" class="btn-outline">加入心愿单</router-link>
        <router-link :to="`/lab/${lab.slug}/apply`" class="btn-primary">申请内测</router-link>
      </div>
    </PageHero>

    <section class="section-shell pt-0">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="surface-panel p-8">
          <div class="flex items-center gap-3">
            <span class="rounded-full bg-[#EEF4FF] px-3 py-1 text-sm font-semibold text-[#2F7AF3]">项目介绍</span>
            <span class="rounded-full bg-[#F4F7FC] px-3 py-1 text-sm font-semibold text-[#7384A0]">阶段：{{ lab.slug === 'tools' ? '原型中' : '内测准备' }}</span>
          </div>
          <p class="mt-5 text-base leading-8 text-brand-text">{{ lab.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in lab.tags" :key="tag" class="badge-grey">{{ tag }}</span>
          </div>
        </div>

        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">适合谁</h2>
          <div class="mt-5 space-y-3 text-sm leading-7 text-brand-text">
            <p>• 关注 AI 效率、工作流与模板复用的用户</p>
            <p>• 想提前了解产品方向、并愿意提供真实反馈的体验者</p>
            <p>• 愿意持续关注项目进展和阶段更新的人</p>
          </div>
          <router-link :to="`/lab/${lab.slug}/apply`" class="btn-primary mt-6">申请内测</router-link>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">开发路线</h2>
          <div class="mt-6 space-y-5">
            <div v-for="item in timeline" :key="item.title" class="border-l-2 border-accent-blue/30 pl-4">
              <div class="text-base font-semibold text-brand-charcoal">{{ item.title }}</div>
              <p class="mt-2 text-sm leading-7 text-brand-text">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">原型预览</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-3">
            <img v-for="(item, index) in prototypes" :key="`${item}-${index}`" :src="item" :alt="lab.name" class="aspect-[16/10] w-full rounded-[18px] object-cover" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-reading">
        <h2 class="text-center text-3xl font-semibold text-brand-charcoal">常见问题</h2>
        <div class="mt-8">
          <FaqList :items="faq" />
        </div>
      </div>
    </section>
  </div>
</template>
