'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    User, Mail, Shield, Bell, Calendar, MapPin,
    Camera, Edit2, Check, X, Phone, Globe,
    BookOpen, ChevronRight, Settings, ExternalLink,
    Bookmark, MessageSquare, Star, Clock, Trophy,
    TrendingUp, Award, Zap, Target, Brain,
    Link as LinkIcon, Linkedin, Github, Twitter,
    Sparkles, GraduationCap, Flame, Layout, Video,
    Users, CalendarDays
} from 'lucide-react';
import { useAuth } from '@/contexts';
import Image from 'next/image';
import { StudentUser } from '@/types';

export default function StudentProfilePage() {
    const { user } = useAuth();
    const studentUser = user?.role === 'student' ? user as StudentUser : null;
    const [activeTab, setActiveTab] = useState('Overview');

    // Data tailored for Live Session based E-Learning
    const profileData = {
        name: user?.name || 'Jane Mukamana',
        role: 'Software Engineering Trainee',
        email: user?.email || 'jane.mukamana@student.umbrella.rw',
        phone: '+250 788 000 000',
        location: 'Kigali, Rwanda',
        portfolio: 'janemukamana.dev',
        bio: user?.profileData?.bio || 'Dedicated trainee focusing on live collaborative sessions and practical software implementation within the Umbrella Tech Field.',
        field: user?.fieldId?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Tech Companies Field',
        joinDate: user?.joinDate || 'Sep 2024',
        sessionsAttended: 42,
        attendanceRate: '94%',
        totalHours: 142,
        engagementScore: 88,
        skills: [
            { name: 'React Architecture', level: 'Advanced', color: 'bg-gray-500' },
            { name: 'Node.js Systems', level: 'Intermediate', color: 'bg-amber-600' },
            { name: 'TypeScript', level: 'Intermediate', color: 'bg-amber-600' },
            { name: 'UI/UX Principles', level: 'Advanced', color: 'bg-gray-500' },
        ],
        liveRoadmap: [
            { title: 'Core JavaScript', status: 'Completed', date: 'Oct 2024' },
            { title: 'React & State Management', status: 'In Progress', date: 'Ongoing' },
            { title: 'Full Stack Integration', status: 'Upcoming', date: 'Dec 2024' },
        ]
    };

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="student" />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    {/* Header Banner - Rounded LG */}
                    <div className="max-w-[1400px] mx-auto px-6 pt-6">
                        <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-sm border border-gray-100">
                            <Image
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                                alt="Cover"
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
                            <div className="absolute top-4 right-4">
                                <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all border border-white/20">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Profile Info Overlap */}
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 px-8 relative z-10">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-lg bg-white p-1 shadow-xl border border-gray-100">
                                    {user?.avatar ? (
                                        <Image src={user.avatar} alt="Avatar" width={128} height={128} className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-4xl font-black rounded-lg">
                                            {profileData.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-500 border-2 border-white rounded-full" />
                            </div>

                            <div className="flex-1 pb-2">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h1 className="text-3xl font-bold text-amber-900">{profileData.name}</h1>
                                        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-600" /> {profileData.location}</span>
                                            <span className="flex items-center gap-1.5 text-gray-700 font-bold"><Zap className="w-4 h-4" /> {profileData.role}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all shadow-md active:scale-95 text-sm">
                                            Edit Details
                                        </button>
                                        <button className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 shadow-sm transition-all">
                                            <Settings className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Rounded LG */}
                    <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                        <SimpleStat icon={<Video className="w-5 h-5" />} label="Live Sessions" value={profileData.sessionsAttended} color="text-gray-600" />
                        <SimpleStat icon={<Users className="w-5 h-5" />} label="Attendance" value={profileData.attendanceRate} color="text-gray-600" />
                        <SimpleStat icon={<Clock className="w-5 h-5" />} label="Live Hours" value={profileData.totalHours} color="text-gray-600" />
                        <SimpleStat icon={<TrendingUp className="w-5 h-5" />} label="Engagement" value={`${profileData.engagementScore}%`} color="text-gray-600" />
                    </div>

                    <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                        {/* Sidebar Column */}
                        <div className="space-y-8">
                            {/* Navigation */}
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-2">
                                {['Overview', 'Live Roadmap', 'Resources', 'Account Settings'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-gray-50 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            {tab === 'Overview' && <Layout className="w-4.5 h-4.5" />}
                                            {tab === 'Live Roadmap' && <CalendarDays className="w-4.5 h-4.5" />}
                                            {tab === 'Resources' && <BookOpen className="w-4.5 h-4.5" />}
                                            {tab === 'Account Settings' && <Settings className="w-4.5 h-4.5" />}
                                            {tab}
                                        </span>
                                        <ChevronRight className="w-4 h-4 opacity-40" />
                                    </button>
                                ))}
                            </div>

                            {/* Bio Block */}
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 space-y-4">
                                <h3 className="text-xs font-black text-gray-400  ">About Me</h3>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">{profileData.bio}</p>
                                <div className="flex gap-2 pt-2">
                                    <SocialLink icon={<Linkedin className="w-4 h-4" />} />
                                    <SocialLink icon={<Github className="w-4 h-4" />} />
                                    <SocialLink icon={<Globe className="w-4 h-4" />} />
                                </div>
                            </div>
                        </div>

                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Live Session Roadmap */}
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-amber-900">Live Session Roadmap</h3>
                                    <span className="text-[10px] font-black text-gray-600  bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">Active Field: {profileData.field}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {profileData.liveRoadmap.map((item, i) => (
                                        <div key={i} className={`p-5 rounded-lg border ${item.status === 'Completed' ? 'bg-gray-50/30 border-gray-100' : item.status === 'In Progress' ? 'bg-gray-50/30 border-gray-100' : 'bg-gray-50/30 border-gray-100'}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`text-[9px] font-black  px-2 py-0.5 rounded ${item.status === 'Completed' ? 'bg-gray-100 text-gray-700' : item.status === 'In Progress' ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-600'}`}>{item.status}</span>
                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold">{item.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Arsenal & Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                <div className="md:col-span-3 bg-white rounded-lg border border-gray-100 shadow-sm p-8 space-y-6">
                                    <h3 className="text-xl font-bold text-amber-900">Technical Arsenal</h3>
                                    <div className="space-y-5">
                                        {profileData.skills.map((skill) => (
                                            <div key={skill.name} className="space-y-2">
                                                <div className="flex items-center justify-between text-xs font-bold">
                                                    <span className="text-gray-700">{skill.name}</span>
                                                    <span className="text-gray-400 ">{skill.level}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${skill.color} transition-all duration-1000`}
                                                        style={{ width: skill.level === 'Advanced' ? '85%' : '60%' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm p-8 space-y-6">
                                    <h3 className="text-xl font-bold text-amber-900">Contact Details</h3>
                                    <div className="space-y-6">
                                        <MiniInfo label="Academy Email" value={profileData.email} icon={<Mail className="w-4 h-4" />} />
                                        <MiniInfo label="Phone Number" value={profileData.phone} icon={<Phone className="w-4 h-4" />} />
                                        <MiniInfo label="Join Date" value={profileData.joinDate} icon={<Calendar className="w-4 h-4" />} />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences Recap */}
                            <div className="bg-gray-900 rounded-lg p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                                <div className="space-y-2">
                                    <h4 className="text-lg font-bold">Trainee Academic Preferences</h4>
                                    <p className="text-gray-400 text-sm font-medium">Your current session availability and learning style</p>
                                </div>
                                <div className="flex gap-10">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-gray-500   mb-1">Time Slot</p>
                                        <p className="text-sm font-bold text-gray-400">{studentUser?.availability?.preferredTimeSlots ? studentUser.availability.preferredTimeSlots[0] : 'None'}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-gray-500   mb-1">Weekly Commitment</p>
                                        <p className="text-sm font-bold text-gray-400">{studentUser?.availability?.weeklyAvailableHours || 20} Hours</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-gray-500   mb-1">Learning Pace</p>
                                        <p className="text-sm font-bold text-gray-400">{studentUser?.learningPreferences?.pace || 'Standard'}</p>
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

function SimpleStat({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
    return (
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-2 group hover:border-gray-200 transition-all">
            <div className={`p-2.5 rounded-lg bg-gray-50 group-hover:bg-gray-50 transition-colors ${color}`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-gray-400  ">{label}</p>
            <p className="text-2xl font-black text-amber-900">{value}</p>
        </div>
    );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="p-2.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95">
            {icon}
        </button>
    );
}

function MiniInfo({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-black text-gray-400   flex items-center gap-2">
                {icon} {label}
            </span>
            <span className="text-sm font-bold text-gray-800 break-all">{value}</span>
        </div>
    );
}
