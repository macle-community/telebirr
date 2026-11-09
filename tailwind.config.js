/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './public/index.html'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        telebirr: {
          green: '#76bc21',
          greenDark: '#5ea315',
          greenLight: '#8de22a',
          blue: '#0084ff',
          blueDark: '#006ed4',
          amber: '#f59e0b',
          orange: '#f97316',
          bg: '#f4f6f8',
          card: '#ffffff',
          text: '#111827',
          muted: '#6b7280'
        }
      }
    }
  },
  plugins: []
}

