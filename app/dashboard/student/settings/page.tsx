'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { Settings, Lock, Bell, Eye, Moon, Globe, Shield, CreditCard, LogOut, ChevronRight, Save, Check } from 'lucide-react';
import { useAuth } from '@/contexts';
import { UserRole } from '@/types';

export default function StudentSettingsPage() {
    const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('account');

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: false,
        sessionReminders: true,
        roadmapUpdates: true,
        marketingEmail: false
    });

    const [security, setSecurity] = useState({ twoFactor: false, });

    return (
        <div className="flex h-screen bg-[#FDF9F2]">
            <Sidebar activeItem="Settings" userType={UserRole.STUDENT} />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-playfair font-semibold text-slate-900 mb-2">Settings</h1>
                            <p className="text-slate-500 font-light">Manage your account preferences, security, and notifications.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Settings Navigation */}
                            <div className="w-full lg:w-64 shrink-0">
                                <nav className="flex flex-col gap-1">
                                    {[
                                        { id: 'account', label: 'Account Security', icon: <Lock className="w-4 h-4" /> },
                                        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                                        { id: 'privacy', label: 'Privacy & Safety', icon: <Shield className="w-4 h-4" /> },
                                        { id: 'appearance', label: 'Appearance', icon: <Moon className="w-4 h-4" /> },
                                        { id: 'billing', label: 'Billing & Plans', icon: <CreditCard className="w-4 h-4" /> },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === item.id
                                                ? 'bg-slate-900 text-white shadow-md'
                                                : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => logout()}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all mt-4"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </nav>
                            </div>

                            {/* Settings Content */}
                            <div className="flex-1">
                                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-6 lg:p-8 animate-fade-in">

                                    {activeSection === 'account' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-6">Password & Security</h3>
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                                                            <input
                                                                type="password"
                                                                placeholder="••••••••"
                                                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 outline-none transition-all"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                                                <input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 outline-none transition-all"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                                                                <input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 outline-none transition-all"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 shadow-md active:scale-95 transition-all">
                                                        Update Password
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-slate-100">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h4>
                                                        <p className="text-xs text-slate-500 mt-1">Enhance your account security by enabling 2FA.</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                                                        className={`w-12 h-6 rounded-full transition-all relative ${security.twoFactor ? 'bg-primary' : 'bg-slate-200'}`}
                                                    >
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${security.twoFactor ? 'left-7' : 'left-1'}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'notifications' && (
                                        <div className="space-y-8">
                                            <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-6">Notification Preferences</h3>
                                            <div className="space-y-2">
                                                {[
                                                    { id: 'emailAlerts', title: 'Email Alerts', desc: 'Receive updates about your account and roadmap via email.' },
                                                    { id: 'pushNotifications', title: 'Push Notifications', desc: 'Get real-time browser alerts while learning.' },
                                                    { id: 'sessionReminders', title: 'Session Reminders', desc: 'Never miss a live sync with 15-minute reminders.' },
                                                    { id: 'roadmapUpdates', title: 'Roadmap Progress', desc: 'Get updates when your trainer approves or comments on your roadmap.' },
                                                    { id: 'marketingEmail', title: 'Marketing Communications', desc: 'Receive newsletters and special offers from Umbrella Academy.' }
                                                ].map((pref) => (
                                                    <div key={pref.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-50">
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-slate-900">{pref.title}</h4>
                                                            <p className="text-xs text-slate-500 mt-0.5">{pref.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setNotifications({ ...notifications, [pref.id]: !notifications[pref.id as keyof typeof notifications] })}
                                                            className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${notifications[pref.id as keyof typeof notifications] ? 'bg-primary' : 'bg-slate-200'}`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[pref.id as keyof typeof notifications] ? 'left-7' : 'left-1'}`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'appearance' && (
                                        <div className="space-y-8">
                                            <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-6">Visual Preferences</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <button className="flex items-center justify-between p-4 rounded-xl border-2 border-primary bg-slate-50 text-slate-600 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100">
                                                            <Globe className="w-5 h-5" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-sm font-bold">Light Mode</p>
                                                            <p className="text-[10px] font-medium opacity-70">Best for daytime learning</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                </button>
                                                <button className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-400 hover:border-slate-200 transition-all opacity-50 grayscale">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-slate-800">
                                                            <Moon className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-sm font-bold">Dark Mode</p>
                                                            <p className="text-[10px] font-medium">Coming soon</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {(activeSection === 'privacy' || activeSection === 'billing') && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                                                <Save className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg font-playfair font-semibold text-slate-900">Module Update Required</h3>
                                            <p className="text-sm text-slate-500 max-w-xs mt-2">This configuration module is currently being optimized for your wing. Please check back later.</p>
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
