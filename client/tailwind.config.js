/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        neutral: {
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
      animation: {
        'holographic': 'holographic-shift 8s linear infinite',
        'float': 'float-optimized 5s ease-in-out infinite',
      },
      keyframes: {
        'holographic-shift': {
          to: { backgroundPosition: '200% center' },
        },
        'float-optimized': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
    },
  },
  plugins: [],
}
