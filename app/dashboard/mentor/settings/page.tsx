'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { Settings, Lock, Bell, Moon, Globe, Shield, CreditCard, LogOut, ChevronRight, Save, Check } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function MentorSettingsPage() {
    const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('account');

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Settings" userType="mentor" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Mentor Settings</h1>
                            <p className="text-gray-500">Configure your administrative preferences and notifications.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Settings Navigation */}
                            <div className="w-full lg:w-64 flex-shrink-0">
                                <nav className="flex flex-col gap-1">
                                    {[
                                        { id: 'account', label: 'Account Security', icon: <Lock className="w-4 h-4" /> },
                                        { id: 'notif', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                                        { id: 'wing', label: 'Wing Preferences', icon: <Globe className="w-4 h-4" /> },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === item.id
                                                ? 'bg-yellow-600 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-100'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => logout()}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4"
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
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security & Authentication</h3>
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                <p className="text-sm font-medium text-gray-700 mb-4">You are currently logged in with an official academy mentor account.</p>
                                                <button className="px-6 py-2 bg-yellow-600 text-sm rounded-lg hover:bg-yellow-700 shadow-md">
                                                    Change Official Password
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'notif' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Oversight Alerts</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { title: 'New Trainer Applications', desc: 'Get notified when a new trainer joins the academy.' },
                                                    { title: 'Roadmap Completion Alerts', desc: 'Alerts when a student completes their learning roadmap.' },
                                                    { title: 'System Alerts', desc: 'Emergency notifications related to platform stability.' }
                                                ].map((pref, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3">
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-900">{pref.title}</h4>
                                                            <p className="text-xs text-gray-500">{pref.desc}</p>
                                                        </div>
                                                        <button className="w-12 h-6 rounded-full bg-yellow-600 relative">
                                                            <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'wing' && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                                            <Globe className="w-12 h-12 mb-4 opacity-20" />
                                            <h3 className="text-lg font-semibold text-gray-900">Wing Configuration</h3>
                                            <p className="text-sm mt-2">Mentors can only customize wing preferences via the Wing Admin dashboard.</p>
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
