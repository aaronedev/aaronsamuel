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
        textPrimary: '#87849f',
        textSecondary: '#9C9C9C',
        textAccent: '#684fc4',
        textAccentBlue: '#1DA1F2',
        textAccentDark: '#0cbbbb',
        textMuted: '#6b7280',
        textDark: '#1A1A1A',
        bgBackground: '#100f15',
      },
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [
    require('tailwindcss-fluid-type')({
      // your fluid type settings
      // works only with unitless numbers
      // This numbers are the defaults settings
      settings: {
        fontSizeMin: 16, // 1.125rem === 18px
        fontSizeMax: 24, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 400, // 20rem === 320px
        screenMax: 2560, // 96rem === 1536px
        unit: 'px', // default is rem but it's also possible to use 'px'
        prefix: '', // set a prefix to use it alongside the default font sizes
        extendValues: true, // When you set extendValues to true it will extend the default values. Set it to false to overwrite the values.
      },
      // Creates the text-xx classes
      // This are the default settings and analog to the tailwindcss defaults
      // Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        '2xl': [3, 1.2],
        '3xl': [4, 1.2],
        '4xl': [5, 1.1],
        '5xl': [6, 1.1],
        '6xl': [7, 1.1],
        '7xl': [8, 1],
        '8xl': [9, 1],
        '9xl': [10, 1],
      },
    }),
  ],
  variants: {
    fluidType: ['responsive'],
  },
};
