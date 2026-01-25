'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function MentorProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Dr. Alex Rodriguez',
        email: user?.email || 'a.rodriguez@dreamize.rw',
        phone: '+250 788 555 666',
        location: 'Kigali, Rwanda',
        bio: 'Academic Director and Senior Mentor. Overseeing instructional quality and roadmap integrity for the Software Engineering wing.',
        expertise: ['Curriculum Design', 'Educational Leadership', 'Quality Assurance', 'Strategic Mentorship'],
        experience: '15+ Years',
        wing: user?.wing || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2022'
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Profile" userType="mentor" />

            <div className="flex-1 flex flex-col min-w-0">
                <Header breadcrumb="My Profile" userType="mentor" />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
                                <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 text-3xl font-bold border border-blue-200 uppercase">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                    <Zap className="w-4 h-4 text-blue-600" />
                                                    {profileData.wing} Wing • Academic Mentor
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
                                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md active:scale-95 transition-all"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
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
                                            <p className="text-gray-900 font-medium">{profileData.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                            <p className="text-gray-900 font-medium">{profileData.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Role Status</label>
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-xs font-bold uppercase">
                                                <Check className="w-3 h-3" />
                                                Active Member
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                                            <p className="text-gray-900 font-medium">{profileData.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Mentorship Oversight</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">Total Trainers Supervised</p>
                                                    <p className="text-xs text-gray-500">Mentors review and approve trainer profiles</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-bold text-gray-900">24</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                                    <Award className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">Total Student Roadmaps</p>
                                                    <p className="text-xs text-gray-500">Overseeing learning progress excellence</p>
                                                </div>
                                            </div>
                                            <span className="text-xl font-bold text-gray-900">182</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Secondary Actions */}
                            <div className="space-y-8">
                                <div className="bg-gray-900 rounded-2xl p-8 text-white">
                                    <h3 className="text-lg font-semibold mb-2">Mentor Actions</h3>
                                    <p className="text-gray-400 text-sm mb-6">Manage high-level wing operations and quality standards.</p>
                                    <div className="space-y-3">
                                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all text-sm">
                                            Review Pending Roadmaps
                                        </button>
                                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all text-sm border border-white/10">
                                            Trainer Verification Hub
                                        </button>
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
