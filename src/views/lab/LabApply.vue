<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/site/PageHero.vue'
import { getLabBySlug } from '@/data'

const route = useRoute()
const lab = computed(() => getLabBySlug(route.params.slug) || getLabBySlug('tools'))
</script>

<template>
  <div>
    <PageHero eyebrow="Beta Apply" :title="`报名加入${lab.name}`" subtitle="提交你的使用场景和期待，我们会优先邀请适合的体验者进入内测。" compact />
    <section class="section-shell">
      <div class="container-reading">
        <div class="surface-panel p-8">
          <div class="grid gap-4">
            <input type="text" placeholder="你的昵称" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <input type="email" placeholder="邮箱 / 微信" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <textarea rows="5" placeholder="你希望解决什么问题？" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue"></textarea>
            <button type="button" class="btn-primary justify-center">提交申请</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
