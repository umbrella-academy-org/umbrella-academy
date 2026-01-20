'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorReferralPage() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState('');
  const [error, setError] = useState('');

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
    setError('');
    
    if (!selectedSource) {
      setError('Please select where you heard about us');
      return;
    }
    
    console.log('Mentor selected source:', selectedSource);
    router.push('/auth/mentor/upload-proofs');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
              Where Did You Hear About Us?
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Help us understand how mentors discover Umbrella Academy.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-3">
              {/* Source options */}
              {sources.map((source, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="flex-1 text-gray-700">{source}</span>
                  <input
                    type="radio"
                    name="source"
                    value={source}
                    checked={selectedSource === source}
                    onChange={(e) => {
                      setSelectedSource(e.target.value);
                      setError('');
                    }}
                    className="w-5 h-5 text-yellow-600 focus:ring-yellow-600 focus:ring-2"
                  />
                </label>
              ))}

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
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
