<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const order = computed(() => ({
  title: route.query.title || '你的订单',
  price: route.query.price || '¥29',
  offer: route.query.offer || '',
  payment: route.query.payment || 'wechat',
}))

const message = computed(() => {
  if (!order.value.offer) return '如果你是直接访问，可先返回快来尝鲜重新选择商品。'
  if (order.value.payment === 'transfer') return '我们会在确认收款后尽快开通权益'
  return '权益已开通，点击查看下载与交付内容'
})
</script>

<template>
  <section class="section-shell">
    <div class="container-reading">
      <div class="surface-panel p-10 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-2xl text-success">✓</div>
        <h1 class="mt-6 font-serif text-4xl text-brand-charcoal">支付成功</h1>
        <p class="mt-4 text-base leading-8 text-brand-text">{{ order.title }} · {{ order.price }}</p>
        <p class="mt-2 text-sm leading-7 text-brand-muted">{{ message }}</p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/downloads" class="btn-primary">查看交付中心</router-link>
          <router-link to="/community" class="btn-outline">联系我</router-link>
          <router-link to="/try" class="btn-outline">继续尝鲜</router-link>
        </div>

        <div v-if="!order.offer" class="mt-6 rounded-[18px] bg-[#F8FBFF] px-5 py-4 text-sm text-brand-text">
          未找到订单信息，已为你准备好返回快来尝鲜的入口。
        </div>
      </div>
    </div>
  </section>
</template>
