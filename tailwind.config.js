/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#B91C1C',
          50:  '#FDF2F2',
          100: '#FCE7E7',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#5C1313',
          ink: '#3D0808',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FDF8EC',
          100: '#FAF0D0',
          500: '#D4AF37',
          600: '#C9A84C',
          700: '#A8893A',
          800: '#7A6325',
          900: '#4E3F14',
          ink: '#2A2108',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 18px 40px -12px rgba(185,28,28,.55)',
        'gold-glow':  '0 18px 40px -12px rgba(201,168,76,.5)',
        'card-lift':  '0 22px 60px -22px rgba(0,0,0,.7)',
      },
    },
  },
  plugins: [],
}
