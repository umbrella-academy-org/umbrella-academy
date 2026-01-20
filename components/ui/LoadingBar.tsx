'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(10);

      // Gradually increase progress
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 150);
    };

    const completeLoading = () => {
      clearInterval(progressTimer);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    };

    // Create a global function to trigger loading
    (window as any).startNavigation = startLoading;

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      startLoading();
    };

    // Auto-complete loading when pathname changes
    const handlePathnameChange = () => {
      if (loading) {
        completeLoading();
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Complete loading when pathname changes
    handlePathnameChange();

    // Auto-complete after 2 seconds as fallback
    if (loading) {
      completeTimer = setTimeout(completeLoading, 2000);
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loading, pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200/30">
      <div
        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(202, 138, 4, 0.8)'
        }}
      />
    </div>
  );
}