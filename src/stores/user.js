import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { userApi } from '@/api'

const TOKEN_KEY = 'hope-user-token'
const PROFILE_KEY = 'hope-user-profile'

function readProfile() {
  const raw = globalThis.localStorage?.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref(globalThis.localStorage?.getItem(TOKEN_KEY) || '')
  const profile = ref(readProfile())
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value && !!profile.value?.id)
  const displayName = computed(() => profile.value?.nickname || profile.value?.username || '登录')

  function persist(auth) {
    token.value = auth?.token || ''
    profile.value = auth?.user || null
    if (token.value) {
      globalThis.localStorage?.setItem(TOKEN_KEY, token.value)
    } else {
      globalThis.localStorage?.removeItem(TOKEN_KEY)
    }
    if (profile.value) {
      globalThis.localStorage?.setItem(PROFILE_KEY, JSON.stringify(profile.value))
    } else {
      globalThis.localStorage?.removeItem(PROFILE_KEY)
    }
  }

  async function login(payload) {
    loading.value = true
    try {
      const result = await userApi.login(payload)
      persist(result)
      return result
    } finally {
      loading.value = false
    }
  }

  async function register(payload) {
    loading.value = true
    try {
      const result = await userApi.register(payload)
      persist(result)
      return result
    } finally {
      loading.value = false
    }
  }

  async function refreshMe() {
    if (!token.value) return null
    try {
      const result = await userApi.me()
      profile.value = result
      globalThis.localStorage?.setItem(PROFILE_KEY, JSON.stringify(result))
      return result
    } catch {
      logout()
      return null
    }
  }

  function logout() {
    persist(null)
  }

  return {
    token,
    profile,
    loading,
    isLoggedIn,
    displayName,
    login,
    register,
    refreshMe,
    logout,
  }
})
