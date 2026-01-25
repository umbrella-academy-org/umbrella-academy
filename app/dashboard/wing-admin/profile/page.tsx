'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { User, Mail, Shield, Bell, Calendar, MapPin, Camera, Edit2, Check, X, Phone, Globe, BookOpen, Award, Zap, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts';

export default function WingAdminProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'j.doe@dreamize.rw',
        location: 'Kigali, Rwanda',
        bio: 'Wing Administrator responsible for the Software Engineering department. Overseeing 50+ trainers and 500+ students.',
        wing: user?.wing || 'Software Engineering',
        joinDate: user?.joinDate || 'Jan 2021'
    });

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Profile" userType="wing-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                            <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600 relative">
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 text-3xl font-bold border border-orange-200 uppercase">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                    <Briefcase className="w-4 h-4 text-orange-600" />
                                                    {profileData.wing} Wing • Administrator
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Administrator Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Primary Email</label>
                                            <p className="text-gray-900 font-medium">{profileData.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Joining Date</label>
                                            <p className="text-gray-900 font-medium">{profileData.joinDate}</p>
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
