'use client';

import { useState } from 'react';
import {
  X, Mail, Phone, User, CheckCircle, AlertCircle, Save,
} from 'lucide-react';
import { BaseUser, UserRole, Student } from '@/types';

interface EditUserModalProps {
  user: BaseUser;
  onClose: () => void;
  onSave: (data: Partial<BaseUser>) => Promise<void>;
}

// Type guards
const isStudent = (user: BaseUser): user is Student => user.role === UserRole.STUDENT;

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const getAvatarColor = (role: UserRole) => {
  switch (role) {
    case UserRole.STUDENT:
      return 'bg-blue-500';
    case UserRole.TRAINER:
      return 'bg-purple-500';
    case UserRole.ADMIN:
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    isActive: user.isActive,
    isVerified: user.isVerified,
    gender: user.gender || '',
    dateOfBirth: user.dateOfBirth || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await onSave(formData);
    } catch {
      setError('Failed to update user. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (field: 'isActive' | 'isVerified') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(user.role)}`}>
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit User</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+250 788 123 456"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
              >
                <option value="">Not specified</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Toggles */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Account Status</h3>
            
            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  formData.isActive ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {formData.isActive ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Account Active</p>
                  <p className="text-sm text-gray-500">
                    {formData.isActive ? 'User can access the platform' : 'User cannot log in'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('isActive')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    formData.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Verified Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  formData.isVerified ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  {formData.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Verified</p>
                  <p className="text-sm text-gray-500">
                    {formData.isVerified ? 'Email has been verified' : 'Email verification pending'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('isVerified')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  formData.isVerified ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    formData.isVerified ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Current Role (Read-only) */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{user.role}</span>
              <span className="text-xs text-gray-500">Role cannot be changed</span>
            </div>
          </div>

          {/* Student-specific fields */}
          {isStudent(user) && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">
                Student Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Has Paid Orientation</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    (user as Student).hasPaidOrientation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {(user as Student).hasPaidOrientation ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Active Subscription</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    (user as Student).hasActiveSubscription
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {(user as Student).hasActiveSubscription ? 'Yes' : 'No'}
                  </span>
                </div>
                {(user as Student).subscriptionExpiryDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Subscription Expires</span>
                    <span className="text-sm text-blue-900">
                      {new Date((user as Student).subscriptionExpiryDate!).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
