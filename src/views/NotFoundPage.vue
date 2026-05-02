<template>
  <section class="section-shell">
    <div class="container-reading">
      <div class="surface-panel p-10 text-center">
        <div class="text-sm uppercase tracking-[0.3em] text-brand-muted">404</div>
        <h1 class="mt-4 font-serif text-4xl text-brand-charcoal">页面暂时走丢了</h1>
        <p class="mt-4 text-base leading-8 text-brand-text">你可以返回首页，或者从产品、文章和实验室重新进入。</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/" class="btn-primary">返回首页</router-link>
          <router-link to="/products" class="btn-outline">产品中心</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
