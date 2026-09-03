/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,tsx,vue,js,ts}"
  ],
  theme: {
    extend: {
      // Brand palette, drawn from the GSDP mark (crimson figures over a warm sand ground).
      // "brand" is the primary action/identity color; "sand" is the warm secondary used for
      // accents and highlight surfaces, never for text-on-white below 600 (fails contrast).
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#badfff',
          300: '#8ecaff',
          400: '#5bb0ff',
          500: '#3694fd',
          600: '#2076ed',
          700: '#195cc4',
          800: '#184b9f',
          900: '#17407e',
          950: '#003366', // Salesian Dark Blue
        },
        sand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Salesian Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        ink: {
          900: '#002244',
          950: '#001122',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'toast-in': {
          from: { opacity: 0, transform: 'translateY(-6px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1, transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: 0.7, transform: 'translateX(-50%) scale(1.06)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'toast-in': 'toast-in 0.2s ease-out',
        'pulse-slow': 'pulse-slow 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
