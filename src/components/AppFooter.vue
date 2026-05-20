<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const {
  footerSectionsData: footerSections,
  siteMetaData: siteMeta,
  socialLinksData: socialLinks,
  contactEmailData: contactEmail,
  communityWechatData: communityWechat,
} = storeToRefs(siteStore)
const beian = computed(() => ({
  label: siteMeta.value?.beian?.label || '',
  href: siteMeta.value?.beian?.href || '',
}))
const visibleSocialLinks = computed(() =>
  socialLinks.value.filter((link) => link?.href && link.href !== '#' && !link.href.startsWith('mailto:')),
)
</script>

<template>
  <footer class="mt-section bg-brand-charcoal text-white/80">
    <div class="container-content py-16">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div>
            <div class="mb-4 text-lg font-bold tracking-[0.2em] text-white">{{ siteMeta.name || '启鸣随笔' }}</div>
            <p class="max-w-sm text-sm leading-relaxed text-white/50">
              {{ siteMeta.description || '一个用于记录育儿心得、职场感悟与个人成长的个人网站。' }}
            </p>
            <div class="mt-4 space-y-1 text-sm text-white/45">
              <p v-if="communityWechat">微信：{{ communityWechat }}</p>
              <p v-if="contactEmail">邮箱：{{ contactEmail }}</p>
            </div>
            <div class="mt-6">
              <span class="btn-white cursor-default">订阅信息展示</span>
            </div>
          </div>

          <div v-for="section in footerSections" :key="section.title">
            <h4 class="mb-4 text-sm font-medium text-white">{{ section.title }}</h4>
            <ul class="space-y-2.5">
              <li v-for="link in section.links" :key="link.path">
                <span class="text-sm text-white/50">
                  {{ link.name }}
                </span>
              </li>
            </ul>
          </div>
        </div>

      <div class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-white/30">
          &copy; {{ new Date().getFullYear() }} {{ siteMeta.copyright || '启鸣随笔' }}
          <a
            v-if="beian.label && beian.href"
            :href="beian.href"
            target="_blank"
            rel="noreferrer"
            class="ml-2 hover:text-white/60"
          >
            {{ beian.label }}
          </a>
        </p>
        <div class="flex flex-wrap gap-4">
          <span class="text-xs text-white/40">隐私政策</span>
          <span class="text-xs text-white/40">服务条款</span>
          <span class="text-xs text-white/40">网站地图</span>
          <span
            v-for="link in visibleSocialLinks"
            :key="link.name"
            class="text-white/30"
          >
            {{ link.name }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
