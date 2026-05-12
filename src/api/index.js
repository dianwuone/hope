const DEFAULT_API_BASE = import.meta.env.DEV ? 'http://127.0.0.1:4100' : '/api'
const API_BASE = (import.meta.env.VITE_API_BASE || DEFAULT_API_BASE).replace(/\/$/, '')
const ENABLE_API_FALLBACK = import.meta.env.VITE_ENABLE_API_FALLBACK === 'true'

function resolveApiBase() {
  if (/^https?:\/\//i.test(API_BASE) || API_BASE.startsWith('//')) {
    return API_BASE
  }

  const prefix = API_BASE.startsWith('/') ? API_BASE : `/${API_BASE}`
  return `${window.location.origin}${prefix}`.replace(/\/$/, '')
}

function buildUrl(path, params = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${resolveApiBase()}${normalizedPath}`)
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
  } catch (error) {
    if (!ENABLE_API_FALLBACK) {
      throw error
    }
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
      siteMeta: {},
      mainNav: [],
      footerSections: [],
      socialLinks: [],
      articleCategories: [],
      articleHotTopics: [],
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
      () => requestJson('/bootstrap'),
      buildBootstrapFallback,
    ),
}

export const projectApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/projects', { params }),
      () => pickItems({ items: [] }, []),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/projects/${encodeURIComponent(slug)}`),
      () => null,
    ),
}

export const productApi = {
  list: (params = {}) => projectApi.list({ ...params, projectType: params.projectType || 'product' }),
  get: (slug) => projectApi.get(slug),
}

export const articleApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/articles', { params }),
      () => {
        return pickItems({ items: [] }, [])
      },
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/articles/${encodeURIComponent(slug)}`),
      () => null,
    ),
}

export const offerApi = {
  list: () =>
    requestWithFallback(
      () => requestJson('/offers'),
      () => pickItems({ items: [] }, []),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/offers/${encodeURIComponent(slug)}`),
      () => null,
    ),
}

export const wishlistApi = {
  list: () => requestWithFallback(() => requestJson('/wishlist/summary'), () => []),
  add: (projectId) => requestWithFallback(() => Promise.resolve({ ok: true, projectId }), () => ({ ok: true, projectId })),
  remove: (id) => requestWithFallback(() => Promise.resolve({ ok: true, id }), () => ({ ok: true, id })),
  submitWish: async (data) => {
    const visitorId = globalThis.localStorage?.getItem('hope-visitor-id') || `guest-${Date.now()}`
    globalThis.localStorage?.setItem('hope-visitor-id', visitorId)
    return requestJson('/wishlist', {
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
    requestJson('/community-leads', {
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
    requestJson('/beta-applications', {
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
      openSource: [],
    }
  },
}

export const labApi = {
  list: (params = {}) =>
    requestWithFallback(
      () => requestJson('/projects', { params: { ...params, projectType: 'lab' } }),
      () => pickItems({ items: [] }, []),
    ),
  get: (slug) =>
    requestWithFallback(
      () => requestJson(`/projects/${encodeURIComponent(slug)}`),
      () => null,
    ),
}
