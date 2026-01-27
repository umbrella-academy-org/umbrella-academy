'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Briefcase, Award, ChevronRight, Settings, Star, Zap } from 'lucide-react';
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
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="trainer" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 interactive-card">
                            <div className="h-48 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-emerald-200 rounded-full blur-2xl" />
                                </div>
                                <button className="absolute bottom-6 right-8 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all shadow-xl interactive-button">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-10 pb-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl shadow-green-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 rounded-[2.2rem] flex items-center justify-center text-green-700 text-4xl font-extrabold border border-green-200 uppercase  er">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center" title="Verified Trainer">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-3xl font-black text-gray-900  ">{profileData.name}</h1>
                                                <div className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] font-black uppercase tracking-wider">CERTIFIED TRAINER</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-1.5">
                                                <Briefcase className="w-4.5 h-4.5 text-green-600" />
                                                <span className="text-gray-600">{profileData.wing} Wing</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400">Senior Instructor</span>
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
                                                    className="flex items-center gap-2.5 px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold hover:border-green-600 hover:text-green-600 shadow-sm hover:shadow-green-100/50 transition-all active:scale-95 group"
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
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium"
                                                />
                                            ) : (
                                                <div className="px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-[1.2rem]">
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
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium"
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
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium"
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
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium"
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
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 mb-4">Professional Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                rows={4}
                                                className="w-full px-5 py-4 bg-gray-50 border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium resize-none leading-relaxed"
                                            />
                                        ) : (
                                            <div className="p-6 bg-gray-50/50 rounded-[1.5rem] border border-transparent">
                                                <p className="text-gray-700 font-medium leading-relaxed">{profileData.bio}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-10 interactive-card">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Expertise & Experience</h3>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1 mb-4">Top Skills & Specialties</label>
                                            <div className="flex flex-wrap gap-3">
                                                {profileData.expertise.map((skill, i) => (
                                                    <span key={i} className="px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-[1rem] text-xs font-black uppercase tracking-wider shadow-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {isEditing && (
                                                    <button className="px-4 py-2 border-2 border-dashed border-gray-200 text-gray-400 rounded-[1rem] text-xs font-bold hover:border-green-500 hover:text-green-500 transition-all active:scale-95">
                                                        + Add Expertise
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <div className="flex items-center gap-6 p-6 bg-green-50/30 rounded-[1.8rem] border border-green-100/50 group hover:bg-green-50 transition-colors">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <Zap className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-green-800/60 uppercase   mb-1">Experience</p>
                                                    <p className="text-lg font-black text-gray-900">{profileData.experience}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 p-6 bg-blue-50/30 rounded-[1.8rem] border border-blue-100/50 group hover:bg-blue-50 transition-colors">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                                                    <Calendar className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-blue-800/60 uppercase   mb-1">Active Since</p>
                                                    <p className="text-lg font-black text-gray-900">{profileData.joinDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Stats & Settings */}
                            <div className="space-y-8 animate-slide-up [animation-delay:200ms]">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-8 interactive-card">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <Star className="w-5 h-5 text-yellow-500" />
                                        Performance Stats
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all">
                                            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Students</span>
                                            <span className="text-2xl font-black text-gray-900">124</span>
                                        </div>
                                        <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border-l-4 border-l-green-500">
                                            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Avg. Rating</span>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="text-2xl font-black text-gray-900">4.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 p-8 interactive-card">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-gray-400" />
                                        Trainer Hub
                                    </h3>
                                    <div className="space-y-3">
                                        <SettingsItem icon={<Shield className="w-4.5 h-4.5" />} label="Security Settings" color="green" />
                                        <SettingsItem icon={<Bell className="w-4.5 h-4.5" />} label="Teaching Alerts" color="blue" />
                                        <SettingsItem icon={<Globe className="w-4.5 h-4.5" />} label="Wing Visibility" color="purple" />
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                    <div className="relative z-10 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black tracking-[0.2em] mb-4 uppercase">
                                            <Shield className="w-3 h-3" />
                                            Identity Verified
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Trainer Badge</h3>
                                        <p className="text-gray-400 text-xs font-medium mb-6 leading-relaxed">Your professional credentials have been fully verified by the Academy board.</p>
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-600/20 transform group-hover:rotate-12 transition-transform duration-500">
                                            <Check className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
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
        green: 'bg-green-50 text-green-600 group-hover:bg-green-600',
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600',
        yellow: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600'
    };

    const colorClasses = colors[color as keyof typeof colors] || colors.green;

    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:text-white transition-all duration-300 ${colorClasses}`}>
                    {icon}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
