import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },

      animation: {
        'hero-zoom': 'heroZoomOut 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        heroZoomOut: {
          '0%':   { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.0)' },
        },
      }
    },
  },
  plugins: [],
}

export default config