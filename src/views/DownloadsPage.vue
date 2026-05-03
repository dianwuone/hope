<script setup>
import { computed } from 'vue'
import PageHero from '@/components/site/PageHero.vue'
import { downloadsPage, products } from '@/data'

const orders = [
  { name: '个人助手', orderNo: 'QW-202605-001', payment: '已支付', delivery: '已交付', statusTone: 'green' },
  { name: 'AI 工具助手', orderNo: 'QW-202605-002', payment: '待支付', delivery: '待交付', statusTone: 'amber' },
  { name: '育儿助手', orderNo: 'QW-202605-003', payment: '已支付', delivery: '已关闭', statusTone: 'grey' },
]

const versions = [
  { product: '个人助手', version: 'v1.2.0', channel: 'stable', notes: '新增日程视图与习惯复盘，优化同步速度。', size: '18.2 MB' },
  { product: '育儿助手', version: 'v1.0.8', channel: 'beta', notes: '新增成长记录模板与家庭提醒。', size: '12.5 MB' },
  { product: 'AI 工具助手', version: 'v0.9.5', channel: 'beta', notes: '更新模板中心与工作流编排体验。', size: '24.6 MB' },
]

const resources = [
  { name: '产品使用手册', desc: '快速了解产品功能与使用方法', size: '3.2 MB' },
  { name: '版本更新说明', desc: '查看最近版本的更新内容', size: '1.1 MB' },
  { name: '安装与常见问题', desc: '安装、登录、下载异常等问题说明', size: '2.4 MB' },
]

const statusClass = {
  green: 'bg-[#EAF8F2] text-[#2EA46F]',
  amber: 'bg-[#FFF3E1] text-[#EA982A]',
  grey: 'bg-[#F3F5F8] text-[#7384A0]',
}

const productMap = computed(() => Object.fromEntries(products.map((item) => [item.name, item])))
</script>

<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(198,223,255,0.24),transparent_24%),linear-gradient(180deg,#F7FBFF_0%,#FFFFFF_38%,#F6FAFF_100%)] text-[#17233D]">
    <PageHero eyebrow="Downloads" :title="downloadsPage.title" :subtitle="downloadsPage.subtitle" :image="downloadsPage.banner" image-alt="下载中心" />

    <section class="section-shell pt-0">
      <div class="container-content grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <main class="space-y-6">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-semibold text-[#17233D]">我的订单</h2>
              <router-link to="/try" class="text-sm font-semibold text-[#2F7AF3]">去快来尝鲜看看 →</router-link>
            </div>
            <div class="mt-6 space-y-4">
              <article v-for="item in orders" :key="item.orderNo" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="text-lg font-semibold text-[#17233D]">{{ item.name }}</div>
                    <div class="mt-1 text-sm text-[#8A9BB3]">{{ item.orderNo }}</div>
                  </div>
                  <div class="flex gap-2">
                    <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="statusClass[item.statusTone]">{{ item.payment }}</span>
                    <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="statusClass[item.statusTone]">{{ item.delivery }}</span>
                  </div>
                </div>
                <div class="mt-4 text-sm text-[#61718B]">
                  <template v-if="item.delivery === '待交付'">预计 24 小时内交付</template>
                  <template v-else-if="item.delivery === '已交付'">
                    <button class="rounded-full bg-[#2F7AF3] px-4 py-2 text-white">下载</button>
                  </template>
                  <template v-else>如有问题请联系社区支持</template>
                </div>
              </article>
            </div>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">版本更新</h2>
            <div class="mt-6 space-y-4">
              <article v-for="item in versions" :key="`${item.product}-${item.version}`" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="text-lg font-semibold text-[#17233D]">{{ item.product }} · {{ item.version }}</div>
                    <div class="mt-1 text-sm text-[#8A9BB3]">{{ item.notes }}</div>
                  </div>
                  <span class="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#2F7AF3]">{{ item.channel }}</span>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm text-[#7384A0]">
                  <span>{{ item.size }}</span>
                  <button class="text-[#2F7AF3] font-semibold">下载版本</button>
                </div>
              </article>
            </div>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-6 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <h2 class="text-2xl font-semibold text-[#17233D]">资料下载</h2>
            <div class="mt-6 grid gap-4 md:grid-cols-3">
              <article v-for="item in resources" :key="item.name" class="rounded-[18px] border border-[#EEF3FA] bg-[#FBFDFF] p-5">
                <div class="text-lg font-semibold text-[#17233D]">{{ item.name }}</div>
                <p class="mt-2 text-sm leading-7 text-[#61718B]">{{ item.desc }}</p>
                <div class="mt-4 flex items-center justify-between text-sm text-[#7384A0]">
                  <span>{{ item.size }}</span>
                  <button class="text-[#2F7AF3] font-semibold">下载</button>
                </div>
              </article>
            </div>
          </div>
        </main>

        <aside class="space-y-5">
          <div class="rounded-[26px] border border-[#E7EEF9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_100%)] p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">需要帮助？</div>
            <p class="mt-4 text-sm leading-7 text-[#61718B]">遇到下载或交付问题，可以直接联系作者或加入社区。</p>
            <router-link to="/community" class="mt-5 inline-flex rounded-[12px] bg-[#2F7AF3] px-5 py-3 text-sm font-semibold text-white">联系支持</router-link>
          </div>

          <div class="rounded-[26px] border border-[#E7EEF9] bg-white p-5 shadow-[0_16px_34px_rgba(76,108,168,0.07)]">
            <div class="text-2xl font-semibold text-[#17233D]">覆盖产品</div>
            <div class="mt-5 space-y-4">
              <div v-for="product in products" :key="product.slug" class="flex items-center gap-4">
                <img :src="product.cover" :alt="product.name" class="h-14 w-14 rounded-[16px] object-cover" />
                <div>
                  <div class="font-semibold text-[#17233D]">{{ product.name }}</div>
                  <div class="text-xs text-[#8A9BB3]">{{ product.supportStatus }}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
