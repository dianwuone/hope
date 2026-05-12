import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export function useRequireLogin() {
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  const redirectTarget = computed(() => {
    const query = new URLSearchParams()
    Object.entries(route.query || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item))
      } else if (value != null && `${value}` !== '') {
        query.set(key, `${value}`)
      }
    })
    const queryString = query.toString()
    return `${route.path}${queryString ? `?${queryString}` : ''}${route.hash || ''}`
  })

  function ensureLogin(message = '请先登录后再提交') {
    if (isLoggedIn.value) return true
    if (typeof window !== 'undefined') {
      window.alert(message)
    }
    router.push({
      path: '/auth/login',
      query: { redirect: redirectTarget.value },
    })
    return false
  }

  return { ensureLogin }
}
