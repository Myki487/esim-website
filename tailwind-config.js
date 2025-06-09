// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'travels-go-dark-purple': '#3A004F',
        'travels-go-purple-500': '#6A0DAD',
        'travels-go-purple-300': '#A56EDC',
        'travels-go-blue-accent': '#4FC3F7',
        'travels-go-text-light': '#F5F5F5',
        'travels-go-text-gray': '#B0B0B0',
        'travels-go-bg-light': '#FFFFFF',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}