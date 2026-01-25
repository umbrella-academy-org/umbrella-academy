'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Settings, Shield, Bell, Lock, Globe } from 'lucide-react';

export default function UmbrellaAdminSettingsPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Settings" userType="umbrella-admin" />

            <div className="flex-1 flex flex-col min-w-0">
                <Header breadcrumb="Settings" userType="umbrella-admin" />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">System Settings</h1>
                            <p className="text-gray-500">Configure global parameters and security protocols for the entire Umbrella Academy platform.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Security Protocols</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-500">Global MFA requirement and session timeout configurations are managed here.</p>
                                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium">Manage Protocols</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Global Localization</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-500">Default currencies (RWF, USD) and timezones for all academy operations.</p>
                                    <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-medium">Configure Localization</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
