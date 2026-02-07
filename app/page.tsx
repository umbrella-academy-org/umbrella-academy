'use client';

import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { useEffect } from 'react';

export default function Home() {
  const { navigate } = useNavigationWithLoading();
  const { isAuthenticated, user, isLoading } = useAuth();

  // Redirect authenticated users to their dashboard
  useEffect(() => {

    if (isAuthenticated && user) {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'mentor': '/dashboard/mentor',
        'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role]);
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform hover:scale-110 transition-all duration-300 hover:shadow-lg animate-bounce-subtle">
            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 animate-slide-up">Welcome to Umbrella Academy</h1>
          <p className="text-sm sm:text-base text-gray-600 animate-slide-up animation-delay-200">Choose how you'd like to get started</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => navigate('/auth/signup')}
            className="w-full bg-yellow-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center text-sm sm:text-base transform hover:scale-105 hover:shadow-lg animate-slide-up animation-delay-300 group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">Create Account</span>
          </button>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full border border-gray-300 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center text-sm sm:text-base transform hover:scale-105 hover:shadow-md animate-slide-up animation-delay-400 group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}