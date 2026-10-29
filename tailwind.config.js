/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Global Minds Academy — Teal primary brand
        brand: {
          50:  '#f0faf8',
          100: '#d0f0ea',
          200: '#a3e1d5',
          300: '#6dcbbd',
          400: '#3dada1',
          500: '#1A8A7A',  // main teal
          600: '#1A6B5A',  // dark teal (logo colour)
          700: '#145248',
          800: '#103d37',
          900: '#0c2e28',
          950: '#071a17',
        },
        // Gold accent (logo colour)
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#F9D85A',  // light gold
          500: '#F5C518',  // main gold
          600: '#D4A017',  // dark gold
          700: '#b07d10',
          800: '#8a5f0c',
          900: '#6b4808',
          950: '#3d2904',
        },
        // Navy (logo text colour)
        navy: {
          800: '#0D2B3E',
          900: '#091e2d',
        },
        success: {
          50:  '#f0fdf4',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50:  '#fffbeb',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50:  '#fef2f2',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)',  'Inter',  'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'Inter',     'system-ui',     'sans-serif'],
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out',
        'fade-up':        'fadeUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in':       'scaleIn 0.3s ease-out',
        'pulse-soft':     'pulseSoft 2s ease-in-out infinite',
        'float':          'float 6s ease-in-out infinite',
        'shimmer':        'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' },                                  '100%': { opacity: '1' } },
        fadeUp:       { '0%': { opacity: '0', transform: 'translateY(20px)' },   '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' },   '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { '0%': { opacity: '0', transform: 'scale(0.95)' },        '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseSoft:    { '0%, 100%': { opacity: '1' },                             '50%':  { opacity: '0.8' } },
        float:        { '0%, 100%': { transform: 'translateY(0)' },              '50%':  { transform: 'translateY(-10px)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' },                 '100%': { backgroundPosition: '200% 0' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Global Minds hero gradient: deep teal → teal → gold tint
        'hero-pattern': 'linear-gradient(135deg, #0c2e28 0%, #1A6B5A 55%, #1A8A7A 100%)',
      },
    },
  },
  plugins: [],
};
