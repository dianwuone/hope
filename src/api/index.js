import { resolveAssetData } from '@/utils/content'

const DEFAULT_API_BASE = import.meta.env.DEV ? 'http://127.0.0.1:4100/api' : '/api'
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
  const token = globalThis.localStorage?.getItem('hope-user-token') || ''
  const headers = {}
  if (data) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const response = await fetch(buildUrl(path, params), {
    method,
    headers: Object.keys(headers).length ? headers : undefined,
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!response.ok) {
    const raw = await response.text().catch(() => '')
    let detail = raw
    try {
      const parsed = raw ? JSON.parse(raw) : null
      detail = parsed?.detail ?? parsed ?? raw
    } catch {}
    const error = new Error(
      typeof detail === 'string' ? detail : detail?.message || `Request failed: ${response.status}`,
    )
    error.status = response.status
    error.detail = detail
    throw error
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
  getEngagement: (slug) =>
    requestWithFallback(
      () => requestJson(`/articles/${encodeURIComponent(slug)}/engagement`),
      () => ({ likeCount: 0, favoriteCount: 0, commentCount: 0 }),
    ),
  interact: (slug, interactionType) =>
    requestWithFallback(
      () =>
        requestJson(`/articles/${encodeURIComponent(slug)}/interactions`, {
          method: 'POST',
          data: { interactionType },
        }),
      () => ({
        ok: true,
        interactionType,
        applied: true,
        articleSlug: slug,
        likeCount: 0,
        favoriteCount: 0,
        commentCount: 0,
      }),
    ),
  listComments: (slug) =>
    requestWithFallback(
      () => requestJson(`/articles/${encodeURIComponent(slug)}/comments`),
      () => ({ items: [], total: 0 }),
    ),
  createComment: (slug, data = {}) =>
    requestWithFallback(
      () =>
        requestJson(`/articles/${encodeURIComponent(slug)}/comments`, {
          method: 'POST',
          data: {
            nickname: data.nickname || '访客',
            content: data.content || '',
          },
        }),
      () => ({
        id: Date.now(),
        articleId: 0,
        nickname: data.nickname || '访客',
        content: data.content || '',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
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
    const rawUser = globalThis.localStorage?.getItem('hope-user-profile')
    const user = rawUser ? JSON.parse(rawUser) : null
    globalThis.localStorage?.setItem('hope-visitor-id', visitorId)
    return requestJson('/wishlist', {
      method: 'POST',
      data: {
        userId: user?.id || null,
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
        userId: data.userId || null,
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
        userId: data.userId || null,
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
  search: (query, filters = {}) =>
    requestWithFallback(
      async () => resolveAssetData(await requestJson('/search', { params: { q: query || '', ...filters } })),
      () => resolveAssetData({ query: query || '', items: [], total: 0, counts: { 全部: 0, 文章: 0, 产品: 0, 游戏: 0, 实验室: 0, 快来尝鲜: 0 } }),
    ),
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

export const userApi = {
  getCaptcha: (scope = 'frontend') =>
    requestJson('/security/captcha', {
      params: { scope },
    }),
  register: (data) =>
    requestJson('/users/register', {
      method: 'POST',
      data: {
        username: data.username || '',
        email: data.email || '',
        password: data.password || '',
        nickname: data.nickname || '',
        captchaKey: data.captchaKey || '',
        captchaCode: data.captchaCode || '',
      },
    }),
  login: (data) =>
    requestJson('/users/login', {
      method: 'POST',
      data: {
        account: data.account || '',
        password: data.password || '',
        captchaKey: data.captchaKey || '',
        captchaCode: data.captchaCode || '',
      },
    }),
  sendResetPasswordCode: (data) =>
    requestJson('/users/reset-password/code', {
      method: 'POST',
      data: {
        account: data.account || '',
        email: data.email || '',
        captchaKey: data.captchaKey || '',
        captchaCode: data.captchaCode || '',
      },
    }),
  resetPassword: (data) =>
    requestJson('/users/reset-password', {
      method: 'POST',
      data: {
        account: data.account || '',
        email: data.email || '',
        emailCode: data.emailCode || '',
        newPassword: data.newPassword || '',
      },
    }),
  me: () => requestJson('/users/me'),
  getProfileSummary: () => requestJson('/users/me/summary'),
  updateProfile: (data) =>
    requestJson('/users/me', {
      method: 'PUT',
      data: {
        nickname: data.nickname || '',
        email: data.email || '',
        avatar: data.avatar || '',
        bio: data.bio || '',
        signature: data.signature || '',
      },
    }),
  changePassword: (data) =>
    requestJson('/users/me/password', {
      method: 'POST',
      data: {
        currentPassword: data.currentPassword || '',
        newPassword: data.newPassword || '',
      },
    }),
  addReadingHistory: (data) =>
    requestJson('/users/me/reading-history', {
      method: 'POST',
      data: {
        articleSlug: data.articleSlug || '',
        articleTitle: data.articleTitle || '',
        articleSummary: data.articleSummary || '',
        coverImage: data.coverImage || '',
        authorName: data.authorName || '',
        categoryName: data.categoryName || '',
      },
    }),
  clearReadingHistory: () =>
    requestJson('/users/me/reading-history', {
      method: 'DELETE',
    }),
}
