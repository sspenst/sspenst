/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    require('@headlessui/tailwindcss')
  ],
  theme: {
    extend: {},
  },
};
