'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    console.log('Student Registration:', formData);
    
    // Store user data and redirect immediately to dashboard
    localStorage.setItem('userType', 'student');
    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('isNewUser', 'true');
    
    // Immediate dashboard redirect as per requirements
    router.push('/dashboard/student');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
          {/* Back button */}
          <button
            onClick={() => router.push('/auth/signup')}
            className="self-start flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

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
            Create Account
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your basic information to get started.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-sm text-gray-600">
            Have an account?{' '}
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
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
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