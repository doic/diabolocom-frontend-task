/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', 'index.wc.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.rose,
        neutral: colors.gray
      },
      screens: {
        xs: '480px'
      }
    }
  },
  plugins: []
}
