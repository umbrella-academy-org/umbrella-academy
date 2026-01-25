'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, ChevronRight, Settings, ExternalLink } from 'lucide-react';
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
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="student" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 interactive-card">
                            <div className="h-48 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-orange-200 rounded-full blur-2xl" />
                                </div>
                                <button className="absolute bottom-6 right-8 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all shadow-xl interactive-button">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-10 pb-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl shadow-yellow-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-[2.2rem] flex items-center justify-center text-yellow-700 text-4xl font-extrabold border border-yellow-200 uppercase tracking-tighter">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center" title="Online Status">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{profileData.name}</h1>
                                                <div className="px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-full text-[10px] font-black uppercase tracking-wider">PRO STUDENT</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-1.5">
                                                <BookOpen className="w-4.5 h-4.5 text-yellow-600" />
                                                <span className="text-gray-600">{profileData.wing} Wing</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400">Regular Student</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => setIsEditing(false)}
                                                        className="px-6 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black shadow-xl shadow-gray-200 active:scale-95 transition-all"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="flex items-center gap-2.5 px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold hover:border-yellow-600 hover:text-yellow-600 shadow-sm hover:shadow-yellow-100/50 transition-all active:scale-95 group"
                                                >
                                                    <Edit2 className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Personal Info */}
                            <div className="lg:col-span-2 space-y-8 animate-slide-up">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-10 interactive-card">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all font-medium"
                                                />
                                            ) : (
                                                <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] group-hover:bg-white transition-colors">
                                                    <p className="text-gray-900 font-bold">{profileData.name}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all font-medium"
                                                />
                                            ) : (
                                                <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                    <p className="text-gray-900 font-bold">{profileData.email}</p>
                                                    <Mail className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all font-medium"
                                                />
                                            ) : (
                                                <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                    <p className="text-gray-900 font-bold">{profileData.phone}</p>
                                                    <Phone className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Location</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.location}
                                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all font-medium"
                                                />
                                            ) : (
                                                <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                    <p className="text-gray-900 font-bold">{profileData.location}</p>
                                                    <MapPin className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-gray-50">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 mb-4">Short Biography</label>
                                        {isEditing ? (
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                rows={4}
                                                className="w-full px-5 py-4 bg-gray-50 border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all font-medium resize-none leading-relaxed"
                                                placeholder="Tell us about yourself..."
                                            />
                                        ) : (
                                            <div className="p-6 bg-gray-50/50 rounded-[1.5rem] border border-transparent">
                                                <p className="text-gray-700 font-medium leading-relaxed italic">"{profileData.bio}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-10 interactive-card">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Academy Identity</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex items-center gap-6 p-6 bg-yellow-50/30 rounded-[1.8rem] border border-yellow-100/50 group hover:bg-yellow-50 transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-yellow-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                <BookOpen className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-yellow-800/60 uppercase tracking-widest mb-1">Enrolled Wing</p>
                                                <p className="text-lg font-black text-gray-900">{profileData.wing}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 p-6 bg-blue-50/30 rounded-[1.8rem] border border-blue-100/50 group hover:bg-blue-50 transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                <Calendar className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-blue-800/60 uppercase tracking-widest mb-1">Joining Date</p>
                                                <p className="text-lg font-black text-gray-900">{profileData.joinDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Preferences & Support */}
                            <div className="space-y-8 animate-slide-up [animation-delay:200ms]">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-8 interactive-card">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-gray-400" />
                                        Account Settings
                                    </h3>

                                    <div className="space-y-4">
                                        <SettingsItem
                                            icon={<Shield className="w-4.5 h-4.5" />}
                                            label="Security & Privacy"
                                            color="yellow"
                                        />
                                        <SettingsItem
                                            icon={<Bell className="w-4.5 h-4.5" />}
                                            label="Notification Center"
                                            color="blue"
                                        />
                                        <SettingsItem
                                            icon={<Globe className="w-4.5 h-4.5" />}
                                            label="Region & Language"
                                            color="purple"
                                        />
                                        <SettingsItem
                                            icon={<ExternalLink className="w-4.5 h-4.5" />}
                                            label="My Learning Assets"
                                            color="green"
                                        />
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-900/40 group">
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <HelpCircleIcon className="w-7 h-7 text-yellow-500" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 tracking-tight">Access Support</h3>
                                        <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Got questions? Our student success team is ready to assist you 24/7.</p>
                                        <button className="w-full py-4 bg-yellow-600 text-white rounded-[1.2rem] font-black hover:bg-yellow-500 shadow-xl shadow-yellow-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                                            Get Assistance
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {/* Abstract background elements */}
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-600/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-yellow-600/30 transition-colors duration-700" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full -ml-16 -mb-16 blur-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SettingsItem({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
    const colors = {
        yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600',
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600',
        green: 'bg-green-50 text-green-600 group-hover:bg-green-600'
    };

    const colorClasses = colors[color as keyof typeof colors] || colors.yellow;

    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:text-white transition-all duration-300 ${colorClasses}`}>
                    {icon}
                </div>
                <span className="text-[15px] font-bold text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}

function HelpCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
