'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Users, UserCheck, Shield, GraduationCap } from 'lucide-react';
import UsersTable from '@/components/umbrella-admin/UsersTable';
import { useUsers } from '@/contexts/UserContext';

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

export default function UmbrellaAdminUsersPage() {
  const [selectedTab, setSelectedTab] = useState<'students' | 'trainers' | 'mentors' | 'admins'>('students');
  const { students, trainers, mentors, fieldAdmins, isLoading } = useUsers();

  const getCurrentData = () => {
    switch (selectedTab) {
      case 'trainers': return trainers;
      case 'mentors': return mentors;
      case 'admins': return fieldAdmins;
      default: return students;
    }
  };

  const totalUsers = students.length + trainers.length + mentors.length + fieldAdmins.length;
  const activeUsers = [...students, ...trainers, ...mentors, ...fieldAdmins].filter(u => u.status === 'active').length;

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
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
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
                        <p className="text-2xl font-bold text-gray-900">{trainers.length + mentors.length + fieldAdmins.length}</p>
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
                { key: 'mentors', label: 'Mentors', count: mentors.length },
                { key: 'admins', label: 'Admins', count: fieldAdmins.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as 'students' | 'trainers' | 'mentors' | 'admins')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${selectedTab === tab.key
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
    </div>
  );
}
