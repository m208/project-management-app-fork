/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '480px' },
        sm: { max: '576px' },
        md: { max: '768px' },
        lg: { max: '992px' },
        xl: { max: '1200px' },
        '2xl': { max: '1336px' },
        '3xl': { max: '1576px' },
      },
      colors: {
        primary: {
          500: '#2F7C7E',
          300: '#A1DFD7',
        },
        secondary: {
          500: '#F17110',
        },
        additional: {
          500: '#F7B122',
          300: '#FCDD9E',
        },
        warning: {
          500: '#C2412B',
        },
        chocolate: {
          500: '#613A3B',
        },
        lightcolor: {
          500: '#FBF1ED',
        },
      },
    },
    backgroundImage: {
      pattern: 'url("../src/assets/png/pattern.png")',
    },
  },
  plugins: [],
};
