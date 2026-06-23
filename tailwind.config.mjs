/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        slateblue: '#6B7C93',
        mist: '#F7F9FC',
        line: '#D9E1EA',
        ink: '#10233F',
        success: '#567A63',
        warning: '#B56F3D',
        danger: '#A85454'
      },
      fontFamily: {
        zh: ['PingFang SC', 'Microsoft YaHei', 'Arial', 'sans-serif'],
        en: ['Inter', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(16, 35, 63, 0.06)'
      },
      maxWidth: {
        '8xl': '88rem'
      }
    }
  },
  plugins: []
};