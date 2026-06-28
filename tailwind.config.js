/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'modal-fade': 'modal-fade 200ms ease-out',
        'modal-scale': 'modal-scale 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'modal-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'modal-scale': {
          from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
