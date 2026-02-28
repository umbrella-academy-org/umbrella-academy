'use client';

/**
 * Theme Provider Component
 * 
 * Provides theme context management for the application with support for
 * light/dark mode switching, system preference detection, and persistence.
 * 
 * Validates: Requirements 9.1, 9.3
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  ThemeConfig, 
  ThemeMode, 
  themes, 
  themeUtils, 
  generateThemeCSSVariables,
  getSystemTheme,
  getReducedMotionPreference
} from '@/lib/design-system/theme';

// Theme context interface
interface ThemeContextType {
  // Current theme configuration
  theme: ThemeConfig;
  // Current theme mode
  mode: ThemeMode;
  // Set theme mode
  setMode: (mode: ThemeMode) => void;
  // Toggle between light and dark
  toggleTheme: () => void;
  // Check if current theme is dark
  isDark: boolean;
  // Check if reduced motion is preferred
  reducedMotion: boolean;
  // Force theme update (useful for system theme changes)
  updateTheme: () => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

// Local storage key for theme persistence
const DEFAULT_STORAGE_KEY = 'umbrella-academy-theme';

// Theme provider component
export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get current theme based on mode
  const theme = themeUtils.getCurrentTheme(mode);
  const isDark = themeUtils.isDark(theme);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setModeState(stored as ThemeMode);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    
    // Set reduced motion preference
    setReducedMotion(getReducedMotionPreference());
    setMounted(true);
  }, [storageKey]);

  // Apply theme to document
  const applyTheme = useCallback((themeConfig: ThemeConfig, skipTransition = false) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Disable transitions temporarily if requested
    if (skipTransition && !disableTransitionOnChange) {
      root.style.setProperty('--transition-duration', '0ms');
    }

    // Generate and apply CSS variables
    const variables = generateThemeCSSVariables(themeConfig);
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply theme class for Tailwind dark mode
    if (themeConfig.mode === 'dark' || 
        (themeConfig.mode === 'system' && getSystemTheme() === 'dark')) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Re-enable transitions after a frame
    if (skipTransition && !disableTransitionOnChange) {
      requestAnimationFrame(() => {
        root.style.removeProperty('--transition-duration');
      });
    }
  }, [disableTransitionOnChange]);

  // Set theme mode with persistence
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    
    try {
      localStorage.setItem(storageKey, newMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [storageKey]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newMode = themeUtils.toggleTheme(mode);
    setMode(newMode);
  }, [mode, setMode]);

  // Force theme update (useful for system theme changes)
  const updateTheme = useCallback(() => {
    const currentTheme = themeUtils.getCurrentTheme(mode);
    applyTheme(currentTheme, true);
  }, [mode, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateTheme();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, enableSystem, updateTheme]);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted, applyTheme]);

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    mode,
    setMode,
    toggleTheme,
    isDark,
    reducedMotion,
    updateTheme,
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  // Provide default values during SSR or when context is not available
  if (context === undefined) {
    return {
      theme: themes.light,
      mode: 'light',
      setMode: () => {},
      toggleTheme: () => {},
      isDark: false,
      reducedMotion: false,
      updateTheme: () => {},
    };
  }
  
  return context;
}

// Hook for theme-aware styling
export function useThemeStyles() {
  const { theme, isDark, reducedMotion } = useTheme();
  
  return {
    // Theme-aware class names
    bg: isDark ? 'bg-neutral-900' : 'bg-white',
    text: isDark ? 'text-neutral-100' : 'text-neutral-900',
    border: isDark ? 'border-neutral-700' : 'border-neutral-200',
    muted: isDark ? 'bg-neutral-800' : 'bg-neutral-50',
    
    // Animation classes with reduced motion support
    transition: reducedMotion ? '' : 'transition-all duration-normal ease-in-out',
    hover: reducedMotion ? '' : 'hover:scale-105 transition-transform duration-fast',
    
    // Theme-specific utilities
    isDark,
    reducedMotion,
    theme,
  };
}

// Theme toggle button component
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  className = '', 
  size = 'md', 
  showLabel = false 
}: ThemeToggleProps) {
  const { mode, toggleTheme, isDark } = useTheme();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-neutral-100 dark:bg-neutral-800
        text-neutral-900 dark:text-neutral-100
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2
        transition-colors duration-normal
        flex items-center justify-center
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {mode === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

// System theme detector component (for SSR compatibility)
export function SystemThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('${DEFAULT_STORAGE_KEY}') || 'system';
        var isDark = theme === 'dark' || 
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.warn('Failed to apply theme:', e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}