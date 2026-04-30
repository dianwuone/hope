<template>
  <div class="container-content py-section text-center">
    <div class="max-w-md mx-auto">
      <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-success/15 flex items-center justify-center">
        <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold mb-2">支付成功！</h1>
      <p class="text-brand-charcoal/50 mb-8">感谢你的支持，以下是下一步指引</p>
      <div class="space-y-3">
        <router-link to="/downloads" class="btn-primary w-full">查看交付状态</router-link>
        <router-link to="/community" class="btn-outline w-full">加入社区</router-link>
        <router-link to="/" class="text-sm text-brand-charcoal/40 hover:text-brand-charcoal">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
