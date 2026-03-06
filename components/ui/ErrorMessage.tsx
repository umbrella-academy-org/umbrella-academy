'use client';

/**
 * Error Handling Components
 * 
 * A comprehensive error handling system with field, form, page, and toast
 * error types, including error boundaries and recovery actions.
 * 
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, X, RefreshCw, Home, AlertTriangle, Info } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

// Error types
export type ErrorType = 'field' | 'form' | 'page' | 'toast';
export type ErrorSeverity = 'error' | 'warning' | 'info';

// Error action interface
export interface ErrorAction {
  label: string;
  action: () => void;
  variant: 'primary' | 'secondary';
}

// Base error message props
export interface ErrorMessageProps {
  type?: ErrorType;
  severity?: ErrorSeverity;
  message: string;
  details?: string;
  actions?: ErrorAction[];
  dismissible?: boolean;
  autoHide?: number; // Auto-hide after ms
  className?: string;
  onDismiss?: () => void;
}

// Form error state interface
export interface FormErrorState {
  [fieldName: string]: {
    message: string;
    type: 'required' | 'validation' | 'server';
  };
}

// Error icons
const ErrorIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

// Error colors
const getErrorColors = (severity: ErrorSeverity, isDark: boolean) => {
  const colors = {
    error: {
      bg: isDark ? 'bg-error-900/20 border-error-800' : 'bg-error-50 border-error-200',
      text: isDark ? 'text-error-200' : 'text-error-800',
      icon: isDark ? 'text-error-400' : 'text-error-600',
    },
    warning: {
      bg: isDark ? 'bg-warning-900/20 border-warning-800' : 'bg-warning-50 border-warning-200',
      text: isDark ? 'text-warning-200' : 'text-warning-800',
      icon: isDark ? 'text-warning-400' : 'text-warning-600',
    },
    info: {
      bg: isDark ? 'bg-info-900/20 border-info-800' : 'bg-info-50 border-info-200',
      text: isDark ? 'text-info-200' : 'text-info-800',
      icon: isDark ? 'text-info-400' : 'text-info-600',
    },
  };

  return colors[severity];
};

// Field error component
export const FieldError = ({ 
  message, 
  className = '' 
}: { 
  message: string; 
  className?: string; 
}) => {
  const { isDark } = useTheme();
  
  if (!message) return null;

  return (
    <div className={`flex items-center gap-1 mt-1 ${className}`}>
      <AlertCircle className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-error-400' : 'text-error-500'}`} />
      <span className={`text-sm ${isDark ? 'text-error-300' : 'text-error-600'}`}>
        {message}
      </span>
    </div>
  );
};

// Form error summary component
export const FormErrorSummary = ({ 
  errors, 
  className = '' 
}: { 
  errors: FormErrorState; 
  className?: string; 
}) => {
  const { isDark } = useTheme();
  const errorEntries = Object.entries(errors).filter(([, error]) => error.message);

  if (errorEntries.length === 0) return null;

  return (
    <div className={`
      ${isDark ? 'bg-error-900/20 border-error-800' : 'bg-error-50 border-error-200'}
      border rounded-lg p-4 ${className}
    `}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-error-400' : 'text-error-600'}`} />
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${isDark ? 'text-error-200' : 'text-error-800'}`}>
            Please fix the following errors:
          </h3>
          <ul className={`mt-2 text-sm space-y-1 ${isDark ? 'text-error-300' : 'text-error-700'}`}>
            {errorEntries.map(([field, error]) => (
              <li key={field} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-current rounded-full flex-shrink-0" />
                <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').toLowerCase()}: {error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Toast error component
export const ToastError = ({ 
  message, 
  details, 
  severity = 'error',
  dismissible = true,
  autoHide,
  onDismiss,
  className = '' 
}: Omit<ErrorMessageProps, 'type'>) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = React.useState(true);
  const colors = getErrorColors(severity, isDark);
  const Icon = ErrorIcons[severity];

  // Auto-hide functionality
  React.useEffect(() => {
    if (autoHide && autoHide > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHide);

      return () => clearTimeout(timer);
    }
  }, [autoHide]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className={`
      ${colors.bg} border rounded-lg p-4 shadow-lg
      animate-slide-up ${className}
    `}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${colors.text}`}>
            {message}
          </p>
          {details && (
            <p className={`mt-1 text-sm ${colors.text} opacity-80`}>
              {details}
            </p>
          )}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`
              flex-shrink-0 p-1 rounded-md transition-colors
              ${colors.text} hover:bg-yellow-600/10 dark:hover:bg-white/10
            `}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Page error component
export const PageError = ({ 
  message, 
  details, 
  actions = [],
  className = '' 
}: Omit<ErrorMessageProps, 'type' | 'severity'>) => {
  const { isDark } = useTheme();

  const defaultActions: ErrorAction[] = [
    {
      label: 'Try Again',
      action: () => window.location.reload(),
      variant: 'primary',
    },
    {
      label: 'Go Home',
      action: () => window.location.href = '/',
      variant: 'secondary',
    },
  ];

  const finalActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${className}`}>
      <div className="max-w-md w-full text-center">
        <div className={`
          w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center
          ${isDark ? 'bg-error-900/20' : 'bg-error-100'}
        `}>
          <AlertCircle className={`w-8 h-8 ${isDark ? 'text-error-400' : 'text-error-600'}`} />
        </div>
        
        <h1 className={`text-xl font-semibold mb-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
          Something went wrong
        </h1>
        
        <p className={`text-sm mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {message}
        </p>
        
        {details && (
          <p className={`text-xs mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {details}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {finalActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${action.variant === 'primary'
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : `border ${isDark ? 'border-neutral-600 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`
                }
              `}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main error message component
export const ErrorMessage = ({ 
  type = 'form', 
  severity = 'error',
  message, 
  details, 
  actions = [],
  dismissible = false,
  autoHide,
  className = '',
  onDismiss 
}: ErrorMessageProps) => {
  switch (type) {
    case 'field':
      return <FieldError message={message} className={className} />;
    case 'toast':
      return (
        <ToastError
          message={message}
          details={details}
          severity={severity}
          dismissible={dismissible}
          autoHide={autoHide}
          onDismiss={onDismiss}
          className={className}
        />
      );
    case 'page':
      return (
        <PageError
          message={message}
          details={details}
          actions={actions}
          className={className}
        />
      );
    case 'form':
    default:
      const { isDark } = useTheme();
      const colors = getErrorColors(severity, isDark);
      const Icon = ErrorIcons[severity];

      return (
        <div className={`${colors.bg} border rounded-lg p-4 ${className}`}>
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${colors.text}`}>
                {message}
              </p>
              {details && (
                <p className={`mt-1 text-sm ${colors.text} opacity-80`}>
                  {details}
                </p>
              )}
              {actions.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`
                        px-3 py-1 text-xs font-medium rounded transition-colors
                        ${action.variant === 'primary'
                          ? `${colors.text} bg-current/10 hover:bg-current/20`
                          : `${colors.text} opacity-70 hover:opacity-100`
                        }
                      `}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {dismissible && (
              <button
                onClick={onDismiss}
                className={`
                  flex-shrink-0 p-1 rounded-md transition-colors
                  ${colors.text} hover:bg-yellow-600/10 dark:hover:bg-white/10
                `}
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      );
  }
};

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <PageError
          message="Something went wrong in this component"
          details={this.state.error?.message}
          actions={[
            {
              label: 'Try Again',
              action: () => this.setState({ hasError: false, error: undefined, errorInfo: undefined }),
              variant: 'primary',
            },
            {
              label: 'Reload Page',
              action: () => window.location.reload(),
              variant: 'secondary',
            },
          ]}
        />
      );
    }

    return this.props.children;
  }
}

// Hook for error handling
export const useErrorHandler = () => {
  const [errors, setErrors] = React.useState<FormErrorState>({});

  const setFieldError = (field: string, message: string, type: 'required' | 'validation' | 'server' = 'validation') => {
    setErrors(prev => ({
      ...prev,
      [field]: { message, type }
    }));
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors,
  };
};

// Export default
export default ErrorMessage;