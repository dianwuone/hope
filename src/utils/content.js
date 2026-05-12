import { columns as columnPresentation } from '@/data/articles/columns'

const assetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg,webp,avif,gif}', { eager: true, import: 'default' })
const assetUrlMap = new Map(
  Object.entries(assetModules).map(([key, value]) => [normalizeAssetLookupKey(key), value]),
)

function normalizeAssetLookupKey(value) {
  return value.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\.\.\//, '/src/')
}

function isObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function isAssetLike(value) {
  return typeof value === 'string' && (
    value.includes('/src/assets/')
    || value.startsWith('@/assets/')
    || value.startsWith('../assets/')
    || value.startsWith('./assets/')
  )
}

export function resolveAssetPath(value) {
  if (typeof value !== 'string') return value

  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  const normalized = trimmed
    .replace(/\\/g, '/')
    .replace(/^@\//, '/src/')
    .replace(/^\.\.\//, '/src/')
    .replace(/^\.\//, '/src/')

  return assetUrlMap.get(normalized) || trimmed
}

export function resolveAssetData(value) {
  if (Array.isArray(value)) {
    return value.map((item) => resolveAssetData(item))
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveAssetData(item)]),
    )
  }

  return isAssetLike(value) ? resolveAssetPath(value) : value
}

function formatDate(value) {
  if (!value) return ''
  const raw = `${value}`
  const datePart = raw.includes('T') ? raw.slice(0, 10) : raw
  return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : raw
}

function formatCount(value) {
  const number = Number(value || 0)
  if (!Number.isFinite(number) || number <= 0) return '0'
  if (number >= 10000) return `${(number / 10000).toFixed(1).replace(/\.0$/, '')}w`
  if (number >= 1000) return `${(number / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${number}`
}

function estimateReadingTime(content) {
  const text = `${content || ''}`.replace(/\s+/g, '')
  const minutes = Math.max(1, Math.ceil(text.length / 450))
  return `${minutes} 分钟`
}

function splitParagraphs(content) {
  const text = `${content || ''}`.trim()
  if (!text) return []

  const blocks = text
    .split(/\r?\n\r?\n+/)
    .map((item) => item.split(/\r?\n+/).map((entry) => entry.trim()).filter(Boolean))
    .filter((item) => item.length)

  if (blocks.length) {
    return blocks.map((paragraphs, index) => ({
      title: `第 ${index + 1} 节`,
      paragraphs,
    }))
  }

  return [{ title: '正文', paragraphs: [text] }]
}

function inferSupportStatus(item) {
  if (item.supportStatus) return item.supportStatus
  if (item.projectType === 'lab') return 'beta_apply'
  if (item.projectType === 'game') return 'download'
  if (item.stage === 'coming_soon') return 'wishlist'
  if (item.stage === 'beta') return 'beta_apply'
  return 'download'
}

export function normalizeColumn(item) {
  const presentation = columnPresentation[item?.slug] || {}
  return resolveAssetData({
    id: item?.id,
    slug: item?.slug || '',
    name: item?.name || presentation.name || '',
    title: presentation.title || item?.name || '',
    subtitle: presentation.subtitle || item?.description || '',
    eyebrow: presentation.eyebrow || item?.name || '',
    intro: presentation.intro || item?.description || '',
    banner: presentation.banner || '',
    avatar: presentation.avatar || '',
    author: presentation.author || item?.name || '',
    tags: presentation.tags || [],
    directions: presentation.directions || [],
    accent: presentation.accent || {},
    recommendations: presentation.recommendations || [],
    adSlots: presentation.adSlots || {},
    categoryType: item?.categoryType || '',
    description: item?.description || '',
    sortOrder: item?.sortOrder || 0,
    status: item?.status || '',
  })
}

export function normalizeArticle(item) {
  const column = normalizeColumn(item?.column)
  const tags = (item?.tags || []).map((entry) => entry.name)
  const contentBody = item?.contentBody || ''

  return resolveAssetData({
    id: item?.id,
    slug: item?.slug || '',
    title: item?.title || '',
    summary: item?.summary || '',
    contentBody,
    content: contentBody
      .split(/\r?\n+/)
      .map((entry) => entry.trim())
      .filter(Boolean),
    sections: splitParagraphs(contentBody),
    cover: item?.coverImage || '',
    column: column.slug,
    columnName: column.name,
    category: tags[0] || column.name || '',
    tags,
    publishedAt: formatDate(item?.publishedAt),
    publishedAtRaw: item?.publishedAt || '',
    viewCount: formatCount(item?.viewCount),
    viewCountNumber: Number(item?.viewCount || 0),
    likeCount: Number(item?.likeCount || 0),
    likes: Number(item?.likeCount || 0),
    favoriteCount: Number(item?.favoriteCount || 0),
    favorites: Number(item?.favoriteCount || 0),
    commentCount: Number(item?.commentCount || 0),
    readingTime: estimateReadingTime(contentBody || item?.summary),
    wordCount: `${`${contentBody}`.replace(/\s+/g, '').length} 字`,
    author: item?.authorName || column.author || '',
    authorAvatar: column.avatar || '',
    heroTone: item?.heroTone || 'warm',
  })
}

export function normalizeProject(item) {
  const extra = isObject(item?.extra) ? item.extra : {}

  return resolveAssetData({
    id: item?.id,
    slug: item?.slug || '',
    name: item?.name || '',
    projectType: item?.projectType || '',
    title: item?.title || item?.name || '',
    subtitle: item?.subtitle || '',
    shortDesc: item?.shortDesc || item?.summary || item?.description || '',
    summary: item?.summary || item?.shortDesc || item?.description || '',
    description: item?.description || item?.summary || item?.shortDesc || '',
    cover: item?.coverImage || '',
    banner: item?.bannerImage || item?.coverImage || '',
    status: item?.status || '',
    stage: item?.stage || '',
    supportStatus: inferSupportStatus(item || {}),
    price: item?.price || '',
    originalPrice: item?.originalPrice || '',
    tags: item?.tags || [],
    features: item?.features || [],
    highlights: item?.highlights || [],
    faq: item?.faq || [],
    testimonials: item?.testimonials || [],
    extra,
    detailPage: extra.detailPage || {},
    route: extra.route || '',
    age: extra.age || '',
    category: extra.category || '',
    projects: extra.projects || [],
  })
}

export function normalizeOffer(item) {
  const extra = isObject(item?.extra) ? item.extra : {}

  return resolveAssetData({
    id: item?.id,
    slug: item?.slug || '',
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    category: item?.category || '',
    status: item?.status || '',
    statusTone: item?.statusTone || 'blue',
    price: item?.price || '',
    originalPrice: item?.originalPrice || '',
    banner: item?.bannerImage || '',
    summary: item?.summary || item?.subtitle || '',
    ctaLabel: item?.ctaLabel || '立即购买',
    benefits: item?.benefits || [],
    meta: item?.meta || [],
    extra,
  })
}

export function buildContentCollections(content = {}) {
  const columns = (content.columns || []).map((item) => normalizeColumn(item))
  const tags = (content.tags || []).map((item) => ({
    ...item,
    slug: item?.slug || '',
    name: item?.name || '',
  }))
  const articles = (content.articles || []).map((item) => normalizeArticle(item))
  const projects = (content.projects || []).map((item) => normalizeProject(item))
  const offers = (content.offers || []).map((item) => normalizeOffer(item))
  const ads = resolveAssetData(content.ads || [])

  return {
    columns,
    tags,
    articles,
    projects,
    offers,
    ads,
    products: projects.filter((item) => item.projectType === 'product'),
    games: projects.filter((item) => item.projectType === 'game'),
    labs: projects.filter((item) => item.projectType === 'lab'),
  }
}
