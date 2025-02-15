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
          }
        },
      },
      fontFamily: {
        'inter': ['"Inter"', 'serif',]
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
}