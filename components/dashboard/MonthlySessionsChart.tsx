'use client';

export default function MonthlySessionsChart() {
  const chartData = [
    { day: 'Mon', sessions: 3 },
    { day: 'Tue', sessions: 2 },
    { day: 'Wed', sessions: 2 },
    { day: 'Thu', sessions: 4 },
    { day: 'Fri', sessions: 5 },
    { day: 'Sat', sessions: 5 },
    { day: 'Sun', sessions: 4 }
  ];

  const maxSessions = Math.max(...chartData.map(d => d.sessions));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Monthly Sessions</h3>
          <p className="text-xs text-gray-500">Track how you interact with sessions over time</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-sm text-gray-500 -ml-8">
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-4 pl-4">
          <div className="flex items-end justify-between h-48 border-l border-b border-gray-200">
            {chartData.map((data, index) => (
              <div key={data.day} className="flex flex-col items-center flex-1">
                <div className="w-full flex justify-center mb-2">
                  <div
                    className="bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                    style={{
                      width: '24px',
                      height: `${(data.sessions / maxSessions) * 150}px`,
                      minHeight: '6px'
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-3 ml-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Session Completed</span>
          </div>
        </div>

        {/* Date range */}
        <div className="text-center mt-3">
          <span className="text-xs text-gray-500">January</span>
        </div>
      </div>
    </div>
  );
}