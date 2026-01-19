'use client';

export default function CourseCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="w-32 h-24 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden flex-shrink-0 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          {/* Code-like overlay */}
          <div className="absolute top-2 left-2 right-2">
            <div className="space-y-1">
              <div className="h-1 bg-blue-300 rounded w-3/4 opacity-60"></div>
              <div className="h-1 bg-green-300 rounded w-1/2 opacity-60"></div>
              <div className="h-1 bg-yellow-300 rounded w-2/3 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Winmax Rwanda</h3>
              <p className="text-sm text-gray-500 mb-2">31 September, 2025</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  ● Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Programming & Development</p>
            </div>
            
            {/* Progress */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1">75%</div>
              <p className="text-sm text-gray-500 mb-3">2 Out of 3 Phases Finished</p>
              <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                Continue
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Phases Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}