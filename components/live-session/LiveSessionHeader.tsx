'use client';

import { Plus } from 'lucide-react';

export default function LiveSessionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-amber-900 mb-1">Live Sessions</h1>
        <p className="text-sm text-gray-500">Connect with your trainers and peers in real-time learning environments.</p>
      </div>
    </div>
  );
}