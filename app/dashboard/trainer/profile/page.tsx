'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Briefcase, Award } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function TrainerProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Demi Wilkinson',
        email: user?.email || 'd.wilkinson@dreamize.rw',
        phone: '+250 788 111 222',
        location: 'Kigali, Rwanda',
        bio: 'Senior Software Engineer with 8+ years of experience in React, Node.js and Cloud Architecture. Passionate about mentoring the next generation of African developers.',
        expertise: ['Full Stack Development', 'Cloud Architecture', 'React & Next.js', 'System Design'],
        experience: '8+ Years',
        wing: user?.wing || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2023'
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Profile" userType="trainer" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            <div className="h-32 bg-gradient-to-r from-green-500 to-green-600 relative">
                                <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-3xl font-bold border border-green-200 uppercase">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                    <Briefcase className="w-4 h-4 text-green-600" />
                                                    {profileData.wing} Wing • Certified Trainer
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
                                                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-md active:scale-95 transition-all"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all active:scale-95"
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
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all"
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
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all"
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
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all"
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
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{profileData.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Trainer Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all resize-none"
                                            />
                                        ) : (
                                            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Expertise & Experience</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Skills & Tags</label>
                                            <div className="flex flex-wrap gap-2">
                                                {profileData.expertise.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {isEditing && (
                                                    <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-400 rounded-lg text-xs hover:border-green-600 hover:text-green-600 transition-all">
                                                        + Add Skill
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                                    <Award className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Experience</p>
                                                    <p className="text-sm font-semibold text-gray-900">{profileData.experience}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">On Academy Since</p>
                                                    <p className="text-sm font-semibold text-gray-900">{profileData.joinDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Stats & Quick Settings */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-500 font-medium">Students Assisted</span>
                                            <span className="text-xl font-bold text-gray-900">124</span>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-500 font-medium">Avg. Rating</span>
                                            <div className="flex items-center gap-1">
                                                <Check className="w-4 h-4 text-green-600" />
                                                <span className="text-xl font-bold text-gray-900">4.9/5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Verification</h3>
                                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-0.5">Verified Account</p>
                                            <p className="text-[10px] text-green-700 font-medium">Proofs of expertise verified</p>
                                        </div>
                                    </div>
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
