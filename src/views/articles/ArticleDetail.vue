<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { articleApi, userApi } from '@/api'
import { useRequireLogin } from '@/composables/auth'
import { useReadingStore } from '@/stores/reading'
import { useSiteStore } from '@/stores/site'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const siteStore = useSiteStore()
const userStore = useUserStore()
const readingStore = useReadingStore()
const { ensureLogin } = useRequireLogin()
const { isLoggedIn, profile } = storeToRefs(userStore)
const feedbackMessage = ref('')
const commentSubmitting = ref(false)
const loadingComments = ref(false)
const actionLoading = reactive({
  like: false,
  favorite: false,
  share: false,
})
const commentForm = reactive({
  nickname: '',
  content: '',
})
const commentList = ref([])
const engagement = reactive({
  likeCount: 0,
  favoriteCount: 0,
  commentCount: 0,
})
const interactionApplied = reactive({
  like: false,
  favorite: false,
})
const emptyColumn = {
  slug: '',
  name: '',
  author: '',
  avatar: '',
  subtitle: '',
}

const article = computed(() => siteStore.articleBySlug(route.params.slug) || siteStore.articlesData[0] || { tags: [], content: [], sections: [] })
const column = computed(() => siteStore.columnBySlug(article.value.column) || siteStore.columnsData[0] || emptyColumn)
const articleSections = computed(() =>
  article.value.sections?.length
    ? article.value.sections
    : article.value.content.map((paragraph, index) => ({
      title: `第 ${index + 1} 节`,
      paragraphs: [paragraph],
    }))
)

const relatedArticles = computed(() =>
  siteStore.articlesData
    .filter((item) =>
      item.slug !== article.value.slug
      && (
        item.column === article.value.column
        || item.category === article.value.category
        || item.tags.some((tag) => article.value.tags.includes(tag))
      ))
    .slice(0, 3)
)
const articleIndex = computed(() => siteStore.articlesData.findIndex((item) => item.slug === article.value.slug))
const previousArticle = computed(() => (articleIndex.value > 0 ? siteStore.articlesData[articleIndex.value - 1] : null))
const nextArticle = computed(() => (articleIndex.value >= 0 && articleIndex.value < siteStore.articlesData.length - 1 ? siteStore.articlesData[articleIndex.value + 1] : null))

const recommendedProducts = computed(() => {
  if (article.value.column === 'qiming') {
    return siteStore.productsData.filter((item) => ['parenting-assistant'].includes(item.slug))
  }

  return siteStore.productsData.filter((item) => ['personal-assistant', 'ai-tools'].includes(item.slug))
})

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '文章中心', to: '/articles' },
  { label: column.value.name, to: `/columns/${column.value.slug}` },
  { label: article.value.title },
])

const columnBadgeClass = computed(() =>
  article.value.column === 'kunting'
    ? 'bg-[#E8F3EF] text-[#5B8479]'
    : 'bg-[#FFF0E6] text-[#D07E61]'
)

const articleAccentClass = computed(() =>
  article.value.column === 'kunting'
    ? 'text-[#5B8479]'
    : 'text-[#D07E61]'
)
const functionalCard = computed(() => {
  if (article.value.column === 'qiming') {
    return {
      title: '育儿助手，你的成长记录搭档',
      desc: '记录成长、整理提醒、沉淀启蒙建议，让家庭陪伴更轻松。',
      button: '了解育儿助手',
      to: '/products/parenting-assistant',
      accent: 'from-[#FFF2E7] via-[#FFF9F5] to-[#FFFFFF]',
    }
  }

  return {
    title: '个人助手，你的全能效率搭档',
    desc: '任务管理、习惯追踪、AI 总结整合在一起，帮你把思考和行动真正串起来。',
    button: '了解个人助手',
    to: '/products/personal-assistant',
    accent: 'from-[#EEF6F1] via-[#F9FCFA] to-[#FFFFFF]',
  }
})

const currentSlug = computed(() => `${route.params.slug || ''}`)
const commentCount = computed(() => engagement.commentCount || article.value.commentCount || 0)
const engagementStats = computed(() => [
  { key: 'like', label: '点赞', value: engagement.likeCount || article.value.likes || 0, icon: '♡' },
  { key: 'favorite', label: '收藏', value: engagement.favoriteCount || article.value.favorites || 0, icon: '☆' },
  { key: 'comment', label: '评论', value: commentCount.value, icon: '✎' },
])

function setFeedback(message) {
  feedbackMessage.value = message
}

function syncEngagement(payload = {}) {
  engagement.likeCount = Number(payload.likeCount ?? article.value.likes ?? 0)
  engagement.favoriteCount = Number(payload.favoriteCount ?? article.value.favorites ?? 0)
  engagement.commentCount = Number(payload.commentCount ?? commentList.value.length ?? 0)
}

async function loadEngagement() {
  if (!currentSlug.value) return
  try {
    const result = await articleApi.getEngagement(currentSlug.value)
    syncEngagement(result)
  } catch (error) {
    syncEngagement()
  }
}

async function loadComments() {
  if (!currentSlug.value) return
  loadingComments.value = true
  try {
    const result = await articleApi.listComments(currentSlug.value)
    commentList.value = Array.isArray(result?.items) ? result.items : []
    engagement.commentCount = Number(result?.total ?? commentList.value.length)
  } catch (error) {
    commentList.value = []
  } finally {
    loadingComments.value = false
  }
}

async function handleInteraction(type) {
  if (type === 'comment' || !currentSlug.value || actionLoading[type]) return
  actionLoading[type] = true
  try {
    const result = await articleApi.interact(currentSlug.value, type)
    syncEngagement(result)
    interactionApplied[type] = !!result?.active
    if (isLoggedIn.value) {
      setFeedback(result?.active ? `${type === 'like' ? '点赞' : '收藏'}已加入你的账号记录。` : `${type === 'like' ? '点赞' : '收藏'}已取消。`)
    } else {
      setFeedback(result?.applied ? `${type === 'like' ? '点赞' : '收藏'}成功，感谢支持。` : '同一 IP 已操作过，本次不再重复累计。')
    }
  } catch (error) {
    setFeedback(error instanceof Error ? error.message : '操作失败，请稍后重试。')
  } finally {
    actionLoading[type] = false
  }
}

async function handleShare() {
  if (actionLoading.share) return
  actionLoading.share = true
  try {
    await navigator.clipboard.writeText(window.location.href)
    setFeedback('文章链接已复制，快去分享给朋友吧。')
  } catch (error) {
    setFeedback('复制链接失败，请手动复制地址栏链接。')
  } finally {
    actionLoading.share = false
  }
}

async function submitComment() {
  if (!ensureLogin('请先登录后再发表评论')) return
  const content = commentForm.content.trim()
  if (!content || !currentSlug.value || commentSubmitting.value) {
    if (!content) setFeedback('先写点内容再提交评论吧。')
    return
  }
  commentSubmitting.value = true
  try {
    const result = await articleApi.createComment(currentSlug.value, {
      ...commentForm,
      nickname: isLoggedIn.value ? (profile.value?.nickname || profile.value?.username || '用户') : commentForm.nickname,
    })
    commentList.value = [result, ...commentList.value]
    engagement.commentCount = commentList.value.length
    commentForm.nickname = commentForm.nickname.trim()
    commentForm.content = ''
    setFeedback('评论已发布，感谢你的反馈。')
  } catch (error) {
    setFeedback(error instanceof Error ? error.message : '评论提交失败，请稍后重试。')
  } finally {
    commentSubmitting.value = false
  }
}

watch(
  currentSlug,
  async () => {
    feedbackMessage.value = ''
    interactionApplied.like = false
    interactionApplied.favorite = false
    syncEngagement()
    loadEngagement()
    loadComments()
    readingStore.recordArticle(article.value)
    if (isLoggedIn.value && article.value?.slug) {
      try {
        await userApi.addReadingHistory({
          articleSlug: article.value.slug,
          articleTitle: article.value.title,
          articleSummary: article.value.summary,
          coverImage: article.value.cover || article.value.coverImage || '',
          authorName: article.value.author || article.value.authorName || '',
          categoryName: article.value.category || '',
        })
      } catch {}
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <section class="overflow-hidden border-b border-brand-grey/50 bg-white">
      <div class="bg-[radial-gradient(circle_at_left_center,rgba(244,209,168,0.28),transparent_28%),linear-gradient(135deg,#fff8ef_0%,#fffdf9_42%,#fff8f0_100%)]">
        <div class="container-content py-10 md:py-12">
          <BreadcrumbNav :items="breadcrumbItems" />
          <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:gap-10">
            <div>
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <span class="rounded-full px-3 py-1 font-semibold" :class="columnBadgeClass">
                  {{ column.name }}
                </span>
                <span class="rounded-full border border-[#E9D9C8] bg-white/70 px-3 py-1 text-brand-muted">
                  {{ article.category }}
                </span>
              </div>

              <h1 class="mt-5 max-w-3xl font-serif text-4xl leading-[1.2] text-brand-charcoal md:text-5xl">
                {{ article.title }}
              </h1>

              <p class="mt-5 max-w-2xl text-lg leading-8 text-brand-text">
                {{ article.summary }}
              </p>

              <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-muted">
                <div class="flex items-center gap-3">
                  <img :src="article.authorAvatar" :alt="article.author" class="h-9 w-9 rounded-full object-cover" />
                  <span class="font-medium text-brand-charcoal">{{ article.author }}</span>
                </div>
                <span>{{ article.publishedAt }}</span>
                <span>{{ article.viewCount }} 阅读</span>
              </div>

              <div class="mt-7 flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="rounded-full border border-[#E9D9C8] bg-white/75 px-3 py-1.5 text-sm text-brand-text"
                >
                  # {{ tag }}
                </span>
              </div>
            </div>

            <div class="overflow-hidden rounded-[28px] border border-white/80 bg-white/60 shadow-[0_16px_40px_rgba(98,77,55,0.12)]">
              <img :src="article.cover" :alt="article.title" class="aspect-[16/10] w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container-content grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article class="min-w-0">
          <div class="rounded-[28px] border border-[#EFE3D7] bg-white px-6 py-7 shadow-[0_12px_32px_rgba(98,77,55,0.06)] md:px-8 md:py-9">
            <div class="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-charcoal prose-p:leading-8 prose-p:text-brand-text">
              <section
                v-for="(section, index) in articleSections"
                :key="section.title"
                :id="`section-${index + 1}`"
                class="scroll-mt-28"
              >
                <h2>{{ section.title }}</h2>
                <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>

                <div
                  v-if="index === 0"
                  class="not-prose mt-8 overflow-hidden rounded-[24px] border border-[#EDE2D7] bg-gradient-to-r p-5 shadow-[0_10px_24px_rgba(98,77,55,0.05)] md:p-6"
                  :class="functionalCard.accent"
                >
                  <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div class="text-sm font-semibold tracking-[0.16em]" :class="articleAccentClass">功能推荐</div>
                      <h3 class="mt-2 text-2xl font-serif font-semibold text-brand-charcoal">{{ functionalCard.title }}</h3>
                      <p class="mt-3 text-sm leading-7 text-brand-text">{{ functionalCard.desc }}</p>
                    </div>
                    <router-link
                      :to="functionalCard.to"
                      class="inline-flex items-center justify-center rounded-full bg-[#455D4E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#394f42]"
                    >
                      {{ functionalCard.button }}
                    </router-link>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div class="mt-6 overflow-hidden rounded-[24px] border border-[#F0DFD1] bg-[linear-gradient(135deg,#FFF1E5_0%,#FFF8F2_100%)] p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)] md:p-6">
            <div class="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div class="text-sm font-semibold tracking-[0.16em] text-[#D97B37]">快来尝鲜</div>
                <h2 class="mt-2 text-2xl font-serif font-semibold text-brand-charcoal">成为首批体验者，让想法更快变成产品</h2>
                <p class="mt-3 text-sm leading-7 text-brand-text">
                  支持我们持续打磨产品与内容，也能优先获取新功能体验、专属福利与开发进展。
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <router-link to="/try" class="inline-flex items-center rounded-full bg-[#E07A3F] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#cf6c34]">
                  立即参与快来尝鲜
                </router-link>
                <router-link to="/products" class="inline-flex items-center rounded-full border border-[#E9D9C8] bg-white px-5 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]">
                  了解更多产品
                </router-link>
              </div>
            </div>
          </div>

          <div class="mt-6 rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)] md:p-6">
            <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="text-sm font-semibold tracking-[0.16em]" :class="articleAccentClass">互动一下</div>
                <h2 class="mt-2 text-2xl font-serif font-semibold text-brand-charcoal">喜欢这篇文章的话，留下你的反馈</h2>
                <p class="mt-2 text-sm leading-7 text-brand-text">
                  可以先收藏、分享给朋友，也可以去评论区告诉我们你的想法和问题。
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="item in engagementStats"
                  :key="item.key"
                  type="button"
                  :disabled="item.key !== 'comment' && actionLoading[item.key]"
                  class="inline-flex items-center gap-2 rounded-full border border-[#E9D9C8] bg-[#FAF7F2] px-4 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                  :class="item.key !== 'comment' && interactionApplied[item.key] ? 'border-[#D97B37] bg-white text-[#D97B37]' : ''"
                  @click="handleInteraction(item.key)"
                >
                  <span aria-hidden="true">{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                  <span class="text-brand-muted">{{ item.value }}</span>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-full bg-[#455D4E] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#394f42]"
                  :disabled="actionLoading.share"
                  @click="handleShare"
                >
                  <span aria-hidden="true">↗</span>
                  <span>分享文章</span>
                </button>
              </div>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div class="rounded-[18px] border border-dashed border-[#E9D9C8] bg-[#FFF9F4] px-4 py-4 text-sm leading-7 text-brand-muted">
                {{ feedbackMessage || '点赞、收藏支持登录用户绑定账号；评论提交前需要先登录。' }}
                <template v-if="isLoggedIn"> 当前已登录，互动会绑定到你的账号。</template>
              </div>
              <router-link
                to="/community"
                class="inline-flex items-center justify-center rounded-full border border-[#E9D9C8] bg-white px-5 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
              >
                去社区参与讨论
              </router-link>
            </div>

            <div class="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div class="rounded-[20px] border border-[#F2E7DC] bg-[#FFFCF8] p-4">
                <div class="text-sm font-semibold text-brand-charcoal">写评论</div>
                <div class="mt-3 grid gap-3">
                  <input
                    v-model="commentForm.nickname"
                    type="text"
                    maxlength="50"
                    placeholder="你的称呼（可选）"
                    :disabled="isLoggedIn"
                    class="h-11 rounded-[14px] border border-[#E9D9C8] bg-white px-4 text-sm text-brand-charcoal outline-none placeholder:text-[#B7A593]"
                  />
                  <textarea
                    v-model="commentForm.content"
                    rows="4"
                    maxlength="500"
                    placeholder="写下你的看法、问题或补充..."
                    class="rounded-[14px] border border-[#E9D9C8] bg-white px-4 py-3 text-sm leading-7 text-brand-charcoal outline-none placeholder:text-[#B7A593]"
                  />
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-xs text-brand-muted">公开展示前请避免填写敏感信息</span>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full bg-[#E07A3F] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#cf6c34] disabled:cursor-not-allowed disabled:opacity-70"
                      :disabled="commentSubmitting"
                      @click="submitComment"
                    >
                      {{ commentSubmitting ? '提交中...' : '发布评论' }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="rounded-[20px] border border-[#F2E7DC] bg-white p-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-sm font-semibold text-brand-charcoal">最新评论</div>
                  <span class="text-xs text-brand-muted">{{ commentCount }} 条</span>
                </div>
                <div v-if="loadingComments" class="mt-4 text-sm text-brand-muted">
                  评论加载中...
                </div>
                <div v-else-if="commentList.length" class="mt-4 space-y-3">
                  <div
                    v-for="item in commentList"
                    :key="item.id"
                    class="rounded-[16px] border border-[#F2E7DC] bg-[#FFFCF8] p-4"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div class="text-sm font-semibold text-brand-charcoal">{{ item.nickname || '访客' }}</div>
                      <div class="text-xs text-brand-muted">{{ `${item.createdAt || ''}`.replace('T', ' ').slice(0, 16) }}</div>
                    </div>
                    <p class="mt-2 text-sm leading-7 text-brand-text">{{ item.content }}</p>
                  </div>
                </div>
                <div v-else class="mt-4 rounded-[16px] border border-dashed border-[#E9D9C8] bg-[#FFF9F4] px-4 py-5 text-sm text-brand-muted">
                  还没有评论，来留下第一条反馈吧。
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 rounded-[24px] border border-[#EFE3D7] bg-[linear-gradient(135deg,#fffaf4_0%,#ffffff_100%)] p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)] md:p-6">
            <div class="text-sm font-semibold tracking-[0.16em]" :class="articleAccentClass">继续阅读</div>
            <h2 class="mt-2 text-2xl font-serif font-semibold text-brand-charcoal">相关文章</h2>
            <div class="mt-5 grid gap-4 md:grid-cols-3">
              <router-link
                v-for="item in relatedArticles"
                :key="item.slug"
                :to="`/articles/${item.slug}`"
                class="group overflow-hidden rounded-[22px] border border-[#F2E7DC] bg-white shadow-[0_10px_24px_rgba(98,77,55,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(98,77,55,0.08)]"
              >
                <img :src="item.cover" :alt="item.title" class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div class="p-4">
                  <div class="rounded-full px-3 py-1 text-xs font-semibold inline-flex" :class="item.column === 'kunting' ? 'bg-[#E8F3EF] text-[#5B8479]' : 'bg-[#FFF0E6] text-[#D07E61]'">
                    {{ item.column === 'kunting' ? '昆廷笔记' : '启鸣宝宝' }}
                  </div>
                  <h3 class="mt-3 line-clamp-2 text-lg font-semibold text-brand-charcoal transition-colors group-hover:text-accent-blue-dark">
                    {{ item.title }}
                  </h3>
                  <p class="mt-2 line-clamp-3 text-sm leading-7 text-brand-text">{{ item.summary }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </article>

        <aside class="space-y-4">
          <div class="rounded-[24px] border border-[#EFE3D7] bg-[linear-gradient(135deg,#fffaf4_0%,#ffffff_100%)] p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
            <div class="flex items-center gap-4">
              <img :src="column.avatar" :alt="column.author" class="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <div class="text-sm font-semibold tracking-[0.16em]" :class="articleAccentClass">{{ column.name }}</div>
                <div class="mt-1 text-lg font-semibold text-brand-charcoal">{{ column.author }}</div>
              </div>
            </div>
            <p class="mt-4 text-sm leading-7 text-brand-text">{{ column.subtitle }}</p>
            <router-link
              :to="`/columns/${column.slug}`"
              class="mt-5 inline-flex items-center rounded-full border border-[#E9D9C8] bg-white px-4 py-2 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
            >
              进入{{ column.name }}
              <span class="ml-2" aria-hidden="true">→</span>
            </router-link>
          </div>

          <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
            <h3 class="text-xl font-semibold text-brand-charcoal">文章互动</h3>
            <div class="mt-4 grid grid-cols-3 gap-3">
              <button
                v-for="item in engagementStats"
                :key="item.key"
                type="button"
                :disabled="item.key !== 'comment' && actionLoading[item.key]"
                class="rounded-[18px] border border-[#F2E7DC] bg-[#FAF7F2] px-3 py-4 text-center transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                :class="item.key !== 'comment' && interactionApplied[item.key] ? 'border-[#D97B37] bg-white' : ''"
                @click="handleInteraction(item.key)"
              >
                <div class="text-lg text-brand-charcoal">{{ item.icon }}</div>
                <div class="mt-2 text-sm font-semibold text-brand-charcoal">{{ item.value }}</div>
                <div class="mt-1 text-xs text-brand-muted">{{ item.label }}</div>
              </button>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full border border-[#E9D9C8] bg-white px-4 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-[#FFF7EF]"
                @click="handleShare"
              >
                分享给朋友
              </button>
              <router-link
                to="/community"
                class="inline-flex items-center justify-center rounded-full bg-[#455D4E] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#394f42]"
              >
                写评论
              </router-link>
            </div>
          </div>

          <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
            <h3 class="text-xl font-semibold text-brand-charcoal">文章标签</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <router-link
                v-for="tag in article.tags"
                :key="tag"
                :to="`/articles/tags/${encodeURIComponent(tag)}`"
                class="rounded-full border border-[#E9D9C8] bg-[#FAF7F2] px-3 py-2 text-sm text-brand-text transition-colors hover:border-[#D9B38C] hover:bg-white hover:text-brand-charcoal"
              >
                # {{ tag }}
              </router-link>
            </div>
          </div>

          <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
            <h3 class="text-xl font-semibold text-brand-charcoal">产品推荐</h3>
            <div class="mt-4 space-y-3">
              <router-link
                v-for="product in recommendedProducts"
                :key="product.slug"
                :to="`/products/${product.slug}`"
                class="flex items-center gap-4 rounded-[20px] border border-[#F2E7DC] bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img :src="product.cover" :alt="product.name" class="h-16 w-16 rounded-2xl object-cover" />
                <div class="min-w-0 flex-1">
                  <div class="text-lg font-semibold text-brand-charcoal">{{ product.name }}</div>
                  <div class="mt-1 line-clamp-2 text-xs leading-6 text-brand-text">{{ product.shortDesc }}</div>
                </div>
                <span class="text-brand-muted">→</span>
              </router-link>
            </div>
          </div>

          <div class="rounded-[24px] border border-[#EFE3D7] bg-white p-5 shadow-[0_10px_28px_rgba(98,77,55,0.05)]">
            <h3 class="text-xl font-semibold text-brand-charcoal">文章导航</h3>
            <div class="mt-4 space-y-4">
              <router-link
                v-if="previousArticle"
                :to="`/articles/${previousArticle.slug}`"
                class="block rounded-[18px] border border-[#F2E7DC] bg-[#FAF7F2] p-4 transition-colors hover:bg-white"
              >
                <div class="text-xs text-brand-muted">上一篇</div>
                <div class="mt-2 text-sm leading-7 text-brand-charcoal">{{ previousArticle.title }}</div>
              </router-link>
              <router-link
                v-if="nextArticle"
                :to="`/articles/${nextArticle.slug}`"
                class="block rounded-[18px] border border-[#F2E7DC] bg-[#FAF7F2] p-4 transition-colors hover:bg-white"
              >
                <div class="text-xs text-brand-muted">下一篇</div>
                <div class="mt-2 text-sm leading-7 text-brand-charcoal">{{ nextArticle.title }}</div>
              </router-link>
            </div>
          </div>

          <div class="rounded-[24px] border border-dashed border-[#EDB790] bg-[#FFF9F4] p-5 text-center text-sm text-brand-muted shadow-[0_10px_28px_rgba(98,77,55,0.03)]">
            广告位 / 功能位 300 × 250
          </div>

          <div class="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#DE6F2B_0%,#E98033_48%,#D95E1D_100%)] p-6 text-white shadow-[0_16px_36px_rgba(217,111,52,0.24)]">
            <div class="text-4xl leading-none text-white/20">✦</div>
            <h3 class="mt-2 text-3xl font-serif font-semibold">获取最新更新</h3>
            <p class="mt-3 text-sm leading-7 text-white/85">
              订阅新内容、产品进展与活动消息，第一时间送达。
            </p>
            <div class="mt-5 flex gap-2">
              <input
                type="email"
                placeholder="输入你的邮箱"
                class="h-11 min-w-0 flex-1 rounded-[14px] border border-white/20 bg-white/90 px-4 text-sm text-brand-charcoal outline-none placeholder:text-[#B7A593]"
              />
              <router-link to="/subscribe" class="inline-flex h-11 items-center justify-center rounded-[14px] bg-white px-4 text-sm font-semibold text-[#D96F34] transition-colors hover:bg-[#FFF1E8]">
                订阅
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
