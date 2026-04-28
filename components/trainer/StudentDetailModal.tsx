'use client';

import { useMemo } from 'react';
import {
  X, Mail, Phone, Calendar, GraduationCap, CheckCircle, XCircle, AlertCircle,
  Clock, MapPin, FileText, Users, ArrowRight, BookOpen, Wallet
} from 'lucide-react';
import { Student, Roadmap, UserRole } from '@/types';
import { RoadmapStepStatus } from '@/types/roadmap';

interface StudentDetailModalProps {
  student: Student;
  roadmap: Roadmap | undefined;
  onClose: () => void;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

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

export default function StudentDetailModal({ student, roadmap, onClose }: StudentDetailModalProps) {
  // Calculate progress from roadmap milestones
  const progress = useMemo(() => {
    if (!roadmap || !roadmap.milestones || roadmap.milestones.length === 0) return 0;
    const completed = roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
    return Math.round((completed / roadmap.milestones.length) * 100);
  }, [roadmap]);

  // Calculate active/pending milestones
  const milestoneStats = useMemo(() => {
    if (!roadmap || !roadmap.milestones) return { completed: 0, active: 0, pending: 0, total: 0 };
    return {
      completed: roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length,
      active: roadmap.milestones.filter(m => m.status === RoadmapStepStatus.ACTIVE).length,
      pending: roadmap.milestones.filter(m => m.status === RoadmapStepStatus.PENDING_APPROVAL).length,
      total: roadmap.milestones.length
    };
  }, [roadmap]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">
                {getInitials(student.firstName, student.lastName)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{student.firstName} {student.lastName}</h2>
                <p className="text-white/80 text-sm">{student.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge isActive={student.isActive} isVerified={student.isVerified} />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Student
                  </span>
                </div>
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

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{student.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{student.gender || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Subscription Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Active Subscription</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  student.hasActiveSubscription ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {student.hasActiveSubscription ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Orientation Paid</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  student.hasPaidOrientation ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.hasPaidOrientation ? 'Yes' : 'Pending'}
                </span>
              </div>
              {student.subscriptionExpiryDate && (
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-sm text-blue-700">Expires</span>
                  <span className="text-sm font-medium text-blue-900">
                    {new Date(student.subscriptionExpiryDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Roadmap Progress */}
          {roadmap && (
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
              <h3 className="text-sm font-semibold text-yellow-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Roadmap Progress: {roadmap.title}
              </h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-yellow-700">Overall Progress</span>
                  <span className="font-bold text-yellow-900">{progress}%</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Milestone Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{milestoneStats.completed}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{milestoneStats.active}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-600">{milestoneStats.pending}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-gray-400">{milestoneStats.total}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>

              {/* Recent Milestones */}
              {roadmap.milestones && roadmap.milestones.length > 0 && (
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900 mb-3">Milestones</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {roadmap.milestones.slice(0, 5).map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            milestone.status === RoadmapStepStatus.COMPLETED ? 'bg-green-500' :
                            milestone.status === RoadmapStepStatus.ACTIVE ? 'bg-blue-500' :
                            milestone.status === RoadmapStepStatus.PENDING_APPROVAL ? 'bg-yellow-500' :
                            'bg-gray-300'
                          }`} />
                          <span className="text-sm text-gray-700">{milestone.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          milestone.status === RoadmapStepStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                          milestone.status === RoadmapStepStatus.ACTIVE ? 'bg-blue-100 text-blue-800' :
                          milestone.status === RoadmapStepStatus.PENDING_APPROVAL ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Guardians */}
          {student.guardianIds && student.guardianIds.length > 0 && (
            <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
              <h3 className="text-sm font-semibold text-teal-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Linked Guardians
              </h3>
              <p className="text-sm text-teal-700">
                {student.guardianIds.length} guardian(s) linked to this student
              </p>
            </div>
          )}

          {/* Onboarding Checklist */}
          {student.onboardingStatus && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Onboarding Checklist
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(student.onboardingStatus).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      value ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {value ? <CheckCircle className="w-3 h-3" /> : <div className="w-2 h-2 bg-gray-400 rounded-full" />}
                    </div>
                    <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-500'}`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
