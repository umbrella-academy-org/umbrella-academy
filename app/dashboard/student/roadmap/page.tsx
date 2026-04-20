'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { roadmapService } from '@/services/roadmap';
import { Milestone, UserRole, RoadmapStepStatus } from '@/types';

export default function StudentRoadmapPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading, getUpcomingLiveSessions, refreshRoadmaps } = useRoadmaps();
  const { navigate } = useNavigationWithLoading();

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectSubmission, setProjectSubmission] = useState({
    description: '',
    evidence: {
      videoDemoLink: '',
      designLink: '',
      fileDownloadLink: ''
    },
    toolsUsed: [] as string[]
  });
  const [completingMilestone, setCompletingMilestone] = useState(false);

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'student') {
      const dashboardRoutes: Record<string, string> = {
        'trainer': '/dashboard/trainer',
        'company-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading || roadmapsLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="w-64 bg-gray-900 animate-pulse"></div>
        <div className="flex-1 p-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'student') {
    return null;
  }

  const activeRoadmap = studentRoadmaps.find(roadmap =>
    roadmap.studentId === user._id && roadmap.status != 'draft'
  );

  const getMilestoneStatusColor = (status: RoadmapStepStatus) => {
    switch (status) {
      case RoadmapStepStatus.COMPLETED:
        return 'bg-green-100 text-green-700 border-green-200';
      case RoadmapStepStatus.ACTIVE:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case RoadmapStepStatus.PENDING_APPROVAL:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case RoadmapStepStatus.LOCKED:
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };



  const handleCompleteMilestone = async (milestone: any, index: number) => {
    setSelectedMilestone(milestone);
    setShowProjectModal(true);
  };

  const handleProjectSubmit = async () => {
    if (!selectedMilestone || !projectSubmission.description.trim() || !activeRoadmap) {
      return;
    }

    setCompletingMilestone(true);
    try {
      // Submit project and complete milestone
      await roadmapService.completeMilestone(activeRoadmap.id, selectedMilestone.order, projectSubmission);

      // Refresh roadmaps to get updated data
      await refreshRoadmaps();

      // Reset form and close modal
      setShowProjectModal(false);
      setSelectedMilestone(null);
      setProjectSubmission({
        description: '',
        evidence: {
          videoDemoLink: '',
          designLink: '',
          fileDownloadLink: ''
        },
        toolsUsed: []
      });
    } catch (error) {
      console.error('Failed to complete milestone:', error);
    } finally {
      setCompletingMilestone(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType={UserRole.STUDENT} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Learning Roadmap</h1>
            <p className="text-gray-600 mt-1">Track your progress and plan your learning journey</p>
          </div>

          {activeRoadmap ? (
            <div className="space-y-6">
              {/* Roadmap Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{activeRoadmap.title}</h2>
                    <p className="text-gray-600 mt-1">Your personalized learning journey</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-gray-500">Status: {activeRoadmap.status}</span>
                      <span className="text-sm text-gray-500">Milestones: {activeRoadmap.milestones.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>


              {/* Roadmap Milestones */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Milestones</h3>
                <div className="space-y-4">
                  {activeRoadmap.milestones?.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getMilestoneStatusColor(milestone.status)}`}>
                              {milestone.status.replace('-', ' ').charAt(0).toUpperCase() + milestone.status.slice(1).replace('-', ' ')}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Duration: {milestone.estimatedDurationDays} days</p>
                        </div>
                        <div className="text-right">
                          {milestone.status === RoadmapStepStatus.ACTIVE && (
                            <button
                              onClick={() => handleCompleteMilestone(milestone, index)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Complete Milestone
                            </button>
                          )}
                          {milestone.status === RoadmapStepStatus.PENDING_APPROVAL && (
                            <div className="text-sm text-yellow-600 font-medium">
                              Awaiting Trainer Approval
                            </div>
                          )}
                        </div>
                      </div>
                      {milestone.skillsToLearn && milestone.skillsToLearn.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Skills to Learn:</p>
                          <div className="flex flex-wrap gap-1">
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
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Roadmap</h3>
              <p className="text-gray-600 mb-4">Create your learning roadmap to get started</p>
              <button
                onClick={() => navigate('/dashboard/student/roadmap/create')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Create Roadmap
              </button>
            </div>
          )}
        </main>
      </div>
      {/* Project Submission Modal */}
      {showProjectModal && selectedMilestone && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowProjectModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Complete Milestone: {selectedMilestone.title}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={projectSubmission.description}
                  onChange={(e) => setProjectSubmission({ ...projectSubmission, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Describe your project and what you learned"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tools Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={projectSubmission.toolsUsed.join(', ')}
                  onChange={(e) => setProjectSubmission({ ...projectSubmission, toolsUsed: e.target.value.split(',').map(tool => tool.trim()).filter(tool => tool) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="React Native, Firebase, Redux, Expo"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Project Evidence
                </label>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Video Demo Link
                  </label>
                  <input
                    type="url"
                    value={projectSubmission.evidence.videoDemoLink}
                    onChange={(e) => setProjectSubmission({
                      ...projectSubmission,
                      evidence: { ...projectSubmission.evidence, videoDemoLink: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="https://youtu.be/mobile-demo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Design Link (Figma, Adobe XD)
                  </label>
                  <input
                    type="url"
                    value={projectSubmission.evidence.designLink}
                    onChange={(e) => setProjectSubmission({
                      ...projectSubmission,
                      evidence: { ...projectSubmission.evidence, designLink: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="https://figma.com/file/mobile-design"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    File Download Link
                  </label>
                  <input
                    type="url"
                    value={projectSubmission.evidence.fileDownloadLink}
                    onChange={(e) => setProjectSubmission({
                      ...projectSubmission,
                      evidence: { ...projectSubmission.evidence, fileDownloadLink: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="https://drive.google.com/file/mobile-apk"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowProjectModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleProjectSubmit}
                disabled={completingMilestone || !projectSubmission.description.trim()}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {completingMilestone ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


  );
}


