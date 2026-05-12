<script setup>
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import FaqList from '@/components/site/FaqList.vue'
import { getLabBySlug } from '@/data'
import { betaApi } from '@/api'
import { useRequireLogin } from '@/composables/auth'
import { contactInputType, validateContactValue } from '@/utils/contact'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { ensureLogin } = useRequireLogin()
const { profile, isLoggedIn } = storeToRefs(userStore)
const lab = computed(() => getLabBySlug(route.params.slug) || getLabBySlug('tools'))

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '实验室', to: '/lab' },
  { label: lab.value.name, to: `/lab/${lab.value.slug}` },
  { label: '内测报名' },
])

const form = reactive({
  name: '',
  contactType: 'wechat',
  contactValue: '',
  city: '',
  role: 'explorer',
  note: '',
})

const submitting = ref(false)
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
  if (!ensureLogin('请先登录后再提交内测申请')) return
  if (!validateForm()) return
  submitting.value = true
  try {
    await betaApi.apply({
      userId: profile.value?.id || null,
      project_id: lab.value.slug,
      source_page: 'lab',
      role_type: form.role,
      name: form.name,
      contact_type: form.contactType,
      contact_value: form.contactValue,
      city: form.city,
      experience_note: form.note,
      status: 'pending',
    })
    submitted.value = true
  } finally {
    submitting.value = false
  }
}

const faq = [
  { q: '多久会通知结果？', a: '一般会在 1-3 个工作日内通过你留下的联系方式通知。' },
  { q: '没有城市会影响报名吗？', a: '不会，城市仅用于了解用户分布。' },
  { q: '可以同时加入心愿单吗？', a: '可以，适合先标记期待，再等待内测。' },
]
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(196,223,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <section class="border-b border-[#E6EEF9] bg-[linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />
        <div class="max-w-[900px]">
          <div class="inline-flex rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#2F7AF3]">Beta Apply</div>
          <h1 class="mt-5 font-serif text-5xl font-semibold text-[#17233D]">报名加入 {{ lab.title }}</h1>
          <p class="mt-5 text-lg leading-8 text-[#61718B]">提交你的使用场景和期待，我们会优先邀请适合的体验者进入内测。</p>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main class="rounded-[28px] border border-[#E7EEF9] bg-white p-6 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:p-8">
          <div v-if="submitted" class="rounded-[24px] border border-[#DCE7F8] bg-[#F8FBFF] p-10 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">✓</div>
            <h2 class="mt-6 text-3xl font-semibold text-[#17233D]">已收到申请</h2>
            <p class="mt-4 text-base leading-8 text-[#61718B]">我们会在 1-3 个工作日内通过你留下的联系方式通知结果。</p>
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <router-link to="/community" class="btn-primary">加入社区</router-link>
              <router-link :to="`/lab/${lab.slug}`" class="btn-outline">返回实验室</router-link>
            </div>
          </div>

          <form v-else class="space-y-6" @submit.prevent="submit">
            <div>
              <h2 class="text-3xl font-semibold text-[#17233D]">填写报名信息</h2>
              <p class="mt-3 text-base leading-8 text-[#61718B]">该页为内测承接页，后续可直接接入 `beta_applications`。</p>
              <p v-if="isLoggedIn" class="mt-2 text-sm text-[#5B7A68]">当前已登录，申请记录会自动关联到你的账号。</p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <label class="block">
                <div class="text-sm font-semibold text-[#5A6E8C]">姓名或昵称</div>
                <input v-model="form.name" type="text" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]" @blur="errors.name = form.name.trim() ? '' : '请输入姓名或昵称'" />
                <p v-if="errors.name" class="mt-2 text-xs text-red-500">{{ errors.name }}</p>
              </label>
              <label class="block">
                <div class="text-sm font-semibold text-[#5A6E8C]">城市</div>
                <input v-model="form.city" type="text" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]" />
              </label>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <label class="block">
                <div class="text-sm font-semibold text-[#5A6E8C]">联系方式类型</div>
                <select v-model="form.contactType" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]">
                  <option value="wechat">微信</option>
                  <option value="email">邮箱</option>
                  <option value="phone">电话</option>
                </select>
              </label>
              <label class="block">
                <div class="text-sm font-semibold text-[#5A6E8C]">联系方式值</div>
                <input v-model="form.contactValue" :type="contactFieldType" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]" @blur="errors.contactValue = validateContactValue(form.contactType, form.contactValue)" />
                <p v-if="errors.contactValue" class="mt-2 text-xs text-red-500">{{ errors.contactValue }}</p>
              </label>
            </div>

            <label class="block">
              <div class="text-sm font-semibold text-[#5A6E8C]">申请角色</div>
              <select v-model="form.role" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]">
                <option value="explorer">explorer</option>
                <option value="co_creator">co_creator</option>
                <option value="parent">parent</option>
                <option value="efficiency_user">efficiency_user</option>
              </select>
            </label>

            <label class="block">
              <div class="text-sm font-semibold text-[#5A6E8C]">场景说明</div>
              <textarea v-model="form.note" rows="6" class="mt-2 w-full rounded-[18px] border border-[#DCE7F8] bg-white px-4 py-4 outline-none focus:border-[#2F7AF3]"></textarea>
            </label>

            <div class="flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-[#F8FBFF] px-5 py-4 text-sm text-[#61718B]">
              <span>提交后会以 pending 状态进入内测申请池。</span>
              <div class="flex gap-3">
                <router-link to="/community" class="rounded-[12px] border border-[#DCE7F8] bg-white px-5 py-3 font-semibold text-[#38537A]">加入社区</router-link>
                <button type="submit" class="rounded-[12px] bg-[#2F7AF3] px-6 py-3 font-semibold text-white disabled:opacity-60" :disabled="submitting || !form.name.trim() || !form.contactValue.trim()">
                  {{ submitting ? '提交中...' : '提交申请' }}
                </button>
              </div>
            </div>
          </form>
        </main>

        <aside class="space-y-5">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">流程说明</div>
            <div class="mt-4 space-y-3 text-sm leading-7 text-[#61718B]">
              <p>• 提交后进入内测申请池</p>
              <p>• 我们会优先邀请匹配场景的体验者</p>
              <p>• 内测信息会通过填写的联系方式通知</p>
            </div>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">FAQ</div>
            <div class="mt-5">
              <FaqList :items="faq" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
