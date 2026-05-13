'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types';
import { Settings, Lock, Bell, Globe, Shield, LogOut, ChevronRight, Moon, User } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function GuardianSettingsPage() {
    const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('account');

    const [notifications, setNotifications] = useState({
        studentProgress: true,
        milestoneCompletion: true,
        certificateEarned: true,
        subscriptionExpiry: true,
        emailAlerts: false
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call API to change password
        alert('Password change functionality to be implemented');
    };

    return (
        <div className="flex min-h-screen lg:h-screen bg-gray-50">
            <Sidebar activeItem="Settings" userType={UserRole.GUARDIAN} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-1">Manage your account preferences and notifications</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Settings Navigation */}
                            <div className="w-full lg:w-64 shrink-0">
                                <nav className="flex flex-col gap-1">
                                    {[
                                        { id: 'account', label: 'Account & Security', icon: <Lock className="w-4 h-4" /> },
                                        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
                                        { id: 'privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                                activeSection === item.id
                                                    ? 'bg-yellow-600 text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
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
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
                                    
                                    {/* Account & Security */}
                                    {activeSection === 'account' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                                                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Current Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwords.current}
                                                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            placeholder="Enter current password"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwords.new}
                                                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            placeholder="Enter new password"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwords.confirm}
                                                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                            placeholder="Confirm new password"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                                    >
                                                        Update Password
                                                    </button>
                                                </form>
                                            </div>

                                            <div className="pt-6 border-t border-gray-200">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Danger Zone</h3>
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900">Delete Account</p>
                                                            <p className="text-sm text-gray-600">This action cannot be undone</p>
                                                        </div>
                                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Notifications */}
                                    {activeSection === 'notifications' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                                            <p className="text-gray-600 mb-6">
                                                Choose what updates you want to receive about your linked students.
                                            </p>
                                            
                                            <div className="space-y-4">
                                                {[
                                                    { id: 'studentProgress', title: 'Student Progress Updates', desc: 'Weekly summary of learning progress' },
                                                    { id: 'milestoneCompletion', title: 'Milestone Completions', desc: 'When a student completes a milestone' },
                                                    { id: 'certificateEarned', title: 'New Certificates', desc: 'When a student earns a certificate' },
                                                    { id: 'subscriptionExpiry', title: 'Subscription Alerts', desc: 'When subscription is about to expire' },
                                                    { id: 'emailAlerts', title: 'Email Notifications', desc: 'Receive updates via email' },
                                                ].map((pref) => (
                                                    <div key={pref.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{pref.title}</p>
                                                            <p className="text-sm text-gray-500">{pref.desc}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleNotificationChange(pref.id as keyof typeof notifications)}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                                notifications[pref.id as keyof typeof notifications]
                                                                    ? 'bg-yellow-600'
                                                                    : 'bg-gray-200'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                    notifications[pref.id as keyof typeof notifications]
                                                                        ? 'translate-x-6'
                                                                        : 'translate-x-1'
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Privacy */}
                                    {activeSection === 'privacy' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                    <div>
                                                        <p className="font-medium text-gray-900">View-Only Access</p>
                                                        <p className="text-sm text-gray-500">
                                                            As a guardian, you have view-only access to student progress. 
                                                            You cannot modify any information.
                                                        </p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                        Enabled
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                    <div>
                                                        <p className="font-medium text-gray-900">Data Visibility</p>
                                                        <p className="text-sm text-gray-500">
                                                            You can see: Progress, Certificates, Projects, Subscription status
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                                    <p className="text-sm text-yellow-800">
                                                        <strong>Note:</strong> To modify any student information, 
                                                        please contact the student&apos;s assigned trainer or platform admin.
                                                    </p>
                                                </div>
                                            </div>
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
