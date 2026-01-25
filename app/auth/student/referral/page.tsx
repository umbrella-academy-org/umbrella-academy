'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, CheckCircle } from 'lucide-react';

export default function ReferralPage() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState('');

  const sources = [
    'YouTube',
    'X (Formerly Twitter)',
    'LinkedIn',
    'Instagram',
    'Friend or Colleague',
    'Elsewhere',
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSource) {
      alert('Please select where you heard about us');
      return;
    }
    console.log('Selected source:', selectedSource);
    // Navigate to availability page
    router.push('/auth/student/availability');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Go back</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 text-center uppercase">
              Discovery
            </h1>
            <p className="text-sm font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">
              How did you hear about Umbrella Academy?
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-3">
              {/* Source options */}
              {sources.map((source, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedSource === source
                      ? 'border-yellow-600 bg-yellow-50 shadow-md scale-105'
                      : 'border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-50'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedSource === source ? 'bg-yellow-600 text-white' : 'bg-white text-gray-400'
                    }`}>
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className={`flex-1 text-sm font-black uppercase tracking-tight ${selectedSource === source ? 'text-gray-900' : 'text-gray-500'}`}>{source}</span>
                  <input
                    type="radio"
                    name="source"
                    value={source}
                    checked={selectedSource === source}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="hidden"
                  />
                  {selectedSource === source && (
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </label>
              ))}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95 mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 4 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-200'}`}></div>
                ))}
              </div>
            </form>
          </div>
        </div>


        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Green fern leaves"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}

