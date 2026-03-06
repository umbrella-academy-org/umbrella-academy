'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { Plus, Users, UserCheck, Shield, GraduationCap } from 'lucide-react';
import UsersTable from '@/components/umbrella-admin/UsersTable';

export default function UmbrellaAdminUsersPage() {
  const [selectedTab, setSelectedTab] = useState<'students' | 'trainers' | 'mentors' | 'admins'>('students');

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 234 567 8901',
      address: 'New York, NY',
      dateOfBirth: '1995-03-15',
      rollNumber: 'STU001',
      class: 'Advanced',
      field: 'Programming Field',
      trainer: 'John Smith',
      mentor: 'Mike Wilson',
      status: 'active',
      joinDate: '2024-01-15',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1 234 567 8902',
      address: 'Los Angeles, CA',
      dateOfBirth: '1993-07-22',
      rollNumber: 'STU002',
      class: 'Intermediate',
      field: 'Design Field',
      trainer: 'Sarah Johnson',
      mentor: 'Emily Davis',
      status: 'active',
      joinDate: '2024-01-10',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      phone: '+1 234 567 8903',
      address: 'Chicago, IL',
      dateOfBirth: '1996-11-08',
      rollNumber: 'STU003',
      class: 'Beginner',
      field: 'Marketing Field',
      trainer: 'Mike Wilson',
      mentor: 'David Brown',
      status: 'paused',
      joinDate: '2024-01-05',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const trainers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234 567 8904',
      field: 'Programming Field',
      specialization: 'Full-Stack Development',
      experience: '5 years',
      students: 15,
      capacity: 20,
      status: 'active',
      joinDate: '2023-12-01',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8905',
      field: 'Design Field',
      specialization: 'UI/UX Design',
      experience: '4 years',
      students: 12,
      capacity: 18,
      status: 'active',
      joinDate: '2023-11-15',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1 234 567 8906',
      field: 'Programming Field',
      expertise: 'Software Architecture',
      experience: '8 years',
      students: 25,
      status: 'active',
      joinDate: '2023-10-20',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 234 567 8907',
      field: 'Design Field',
      expertise: 'Design Strategy',
      experience: '6 years',
      students: 20,
      status: 'active',
      joinDate: '2023-09-10',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const admins = [
    {
      id: 1,
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 234 567 8908',
      field: 'Business Field',
      role: 'Field Administrator',
      permissions: 'Field Management',
      status: 'active',
      joinDate: '2023-08-01',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const getCurrentData = () => {
    switch (selectedTab) {
      case 'trainers': return trainers;
      case 'mentors': return mentors;
      case 'admins': return admins;
      default: return students;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      student: 'bg-gray-100 text-gray-800',
      trainer: 'bg-gray-100 text-gray-800',
      mentor: 'bg-gray-100 text-gray-800',
      'field-admin': 'bg-gray-100 text-gray-800',
      'umbrella-admin': 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate summary stats
  const totalUsers = students.length + trainers.length + mentors.length + admins.length;
  const activeUsers = [...students, ...trainers, ...mentors, ...admins].filter(u => u.status === 'active').length;

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
                    <p className="text-2xl font-bold text-gray-900">{trainers.length + mentors.length + admins.length}</p>
                  </div>
                  <Shield className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { key: 'students', label: 'Students', count: students.length },
                { key: 'trainers', label: 'Trainers', count: trainers.length },
                { key: 'mentors', label: 'Mentors', count: mentors.length },
                { key: 'admins', label: 'Admins', count: admins.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${selectedTab === tab.key
                    ? 'border-yellow-600 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label} ({tab.count})
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