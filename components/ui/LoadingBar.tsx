'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;
    let checkTimer: NodeJS.Timeout;
    let networkRequests = 0;

    const startLoading = () => {
      setLoading(true);
      setProgress(10);
      networkRequests = 0;

      // Track network requests
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        networkRequests++;
        return originalFetch.apply(this, args).finally(() => {
          networkRequests--;
        });
      };

      // Gradually increase progress based on actual loading state
      progressTimer = setInterval(() => {
        setProgress(prev => {
          // Check various loading indicators
          const isDocumentLoading = document.readyState === 'loading';
          const hasNetworkRequests = networkRequests > 0;
          const isNextJSLoading = document.querySelector('[data-nextjs-scroll-focus-boundary]') === null;
          const hasLoadingElements = document.querySelector('[data-loading="true"]') !== null;
          
          const isStillLoading = isDocumentLoading || hasNetworkRequests || isNextJSLoading || hasLoadingElements;
          
          if (isStillLoading && prev < 80) {
            // Slower progress while actually loading
            return prev + Math.random() * 3;
          } else if (!isStillLoading && prev < 95) {
            // Faster progress when page is ready
            return prev + Math.random() * 20;
          } else {
            // Hold at current progress
            return Math.min(prev, 95);
          }
        });
      }, 80);

      // Check for completion more frequently
      checkTimer = setInterval(() => {
        const isPageReady = document.readyState === 'complete' && 
                           networkRequests === 0 &&
                           document.querySelector('[data-nextjs-scroll-focus-boundary]') !== null;
        
        if (isPageReady) {
          completeLoading();
        }
      }, 50);
    };

    const completeLoading = () => {
      clearInterval(progressTimer);
      clearInterval(checkTimer);
      
      // Restore original fetch
      if (window.fetch !== fetch) {
        window.fetch = fetch;
      }
      
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 150);
    };

    // Create a global function to trigger loading
    (window as any).startNavigation = startLoading;

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      startLoading();
    };

    // Listen for various page load events
    const handleLoad = () => {
      if (loading) {
        setTimeout(completeLoading, 100);
      }
    };

    const handleDOMContentLoaded = () => {
      if (loading && progress < 70) {
        setProgress(70);
      }
    };

    // Handle pathname changes
    const handlePathnameChange = () => {
      if (loading) {
        // Give time for the new page to start loading
        setTimeout(() => {
          const isPageReady = document.readyState === 'complete' && 
                             document.querySelector('[data-nextjs-scroll-focus-boundary]') !== null;
          if (isPageReady) {
            completeLoading();
          }
        }, 200);
      }
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('load', handleLoad);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    // Handle pathname change
    handlePathnameChange();

    // Fallback completion after 4 seconds
    if (loading) {
      completeTimer = setTimeout(completeLoading, 4000);
    }

    return () => {
      clearInterval(progressTimer);
      clearInterval(checkTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      
      // Restore fetch if needed
      if (window.fetch !== fetch) {
        window.fetch = fetch;
      }
    };
  }, [loading, pathname, progress]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200/30">
      <div
        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(202, 138, 4, 0.8)',
          transition: progress === 100 ? 'width 0.15s ease-out' : 'width 0.15s ease-in-out'
        }}
      />
    </div>
  );
}