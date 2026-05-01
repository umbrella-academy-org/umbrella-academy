import type { Config } from 'tailwindcss';

// Inline theme config to avoid module resolution issues during build
const tailwindThemeConfig = {
  colors: {
    // CSS variable references for Tailwind
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    muted: 'var(--muted)',
    accent: 'var(--accent)',
    border: 'var(--border)',
    input: 'var(--input)',
    ring: 'var(--ring)',
    primary: 'var(--primary)',
  },
  
  

  
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      // Use theme system colors
      ...tailwindThemeConfig,

    },
  },
  plugins: [],
} satisfies Config;

export default config;