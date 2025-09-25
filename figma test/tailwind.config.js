/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'Noto Sans Arabic', 'Inter', 'sans-serif'],
        english: ['Inter', 'Helvetica Neue', 'sans-serif'],
        whatsapp: ['Segoe UI', 'Helvetica Neue', 'Noto Naskh Arabic', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F97FF',
          dark: '#3b82f6',
        },
        secondary: {
          DEFAULT: '#1ABC9C',
          dark: '#059669',
        },
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#0F0F0F',
        },
        foreground: {
          DEFAULT: '#1A1A1A', 
          dark: '#F5F5F5',
        },
        whatsapp: {
          green: '#25D366',
          lightGreen: '#DCF8C6',
          darkBg: '#0F1419',
          lightBg: '#ECE5DD',
          incoming: '#FFFFFF',
          outgoing: '#DCF8C6',
          incomingDark: '#262D31',
          outgoingDark: '#005C4B',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'zoom-in': 'zoomIn 0.4s ease-out',
        'pulse': 'pulse 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'typing': 'typing 1.4s infinite ease-in-out',
        'waveform': 'waveform 1s infinite ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(79, 151, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(79, 151, 255, 0.8)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-8px)', opacity: '1' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 151, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 151, 255, 0.2)',
      },
    },
  },
  plugins: [],
};