'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, Briefcase } from 'lucide-react';
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
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Profile" userType="umbrella-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <Header breadcrumb="My Profile" userType="umbrella-admin" />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            <div className="h-32 bg-gradient-to-r from-red-600 to-red-800 relative">
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-red-100 rounded-xl flex items-center justify-center text-red-700 text-3xl font-bold border border-red-200 uppercase">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                    <Shield className="w-4 h-4 text-red-600" />
                                                    Umbrella Academy • System Administrator
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Level Access</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-4 bg-gray-900 rounded-xl text-white">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Access Level</p>
                                    <p className="text-sm font-semibold">Tier 1 • Full System Override</p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">System Health Oversight</p>
                                    <p className="text-sm font-semibold text-red-700">All Wings Operational</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
