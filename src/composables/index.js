import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 滚动触发动画 composable
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.1 } = options
  const isVisible = ref(false)
  const target = ref(null)

  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold }
    )
    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { isVisible, target }
}

/**
 * 复制到剪贴板
 */
export function useCopy() {
  const copied = ref(false)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => (copied.value = false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      copied.value = true
      setTimeout(() => (copied.value = false), 2000)
    }
  }

  return { copied, copy }
}
