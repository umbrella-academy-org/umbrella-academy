import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  imageAlt?: string;
}

export default function AuthLayout({
  children,
  showBackButton = false,
  onBackClick,
  imageAlt = 'Authentication background',
}: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-between p-8 bg-white">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Back button */}
          {showBackButton && onBackClick && (
            <button
              onClick={onBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-amber-900 mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go back
            </button>
          )}

          {children}
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
          alt={imageAlt}
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}