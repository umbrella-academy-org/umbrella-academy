'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Store email and flow type for the reset flow
    localStorage.setItem('resetEmail', email);
    localStorage.setItem('authFlow', 'reset-password');
    // Note: backend has no OTP/forgot-password endpoint yet.
    // Redirect directly to reset-password page.
    router.push('/auth/reset-password');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-2 flex-col justify-between p-8 bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="self-start flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="mb-8">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your email and we'll help you reset it.
          </p>

          {/* Form */}
          <form onSubmit={handleContinue} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${error ? 'border-gray-500' : 'border-gray-300'
                  }`}
                required
              />
              {error && <p className="mt-2 text-sm text-gray-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Continue
            </button>
          </form>

          {/* Remember password link */}
          <p className="mt-6 text-sm text-gray-600">
            Remember password?{' '}
            <a href="/auth/login" className="text-gray-600 hover:text-gray-700 font-medium">
              Sign In
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
          alt="Sunset with flowers"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
