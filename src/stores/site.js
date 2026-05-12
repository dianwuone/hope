import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { siteApi } from '@/api'
import { buildContentCollections, resolveAssetData } from '@/utils/content'

function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function createEmptySiteMeta() {
  return {
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
}

function createDefaultBootstrap() {
  return {
    siteMeta: createEmptySiteMeta(),
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
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => normalizeText(item))
    .filter(Boolean)
}

function normalizeSiteMeta(value) {
  const siteMeta = resolveAssetData(value)
  const base = createEmptySiteMeta()

  if (!isRecord(siteMeta)) {
    return base
  }

  return {
    ...base,
    ...siteMeta,
    beian: {
      ...base.beian,
      ...(isRecord(siteMeta.beian) ? siteMeta.beian : {}),
    },
  }
}

function normalizeNavItems(value) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => resolveAssetData(item))
    .map((item) => {
      if (!isRecord(item)) return null

      const name = normalizeText(item.name || item.title)
      const path = normalizeText(item.path || item.to || item.href)
      if (!name || !path) return null

      return {
        ...item,
        name,
        path,
      }
    })
    .filter(Boolean)
}

function normalizeFooterSections(value) {
  if (!Array.isArray(value)) return []

  return value
    .map((section) => resolveAssetData(section))
    .map((section, index) => {
      if (!isRecord(section)) return null

      const title = normalizeText(section.title) || `section-${index + 1}`
      const links = normalizeNavItems(section.links)
      if (!links.length) return null

      return {
        ...section,
        title,
        links,
      }
    })
    .filter(Boolean)
}

function normalizeSocialLinks(value) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => resolveAssetData(item))
    .map((item) => {
      if (!isRecord(item)) return null

      const name = normalizeText(item.name || item.label)
      const href = normalizeText(item.href || item.url)
      if (!name) return null

      return {
        ...item,
        name,
        href,
      }
    })
    .filter(Boolean)
}

function normalizeBootstrapPayload(result) {
  const payload = createDefaultBootstrap()
  const site = isRecord(result?.site) ? result.site : {}

  payload.siteMeta = normalizeSiteMeta(site.siteMeta)
  payload.mainNav = normalizeNavItems(site.mainNav)
  payload.footerSections = normalizeFooterSections(site.footerSections)
  payload.socialLinks = normalizeSocialLinks(site.socialLinks)
  payload.articleCategories = normalizeStringList(resolveAssetData(site.articleCategories))
  payload.articleHotTopics = normalizeStringList(resolveAssetData(site.articleHotTopics))
  payload.contactEmail = normalizeText(site.contactEmail)
  payload.communityWechat = normalizeText(site.communityWechat)
  payload.siteConfigs = isRecord(site.siteConfigs) ? resolveAssetData(site.siteConfigs) : {}
  payload.pages = isRecord(result?.pages) ? resolveAssetData(result.pages) : {}
  payload.content = isRecord(result?.content) ? resolveAssetData(result.content) : payload.content
  payload.pageConfigs = Array.isArray(result?.pageConfigs) ? resolveAssetData(result.pageConfigs) : []

  return payload
}

export const useSiteStore = defineStore('site', () => {
  const bootstrap = ref(createDefaultBootstrap())
  const isLoading = ref(false)
  const error = ref('')
  const contentCollections = computed(() => buildContentCollections(bootstrap.value.content || {}))

  const siteMetaData = computed(() => normalizeSiteMeta(bootstrap.value.siteMeta))
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
      bootstrap.value = normalizeBootstrapPayload(result)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载站点配置失败'
      bootstrap.value = createDefaultBootstrap()
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
