<template>
  <section class="section-shell">
    <div class="container-reading">
      <div class="surface-panel p-10 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-2xl text-success">✓</div>
        <h1 class="mt-6 font-serif text-4xl text-brand-charcoal">报名成功</h1>
        <p class="mt-4 text-base leading-8 text-brand-text">你的体验官信息已记录，后续会通过预留联系方式同步最新进展。</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/" class="btn-outline">返回首页</router-link>
          <router-link to="/community" class="btn-primary">加入社区</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
