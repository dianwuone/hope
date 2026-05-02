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
    banner: bannerKunting,
    avatar: avatarQuentin,
    author: '昆廷',
    tags: ['AI 提效', '独立开发', '产品思考', '生活记录'],
  },
  qiming: {
    slug: 'qiming',
    name: '启鸣宝宝',
    title: '用爱与方法，陪孩子走好每一步成长路',
    subtitle: '聚焦启蒙教育、亲子陪伴、幼小衔接与家庭成长。',
    banner: bannerQiming,
    avatar: avatarQiming,
    author: '启鸣妈妈',
    tags: ['亲子成长', '育儿启蒙', '幼小衔接', '亲子游戏'],
  },
}
