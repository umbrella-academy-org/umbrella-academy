'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, Briefcase, Settings, ChevronRight, Layout, Users } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function FieldAdminProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'j.doe@dreamize.rw',
        location: 'Kigali, Rwanda',
        bio: 'Field Administrator responsible for the department oversight. Overseeing 50+ trainers and 500+ students.',
        field: user?.fieldId || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2021'
    });

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="field-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 ">
                            <div className="h-48 bg-linear-to-br from-gray-400 via-gray-500 to-gray-600 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-gray-200 rounded-full blur-2xl" />
                                </div>
                            </div>

                            <div className="px-10 pb-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl shadow-gray-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-linear-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center text-gray-700 text-4xl font-extrabold border border-gray-200   er">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-yellow-600 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 mt-20 pb-2">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-3xl font-black text-gray-900  ">{profileData.name}</h1>
                                                <div className="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-100 rounded-full text-[10px] font-black  ">FIELD COMMANDER</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-1.5">
                                                <Briefcase className="w-4.5 h-4.5 text-gray-600" />
                                                <span className="text-gray-600 capitalize">{profileData.field.replace(/-/g, ' ')} Field</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400">Department Admin</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8 animate-slide-up">
                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-10 ">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
                                        <User className="text-gray-500 w-6 h-6" />
                                        Administrator Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-transparent hover:border-gray-100 transition-all">
                                                <label className="text-[10px] font-black text-gray-400    mb-1 block">Primary Email</label>
                                                <p className="text-gray-900 font-semibold">{profileData.email}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-transparent hover:border-gray-100 transition-all">
                                                <label className="text-[10px] font-black text-gray-400    mb-1 block">Joining Date</label>
                                                <p className="text-gray-900 font-semibold">{profileData.joinDate}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gray-50/50 rounded-lg border border-gray-100">
                                            <label className="text-[10px] font-black text-gray-800/60    mb-4 block">Field Mission</label>
                                            <p className="text-gray-700 font-medium leading-relaxed italic">"{profileData.bio}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-10 ">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">Field Stats Oversight</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-black rounded-lg text-white relative overflow-hidden group">
                                            <Users className="w-8 h-8 text-gray-500 mb-4 transform group-hover:scale-110 transition-transform" />
                                            <p className="text-3xl font-black mb-1">50+</p>
                                            <p className="text-xs text-gray-400 font-semibold   ">Active Trainers</p>
                                        </div>
                                        <div className="p-8 bg-yellow-600 rounded-lg text-white relative overflow-hidden group">
                                            <BookOpen className="w-8 h-8 text-white mb-4 transform group-hover:scale-110 transition-transform" />
                                            <p className="text-3xl font-black mb-1">500+</p>
                                            <p className="text-xs text-gray-100 font-semibold   ">Enrolled Students</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 animate-slide-up [animation-delay:200ms]">
                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">Management</h3>
                                    <div className="space-y-4">
                                        <ManagementItem icon={<Layout className="w-5 h-5" />} label="Field Dashboard" />
                                        <ManagementItem icon={<Users className="w-5 h-5" />} label="Staff Directory" />
                                        <ManagementItem icon={<Settings className="w-5 h-5" />} label="Field Settings" />
                                    </div>
                                </div>

                                <div className="p-8 bg-black rounded-lg text-white shadow-2xl shadow-gray-900/40 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-black mb-2  ">Field Support</h4>
                                        <p className="text-gray-400 text-xs font-medium mb-6 leading-relaxed">Need help managing your field? Contact system admin.</p>
                                        <button className="w-full py-4 bg-yellow-600 hover:bg-gray-500 rounded-[1.2rem] font-black text-sm transition-all shadow-xl shadow-gray-600/20">
                                            Get Support
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-yellow-600/20 transition-all opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ManagementItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-yellow-600 group-hover:text-white transition-all shadow-sm">
                    {icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
