'use client';

import React from 'react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PremiumButton({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  ...props 
}: PremiumButtonProps) {
  const baseStyles = "w-full px-8 py-4 rounded-xl font-bold text-[16px] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30",
    secondary: "bg-slate-900 text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/30",
    outline: "bg-transparent border-2 border-slate-200 text-slate-800 hover:border-primary hover:text-primary"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </button>
  );
}
