/**
 * Standardized Spacing System for Umbrella Academy
 * 
 * This module defines the standardized spacing tokens and semantic mappings
 * used throughout the application to ensure consistent visual rhythm.
 * 
 * Based on a 4px base unit (0.25rem) with a harmonious scale that follows
 * design system best practices.
 */

// Base spacing scale using rem units for accessibility
export const spacingTokens = {
  // Extra small spacing - 4px
  xs: '0.25rem',
  // Small spacing - 8px  
  sm: '0.5rem',
  // Medium spacing - 16px (base unit)
  md: '1rem',
  // Large spacing - 24px
  lg: '1.5rem',
  // Extra large spacing - 32px
  xl: '2rem',
  // 2x extra large spacing - 48px
  '2xl': '3rem',
  // 3x extra large spacing - 64px
  '3xl': '4rem',
  // 4x extra large spacing - 80px
  '4xl': '5rem',
  // 5x extra large spacing - 96px
  '5xl': '6rem',
} as const;

// Semantic spacing mappings for common use cases
export const semanticSpacing = {
  // Form element spacing
  formElementGap: spacingTokens.md,        // 16px between form elements
  formSectionGap: spacingTokens.xl,        // 32px between form sections
  formLabelGap: spacingTokens.sm,          // 8px between label and input
  
  // Layout spacing
  sectionGap: spacingTokens.xl,            // 32px between major sections
  containerPadding: spacingTokens['2xl'],  // 48px for main containers
  cardPadding: spacingTokens.xl,           // 32px inside cards
  
  // Component spacing
  buttonPadding: spacingTokens.md,         // 16px button padding
  buttonGap: spacingTokens.sm,             // 8px between buttons
  iconGap: spacingTokens.sm,               // 8px between icon and text
  
  // Navigation spacing
  navItemGap: spacingTokens.md,            // 16px between nav items
  navSectionGap: spacingTokens.lg,         // 24px between nav sections
  
  // Content spacing
  paragraphGap: spacingTokens.md,          // 16px between paragraphs
  headingGap: spacingTokens.lg,            // 24px after headings
  listItemGap: spacingTokens.sm,           // 8px between list items
} as const;

// Type definitions for TypeScript support
export type SpacingToken = keyof typeof spacingTokens;
export type SemanticSpacing = keyof typeof semanticSpacing;

// Utility function to get spacing value
export function getSpacing(token: SpacingToken): string {
  return spacingTokens[token];
}

// Utility function to get semantic spacing value
export function getSemanticSpacing(semantic: SemanticSpacing): string {
  return semanticSpacing[semantic];
}

// Tailwind spacing scale mapping for configuration
export const tailwindSpacingScale = {
  ...spacingTokens,
  // Additional Tailwind-specific tokens
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px (same as xs)
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px (same as sm)
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px (same as md)
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px (same as lg)
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px (same as xl)
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px (same as 2xl)
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px (same as 3xl)
  20: '5rem',       // 80px (same as 4xl)
  24: '6rem',       // 96px (same as 5xl)
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
} as const;

// CSS custom properties for spacing (for use in CSS)
export const spacingCSSVariables = Object.entries(spacingTokens).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`--spacing-${key}`]: value,
  }),
  {} as Record<string, string>
);

// Semantic spacing CSS variables
export const semanticSpacingCSSVariables = Object.entries(semanticSpacing).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`--spacing-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`]: value,
  }),
  {} as Record<string, string>
);

// Export all CSS variables combined
export const allSpacingCSSVariables = {
  ...spacingCSSVariables,
  ...semanticSpacingCSSVariables,
};

// Validation function to ensure only approved spacing values are used
export function isValidSpacingToken(value: string): value is SpacingToken {
  return Object.values(spacingTokens).includes(value as any);
}

// Helper function to convert pixel values to spacing tokens (for migration)
export function pxToSpacingToken(px: number): SpacingToken | null {
  const remValue = `${px / 16}rem`;
  const token = Object.entries(spacingTokens).find(([, value]) => value === remValue);
  return token ? (token[0] as SpacingToken) : null;
}

// Common spacing patterns for specific use cases
export const spacingPatterns = {
  // Form patterns
  form: {
    elementGap: semanticSpacing.formElementGap,
    sectionGap: semanticSpacing.formSectionGap,
    labelGap: semanticSpacing.formLabelGap,
    containerPadding: semanticSpacing.containerPadding,
  },
  
  // Card patterns
  card: {
    padding: semanticSpacing.cardPadding,
    gap: semanticSpacing.sectionGap,
    margin: spacingTokens.lg,
  },
  
  // Button patterns
  button: {
    padding: semanticSpacing.buttonPadding,
    gap: semanticSpacing.buttonGap,
    iconGap: semanticSpacing.iconGap,
  },
  
  // Navigation patterns
  navigation: {
    itemGap: semanticSpacing.navItemGap,
    sectionGap: semanticSpacing.navSectionGap,
    padding: spacingTokens.lg,
  },
  
  // Content patterns
  content: {
    paragraphGap: semanticSpacing.paragraphGap,
    headingGap: semanticSpacing.headingGap,
    listItemGap: semanticSpacing.listItemGap,
    sectionGap: semanticSpacing.sectionGap,
  },
} as const;

export type SpacingPattern = keyof typeof spacingPatterns;