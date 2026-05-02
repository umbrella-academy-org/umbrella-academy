'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function PremiumInput({ 
  label, 
  error, 
  icon, 
  type = 'text', 
  className = '', 
  ...props 
}: PremiumInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="block text-[13px] font-bold text-slate-800 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={`
            w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl 
            focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary 
            transition-all font-sans text-slate-900 placeholder:text-slate-400 font-light
            ${icon ? 'pl-12' : 'pl-5'}
            ${isPassword ? 'pr-12' : 'pr-5'}
            ${error ? 'border-red-500 ring-red-500/10' : ''}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[13px] text-red-500 ml-1 mt-1 font-medium italic">
          {error}
        </p>
      )}
    </div>
  );
}
