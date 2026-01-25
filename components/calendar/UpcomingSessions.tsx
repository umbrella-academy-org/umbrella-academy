'use client';

import { Calendar, Edit } from 'lucide-react';

export default function UpcomingActivities() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Today's Schedule</h3>
        <button className="text-yellow-600 hover:text-yellow-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
          <Edit className="w-3.5 h-3.5" />
          Customize
        </button>
      </div>

      <div className="space-y-5">
        {[
          {
            time: '09:00 AM',
            title: 'Advanced React Patterns',
            type: 'Live Session',
            status: 'active',
            color: 'bg-blue-500'
          },
          {
            time: '11:30 AM',
            title: 'UI Design Principles',
            type: 'Recording',
            status: 'pending',
            color: 'bg-purple-500'
          },
          {
            time: '04:00 PM',
            title: 'Project Submission',
            type: 'Deadline',
            status: 'urgent',
            color: 'bg-red-500'
          }
        ].map((activity, index) => (
          <div key={index} className="flex items-start gap-4 group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full ${activity.color} ring-4 ring-white shadow-sm z-10 group-hover:scale-125 transition-transform`}></div>
              {index !== 2 && <div className="w-0.5 h-12 bg-gray-100 -mt-1"></div>}
            </div>

            <div className="flex-1 -mt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activity.time}</span>
                <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${activity.status === 'active' ? 'bg-blue-50 text-blue-600' :
                    activity.status === 'urgent' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-500'
                  }`}>
                  {activity.type}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{activity.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}