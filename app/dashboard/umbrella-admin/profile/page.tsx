'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, Briefcase, Activity, Server, Database, Lock } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function UmbrellaAdminProfilePage() {
    const { user } = useAuth();

    const [profileData] = useState({
        name: user?.name || 'Super Admin',
        email: user?.email || 'admin@umbrellaacademy.rw',
        role: 'Umbrella System Administrator',
        joinDate: user?.joinDate || 'Jan 2020'
    });

    return (
        <div className="flex h-screen bg-[#FDFDFC]">
            <Sidebar activeItem="Profile" userType="umbrella-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto animate-fade-in">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 ">
                            <div className="h-48 bg-gradient-to-br from-yellow-600  to-yellow-800 relative overflow-hidden">
                                {/* Decorative Abstract Shapes */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
                                    <div className="absolute top-1/2 -right-12 w-48 h-48 bg-yellow-200 rounded-full blur-2xl" />
                                </div>
                            </div>

                            <div className="px-10 pb-10">
                                <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl shadow-yellow-200/50 transform group-hover:scale-105 transition-all duration-500">
                                            <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full flex items-center justify-center text-yellow-700 text-4xl font-extrabold border border-yellow-200 uppercase">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-0 -right-0 w-10 h-10 bg-yellow-600 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 mt-20">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-2xl font-semibold text-gray-900  ">{profileData.name}</h1>
                                                <div className="px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-full text-[10px] font-black ">SYSTEM ROOT</div>
                                            </div>
                                            <p className="text-gray-500 font-semibold flex items-center gap-2 mt-1.5">
                                                <Shield className="w-4.5 h-4.5 text-yellow-600" />
                                                <span className="text-gray-600">Umbrella Academy Headquarters</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-gray-400">Master Access</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8 animate-slide-up">
                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-10 ">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">System Level Access</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-gray-900 rounded-lg text-white relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <p className="text-xs font-semibold text-gray-400 mb-4">Access Level</p>
                                                <p className="text-2xl font-black mb-2   transition-transform group-hover:translate-x-1">Tier 1 Elite</p>
                                                <p className="text-xs text-yellow-400 font-semibold    flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                                                    Full System Override
                                                </p>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-yellow-600/20 transition-all" />
                                        </div>

                                        <div className="p-8 bg-yellow-50 rounded-lg border border-yellow-100 relative group overflow-hidden">
                                            <div className="relative z-10">
                                                <p className="text-xs font-semibold text-yellow-400 mb-4">Network Integrity</p>
                                                <p className="text-2xl font-black text-yellow-900 mb-2  ">Healthy</p>
                                                <p className="text-xs text-yellow-700/60 font-semibold   ">All Wings Operational</p>
                                            </div>
                                            <Activity className="absolute bottom-4 right-4 w-12 h-12 text-yellow-200/50 transform group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-10 ">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">Master Records</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-transparent hover:border-yellow-100 transition-all">
                                            <label className="text-[10px] font-black text-gray-400    mb-1 block">Primary Email</label>
                                            <p className="text-gray-900 font-semibold break-all">{profileData.email}</p>
                                        </div>
                                        <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-transparent hover:border-yellow-100 transition-all">
                                            <label className="text-[10px] font-black text-gray-400    mb-1 block">Creation Date</label>
                                            <p className="text-gray-900 font-semibold">{profileData.joinDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 animate-slide-up [animation-delay:200ms]">
                                <div className="bg-white rounded-lg border border-gray-100 shadow-xl shadow-gray-200/30 p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-8">Quick Control</h3>
                                    <div className="space-y-4">
                                        <ControlItem icon={<Server className="w-5 h-5" />} label="Infrastructure" />
                                        <ControlItem icon={<Users className="w-5 h-5" />} label="Master Users" />
                                        <ControlItem icon={<Database className="w-5 h-5" />} label="System Logs" />
                                    </div>
                                </div>

                                <div className="p-8 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg text-white shadow-2xl shadow-yellow-600/30 group">
                                    <h4 className="text-lg font-black mb-2">Emergency Protocols</h4>
                                    <p className="text-yellow-100 text-xs font-medium mb-6 leading-relaxed opacity-80">Access high-security overrides and wing shutdown controls.</p>
                                    <button className="w-full py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-[1.2rem] font-black text-sm transition-all flex items-center justify-center gap-2 group">
                                        Open Protocol Hub
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ControlItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-yellow-50 transition-all group border border-transparent hover:border-yellow-100">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-yellow-600 group-hover:text-white transition-all shadow-sm">
                    {icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-yellow-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-yellow-900 group-hover:translate-x-1 transition-all" />
        </button>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
    );
}

function Users({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
