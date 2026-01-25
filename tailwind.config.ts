import type { Config } from 'tailwindcss';

// Inline spacing scale to avoid module resolution issues during build
const tailwindSpacingScale = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px (xs)
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px (sm)
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px (md)
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px (lg)
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px (xl)
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px (2xl)
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px (3xl)
  20: '5rem',       // 80px (4xl)
  24: '6rem',       // 96px (5xl)
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
  // Custom tokens
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '5rem',    // 80px
  '5xl': '6rem',    // 96px
} as const;

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
    
    // Primary colors
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
      DEFAULT: 'var(--color-primary-600)',
    },
    
    // Secondary colors
    secondary: {
      50: 'var(--color-secondary-50)',
      100: 'var(--color-secondary-100)',
      200: 'var(--color-secondary-200)',
      300: 'var(--color-secondary-300)',
      400: 'var(--color-secondary-400)',
      500: 'var(--color-secondary-500)',
      600: 'var(--color-secondary-600)',
      700: 'var(--color-secondary-700)',
      800: 'var(--color-secondary-800)',
      900: 'var(--color-secondary-900)',
      950: 'var(--color-secondary-950)',
      DEFAULT: 'var(--color-secondary-600)',
    },
    
    // Neutral colors
    neutral: {
      50: 'var(--color-neutral-50)',
      100: 'var(--color-neutral-100)',
      200: 'var(--color-neutral-200)',
      300: 'var(--color-neutral-300)',
      400: 'var(--color-neutral-400)',
      500: 'var(--color-neutral-500)',
      600: 'var(--color-neutral-600)',
      700: 'var(--color-neutral-700)',
      800: 'var(--color-neutral-800)',
      900: 'var(--color-neutral-900)',
      950: 'var(--color-neutral-950)',
      DEFAULT: 'var(--color-neutral-500)',
    },
    
    // Semantic colors
    success: {
      50: 'var(--color-success-50)',
      100: 'var(--color-success-100)',
      200: 'var(--color-success-200)',
      300: 'var(--color-success-300)',
      400: 'var(--color-success-400)',
      500: 'var(--color-success-500)',
      600: 'var(--color-success-600)',
      700: 'var(--color-success-700)',
      800: 'var(--color-success-800)',
      900: 'var(--color-success-900)',
      950: 'var(--color-success-950)',
      DEFAULT: 'var(--color-success-600)',
    },
    
    warning: {
      50: 'var(--color-warning-50)',
      100: 'var(--color-warning-100)',
      200: 'var(--color-warning-200)',
      300: 'var(--color-warning-300)',
      400: 'var(--color-warning-400)',
      500: 'var(--color-warning-500)',
      600: 'var(--color-warning-600)',
      700: 'var(--color-warning-700)',
      800: 'var(--color-warning-800)',
      900: 'var(--color-warning-900)',
      950: 'var(--color-warning-950)',
      DEFAULT: 'var(--color-warning-600)',
    },
    
    error: {
      50: 'var(--color-error-50)',
      100: 'var(--color-error-100)',
      200: 'var(--color-error-200)',
      300: 'var(--color-error-300)',
      400: 'var(--color-error-400)',
      500: 'var(--color-error-500)',
      600: 'var(--color-error-600)',
      700: 'var(--color-error-700)',
      800: 'var(--color-error-800)',
      900: 'var(--color-error-900)',
      950: 'var(--color-error-950)',
      DEFAULT: 'var(--color-error-600)',
    },
    
    info: {
      50: 'var(--color-info-50)',
      100: 'var(--color-info-100)',
      200: 'var(--color-info-200)',
      300: 'var(--color-info-300)',
      400: 'var(--color-info-400)',
      500: 'var(--color-info-500)',
      600: 'var(--color-info-600)',
      700: 'var(--color-info-700)',
      800: 'var(--color-info-800)',
      900: 'var(--color-info-900)',
      950: 'var(--color-info-950)',
      DEFAULT: 'var(--color-info-600)',
    },
    
    // Legacy color mappings for backward compatibility
    yellow: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },
    
    gray: {
      50: 'var(--color-neutral-50)',
      100: 'var(--color-neutral-100)',
      200: 'var(--color-neutral-200)',
      300: 'var(--color-neutral-300)',
      400: 'var(--color-neutral-400)',
      500: 'var(--color-neutral-500)',
      600: 'var(--color-neutral-600)',
      700: 'var(--color-neutral-700)',
      800: 'var(--color-neutral-800)',
      900: 'var(--color-neutral-900)',
      950: 'var(--color-neutral-950)',
    },
    
    red: {
      50: 'var(--color-error-50)',
      100: 'var(--color-error-100)',
      200: 'var(--color-error-200)',
      300: 'var(--color-error-300)',
      400: 'var(--color-error-400)',
      500: 'var(--color-error-500)',
      600: 'var(--color-error-600)',
      700: 'var(--color-error-700)',
      800: 'var(--color-error-800)',
      900: 'var(--color-error-900)',
      950: 'var(--color-error-950)',
    },
  },
  
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  
  fontSize: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
  },
  
  fontWeight: {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  },
  
  lineHeight: {
    tight: 'var(--line-height-tight)',
    normal: 'var(--line-height-normal)',
    relaxed: 'var(--line-height-relaxed)',
  },
  
  transitionDuration: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
  },
  
  transitionTimingFunction: {
    linear: 'var(--easing-linear)',
    'ease-in': 'var(--easing-easeIn)',
    'ease-out': 'var(--easing-easeOut)',
    'ease-in-out': 'var(--easing-easeInOut)',
    bounce: 'var(--easing-bounce)',
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
      // Use standardized spacing scale
      spacing: tailwindSpacingScale,
      
      // Use theme system colors
      ...tailwindThemeConfig,
      
      // Container max widths from design rules
      maxWidth: {
        'form': '28rem', // 448px - max-w-md equivalent
      },
      
      // Focus ring configuration
      ringWidth: {
        DEFAULT: '2px',
      },
      
      ringColor: {
        DEFAULT: 'var(--ring)',
      },
      
      // Animation extensions for micro-interactions
      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      
      // Animation delays
      animationDelay: {
        '200': '0.2s',
        '300': '0.3s',
        '400': '0.4s',
        '500': '0.5s',
        '600': '0.6s',
        '700': '0.7s',
        '800': '0.8s',
      },
    },
  },
  plugins: [],
  // Enable dark mode support
  darkMode: 'class',
} satisfies Config;

export default config;