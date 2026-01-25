'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts';
import Image from 'next/image';

export default function StudentProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Gabin Tuyishime',
        email: user?.email || 'g.tuyishime@dreamize.rw',
        phone: '+250 788 000 000',
        location: 'Kigali, Rwanda',
        bio: 'Passionate learner focused on Full Stack Development and AI implementation.',
        wing: user?.wing || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2024'
    });

    const handleSave = () => {
        setIsEditing(false);
        // Logic to save profile data would go here
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Profile" userType="student" />

            <div className="flex-1 flex flex-col min-w-0">
                <Header breadcrumb="My Profile" userType="student" />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            <div className="h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 relative">
                                <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700 text-3xl font-bold border border-yellow-200">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                    <BookOpen className="w-4 h-4 text-yellow-600" />
                                                    {profileData.wing} Wing • Student
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            onClick={() => setIsEditing(false)}
                                                            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleSave}
                                                            className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 shadow-md active:scale-95 transition-all"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-yellow-600 hover:text-yellow-600 transition-all active:scale-95"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        Edit Profile
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Personal Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{profileData.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{profileData.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{profileData.phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.location}
                                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{profileData.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Short Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition-all resize-none"
                                            />
                                        ) : (
                                            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Academy Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Enrolled Wing</p>
                                                <p className="text-sm font-semibold text-gray-900">{profileData.wing}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Joining Date</p>
                                                <p className="text-sm font-semibold text-gray-900">{profileData.joinDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Secondary Actions & Stats */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                                    <div className="space-y-4">
                                        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                                                    <Shield className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">Security & Password</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <Bell className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">Notification Settings</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                    <Globe className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">Language Preferences</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-semibold mb-2">Need Support?</h3>
                                        <p className="text-gray-400 text-sm mb-6">Our team is available 24/7 to help you with any issues.</p>
                                        <button className="w-full py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition-all">
                                            Contact Support
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}
