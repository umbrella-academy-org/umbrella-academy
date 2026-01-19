'use client';

export default function ScheduledEvents() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Scheduled Events</h3>
        <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
          Full calendar view →
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Team Meeting</p>
            <p className="text-xs text-gray-500">2/12/2024</p>
          </div>
        </div>
        
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">No more events scheduled</p>
        </div>
      </div>
    </div>
  );
}