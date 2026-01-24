/**
 * Design System Entry Point
 * 
 * This module exports all design system utilities and configurations
 * for easy importing throughout the application.
 */

// Export spacing system
export {
  spacingTokens,
  semanticSpacing,
  tailwindSpacingScale,
  spacingCSSVariables,
  semanticSpacingCSSVariables,
  allSpacingCSSVariables,
  spacingPatterns,
  getSpacing,
  getSemanticSpacing,
  isValidSpacingToken,
  pxToSpacingToken,
  type SpacingToken,
  type SemanticSpacing,
  type SpacingPattern,
} from './spacing';

// Export theme system
export {
  // Theme configuration types
  type ThemeConfig,
  type ThemeMode,
  type ColorScale,
  type SemanticColors,
  type TypographySystem,
  type AnimationConfig,
  
  // Theme configurations
  themes,
  lightTheme,
  darkTheme,
  primaryColors,
  secondaryColors,
  neutralColors,
  semanticColors,
  typography,
  animations,
  
  // Theme utilities
  themeUtils,
  generateThemeCSSVariables,
  generateCSSString,
  getSystemTheme,
  getReducedMotionPreference,
  
  // Tailwind integration
  tailwindThemeConfig,
} from './theme';

// Export theme provider components
export {
  ThemeProvider,
  useTheme,
  useThemeStyles,
  ThemeToggle,
  SystemThemeScript,
} from '@/components/providers/ThemeProvider';

// Utility functions for consistent spacing application
export const spacing = {
  // Form utilities
  form: {
    elementGap: 'space-y-4',           // 16px gap between form elements
    sectionGap: 'space-y-8',           // 32px gap between form sections  
    labelGap: 'mb-2',                  // 8px gap between label and input
    containerPadding: 'p-8',           // 48px container padding
  },
  
  // Layout utilities
  layout: {
    sectionGap: 'space-y-8',           // 32px between major sections
    containerPadding: 'p-12',          // 48px for main containers
    cardPadding: 'p-8',                // 32px inside cards
  },
  
  // Component utilities
  component: {
    buttonPadding: 'px-4 py-3',        // 16px horizontal, 12px vertical
    buttonGap: 'space-x-2',            // 8px between buttons
    iconGap: 'gap-2',                  // 8px between icon and text
  },
  
  // Navigation utilities
  navigation: {
    itemGap: 'space-y-4',              // 16px between nav items
    sectionGap: 'space-y-6',           // 24px between nav sections
    padding: 'p-6',                    // 24px navigation padding
  },
  
  // Content utilities
  content: {
    paragraphGap: 'space-y-4',         // 16px between paragraphs
    headingGap: 'mb-6',                // 24px after headings
    listItemGap: 'space-y-2',          // 8px between list items
  },
} as const;

// CSS class utilities for common spacing patterns
export const spacingClasses = {
  // Form patterns following design system rules
  formContainer: 'max-w-md mx-auto w-full space-y-4',
  formSection: 'space-y-8',
  formElement: 'space-y-4',
  formLabel: 'block text-sm font-medium text-gray-700 mb-2',
  formInput: 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent',
  
  // Layout patterns
  mainContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  sectionContainer: 'space-y-8',
  cardContainer: 'bg-white rounded-lg shadow-sm border p-8',
  
  // Button patterns
  primaryButton: 'w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors',
  secondaryButton: 'w-full bg-white text-yellow-600 border border-yellow-600 py-3 px-4 rounded-lg font-medium hover:bg-yellow-50 transition-colors',
  
  // Navigation patterns
  navContainer: 'space-y-4',
  navSection: 'space-y-6',
  navItem: 'block px-4 py-2 text-sm font-medium rounded-md',
  
  // Content patterns
  contentContainer: 'prose prose-gray max-w-none',
  headingSpacing: 'mb-6',
  paragraphSpacing: 'space-y-4',
  listSpacing: 'space-y-2',
} as const;

// Migration helpers for converting existing components
export const migrationHelpers = {
  // Convert common hardcoded spacing to tokens
  convertSpacing: (customSpacing: string): string => {
    const spacingMap: Record<string, string> = {
      // Padding conversions
      'p-2': 'p-2',     // 8px - already using token
      'p-4': 'p-4',     // 16px - already using token  
      'p-6': 'p-6',     // 24px - already using token
      'p-8': 'p-8',     // 32px - already using token
      
      // Margin conversions
      'mb-2': 'mb-2',   // 8px - already using token
      'mb-4': 'mb-4',   // 16px - already using token
      'mb-6': 'mb-6',   // 24px - already using token
      'mb-8': 'mb-8',   // 32px - already using token
      
      // Gap conversions
      'space-y-2': 'space-y-2',   // 8px - already using token
      'space-y-4': 'space-y-4',   // 16px - already using token
      'space-y-6': 'space-y-6',   // 24px - already using token
      'space-y-8': 'space-y-8',   // 32px - already using token
      
      // Custom spacing that needs conversion
      'p-3': 'p-3',     // 12px - keep as is (valid token)
      'py-3': 'py-3',   // 12px vertical - keep as is (valid token)
      'px-4': 'px-4',   // 16px horizontal - keep as is (valid token)
    };
    
    return spacingMap[customSpacing] || customSpacing;
  },
  
  // Validate that spacing follows design system
  validateSpacing: (className: string): boolean => {
    const validSpacingPatterns = [
      /^p-\d+$/,        // padding
      /^px-\d+$/,       // horizontal padding
      /^py-\d+$/,       // vertical padding
      /^m-\d+$/,        // margin
      /^mx-\d+$/,       // horizontal margin
      /^my-\d+$/,       // vertical margin
      /^mb-\d+$/,       // margin bottom
      /^mt-\d+$/,       // margin top
      /^space-[xy]-\d+$/, // space between
      /^gap-\d+$/,      // gap
    ];
    
    return validSpacingPatterns.some(pattern => pattern.test(className));
  },
  
  // Get recommended spacing for common use cases
  getRecommendedSpacing: (useCase: string): string => {
    const recommendations: Record<string, string> = {
      'form-element-gap': 'space-y-4',
      'form-section-gap': 'space-y-8', 
      'form-container-padding': 'p-8',
      'button-padding': 'px-4 py-3',
      'card-padding': 'p-8',
      'section-gap': 'space-y-8',
      'nav-item-gap': 'space-y-4',
      'content-gap': 'space-y-4',
    };
    
    return recommendations[useCase] || 'space-y-4';
  },
} as const;

// Export type for spacing utilities
export type SpacingUtility = keyof typeof spacing;
export type SpacingClass = keyof typeof spacingClasses;