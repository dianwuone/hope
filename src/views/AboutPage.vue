<script setup>
import { aboutPage, homePage } from '@/data'

const iconMap = {
  rocket: '✦',
  note: '▣',
  chat: '◌',
  gift: '✧',
  heart: '♡',
}
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(247,224,196,0.32),transparent_28%),linear-gradient(180deg,#FFF9F1_0%,#FFFDF8_36%,#FFF9F2_100%)]">
    <section class="relative overflow-hidden border-b border-[#F0E2D2]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(255,226,188,0.22),transparent_18%),radial-gradient(circle_at_74%_18%,rgba(243,207,162,0.2),transparent_24%)]"></div>

      <div class="container-content relative z-10 py-8">
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)]">
          <div class="overflow-hidden rounded-[30px] border border-[#F1DFC9] bg-[linear-gradient(135deg,rgba(255,251,245,0.94)_0%,rgba(255,248,240,0.92)_100%)] p-8 shadow-[0_22px_54px_rgba(143,101,55,0.12)] md:p-10">
            <div class="text-sm font-semibold tracking-[0.16em] text-[#DD8B46]">{{ aboutPage.eyebrow }}</div>
            <h1 class="mt-5 max-w-[720px] font-serif text-4xl font-semibold leading-[1.22] text-[#433024] md:text-[3.55rem]">
              {{ aboutPage.title }}
            </h1>
            <p class="mt-5 max-w-[560px] text-base leading-8 text-[#7B6552] md:text-lg">
              {{ aboutPage.subtitle }}
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link
                v-for="action in aboutPage.actions"
                :key="action.label"
                :to="action.to"
                :class="action.variant === 'primary'
                  ? 'bg-[#C97545] text-white hover:bg-[#B96738] shadow-[0_12px_24px_rgba(201,117,69,0.22)]'
                  : 'border border-[#E3B28E] bg-white/82 text-[#AF683C] hover:bg-white'"
                class="inline-flex items-center rounded-[12px] px-6 py-3 text-sm font-semibold transition-colors"
              >
                {{ action.label }}
              </router-link>
            </div>
          </div>

          <div class="grid gap-6">
            <div class="relative overflow-hidden rounded-[30px] border border-[#EFDCC7] bg-[linear-gradient(135deg,#FFF2E1_0%,#FEEFD7_42%,#F8DEC0_100%)] p-6 shadow-[0_22px_54px_rgba(143,101,55,0.12)]">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.45),transparent_24%),radial-gradient(circle_at_78%_78%,rgba(255,240,214,0.4),transparent_22%)]"></div>
              <div class="relative grid min-h-[300px] gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div class="flex items-end">
                  <div class="rounded-[26px] border border-[#E9CBA8] bg-[linear-gradient(180deg,rgba(255,250,242,0.96)_0%,rgba(248,230,202,0.9)_100%)] p-5 shadow-[0_18px_40px_rgba(143,101,55,0.1)]">
                    <div class="font-serif text-2xl text-[#97633E]">Create<br />Build<br />Share</div>
                  </div>
                </div>

                <div class="flex items-start justify-end">
                  <div class="w-full max-w-[280px] rounded-[24px] border border-white/75 bg-white/86 p-5 shadow-[0_18px_36px_rgba(143,101,55,0.1)] backdrop-blur">
                    <h2 class="text-xl font-semibold text-[#493425]">{{ aboutPage.journeyTitle }}</h2>
                    <div class="mt-5 space-y-4">
                      <div v-for="item in aboutPage.journey" :key="item.step" class="flex gap-3">
                        <span class="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1E4] text-[#D27C42]">◌</span>
                        <div>
                          <div class="text-sm font-semibold text-[#5A4333]">{{ item.step }}</div>
                          <div class="mt-1 text-xs leading-6 text-[#8A7463]">{{ item.detail }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="container-content grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div class="rounded-[24px] border border-[#EFDCC7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF7EE_100%)] p-6 shadow-[0_18px_40px_rgba(143,101,55,0.08)]">
          <h2 class="text-xl font-semibold text-[#493425]">{{ aboutPage.joinCard.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-[#7F6A59]">{{ aboutPage.joinCard.subtitle }}</p>
          <img :src="homePage.community.qr" alt="社区二维码" class="mx-auto mt-5 h-52 w-52 rounded-[18px] border border-[#F0E2D2] bg-white p-3 shadow-[0_12px_28px_rgba(143,101,55,0.08)]" />
          <div class="mt-4 rounded-[12px] bg-white px-4 py-3 text-center text-sm font-medium text-[#9A7A61] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
            {{ aboutPage.joinCard.qrLabel }}
          </div>
        </div>

        <div class="rounded-[24px] border border-[#EFDCC7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF8F0_100%)] p-6 shadow-[0_18px_40px_rgba(143,101,55,0.08)]">
          <h2 class="text-xl font-semibold text-[#493425]">{{ aboutPage.privilegesTitle }}</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <article
              v-for="item in aboutPage.privileges"
              :key="item.title"
              class="rounded-[20px] border border-[#F0E3D5] bg-white/86 p-5 text-center shadow-[0_12px_28px_rgba(143,101,55,0.06)]"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2E4] text-xl text-[#D67E44]">
                {{ iconMap[item.icon] }}
              </div>
              <h3 class="mt-4 text-lg font-semibold text-[#513A2A]">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-[#8A7463]">{{ item.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="about-story" class="pb-8">
      <div class="container-content">
        <div class="rounded-[24px] border border-[#EFDCC7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF8F0_100%)] p-6 shadow-[0_18px_40px_rgba(143,101,55,0.08)]">
          <h2 class="text-xl font-semibold text-[#493425]">{{ aboutPage.channelsTitle }}</h2>
          <p class="mt-3 text-sm leading-7 text-[#7F6A59]">{{ aboutPage.channelsSubtitle }}</p>

          <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="item in aboutPage.channels"
              :key="item.name"
              class="rounded-[18px] border border-[#F0E3D5] bg-white/88 p-4 shadow-[0_10px_24px_rgba(143,101,55,0.05)]"
            >
              <div class="text-sm font-semibold text-[#5A4333]">{{ item.name }}</div>
              <div class="mt-2 text-xs leading-6 text-[#8A7463]">{{ item.desc }}</div>
            </article>
          </div>

          <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(220px,0.52fr)]">
            <div class="rounded-[20px] border border-[#F0E3D5] bg-white/86 p-5 shadow-[0_10px_24px_rgba(143,101,55,0.05)]">
              <div class="flex gap-4">
                <img :src="aboutPage.author.avatar" :alt="aboutPage.author.name" class="h-20 w-20 rounded-full object-cover shadow-[0_12px_24px_rgba(143,101,55,0.12)]" />
                <div>
                  <div class="text-xl font-semibold text-[#513A2A]">{{ aboutPage.author.title }}</div>
                  <div class="mt-1 text-sm font-medium text-[#C97745]">{{ aboutPage.author.name }}</div>
                </div>
              </div>
              <p class="mt-4 text-sm leading-7 text-[#7F6A59]">{{ aboutPage.author.description }}</p>
            </div>

            <div class="overflow-hidden rounded-[20px] border border-[#E9D4BC] bg-[linear-gradient(135deg,#C88C56_0%,#9F6A40_100%)] p-5 text-white shadow-[0_14px_30px_rgba(143,101,55,0.14)]">
              <h3 class="font-serif text-3xl leading-tight">{{ aboutPage.featureCard.title }}</h3>
              <p class="mt-4 text-sm leading-7 text-white/82">{{ aboutPage.featureCard.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8">
      <div class="container-content">
        <div class="grid gap-3 rounded-[20px] border border-[#EFDCC7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF8F0_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(143,101,55,0.06)] md:grid-cols-2 xl:grid-cols-6">
          <div
            v-for="item in aboutPage.stats"
            :key="item"
            class="text-center text-sm font-medium text-[#7A6656]"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="container-content">
        <div class="rounded-[26px] border border-[#EFDCC7] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF7EE_100%)] px-6 py-7 shadow-[0_18px_40px_rgba(143,101,55,0.08)] md:px-8">
          <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div>
              <h2 class="text-2xl font-semibold text-[#493425]">{{ aboutPage.subscribe.title }}</h2>
              <p class="mt-3 text-sm leading-7 text-[#7F6A59]">{{ aboutPage.subscribe.subtitle }}</p>
            </div>

            <form class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_108px]">
              <input
                type="email"
                :placeholder="aboutPage.subscribe.placeholder"
                class="h-12 rounded-[12px] border border-[#E8D4BF] bg-white px-4 text-sm text-[#5A4333] outline-none transition-colors placeholder:text-[#B39A86] focus:border-[#D38B56]"
              />
              <button
                type="button"
                class="h-12 rounded-[12px] bg-[#C97545] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#B96738]"
              >
                {{ aboutPage.subscribe.buttonLabel }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
