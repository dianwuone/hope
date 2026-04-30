import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSiteStore = defineStore('site', () => {
  // 全站配置
  const config = ref({
    heroTitle: 'QUENTIN WINDOW',
    heroSubtitle: '独立开发者的窗口 — 产品、内容与实验',
    contactEmail: '',
    communityWechat: '',
  })

  // 加载状态
  const isLoading = ref(false)

  return { config, isLoading }
})
