'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Settings, Shield, Bell, Lock, Globe, Building2, DollarSign, Users, Plus, Edit, Trash2 } from 'lucide-react';

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

    const [companies, setCompanies] = useState([
        { id: 1, name: 'TechCorp Inc.', industry: 'Technology', fields: 3, status: 'active' },
        { id: 2, name: 'Creative Solutions Ltd.', industry: 'Design', fields: 2, status: 'active' },
        { id: 3, name: 'Marketing Pro LLC', industry: 'Marketing', fields: 1, status: 'active' },
        { id: 4, name: 'DataTech Solutions', industry: 'Data Science', fields: 2, status: 'active' },
        { id: 5, name: 'Business Excellence Corp.', industry: 'Business', fields: 1, status: 'inactive' }
    ]);

    const [showAddCompany, setShowAddCompany] = useState(false);
    const [newCompany, setNewCompany] = useState({ name: '', industry: '' });

    const handleAddCompany = () => {
        if (newCompany.name && newCompany.industry) {
            setCompanies([...companies, {
                id: companies.length + 1,
                name: newCompany.name,
                industry: newCompany.industry,
                fields: 0,
                status: 'active'
            }]);
            setNewCompany({ name: '', industry: '' });
            setShowAddCompany(false);
        }
    };

    const handleDeleteCompany = (id: number) => {
        setCompanies(companies.filter(c => c.id !== id));
    };

    const handleSaveSettings = () => {
        console.log('Saving system settings:', systemSettings);
        // Handle save logic
    };

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeItem="Settings" userType="umbrella-admin" />

            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                <main className="flex-1 overflow-auto">
                    <div className="p-3 lg:p-6">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-amber-900 mb-1">System Settings</h1>
                            <p className="text-sm text-gray-500">Configure global parameters and manage companies across the platform</p>
                        </div>

                        <div className="space-y-8">
                            {/* Company Management */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-6 h-6 text-gray-500" />
                                        <h3 className="text-lg font-semibold text-amber-900">Company Management</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowAddCompany(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Company
                                    </button>
                                </div>

                                {/* Add Company Form */}
                                {showAddCompany && (
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h4 className="font-medium text-amber-900 mb-4">Add New Company</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={newCompany.name}
                                                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                                    placeholder="e.g. TechCorp Inc."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                                <select
                                                    value={newCompany.industry}
                                                    onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                                >
                                                    <option value="">Select Industry</option>
                                                    <option value="Technology">Technology</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Finance">Finance</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleAddCompany}
                                                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                            >
                                                Add Company
                                            </button>
                                            <button
                                                onClick={() => setShowAddCompany(false)}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Companies Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Industry</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Fields</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {companies.map((company) => (
                                                <tr key={company.id} className="hover:bg-gray-50">
                                                    <td className="py-3 px-4 text-sm font-medium text-amber-900">{company.name}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-600">{company.industry}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-600">{company.fields} fields</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${company.status === 'active'
                                                                ? 'bg-gray-100 text-gray-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {company.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="p-1 text-gray-600 hover:text-gray-800">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCompany(company.id)}
                                                                className="p-1 text-gray-600 hover:text-gray-800"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Platform Settings */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Settings className="w-6 h-6 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-amber-900">Platform Settings</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                                        <input
                                            type="text"
                                            value={systemSettings.platformName}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                                        <select
                                            value={systemSettings.defaultCurrency}
                                            onChange={(e) => setSystemSettings({ ...systemSettings, defaultCurrency: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="w-6 h-6 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-amber-900">Security Settings</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-amber-900">Require Multi-Factor Authentication</div>
                                            <div className="text-sm text-gray-600">Force all users to enable MFA for enhanced security</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.requireMFA}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, requireMFA: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-amber-900">Automatic Backup</div>
                                            <div className="text-sm text-gray-600">Automatically backup system data daily</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.autoBackup}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, autoBackup: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-amber-900">Maintenance Mode</div>
                                            <div className="text-sm text-gray-600">Enable maintenance mode to restrict access during updates</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={systemSettings.maintenanceMode}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pb-8">
                                <button
                                    onClick={handleSaveSettings}
                                    className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
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
