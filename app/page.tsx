export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Welcome to Umbrella Academy</h1>
          <p className="text-sm sm:text-base text-gray-600">Choose how you'd like to get started</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <a
            href="/auth/signup"
            className="w-full bg-yellow-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            Create Account
          </a>
          <a
            href="/auth/login"
            className="w-full border border-gray-300 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            Sign In
          </a>
          <a
            href="/dashboard/student"
            className="w-full border border-yellow-600 text-yellow-600 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-yellow-50 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
