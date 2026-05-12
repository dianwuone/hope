<script setup>
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { wishlistApi } from '@/api'
import { useRequireLogin } from '@/composables/auth'
import { contactInputType, validateContactValue } from '@/utils/contact'
import { useUserStore } from '@/stores/user'

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '心愿单', to: '/wishlist' },
  { label: '提交心愿' },
]

const form = reactive({
  projectName: '',
  category: 'app',
  wishGoal: 'want_try',
  contactType: 'wechat',
  contactValue: '',
  note: '',
})
const userStore = useUserStore()
const { isLoggedIn, profile } = storeToRefs(userStore)
const { ensureLogin } = useRequireLogin()

const isSubmitting = ref(false)
const submitted = ref(false)
const errors = reactive({
  projectName: '',
  contactValue: '',
})

const contactFieldType = computed(() => contactInputType(form.contactType))

const validateForm = () => {
  errors.projectName = form.projectName.trim() ? '' : '请输入项目名称'
  errors.contactValue = validateContactValue(form.contactType, form.contactValue)
  return !errors.projectName && !errors.contactValue
}

const categoryOptions = [
  { value: 'app', label: '应用工具' },
  { value: 'game', label: '游戏娱乐' },
  { value: 'lab', label: '实验项目' },
  { value: 'content', label: '内容 / 资料' },
]

const goalOptions = [
  { value: 'want_try', label: '想体验' },
  { value: 'want_download', label: '想下载' },
  { value: 'want_beta', label: '想内测' },
  { value: 'want_buy', label: '想购买' },
]

const submitForm = async () => {
  if (!ensureLogin('请先登录后再提交心愿')) return
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    await wishlistApi.submitWish({ ...form, userId: profile.value?.id || null })
    submitted.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(198,223,255,0.28),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <section class="relative overflow-hidden border-b border-[#E6EEF9] bg-[radial-gradient(circle_at_72%_18%,rgba(207,231,255,0.3),transparent_18%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <aside class="pt-6">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#66A4FF_0%,#2F7AF3_100%)] text-3xl text-white shadow-[0_18px_34px_rgba(47,122,243,0.24)]">
                ✦
              </div>
              <h1 class="font-serif text-5xl font-semibold text-[#17233D]">提交心愿</h1>
            </div>
            <p class="mt-6 text-2xl leading-10 text-[#5A6E8C]">
              告诉我们你期待的应用、游戏或实验项目，
              我们会把真实需求纳入后续规划。
            </p>

            <div class="mt-8 space-y-4 rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
              <div class="text-xl font-semibold text-[#17233D]">提交后你会获得</div>
              <div class="space-y-3 text-sm leading-7 text-[#61718B]">
                <p>• 你的期待会进入我们的需求池与优先级评估</p>
                <p>• 如果项目启动或进入测试，会优先通知你</p>
                <p>• 同类需求较多时，会在社区中发起进一步讨论</p>
              </div>
            </div>
          </aside>

          <main class="rounded-[28px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:p-8">
            <div v-if="submitted" class="rounded-[24px] border border-[#DCE7F8] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-10 text-center">
              <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF4FF] text-4xl text-[#2F7AF3]">✓</div>
              <h2 class="mt-6 text-3xl font-semibold text-[#17233D]">已收到你的心愿</h2>
              <p class="mt-4 text-base leading-8 text-[#61718B]">
                我们会把这条需求纳入后续规划与优先级评估。若项目进入测试或有更新，会优先通过你留下的联系方式通知。
              </p>
              <div class="mt-8 flex flex-wrap justify-center gap-4">
                <router-link to="/wishlist" class="rounded-[12px] bg-[#2F7AF3] px-6 py-3 text-sm font-semibold text-white">
                  返回心愿单
                </router-link>
                <router-link to="/community" class="rounded-[12px] border border-[#DCE7F8] bg-white px-6 py-3 text-sm font-semibold text-[#38537A]">
                  加入社区
                </router-link>
              </div>
            </div>

            <form v-else class="space-y-6" @submit.prevent="submitForm">
              <div>
                <h2 class="text-3xl font-semibold text-[#17233D]">填写你的期待</h2>
                <p class="mt-3 text-base leading-8 text-[#61718B]">
                  当前已直接接入后端心愿单接口。{{ isLoggedIn ? '你的心愿会关联到当前登录账号。' : '未登录时会按访客方式记录。' }}
                </p>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <label class="block">
                  <span class="text-sm font-semibold text-[#5A6E8C]">项目名称</span>
                  <input
                    v-model="form.projectName"
                    type="text"
                    placeholder="例如：AI 阅读助手 / 亲子桌游 / 实验工具"
                    @blur="errors.projectName = form.projectName.trim() ? '' : '请输入项目名称'"
                    class="mt-3 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 text-sm text-[#17233D] outline-none transition-colors placeholder:text-[#A0AEC2] focus:border-[#2F7AF3]"
                  />
                  <p v-if="errors.projectName" class="mt-2 text-xs text-red-500">{{ errors.projectName }}</p>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold text-[#5A6E8C]">项目类型</span>
                  <select
                    v-model="form.category"
                    class="mt-3 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 text-sm text-[#17233D] outline-none transition-colors focus:border-[#2F7AF3]"
                  >
                    <option v-for="item in categoryOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
                  </select>
                </label>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <label class="block">
                  <span class="text-sm font-semibold text-[#5A6E8C]">你的期待</span>
                  <select
                    v-model="form.wishGoal"
                    class="mt-3 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 text-sm text-[#17233D] outline-none transition-colors focus:border-[#2F7AF3]"
                  >
                    <option v-for="item in goalOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold text-[#5A6E8C]">联系方式类型</span>
                <select
                  v-model="form.contactType"
                  class="mt-3 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 text-sm text-[#17233D] outline-none transition-colors focus:border-[#2F7AF3]"
                >
                    <option value="wechat">微信</option>
                    <option value="email">邮箱</option>
                  </select>
                </label>
              </div>

              <label class="block">
                <span class="text-sm font-semibold text-[#5A6E8C]">联系方式</span>
                <input
                  v-model="form.contactValue"
                  :type="contactFieldType"
                  placeholder="请输入微信号或邮箱"
                  @blur="errors.contactValue = validateContactValue(form.contactType, form.contactValue)"
                  class="mt-3 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 text-sm text-[#17233D] outline-none transition-colors placeholder:text-[#A0AEC2] focus:border-[#2F7AF3]"
                />
                <p v-if="errors.contactValue" class="mt-2 text-xs text-red-500">{{ errors.contactValue }}</p>
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-[#5A6E8C]">补充说明</span>
                <textarea
                  v-model="form.note"
                  rows="6"
                  placeholder="你希望它解决什么问题？你最期待哪些功能？"
                  class="mt-3 w-full rounded-[18px] border border-[#DCE7F8] bg-white px-4 py-4 text-sm leading-7 text-[#17233D] outline-none transition-colors placeholder:text-[#A0AEC2] focus:border-[#2F7AF3]"
                ></textarea>
              </label>

              <div class="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#EAF0F8] bg-[#F8FBFF] px-5 py-4 text-sm text-[#61718B]">
                <span>提交后默认进入“心愿征集”池，当前为前端演示流程。</span>
                <div class="flex gap-3">
                  <router-link to="/wishlist" class="rounded-[12px] border border-[#DCE7F8] bg-white px-5 py-3 font-semibold text-[#38537A]">
                    返回心愿单
                  </router-link>
                  <button
                    type="submit"
                    class="rounded-[12px] bg-[#2F7AF3] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(47,122,243,0.18)] transition-colors hover:bg-[#2168DE] disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isSubmitting || !form.projectName.trim() || !form.contactValue.trim()"
                  >
                    {{ isSubmitting ? '提交中...' : '提交我的心愿' }}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>
