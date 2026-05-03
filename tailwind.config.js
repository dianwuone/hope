/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#FAF8F3',
          warm: '#F3EEE6',
          card: '#FFFDF9',
          charcoal: '#2F2A26',
          grey: '#DED6CA',
          text: '#62584E',
          muted: '#8A7D72',
        },
        accent: {
          blue: '#8EA7BB',
          'blue-dark': '#6F8699',
          'blue-light': '#B9CBD8',
          soft: '#EEF3F6',
        },
        gold: {
          DEFAULT: '#C49A6C',
          light: '#F3E1C8',
        },
        mint: {
          DEFAULT: '#8BA79A',
          light: '#E7F0EB',
        },
        coral: {
          DEFAULT: '#C98E7B',
          light: '#F5E5DE',
        },
        success: '#6A8C63',
        lab: {
          DEFAULT: '#9B9AB4',
          light: '#E7E5F0',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
      },
      maxWidth: {
        'content': '1200px',
        'reading': '800px',
        'prose': '720px',
      },
      spacing: {
        'section': '80px',
        'section-lg': '120px',
        'section-sm': '48px',
      },
      borderRadius: {
        'card': '16px',
        'panel': '20px',
      },
      boxShadow: {
        'card': '0 6px 18px rgba(70, 56, 41, 0.06)',
        'card-hover': '0 14px 32px rgba(70, 56, 41, 0.1)',
        'hero': '0 18px 48px rgba(70, 56, 41, 0.12)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
            lineHeight: '1.75',
            color: '#2F2A26',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
