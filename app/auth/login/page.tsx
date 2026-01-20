'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function LoginPage() {
  const { navigate } = useNavigationWithLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
    
    console.log('Login:', { email, password });
    navigate('/dashboard/student');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
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
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8">
            Sign in to your account to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
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
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/auth/signup')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Sign Up
            </button>
          </p>
          
          {/* Forgot password link */}
          <p className="mt-2 text-sm text-gray-600 text-center">
            <button 
              onClick={() => navigate('/auth/forgot-password')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Forgot password?
            </button>
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
