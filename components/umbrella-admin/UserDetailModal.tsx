'use client';

import {
  X, Mail, Phone, Calendar, Shield, GraduationCap, Users,
  CheckCircle, XCircle, AlertCircle, Edit2, Clock, MapPin,
  FileText, Award, BookOpen, CreditCard
} from 'lucide-react';
import { BaseUser, UserRole, Student, Trainer } from '@/types';

interface UserDetailModalProps {
  user: BaseUser;
  onClose: () => void;
  onEdit: () => void;
}

// Type guards
const isStudent = (user: BaseUser): user is Student => user.role === UserRole.STUDENT;
const isTrainer = (user: BaseUser): user is Trainer => user.role === UserRole.TRAINER;

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

const StatusBadge = ({ isActive, isVerified }: { isActive: boolean; isVerified: boolean }) => {
  if (!isActive) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
        <XCircle className="w-4 h-4 mr-1.5" />
        Inactive
      </span>
    );
  }
  if (!isVerified) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-4 h-4 mr-1.5" />
        Pending Verification
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
      <CheckCircle className="w-4 h-4 mr-1.5" />
      Active
    </span>
  );
};

export default function UserDetailModal({ user, onClose, onEdit }: UserDetailModalProps) {
  const student = isStudent(user) ? user : null;
  const trainer = isTrainer(user) ? user : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${getAvatarColor(user.role)}`}>
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge isActive={user.isActive} isVerified={user.isVerified} />
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.role === UserRole.STUDENT ? 'bg-blue-100 text-blue-800' :
                  user.role === UserRole.TRAINER ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.role === UserRole.STUDENT && <GraduationCap className="w-3 h-3 mr-1" />}
                  {user.role === UserRole.TRAINER && <Users className="w-3 h-3 mr-1" />}
                  {user.role === UserRole.ADMIN && <Shield className="w-3 h-3 mr-1" />}
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student-specific Information */}
          {student && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Student Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Subscription Status</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    student.hasActiveSubscription
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.hasActiveSubscription ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {student.subscriptionExpiryDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Subscription Expires</span>
                    <span className="text-sm font-medium text-blue-900">
                      {new Date(student.subscriptionExpiryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Orientation Paid</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    student.hasPaidOrientation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.hasPaidOrientation ? 'Yes' : 'Pending'}
                  </span>
                </div>
                {student.assignedTrainerId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Assigned Trainer</span>
                    <span className="text-sm font-medium text-blue-900">{student.assignedTrainerId}</span>
                  </div>
                )}
                {student.currentRoadmapId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Current Roadmap</span>
                    <span className="text-sm font-medium text-blue-900">{student.currentRoadmapId}</span>
                  </div>
                )}
                {/* Onboarding Checklist */}
                {student.onboardingStatus && (
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-3">Onboarding Progress</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(student.onboardingStatus).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-xs text-blue-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trainer-specific Information */}
          {trainer && (
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Trainer Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-700">Approval Status</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    trainer.approvalStatus === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : trainer.approvalStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {trainer.approvalStatus}
                  </span>
                </div>
                {trainer.experience && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-700">Years of Experience</span>
                      <span className="text-sm font-medium text-purple-900">
                        {trainer.experience.yearsOfExperience} years
                      </span>
                    </div>
                    {trainer.experience.specializations.length > 0 && (
                      <div>
                        <span className="text-sm text-purple-700">Specializations</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {trainer.experience.specializations.map((spec, i) => (
                            <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-lg">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {trainer.skills && trainer.skills.length > 0 && (
                  <div>
                    <span className="text-sm text-purple-700">Skills</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {trainer.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-white text-purple-800 text-xs rounded-lg border border-purple-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {trainer.cvUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-700">CV/Resume</span>
                    <a
                      href={trainer.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-purple-900 hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                )}
                {trainer.introVideoUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-700">Introduction Video</span>
                    <a
                      href={trainer.introVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-purple-900 hover:underline"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Additional Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Gender</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{user.gender || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-sm font-medium text-gray-900">
                  {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Verified</p>
                <p className="text-sm font-medium text-gray-900">{user.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Status</p>
                <p className="text-sm font-medium text-gray-900">{user.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-6 py-2.5 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
}
