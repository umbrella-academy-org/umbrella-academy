'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    User, Mail, Shield, Bell, Calendar, MapPin,
    Camera, Edit2, Check, X, Phone, Globe,
    BookOpen, ChevronRight, Settings, ExternalLink,
    Bookmark, MessageSquare, Star, Clock, Trophy,
    TrendingUp, Award
} from 'lucide-react';
import { useAuth } from '@/contexts';
import Image from 'next/image';
import { StudentUser } from '@/types';

export default function StudentProfilePage() {
    const { user } = useAuth();
    const studentUser = user?.role === 'student' ? user as StudentUser : null;
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('About');

    // Mock data for new layout elements if not in user object
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Jane Mukamana',
        role: 'Software Engineering Student',
        email: user?.email || 'jane.mukamana@student.umbrella.rw',
        phone: '+250 788 000 000',
        location: 'Kigali, Rwanda',
        website: 'www.janemukamana.me',
        bio: user?.profileData?.bio || 'Passionate learner focused on Full Stack Development and AI implementation.',
        wing: user?.wingId || 'Tech Companies Wing',
        joinDate: user?.joinDate || 'Sep 2024',
        gender: 'Female',
        birthday: 'June 5, 2002',
        ranking: 8.6,
        skills: user?.profileData?.skills || ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'UI/UX'],
        experience: [
            { id: 1, title: 'Frontend Basics', organization: 'Academy Core', status: 'Primary', period: 'Phase 1 - Completed' },
            { id: 2, title: 'React Mastery', organization: 'Tech Wing', status: 'Secondary', period: 'Phase 2 - In Progress' }
        ]
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="student" />

            <div className="items-center w-full flex flex-col min-w-0 overflow-hidden text-gray-900">
                <main className="flex overflow-y-auto">
                    <div className="max-w-full mx-auto p-2 space-y-8 animate-fade-in">
                        {/* Profile Header Block */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
                            <div className="h-44 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 relative">
                                <div className="absolute inset-0 opacity-20 interaction-none">
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mt-32" />
                                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl -mr-32 -mb-32" />
                                </div>
                                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all z-10">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-8 pb-4">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Profile Avatar Container */}
                                    <div className="relative -mt-20">
                                        <div className="w-40 h-40 rounded-2xl bg-white p-1 border border-gray-100 shadow-2xl overflow-hidden group">
                                            {user?.avatar ? (
                                                <Image src={user.avatar} alt="Avatar" width={160} height={160} className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center text-yellow-700 text-5xl font-black rounded-lg">
                                                    {profileData.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full" title="Online" />
                                    </div>

                                    {/* Identity Details */}
                                    <div className="flex-1 mt-4">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{profileData.name}</h1>
                                                    <div className="flex items-center gap-1 text-gray-400">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{profileData.location}</span>
                                                    </div>
                                                </div>
                                                <p className="text-yellow-600 font-bold mt-1 text-lg">{profileData.role}</p>

                                                <div className="mt-4 flex items-center gap-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Rankings</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-black text-gray-900 leading-none">{profileData.ranking}</span>
                                                            <div className="flex gap-0.5">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-200'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                                                    <MessageSquare className="w-4 h-4" /> Send message
                                                </button>
                                                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-100 transition-all active:scale-95">
                                                    <Check className="w-4 h-4" /> Contacts
                                                </button>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors px-2 font-bold text-sm">
                                                    Report user
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-10 flex items-center gap-8">
                                            <button
                                                onClick={() => setActiveTab('Timeline')}
                                                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-bold text-sm transition-all ${activeTab === 'Timeline' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <TrendingUp className="w-4 h-4" /> Timeline
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('About')}
                                                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-bold text-sm transition-all ${activeTab === 'About' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <User className="w-4 h-4" /> About
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 px-10">
                            {/* Left Column */}
                            <div className="lg:col-span-4 space-y-10">
                                {/* Wing/Academy Section */}
                                <div className="space-y-6">
                                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Academy Path</h3>
                                    <div className="space-y-8">
                                        {profileData.experience.map((exp) => (
                                            <div key={exp.id} className="flex gap-4 group">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-all">
                                                    <BookOpen className="w-6 h-6 text-gray-400 group-hover:text-yellow-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">{exp.title}</h4>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${exp.status === 'Primary' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                            {exp.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-500 mt-1">{exp.period}</p>
                                                    <p className="text-xs font-medium text-gray-400 mt-0.5">{exp.organization}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills Section */}
                                <div className="space-y-6">
                                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Core Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.skills.map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:border-yellow-600 hover:text-yellow-600 hover:bg-yellow-50/50 transition-all cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Personal Information) */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Contact Info */}
                                <section className="space-y-8">
                                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
                                        <InfoItem label="Phone:" value={profileData.phone} isLink />
                                        <InfoItem label="Address:" value={profileData.location} />
                                        <InfoItem label="E-mail:" value={profileData.email} isLink />
                                        <InfoItem label="Site:" value={profileData.website} isLink />
                                    </div>
                                </section>

                                {/* Basic Info */}
                                <section className="space-y-8">
                                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
                                        <InfoItem label="Birthday:" value={profileData.birthday} />
                                        <InfoItem label="Gender:" value={profileData.gender} />
                                        <InfoItem label="Joining Date:" value={profileData.joinDate} />
                                        <InfoItem label="Status:" value="Active Student" />
                                    </div>
                                </section>

                                {/* Learning Info */}
                                <section className="space-y-8">
                                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Learning Experience</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
                                        <InfoItem
                                            label="Learning Pace:"
                                            value={studentUser?.learningPreferences?.pace ? (studentUser.learningPreferences.pace.charAt(0).toUpperCase() + studentUser.learningPreferences.pace.slice(1)) : 'Medium'}
                                        />
                                        <InfoItem
                                            label="Preferred Slot:"
                                            value={studentUser?.availability?.preferredTimeSlots ? studentUser.availability.preferredTimeSlots.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : 'Morning, Evening'}
                                        />
                                        <InfoItem
                                            label="Weekly Commitment:"
                                            value={`${studentUser?.availability?.weeklyAvailableHours || 20} Hours`}
                                        />
                                        <InfoItem
                                            label="Learning Style:"
                                            value={studentUser?.learningPreferences?.style ? (studentUser.learningPreferences.style.charAt(0).toUpperCase() + studentUser.learningPreferences.style.slice(1)) : 'Visual'}
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function InfoItem({ label, value, isLink = false }: { label: string, value: string, isLink?: boolean }) {
    return (
        <div className="flex gap-2 min-h-[1.5rem] group">
            <span className="w-1/3 text-sm font-bold text-gray-400 group-hover:text-gray-500 transition-colors uppercase tracking-tight">{label}</span>
            <span className={`w-2/3 text-sm font-black tracking-tight ${isLink ? 'text-blue-600 hover:text-blue-700 hover:underline cursor-pointer' : 'text-gray-900'}`}>
                {value}
            </span>
        </div>
    );
}
