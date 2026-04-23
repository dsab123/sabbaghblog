/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      colors: {
        // Semantic, theme-driven tokens
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        heading: 'var(--color-heading)',
        link: 'var(--color-link)',
        'link-hover': 'var(--color-link-hover)',
        accent: 'var(--color-accent)',
        borderc: 'var(--color-border)',

        // Remap existing tailwind scale usages to themed tokens so that
        // pre-existing classes (`text-gray-700`, `border-gray-300`, etc.) honor the theme.
        gray: {
          100: 'var(--color-surface)',
          200: 'var(--color-surface)',
          300: 'var(--color-border)',
          400: 'var(--color-border)',
          500: 'var(--color-text-muted)',
          600: 'var(--color-text-muted)',
          700: 'var(--color-text)',
          800: 'var(--color-heading)',
          900: 'var(--color-heading)',
        },
        blue: {
          100: 'var(--color-surface)',
          200: 'var(--color-border)',
          300: 'var(--color-accent)',
          400: 'var(--color-accent)',
          500: 'var(--color-link)',
          600: 'var(--color-link)',
          700: 'var(--color-link)',
          800: 'var(--color-link-hover)',
          900: 'var(--color-link-hover)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            color: 'var(--color-text)',
            a: { color: 'var(--color-link)' },
            'a:hover': { color: 'var(--color-link-hover)' },
            h1: { color: 'var(--color-heading)', fontFamily: 'var(--font-heading)' },
            h2: { color: 'var(--color-heading)', fontFamily: 'var(--font-heading)' },
            h3: { color: 'var(--color-heading)', fontFamily: 'var(--font-heading)' },
            h4: { color: 'var(--color-heading)', fontFamily: 'var(--font-heading)' },
            strong: { color: 'var(--color-heading)' },
            code: { color: 'var(--color-accent)' },
            blockquote: { color: 'var(--color-text-muted)', borderLeftColor: 'var(--color-accent)' },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
