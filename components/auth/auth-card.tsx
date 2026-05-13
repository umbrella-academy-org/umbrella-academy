'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[28px] sm:rounded-[40px] border border-white/20 p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden w-full">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 sm:mb-10 scale-90">
          <Logo />
        </div>

        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-playfair font-semibold text-foreground text-center leading-tight mb-3 break-words">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-slate-500 font-sans font-light text-center mb-8 sm:mb-10 break-words">
            {subtitle}
          </p>
        )}

        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
