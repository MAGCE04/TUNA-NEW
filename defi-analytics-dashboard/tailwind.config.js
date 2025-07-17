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
        primary: {
          DEFAULT: '#00e4ff',
          hover: '#00c4ff',
          dark: '#00a8cc',
          light: '#33e8ff',
        },
        secondary: {
          DEFAULT: '#9333ea',
          hover: '#7e22ce',
          dark: '#6b21a8',
          light: '#a855f7',
        },
        accent: {
          DEFAULT: '#00ffa3',
          hover: '#00e58f',
        },
        success: '#00ffa3',
        warning: '#ffb300',
        danger: '#ff4d6d',
        background: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          dark: '#020617',
        },
        card: {
          DEFAULT: '#111827',
          hover: '#1a2235',
          light: '#334155',
          dark: '#0f172a',
        },
        border: '#334155',
        text: {
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
          dark: '#64748b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}