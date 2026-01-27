'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, ChevronRight, Settings, Users, Star } from 'lucide-react';
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
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="mentor" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-full mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 interactive-card">
                            <div className="h-48 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-blue-200 rounded-full blur-2xl" />
                                </div>
                                <button className="absolute bottom-6 right-8 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all shadow-xl interactive-button">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-10 pb-10 pt-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-20">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl shadow-blue-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-[2.2rem] flex items-center justify-center text-blue-700 text-4xl font-extrabold border border-blue-200 uppercase tracking-tighter">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-600 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                                        <div className=''>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{profileData.name}</h1>
                                                <div className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-wider">ACADEMIC DIRECTOR</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-1.5">
                                                <Zap className="w-4.5 h-4.5 text-blue-600" />
                                                <span className="text-gray-600">{profileData.wing} Wing</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400">Senior Mentor</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            {isEditing ? (
                                                <>
                                                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">Cancel</button>
                                                    <button onClick={handleSave} className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black shadow-xl shadow-gray-200 active:scale-95 transition-all">Save Changes</button>
                                                </>
                                            ) : (
                                                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2.5 px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 shadow-sm hover:shadow-blue-100/50 transition-all active:scale-95 group">
                                                    <Edit2 className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                            {/* Left Column - Personal Info */}
                            <div className="lg:col-span-2 space-y-8 animate-slide-up">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-10 interactive-card">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem]">
                                                <p className="text-gray-900 font-bold">{profileData.name}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                <p className="text-gray-900 font-bold">{profileData.email}</p>
                                                <Mail className="w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Role Status</label>
                                            <div className="px-5 py-3.5 bg-green-50/50 border border-green-100 rounded-[1.2rem] flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <p className="text-green-700 font-black text-xs uppercase  ">Active Member</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Work Location</label>
                                            <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem] flex items-center justify-between">
                                                <p className="text-gray-900 font-bold">{profileData.location}</p>
                                                <MapPin className="w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-gray-50">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 mb-4">Focus & Mission</label>
                                        <div className="p-6 bg-gray-50/50 rounded-[1.5rem] border border-transparent shadow-inner">
                                            <p className="text-gray-700 font-medium leading-relaxed italic">"{profileData.bio}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-10 interactive-card">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Mentorship Oversight</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 bg-blue-50/30 rounded-[2rem] border border-blue-100/50 group hover:bg-blue-50 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <Users className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-gray-900">Supervised Trainers</p>
                                                    <p className="text-xs text-blue-800/60 font-bold uppercase  ">Profile Approval Access</p>
                                                </div>
                                            </div>
                                            <span className="text-3xl font-black text-blue-600">24</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-purple-50/30 rounded-[2rem] border border-purple-100/50 group hover:bg-purple-50 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <BookOpen className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-gray-900">Active Roadmaps</p>
                                                    <p className="text-xs text-purple-800/60 font-bold uppercase  ">Quality Assurance Flow</p>
                                                </div>
                                            </div>
                                            <span className="text-3xl font-black text-purple-600">182</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Actions */}
                            <div className="space-y-8 animate-slide-up [animation-delay:200ms]">
                                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-900/40">
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                                            <Zap className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 tracking-tight">Mentor Actions</h3>
                                        <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Direct oversight of academic standards and curriculum excellence.</p>
                                        <div className="space-y-4">
                                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-[1.2rem] font-black transition-all text-sm flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20">
                                                Review Roadmaps
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-[1.2rem] font-bold transition-all text-sm border border-white/10 backdrop-blur-md">
                                                Verification Hub
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-8 interactive-card">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-gray-400" />
                                        Work Preferences
                                    </h3>
                                    <div className="space-y-2">
                                        <SettingsItem icon={<Shield className="w-4 h-4" />} label="Security Protocol" color="blue" />
                                        <SettingsItem icon={<Bell className="w-4 h-4" />} label="System Alerts" color="indigo" />
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
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
        indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600'
    };
    const colorClasses = colors[color as keyof typeof colors] || colors.blue;

    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:text-white transition-all duration-300 ${colorClasses}`}>
                    {icon}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
