import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const count = computed(() => items.value.length)

  const hasItem = (slug) => items.value.some((item) => item.slug === slug)

  const addItem = (project) => {
    if (!hasItem(project.slug)) {
      items.value.push({
        ...project,
        wishState: 'want_try',
        addedAt: new Date().toISOString(),
      })
    }
  }

  const removeItem = (slug) => {
    items.value = items.value.filter((item) => item.slug !== slug)
  }

  const updateState = (slug, state) => {
    const item = items.value.find((i) => i.slug === slug)
    if (item) item.wishState = state
  }

  return { items, count, hasItem, addItem, removeItem, updateState }
})
