'use client';

/**
 * Theme Demo Component
 * 
 * A demonstration component showing the theme system in action
 * with various color scales and theme switching capabilities.
 */

import React from 'react';
import { useTheme, ThemeToggle, useThemeStyles } from '@/components/providers/ThemeProvider';

export function ThemeDemo() {
  const { theme, mode, isDark } = useTheme();
  const styles = useThemeStyles();

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Theme System Demo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Current mode: <span className="font-medium">{mode}</span> 
            {mode === 'system' && ` (${isDark ? 'dark' : 'light'})`}
          </p>
        </div>
        <ThemeToggle size="lg" showLabel />
      </div>

      {/* Color Palette */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Color Palette</h2>
        
        {/* Primary Colors */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Primary (Brand Yellow)</h3>
          <div className="grid grid-cols-11 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`w-16 h-16 rounded-lg mb-2 bg-primary-${shade} border border-neutral-200 dark:border-neutral-700`}
                />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{shade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Neutral Colors */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Neutral (Gray Scale)</h3>
          <div className="grid grid-cols-11 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`w-16 h-16 rounded-lg mb-2 bg-neutral-${shade} border border-neutral-200 dark:border-neutral-700`}
                />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{shade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Success */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Success</h3>
            <div className="space-y-2">
              {[100, 300, 500, 700, 900].map((shade) => (
                <div key={shade} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded bg-success-${shade}`} />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Warning</h3>
            <div className="space-y-2">
              {[100, 300, 500, 700, 900].map((shade) => (
                <div key={shade} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded bg-warning-${shade}`} />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Error</h3>
            <div className="space-y-2">
              {[100, 300, 500, 700, 900].map((shade) => (
                <div key={shade} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded bg-error-${shade}`} />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">Info</h3>
            <div className="space-y-2">
              {[100, 300, 500, 700, 900].map((shade) => (
                <div key={shade} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded bg-info-${shade}`} />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{shade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Component Examples</h2>
        
        {/* Buttons */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-foreground rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              Outline Button
            </button>
            <button className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors">
              Success Button
            </button>
            <button className="px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition-colors">
              Error Button
            </button>
          </div>
        </div>

        {/* Cards */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-background border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-foreground mb-2">Default Card</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                This is a default card with theme-aware styling.
              </p>
            </div>
            <div className="p-6 bg-muted border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <h4 className="text-lg font-medium text-foreground mb-2">Muted Card</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                This card uses the muted background color.
              </p>
            </div>
            <div className="p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
              <h4 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-2">Accent Card</h4>
              <p className="text-primary-700 dark:text-primary-300">
                This card uses primary color theming.
              </p>
            </div>
          </div>
        </div>

        {/* Form Elements */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Form Elements</h3>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                rows={4}
                placeholder="Enter your message"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Information */}
      <div className="p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-medium text-foreground mb-3">Theme Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-foreground">Current Mode:</strong> {mode}
          </div>
          <div>
            <strong className="text-foreground">Is Dark:</strong> {isDark ? 'Yes' : 'No'}
          </div>
          <div>
            <strong className="text-foreground">Background:</strong> {theme.colors.background}
          </div>
          <div>
            <strong className="text-foreground">Foreground:</strong> {theme.colors.foreground}
          </div>
          <div>
            <strong className="text-foreground">Accent:</strong> {theme.colors.accent}
          </div>
          <div>
            <strong className="text-foreground">Reduced Motion:</strong> {styles.reducedMotion ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
}