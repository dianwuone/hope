<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import { wishlistApi } from '@/api'
import { contactInputType, validateContactValue } from '@/utils/contact'
import { useSiteStore } from '@/stores/site'

const route = useRoute()
const router = useRouter()
const siteStore = useSiteStore()
const emptyOffer = {
  slug: '',
  title: '',
  subtitle: '',
  price: '',
  originalPrice: '',
  benefits: [],
}
const offer = computed(() => siteStore.offerBySlug(route.params.offerSlug) || siteStore.offersData[0] || emptyOffer)

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '快来尝鲜', to: '/try' },
  { label: offer.value.title },
])

const form = reactive({
  name: '',
  contactType: 'wechat',
  contactValue: '',
  payment: 'wechat',
})

const submitting = ref(false)
const errors = reactive({
  name: '',
  contactValue: '',
})

const contactFieldType = computed(() => contactInputType(form.contactType))

const validateForm = () => {
  errors.name = form.name.trim() ? '' : '请输入姓名'
  errors.contactValue = validateContactValue(form.contactType, form.contactValue)
  return !errors.name && !errors.contactValue
}

const submitOrder = async () => {
  if (!validateForm()) return
  submitting.value = true
  try {
    await wishlistApi.submitWish({
      projectName: offer.value.title,
      sourcePage: 'try',
      contactType: form.contactType,
      contactValue: form.contactValue,
      note: `purchase:${offer.value.slug}`,
    })
    router.push({
      path: '/try/success',
      query: {
        offer: offer.value.slug,
        title: offer.value.title,
        price: offer.value.price,
        payment: form.payment,
      },
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(202,224,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)]">
    <section class="border-b border-[#E6EEF9] bg-[linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />
        <div class="max-w-[900px]">
          <div class="inline-flex rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#2F7AF3]">Checkout</div>
          <h1 class="mt-5 font-serif text-5xl font-semibold text-[#17233D]">{{ offer.title }}</h1>
          <p class="mt-5 text-lg leading-8 text-[#61718B]">{{ offer.subtitle }}</p>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
        <main class="space-y-6">
          <article class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="flex items-end gap-3">
              <span class="text-5xl font-semibold text-[#2F7AF3]">{{ offer.price }}</span>
              <span class="text-sm text-[#8A9BB3] line-through">{{ offer.originalPrice }}</span>
            </div>
            <div class="mt-5 space-y-3">
              <div v-for="item in offer.benefits" :key="item" class="rounded-[16px] bg-[#F8FBFF] px-4 py-3 text-sm text-[#61718B]">✓ {{ item }}</div>
            </div>
          </article>

          <article class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">购买信息</h2>
            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <label>
                <div class="text-sm font-semibold text-[#5A6E8C]">姓名</div>
                <input v-model="form.name" type="text" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]" @blur="errors.name = form.name.trim() ? '' : '请输入姓名'" />
                <p v-if="errors.name" class="mt-2 text-xs text-red-500">{{ errors.name }}</p>
              </label>
              <label>
                <div class="text-sm font-semibold text-[#5A6E8C]">联系方式类型</div>
                <select v-model="form.contactType" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]">
                  <option value="wechat">微信</option>
                  <option value="email">邮箱</option>
                  <option value="phone">电话</option>
                </select>
              </label>
            </div>
              <label class="mt-4 block">
                <div class="text-sm font-semibold text-[#5A6E8C]">联系方式值</div>
              <input v-model="form.contactValue" :type="contactFieldType" class="mt-2 h-12 w-full rounded-[14px] border border-[#DCE7F8] bg-white px-4 outline-none focus:border-[#2F7AF3]" @blur="errors.contactValue = validateContactValue(form.contactType, form.contactValue)" />
              <p v-if="errors.contactValue" class="mt-2 text-xs text-red-500">{{ errors.contactValue }}</p>
              </label>
          </article>

          <article class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">支付方式</h2>
            <div class="mt-5 grid gap-3 md:grid-cols-3">
              <button
                v-for="item in [
                  { key: 'wechat', label: '微信支付' },
                  { key: 'alipay', label: '支付宝' },
                  { key: 'transfer', label: '手动转账' },
                ]"
                :key="item.key"
                type="button"
                class="rounded-[16px] border px-4 py-4 text-left text-sm font-semibold transition-all"
                :class="form.payment === item.key ? 'border-[#2F7AF3] bg-[#EEF4FF] text-[#2F7AF3]' : 'border-[#E7EEF9] bg-[#FBFDFF] text-[#61718B]'"
                @click="form.payment = item.key"
              >
                {{ item.label }}
              </button>
            </div>
            <div class="mt-5 rounded-[18px] bg-[#F8FBFF] px-4 py-4 text-sm leading-7 text-[#61718B]">
              支付完成后将跳转到购买成功页，并同步引导你前往下载与交付中心。
            </div>
          </article>
        </main>

        <aside class="space-y-5">
          <article class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">安全说明</div>
            <p class="mt-4 text-sm leading-7 text-[#61718B]">付款信息仅用于当前订单处理，暂不涉及真实支付接口。</p>
          </article>

          <article class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">常见问题</div>
            <div class="mt-4 space-y-3 text-sm leading-7 text-[#61718B]">
              <p>• 购买后多久交付？通常会按页面说明即时或 24 小时内完成。</p>
              <p>• 购买失败怎么办？可以直接联系社区或返回尝鲜页重新提交。</p>
              <p>• 支持退款吗？数字内容请先联系作者确认售后政策。</p>
            </div>
          </article>

          <article class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(135deg,#F6FBFF_0%,#FFFFFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">联系作者</div>
            <p class="mt-4 text-sm leading-7 text-[#61718B]">遇到问题，可以先进入社区页与作者沟通。</p>
            <router-link to="/community" class="mt-5 inline-flex rounded-[12px] bg-[#2F7AF3] px-5 py-3 text-sm font-semibold text-white">联系作者</router-link>
          </article>

          <button
            type="button"
            class="w-full rounded-[14px] bg-[#2F7AF3] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(47,122,243,0.22)] disabled:opacity-60"
            :disabled="submitting || !form.name.trim() || !form.contactValue.trim()"
            @click="submitOrder"
          >
            {{ submitting ? '提交中...' : '模拟支付并继续' }}
          </button>

          <router-link to="/try" class="block text-center text-sm font-semibold text-[#3B7FF2]">返回快来尝鲜</router-link>
        </aside>
      </div>
    </section>
  </div>
</template>
