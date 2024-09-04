/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#100f15',
        purple: '#40279b',
        cyan: '#80ffee',
        muted: '#677590',
        dark: '#1A1A1A',
        light: '#F5F5F5',
        lightMuted: '#9C9C9C',
        accent: {
          cyan: '#8ffff0',
          lightCyan: '#d1fffa',
          darkCyan: '#0cbbbb',
          blue: '#1DA1F2',
        },
        'text-primary': '#87849f',
        'text-secondary': '#9C9C9C',
        'text-accent': '#684fc4',
        'text-accent-blue': '#1DA1F2',
        'text-accent-dark': '#0cbbbb',
        'text-muted': ' #6b7280',
        'text-dark': '#1A1A1A',
        'bg-background': '#100f15',
      },
    },
  },
  plugins: [],
};
