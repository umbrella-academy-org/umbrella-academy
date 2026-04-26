'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types/user';
import { Roadmap, RoadmapStatus } from '@/types/roadmap';
import { useAuth, useAdminContext } from '@/contexts';
import { adminService } from '@/services/admin';
import { MapPin, Clock, X, Check, Mail, Calendar, Award, FileText, Eye, AlertCircle, User } from 'lucide-react';

export default function RoadmapApprovalsPage() {
  const { user } = useAuth();
  const { refreshTrainers } = useAdminContext();
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load pending roadmaps on component mount
  useEffect(() => {
    loadPendingRoadmaps();
  },[]);

  const loadPendingRoadmaps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminService.getPendingRoadmaps();
      setRoadmaps(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roadmaps');
      setRoadmaps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (roadmapId: string) => {
    setActionLoading(true);
    try {
      // Call admin service to approve roadmap
      await adminService.approveRoadmap(roadmapId, user?._id || 'admin');
      
      // Refresh roadmaps list to get updated data
      await loadPendingRoadmaps();
      
      // Close details modal
      setShowDetails(false);
      setSelectedRoadmap(null);
    } catch (error) {
      console.error('Failed to approve roadmap:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRoadmap || !rejectionReason.trim()) return;
    
    setActionLoading(true);
    try {
      // Call admin service to reject roadmap
      await adminService.rejectRoadmap(selectedRoadmap.id, rejectionReason);
      
      // Refresh roadmaps list to get updated data
      await loadPendingRoadmaps();
      
      setShowRejectionModal(false);
      setShowDetails(false);
      setSelectedRoadmap(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Failed to reject roadmap:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const viewRoadmapDetails = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setShowDetails(true);
  };

  const getStatusColor = (status: RoadmapStatus) => {
    switch (status) {
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
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

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmap Approvals" userType={UserRole.ADMIN} />
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Roadmap Approvals" userType={UserRole.ADMIN} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Roadmap Approvals ({roadmaps.length})</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {roadmaps.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Roadmap Approvals</h3>
                <p className="text-sm text-gray-600">All roadmaps have been reviewed. Check back later for new submissions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{roadmap.title}</p>
                        <p className="text-xs text-gray-500">Roadmap ID: {roadmap.id}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(roadmap.status)}`}>
                        {roadmap.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        Student: {roadmap.studentId.firstName} {roadmap.studentId.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        Trainer: {roadmap.trainerId.firstName} {roadmap.trainerId.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Created {formatDate(roadmap.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {roadmap.milestones.length} milestones
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Milestones:</p>
                      <div className="space-y-2">
                        {roadmap.milestones.slice(0, 3).map((milestone, index) => (
                          <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                            <p className="font-medium text-gray-700">{milestone.title}</p>
                            <p className="text-gray-600">{milestone.estimatedDurationDays} days</p>
                          </div>
                        ))}
                        {roadmap.milestones.length > 3 && (
                          <p className="text-xs text-gray-500">+{roadmap.milestones.length - 3} more milestones</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => viewRoadmapDetails(roadmap)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Roadmap Details Modal */}
      {showDetails && selectedRoadmap && (
        <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDetails(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Roadmap Details</h2>
            
            <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {selectedRoadmap.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      Student: {selectedRoadmap.studentId.firstName} {selectedRoadmap.studentId.lastName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      Trainer: {selectedRoadmap.trainerId.firstName} {selectedRoadmap.trainerId.lastName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedRoadmap.createdAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Status: {selectedRoadmap.status}
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Milestones</h4>
                  <div className="space-y-3">
                    {selectedRoadmap.milestones.map((milestone, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                          <span className={`px-2 py-1 text-xs rounded-full ${milestone.status === 'completed' ? 'bg-green-100 text-green-700' : milestone.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                            {milestone.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Duration:</p>
                            <p className="text-gray-600">{milestone.estimatedDurationDays} days</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Tasks:</p>
                            <p className="text-gray-600">{milestone.tasks.length} tasks</p>
                          </div>
                        </div>
                        {milestone.skillsToLearn.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-gray-700 mb-1">Skills to Learn:</p>
                            <div className="flex flex-wrap gap-2">
                              {milestone.skillsToLearn.map((skill, skillIndex) => (
                                <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedRoadmap.id)}
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
            
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowRejectionModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reject Roadmap</h2>
            <p className="text-gray-600 mb-4">Please provide a reason for rejecting this roadmap.</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Incomplete milestones, unclear objectives, insufficient detail, etc."
            ></textarea>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => selectedRoadmap && handleReject()}
                disabled={actionLoading || !rejectionReason}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {actionLoading ? 'Processing...' : 'Reject Roadmap'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
