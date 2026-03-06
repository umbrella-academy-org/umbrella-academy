'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-2 flex-col justify-between p-8 bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Join Umbrella Academy
          </h1>
          <p className="text-gray-500 mb-8">
            Choose your role to get started.
          </p>

          {/* Role Selection */}
          <div className="w-full space-y-4">
            <button
              onClick={() => {
                localStorage.setItem('userType', 'student')
                router.push('/auth/student/profile')
              }}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-600 hover:bg-yellow-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">I'm a Student</h3>
                  <p className="text-gray-600">Looking to learn and grow my skills</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                localStorage.setItem('userType', 'trainer')
                router.push('/auth/trainer/signup')
              }}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-600 hover:bg-yellow-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">I'm a Trainer</h3>
                  <p className="text-gray-600">Apply to train and share your expertise</p>
                </div>
              </div>
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
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
          alt="Beach with palm tree"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
