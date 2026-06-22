<script setup>
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import PageHero from '@/components/site/PageHero.vue'
import FaqList from '@/components/site/FaqList.vue'
import { communityPage, homePage } from '@/data'
import { communityApi } from '@/api'
import { useRequireLogin } from '@/composables/auth'
import { contactInputType, validateContactValue } from '@/utils/contact'
import { useSiteStore } from '@/stores/site'
import { useUserStore } from '@/stores/user'

const siteStore = useSiteStore()
const userStore = useUserStore()
const { ensureLogin } = useRequireLogin()
const {
  contactEmailData: contactEmail,
  communityWechatData: communityWechat,
  error: siteError,
} = storeToRefs(siteStore)
const { profile, isLoggedIn } = storeToRefs(userStore)
const communityPageData = computed(() => siteStore.pageData('community', communityPage))
const communityQrCode = computed(() => siteStore.siteConfigValue('community_qr_code', homePage.community.qr))

const form = reactive({
  name: '',
  contactType: 'wechat',
  contactValue: '',
  intent: 'latest_updates',
  message: '',
})

const submitted = ref(false)
const errors = reactive({
  name: '',
  contactValue: '',
})

const contactFieldType = computed(() => contactInputType(form.contactType))

const validateForm = () => {
  errors.name = form.name.trim() ? '' : '请输入姓名或昵称'
  errors.contactValue = validateContactValue(form.contactType, form.contactValue)
  return !errors.name && !errors.contactValue
}

const submit = async () => {
  if (!ensureLogin('请先登录后再提交留言')) return
  if (!validateForm()) return
  await communityApi.submitLead({ ...form, userId: profile.value?.id || null })
  submitted.value = true
}

const intents = [
  { value: 'latest_updates', label: '关注最新动态' },
  { value: 'co_create', label: '进一步了解产品' },
  { value: 'contact_me', label: '联系作者' },
]
</script>

<template>
  <div>
    <PageHero eyebrow="Community" :title="communityPageData.title" :subtitle="communityPageData.subtitle" :image="communityPageData.banner || communityPage.banner" image-alt="联系页头图" />

    <section class="section-shell pt-0">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">这里可以帮你做什么</h2>
          <div v-if="siteError" class="mt-4 rounded-[14px] border border-[#F3D3D3] bg-[#FFF7F7] px-4 py-3 text-sm text-[#B24C4C]">
            站点配置加载失败：{{ siteError }}
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div v-for="item in communityPageData.benefits" :key="item" class="info-card p-4 text-sm text-brand-text">{{ item }}</div>
          </div>
          <div class="info-card mt-8 p-5">
            <h3 class="text-xl font-semibold text-[#17233D]">直接联系</h3>
            <div class="mt-4 text-sm leading-7 text-[#61718B]">
              <p>微信：{{ communityWechat || '暂未配置' }}</p>
              <p>邮箱：{{ contactEmail || '暂未配置' }}</p>
            </div>
          </div>
        </div>

        <div class="surface-panel p-8 text-center">
          <img :src="communityQrCode" alt="微信联系二维码" class="mx-auto h-56 w-56 rounded-xl object-cover" />
          <p class="mt-4 text-sm text-brand-text">扫码添加微信</p>
          <p class="mt-2 text-sm text-brand-muted">长按识别，备注来意即可</p>
        </div>
      </div>
    </section>

    <section class="section-shell bg-white">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">留言表单</h2>
          <p v-if="isLoggedIn" class="mt-3 text-sm text-brand-muted">当前已登录，提交的线索会关联到你的用户账号。</p>
          <div v-if="submitted" class="success-card mt-6 p-6 text-center text-brand-text">已收到你的联系信息，我会尽快回复。</div>
          <form v-else class="mt-6 space-y-4" @submit.prevent="submit">
            <div class="grid gap-4 md:grid-cols-2">
              <label class="block">
                <div class="field-label mb-2">你的姓名 / 昵称</div>
                <input v-model="form.name" type="text" placeholder="例如：Quentin" class="field-control" @blur="errors.name = form.name.trim() ? '' : '请输入姓名或昵称'" />
                <p v-if="errors.name" class="mt-2 text-xs text-red-500">{{ errors.name }}</p>
              </label>
              <label class="block">
                <div class="field-label mb-2">联系方式类型</div>
                <select v-model="form.contactType" class="field-control">
                  <option value="wechat">微信</option>
                  <option value="email">邮箱</option>
                </select>
              </label>
            </div>
            <label class="block">
              <div class="field-label mb-2">联系方式</div>
              <input v-model="form.contactValue" :type="contactFieldType" placeholder="请输入微信号或邮箱" class="field-control" @blur="errors.contactValue = validateContactValue(form.contactType, form.contactValue)" />
              <p v-if="errors.contactValue" class="mt-2 text-xs text-red-500">{{ errors.contactValue }}</p>
            </label>
            <label class="block">
              <div class="field-label mb-2">你的来意</div>
              <select v-model="form.intent" class="field-control">
                <option v-for="item in intents" :key="item.value" :value="item.value">{{ item.label }}</option>
              </select>
            </label>
            <label class="block">
              <div class="field-label mb-2">补充说明</div>
              <textarea v-model="form.message" rows="5" placeholder="想对我说的话" class="field-textarea"></textarea>
            </label>
            <button type="submit" class="btn-primary w-full justify-center">提交留言</button>
          </form>
        </div>

        <div class="surface-panel p-8">
          <h2 class="text-2xl font-semibold text-brand-charcoal">FAQ</h2>
          <FaqList :items="communityPageData.faq || communityPage.faq" />
        </div>
      </div>
    </section>
  </div>
</template>
