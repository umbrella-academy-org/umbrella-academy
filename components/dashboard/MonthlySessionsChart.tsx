'use client';

import { MoreHorizontal } from 'lucide-react';

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
    <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-gray-900">Monthly Sessions</h3>
          <p className="text-xs text-gray-500 mt-1">Track how you interact with sessions over time</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="w-full">
        {/* Chart Grid */}
        <div className="flex">
          {/* Y-axis */}
          <div className="flex flex-col justify-between h-32 lg:h-40 text-xs text-gray-500 pr-3 lg:pr-4">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="flex-1">
            <div className="flex items-end justify-between h-32 lg:h-40 border-l border-b border-gray-200 px-2">
              {chartData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center flex-1">
                  {/* Bar */}
                  <div className="flex justify-center mb-2 w-full">
                    <div
                      className="bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                      style={{
                        width: '16px',
                        height: `${Math.max((data.sessions / maxSessions) * 100, 8)}px`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between px-2 mt-2">
              {chartData.map((data) => (
                <div key={data.day} className="flex-1 text-center">
                  <span className="text-xs text-gray-500">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend and Date */}
        <div className="flex items-center justify-between mt-4 lg:mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Session Completed</span>
          </div>
          <span className="text-xs text-gray-500">January</span>
        </div>
      </div>
    </div>
  );
}