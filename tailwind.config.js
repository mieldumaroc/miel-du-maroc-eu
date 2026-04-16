/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#FDFBF7',
          surface: '#F7F4EB',
          text: '#1A1713',
          muted: '#5C5449',
          gold: '#D4AF37',
          'gold-hover': '#B87333',
          warm: '#8C6239',
          border: '#E8E2D2',
        },
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#FDFBF7',
          hover: '#B87333',
        },
        secondary: {
          DEFAULT: '#1A1713',
          foreground: '#FDFBF7',
        },
        background: '#FDFBF7',
        paper: '#F7F4EB',
        dark: '#1A1713',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
