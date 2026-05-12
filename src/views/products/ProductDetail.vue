<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import SectionTitle from '@/components/site/SectionTitle.vue'
import { useSiteStore } from '@/stores/site'

const route = useRoute()
const siteStore = useSiteStore()
const emptyProduct = {
  slug: '',
  name: '',
  shortDesc: '',
  summary: '',
  cover: '',
  banner: '',
  tags: [],
  features: [],
  detailPage: {},
}
const product = computed(() => siteStore.productBySlug(route.params.slug) || siteStore.productsData[0] || emptyProduct)

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '产品中心', to: '/products' },
  { label: product.value.name },
])

const abilityToneMap = {
  blue: 'bg-[#EEF4FF] text-[#4B86F1]',
  mint: 'bg-[#EAFBF7] text-[#2FB59A]',
  purple: 'bg-[#F1EEFF] text-[#7B6DEF]',
  amber: 'bg-[#FFF4E1] text-[#E89A2A]',
  sky: 'bg-[#EEF7FF] text-[#4CA4F1]',
  coral: 'bg-[#FFF0EA] text-[#EB7D63]',
  green: 'bg-[#EAF8F2] text-[#2EA46F]',
}

const productToneMap = {
  'personal-assistant': {
    icon: '◌',
    iconTone: 'green',
    badge: '个人效率系统',
    heroTitle: '你的个人效率中枢\n把计划、执行与复盘真正串起来',
    heroDescription: '个人助手整合任务、习惯、日程、笔记与 AI 整理能力，让每一天都更有方向，也更容易坚持。',
    heroPrimaryLabel: '立即体验 Beta',
    heroPrimaryTo: '/community',
    heroSecondaryLabel: '进入产品中心',
    heroSecondaryTo: '/products',
    heroCaption: '适合个人管理、习惯养成与长期目标追踪',
    stats: [
      { value: '任务 x 目标', label: '统一管理' },
      { value: '日程 + 待办', label: '自然联动' },
      { value: 'AI 复盘', label: '持续沉淀' },
      { value: '成长仪表盘', label: '长期追踪' },
    ],
    ecosystemTitle: '覆盖你的日常效率场景',
    ecosystem: ['任务管理', '目标规划', '习惯养成', '日程同步', '复盘记录', '个人知识库'],
    abilitiesTitle: '核心能力',
    abilitiesSubtitle: '把零散事务拉成一条稳定链路，让效率真正可持续。',
    abilities: [
      { icon: '◫', title: '任务总览', description: '集中查看待办、项目与长期目标。', tone: 'green' },
      { icon: '⟲', title: '日程协同', description: '把时间块与任务安排自然关联。', tone: 'blue' },
      { icon: '✦', title: 'AI 复盘', description: '自动提炼重点，沉淀每一天的有效信息。', tone: 'mint' },
      { icon: '▤', title: '习惯追踪', description: '用仪表盘观察持续性与阶段成果。', tone: 'amber' },
      { icon: '☁', title: '多端同步', description: '随时记录和接力，不让信息散落。', tone: 'sky' },
    ],
    stepsTitle: '从计划到结果，只需 4 步',
    stepsSubtitle: '建立日常节奏，让任务、行动与复盘稳定闭环。',
    steps: [
      { icon: '✦', title: '收集任务', description: '把待办、目标和想法先统一收进系统。', tone: 'green' },
      { icon: '⟲', title: '安排节奏', description: '为每件事匹配时间块与执行顺序。', tone: 'blue' },
      { icon: '▶', title: '专注执行', description: '按清晰节奏推进，减少切换成本。', tone: 'mint' },
      { icon: '▥', title: '回顾优化', description: '用 AI 整理输出与复盘，持续升级效率系统。', tone: 'coral' },
    ],
  },
  'parenting-assistant': {
    icon: '◉',
    iconTone: 'coral',
    badge: '家庭陪伴助手',
    heroTitle: '你的育儿成长搭档\n记录、提醒与陪伴一次到位',
    heroDescription: '育儿助手围绕成长记录、启蒙建议、亲子互动和日常提醒设计，帮助家庭把爱与照护变成更轻松的日常。',
    heroPrimaryLabel: '加入体验计划',
    heroPrimaryTo: '/community',
    heroSecondaryLabel: '进入产品中心',
    heroSecondaryTo: '/products',
    heroCaption: '面向 0-8 岁家庭的陪伴型成长工具',
    stats: [
      { value: '成长记录', label: '轻量沉淀' },
      { value: '喂养 / 睡眠', label: '统一管理' },
      { value: '启蒙建议', label: '按年龄推送' },
      { value: '家庭协作', label: '信息更顺畅' },
    ],
    ecosystemTitle: '覆盖家庭照护与成长陪伴场景',
    ecosystem: ['成长记录', '家庭提醒', '早教建议', '亲子互动', '共管协作', '成长轨迹'],
    abilitiesTitle: '核心能力',
    abilitiesSubtitle: '帮助家长减少信息割裂，让陪伴更轻松也更有节奏。',
    abilities: [
      { icon: '◫', title: '成长记录', description: '把睡眠、饮食、身高体重和关键事件都沉淀下来。', tone: 'coral' },
      { icon: '⟲', title: '日常提醒', description: '围绕家庭节奏建立稳定提醒与照护清单。', tone: 'amber' },
      { icon: '✦', title: '启蒙建议', description: '基于年龄阶段推荐更合适的互动与学习方式。', tone: 'mint' },
      { icon: '▤', title: '照护协同', description: '让家人之间的信息同步更自然、更省心。', tone: 'purple' },
      { icon: '☁', title: '随时记录', description: '手机端随手记，关键瞬间不会遗漏。', tone: 'sky' },
    ],
    stepsTitle: '从记录到陪伴，只需 4 步',
    stepsSubtitle: '把照护日常变成稳定系统，让家庭沟通更轻松。',
    steps: [
      { icon: '✦', title: '记录日常', description: '随手记录喂养、睡眠和成长节点。', tone: 'coral' },
      { icon: '⟲', title: '整理轨迹', description: '把零散信息整理成连续可回看的成长线。', tone: 'amber' },
      { icon: '▶', title: '获取提醒', description: '围绕任务、日程和变化给出及时提醒。', tone: 'mint' },
      { icon: '▥', title: '陪伴优化', description: '根据记录和建议调整家庭陪伴方式。', tone: 'purple' },
    ],
  },
  'ai-tools': {
    icon: '◫',
    iconTone: 'blue',
    badge: 'AI 工具助手',
  },
}

const articleMap = computed(() => Object.fromEntries(siteStore.articlesData.map((item) => [item.slug, item])))

const defaultDetail = computed(() => {
  const tone = productToneMap[product.value.slug] || productToneMap['ai-tools']
  const firstTag = product.value.tags[0] || '产品能力'
  const templates = [
    { title: `${product.value.name} 使用指南`, badge: '指南', image: product.value.cover, usage: '持续更新' },
    { title: `${firstTag} 场景模板`, badge: '模板', image: product.value.cover, usage: '精选整理' },
    { title: `${product.value.name} 上手清单`, badge: '清单', image: product.value.cover, usage: '快速开始' },
    { title: `${product.value.name} 实践案例`, badge: '案例', image: product.value.banner || product.value.cover, usage: '真实场景' },
    { title: `${product.value.name} FAQ`, badge: '帮助', image: product.value.cover, usage: '常见问题' },
  ]

  return {
    eyebrow: tone.badge,
    heroTitle: tone.heroTitle || `${product.value.name}\n更清晰的体验与更稳定的使用节奏`,
    heroDescription: tone.heroDescription || product.value.summary,
    heroPrimaryLabel: tone.heroPrimaryLabel || '获取体验',
    heroPrimaryTo: tone.heroPrimaryTo || '/community',
    heroSecondaryLabel: tone.heroSecondaryLabel || '返回产品中心',
    heroSecondaryTo: tone.heroSecondaryTo || '/products',
    heroCaption: tone.heroCaption || product.value.shortDesc,
    stats: tone.stats || [
      { value: product.value.price || '持续迭代', label: '当前体验价' },
      { value: product.value.tags[0] || '产品能力', label: '核心方向' },
      { value: product.value.tags[1] || '持续更新', label: '适用场景' },
      { value: product.value.tags[2] || '更多功能', label: '体验关键词' },
    ],
    ecosystemTitle: tone.ecosystemTitle || '适用的核心场景',
    ecosystem: tone.ecosystem || product.value.tags,
    abilitiesTitle: tone.abilitiesTitle || '核心能力',
    abilitiesSubtitle: tone.abilitiesSubtitle || product.value.shortDesc,
    abilities: tone.abilities || product.value.features.map((item, index) => ({
      icon: ['◫', '⟲', '✦', '▤', '☁'][index % 5],
      title: item.title,
      description: item.description,
      tone: ['blue', 'mint', 'purple', 'amber', 'sky'][index % 5],
    })),
    stepsTitle: tone.stepsTitle || '从体验到结果，只需 4 步',
    stepsSubtitle: tone.stepsSubtitle || '把产品放进真实场景中，形成清晰的使用闭环。',
    steps: tone.steps || [
      { icon: '✦', title: '明确需求', description: '先从你最想解决的真实问题开始。', tone: 'blue' },
      { icon: '⟲', title: '选择功能', description: '找到最适合当前场景的使用模块。', tone: 'mint' },
      { icon: '▶', title: '开始体验', description: '快速上手，进入真实使用节奏。', tone: 'purple' },
      { icon: '▥', title: '复盘优化', description: '根据反馈调整自己的使用方式。', tone: 'coral' },
    ],
    templatesTitle: '精选模板 / 使用场景',
    templatesSubtitle: '开箱即用，持续更新。',
    templates,
    ctaTitle: `立即体验 ${product.value.name}`,
    ctaPoints: [
      'Beta 版本抢先体验',
      '持续迭代与能力升级',
      '适合真实场景长期使用',
    ],
    ctaPrimaryLabel: '加入体验计划',
    ctaPrimaryTo: '/community',
    ctaSecondaryLabel: '进入产品中心',
    ctaSecondaryTo: '/products',
    ctaCaption: '支持 Web / 移动端体验路线持续扩展',
    articlesTitle: '相关文章',
    articlesCtaLabel: '进入文章中心',
    articlesCtaTo: '/articles',
    articles: siteStore.articlesData
      .filter((item) => item.tags.some((tag) => product.value.tags.includes(tag)))
      .slice(0, 4)
      .map((item) => item.slug),
    moreTitle: '更多产品',
    moreItems: siteStore.productsData
      .filter((item) => item.slug !== product.value.slug)
      .slice(0, 4)
      .map((item, index) => ({
        title: item.name,
        desc: item.shortDesc,
        to: `/products/${item.slug}`,
        icon: ['◌', '◉', '✦', '▣'][index % 4],
        tone: ['green', 'coral', 'blue', 'purple'][index % 4],
      })),
    wishlistTitle: `喜欢 ${product.value.name}？`,
    wishlistDescription: '加入心愿单，获取更新提醒与专属资料，不错过每一次进化。',
    wishlistLabel: '加入心愿单',
    wishlistTo: '/wishlist',
    heroMockImage: product.value.cover,
    heroIcon: tone.icon || '◫',
    heroIconTone: tone.iconTone || 'blue',
  }
})

const detail = computed(() => {
  const base = defaultDetail.value
  const custom = product.value.detailPage || {}
  return {
    ...base,
    ...custom,
    stats: custom.stats || base.stats,
    ecosystem: custom.ecosystem || base.ecosystem,
    abilities: custom.abilities || base.abilities,
    steps: custom.steps || base.steps,
    templates: custom.templates || base.templates,
    articles: custom.articles || base.articles,
    moreItems: custom.moreItems || base.moreItems,
    heroIcon: custom.heroIcon || base.heroIcon,
    heroIconTone: custom.heroIconTone || base.heroIconTone,
  }
})

const relatedArticles = computed(() =>
  detail.value.articles
    .map((slug) => articleMap.value[slug])
    .filter(Boolean)
)

const moreProducts = computed(() => detail.value.moreItems)
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(193,216,255,0.3),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(213,235,255,0.38),transparent_18%),linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_34%,#F7FAFF_100%)]">
    <section class="relative overflow-hidden border-b border-[#E5EDF8] bg-[radial-gradient(circle_at_28%_100%,rgba(108,155,255,0.18),transparent_18%),linear-gradient(180deg,#FBFDFF_0%,#F7FAFF_100%)]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(146,193,255,0.16),transparent_22%),radial-gradient(circle_at_72%_0%,rgba(255,255,255,0.86),transparent_26%)]"></div>
      <div class="container-content py-8 md:py-10">
        <BreadcrumbNav :items="breadcrumbItems" />

        <div class="grid gap-8 xl:grid-cols-[minmax(0,0.86fr)_minmax(520px,1.14fr)] xl:items-center">
          <div class="relative z-10">
            <div class="flex items-center gap-3">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-[20px] text-3xl text-white shadow-[0_18px_34px_rgba(61,124,245,0.24)]"
                :class="detail.heroIconTone === 'green'
                  ? 'bg-[linear-gradient(135deg,#46C38B_0%,#239E67_100%)]'
                  : detail.heroIconTone === 'coral'
                    ? 'bg-[linear-gradient(135deg,#FF8C7B_0%,#F46A5D_100%)]'
                    : 'bg-[linear-gradient(135deg,#6FA6FF_0%,#3D7CF5_100%)]'"
              >
                {{ detail.heroIcon }}
              </div>
              <span class="rounded-full bg-[#EEF4FF] px-4 py-2 text-sm font-semibold text-[#4A84F0]">{{ detail.eyebrow }}</span>
            </div>

            <h1 class="mt-6 whitespace-pre-line font-serif text-5xl font-semibold leading-[1.16] text-[#17233D] md:text-[3.8rem]">
              {{ detail.heroTitle }}
            </h1>
            <p class="mt-6 max-w-[620px] text-base leading-8 text-[#5A6E8C] md:text-lg">
              {{ detail.heroDescription }}
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link
                :to="detail.heroPrimaryTo"
                class="inline-flex items-center rounded-[12px] bg-[#2F7AF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(47,122,243,0.22)] transition-colors hover:bg-[#2168DE]"
              >
                {{ detail.heroPrimaryLabel }}
              </router-link>
              <router-link
                :to="detail.heroSecondaryTo"
                class="inline-flex items-center rounded-[12px] border border-[#D8E4F5] bg-white px-6 py-3 text-sm font-semibold text-[#38537A] transition-colors hover:bg-[#F7FAFF]"
              >
                {{ detail.heroSecondaryLabel }}
              </router-link>
            </div>

            <div class="mt-5 text-sm text-[#8A9BB3]">{{ detail.heroCaption }}</div>

            <div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="item in detail.stats"
                :key="item.label"
                class="rounded-[18px] border border-[#E9F0FA] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,250,255,0.94)_100%)] px-5 py-4 shadow-[0_16px_32px_rgba(76,108,168,0.07)] backdrop-blur"
              >
                <div class="text-3xl font-semibold text-[#2F7AF3]">{{ item.value }}</div>
                <div class="mt-2 text-sm text-[#7B8AA2]">{{ item.label }}</div>
              </div>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-[36px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(245,249,255,0.96)_100%)] p-5 shadow-[0_34px_74px_rgba(84,116,178,0.18)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(91,138,255,0.14),transparent_20%),radial-gradient(circle_at_78%_12%,rgba(177,219,255,0.3),transparent_22%),radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.9),transparent_34%)]"></div>
            <div class="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_210px] lg:items-end">
              <div class="overflow-hidden rounded-[24px] border border-[#E8EEF8] bg-white shadow-[0_14px_30px_rgba(71,100,151,0.08)]">
                <div class="flex items-center justify-between border-b border-[#EDF2FA] px-5 py-4">
                  <div class="text-sm font-semibold text-[#39537A]">{{ product.name }}</div>
                  <div class="h-8 w-40 rounded-full bg-[#F4F7FB]"></div>
                </div>
                <div class="grid gap-4 p-5 lg:grid-cols-[180px_1fr]">
                  <div class="space-y-3">
                    <div
                      v-for="item in detail.abilities.slice(0, 5)"
                      :key="item.title"
                      class="rounded-[12px] px-4 py-3 text-sm font-medium"
                      :class="item === detail.abilities[0] ? 'bg-[#EEF4FF] text-[#2F7AF3]' : 'bg-[#F8FAFE] text-[#61718A]'"
                    >
                      {{ item.title }}
                    </div>
                  </div>
                  <div>
                    <div class="grid gap-3 sm:grid-cols-3">
                      <div v-for="item in ['快速开始', '核心能力', '精选模板']" :key="item" class="rounded-[16px] border border-[#E8EEF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAFCFF_100%)] p-4 shadow-[0_8px_18px_rgba(83,111,165,0.04)]">
                        <div class="text-sm font-semibold text-[#3A547A]">{{ item }}</div>
                      </div>
                    </div>
                    <div class="mt-4 space-y-3">
                      <div
                        v-for="item in detail.templates.slice(0, 4)"
                        :key="item.title"
                        class="flex items-center justify-between rounded-[14px] border border-[#EDF2FA] bg-white px-4 py-3"
                      >
                        <div class="text-sm font-medium text-[#4E6180]">{{ item.title }}</div>
                        <span class="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#4D84EF]">{{ item.badge }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mx-auto w-[210px] translate-y-3 overflow-hidden rounded-[30px] border-[6px] border-[#101521] bg-white shadow-[0_24px_50px_rgba(24,31,46,0.22)]">
                <div class="border-b border-[#EFF3FA] px-4 pb-3 pt-4">
                  <div class="text-sm font-semibold text-[#253654]">{{ product.name }}</div>
                  <div class="mt-3 h-9 rounded-full bg-[#F5F8FC]"></div>
                </div>
                <div class="space-y-4 px-4 py-5">
                  <div>
                    <div class="text-xs font-semibold text-[#7D8EAA]">快捷入口</div>
                    <div class="mt-3 grid grid-cols-4 gap-2">
                      <div v-for="item in 4" :key="item" class="h-14 rounded-[14px] bg-[#F5F8FE]"></div>
                    </div>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-[#7D8EAA]">最近使用</div>
                    <div class="mt-3 space-y-2">
                      <div v-for="item in 4" :key="item" class="h-10 rounded-[12px] bg-[#F7FAFE]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-[24px] border border-[#E7EEF9] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(247,250,255,0.94)_100%)] px-6 py-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)] backdrop-blur">
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div class="text-sm font-semibold text-[#5F7290]">{{ detail.ecosystemTitle }}</div>
            <div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-[#546A8A]">
              <span v-for="item in detail.ecosystem" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="container-content">
        <SectionTitle :title="detail.abilitiesTitle" :subtitle="detail.abilitiesSubtitle" />
        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="item in detail.abilities"
            :key="item.title"
            class="rounded-[24px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl" :class="abilityToneMap[item.tone] || abilityToneMap.blue">
              {{ item.icon }}
            </div>
            <h3 class="mt-5 text-xl font-semibold text-[#17233D]">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-[#61718B]">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-6">
      <div class="container-content">
        <SectionTitle :title="detail.stepsTitle" :subtitle="detail.stepsSubtitle" />
        <div class="mt-8 overflow-hidden rounded-[28px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FCFF_100%)] p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)] md:p-7">
          <div class="grid gap-5 xl:grid-cols-4">
            <div v-for="item in detail.steps" :key="item.title" class="flex gap-4 xl:block xl:rounded-[20px] xl:border xl:border-[#EEF3FA] xl:bg-white/72 xl:p-5">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] text-2xl" :class="abilityToneMap[item.tone] || abilityToneMap.blue">
                {{ item.icon }}
              </div>
              <div class="xl:mt-4">
                <h3 class="text-lg font-semibold text-[#17233D]">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="container-content">
        <div class="flex items-center justify-between gap-4">
          <SectionTitle :title="detail.templatesTitle" :subtitle="detail.templatesSubtitle" />
          <router-link to="/articles" class="text-sm font-semibold text-[#3B7FF2]">查看全部模板库 →</router-link>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="item in detail.templates"
            :key="item.title"
            class="overflow-hidden rounded-[24px] border border-[#E6EDF8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
          >
            <div class="relative">
              <img :src="item.image" :alt="item.title" class="aspect-[16/11] w-full object-cover" />
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(245,249,255,0.12)_100%)]"></div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between gap-3">
                <span class="rounded-full bg-[#FFF0E4] px-2.5 py-1 text-[11px] font-semibold text-[#E18747]">{{ item.badge }}</span>
              </div>
              <h3 class="mt-3 text-lg font-semibold leading-tight text-[#17233D]">{{ item.title }}</h3>
              <p class="mt-3 text-sm text-[#8090A9]">{{ item.usage }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="container-content">
        <div class="overflow-hidden rounded-[34px] border border-[#DFE9F8] bg-[radial-gradient(circle_at_20%_24%,rgba(160,204,255,0.32),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(210,231,255,0.42),transparent_18%),linear-gradient(135deg,#EFF5FF_0%,#FFFFFF_58%,#F5F9FF_100%)] p-8 shadow-[0_24px_50px_rgba(76,108,168,0.1)] md:p-10">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
            <div>
              <h2 class="font-serif text-4xl font-semibold text-[#17233D]">{{ detail.ctaTitle }}</h2>
              <ul class="mt-5 space-y-2 text-sm leading-7 text-[#5B6F8D]">
                <li v-for="item in detail.ctaPoints" :key="item">✓ {{ item }}</li>
              </ul>
              <div class="mt-7 flex flex-wrap gap-4">
                <router-link :to="detail.ctaPrimaryTo" class="inline-flex items-center rounded-[12px] bg-[#2F7AF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(47,122,243,0.22)] transition-colors hover:bg-[#2168DE]">
                  {{ detail.ctaPrimaryLabel }}
                </router-link>
                <router-link :to="detail.ctaSecondaryTo" class="inline-flex items-center rounded-[12px] border border-[#D8E4F5] bg-white px-6 py-3 text-sm font-semibold text-[#38537A] transition-colors hover:bg-[#F7FAFF]">
                  {{ detail.ctaSecondaryLabel }}
                </router-link>
              </div>
              <div class="mt-4 text-sm text-[#8A9BB3]">{{ detail.ctaCaption }}</div>
            </div>

            <div class="flex items-center justify-center">
              <div class="relative flex w-full max-w-[560px] items-end justify-center gap-4">
                <div class="hidden h-56 w-28 rounded-[28px] bg-[linear-gradient(180deg,#F7FAFF_0%,#E7F0FF_100%)] opacity-80 md:block"></div>
                <div class="w-[150px] translate-y-5 overflow-hidden rounded-[26px] border-[6px] border-[#121826] bg-white shadow-[0_18px_40px_rgba(24,31,46,0.2)]">
                  <div class="h-[250px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)]"></div>
                </div>
                <div class="w-[300px] overflow-hidden rounded-[28px] border border-[#E3EBF8] bg-white shadow-[0_22px_46px_rgba(76,108,168,0.14)]">
                  <img :src="product.cover" :alt="product.name" class="aspect-[16/11] w-full object-cover" />
                </div>
                <div class="hidden h-64 w-20 rounded-[28px] bg-[linear-gradient(180deg,#FFFFFF_0%,#EDF4FF_100%)] opacity-84 md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="container-content">
        <div class="flex items-center justify-between gap-4">
          <SectionTitle :title="detail.articlesTitle" />
          <router-link :to="detail.articlesCtaTo" class="text-sm font-semibold text-[#3B7FF2]">{{ detail.articlesCtaLabel }} →</router-link>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="item in relatedArticles"
            :key="item.slug"
            :to="`/articles/${item.slug}`"
            class="group overflow-hidden rounded-[24px] border border-[#DCE7F8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
          >
            <img :src="item.cover" :alt="item.title" class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div class="p-4">
              <div class="rounded-full bg-[#EFF4FF] px-3 py-1 text-xs font-semibold inline-flex text-[#4D84EF]">{{ item.category }}</div>
              <h3 class="mt-3 text-xl font-semibold leading-tight text-[#17233D]">{{ item.title }}</h3>
              <div class="mt-4 flex items-center justify-between text-sm text-[#8090A9]">
                <span>{{ item.publishedAt }}</span>
                <span>{{ item.readingTime }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="py-6">
      <div class="container-content">
        <SectionTitle :title="detail.moreTitle" />
        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <router-link
            v-for="item in moreProducts"
            :key="item.title"
            :to="item.to"
            class="rounded-[24px] border border-[#DCE7F8] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(76,108,168,0.1)]"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl" :class="abilityToneMap[item.tone] || abilityToneMap.blue">
              {{ item.icon }}
            </div>
            <h3 class="mt-4 text-xl font-semibold text-[#17233D]">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
            <div class="mt-4 text-sm font-semibold text-[#3B7FF2]">了解更多 →</div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="pb-16 pt-10">
      <div class="container-content">
        <div class="flex flex-col gap-4 rounded-[24px] border border-[#DCE7F8] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FCFF_100%)] px-6 py-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)] md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-[#17233D]">{{ detail.wishlistTitle }}</h2>
            <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ detail.wishlistDescription }}</p>
          </div>
          <router-link :to="detail.wishlistTo" class="inline-flex items-center rounded-full border border-[#CFE0FB] px-5 py-3 text-sm font-semibold text-[#3B7FF2] transition-colors hover:bg-[#F6FAFF]">
            ♡ {{ detail.wishlistLabel }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
