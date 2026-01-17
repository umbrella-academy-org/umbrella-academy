import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'mb-8' }: LogoProps) {
  return (
    <div className={className}>
      <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  );
}