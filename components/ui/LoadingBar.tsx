'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let newProgress: number;

      if (elapsed < 200) {
        // Fast start: 0% to 30% in 200ms
        newProgress = (elapsed / 200) * 30;
      } else if (elapsed < 1000) {
        // Slow middle: 30% to 60% in 800ms
        const middleProgress = (elapsed - 200) / 800;
        newProgress = 30 + (middleProgress * 30);
      } else {
        // Very slow end: 60% to 90% in remaining time
        const endProgress = Math.min((elapsed - 1000) / 2000, 1);
        newProgress = 60 + (endProgress * 30);
      }

      setProgress(Math.min(newProgress, 90));

      if (newProgress < 90) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      startTime = 0;
      animationFrame = requestAnimationFrame(animate);
    };

    const completeLoading = () => {
      cancelAnimationFrame(animationFrame);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    };

    // Create global function to trigger loading
    window.startNavigation = startLoading;

    // Listen for browser navigation
    const handlePopState = () => {
      startLoading();
    };

    // Complete loading when pathname changes
    const handlePathnameChange = () => {
      if (loading) {
        completeLoading();
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Handle pathname change
    handlePathnameChange();

    // Fallback completion after 3 seconds
    const fallbackTimer = setTimeout(() => {
      if (loading) {
        completeLoading();
      }
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(fallbackTimer);
      window.removeEventListener('popstate', handlePopState);
      delete window.startNavigation;
    };
  }, [loading, pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-gray-500 to-gray-600 transition-all ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 8px rgba(202, 138, 4, 0.6)',
          transition: progress === 100 ? 'width 0.2s ease-out' : 'none'
        }}
      />
    </div>
  );
}