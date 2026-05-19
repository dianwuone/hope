<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { userApi } from '@/api'

const router = useRouter()
const loading = ref(false)
const sendingCode = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const captchaSvg = ref('')
const codeCountdown = ref(0)
const form = reactive({
  account: '',
  email: '',
  emailCode: '',
  newPassword: '',
  captchaKey: '',
  captchaCode: '',
})

const captchaImage = computed(() =>
  captchaSvg.value ? `data:image/svg+xml;utf8,${encodeURIComponent(captchaSvg.value)}` : '',
)

async function refreshCaptcha() {
  const result = await userApi.getCaptcha('frontend')
  form.captchaKey = result.captchaKey || ''
  form.captchaCode = ''
  captchaSvg.value = result.captchaSvg || ''
}

function startCodeCountdown(seconds = 60) {
  codeCountdown.value = seconds
  const timer = window.setInterval(() => {
    codeCountdown.value -= 1
    if (codeCountdown.value <= 0) {
      window.clearInterval(timer)
      codeCountdown.value = 0
    }
  }, 1000)
}

async function sendCode() {
  sendingCode.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const result = await userApi.sendResetPasswordCode(form)
    successMessage.value = result?.message || '邮箱验证码已发送，请查收邮件。'
    startCodeCountdown()
    await refreshCaptcha()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '验证码发送失败，请稍后重试。'
    await refreshCaptcha()
  } finally {
    sendingCode.value = false
  }
}

async function submit() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const result = await userApi.resetPassword(form)
    successMessage.value = result?.message || '密码已重置，请使用新密码登录。'
    setTimeout(() => {
      router.push('/auth/login')
    }, 1200)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '找回密码失败，请稍后重试。'
    await refreshCaptcha()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<template>
  <section class="section-shell">
    <div class="container-content max-w-2xl">
      <div class="rounded-[32px] border border-[#E6DDF0] bg-[linear-gradient(135deg,#F8F4FF_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_40px_rgba(90,76,122,0.08)] md:p-8">
        <div class="text-sm font-semibold tracking-[0.16em] text-[#7A5AC8]">RESET PASSWORD</div>
        <h1 class="mt-3 font-serif text-4xl text-brand-charcoal">找回你的密码</h1>
        <p class="mt-3 text-sm leading-7 text-brand-text">
          先通过图形验证码发送邮箱验证码，再输入邮箱验证码和新密码完成重置。
        </p>

        <div class="mt-6 grid gap-4">
          <input v-model="form.account" type="text" placeholder="用户名或邮箱" class="h-12 rounded-[16px] border border-[#DDD5F0] bg-white px-4 text-sm outline-none" />
          <input v-model="form.email" type="email" placeholder="注册时填写的邮箱" class="h-12 rounded-[16px] border border-[#DDD5F0] bg-white px-4 text-sm outline-none" />

          <div class="grid gap-3 md:grid-cols-[1fr_140px]">
            <input v-model="form.captchaCode" type="text" maxlength="8" placeholder="请输入验证码" class="h-12 rounded-[16px] border border-[#DDD5F0] bg-white px-4 text-sm outline-none" />
            <button type="button" class="flex h-12 items-center justify-center overflow-hidden rounded-[16px] border border-[#DDD5F0] bg-white" @click="refreshCaptcha">
              <img v-if="captchaImage" :src="captchaImage" alt="验证码" class="h-full w-full object-cover" />
              <span v-else class="text-xs text-brand-muted">加载中</span>
            </button>
          </div>

          <button
            type="button"
            class="inline-flex h-12 items-center justify-center rounded-full border border-[#7A5AC8] bg-white text-sm font-semibold text-[#7A5AC8] transition-colors hover:bg-[#F6F1FF] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="sendingCode || codeCountdown > 0"
            @click="sendCode"
          >
            {{ sendingCode ? '发送中...' : codeCountdown > 0 ? `${codeCountdown}s 后重发` : '发送邮箱验证码' }}
          </button>

          <input v-model="form.emailCode" type="text" maxlength="6" placeholder="邮箱验证码（6 位数字）" class="h-12 rounded-[16px] border border-[#DDD5F0] bg-white px-4 text-sm outline-none" />
          <input v-model="form.newPassword" type="password" placeholder="新密码（至少 6 位）" class="h-12 rounded-[16px] border border-[#DDD5F0] bg-white px-4 text-sm outline-none" />

          <div v-if="successMessage" class="rounded-[16px] border border-[#CFE7D2] bg-[#EEF9F0] px-4 py-3 text-sm text-[#2E7D43]">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="rounded-[16px] border border-[#F2D2C2] bg-[#FFF3EE] px-4 py-3 text-sm text-[#A95838]">
            {{ errorMessage }}
          </div>

          <button type="button" class="inline-flex h-12 items-center justify-center rounded-full bg-[#7A5AC8] text-sm font-semibold text-white transition-colors hover:bg-[#6948bb]" :disabled="loading" @click="submit">
            {{ loading ? '提交中...' : '重置密码' }}
          </button>
        </div>

        <div class="mt-5 flex flex-wrap gap-4 text-sm text-brand-muted">
          <span>
            想起密码了？
            <RouterLink to="/auth/login" class="font-semibold text-[#7A5AC8]">返回登录</RouterLink>
          </span>
          <span>
            还没有账户？
            <RouterLink to="/auth/register" class="font-semibold text-[#7A5AC8]">去注册</RouterLink>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
