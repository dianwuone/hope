import {
  products,
  getProductBySlug,
  articles,
  getArticleBySlug,
  labs,
  getLabBySlug,
  tryOffers,
  openSourcePage,
} from '@/data'

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(handler) {
  await wait()
  return handler()
}

export const productApi = {
  list: () => request(() => ({ items: products, total: products.length })),
  get: (slug) => request(() => getProductBySlug(slug)),
}

export const articleApi = {
  list: (params = {}) =>
    request(() => {
      const query = params.q?.toLowerCase?.() || ''
      const tag = params.tag
      const column = params.column
      const items = articles.filter((item) => {
        const matchesQuery = !query
          || item.title.toLowerCase().includes(query)
          || item.summary.toLowerCase().includes(query)
          || item.tags.some((entry) => entry.toLowerCase().includes(query))
        const matchesTag = !tag || item.tags.includes(tag) || item.category === tag
        const matchesColumn = !column || item.column === column
        return matchesQuery && matchesTag && matchesColumn
      })
      return { items, total: items.length, page: 1, pageSize: items.length }
    }),
  get: (slug) => request(() => getArticleBySlug(slug)),
}

export const wishlistApi = {
  list: () => request(() => []),
  add: (projectId) => request(() => ({ ok: true, projectId })),
  remove: (id) => request(() => ({ ok: true, id })),
  submitWish: (data) =>
    request(() => ({
      ok: true,
      id: `wish-${Date.now()}`,
      ...data,
    })),
}

export const orderApi = {
  create: (data) =>
    request(() => ({
      id: `${Date.now()}`,
      status: 'created',
      ...data,
    })),
  get: (id) => request(() => ({ id, status: 'paid' })),
}

export const communityApi = {
  submitLead: (data) => request(() => ({ ok: true, ...data })),
}

export const betaApi = {
  apply: (data) => request(() => ({ ok: true, ...data })),
}

export const searchApi = {
  search: (query, filters = {}) =>
    articleApi.list({ q: query, ...filters }).then((articleResult) => ({
      articles: articleResult.items,
      products: products.filter((item) => item.name.includes(query || '') || item.summary.includes(query || '')),
      labs: labs.filter((item) => item.name.includes(query || '') || item.description.includes(query || '')),
      offers: tryOffers.filter((item) => item.title.includes(query || '')),
      openSource: openSourcePage.projects.filter((item) => item.name.includes(query || '')),
    })),
}

export const labApi = {
  list: () => request(() => ({ items: labs, total: labs.length })),
  get: (slug) => request(() => getLabBySlug(slug)),
}
