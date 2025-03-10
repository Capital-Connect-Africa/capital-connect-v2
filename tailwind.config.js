/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        capital: {
          black: '#000000',
          white: '#FFFFFF',
          blue: {
            25: '#CFD3FD',
            50: '#9FA7FB',
            75: '#2C75D3',
            100: '#3E50F7',
            dark: {
              25: '#C9C8D2',
              50: '#9290A4',
              75: '#5C5977',
              100: '#25224A'
            }
          },
          green: {
            25: '#C1D1CD',
            50: '#83A39A',
            75: '#447468',
            100: '#064635'
          },
          yellow: {
            25: '#FEEEC1',
            50: '#FDDC82',
            75: '#FDCB44',
            100: '#FCBA05',
            light: '#FFFBF1'
          },
          gray: {
            light: '#CBD5E1',
            dark: '#8692A6'
          }
        },
      },
      fontFamily: {
        'inter': ['"Inter"', 'serif',]
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [require('tailwindcss-primeui')]
}