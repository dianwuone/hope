import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const WISHLIST_KEY = 'hope-wishlist-items'

function readItems() {
  const raw = globalThis.localStorage?.getItem(WISHLIST_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(readItems())

  const count = computed(() => items.value.length)

  const hasItem = (slug) => items.value.some((item) => item.slug === slug)

  const persist = () => {
    globalThis.localStorage?.setItem(WISHLIST_KEY, JSON.stringify(items.value))
  }

  const addItem = (project) => {
    if (!hasItem(project.slug)) {
      items.value.push({
        ...project,
        wishState: 'want_try',
        addedAt: new Date().toISOString(),
      })
      persist()
    }
  }

  const removeItem = (slug) => {
    items.value = items.value.filter((item) => item.slug !== slug)
    persist()
  }

  const updateState = (slug, state) => {
    const item = items.value.find((i) => i.slug === slug)
    if (item) {
      item.wishState = state
      persist()
    }
  }

  return { items, count, hasItem, addItem, removeItem, updateState }
})
