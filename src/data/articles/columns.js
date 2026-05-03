import bannerKunting from '@/assets/images/shucai/banners/banner-kunting.jpg'
import bannerQiming from '@/assets/images/shucai/banners/banner-qiming.jpg'
import avatarQuentin from '@/assets/images/shucai/avatars/avatar-quentin.jpg'
import avatarQiming from '@/assets/images/shucai/avatars/avatar-qiming.jpg'

export const columns = {
  kunting: {
    slug: 'kunting',
    name: '昆廷笔记',
    title: '用 AI 提效，用产品创造价值',
    subtitle: '记录独立开发、AI 工作流、内容生产与个人成长。',
    eyebrow: '昆廷笔记 · AI 提效与独立开发',
    intro: '分享独立开发、AI 工作流、产品方法与长期成长，把实践过程和有效经验沉淀成可复用的内容。',
    banner: bannerKunting,
    avatar: avatarQuentin,
    author: '昆廷',
    tags: ['AI 提效', '独立开发', '产品思考', '生活记录'],
    accent: {
      hero: 'from-[#F7EBDD] via-[#FDF8F2] to-[#FFFDFC]',
      panel: 'from-[#FFF9F2] via-[#FFFCF8] to-[#FFFFFF]',
      border: 'border-[#ECDCC6]',
      soft: 'bg-[#FFF2E2]',
      strong: 'bg-[#D97B37]',
      strongHover: 'hover:bg-[#c76b29]',
      text: 'text-[#C97C4B]',
      tag: 'bg-[#FFF1E0] text-[#C47A46]',
    },
    recommendations: ['ai-tools', 'personal-assistant', 'pinyin-adventure'],
    adSlots: {
      sideA: '广告位 A 300 × 250',
      topBanner: '广告位 B（横幅）728 × 90',
      bottomBox: '广告位 C 300 × 250',
    },
  },
  qiming: {
    slug: 'qiming',
    name: '启鸣宝宝',
    title: '用爱与方法，陪孩子走好每一步成长路',
    subtitle: '聚焦启蒙教育、亲子陪伴、幼小衔接与家庭成长。',
    eyebrow: '启鸣宝宝 · 陪伴孩子看见成长',
    intro: '分享育儿经验、启蒙方法、成长记录与亲子游戏，和你一起发现孩子成长中的更多可能。',
    banner: bannerQiming,
    avatar: avatarQiming,
    author: '启鸣妈妈',
    tags: ['亲子成长', '育儿启蒙', '幼小衔接', '亲子游戏'],
    accent: {
      hero: 'from-[#FCEBDF] via-[#FFF7F2] to-[#FFFDFC]',
      panel: 'from-[#FFF8F2] via-[#FFFCF8] to-[#FFFFFF]',
      border: 'border-[#F0DDCE]',
      soft: 'bg-[#FFF0E6]',
      strong: 'bg-[#E07A3F]',
      strongHover: 'hover:bg-[#cf6c34]',
      text: 'text-[#D37B58]',
      tag: 'bg-[#FFF0E6] text-[#D28361]',
    },
    recommendations: ['parenting-assistant', 'pinyin-adventure', 'community'],
    adSlots: {
      sideA: '广告位 A 300 × 250',
      topBanner: '广告位 B（横幅）728 × 90',
      bottomBox: '广告位 C 300 × 250',
    },
  },
}
