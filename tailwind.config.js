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
          base: '#F5F7FA',
          warm: '#EDF1F5',
          card: '#FFFFFF',
          charcoal: '#1A2332',
          grey: '#E2E8F0',
          text: '#4A5568',
          muted: '#7A8A9E',
        },
        accent: {
          blue: '#3B6B9E',
          'blue-dark': '#2A5280',
          'blue-light': '#5B8DBE',
          soft: '#EBF2F8',
        },
        gold: {
          DEFAULT: '#B8965A',
          light: '#F0D9AD',
        },
        mint: {
          DEFAULT: '#6B9EAE',
          light: '#DCECEF',
        },
        coral: {
          DEFAULT: '#E67E22',
          light: '#FFF3E0',
        },
        success: '#2E7D32',
        lab: {
          DEFAULT: '#4A90B8',
          light: '#D4E4F1',
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
        'card': '0 2px 8px rgba(26,35,50,0.06)',
        'card-hover': '0 8px 24px rgba(26,35,50,0.12)',
        'hero': '0 16px 48px rgba(26,35,50,0.12)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
            lineHeight: '1.75',
            color: '#1A2332',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
