<template>
  <div class="container-content py-section-lg text-center">
    <div class="mb-8">
      <h1 class="text-6xl font-bold text-brand-charcoal/10 mb-4">404</h1>
      <p class="text-lg text-brand-charcoal/60 mb-2">页面不存在或已被移除</p>
      <p class="text-sm text-brand-charcoal/40">试试从下面的入口找到你要的内容</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-8">
      <router-link to="/" class="card text-center py-4">
        <span class="text-sm">首页</span>
      </router-link>
      <router-link to="/products" class="card text-center py-4">
        <span class="text-sm">产品中心</span>
      </router-link>
      <router-link to="/articles" class="card text-center py-4">
        <span class="text-sm">文章中心</span>
      </router-link>
      <router-link to="/try" class="card text-center py-4">
        <span class="text-sm">快来尝鲜</span>
      </router-link>
      <router-link to="/community" class="card text-center py-4">
        <span class="text-sm">加入社区</span>
      </router-link>
    </div>

    <div class="max-w-md mx-auto">
      <p class="text-sm text-brand-charcoal/40 mb-3">或者试试搜索？</p>
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="输入关键词..."
          class="flex-1 px-4 py-2.5 rounded-lg border border-brand-grey focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none text-sm"
          @keyup.enter="$router.push({ path: '/search', query: { q: $event.target.value } })"
        />
        <router-link to="/search" class="btn-outline text-sm">搜索</router-link>
      </div>
    </div>
  </div>
</template>
