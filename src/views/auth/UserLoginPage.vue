<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { userApi } from '@/api'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const errorMessage = ref('')
const captchaSvg = ref('')
const showCaptcha = ref(false)
const form = reactive({
  account: '',
  password: '',
  captchaKey: '',
  captchaCode: '',
})

const captchaImage = computed(() =>
  captchaSvg.value ? `data:image/svg+xml;utf8,${encodeURIComponent(captchaSvg.value)}` : '',
)

function getDetail(error) {
  return error?.detail || null
}

async function refreshCaptcha(forceShow = false) {
  const result = await userApi.getCaptcha('frontend')
  form.captchaKey = result.captchaKey || ''
  form.captchaCode = ''
  captchaSvg.value = result.captchaSvg || ''
  if (forceShow) showCaptcha.value = true
}

async function submit() {
  errorMessage.value = ''
  try {
    await userStore.login(form)
    router.push(`${route.query.redirect || '/wishlist'}`)
  } catch (error) {
    const detail = getDetail(error)
    if (detail?.captchaRequired || detail?.captcha) {
      showCaptcha.value = true
    }
    if (detail?.captcha) {
      form.captchaKey = detail.captcha.captchaKey || ''
      form.captchaCode = ''
      captchaSvg.value = detail.captcha.captchaSvg || ''
    } else if (showCaptcha.value) {
      await refreshCaptcha(true)
    }
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请稍后重试。'
  }
}

onMounted(() => {
  refreshCaptcha(false)
})
</script>

<template>
  <section class="section-shell">
    <div class="container-content max-w-2xl">
      <div class="rounded-[32px] border border-[#EEDFD0] bg-[linear-gradient(135deg,#FFF8F1_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_40px_rgba(98,77,55,0.08)] md:p-8">
        <div class="text-sm font-semibold tracking-[0.16em] text-[#C67642]">USER ACCESS</div>
        <h1 class="mt-3 font-serif text-4xl text-brand-charcoal">登录你的账户</h1>
        <p class="mt-3 text-sm leading-7 text-brand-text">登录后可以把点赞、收藏、评论和心愿单稳定关联到你的账号。</p>

        <div class="mt-6 grid gap-4">
          <input v-model="form.account" type="text" placeholder="用户名或邮箱" class="h-12 rounded-[16px] border border-[#E9D9C8] bg-white px-4 text-sm outline-none" />
          <input v-model="form.password" type="password" placeholder="密码" class="h-12 rounded-[16px] border border-[#E9D9C8] bg-white px-4 text-sm outline-none" />
          <div v-if="showCaptcha" class="grid gap-3 md:grid-cols-[1fr_140px]">
            <input v-model="form.captchaCode" type="text" maxlength="8" placeholder="请输入验证码" class="h-12 rounded-[16px] border border-[#E9D9C8] bg-white px-4 text-sm outline-none" />
            <button type="button" class="flex h-12 items-center justify-center overflow-hidden rounded-[16px] border border-[#E9D9C8] bg-white" @click="refreshCaptcha(true)">
              <img v-if="captchaImage" :src="captchaImage" alt="验证码" class="h-full w-full object-cover" />
              <span v-else class="text-xs text-brand-muted">加载中</span>
            </button>
          </div>
          <div v-if="errorMessage" class="rounded-[16px] border border-[#F2D2C2] bg-[#FFF3EE] px-4 py-3 text-sm text-[#A95838]">
            {{ errorMessage }}
          </div>
          <button type="button" class="inline-flex h-12 items-center justify-center rounded-full bg-[#D9733A] text-sm font-semibold text-white transition-colors hover:bg-[#c76530]" :disabled="userStore.loading" @click="submit">
            {{ userStore.loading ? '登录中...' : '立即登录' }}
          </button>
        </div>

        <p class="mt-5 text-sm text-brand-muted">
          还没有账户？
          <RouterLink to="/auth/register" class="font-semibold text-[#C67642]">去注册</RouterLink>
        </p>
        <p class="mt-2 text-sm text-brand-muted">
          忘记密码？
          <RouterLink to="/auth/forgot-password" class="font-semibold text-[#C67642]">找回密码</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
