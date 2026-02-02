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
    // Navigate to availabilityr page
    router.push('/auth/student/choose-wing');
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
            <span className="text-xs font-black uppercase  ">Go back</span>
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
              Where did you hear about us?
            </h1>
            <p className="text-gray-500 mb-8 text-center text-sm px-4">
              Let us know how you discovered Umbrella Academy.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-3">
              {/* Source options */}
              {sources.map((source, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${selectedSource === source
                    ? 'border-yellow-600 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedSource === source ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className={`flex-1 text-sm font-medium ${selectedSource === source ? 'text-gray-900' : 'text-gray-600'}`}>{source}</span>
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
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === 4 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-300'}`}></div>
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

