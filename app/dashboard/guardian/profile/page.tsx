'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Check, X, UserCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts';
import { Guardian, UserRole } from '@/types';

export default function GuardianProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Cast user to Guardian if available
    const guardianUser = user as Guardian;

    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
        location: 'Kigali, Rwanda',
        joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'
    });

    const handleSave = () => {
        setIsEditing(false);
        // TODO: Call API to update profile
    };

    const getInitials = () => {
        return `${profileData.firstName[0] || ''}${profileData.lastName[0] || ''}`.toUpperCase();
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar activeItem="Profile" userType={UserRole.GUARDIAN} />

            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900">My Profile</h1>
                            <p className="text-gray-600 mt-1">View and manage your guardian account information</p>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Banner */}
                            <div className="h-32 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>

                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold">
                                                {getInitials() || <UserCircle className="w-10 h-10" />}
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    {/* Name & Role */}
                                    <div className="flex-1 pb-2">
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            {profileData.firstName} {profileData.lastName}
                                        </h2>
                                        <p className="text-gray-500 flex items-center gap-2 mt-1">
                                            <Shield className="w-4 h-4" />
                                            Verified Guardian
                                        </p>
                                    </div>

                                    {/* Edit Button */}
                                    <div className="pb-2">
                                        {isEditing ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-yellow-600 hover:text-yellow-600 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.phone || 'Not provided'}</p>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Location
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.location}
                                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.location}</p>
                                        )}
                                    </div>

                                    {/* Join Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Member Since
                                        </label>
                                        <p className="text-gray-900">{profileData.joinDate}</p>
                                    </div>
                                </div>

                                {/* Account Info */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Account Type</span>
                                            <span className="text-gray-900 font-medium">Guardian</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status</span>
                                            <span className="text-green-600 font-medium flex items-center gap-1">
                                                <Check className="w-4 h-4" />
                                                Active
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Linked Students</span>
                                            <span className="text-gray-900 font-medium">
                                                {guardianUser?.linkedStudentIds?.length || 0}
                                            </span>
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
