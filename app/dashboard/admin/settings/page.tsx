'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Settings, Shield } from 'lucide-react';

export default function UmbrellaAdminSettingsPage() {
    const [systemSettings, setSystemSettings] = useState({
        platformName: 'Umbrella Academy',
        defaultCurrency: 'RWF',
        timezone: 'Africa/Kigali',
        sessionTimeout: 30,
        requireMFA: true,
        autoBackup: true,
        maintenanceMode: false
    });

    const handleSaveSettings = () => {
        console.log('Saving system settings:', systemSettings);
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Settings" userType="admin" />

            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                <main className="flex-1 overflow-auto">
                    <div className="p-3 lg:p-6">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-1">System Settings</h1>
                            <p className="text-sm text-gray-500">Configure global platform parameters and security settings</p>
                        </div>

                        <div className="space-y-8">
                            {/* Platform Settings */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Settings className="w-6 h-6 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-gray-900">Platform Settings</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                                        <input
                                            type="text"
                                            value={systemSettings.platformName}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                                        <select
                                            value={systemSettings.defaultCurrency}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, defaultCurrency: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                        >
                                            <option value="RWF">RWF - Rwandan Franc</option>
                                            <option value="USD">USD - US Dollar</option>
                                            <option value="EUR">EUR - Euro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Timezone</label>
                                        <select
                                            value={systemSettings.timezone}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                        >
                                            <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
                                            <option value="UTC">UTC</option>
                                            <option value="America/New_York">America/New_York (EST)</option>
                                            <option value="Europe/London">Europe/London (GMT)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                        <input
                                            type="number"
                                            value={systemSettings.sessionTimeout}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="w-6 h-6 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">Require Multi-Factor Authentication</div>
                                            <div className="text-sm text-gray-600">Force all users to enable MFA for enhanced security</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.requireMFA}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, requireMFA: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">Automatic Backup</div>
                                            <div className="text-sm text-gray-600">Automatically backup system data daily</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.autoBackup}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, autoBackup: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">Maintenance Mode</div>
                                            <div className="text-sm text-gray-600">Enable maintenance mode to restrict access during updates</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.maintenanceMode}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pb-8">
                                <button
                                    onClick={handleSaveSettings}
                                    className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                                >
                                    Save All Settings
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    Reset to Defaults
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
