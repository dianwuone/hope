const routesToPrefetch = [
  () => import('@/views/AboutPage.vue'),
  () => import('@/views/articles/ArticleCenter.vue'),
  () => import('@/views/products/ProductCenter.vue'),
  () => import('@/views/games/GameCenter.vue'),
  () => import('@/views/try/TryPage.vue'),
  () => import('@/views/lab/LabPage.vue'),
  () => import('@/views/CommunityPage.vue'),
  () => import('@/views/DownloadsPage.vue'),
]

export function prefetchCriticalRoutes() {
  const run = () => {
    routesToPrefetch.forEach(loader => {
      loader().catch(() => {})
    })
  }

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 2000 })
    return
  }

  setTimeout(run, 1200)
}
