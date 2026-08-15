/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          obsidian: '#05070C',
          slate: '#0B0F19',
          card: 'rgba(15, 23, 42, 0.75)',
          violet: '#8B5CF6',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          rose: '#F43F5E',
          emerald: '#10B981',
        },
        silk: {
          white: '#FFFFFF',
          lavender: '#F3F3FF',
          navy: '#090D1A',
          border: 'rgba(226, 232, 240, 0.8)',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'laser-sweep': 'laserSweep 3s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        laserSweep: {
          '0%, 100%': { top: '5%', opacity: '0.8' },
          '50%': { top: '90%', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
};
