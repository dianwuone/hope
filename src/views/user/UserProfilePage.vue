<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { userApi } from '@/api'
import { useReadingStore } from '@/stores/reading'
import { useUserStore } from '@/stores/user'
import { useWishlistStore } from '@/stores/wishlist'

const router = useRouter()
const userStore = useUserStore()
const wishlistStore = useWishlistStore()
const readingStore = useReadingStore()

const { isLoggedIn, profile } = storeToRefs(userStore)
const { items: wishlistItems } = storeToRefs(wishlistStore)
const { recentItems } = storeToRefs(readingStore)

if (!isLoggedIn.value) {
  router.replace({
    path: '/auth/login',
    query: { redirect: '/user/profile' },
  })
}

const breadcrumbItems = [
  { label: '首页', to: '/' },
  { label: '个人中心' },
]

const feedbackMessage = ref('')
const activePanel = ref('profile')
const loading = ref(false)

const form = reactive({
  nickname: profile.value?.nickname || '',
  email: profile.value?.email || '',
  avatar: profile.value?.avatar || '',
  bio: profile.value?.bio || '',
  signature: profile.value?.signature || '',
  password: '',
  confirmPassword: '',
})

const remoteStats = ref({
  wishlistCount: wishlistItems.value.length,
  readingHistoryCount: recentItems.value.length,
  likeCount: 0,
  favoriteCount: 0,
  commentCount: 0,
  betaApplicationCount: 0,
  communityLeadCount: 0,
})
const remoteWishlistItems = ref([])
const remoteReadingItems = ref([])

const stats = computed(() => [
  { label: '阅读历史', value: remoteStats.value.readingHistoryCount, hint: '最近浏览文章' },
  { label: '心愿项目', value: remoteStats.value.wishlistCount, hint: '已加入清单' },
  { label: '加入时间', value: `${String(profile.value?.createdAt || '').slice(0, 10) || '--'}`, hint: '账户创建日期' },
])

const wishlistStateText = {
  want_try: '想体验',
  want_download: '想下载',
  want_beta: '想内测',
  want_buy: '想购买',
  realized: '已实现',
}

const groupedWishlist = computed(() =>
  remoteWishlistItems.value.map((item) => ({
    ...item,
    stateLabel: wishlistStateText[item.wishState] || '已记录',
    name: item.projectName || item.name || item.projectSlug || '未命名项目',
    addedLabel: String(item.updatedAt || item.createdAt || '').slice(0, 10) || '最近',
  })),
)

async function loadSummary() {
  loading.value = true
  try {
    const result = await userApi.getProfileSummary()
    userStore.updateLocalProfile(result.profile || {})
    form.nickname = result.profile?.nickname || ''
    form.email = result.profile?.email || ''
    form.avatar = result.profile?.avatar || ''
    form.bio = result.profile?.bio || ''
    form.signature = result.profile?.signature || ''
    remoteStats.value = {
      ...remoteStats.value,
      ...(result.stats || {}),
    }
    remoteWishlistItems.value = Array.isArray(result.wishlist) ? result.wishlist : []
    remoteReadingItems.value = Array.isArray(result.readingHistory) ? result.readingHistory : []
  } catch (error) {
    feedbackMessage.value = error instanceof Error ? error.message : '个人中心数据加载失败。'
  } finally {
    loading.value = false
  }
}

async function saveProfile() {
  if (!form.nickname.trim()) {
    feedbackMessage.value = '昵称不能为空。'
    activePanel.value = 'profile'
    return
  }
  if (!form.email.trim()) {
    feedbackMessage.value = '请填写绑定邮箱。'
    activePanel.value = 'profile'
    return
  }

  try {
    const result = await userApi.updateProfile({
      nickname: form.nickname.trim(),
      email: form.email.trim(),
      avatar: form.avatar.trim(),
      bio: form.bio.trim(),
      signature: form.signature.trim(),
    })
    userStore.updateLocalProfile(result)
    feedbackMessage.value = '基本信息已保存。'
  } catch (error) {
    feedbackMessage.value = error instanceof Error ? error.message : '保存失败，请稍后重试。'
  }
}

async function updatePassword() {
  if (!form.password || !form.confirmPassword) {
    feedbackMessage.value = '请输入新密码并确认。'
    activePanel.value = 'security'
    return
  }
  if (form.password.length < 6) {
    feedbackMessage.value = '密码至少需要 6 位。'
    activePanel.value = 'security'
    return
  }
  if (form.password !== form.confirmPassword) {
    feedbackMessage.value = '两次输入的密码不一致。'
    activePanel.value = 'security'
    return
  }

  try {
    const result = await userApi.changePassword({
      currentPassword: form.password,
      newPassword: form.confirmPassword,
    })
    form.password = ''
    form.confirmPassword = ''
    feedbackMessage.value = result?.message || '密码修改成功。'
  } catch (error) {
    feedbackMessage.value = error instanceof Error ? error.message : '密码修改失败。'
  }
}

async function clearHistory() {
  readingStore.clearHistory()
  try {
    await userApi.clearReadingHistory()
    remoteReadingItems.value = []
    remoteStats.value.readingHistoryCount = 0
    feedbackMessage.value = '阅读历史已清空。'
  } catch (error) {
    feedbackMessage.value = error instanceof Error ? error.message : '清空历史失败。'
  }
}

onMounted(() => {
  loadSummary()
})
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top_left,rgba(223,236,255,0.55),transparent_24%),linear-gradient(180deg,#F8FBFF_0%,#FFFDF9_48%,#F9FBFF_100%)]">
    <section class="border-b border-[#E8EEF6] bg-[linear-gradient(135deg,#FFF7F0_0%,#F7FAFF_52%,#FFFFFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="mt-6 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside class="rounded-[30px] border border-[#E7EDF6] bg-white/90 p-6 shadow-[0_18px_40px_rgba(76,108,168,0.08)]">
            <div class="flex items-center gap-4">
              <img
                :src="profile?.avatar || 'https://placehold.co/120x120/F3E5D4/6A4B35?text=Q'"
                :alt="profile?.nickname || profile?.username || 'user'"
                class="h-20 w-20 rounded-[24px] border border-[#F0E3D7] object-cover"
              />
              <div class="min-w-0">
                <div class="truncate text-2xl font-semibold text-[#1B2942]">{{ profile?.nickname || profile?.username }}</div>
                <div class="mt-1 truncate text-sm text-[#7384A0]">@{{ profile?.username }}</div>
                <div class="mt-2 inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#4879D8]">
                  {{ profile?.status === 'active' ? '正常状态' : '状态异常' }}
                </div>
              </div>
            </div>

            <p class="mt-5 rounded-[18px] bg-[#F8FBFF] px-4 py-4 text-sm leading-7 text-[#61718B]">
              {{ profile?.signature || form.signature || '还没有设置个性签名，写一句让人记住你的介绍吧。' }}
            </p>

            <div class="mt-6 grid grid-cols-3 gap-3">
              <div v-for="item in stats" :key="item.label" class="rounded-[18px] bg-[#FBFDFF] px-3 py-4 text-center">
                <div class="text-xs text-[#8EA0BA]">{{ item.label }}</div>
                <div class="mt-2 text-2xl font-semibold text-[#1B2942]">{{ item.value }}</div>
                <div class="mt-1 text-[11px] text-[#9AA9BF]">{{ item.hint }}</div>
              </div>
            </div>

            <div class="mt-6 space-y-2">
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all"
                :class="activePanel === 'profile' ? 'bg-[#EEF4FF] text-[#2F7AF3]' : 'text-[#5A6E8C] hover:bg-[#F7FAFF]'"
                @click="activePanel = 'profile'"
              >
                <span>基本信息</span>
                <span>→</span>
              </button>
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all"
                :class="activePanel === 'security' ? 'bg-[#FFF3E8] text-[#D9733A]' : 'text-[#5A6E8C] hover:bg-[#FFF8F3]'"
                @click="activePanel = 'security'"
              >
                <span>账号安全</span>
                <span>→</span>
              </button>
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all"
                :class="activePanel === 'history' ? 'bg-[#EEF8F2] text-[#3E8C67]' : 'text-[#5A6E8C] hover:bg-[#F6FBF8]'"
                @click="activePanel = 'history'"
              >
                <span>阅读历史</span>
                <span>→</span>
              </button>
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition-all"
                :class="activePanel === 'wishlist' ? 'bg-[#FFF0F3] text-[#D85B7F]' : 'text-[#5A6E8C] hover:bg-[#FFF7F9]'"
                @click="activePanel = 'wishlist'"
              >
                <span>我的心愿</span>
                <span>→</span>
              </button>
            </div>
          </aside>

          <main class="min-w-0 space-y-6">
            <div v-if="feedbackMessage" class="rounded-[20px] border border-[#E8ECF4] bg-white px-5 py-4 text-sm text-[#51627F] shadow-[0_10px_24px_rgba(76,108,168,0.05)]">
              {{ feedbackMessage }}
            </div>

            <section v-if="activePanel === 'profile'" class="rounded-[30px] border border-[#E8EEF6] bg-white p-6 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:p-7">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-sm font-semibold tracking-[0.16em] text-[#C67642]">PROFILE SETTINGS</div>
                  <h1 class="mt-2 font-serif text-3xl text-[#1B2942]">编辑基本信息</h1>
                </div>
                <button type="button" class="rounded-full bg-[#D9733A] px-5 py-3 text-sm font-semibold text-white" @click="saveProfile">
                  保存资料
                </button>
              </div>

              <div class="mt-6 grid gap-5 md:grid-cols-2">
                <label class="grid gap-2 text-sm text-[#5A6E8C]">
                  <span>昵称</span>
                  <input v-model="form.nickname" type="text" maxlength="30" class="h-12 rounded-[16px] border border-[#E5EAF2] bg-[#FBFDFF] px-4 outline-none" />
                </label>
                <label class="grid gap-2 text-sm text-[#5A6E8C]">
                  <span>绑定邮箱</span>
                  <input v-model="form.email" type="email" class="h-12 rounded-[16px] border border-[#E5EAF2] bg-[#FBFDFF] px-4 outline-none" />
                </label>
                <label class="grid gap-2 text-sm text-[#5A6E8C] md:col-span-2">
                  <span>头像地址</span>
                  <input v-model="form.avatar" type="url" placeholder="https://example.com/avatar.jpg" class="h-12 rounded-[16px] border border-[#E5EAF2] bg-[#FBFDFF] px-4 outline-none" />
                </label>
                <label class="grid gap-2 text-sm text-[#5A6E8C] md:col-span-2">
                  <span>个性签名</span>
                  <input v-model="form.signature" type="text" maxlength="60" class="h-12 rounded-[16px] border border-[#E5EAF2] bg-[#FBFDFF] px-4 outline-none" />
                </label>
                <label class="grid gap-2 text-sm text-[#5A6E8C] md:col-span-2">
                  <span>个人简介</span>
                  <textarea v-model="form.bio" rows="5" maxlength="300" class="rounded-[16px] border border-[#E5EAF2] bg-[#FBFDFF] px-4 py-3 outline-none"></textarea>
                </label>
              </div>
            </section>

            <section v-if="activePanel === 'security'" class="rounded-[30px] border border-[#F0E4D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FFFFFF_100%)] p-6 shadow-[0_18px_40px_rgba(98,77,55,0.06)] md:p-7">
              <div class="text-sm font-semibold tracking-[0.16em] text-[#C67642]">ACCOUNT SECURITY</div>
              <h2 class="mt-2 font-serif text-3xl text-[#1B2942]">密码与账户安全</h2>
              <p class="mt-3 text-sm leading-7 text-[#6B7A92]">这里先提供基础前端管理能力，后续可以再接后端接口完成真实密码修改和邮箱验证。</p>

              <div class="mt-6 grid gap-5 md:grid-cols-2">
                <label class="grid gap-2 text-sm text-[#5A6E8C]">
                  <span>新密码</span>
                  <input v-model="form.password" type="password" class="h-12 rounded-[16px] border border-[#E9D9C8] bg-white px-4 outline-none" />
                </label>
                <label class="grid gap-2 text-sm text-[#5A6E8C]">
                  <span>确认密码</span>
                  <input v-model="form.confirmPassword" type="password" class="h-12 rounded-[16px] border border-[#E9D9C8] bg-white px-4 outline-none" />
                </label>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <button type="button" class="rounded-full bg-[#1F3B63] px-5 py-3 text-sm font-semibold text-white" @click="updatePassword">
                  更新密码
                </button>
                <router-link to="/auth/forgot-password" class="rounded-full border border-[#DCE4EF] bg-white px-5 py-3 text-sm font-semibold text-[#50617E]">
                  走找回密码流程
                </router-link>
              </div>
            </section>

            <section v-if="activePanel === 'history'" class="rounded-[30px] border border-[#E7EEF6] bg-white p-6 shadow-[0_18px_40px_rgba(76,108,168,0.08)] md:p-7">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-sm font-semibold tracking-[0.16em] text-[#5A8F74]">READING HISTORY</div>
                  <h2 class="mt-2 font-serif text-3xl text-[#1B2942]">个人阅读历史</h2>
                </div>
                <button type="button" class="rounded-full border border-[#D9E8DF] bg-[#F6FBF8] px-5 py-3 text-sm font-semibold text-[#3E8C67]" @click="clearHistory">
                  清空历史
                </button>
              </div>

              <div v-if="remoteReadingItems.length" class="mt-6 grid gap-4 md:grid-cols-2">
                <router-link
                  v-for="item in remoteReadingItems"
                  :key="item.articleSlug"
                  :to="`/articles/${item.articleSlug}`"
                  class="flex gap-4 rounded-[22px] border border-[#E9EEF5] bg-[#FBFDFF] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(76,108,168,0.08)]"
                >
                  <img :src="item.coverImage || 'https://placehold.co/160x120/E9EEF6/6E7F99?text=Article'" :alt="item.articleTitle" class="h-20 w-24 rounded-[16px] object-cover" />
                  <div class="min-w-0 flex-1">
                    <div class="line-clamp-2 text-lg font-semibold text-[#1B2942]">{{ item.articleTitle }}</div>
                    <div class="mt-2 line-clamp-2 text-sm leading-6 text-[#7384A0]">{{ item.articleSummary || '继续阅读这篇内容。' }}</div>
                    <div class="mt-3 text-xs text-[#94A3B8]">最近阅读 {{ String(item.viewedAt || '').replace('T', ' ').slice(0, 16) }}</div>
                  </div>
                </router-link>
              </div>
              <div v-else class="mt-6 rounded-[22px] border border-dashed border-[#D8E6DE] bg-[#F8FCF9] px-5 py-8 text-center text-sm text-[#6B7A92]">
                你还没有阅读记录，去文章中心逛逛吧。
              </div>
            </section>

            <section v-if="activePanel === 'wishlist'" class="rounded-[30px] border border-[#F2E5EC] bg-white p-6 shadow-[0_18px_40px_rgba(216,91,127,0.08)] md:p-7">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-sm font-semibold tracking-[0.16em] text-[#D85B7F]">WISHLIST NOTES</div>
                  <h2 class="mt-2 font-serif text-3xl text-[#1B2942]">我的心愿信息</h2>
                </div>
                <router-link to="/wishlist" class="rounded-full bg-[#D85B7F] px-5 py-3 text-sm font-semibold text-white">
                  打开心愿单
                </router-link>
              </div>

              <div v-if="groupedWishlist.length" class="mt-6 space-y-4">
                <div
                  v-for="item in groupedWishlist"
                  :key="item.slug"
                  class="flex flex-col gap-4 rounded-[22px] border border-[#F5E7EE] bg-[#FFF9FB] p-5 md:flex-row md:items-center"
                >
                  <img :src="item.cover || 'https://placehold.co/120x120/F8E2EA/9E5870?text=Wish'" :alt="item.name" class="h-20 w-20 rounded-[18px] object-cover" />
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-3">
                      <div class="text-lg font-semibold text-[#1B2942]">{{ item.name }}</div>
                      <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#D85B7F]">{{ item.stateLabel }}</span>
                    </div>
                    <div class="mt-2 text-sm leading-6 text-[#6F7E97]">{{ item.shortDesc || item.summary || '已加入你的兴趣清单。' }}</div>
                    <div class="mt-2 text-xs text-[#99A5B8]">加入时间 {{ item.addedLabel }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="mt-6 rounded-[22px] border border-dashed border-[#F1D9E2] bg-[#FFF8FA] px-5 py-8 text-center text-sm text-[#6B7A92]">
                你的心愿单还是空的，可以先去产品中心或游戏中心收藏感兴趣的项目。
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>
