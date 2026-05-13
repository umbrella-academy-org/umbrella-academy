'use client';

import { useRouter as useProgressBarRouter } from 'next-app-progress-bar';
import { useRouter as useStandardRouter } from 'next/navigation';

export function useRouter() {
  // During build/SSR, we use the standard router to prevent crashes
  // In the browser, we use the progress bar router for the loading effect
  if (typeof window === 'undefined') {
    return useStandardRouter();
  }
  
  return useProgressBarRouter();
}