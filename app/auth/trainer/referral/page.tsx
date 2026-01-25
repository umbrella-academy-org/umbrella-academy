'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainerReferralPage() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState('');

  const sources = [
    'LinkedIn',
    'Google Search',
    'Facebook / Instagram',
    'Friend / Colleague',
    'Other',
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trainer referral source:', selectedSource);
    router.push('/auth/trainer/availability');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Content */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              How did you find us?
            </h1>
            <p className="text-gray-500 mb-8 text-center text-sm px-4">
              Help us understand where our amazing trainers come from.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-3">
              {sources.map((source, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${selectedSource === source
                      ? 'border-yellow-600 bg-yellow-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSource === source ? 'border-yellow-600' : 'border-gray-300'
                    }`}>
                    {selectedSource === source && (
                      <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${selectedSource === source ? 'text-gray-900' : 'text-gray-600'}`}>
                    {source}
                  </span>
                  <input
                    type="radio"
                    name="referral"
                    value={source}
                    className="hidden"
                    onChange={(e) => setSelectedSource(e.target.value)}
                    required
                  />
                </label>
              ))}

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
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
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
