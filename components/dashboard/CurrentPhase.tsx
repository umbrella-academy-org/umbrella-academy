'use client';

export default function CurrentPhase() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Phase</h3>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-900">Fund Processing</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Estimated completion in 2 weeks</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>60% Complete</span>
          <span>Phase 2 of 3</span>
        </div>
      </div>
    </div>
  );
}