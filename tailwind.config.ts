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
        playlist: ['var(--font-playlist-script)', 'cursive'],
        playlistCaps: ['var(--font-playlist-caps)', 'cursive'],
      },

      animation: {
        'hero-zoom': 'heroZoomOut 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'ping-slow': 'pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      keyframes: {
        heroZoomOut: {
          '0%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.0)' },
        },

        pingSlow: {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(3)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config