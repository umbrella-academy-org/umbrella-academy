'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';

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
      wing: 'Programming Wing',
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
      wing: 'Design Wing',
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
      wing: 'Marketing Wing',
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
      wing: 'Programming Wing',
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
      wing: 'Design Wing',
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
      wing: 'Programming Wing',
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
      wing: 'Design Wing',
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
      wing: 'Business Wing',
      role: 'Wing Administrator',
      permissions: 'Wing Management',
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
      student: 'bg-blue-100 text-blue-800',
      trainer: 'bg-green-100 text-green-800',
      mentor: 'bg-purple-100 text-purple-800',
      'wing-admin': 'bg-yellow-100 text-yellow-800',
      'umbrella-admin': 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Users" userType="umbrella-admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header breadcrumb="Users" />
        
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
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.key
                      ? 'border-yellow-600 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {selectedTab === 'students' && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wing</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </>
                      )}
                      {selectedTab === 'trainers' && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wing</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </>
                      )}
                      {selectedTab === 'mentors' && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wing</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </>
                      )}
                      {selectedTab === 'admins' && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administrator</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wing</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getCurrentData().map((user: any) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={user.avatar} 
                              alt={user.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        
                        {selectedTab === 'students' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.rollNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.phone}</div>
                              <div className="text-sm text-gray-500">{user.address}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.wing}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.trainer}
                            </td>
                          </>
                        )}
                        
                        {selectedTab === 'trainers' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.wing}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.specialization}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.students}/{user.capacity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.experience}
                            </td>
                          </>
                        )}
                        
                        {selectedTab === 'mentors' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.wing}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.expertise}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.students}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.experience}
                            </td>
                          </>
                        )}
                        
                        {selectedTab === 'admins' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.wing}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.permissions}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.joinDate}
                            </td>
                          </>
                        )}
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
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
          </div>
        </main>
      </div>
    </div>
  );
}