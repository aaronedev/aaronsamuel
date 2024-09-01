/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#005f99',
      },
      fontFamily: {
        sans: ['Ubuntu Sans Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
}