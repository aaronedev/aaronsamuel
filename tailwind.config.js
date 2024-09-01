/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	purge: ['./src/**/*.{js,ts,jsx,tsx,vue}'],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}