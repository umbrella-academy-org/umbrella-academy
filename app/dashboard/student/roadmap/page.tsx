'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { roadmapService } from '@/services/roadmap';
import { Milestone, UserRole, RoadmapStepStatus, Roadmap, RoadmapStatus } from '@/types';
import { Map, Clock, CheckCircle, Lock, PlayCircle, PauseCircle, XCircle, Calendar, Target, BookOpen, ChevronRight, X } from 'lucide-react';

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
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

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
  }, [authLoading, isAuthenticated, user]);

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

  const getRoadmapStatusIcon = (status: RoadmapStatus) => {
    switch (status) {
      case 'active':
        return <PlayCircle className="w-5 h-5 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'paused':
        return <PauseCircle className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending-approval':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRoadmapStatusColor = (status: RoadmapStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'completed':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'paused':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'rejected':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'pending-approval':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const calculateRoadmapProgress = (roadmap: Roadmap) => {
    if (!roadmap.milestones || roadmap.milestones.length === 0) return 0;
    const completed = roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
    return Math.round((completed / roadmap.milestones.length) * 100);
  };

  const handleRoadmapClick = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedRoadmap(null);
    setViewMode('list');
  };



  const handleCompleteMilestone = async (milestone: any, index: number) => {
    setSelectedMilestone(milestone);
    setShowProjectModal(true);
  };

  const handleProjectSubmit = async () => {
    if (!selectedMilestone || !projectSubmission.description.trim() || !selectedRoadmap) {
      return;
    }

    setCompletingMilestone(true);
    try {
      // Submit project and complete milestone
      await roadmapService.completeMilestone(selectedRoadmap.id, selectedMilestone.order, projectSubmission);

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
          {viewMode === 'list' ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">My Learning Roadmaps</h1>
                <p className="text-gray-600 mt-1">View all your learning journeys and their progress</p>
              </div>

              {studentRoadmaps && studentRoadmaps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studentRoadmaps.map((roadmap) => {
                    const progress = calculateRoadmapProgress(roadmap);
                    const completedMilestones = roadmap.milestones?.filter(m => m.status === RoadmapStepStatus.COMPLETED).length || 0;
                    const totalMilestones = roadmap.milestones?.length || 0;
                    const totalDays = roadmap.milestones?.reduce((sum, m) => sum + m.estimatedDurationDays, 0) || 0;

                    return (
                      <div
                        key={roadmap.id}
                        onClick={() => handleRoadmapClick(roadmap)}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-yellow-300 transition-all cursor-pointer group"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${getRoadmapStatusColor(roadmap.status)}`}>
                            <Map className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-2">
                            {getRoadmapStatusIcon(roadmap.status)}
                            <span className="text-sm font-medium capitalize">{roadmap.status.replace('-', ' ')}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                          {roadmap.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          Click to view full roadmap details and milestones
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="text-lg font-semibold text-gray-900">{totalMilestones}</div>
                            <div className="text-xs text-gray-500">Milestones</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="text-lg font-semibold text-green-600">{completedMilestones}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="text-lg font-semibold text-gray-900">{totalDays}</div>
                            <div className="text-xs text-gray-500">Days</div>
                          </div>
                        </div>

                        {/* View Details Link */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-yellow-600">
                          <span className="text-sm font-medium">View Details</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Map className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Roadmaps Yet</h3>
                  <p className="text-gray-600 mb-4">Create your first learning roadmap to get started</p>
                  <button
                    onClick={() => navigate('/dashboard/student/roadmap/create')}
                    className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Create Roadmap
                  </button>
                </div>
              )}
            </>
          ) : selectedRoadmap && (
            <>
              {/* Detail View */}
              <div className="mb-6">
                <button
                  onClick={handleBackToList}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Roadmaps
                </button>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{selectedRoadmap.title}</h1>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoadmapStatusColor(selectedRoadmap.status)}`}>
                        {selectedRoadmap.status.replace('-', ' ').charAt(0).toUpperCase() + selectedRoadmap.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedRoadmap.milestones?.length || 0} milestones
                      </span>
                      <span className="text-sm text-gray-500">
                        Created {new Date(selectedRoadmap.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {selectedRoadmap.status === 'active' && (
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Roadmap Progress</h2>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Completion</span>
                      <span className="font-medium text-gray-900">{calculateRoadmapProgress(selectedRoadmap)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateRoadmapProgress(selectedRoadmap)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.COMPLETED).length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.ACTIVE).length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.LOCKED).length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Locked</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones Detail */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h2>
                <div className="space-y-6">
                  {selectedRoadmap.milestones?.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-yellow-300 transition-colors">
                      {/* Milestone Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            milestone.status === RoadmapStepStatus.COMPLETED ? 'bg-green-100' :
                            milestone.status === RoadmapStepStatus.ACTIVE ? 'bg-blue-100' :
                            milestone.status === RoadmapStepStatus.PENDING_APPROVAL ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <Target className={`w-5 h-5 ${
                              milestone.status === RoadmapStepStatus.COMPLETED ? 'text-green-600' :
                              milestone.status === RoadmapStepStatus.ACTIVE ? 'text-blue-600' :
                              milestone.status === RoadmapStepStatus.PENDING_APPROVAL ? 'text-yellow-600' :
                              'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMilestoneStatusColor(milestone.status)}`}>
                                {milestone.status.replace('-', ' ').charAt(0).toUpperCase() + milestone.status.slice(1).replace('-', ' ')}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {milestone.estimatedDurationDays} days
                              </span>
                              {milestone.completedAt && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  Completed {new Date(milestone.completedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {milestone.status === RoadmapStepStatus.ACTIVE && (
                          <button
                            onClick={() => handleCompleteMilestone(milestone, index)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                          >
                            Complete Milestone
                          </button>
                        )}
                        {milestone.status === RoadmapStepStatus.PENDING_APPROVAL && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-lg">
                            Awaiting Approval
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>

                      {/* Skills to Learn */}
                      {milestone.skillsToLearn && milestone.skillsToLearn.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Skills to Learn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skillsToLearn.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tasks */}
                      {milestone.tasks && milestone.tasks.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Tasks</h4>
                          <ul className="space-y-1">
                            {milestone.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Required Projects */}
                      {milestone.requiredProjects && milestone.requiredProjects.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Required Projects</h4>
                          <div className="space-y-2">
                            {milestone.requiredProjects.map((project, projectIndex) => (
                              <div key={projectIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Target className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trainer Feedback */}
                      {milestone.trainerFeedback && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 mb-1">Trainer Feedback</h4>
                          <p className="text-sm text-blue-700">{milestone.trainerFeedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
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


