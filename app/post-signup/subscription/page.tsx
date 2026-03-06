'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to roadmap creation flow
    router.push('/post-signup/roadmap');
  }, [router]);

  return (
    <div className="flex h-screen bg-white items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to roadmap creation...</p>
      </div>
    </div>
  );
}