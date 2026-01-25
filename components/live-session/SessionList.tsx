'use client';

import { Play, Clock, Calendar, CheckCircle, Video, Lock } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Session {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'live' | 'recorded' | 'mentoring';
    status: 'live' | 'upcoming' | 'completed' | 'missed';
    instructor: string;
}

interface SessionListProps {
    activeTab: string;
}

export default function SessionList({ activeTab }: SessionListProps) {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const allSessions: Session[] = [
        {
            id: 's1',
            title: 'JavaScript Logic & Flow Control',
            description: 'Mastering closures and high-order functions in production environments.',
            time: 'In 2 hours',
            type: 'live',
            status: 'live',
            instructor: 'Sarah Ingabire'
        },
        {
            id: 's2',
            title: 'UI Design Systems with Figma',
            description: 'Building scalable design tokens and component libraries.',
            time: 'Today, 2:00 PM',
            type: 'live',
            status: 'upcoming',
            instructor: 'Demi Wilkinson'
        },
        {
            id: 's3',
            title: 'React Performance Audit',
            description: 'Using DevTools to identify and fix unnecessary re-renders.',
            time: 'Yesterday',
            type: 'recorded',
            status: 'completed',
            instructor: 'Alex Rodriguez'
        },
        {
            id: 's4',
            title: 'Backend Scalability Patterns',
            description: 'Comparing microservices and monolithic architectures.',
            time: '2 days ago',
            type: 'recorded',
            status: 'completed',
            instructor: 'Demi Wilkinson'
        },
        {
            id: 's5',
            title: 'Database Normalization Sync',
            description: 'Mentoring session to review schema design.',
            time: 'Today, 4:00 PM',
            type: 'mentoring',
            status: 'upcoming',
            instructor: 'Sarah Ingabire'
        }
    ];

    const filteredSessions = allSessions.filter(session => {
        if (activeTab === 'Upcoming') return session.status === 'live' || session.status === 'upcoming';
        if (activeTab === 'Attended') return session.status === 'completed';
        return false;
    });

    const getStatusStyle = (status: Session['status']) => {
        switch (status) {
            case 'live': return 'bg-red-50 text-red-600 border-red-100';
            case 'upcoming': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'completed': return 'bg-green-50 text-green-600 border-green-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-4">
            {filteredSessions.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-dashed border-gray-200 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No sessions found</h3>
                    <p className="text-sm text-gray-500">Check back later for new updates.</p>
                </div>
            ) : (
                filteredSessions.map((session) => (
                    <div
                        key={session.id}
                        onMouseEnter={() => setHoveredId(session.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:border-yellow-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className={`absolute top-0 right-0 w-48 h-48 rounded-full -mr-24 -mt-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl ${session.status === 'live' ? 'bg-red-500' : 'bg-yellow-400'
                            }`}></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-5 flex-1 w-full">
                                {/* Type Icon */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${session.type === 'live' ? 'bg-red-50 text-red-600' :
                                    session.type === 'mentoring' ? 'bg-yellow-50 text-yellow-600' :
                                        'bg-green-50 text-green-600'
                                    }`}>
                                    {session.type === 'live' ? <Video className="w-7 h-7" /> :
                                        session.type === 'mentoring' ? <Play className="w-7 h-7" /> :
                                            <CheckCircle className="w-7 h-7" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${getStatusStyle(session.status)}`}>
                                            {session.status === 'live' ? '● Live Now' : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                        </span>
                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {session.time}
                                        </span>
                                    </div>
                                    <h3 className={`text-lg font-semibold text-gray-700 transition-colors duration-300 ${hoveredId === session.id ? 'text-yellow-600' : ''
                                        }`}>
                                        {session.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 truncate max-w-md">
                                        Trainer: <span className="text-gray-900 font-semibold">{session.instructor}</span> • {session.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                                {session.status === 'live' ? (
                                    <button
                                        onClick={() => router.push('/dashboard/student/live-session/call')}
                                        className="flex-1 md:flex-none px-8 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 shadow-md transition-all active:scale-95 animate-pulse"
                                    >
                                        Join Meeting
                                    </button>
                                ) : session.status === 'upcoming' ? (
                                    <button className="flex-1 md:flex-none px-8 py-3 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700 shadow-md transition-all active:scale-95">
                                        Register Session
                                    </button>
                                ) : (
                                    <button className="flex-1 md:flex-none px-8 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all active:scale-95">
                                        Watch Recording
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )))}
        </div>
    );
}
