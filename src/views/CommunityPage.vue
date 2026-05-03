<script setup>
import { reactive, ref } from 'vue'
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { communityPage, homePage } from '@/data'
import { communityApi } from '@/api'

const form = reactive({
  name: '',
  contactType: 'wechat',
  contactValue: '',
  intent: 'latest_updates',
  message: '',
})

const submitted = ref(false)

const submit = async () => {
  if (!form.name.trim() || !form.contactValue.trim()) return
  await communityApi.submitLead({ ...form })
  submitted.value = true
}

const intents = [
  { value: 'latest_updates', label: '关注最新动态' },
  { value: 'co_create', label: '一起共创' },
  { value: 'contact_me', label: '联系作者' },
]
</script>

<template>
  <div>
    <PageHero eyebrow="Community" :title="communityPage.title" :subtitle="communityPage.subtitle" :image="communityPage.banner" image-alt="加入社区" />

    <section class="section-shell pt-0">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">加入后你会获得什么</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div v-for="item in communityPage.benefits" :key="item" class="rounded-card bg-brand-warm p-4 text-sm text-brand-text">{{ item }}</div>
          </div>
          <div class="mt-8 rounded-[18px] border border-[#E8EEF8] bg-white p-5">
            <h3 class="text-xl font-semibold text-[#17233D]">直接联系</h3>
            <div class="mt-4 text-sm leading-7 text-[#61718B]">
              <p>微信：{{ homePage.community.qr ? '二维码识别加入' : 'hello' }}</p>
              <p>邮箱：hello@example.com</p>
            </div>
          </div>
        </div>

        <div class="surface-panel p-8 text-center">
          <img :src="homePage.community.qr" alt="加入社区二维码" class="mx-auto h-56 w-56 rounded-xl object-cover" />
          <p class="mt-4 text-sm text-brand-text">扫码加入微信</p>
          <p class="mt-2 text-sm text-brand-muted">长按识别，发送“加入社区”</p>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">留言表单</h2>
          <div v-if="submitted" class="mt-6 rounded-[18px] bg-[#F8FBFF] p-6 text-center text-brand-text">已收到你的联系信息，我们会尽快回复。</div>
          <form v-else class="mt-6 space-y-4" @submit.prevent="submit">
            <div class="grid gap-4 md:grid-cols-2">
              <input v-model="form.name" type="text" placeholder="你的姓名 / 昵称" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
              <select v-model="form.contactType" class="rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue">
                <option value="wechat">微信</option>
                <option value="email">邮箱</option>
              </select>
            </div>
            <input v-model="form.contactValue" type="text" placeholder="联系方式值" class="w-full rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue" />
            <select v-model="form.intent" class="w-full rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue">
              <option v-for="item in intents" :key="item.value" :value="item.value">{{ item.label }}</option>
            </select>
            <textarea v-model="form.message" rows="5" placeholder="想对我说的话" class="w-full rounded-2xl border border-brand-grey px-4 py-3 outline-none focus:border-accent-blue"></textarea>
            <button type="submit" class="btn-primary w-full justify-center">提交留言</button>
          </form>
        </div>

        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">FAQ</h2>
          <FaqList :items="communityPage.faq" />
        </div>
      </div>
    </section>
  </div>
</template>
