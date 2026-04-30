/**
 * API 请求封装
 * 一期使用 Mock 数据，后续替换为真实 API
 */

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function request(path, options = {}) {
  // 一期返回空数据，后续接入后端
  console.log(`[API] ${options.method || 'GET'} ${path}`)
  return null
}

// === 产品 ===
export const productApi = {
  list: () => request('/projects?type=product'),
  get: (slug) => request(`/projects/${slug}`),
}

// === 文章 ===
export const articleApi = {
  list: (params) => request('/articles', { params }),
  get: (slug) => request(`/articles/${slug}`),
}

// === 心愿单 ===
export const wishlistApi = {
  list: () => request('/wishlist'),
  add: (projectId) => request('/wishlist', { method: 'POST', body: { projectId } }),
  remove: (id) => request(`/wishlist/${id}`, { method: 'DELETE' }),
}

// === 订单 ===
export const orderApi = {
  create: (data) => request('/orders', { method: 'POST', body: data }),
  get: (id) => request(`/orders/${id}`),
}

// === 社区 ===
export const communityApi = {
  submitLead: (data) => request('/community-leads', { method: 'POST', body: data }),
}

// === 内测 ===
export const betaApi = {
  apply: (data) => request('/beta-applications', { method: 'POST', body: data }),
}

// === 搜索 ===
export const searchApi = {
  search: (query, filters) => request('/search', { params: { q: query, ...filters } }),
}
