import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const READING_HISTORY_KEY = 'hope-reading-history'
const MAX_HISTORY = 24

function readHistory() {
  const raw = globalThis.localStorage?.getItem(READING_HISTORY_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useReadingStore = defineStore('reading', () => {
  const items = ref(readHistory())

  function persist() {
    globalThis.localStorage?.setItem(READING_HISTORY_KEY, JSON.stringify(items.value))
  }

  function recordArticle(article = {}) {
    if (!article?.slug) return
    const nextItem = {
      slug: article.slug,
      title: article.title || '',
      summary: article.summary || '',
      cover: article.cover || article.coverImage || '',
      author: article.author || article.authorName || '',
      category: article.category || '',
      publishedAt: article.publishedAt || '',
      viewedAt: new Date().toISOString(),
      to: `/articles/${article.slug}`,
    }
    items.value = [nextItem, ...items.value.filter((item) => item.slug !== article.slug)].slice(0, MAX_HISTORY)
    persist()
  }

  function clearHistory() {
    items.value = []
    persist()
  }

  const recentItems = computed(() => items.value)

  return {
    items,
    recentItems,
    recordArticle,
    clearHistory,
  }
})
