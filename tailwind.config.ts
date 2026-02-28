import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#09090B',
        nebula: '#0D0D1A',
        'star-white': '#F5F5F7',
        muted: '#A1A1AA',
        'accent-pulse': '#6366F1',
        'accent-glow': '#818CF8',
        signal: '#E4E4E7',
        surface: '#18181B',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        accent: ['DM Serif Display', 'serif'],
      },
      fontSize: {
        hero: 'clamp(56px, 8vw, 96px)',
        h2: '48px',
        h3: '28px',
        body: '18px',
        caption: '13px',
        label: '11px',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '32px',
        lg: '64px',
        xl: '96px',
        '2xl': '160px',
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        pill: '100px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        default: '700ms',
        fast: '300ms',
      },
      maxWidth: {
        content: '1200px',
      },
      backdropBlur: {
        nav: '16px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'aurora': 'aurora 8s ease infinite',
        'signal-wave': 'signalWave 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'draw-line': 'drawLine 2s ease-in-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.7)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        signalWave: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.7' },
          '50%': { transform: 'scaleY(1.6)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
