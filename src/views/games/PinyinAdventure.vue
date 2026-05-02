<script setup>
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { playPage } from '@/data'

const faq = [
  { q: '适合什么年龄段？', a: '更适合 4-8 岁启蒙阶段的孩子，用短时互动降低开始门槛。' },
  { q: '是否必须下载？', a: '当前页面以展示和轻试玩入口为主，后续会逐步补充更多玩法。' },
]
</script>

<template>
  <div>
    <PageHero eyebrow="Game Detail" title="拼音大冒险" subtitle="把拼音练习变成可参与、可重复、可获得即时反馈的小冒险。" :image="playPage.banner" image-alt="拼音大冒险" />
    <section class="section-shell">
      <div class="container-content grid gap-6 md:grid-cols-3">
        <div class="card">
          <h3 class="text-xl font-semibold text-brand-charcoal">短时反馈</h3>
          <p class="mt-3 text-sm leading-7 text-brand-text">每次练习都尽量在短时间内给出明确反馈，让孩子更愿意继续。</p>
        </div>
        <div class="card">
          <h3 class="text-xl font-semibold text-brand-charcoal">视觉化进度</h3>
          <p class="mt-3 text-sm leading-7 text-brand-text">用角色、关卡和道具代替纯文本练习，增强参与感。</p>
        </div>
        <div class="card">
          <h3 class="text-xl font-semibold text-brand-charcoal">家庭陪伴</h3>
          <p class="mt-3 text-sm leading-7 text-brand-text">支持家长作为引导者参与，而不是单向督促式练习。</p>
        </div>
      </div>
    </section>
    <section class="section-shell bg-white">
      <div class="container-reading">
        <FaqList :items="faq" />
      </div>
    </section>
  </div>
</template>
