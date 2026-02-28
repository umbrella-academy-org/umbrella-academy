'use client';

/**
 * Button Component with All Variants
 * 
 * A comprehensive button component with multiple variants, sizes, states,
 * and icon support following the Umbrella Academy design system.
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.6
 */

import React, { forwardRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right' | 'only';

// Icon configuration interface
export interface IconConfig {
  position: IconPosition;
  component: React.ComponentType<{ className?: string }>;
}

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconConfig;
  fullWidth?: boolean;
  children?: React.ReactNode;
  'aria-label'?: string;
}

// Loading spinner component
const LoadingSpinner = ({ className = '' }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Button variant styles
const getVariantStyles = (variant: ButtonVariant, isDark: boolean) => {
  const variants = {
    primary: {
      base: 'bg-primary-600 text-white border border-primary-600',
      hover: 'hover:bg-primary-700 hover:border-primary-700',
      focus: 'focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
      active: 'active:bg-primary-800',
      disabled: 'disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-300 disabled:cursor-not-allowed',
    },
    secondary: {
      base: 'bg-white text-primary-600 border border-primary-600',
      hover: 'hover:bg-primary-50',
      focus: 'focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
      active: 'active:bg-primary-100',
      disabled: 'disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-300 disabled:cursor-not-allowed',
    },
    tertiary: {
      base: 'bg-neutral-100 text-neutral-700 border border-neutral-300',
      hover: 'hover:bg-neutral-200 hover:text-neutral-800',
      focus: 'focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
      active: 'active:bg-neutral-300',
      disabled: 'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed',
    },
    ghost: {
      base: 'bg-transparent text-neutral-700 border border-transparent',
      hover: 'hover:bg-neutral-100 hover:text-neutral-800',
      focus: 'focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
      active: 'active:bg-neutral-200',
      disabled: 'disabled:text-neutral-400 disabled:cursor-not-allowed',
    },
    danger: {
      base: 'bg-error-600 text-white border border-error-600',
      hover: 'hover:bg-error-700 hover:border-error-700',
      focus: 'focus:ring-2 focus:ring-error-600 focus:ring-offset-2',
      active: 'active:bg-error-800',
      disabled: 'disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-300 disabled:cursor-not-allowed',
    },
  };

  // Adjust styles for dark mode
  if (isDark) {
    return {
      primary: variants.primary,
      secondary: {
        base: 'bg-transparent text-primary-400 border border-primary-400',
        hover: 'hover:bg-primary-950',
        focus: 'focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-neutral-900',
        active: 'active:bg-primary-900',
        disabled: 'disabled:bg-transparent disabled:text-neutral-600 disabled:border-neutral-600 disabled:cursor-not-allowed',
      },
      tertiary: {
        base: 'bg-neutral-800 text-neutral-200 border border-neutral-600',
        hover: 'hover:bg-neutral-700 hover:text-neutral-100',
        focus: 'focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-900',
        active: 'active:bg-neutral-600',
        disabled: 'disabled:bg-neutral-900 disabled:text-neutral-600 disabled:border-neutral-700 disabled:cursor-not-allowed',
      },
      ghost: {
        base: 'bg-transparent text-neutral-200 border border-transparent',
        hover: 'hover:bg-neutral-800 hover:text-neutral-100',
        focus: 'focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-900',
        active: 'active:bg-neutral-700',
        disabled: 'disabled:text-neutral-600 disabled:cursor-not-allowed',
      },
      danger: variants.danger,
    };
  }

  return variants;
};

// Button size styles
const getSizeStyles = (size: ButtonSize, iconOnly: boolean) => {
  if (iconOnly) {
    return {
      sm: 'w-8 h-8 p-1.5',
      md: 'w-10 h-10 p-2',
      lg: 'w-12 h-12 p-2.5',
    }[size];
  }

  return {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }[size];
};

// Icon size styles
const getIconSize = (size: ButtonSize) => {
  return {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];
};

// Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      fullWidth = false,
      children,
      className = '',
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const { theme, mode, isDark, reducedMotion } = useTheme();
    
    // Determine if this is an icon-only button
    const isIconOnly = icon?.position === 'only';
    
    // Get variant styles
    const variantStyles = getVariantStyles(variant, isDark);
    const currentVariant = variantStyles[variant];
    
    // Get size styles
    const sizeStyles = getSizeStyles(size, isIconOnly);
    const iconSize = getIconSize(size);
    
    // Combine all styles
    const buttonClasses = [
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'focus:outline-none',
      'transition-all duration-200',
      
      // Disable transitions if reduced motion is preferred
      reducedMotion ? '' : 'transition-all duration-200 ease-in-out',
      
      // Variant styles
      currentVariant.base,
      currentVariant.hover,
      currentVariant.focus,
      currentVariant.active,
      currentVariant.disabled,
      
      // Size styles
      sizeStyles,
      
      // Width styles
      fullWidth ? 'w-full' : '',
      
      // Loading state
      loading ? 'cursor-wait' : '',
      
      // Custom className
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Determine effective disabled state
    const isDisabled = disabled || loading;
    
    // Determine aria-label
    const effectiveAriaLabel = ariaLabel || (isIconOnly ? 'Button' : undefined);

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        aria-label={effectiveAriaLabel}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <LoadingSpinner 
            className={`${iconSize} ${!isIconOnly && children ? 'mr-2' : ''}`} 
          />
        )}
        
        {/* Left icon */}
        {!loading && icon?.position === 'left' && icon.component && (
          <icon.component 
            className={`${iconSize} ${children ? 'mr-2' : ''}`} 
          />
        )}
        
        {/* Icon-only */}
        {!loading && icon?.position === 'only' && icon.component && (
          <icon.component className={iconSize} />
        )}
        
        {/* Button text */}
        {!isIconOnly && children && (
          <span className={loading ? 'opacity-75' : ''}>
            {children}
          </span>
        )}
        
        {/* Right icon */}
        {!loading && icon?.position === 'right' && icon.component && (
          <icon.component 
            className={`${iconSize} ${children ? 'ml-2' : ''}`} 
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export default
export default Button;