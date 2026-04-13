'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Users, UserCheck, Shield, GraduationCap, X } from 'lucide-react';
import UsersTable from '@/components/umbrella-admin/UsersTable';
import { useUsers } from '@/contexts/UserContext';
import { useAdminContext } from '@/contexts';
import { useUsers as useAdminUsers } from '@/hooks/admin';
import type { UserType } from '@/types';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-12 bg-gray-200 rounded" />
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

const ROLES: { value: UserType; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'trainer', label: 'Trainer' },
  { value: 'company-admin', label: 'Company Admin' },
];

const EMPTY_FORM = { firstName: '', lastName: '', email: '', password: '', role: 'student' as UserType, fieldId: '' };

export default function UmbrellaAdminUsersPage() {
  const [selectedTab, setSelectedTab] = useState<'students' | 'trainers' | 'admins'>('students');
  const { students, trainers, companyAdmins, isLoading } = useUsers();
  const { refreshUsers } = useAdminContext();
  const { createUser, isLoading: creating, error: createError } = useAdminUsers();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const getCurrentData = () => {
    switch (selectedTab) {
      case 'trainers': return trainers;
      case 'admins': return companyAdmins;
      default: return students;
    }
  };

  const totalUsers = students.length + trainers.length + companyAdmins.length;
  const activeUsers = [...students, ...trainers, ...companyAdmins].filter(u => u.status === 'active').length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(false);

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password.trim()) {
      setLocalError('All fields are required');
      return;
    }

    const result = await createUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
      fieldId: form.fieldId || undefined,
    });

    if (result) {
      setSuccess(true);
      setForm(EMPTY_FORM);
      await refreshUsers();
      setTimeout(() => { setShowModal(false); setSuccess(false); }, 1200);
    } else {
      setLocalError(createError ?? 'Failed to create user');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Users" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h1>
                  <p className="text-gray-600">Manage all users across the system</p>
                </div>
                <button
                  onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setLocalError(null); setSuccess(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isLoading ? (
                <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                      </div>
                      <UserCheck className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Students</p>
                        <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                      </div>
                      <GraduationCap className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Staff</p>
                        <p className="text-2xl font-bold text-gray-900">{trainers.length + companyAdmins.length}</p>
                      </div>
                      <Shield className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { key: 'students', label: 'Students', count: students.length },
                { key: 'trainers', label: 'Trainers', count: trainers.length },
                { key: 'admins', label: 'Admins', count: companyAdmins.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.key
                      ? 'border-yellow-600 text-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {isLoading ? tab.label : `${tab.label} (${tab.count})`}
                </button>
              ))}
            </div>

            <UsersTable selectedTab={selectedTab} data={getCurrentData()} />
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                User created successfully!
              </div>
            )}

            {localError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {localError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value as UserType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {ROLES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field ID <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={form.fieldId}
                  onChange={e => setForm({ ...form, fieldId: e.target.value })}
                  placeholder="e.g. software-engineering"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {creating ? 'Creating…' : 'Create User'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
