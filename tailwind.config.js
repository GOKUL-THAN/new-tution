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
        // Global Minds Academy — Modern Vibrant Blue & Indigo Light Theme
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // primary vibrant blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Modern Sky & Cyan accents
        accent: {
          50:  '#f0fdfa',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // vibrant sky
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Modern Slate neutrals
        navy: {
          800: '#1e293b',
          900: '#0f172a',
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
        // Global Minds hero gradient: modern airy sky-blue light gradient
        'hero-pattern': 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #e0f2fe 100%)',
      },
    },
  },
  plugins: [],
};
