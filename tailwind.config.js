/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Text/fill usage (text-brand, bg-brand) gets the contrast-checked shade;
          // decorative tints below keep the raw palette colour.
          DEFAULT: 'var(--color-primary-ink)',
          raw: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          soft: 'var(--color-primary-soft)',
          softer: 'var(--color-primary-softer)',
          secondary: 'var(--color-secondary)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          text: 'var(--color-accent-text)'
        },
        surface: {
          DEFAULT: 'var(--color-bg)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)'
        },
        card: 'var(--color-card)',
        ink: 'var(--color-text)',
        muted: 'var(--color-muted)',
        line: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)'
        },
        'on-brand': 'var(--color-on-primary)'
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)'
      },
      borderRadius: {
        theme: 'var(--radius)',
        'theme-sm': 'calc(var(--radius) * 0.6)',
        'theme-lg': 'calc(var(--radius) * 1.5)'
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)'
      },
      spacing: {
        gutter: 'var(--gutter)',
        header: 'var(--header-h)'
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
      }
    }
  },
  plugins: []
}
