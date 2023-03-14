/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    fontFamily:{
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32,
      '4xl': 48,
    },

    colors:{
      transparent: 'transparent',
      white: '#FFF',
      black: '#000',
      blacktransparent: '#00000080',       
      
      gray:{
       900: '#0F0F12',
       800: '#2F2F2F',
       700: '#1C1D2F',
      },

      blue: {
        300: '#262837',
        700: '#00033D',
      },

      yellow:{
        500: '#F1C400',
        700: '#CDAA14',
      }
    },

    extend: {
      fontFamily:{
        sans:'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}

