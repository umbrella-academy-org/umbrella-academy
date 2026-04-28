'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import {
  Plus, Users, UserCheck, Shield, GraduationCap, X, Search,
  Mail, Phone, Calendar, MoreVertical, Eye, Edit2, Trash2,
  CheckCircle, XCircle, AlertCircle, Filter, Download, UserCircle
} from 'lucide-react';
import { useAdminContext } from '@/contexts';
import { useAdmin } from '@/hooks/useAdmin';
import { BaseUser, UserRole, Student, Trainer } from '@/types';
import UserDetailModal from '@/components/umbrella-admin/UserDetailModal';
import EditUserModal from '@/components/umbrella-admin/EditUserModal';

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: UserRole.STUDENT, label: 'Student' },
  { value: UserRole.TRAINER, label: 'Trainer' },
  { value: UserRole.ADMIN, label: 'Admin' },
];

const EMPTY_FORM: CreateUserForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: UserRole.STUDENT,
  phoneNumber: ''
};

// Get initials from first and last name
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Get avatar color based on role
const getAvatarColor = (role: UserRole) => {
  switch (role) {
    case UserRole.STUDENT:
      return 'bg-blue-500';
    case UserRole.TRAINER:
      return 'bg-purple-500';
    case UserRole.GUARDIAN:
      return 'bg-teal-500';
    case UserRole.ADMIN:
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Status badge component
const StatusBadge = ({ isActive, isVerified }: { isActive: boolean; isVerified: boolean }) => {
  if (!isActive) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
  }
  if (!isVerified) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-3 h-3 mr-1" />
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <CheckCircle className="w-3 h-3 mr-1" />
      Active
    </span>
  );
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export default function UmbrellaAdminUsersPage() {
  const [selectedTab, setSelectedTab] = useState<'students' | 'trainers' | 'guardians' | 'admins'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const { users, trainers, usersLoading, refreshUsers } = useAdminContext();
  const { createUser, updateUser, deleteUser, updateUserStatus, isLoading: processing } = useAdmin();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BaseUser | null>(null);

  const [form, setForm] = useState<CreateUserForm>(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Filter users based on tab, search, and status
  const getFilteredUsers = () => {
    let filtered = users;

    // Filter by role/tab
    switch (selectedTab) {
      case 'students':
        filtered = users.filter(u => u.role === UserRole.STUDENT);
        break;
      case 'trainers':
        filtered = users.filter(u => u.role === UserRole.TRAINER);
        break;
      case 'guardians':
        filtered = users.filter(u => u.role === UserRole.GUARDIAN);
        break;
      case 'admins':
        filtered = users.filter(u => u.role === UserRole.ADMIN);
        break;
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(u =>
        u.firstName.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.phoneNumber?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(u => {
        if (statusFilter === 'active') return u.isActive && u.isVerified;
        if (statusFilter === 'inactive') return !u.isActive;
        if (statusFilter === 'pending') return u.isActive && !u.isVerified;
        return true;
      });
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive && u.isVerified).length;
  const pendingUsers = users.filter(u => u.isActive && !u.isVerified).length;
  const inactiveUsers = users.filter(u => !u.isActive).length;

  // Derive students and guardians from users array
  const students = users.filter(u => u.role === UserRole.STUDENT);
  const guardians = users.filter(u => u.role === UserRole.GUARDIAN);

  const handleCreateSubmit = async (e: React.FormEvent) => {
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
    });

    if (result) {
      setSuccess(true);
      setForm(EMPTY_FORM);
      await refreshUsers();
      setTimeout(() => { setShowCreateModal(false); setSuccess(false); }, 1200);
    } else {
      setLocalError('Failed to create user');
    }
  };

  const handleViewUser = (user: BaseUser) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleEditUser = (user: BaseUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    await deleteUser(userId);
    await refreshUsers();
  };

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'inactive') => {
    await updateUserStatus(userId, newStatus);
    await refreshUsers();
  };

  const tabs = [
    { key: 'students', label: 'Students', count: students.length, icon: GraduationCap, color: 'blue' },
    { key: 'trainers', label: 'Trainers', count: trainers.length, icon: Users, color: 'purple' },
    { key: 'guardians', label: 'Guardians', count: guardians.length, icon: UserCircle, color: 'teal' },
    { key: 'admins', label: 'Admins', count: users.filter(u => u.role === UserRole.ADMIN).length, icon: Shield, color: 'red' },
  ] as const;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Users" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage all users across the platform</p>
              </div>
              <button
                onClick={() => { setShowCreateModal(true); setForm(EMPTY_FORM); setLocalError(null); setSuccess(false); }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Add New User
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {usersLoading ? (
                <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
              ) : (
                <>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active</p>
                        <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingUsers}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Inactive</p>
                        <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending Verification</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Export Button */}
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {/* Active Filters */}
              {(searchQuery || statusFilter !== 'all') && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-gray-900">×</button>
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      Status: {statusFilter}
                      <button onClick={() => setStatusFilter('all')} className="hover:text-gray-900">×</button>
                    </span>
                  )}
                  <button
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {usersLoading ? (
                <div className="p-8 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(user.role)}`}>
                                {getInitials(user.firstName, user.lastName)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {user.phoneNumber || 'Not provided'}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === UserRole.STUDENT ? 'bg-blue-100 text-blue-800' :
                              user.role === UserRole.TRAINER ? 'bg-purple-100 text-purple-800' :
                              user.role === UserRole.GUARDIAN ? 'bg-teal-100 text-teal-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <StatusBadge isActive={user.isActive} isVerified={user.isVerified} />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Edit User"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete User"
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
              )}
            </div>

            {/* Results Count */}
            {!usersLoading && filteredUsers.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
                <p className="text-sm text-gray-500 mt-1">Create a new user account</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700 font-medium">User created successfully!</p>
              </div>
            )}

            {localError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700">{localError}</p>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                    placeholder="+250 788 123 456"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value as UserRole })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                >
                  {ROLES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Creating...' : 'Create User'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setShowDetailModal(false)}
          onEdit={() => { setShowDetailModal(false); setShowEditModal(true); }}
        />
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={async (updatedData) => {
            await updateUser(selectedUser._id, updatedData);
            await refreshUsers();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
