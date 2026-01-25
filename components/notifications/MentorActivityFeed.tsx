'use client';

import { MoreHorizontal, FileText, Video, CheckCircle, Map, User, Clock, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface MentorActivity {
    id: string;
    student: {
        name: string;
        avatar: string;
        initials: string;
    };
    action: string;
    target: string;
    time: string;
    type: 'roadmap' | 'session' | 'milestone' | 'feedback' | 'sync';
    status?: 'pending' | 'reviewed' | 'urgent';
}

export default function MentorActivityFeed() {
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    const activities: MentorActivity[] = [
        {
            id: 'm1',
            student: { name: 'Jane Mukamana', avatar: '', initials: 'JM' },
            action: 'submitted a new roadmap for',
            target: 'Advanced Frontend Track',
            time: '12 mins ago',
            type: 'roadmap',
            status: 'urgent'
        },
        {
            id: 'm2',
            student: { name: 'Eric Nshimiyimana', avatar: '', initials: 'EN' },
            action: 'completed a learning session in',
            target: 'Backend Scalability Patterns',
            time: '1 hour ago',
            type: 'session',
            status: 'pending'
        },
        {
            id: 'm3',
            student: { name: 'Grace Uwimana', avatar: '', initials: 'GU' },
            action: 'reached a new milestone:',
            target: 'First Full-Stack Deployment',
            time: '3 hours ago',
            type: 'milestone'
        },
        {
            id: 'm4',
            student: { name: 'David Habimana', avatar: '', initials: 'DH' },
            action: 'requested a 1:1 Mentoring Sync for',
            target: 'Tomorrow, 10:00 AM',
            time: '5 hours ago',
            type: 'sync',
            status: 'urgent'
        },
        {
            id: 'm5',
            student: { name: 'Alice Umutoni', avatar: '', initials: 'AU' },
            action: 'provided feedback on your last',
            target: 'Architecture Review Session',
            time: 'Yesterday',
            type: 'feedback'
        },
        {
            id: 'm6',
            student: { name: 'Jean Pierre', avatar: '', initials: 'JP' },
            action: 'updated their project roadmap for',
            target: 'Mobile App Development',
            time: '2 days ago',
            type: 'roadmap',
            status: 'reviewed'
        }
    ];

    const getIcon = (type: MentorActivity['type']) => {
        switch (type) {
            case 'roadmap': return <Map className="w-4 h-4 text-blue-600" />;
            case 'session': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'milestone': return <CheckCircle className="w-4 h-4 text-yellow-600" />;
            case 'sync': return <Clock className="w-4 h-4 text-purple-600" />;
            case 'feedback': return <MessageSquare className="w-4 h-4 text-orange-600" />;
            default: return <User className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusBadge = (status?: MentorActivity['status']) => {
        if (!status) return null;
        switch (status) {
            case 'urgent': return <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-tighter">Urgent Review</span>;
            case 'pending': return <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-100 uppercase tracking-tighter">Action Needed</span>;
            case 'reviewed': return <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-tighter">Reviewed</span>;
            default: return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Mentor Activities</h2>
                    <p className="text-xs text-gray-500 mt-1 font-medium italic">Track your students' progress and requests</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        onClick={() => setSelectedActivity(activity.id)}
                        className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 border group cursor-pointer ${selectedActivity === activity.id
                                ? 'bg-yellow-50/50 border-yellow-200 shadow-sm shadow-yellow-600/5'
                                : 'bg-white border-transparent hover:border-gray-100 hover:bg-gray-50/30'
                            }`}
                    >
                        {/* Student Avatar */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                                <span className="text-gray-700 font-bold text-sm tracking-tight">{activity.student.initials}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50 overflow-hidden">
                                <div className="p-0.5">
                                    {getIcon(activity.type)}
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                    {activity.type} • {activity.time}
                                </p>
                                {getStatusBadge(activity.status)}
                            </div>

                            <p className="text-sm text-gray-900 leading-tight">
                                <span className="font-bold">{activity.student.name}</span>
                                <span className="text-gray-500 mx-1.5">{activity.action}</span>
                                <span className="font-bold text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600/20">{activity.target}</span>
                            </p>

                            {/* Interaction Buttons (Shown on select) */}
                            {selectedActivity === activity.id && (
                                <div className="flex items-center gap-2 mt-4 animate-fade-in">
                                    {activity.type === 'roadmap' && (
                                        <button className="px-4 py-2 bg-yellow-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-yellow-700 shadow-lg shadow-yellow-600/20 transition-all active:scale-95">
                                            Approve Roadmap
                                        </button>
                                    )}
                                    {activity.type === 'session' && (
                                        <button className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                                            Review Submission
                                        </button>
                                    )}
                                    {activity.type === 'sync' && (
                                        <button className="px-4 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all active:scale-95">
                                            Schedule Meeting
                                        </button>
                                    )}
                                    <button className="px-4 py-2 bg-white border border-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all active:scale-95">
                                        View Details
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
