/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285f4',
        'google-red': '#ea4335',
        'google-yellow': '#fbbc05',
        'google-green': '#34a853',
      },
      boxShadow: {
        'neumorphic': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neumorphic-pressed': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
      },
    },
  },
  plugins: [],
};