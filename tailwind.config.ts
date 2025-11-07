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
        'mama-coral': '#FF6B6B',
        'healing-sage': '#A8D5BA',
        'ivory-glow': '#FDFBF6',
        'deep-plum': '#4B3F72',
        'neon-ember': '#FFB84D',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
