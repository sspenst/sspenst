import headlessui from '@headlessui/tailwindcss';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    headlessui,
  ],
  theme: {
    extend: {},
  },
};
