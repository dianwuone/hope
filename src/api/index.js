import {
  products,
  getProductBySlug,
  articles,
  getArticleBySlug,
  labs,
  getLabBySlug,
  tryOffers,
  openSourcePage,
  siteMeta,
  mainNav,
  footerSections,
  socialLinks,
  articleCategories,
  articleHotTopics,
} from '@/data'

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:4100').replace(/\/$/, '')

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && `${value}` !== '') {
      url.searchParams.set(key, value)
    }
  })
  return url.toString()
}

async function requestJson(path, { method = 'GET', params, data } = {}) {
  const response = await fetch(buildUrl(path, params), {
    method,
    headers: data ? { 'Content-Type': 'application/json' } : undefined,
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(message || `Request failed: ${response.status}`)
  }

  return response.json()
}

async function requestWithFallback(requester, fallback) {
  try {
    return await requester()
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback
  }
}

function pickItems(result, fallbackItems = []) {
  return {
    items: result?.items ?? fallbackItems,
    total: result?.total ?? fallbackItems.length,
  }
}

function buildBootstrapFallback() {
  return {
    site: {
      siteMeta,
      mainNav,
      footerSections,
      socialLinks,
      articleCategories,
      articleHotTopics,
    },
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

export const siteApi = {
  bootstrap: () =>
    requestWithFallback(
      () => requestJson('/api/bootstrap'),
      buildBootstrapFallback,
    ),
}

export const projectApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/api/projects', { params }),
      () => pickItems({ items: products }, products),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/api/projects/${encodeURIComponent(slug)}`),
      () => getProductBySlug(slug),
    ),
}

export const productApi = {
  list: (params = {}) => projectApi.list({ ...params, projectType: params.projectType || 'product' }),
  get: (slug) => projectApi.get(slug),
}

export const articleApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/api/articles', { params }),
      () => {
        const query = params.q?.toLowerCase?.() || ''
        const tag = params.tag
        const column = params.column
        const items = articles.filter((item) => {
          const matchesQuery =
            !query
            || item.title.toLowerCase().includes(query)
            || item.summary.toLowerCase().includes(query)
            || item.tags.some((entry) => entry.toLowerCase().includes(query))
          const matchesTag = !tag || item.tags.includes(tag) || item.category === tag
          const matchesColumn = !column || item.column === column
          return matchesQuery && matchesTag && matchesColumn
        })
        return pickItems({ items }, items)
      },
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/api/articles/${encodeURIComponent(slug)}`),
      () => getArticleBySlug(slug),
    ),
}

export const offerApi = {
  list: () =>
    requestWithFallback(
      () => requestJson('/api/offers'),
      () => pickItems({ items: tryOffers }, tryOffers),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/api/offers/${encodeURIComponent(slug)}`),
      () => tryOffers.find((item) => item.slug === slug),
    ),
}

export const wishlistApi = {
  list: () => requestWithFallback(() => requestJson('/api/wishlist/summary'), () => []),
  add: (projectId) => requestWithFallback(() => Promise.resolve({ ok: true, projectId }), () => ({ ok: true, projectId })),
  remove: (id) => requestWithFallback(() => Promise.resolve({ ok: true, id }), () => ({ ok: true, id })),
  submitWish: async (data) => {
    const visitorId = globalThis.localStorage?.getItem('hope-visitor-id') || `guest-${Date.now()}`
    globalThis.localStorage?.setItem('hope-visitor-id', visitorId)
    return requestJson('/api/wishlist', {
      method: 'POST',
      data: {
        visitorId,
        projectSlug: data.projectSlug || '',
        projectName: data.projectName || '',
        category: data.category || '',
        wishState: data.wishState || data.wishGoal || 'want_try',
        sourcePage: data.sourcePage || 'wishlist',
        contactType: data.contactType || '',
        contactValue: data.contactValue || '',
        note: data.note || '',
        isActive: true,
      },
    })
  },
}

export const orderApi = {
  create: (data) =>
    Promise.resolve({
      id: `${Date.now()}`,
      status: 'created',
      ...data,
    }),
  get: (id) => Promise.resolve({ id, status: 'paid' }),
}

export const communityApi = {
  submitLead: (data) =>
    requestJson('/api/community-leads', {
      method: 'POST',
      data: {
        leadType: data.leadType || 'community',
        intentReason: data.intentReason || data.intent || 'latest_updates',
        name: data.name || '',
        contactType: data.contactType || 'wechat',
        contactValue: data.contactValue || '',
        message: data.message || '',
      },
    }),
}

export const betaApi = {
  apply: (data) =>
    requestJson('/api/beta-applications', {
      method: 'POST',
      data: {
        projectSlug: data.projectSlug || data.project_id || '',
        sourcePage: data.sourcePage || data.source_page || 'lab',
        roleType: data.roleType || data.role_type || 'explorer',
        name: data.name || '',
        contactType: data.contactType || data.contact_type || 'wechat',
        contactValue: data.contactValue || data.contact_value || '',
        city: data.city || '',
        experienceNote: data.experienceNote || data.experience_note || '',
        status: data.status || 'pending',
      },
    }),
}

export const searchApi = {
  search: async (query, filters = {}) => {
    const q = query || ''
    const [articleResult, productResult, labResult, offerResult] = await Promise.all([
      articleApi.list({ q, ...filters }),
      productApi.list(),
      projectApi.list({ projectType: 'lab' }),
      offerApi.list(),
    ])

    return {
      articles: articleResult.items,
      products: productResult.items.filter((item) => item.name?.includes(q) || item.summary?.includes(q)),
      labs: labResult.items.filter((item) => item.name?.includes(q) || item.description?.includes(q)),
      offers: offerResult.items.filter((item) => item.title?.includes(q)),
      openSource: openSourcePage.projects.filter((item) => item.name.includes(q)),
    }
  },
}

export const labApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/api/projects', { params: { ...params, projectType: 'lab' } }),
      () => pickItems({ items: labs }, labs),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/api/projects/${encodeURIComponent(slug)}`),
      () => getLabBySlug(slug),
    ),
}
