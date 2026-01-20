'use client';

import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function Home() {
  const { navigate } = useNavigationWithLoading();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
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
          
          {/* Dashboard Links */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 animate-slide-up animation-delay-500">
              Quick Access (Demo)
            </p>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <button
                onClick={() => navigate('/dashboard/student')}
                className="w-full border border-yellow-600 text-yellow-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-yellow-50 hover:border-yellow-700 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm transform hover:scale-105 hover:shadow-md animate-slide-up animation-delay-600 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Student Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/trainer')}
                className="w-full border border-blue-600 text-blue-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm transform hover:scale-105 hover:shadow-md animate-slide-up animation-delay-700 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Trainer Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/mentor')}
                className="w-full border border-green-600 text-green-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-green-50 hover:border-green-700 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm transform hover:scale-105 hover:shadow-md animate-slide-up animation-delay-800 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Mentor Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}