<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const errorMessage = ref('')
const form = reactive({
  username: '',
  nickname: '',
  email: '',
  password: '',
})

async function submit() {
  errorMessage.value = ''
  try {
    await userStore.register(form)
    router.push('/wishlist')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '注册失败，请稍后重试。'
  }
}
</script>

<template>
  <section class="section-shell">
    <div class="container-content max-w-2xl">
      <div class="rounded-[32px] border border-[#DDE8E0] bg-[linear-gradient(135deg,#F4FAF6_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_40px_rgba(69,93,78,0.08)] md:p-8">
        <div class="text-sm font-semibold tracking-[0.16em] text-[#4F7A65]">CREATE ACCOUNT</div>
        <h1 class="mt-3 font-serif text-4xl text-brand-charcoal">创建你的用户账户</h1>
        <p class="mt-3 text-sm leading-7 text-brand-text">注册后可以持续沉淀你的互动记录，也方便后台做用户维度的运营管理。</p>

        <div class="mt-6 grid gap-4">
          <input v-model="form.username" type="text" placeholder="用户名" class="h-12 rounded-[16px] border border-[#D9E6DE] bg-white px-4 text-sm outline-none" />
          <input v-model="form.nickname" type="text" placeholder="昵称（可选）" class="h-12 rounded-[16px] border border-[#D9E6DE] bg-white px-4 text-sm outline-none" />
          <input v-model="form.email" type="email" placeholder="邮箱" class="h-12 rounded-[16px] border border-[#D9E6DE] bg-white px-4 text-sm outline-none" />
          <input v-model="form.password" type="password" placeholder="密码（至少 6 位）" class="h-12 rounded-[16px] border border-[#D9E6DE] bg-white px-4 text-sm outline-none" />
          <div v-if="errorMessage" class="rounded-[16px] border border-[#F2D2C2] bg-[#FFF3EE] px-4 py-3 text-sm text-[#A95838]">
            {{ errorMessage }}
          </div>
          <button type="button" class="inline-flex h-12 items-center justify-center rounded-full bg-[#4F7A65] text-sm font-semibold text-white transition-colors hover:bg-[#426754]" :disabled="userStore.loading" @click="submit">
            {{ userStore.loading ? '注册中...' : '创建并登录' }}
          </button>
        </div>

        <p class="mt-5 text-sm text-brand-muted">
          已有账户？
          <RouterLink to="/auth/login" class="font-semibold text-[#4F7A65]">去登录</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
