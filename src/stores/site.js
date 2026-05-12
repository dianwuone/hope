import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { siteApi } from '@/api'
import { buildContentCollections, resolveAssetData } from '@/utils/content'

const emptySiteMeta = {
  name: '',
  titleSuffix: '',
  tagline: '',
  description: '',
  copyright: '',
  beian: {
    label: '',
    href: '',
  },
}

const defaultBootstrap = {
  siteMeta: emptySiteMeta,
  mainNav: [],
  footerSections: [],
  socialLinks: [],
  articleCategories: [],
  articleHotTopics: [],
  contactEmail: '',
  communityWechat: '',
  siteConfigs: {},
  pages: {},
  content: {
    columns: [],
    tags: [],
    articles: [],
    projects: [],
    offers: [],
    ads: [],
  },
  pageConfigs: [],
}

export const useSiteStore = defineStore('site', () => {
  const bootstrap = ref(defaultBootstrap)
  const isLoading = ref(false)
  const error = ref('')
  const contentCollections = computed(() => buildContentCollections(bootstrap.value.content || {}))

  const siteMetaData = computed(() => bootstrap.value.siteMeta || emptySiteMeta)
  const mainNavData = computed(() => bootstrap.value.mainNav || [])
  const footerSectionsData = computed(() => bootstrap.value.footerSections || [])
  const socialLinksData = computed(() => bootstrap.value.socialLinks || [])
  const articleCategoriesData = computed(() => bootstrap.value.articleCategories || [])
  const articleHotTopicsData = computed(() => bootstrap.value.articleHotTopics || [])
  const contactEmailData = computed(() => bootstrap.value.contactEmail || '')
  const communityWechatData = computed(() => bootstrap.value.communityWechat || '')
  const siteConfigsData = computed(() => bootstrap.value.siteConfigs || {})
  const columnsData = computed(() => contentCollections.value.columns)
  const tagsData = computed(() => contentCollections.value.tags)
  const articlesData = computed(() => contentCollections.value.articles)
  const projectsData = computed(() => contentCollections.value.projects)
  const productsData = computed(() => contentCollections.value.products)
  const gamesData = computed(() => contentCollections.value.games)
  const labsData = computed(() => contentCollections.value.labs)
  const offersData = computed(() => contentCollections.value.offers)
  const adsData = computed(() => contentCollections.value.ads)

  const pageData = (pageKey, fallback = {}) =>
    resolveAssetData({
      ...fallback,
      ...(bootstrap.value.pages?.[pageKey] || {}),
    })

  const siteConfigValue = (configKey, fallback = '') => {
    const value = siteConfigsData.value[configKey]
    return value === undefined || value === null || value === ''
      ? resolveAssetData(fallback)
      : resolveAssetData(value)
  }

  const articleBySlug = (slug) => articlesData.value.find((item) => item.slug === slug)
  const productBySlug = (slug) => productsData.value.find((item) => item.slug === slug)
  const gameBySlug = (slug) => gamesData.value.find((item) => item.slug === slug)
  const labBySlug = (slug) => labsData.value.find((item) => item.slug === slug)
  const offerBySlug = (slug) => offersData.value.find((item) => item.slug === slug)
  const columnBySlug = (slug) => columnsData.value.find((item) => item.slug === slug)

  const loadBootstrap = async () => {
    if (isLoading.value) return bootstrap.value
    isLoading.value = true
    error.value = ''
    try {
      const result = await siteApi.bootstrap()
      if (!result?.site) {
        throw new Error('站点配置接口未返回有效数据')
      }
      bootstrap.value = {
        siteMeta: resolveAssetData(result?.site?.siteMeta ?? emptySiteMeta),
        mainNav: resolveAssetData(result?.site?.mainNav ?? []),
        footerSections: resolveAssetData(result?.site?.footerSections ?? []),
        socialLinks: resolveAssetData(result?.site?.socialLinks ?? []),
        articleCategories: resolveAssetData(result?.site?.articleCategories ?? []),
        articleHotTopics: resolveAssetData(result?.site?.articleHotTopics ?? []),
        contactEmail: result?.site?.contactEmail || '',
        communityWechat: result?.site?.communityWechat || '',
        siteConfigs: resolveAssetData(result?.site?.siteConfigs || {}),
        pages: resolveAssetData(result?.pages || {}),
        content: resolveAssetData(result?.content || {}),
        pageConfigs: resolveAssetData(result?.pageConfigs || []),
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载站点配置失败'
      bootstrap.value = { ...defaultBootstrap, siteConfigs: {}, pages: {}, content: {}, pageConfigs: [] }
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
    contactEmailData,
    communityWechatData,
    siteConfigsData,
    columnsData,
    tagsData,
    articlesData,
    projectsData,
    productsData,
    gamesData,
    labsData,
    offersData,
    adsData,
    pageData,
    siteConfigValue,
    articleBySlug,
    productBySlug,
    gameBySlug,
    labBySlug,
    offerBySlug,
    columnBySlug,
    loadBootstrap,
  }
})
