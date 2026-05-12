<script setup>
import { computed, ref } from 'vue'
import FaqList from '@/components/site/FaqList.vue'
import { tryPage } from '@/data'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const tryPageData = computed(() => siteStore.pageData('try', tryPage))
const activeFilter = ref('全部')

const toneClasses = {
  green: 'bg-[#E9FBF3] text-[#22A06B]',
  amber: 'bg-[#FFF2DB] text-[#E39A2D]',
  coral: 'bg-[#FFE7E2] text-[#F26D68]',
  purple: 'bg-[#ECE8FF] text-[#7B6FF2]',
  blue: 'bg-[#EAF2FF] text-[#3D7EF6]',
}

const trustIconMap = {
  lock: '◫',
  shield: '⬡',
  user: '◌',
}

const allOffers = computed(() => tryPageData.value.offerGroups?.flatMap((group) => group.items) || tryPage.offerGroups.flatMap((group) => group.items))

const filteredOffers = computed(() => {
  if (activeFilter.value === '全部') {
    return allOffers.value
  }

  return allOffers.value.filter((item) => item.category === activeFilter.value)
})

const limitedOffers = computed(() => tryPageData.value.limitedDrop?.items || tryPage.limitedDrop.items)

const toneClass = (tone) => toneClasses[tone] || toneClasses.blue
</script>

<template>
  <div class="bg-[#FCFAF6]">
    <section class="border-b border-[#EEE7DB] bg-[#FCFAF6]">
      <div class="container-content py-5 md:py-7">
        <div class="text-xs font-medium text-[#8D8274]">
          <router-link to="/" class="transition-colors hover:text-[#3D7EF6]">首页</router-link>
          <span class="mx-2">/</span>
          <span>快来尝鲜</span>
        </div>

        <div class="mx-auto max-w-[760px] py-12 text-center md:py-16">
          <h1 class="font-serif text-4xl font-semibold tracking-tight text-[#202739] md:text-6xl">
            {{ tryPageData.title }}
          </h1>
          <p class="mx-auto mt-5 max-w-[540px] text-base leading-8 text-[#8B8278] md:text-lg">
            {{ tryPageData.subtitle }}
          </p>
        </div>
      </div>
    </section>

    <section class="pb-6">
      <div class="container-content">
        <div class="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#2E2A80_0%,#3244B4_58%,#3B6CE6_100%)] px-6 py-8 text-white shadow-[0_24px_64px_rgba(44,63,148,0.22)] md:px-10 md:py-10">
          <div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div>
              <span class="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white/88">
                {{ tryPageData.hero?.badge || tryPage.hero.badge }}
              </span>
              <h2 class="mt-5 text-3xl font-semibold leading-tight md:text-[2.5rem]">
                {{ tryPageData.hero?.title || tryPage.hero.title }}
              </h2>
              <p class="mt-4 max-w-[560px] text-sm leading-7 text-white/72 md:text-base">
                {{ tryPageData.hero?.description || tryPage.hero.description }}
              </p>

              <div class="mt-6 flex items-end gap-3">
                <span class="text-4xl font-semibold leading-none">{{ tryPageData.hero?.price || tryPage.hero.price }}</span>
                <span class="rounded-full bg-[#2CD389]/14 px-3 py-1 text-xs font-semibold text-[#81EDB7]">
                  {{ tryPageData.hero?.originalPrice || tryPage.hero.originalPrice }}
                </span>
              </div>

              <div class="mt-8 flex flex-wrap gap-3">
                <router-link :to="tryPageData.hero?.ctaTo || tryPage.hero.ctaTo" class="inline-flex items-center rounded-[12px] bg-white px-5 py-3 text-sm font-semibold text-[#315BE7] transition hover:bg-[#EEF4FF]">
                  {{ tryPageData.hero?.ctaLabel || tryPage.hero.ctaLabel }}
                </router-link>
                <a :href="tryPageData.hero?.secondaryTo || tryPage.hero.secondaryTo" class="inline-flex items-center rounded-[12px] border border-white/22 px-5 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10">
                  {{ tryPageData.hero?.secondaryLabel || tryPage.hero.secondaryLabel }}
                </a>
              </div>
            </div>

            <div class="mx-auto flex h-[152px] w-[152px] items-center justify-center rounded-[24px] border border-white/14 bg-white/10 text-[3.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] md:h-[170px] md:w-[170px]">
              <span aria-hidden="true">{{ tryPageData.hero?.visual || tryPage.hero.visual }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="try-grid" class="pb-10 pt-2">
      <div class="container-content">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="filter in tryPageData.filters || tryPage.filters"
            :key="filter"
            type="button"
            class="rounded-full px-4 py-2 text-sm font-medium transition-all"
            :class="filter === activeFilter
              ? 'bg-[#5D63F6] text-white shadow-[0_10px_22px_rgba(93,99,246,0.2)]'
              : 'bg-white text-[#8D8274] shadow-[0_8px_16px_rgba(37,49,95,0.05)] hover:text-[#28324A]'"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in filteredOffers"
            :key="item.slug"
            class="flex h-full flex-col rounded-[20px] border border-[#EDE7DE] bg-white p-6 shadow-[0_14px_32px_rgba(65,50,31,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(65,50,31,0.1)]"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="toneClass(item.statusTone)">
                {{ item.category }}
              </span>
              <span class="rounded-full bg-[#F6F2EC] px-2.5 py-1 text-[11px] font-semibold text-[#9A8F83]">
                {{ item.status }}
              </span>
            </div>

            <h3 class="mt-4 text-2xl font-semibold leading-tight text-[#202739]">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[#7C7266]">
              {{ item.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-4 text-xs text-[#A09487]">
              <span v-for="meta in item.meta" :key="meta" class="inline-flex items-center gap-2">
                <span class="text-[#C9BEB1]">◌</span>
                <span>{{ meta }}</span>
              </span>
            </div>

            <div class="mt-auto flex items-end justify-between gap-4 pt-8">
              <span class="text-3xl font-semibold leading-none text-[#5B63F0]">{{ item.price }}</span>
              <router-link
                :to="`/try/${item.slug}`"
                class="inline-flex items-center rounded-[10px] bg-[linear-gradient(135deg,#4C77FF_0%,#2E68E7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(76,119,255,0.24)] transition hover:brightness-105"
              >
                {{ item.ctaLabel }}
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-10">
      <div class="container-content">
        <div class="rounded-[28px] border border-[#ECE8F3] bg-[linear-gradient(180deg,#F7F8FC_0%,#FAFBFD_100%)] px-6 py-10 shadow-[0_18px_38px_rgba(72,81,122,0.06)] md:px-8">
          <div class="text-center">
            <h2 class="font-serif text-3xl font-semibold text-[#202739]">{{ tryPageData.validatingOffers?.title || tryPage.validatingOffers.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-[#928A80]">{{ tryPageData.validatingOffers?.subtitle || tryPage.validatingOffers.subtitle }}</p>
          </div>

          <div class="mt-8 grid gap-5 lg:grid-cols-2">
            <article
              v-for="item in tryPageData.validatingOffers?.items || tryPage.validatingOffers.items"
              :key="item.slug"
              class="rounded-[18px] border border-[#E9E4F1] bg-white px-6 py-5 shadow-[0_12px_28px_rgba(80,87,132,0.05)]"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="toneClass(item.statusTone)">
                    {{ item.category }}
                  </span>
                  <span class="rounded-full bg-[#EEEAFE] px-2.5 py-1 text-[11px] font-semibold text-[#8171F4]">
                    {{ item.status }}
                  </span>
                </div>
              </div>

              <h3 class="mt-4 text-2xl font-semibold text-[#202739]">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-[#7C7266]">{{ item.summary }}</p>

              <div class="mt-6 flex items-end justify-between gap-4">
                <span class="text-3xl font-semibold text-[#5B63F0]">{{ item.price }}</span>
                <router-link
                  :to="`/try/${item.slug}`"
                  class="inline-flex items-center rounded-[10px] border border-[#D8D2FB] px-4 py-2.5 text-sm font-semibold text-[#6E62EF] transition hover:bg-[#F4F2FF]"
                >
                  {{ item.ctaLabel }}
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-12">
      <div class="container-content">
        <div class="rounded-[28px] border border-[#F0CB74] bg-[linear-gradient(180deg,#FFF4CD_0%,#FFF7DF_100%)] px-6 py-10 shadow-[0_18px_36px_rgba(201,154,55,0.08)] md:px-8">
          <div class="text-center">
            <h2 class="font-serif text-3xl font-semibold text-[#A86118]">{{ tryPageData.limitedDrop?.title || tryPage.limitedDrop.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-[#C2832C]">{{ tryPageData.limitedDrop?.subtitle || tryPage.limitedDrop.subtitle }}</p>
          </div>

          <div class="mt-8 grid gap-5 lg:grid-cols-3">
            <article
              v-for="item in limitedOffers"
              :key="item.slug"
              class="rounded-[18px] border border-white/75 bg-white px-5 py-5 shadow-[0_12px_28px_rgba(187,149,53,0.08)]"
            >
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="toneClass(item.statusTone)">
                  {{ item.category }}
                </span>
                <span class="rounded-full bg-[#FFF0E3] px-2.5 py-1 text-[11px] font-semibold text-[#F26D68]">
                  {{ item.status }}
                </span>
              </div>

              <h3 class="mt-4 text-2xl font-semibold text-[#202739]">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-[#7C7266]">{{ item.summary }}</p>

              <div class="mt-6 flex items-end justify-between gap-4">
                <span class="text-3xl font-semibold text-[#5B63F0]">{{ item.price }}</span>
                <router-link
                  :to="`/try/${item.slug}`"
                  class="inline-flex items-center rounded-[10px] bg-[linear-gradient(135deg,#4C77FF_0%,#2E68E7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(76,119,255,0.24)] transition hover:brightness-105"
                >
                  {{ item.ctaLabel }}
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-12">
      <div class="container-content">
        <div class="mx-auto max-w-[880px] text-center">
          <h2 class="font-serif text-3xl font-semibold text-[#202739]">{{ tryPageData.trust?.title || tryPage.trust.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-[#928A80]">{{ tryPageData.trust?.subtitle || tryPage.trust.subtitle }}</p>
        </div>

        <div class="mt-10 grid gap-8 md:grid-cols-3">
          <article
            v-for="item in tryPageData.trust?.items || tryPage.trust.items"
            :key="item.title"
            class="text-center"
          >
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF1FF] text-2xl text-[#6970F1]">
              {{ trustIconMap[item.icon] }}
            </div>
            <h3 class="mt-5 text-xl font-semibold text-[#202739]">{{ item.title }}</h3>
            <p class="mx-auto mt-3 max-w-[240px] text-sm leading-7 text-[#8A8177]">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12">
      <div class="container-content">
        <div class="mx-auto max-w-[880px] text-center">
          <h2 class="font-serif text-3xl font-semibold text-[#202739]">常见问题</h2>
          <p class="mt-3 text-sm leading-7 text-[#928A80]">关于快来尝鲜，你可能想知道的</p>
        </div>

        <div class="mx-auto mt-8 max-w-[880px]">
          <FaqList :items="tryPageData.faq || tryPage.faq" />
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="container-content">
        <div class="rounded-[24px] bg-[linear-gradient(90deg,#5657F4_0%,#23A4EC_100%)] px-6 py-12 text-center text-white shadow-[0_22px_50px_rgba(58,101,226,0.2)] md:px-8">
          <h2 class="font-serif text-3xl font-semibold">{{ tryPageData.cta?.title || tryPage.cta.title }}</h2>
          <p class="mt-4 text-sm leading-7 text-white/80">{{ tryPageData.cta?.subtitle || tryPage.cta.subtitle }}</p>
          <router-link
            :to="tryPageData.cta?.to || tryPage.cta.to"
            class="mt-8 inline-flex items-center rounded-[12px] bg-white px-6 py-3 text-sm font-semibold text-[#3D67E8] transition hover:bg-[#EEF4FF]"
          >
            {{ tryPageData.cta?.label || tryPage.cta.label }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
