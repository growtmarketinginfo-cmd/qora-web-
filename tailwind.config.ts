import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // QORA Design System — Terrain + Signal + Intelligence
        qora: {
          bg:          '#0A0B0E',
          surface:     '#111318',
          border:      '#1E2228',
          primary:     '#C8F241',
          'primary-dim': '#A8D430',
          text:        '#F0F2F4',
          muted:       '#6B7280',
          subtle:      '#374151',
          accent:      '#4FFFB0',
          warning:     '#F59E0B',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem',   { lineHeight: '1' }],
      },
      backgroundImage: {
        'terrain-grid': `
          linear-gradient(rgba(200,242,65,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,242,65,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-64': '64px 64px',
      },
      animation: {
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up':     'fadeUp 0.5s ease-out forwards',
        'typing-dot':  'typingDot 1.4s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '30%':            { opacity: '1',   transform: 'scale(1)' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

export default config
