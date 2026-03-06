'use client';

import { CheckCircle, Clock, Map, TrendingUp } from 'lucide-react';

export default function MentorNotificationStats() {
    const stats = [
        {
            label: 'Pending Approvals',
            value: '5',
            icon: <Map className="w-5 h-5 text-gray-600" />,
            bgColor: 'bg-gray-50',
            description: 'Roadmaps awaiting review'
        },
        {
            label: 'New Submissions',
            value: '12',
            icon: <CheckCircle className="w-5 h-5 text-gray-600" />,
            bgColor: 'bg-gray-50',
            description: 'Sessions to be reviewed'
        },
        {
            label: 'Sync Requests',
            value: '3',
            icon: <Clock className="w-5 h-5 text-gray-600" />,
            bgColor: 'bg-gray-50',
            description: 'Meeting invites this week'
        },
        {
            label: 'Avg. Response',
            value: '1.2h',
            icon: <TrendingUp className="w-5 h-5 text-gray-600" />,
            bgColor: 'bg-gray-50',
            description: 'Your mentoring speed'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-black text-amber-900     mb-1 text-center">{stat.value}</div>
                            <div className="text-sm font-semibold text-gray-600 ">{stat.label}</div>
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-400 font-medium">{stat.description}</p>
                </div>
            ))}
        </div>
    );
}
