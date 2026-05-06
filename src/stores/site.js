import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { siteApi } from '@/api'
import { siteMeta, mainNav, footerSections, socialLinks, articleCategories, articleHotTopics } from '@/data'

const defaultBootstrap = {
  siteMeta,
  mainNav,
  footerSections,
  socialLinks,
  articleCategories,
  articleHotTopics,
  pages: {},
  content: {},
  pageConfigs: [],
}

export const useSiteStore = defineStore('site', () => {
  const bootstrap = ref(defaultBootstrap)
  const isLoading = ref(false)
  const error = ref('')

  const siteMetaData = computed(() => bootstrap.value.siteMeta || siteMeta)
  const mainNavData = computed(() => bootstrap.value.mainNav || mainNav)
  const footerSectionsData = computed(() => bootstrap.value.footerSections || footerSections)
  const socialLinksData = computed(() => bootstrap.value.socialLinks || socialLinks)
  const articleCategoriesData = computed(() => bootstrap.value.articleCategories || articleCategories)
  const articleHotTopicsData = computed(() => bootstrap.value.articleHotTopics || articleHotTopics)

  const loadBootstrap = async () => {
    if (isLoading.value) return bootstrap.value
    isLoading.value = true
    error.value = ''
    try {
      const result = await siteApi.bootstrap()
      bootstrap.value = {
        siteMeta: result?.site?.siteMeta || siteMeta,
        mainNav: result?.site?.mainNav || mainNav,
        footerSections: result?.site?.footerSections || footerSections,
        socialLinks: result?.site?.socialLinks || socialLinks,
        articleCategories: result?.site?.articleCategories || articleCategories,
        articleHotTopics: result?.site?.articleHotTopics || articleHotTopics,
        pages: result?.pages || {},
        content: result?.content || {},
        pageConfigs: result?.pageConfigs || [],
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载站点配置失败'
      bootstrap.value = { ...defaultBootstrap, pages: {}, content: {}, pageConfigs: [] }
    } finally {
      isLoading.value = false
    }
    return bootstrap.value
  }

  return {
    bootstrap,
    isLoading,
    error,
    siteMetaData,
    mainNavData,
    footerSectionsData,
    socialLinksData,
    articleCategoriesData,
    articleHotTopicsData,
    loadBootstrap,
  }
})
