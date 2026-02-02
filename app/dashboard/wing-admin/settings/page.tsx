'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Building2, Users, DollarSign, Settings, Bell, Shield } from 'lucide-react';

export default function WingAdminSettingsPage() {
  const [selectedCompany, setSelectedCompany] = useState('techcorp-inc');
  const [wingSettings, setWingSettings] = useState({
    wingName: 'Programming Wing',
    wingCode: 'PROG-001',
    maxStudentsPerTrainer: 25,
    minHoursPerWeek: 4.5,
    wingSharePercentage: 35,
    bankAccount: '****-****-****-1234',
    autoApproveTrainers: false,
    requireMentorApproval: true,
    enableNotifications: true
  });

  const companies = [
    { id: 'techcorp-inc', name: 'TechCorp Inc.', industry: 'Technology' },
    { id: 'creative-solutions', name: 'Creative Solutions Ltd.', industry: 'Design' },
    { id: 'marketing-pro', name: 'Marketing Pro LLC', industry: 'Marketing' },
    { id: 'datatech-solutions', name: 'DataTech Solutions', industry: 'Data Science' },
    { id: 'business-excellence', name: 'Business Excellence Corp.', industry: 'Business' }
  ];

  const handleSaveSettings = () => {
    console.log('Saving wing settings:', wingSettings);
    // Handle save logic
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Settings" userType="wing-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Wing Settings</h1>
              <p className="text-sm text-gray-500">Configure wing preferences, policies, and company association</p>
            </div>

            <div className="space-y-8">
              {/* Company Association */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Company Association</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Company</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {companies.map((company) => (
                        <div
                          key={company.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedCompany === company.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedCompany(company.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedCompany === company.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedCompany === company.id && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{company.name}</div>
                              <div className="text-sm text-gray-500">{company.industry}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Wing Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Wing Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wing Name</label>
                    <input
                      type="text"
                      value={wingSettings.wingName}
                      onChange={(e) => setWingSettings({...wingSettings, wingName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wing Code</label>
                    <input
                      type="text"
                      value={wingSettings.wingCode}
                      onChange={(e) => setWingSettings({...wingSettings, wingCode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Capacity & Training Settings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Students per Trainer</label>
                    <input
                      type="number"
                      value={wingSettings.maxStudentsPerTrainer}
                      onChange={(e) => setWingSettings({...wingSettings, maxStudentsPerTrainer: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Hours per Week</label>
                    <input
                      type="number"
                      value={wingSettings.minHoursPerWeek}
                      onChange={(e) => setWingSettings({...wingSettings, minHoursPerWeek: parseFloat(e.target.value)})}
                      step="0.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wing Revenue Share</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={wingSettings.wingSharePercentage}
                        onChange={(e) => setWingSettings({...wingSettings, wingSharePercentage: parseInt(e.target.value)})}
                        className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      />
                      <span className="text-gray-600">% of total revenue</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                    <input
                      type="text"
                      value={wingSettings.bankAccount}
                      onChange={(e) => setWingSettings({...wingSettings, bankAccount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Approval & Notification Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Approval & Notification Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Auto-approve Trainers</div>
                      <div className="text-sm text-gray-600">Automatically approve trainer applications without manual review</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wingSettings.autoApproveTrainers}
                        onChange={(e) => setWingSettings({...wingSettings, autoApproveTrainers: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Require Mentor Approval</div>
                      <div className="text-sm text-gray-600">Require mentor approval for roadmap changes and trainer decisions</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wingSettings.requireMentorApproval}
                        onChange={(e) => setWingSettings({...wingSettings, requireMentorApproval: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Enable Notifications</div>
                      <div className="text-sm text-gray-600">Receive email and in-app notifications for wing activities</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wingSettings.enableNotifications}
                        onChange={(e) => setWingSettings({...wingSettings, enableNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
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
                  Save Changes
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}