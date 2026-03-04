'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, ChevronRight, Settings, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts';
import { MentorUser } from '@/types';

export default function MentorProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Cast user to MentorUser if available to access role-specific fields
    const mentorUser = user as MentorUser;

    const [profileData, setProfileData] = useState({
        name: user?.name || 'Dr. Alex Rodriguez',
        email: user?.email || 'a.rodriguez@dreamize.rw',
        phone: '+250 788 555 666',
        location: 'Kigali, Rwanda',
        bio: 'Academic Director and Senior Mentor. Overseeing instructional quality and roadmap integrity for the Software Engineering field.',
        expertise: ['Curriculum Design', 'Educational Leadership', 'Quality Assurance', 'Strategic Mentorship'],
        experience: '15+ Years',
        field: mentorUser?.fieldId || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2022'
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="mentor" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-full mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8">
                            <div className="h-48 bg-gradient-to-br from-gray-600 to-gray-800 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-gray-200 rounded-full blur-2xl" />
                                </div>
                            </div>

                            <div className="px-10 pb-10 pt-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-20">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl shadow-gray-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center text-gray-700 text-4xl font-extrabold border border-gray-200 ">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-0 -right-0 w-10 h-10 bg-gray-600 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                                        <div className=''>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-2xl font-semibold text-gray-900  ">{profileData.name}</h1>
                                                <div className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-100 rounded-full text-[10px] font-black  ">ACADEMIC DIRECTOR</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-2">
                                                <Zap className="w-4.5 h-4.5 text-gray-600" />
                                                <span className="text-gray-600 text-sm capitalize">{profileData.field.replace(/-/g, ' ')} Field</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400 text-sm">Senior Mentor</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            {isEditing ? (
                                                <>
                                                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-all active:scale-95">Cancel</button>
                                                    <button onClick={handleSave} className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black shadow-xl shadow-gray-200 active:scale-95 transition-all">Save Changes</button>
                                                </>
                                            ) : (
                                                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2.5 px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-lg font-bold hover:border-gray-600 hover:text-gray-600 shadow-sm hover:shadow-gray-100/50 transition-all active:scale-95 group">
                                                    <Edit2 className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 ">
                            {/* Left Column - Personal Info */}
                            <div className="lg:col-span-2 space-y-2 animate-slide-up">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/30 p-6 ">
                                    <div className="flex items-center gap-2 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                        <div className="space-y-2">
                                            <label className="font-semibold text-gray-500 ml-1">Full Name</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem]">
                                                <p className="text-gray-800 font-semibold">{profileData.name}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-semibold text-gray-500 ml-1">Email Address</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                <p className="text-gray-900 font-semibold">{profileData.email}</p>
                                                <Mail className="w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-400   ml-1">Role Status</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-[1.2rem] flex items-center gap-2">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                                                <p className="text-gray-700 font-semibold text-xs   ">Active Member</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-400   ml-1">Work Location</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                <p className="text-gray-900 font-semibold">{profileData.location}</p>
                                                <MapPin className="w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-gray-50">
                                        <label className="block text-xs font-bold text-gray-400   ml-1 mb-4">Focus & Mission</label>
                                        <div className="p-6 bg-gray-50/50 rounded-lg border border-transparent shadow-inner">
                                            <p className="text-gray-700 font-medium leading-relaxed italic">"{profileData.bio}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg  border border-gray-100 shadow-xl shadow-gray-200/30 p-10 ">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Mentorship Oversight</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 bg-gray-50/30 rounded-lg border border-gray-100/50 group hover:bg-gray-50 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <Users className="w-7 h-7" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-semibold text-gray-900">Supervised Trainers</p>
                                                    <p className="text-xs text-gray-800/60 font-bold   ">Profile Approval Access</p>
                                                </div>
                                            </div>
                                            <span className="text-3xl font-black text-gray-600">24</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-gray-50/30 rounded-lg border border-gray-100/50 group hover:bg-gray-50 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <BookOpen className="w-7 h-7" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-semibold text-gray-900">Active Roadmaps</p>
                                                    <p className="text-xs text-gray-800/60 font-bold   ">Quality Assurance Flow</p>
                                                </div>
                                            </div>
                                            <span className="text-3xl font-black text-gray-600">182</span>
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

function SettingsItem({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
    const colors = {
        gray: 'bg-gray-50 text-gray-600 group-hover:bg-gray-600',
    };
    const colorClasses = colors[color as keyof typeof colors] || colors.gray;

    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:text-white transition-all duration-300 ${colorClasses}`}>
                    {icon}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
