'use client';

/**
 * Loading Component System
 * 
 * A comprehensive loading component system with spinner, skeleton, progress,
 * and pulse variants for different loading states throughout the application.
 * 
 * Validates: Requirements 5.1, 5.2, 5.3
 */

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

// Loading component types
export type LoadingType = 'spinner' | 'skeleton' | 'progress' | 'pulse';
export type LoadingSize = 'sm' | 'md' | 'lg';

// Base loading component props
export interface LoadingProps {
  type?: LoadingType;
  size?: LoadingSize;
  message?: string;
  progress?: number; // 0-100 for progress type
  timeout?: number; // Show timeout message after ms
  className?: string;
}

// Skeleton-specific props
export interface SkeletonProps {
  lines?: number;
  avatar?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

// Spinner component
const Spinner = ({ size = 'md', className = '' }: { size: LoadingSize; className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${className}`}
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
};

// Progress bar component
const ProgressBar = ({ 
  progress = 0, 
  size = 'md', 
  className = '' 
}: { 
  progress: number; 
  size: LoadingSize; 
  className?: string; 
}) => {
  const { isDark } = useTheme();
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className={`
        ${heightClasses[size]} 
        ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'} 
        rounded-full overflow-hidden
      `}>
        <div
          className={`
            h-full bg-primary-600 rounded-full transition-all duration-300 ease-out
            ${clampedProgress === 0 ? 'w-0' : ''}
          `}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-neutral-500 mt-1">
        <span>Progress</span>
        <span>{Math.round(clampedProgress)}%</span>
      </div>
    </div>
  );
};

// Pulse component
const Pulse = ({ size = 'md', className = '' }: { size: LoadingSize; className?: string }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-pulse`} />
      <div className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-pulse`} style={{ animationDelay: '0.1s' }} />
      <div className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }} />
    </div>
  );
};

// Skeleton component
export const Skeleton = ({ 
  lines = 3, 
  avatar = false, 
  width, 
  height, 
  className = '' 
}: SkeletonProps) => {
  const { isDark } = useTheme();
  
  const baseClasses = `
    ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'} 
    rounded animate-pulse
  `;

  const getRandomWidth = (index: number) => {
    const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3'];
    return widths[index % widths.length];
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {avatar && (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${baseClasses}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 ${baseClasses} w-1/4`} />
            <div className={`h-3 ${baseClasses} w-1/3`} />
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 ${baseClasses} ${
              width ? '' : getRandomWidth(index)
            }`}
            style={{
              width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
              height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Card skeleton component
export const CardSkeleton = ({ className = '' }: { className?: string }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`
      ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} 
      border rounded-lg p-6 ${className}
    `}>
      <Skeleton lines={4} avatar />
    </div>
  );
};

// Table skeleton component
export const TableSkeleton = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}: { 
  rows?: number; 
  columns?: number; 
  className?: string; 
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`header-${index}`}
            className={`h-4 ${isDark ? 'bg-neutral-600' : 'bg-neutral-300'} rounded animate-pulse`}
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={`h-4 ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'} rounded animate-pulse`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Main Loading component
export const Loading = ({ 
  type = 'spinner', 
  size = 'md', 
  message, 
  progress = 0, 
  timeout,
  className = '' 
}: LoadingProps) => {
  const { isDark, reducedMotion } = useTheme();
  const [showTimeout, setShowTimeout] = React.useState(false);

  // Handle timeout message
  React.useEffect(() => {
    if (timeout && timeout > 0) {
      const timer = setTimeout(() => {
        setShowTimeout(true);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout]);

  const renderLoadingIndicator = () => {
    switch (type) {
      case 'spinner':
        return <Spinner size={size} className="text-primary-600" />;
      case 'progress':
        return <ProgressBar progress={progress} size={size} />;
      case 'pulse':
        return <Pulse size={size} />;
      case 'skeleton':
        return <Skeleton lines={3} />;
      default:
        return <Spinner size={size} className="text-primary-600" />;
    }
  };

  const containerClasses = [
    'flex flex-col items-center justify-center',
    type === 'progress' ? 'w-full max-w-xs' : '',
    reducedMotion ? 'motion-reduce:animate-none' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {renderLoadingIndicator()}
      
      {message && (
        <p className={`
          mt-3 text-sm font-medium
          ${isDark ? 'text-neutral-300' : 'text-neutral-600'}
        `}>
          {message}
        </p>
      )}
      
      {showTimeout && (
        <p className={`
          mt-2 text-xs
          ${isDark ? 'text-neutral-400' : 'text-neutral-500'}
        `}>
          This is taking longer than expected...
        </p>
      )}
    </div>
  );
};

// Page loading component
export const PageLoading = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading type="spinner" size="lg" message={message} />
    </div>
  );
};

// Inline loading component
export const InlineLoading = ({ 
  message, 
  size = 'sm' 
}: { 
  message?: string; 
  size?: LoadingSize; 
}) => {
  return (
    <div className="inline-flex items-center space-x-2">
      <Loading type="spinner" size={size} />
      {message && (
        <span className="text-sm text-neutral-600">{message}</span>
      )}
    </div>
  );
};

// Button loading state
export const ButtonLoading = ({ size = 'sm' }: { size?: LoadingSize }) => {
  return <Spinner size={size} className="text-current" />;
};

// Export default
export default Loading;