/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F6F8',
        ink: '#12141C',
        navy: {
          DEFAULT: '#1D2444',
          light: '#2A3260',
        },
        amber: {
          DEFAULT: '#F2A93B',
          dark: '#D6901F',
        },
        category: {
          tech: '#3E63FF',
          cultural: '#D6486E',
          sports: '#1E9E6B',
          workshop: '#C48A00',
          music: '#7C5CFC',
          business: '#0E8C82',
          other: '#6B7280',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
