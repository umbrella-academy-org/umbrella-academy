'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole, Trainer } from '@/types/user';
import { useAuth, useAdminContext } from '@/contexts';
import { UserCheck, Clock, X, Check, Mail, Calendar, Award, FileText, Eye, AlertCircle } from 'lucide-react';

export default function TrainerApprovalsPage() {
  const { user } = useAuth();
  const { pendingTrainers, trainersLoading, refreshTrainers } = useAdminContext();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleApprove = async (trainerId: string) => {
    setActionLoading(true);
    try {
      // In a real app, this would call an API
      console.log('Approving trainer:', trainerId);
      // await trainerService.approveTrainer(trainerId);
      
      // For now, just close the details modal
      setShowDetails(false);
      setSelectedTrainer(null);
    } catch (error) {
      console.error('Failed to approve trainer:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedTrainer || !rejectionReason.trim()) return;
    
    setActionLoading(true);
    try {
      // In a real app, this would call an API
      console.log('Rejecting trainer:', selectedTrainer._id, 'Reason:', rejectionReason);
      // await trainerService.rejectTrainer(selectedTrainer._id, rejectionReason);
      
      setShowRejectionModal(false);
      setShowDetails(false);
      setSelectedTrainer(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Failed to reject trainer:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const viewTrainerDetails = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (trainersLoading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Trainer Approvals" userType={UserRole.ADMIN} />
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-gray-100 animate-pulse"></div>
          <div className="flex-1 p-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainer Approvals" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trainer Approvals</h1>
              <p className="text-gray-500">Review and approve trainer applications</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {pendingTrainers.length} Pending
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {pendingTrainers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Applications</h3>
              <p className="text-gray-500">All trainer applications have been reviewed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingTrainers.map((trainer) => (
                <div key={trainer._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {trainer.firstName} {trainer.lastName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(trainer.status)}`}>
                          {trainer.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {trainer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {trainer.phoneNumber}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Applied {formatDate(trainer.createdAt)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          {trainer.experience.yearsOfExperience} years experience
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-2">
                          {trainer.experience.specializations.map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Status: {trainer.approvalStatus}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => viewTrainerDetails(trainer)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Trainer Details Modal */}
      {showDetails && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Trainer Application Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {selectedTrainer.firstName} {selectedTrainer.lastName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {selectedTrainer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedTrainer.createdAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      {selectedTrainer.experience.yearsOfExperience} years experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Status: {selectedTrainer.approvalStatus}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Specializations:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedTrainer.experience.specializations.map((spec: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Skills:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedTrainer.skills.map((skill: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {selectedTrainer.introVideoUrl && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <a href={selectedTrainer.introVideoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Introduction Video
                        </a>
                      </div>
                    )}
                    {selectedTrainer.cvUrl && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <a href={selectedTrainer.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View CV/Resume
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedTrainer._id)}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {actionLoading ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => setShowRejectionModal(true)}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    {actionLoading ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reject Application</h3>
                <button
                  onClick={() => setShowRejectionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-medium">Please provide a reason for rejection</p>
                </div>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter reason for rejection..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReject}
                  disabled={!rejectionReason.trim() || actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? 'Processing...' : 'Confirm Rejection'}
                </button>
                <button
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectionReason('');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
