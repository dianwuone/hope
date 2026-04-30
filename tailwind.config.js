/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 品牌主色
        brand: {
          warm: '#FAFAF8',
          charcoal: '#2D2D2D',
          grey: '#E8E6E1',
        },
        // 科技蓝灰 — 昆廷笔记 / 产品线
        accent: {
          blue: '#B8C5D3',
          'blue-dark': '#8FA4B8',
        },
        // 暖珊瑚 — 启鸣宝宝
        coral: {
          DEFAULT: '#D4A89A',
          light: '#E8C4B8',
        },
        // 琥珀金 — 快来尝鲜 / 销售
        amber: {
          DEFAULT: '#D4A574',
          light: '#E8C4A0',
        },
        // 紫色 — 实验室
        lab: {
          DEFAULT: '#A89BC4',
          light: '#C4B8D8',
        },
        // 薄荷绿 — 游戏
        mint: {
          DEFAULT: '#7EC8B8',
          light: '#A8DCD0',
        },
        // 成功绿
        success: '#6AAF7B',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
        'reading': '800px',
        'prose': '720px',
      },
      spacing: {
        'section': '80px',
        'section-lg': '120px',
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'card-active': '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
            lineHeight: '1.75',
            color: '#2D2D2D',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
