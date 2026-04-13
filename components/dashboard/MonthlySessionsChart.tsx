'use client';

import { MoreHorizontal } from 'lucide-react';
import { UserType, LiveSession } from '@/types';
import { useRoadmaps } from '@/contexts';

interface MonthlySessionsChartProps {
  userType: UserType;
}

function aggregateSessionsByDay(sessions: LiveSession[]): { day: number; count: number }[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const counts = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, count: 0 }));
  sessions.forEach(s => {
    const d = new Date(s.scheduledAt);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      counts[d.getDate() - 1].count++;
    }
  });
  return counts;
}

export default function MonthlySessionsChart({ userType }: MonthlySessionsChartProps) {
  const { liveSessions } = useRoadmaps();
  const chartData = aggregateSessionsByDay(liveSessions);
  const maxSessions = Math.max(...chartData.map(d => d.count), 1);

  const getTitle = () => {
    switch (userType) {
      case 'trainer':
        return 'Training Sessions';
      case 'student':
        return 'Learning Sessions';
      case 'admin':
        return 'System Activities';
      default:
        return 'Monthly Sessions';
    }
  };

  const getDescription = () => {
    switch (userType) {
      case 'trainer':
        return 'Track your training sessions with students over time';
      case 'student':
        return 'View your learning sessions and study time';
      case 'admin':
        return 'Monitor system-wide activities across all fields';
      default:
        return 'Track how you interact with sessions over time';
    }
  };

  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-gray-900">{getTitle()}</h3>
          <p className="text-xs text-gray-500 mt-1">{getDescription()}</p>
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
            <span>{maxSessions}</span>
            <span>{Math.round(maxSessions * 0.8)}</span>
            <span>{Math.round(maxSessions * 0.6)}</span>
            <span>{Math.round(maxSessions * 0.4)}</span>
            <span>{Math.round(maxSessions * 0.2)}</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-end justify-between h-32 lg:h-40 border-l border-b border-gray-200 px-2 min-w-0">
              {chartData.map((data) => (
                <div key={data.day} className="flex flex-col items-center flex-1">
                  {/* Bar */}
                  <div className="flex justify-center mb-2 w-full">
                    <div
                      className="bg-yellow-200 rounded-t-sm transition-all duration-300 hover:bg-yellow-600"
                      style={{
                        width: '8px',
                        height: `${Math.max((data.count / maxSessions) * 100, data.count > 0 ? 8 : 2)}px`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* X-axis labels — show every 5th day to avoid crowding */}
            <div className="flex justify-between px-2 mt-2">
              {chartData.map((data) => (
                <div key={data.day} className="flex-1 text-center">
                  <span className="text-xs text-gray-500">
                    {data.day % 5 === 1 ? data.day : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend and Date */}
        <div className="flex items-center justify-between mt-4 lg:mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Session Completed</span>
          </div>
          <span className="text-xs text-gray-500">{monthName}</span>
        </div>
      </div>
    </div>
  );
}
