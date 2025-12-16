/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'haute': ['"Haute Couture"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'meno': ['"Meno Display"', 'serif'],
      },
      fontSize: {
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['9rem', { lineHeight: '1' }],
      },
      colors: {
        'light-gray': '#f1f5f9',
        'brand-dark': '#1a1a1a',
        'brand-blue': '#1e293b',
        'brand-cream': '#f8f6f3',
        'brand-accent': '#aa8244',
        'brand-accent-darker': '#8a6a36',
        'brand-accent-dark': '#aa8244',
        'brand-light': '#c9a962',
        'brand-white': '#faf9f6',
      },
   
      spacing: {
        '38': '9.5rem',
      },

      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
