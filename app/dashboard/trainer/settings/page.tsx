'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { Settings, Lock, Bell, Moon, Globe, Shield, CreditCard, LogOut, ChevronRight, Save, Check, Users, Video } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function TrainerSettingsPage() {
    const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('account');

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        studentBooking: true,
        roadmapFeedback: true,
        platformNews: false
    });

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Settings" userType="trainer" />

            <div className="flex-1 flex flex-col min-w-0">

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-amber-900 mb-2">Trainer Settings</h1>
                            <p className="text-gray-500">Configure your professional profile, availability, and teaching preferences.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Settings Navigation */}
                            <div className="w-full lg:w-64 flex-shrink-0">
                                <nav className="flex flex-col gap-1">
                                    {[
                                        { id: 'account', label: 'Security', icon: <Lock className="w-4 h-4" /> },
                                        { id: 'notif', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                                        { id: 'teaching', label: 'Teaching Mode', icon: <Video className="w-4 h-4" /> },
                                        { id: 'wing', label: 'Wing Config', icon: <Globe className="w-4 h-4" /> },
                                        { id: 'payouts', label: 'Payout Methods', icon: <CreditCard className="w-4 h-4" /> },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id
                                                ? 'bg-amber-600 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-white hover:text-amber-900 border border-transparent hover:border-gray-100'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => logout()}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all mt-4"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </nav>
                            </div>

                            {/* Settings Content */}
                            <div className="flex-1">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 animate-fade-in">

                                    {activeSection === 'account' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-lg font-semibold text-amber-900 mb-6">Security Settings</h3>
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                                                        <div className="grid grid-cols-1 gap-4">
                                                            <input type="password" placeholder="Current Password" className="px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-600" />
                                                            <input type="password" placeholder="New Password" className="px-4 py-3 border text-sm border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-600" />
                                                        </div>
                                                    </div>
                                                    <button className="px-6 py-2.5 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 shadow-md">
                                                        Update Security
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'notif' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-amber-900 mb-4">Teaching Alerts</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { id: 'emailAlerts', title: 'Email Summaries', desc: 'Daily summary of student progress and schedules.' },
                                                    { id: 'studentBooking', title: 'Session Bookings', desc: 'Get notified immediately when a student schedules a call.' },
                                                    { id: 'roadmapFeedback', title: 'Roadmap Feedback', desc: 'Alerts when mentors comment on your teaching roadmap.' }
                                                ].map((pref) => (
                                                    <div key={pref.id} className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-amber-900">{pref.title}</h4>
                                                            <p className="text-xs text-gray-500">{pref.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setNotifications({ ...notifications, [pref.id]: !notifications[pref.id as keyof typeof notifications] })}
                                                            className={`w-12 h-6 rounded-full transition-all relative ${notifications[pref.id as keyof typeof notifications] ? 'bg-amber-600' : 'bg-gray-200'}`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[pref.id as keyof typeof notifications] ? 'left-7' : 'left-1'}`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {(activeSection === 'teaching' || activeSection === 'wing' || activeSection === 'payouts') && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                                <Settings className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-900">Module Optimization</h3>
                                            <p className="text-sm text-gray-500 max-w-xs mt-2">We are currently refining these professional tools for better performance.</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
