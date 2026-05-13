'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { roadmapService } from '@/services/roadmap';
import { Milestone, UserRole, RoadmapStepStatus, Roadmap, RoadmapStatus } from '@/types';
import { Map, Clock, CheckCircle, Lock, PlayCircle, PauseCircle, XCircle, Target, BookOpen, ChevronRight, X, Link2, FileText, Image as ImageIcon, FilePlus, ExternalLink, Youtube, Figma, Github, Code, Tag, Briefcase, Layers, Plus, Trash2 } from 'lucide-react';

export default function StudentRoadmapPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { studentRoadmaps, isLoading: roadmapsLoading, refreshRoadmaps } = useRoadmaps();
  const { navigate } = useNavigationWithLoading();

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectSubmission, setProjectSubmission] = useState({
    title: '',
    description: '',
    category: '',
    studentRole: '',
    toolsUsed: [] as string[],
    evidence: {
      demoLink: '',
      videoDemoLink: '',
      designLink: '',
      documentationLink: '',
      fileDownloadLink: '',
      externalLink: ''
    },
    attachments: {
      images: [] as string[],
      pdfs: [] as string[]
    }
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
      <div className="flex min-h-screen lg:h-screen bg-white">
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
        return 'bg-primary/10 text-primary border-primary/20';
      case RoadmapStepStatus.PENDING_APPROVAL:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case RoadmapStepStatus.LOCKED:
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
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



  const handleCompleteMilestone = async (milestone: Milestone, index: number) => {
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
        title: '',
        description: '',
        category: '',
        studentRole: '',
        toolsUsed: [],
        evidence: {
          demoLink: '',
          videoDemoLink: '',
          designLink: '',
          documentationLink: '',
          fileDownloadLink: '',
          externalLink: ''
        },
        attachments: {
          images: [],
          pdfs: []
        }
      });
    } catch (error) {
      console.error('Failed to complete milestone:', error);
    } finally {
      setCompletingMilestone(false);
    }
  };

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#FDF9F2]">
      <Sidebar activeItem="Roadmap" userType={UserRole.STUDENT} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          {viewMode === 'list' ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-playfair font-semibold text-slate-900">My Learning Roadmaps</h1>
                <p className="text-slate-500 font-light mt-1">View all your learning journeys and their progress</p>
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
                        className="bg-white border border-slate-100 rounded-[32px] p-6 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl ${getRoadmapStatusColor(roadmap.status)}`}>
                            <Map className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-2">
                            {getRoadmapStatusIcon(roadmap.status)}
                            <span className="text-sm font-medium capitalize text-slate-600">{roadmap.status.replace('-', ' ')}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                          {roadmap.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-light mb-4 line-clamp-2">
                          Click to view full roadmap details and milestones
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium text-slate-900">{progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-slate-50 rounded-xl p-2">
                            <div className="text-lg font-playfair font-semibold text-slate-900">{totalMilestones}</div>
                            <div className="text-xs text-slate-500">Milestones</div>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-2">
                            <div className="text-lg font-playfair font-semibold text-green-600">{completedMilestones}</div>
                            <div className="text-xs text-slate-500">Completed</div>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-2">
                            <div className="text-lg font-playfair font-semibold text-slate-900">{totalDays}</div>
                            <div className="text-xs text-slate-500">Days</div>
                          </div>
                        </div>

                        {/* View Details Link */}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-primary">
                          <span className="text-sm font-medium">View Details</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Map className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-slate-900 mb-2">No Roadmaps Yet</h3>
                  <p className="text-slate-500 font-light mb-4">Tell your trainer to create your learning roadmap to get started</p>
                </div>
              )}
            </>
          ) : selectedRoadmap && (
            <>
              {/* Header with Back Button */}
              <div className="mb-8">
                <button
                  onClick={handleBackToList}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to Roadmaps
                </button>
              </div>

              {/* Hero Section */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-8 mb-8 text-white shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/30`}>
                        {selectedRoadmap.status.replace('-', ' ').charAt(0).toUpperCase() + selectedRoadmap.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className="text-sm text-white/80">
                        {selectedRoadmap.milestones?.length || 0} milestones
                      </span>
                    </div>
                    <h1 className="text-3xl font-playfair font-semibold mb-2">{selectedRoadmap.title}</h1>
                    <p className="text-white/90 text-lg font-light">Your personalized learning journey</p>
                  </div>
                  {selectedRoadmap.status === 'active' && (
                    <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg">
                      Continue Learning
                    </button>
                  )}
                </div>

                {/* Progress Bar in Hero */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">Overall Progress</span>
                    <span className="font-semibold">{calculateRoadmapProgress(selectedRoadmap)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${calculateRoadmapProgress(selectedRoadmap)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-playfair font-semibold text-slate-900">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.COMPLETED).length || 0}
                      </div>
                      <div className="text-xs text-slate-500">Completed</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-playfair font-semibold text-slate-900">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.ACTIVE).length || 0}
                      </div>
                      <div className="text-xs text-slate-500">Active</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-playfair font-semibold text-slate-900">
                        {selectedRoadmap.milestones?.filter(m => m.status === RoadmapStepStatus.LOCKED).length || 0}
                      </div>
                      <div className="text-xs text-slate-500">Locked</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-playfair font-semibold text-slate-900">
                        {selectedRoadmap.milestones?.reduce((sum, m) => sum + m.estimatedDurationDays, 0) || 0}
                      </div>
                      <div className="text-xs text-slate-500">Total Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Milestones */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6">
                <h2 className="text-xl font-playfair font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Learning Milestones
                </h2>
                <div className="space-y-0">
                  {selectedRoadmap.milestones?.map((milestone, index) => {
                    const isLast = index === (selectedRoadmap.milestones?.length || 0) - 1;
                    const isActive = milestone.status === RoadmapStepStatus.ACTIVE;
                    const isCompleted = milestone.status === RoadmapStepStatus.COMPLETED;
                    const isPending = milestone.status === RoadmapStepStatus.PENDING_APPROVAL;

                    return (
                      <div key={index} className="relative flex gap-4">
                        {/* Timeline Line */}
                        {!isLast && (
                          <div className="absolute left-5 top-12 w-0.5 h-full bg-slate-200"
                            style={{
                              background: isCompleted ? 'linear-gradient(to bottom, #22c55e, #e5e7eb)' :
                                isActive ? 'linear-gradient(to bottom, #3b82f6, #e5e7eb)' : '#e5e7eb'
                            }}
                          />
                        )}

                        {/* Status Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${isCompleted ? 'bg-green-500 border-green-100' :
                              isActive ? 'bg-primary border-primary/20' :
                                isPending ? 'bg-yellow-500 border-yellow-100' :
                                  'bg-slate-300 border-slate-100'
                            }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : isActive ? (
                              <PlayCircle className="w-5 h-5 text-white" />
                            ) : isPending ? (
                              <Clock className="w-5 h-5 text-white" />
                            ) : (
                              <Lock className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className={`flex-1 pb-8 ${isLast ? '' : ''}`}>
                          <div className={`rounded-[32px] p-5 border transition-all ${isActive ? 'bg-primary/5 border-primary/20 shadow-md' :
                              isCompleted ? 'bg-green-50/30 border-green-100' :
                                isPending ? 'bg-yellow-50/30 border-yellow-100' :
                                  'bg-slate-50 border-slate-100'
                            }`}>
                            {/* Header Row */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-playfair font-semibold text-slate-900 text-lg">{milestone.title}</h3>
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                                    {milestone.status.replace('-', ' ').charAt(0).toUpperCase() + milestone.status.slice(1).replace('-', ' ')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {milestone.estimatedDurationDays} days
                                  </span>
                                  {milestone.completedAt && (
                                    <span className="flex items-center gap-1 text-green-600">
                                      <CheckCircle className="w-4 h-4" />
                                      {new Date(milestone.completedAt).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Action Button */}
                              {isActive && (
                                <button
                                  onClick={() => handleCompleteMilestone(milestone, index)}
                                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors shadow-sm"
                                >
                                  Complete
                                </button>
                              )}
                              {isPending && (
                                <span className="px-3 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                                  Awaiting Approval
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-slate-600 font-light mb-4 leading-relaxed">{milestone.description}</p>

                            {/* Two Column Layout for Skills & Tasks */}
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Skills */}
                              {milestone.skillsToLearn && milestone.skillsToLearn.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    Skills to Learn
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {milestone.skillsToLearn.map((skill, i) => (
                                      <span key={i} className="px-2.5 py-1 bg-primary/10 text-primary rounded-xl text-xs font-medium border border-primary/20">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tasks */}
                              {milestone.tasks && milestone.tasks.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-primary" />
                                    Tasks
                                  </h4>
                                  <ul className="space-y-1">
                                    {milestone.tasks.slice(0, 3).map((task, i) => (
                                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 flex-shrink-0" />
                                        <span className="line-clamp-1">{task}</span>
                                      </li>
                                    ))}
                                    {milestone.tasks.length > 3 && (
                                      <li className="text-xs text-slate-400 pl-3.5">
                                        +{milestone.tasks.length - 3} more tasks
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {/* Projects - Full Width */}
                            {milestone.requiredProjects && milestone.requiredProjects.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                  <Target className="w-4 h-4 text-primary" />
                                  Required Projects
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.requiredProjects.map((project, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-medium border border-primary/20">
                                      {project}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Trainer Feedback */}
                            {milestone.trainerFeedback && (
                              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                                <div className="flex items-start gap-2">
                                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-primary">TR</span>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-slate-900">Trainer Feedback</h4>
                                    <p className="text-sm text-slate-700 mt-0.5">{milestone.trainerFeedback}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      {/* Project Submission Modal - Improved UI */}
      {showProjectModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center items-start py-8">
          <div className="relative bg-white rounded-[40px] shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-t-[40px] z-10">
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                onClick={() => setShowProjectModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-white">
                    Complete Milestone
                  </h3>
                  <p className="text-white/80 text-sm font-light">{selectedMilestone.title}</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Project Overview Section */}
              <div className="bg-slate-50 rounded-[32px] p-5 border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Project Overview
                </h4>
                <div className="space-y-4">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectSubmission.title}
                      onChange={(e) => setProjectSubmission({ ...projectSubmission, title: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 transition-all text-sm"
                      placeholder="e.g., Smart Home Automation System"
                    />
                  </div>

                  {/* Category & Role Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Category
                      </label>
                      <select
                        value={projectSubmission.category}
                        onChange={(e) => setProjectSubmission({ ...projectSubmission, category: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 transition-all text-sm"
                      >
                        <option value="">Select category</option>
                        <option value="Robotics">Robotics</option>
                        <option value="UI/UX">UI/UX Design</option>
                        <option value="Coding">Coding</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Web Development">Web Development</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="IoT">IoT</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={projectSubmission.studentRole}
                        onChange={(e) => setProjectSubmission({ ...projectSubmission, studentRole: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 transition-all text-sm"
                        placeholder="e.g., Lead Developer"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={projectSubmission.description}
                      onChange={(e) => setProjectSubmission({ ...projectSubmission, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 focus:ring-0 transition-all text-sm resize-none"
                      placeholder="Describe your project, what problem it solves, and what you learned from it..."
                    />
                  </div>
                </div>
              </div>

              {/* Tools Used Section */}
              <div className="bg-slate-50 rounded-[32px] p-5 border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Tools & Technologies Used
                </h4>
                <div className="space-y-3">
                  {/* Tags Display */}
                  {projectSubmission.toolsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {projectSubmission.toolsUsed.map((tool, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-sm font-medium"
                        >
                          <Code className="w-3.5 h-3.5" />
                          {tool}
                          <button
                            onClick={() => setProjectSubmission({
                              ...projectSubmission,
                              toolsUsed: projectSubmission.toolsUsed.filter((_, i) => i !== index)
                            })}
                            className="ml-1 text-primary hover:text-primary/80"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Add Tool Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="toolInput"
                      placeholder="e.g., Python, React Native, OpenCV"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          const value = input.value.trim();
                          if (value && !projectSubmission.toolsUsed.includes(value)) {
                            setProjectSubmission({
                              ...projectSubmission,
                              toolsUsed: [...projectSubmission.toolsUsed, value]
                            });
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('toolInput') as HTMLInputElement;
                        const value = input.value.trim();
                        if (value && !projectSubmission.toolsUsed.includes(value)) {
                          setProjectSubmission({
                            ...projectSubmission,
                            toolsUsed: [...projectSubmission.toolsUsed, value]
                          });
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Press Enter or click + to add a tool</p>
                </div>
              </div>

              {/* Project Evidence Section */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-green-600" />
                  Project Evidence (Links)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Demo Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.demoLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, demoLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://my-demo.example.com"
                    />
                  </div>

                  {/* Video Demo Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <Youtube className="w-3.5 h-3.5" />
                      Video Demo (YouTube, etc.)
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.videoDemoLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, videoDemoLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>

                  {/* Design Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <Figma className="w-3.5 h-3.5" />
                      Design (Figma, Adobe XD)
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.designLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, designLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://figma.com/file/..."
                    />
                  </div>

                  {/* Documentation Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Documentation
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.documentationLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, documentationLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://docs.example.com"
                    />
                  </div>

                  {/* File Download Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <FilePlus className="w-3.5 h-3.5" />
                      File Download
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.fileDownloadLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, fileDownloadLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://drive.google.com/file/..."
                    />
                  </div>

                  {/* External Link */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                      <Github className="w-3.5 h-3.5" />
                      GitHub / Other External
                    </label>
                    <input
                      type="url"
                      value={projectSubmission.evidence.externalLink}
                      onChange={(e) => setProjectSubmission({
                        ...projectSubmission,
                        evidence: { ...projectSubmission.evidence, externalLink: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  Attachments (Images & PDFs)
                </h4>

                {/* Images */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Image URLs
                  </label>
                  {projectSubmission.attachments.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {projectSubmission.attachments.images.map((url, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span className="max-w-[150px] truncate">{url.split('/').pop() || `Image ${index + 1}`}</span>
                          <button
                            onClick={() => setProjectSubmission({
                              ...projectSubmission,
                              attachments: {
                                ...projectSubmission.attachments,
                                images: projectSubmission.attachments.images.filter((_, i) => i !== index)
                              }
                            })}
                            className="ml-1 text-purple-500 hover:text-purple-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      id="imageInput"
                      placeholder="https://cdn.example.com/image.jpg"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('imageInput') as HTMLInputElement;
                        const value = input.value.trim();
                        if (value) {
                          setProjectSubmission({
                            ...projectSubmission,
                            attachments: {
                              ...projectSubmission.attachments,
                              images: [...projectSubmission.attachments.images, value]
                            }
                          });
                          input.value = '';
                        }
                      }}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* PDFs */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    PDF Document URLs
                  </label>
                  {projectSubmission.attachments.pdfs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {projectSubmission.attachments.pdfs.map((url, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span className="max-w-[150px] truncate">{url.split('/').pop() || `PDF ${index + 1}`}</span>
                          <button
                            onClick={() => setProjectSubmission({
                              ...projectSubmission,
                              attachments: {
                                ...projectSubmission.attachments,
                                pdfs: projectSubmission.attachments.pdfs.filter((_, i) => i !== index)
                              }
                            })}
                            className="ml-1 text-orange-500 hover:text-orange-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      id="pdfInput"
                      placeholder="https://cdn.example.com/document.pdf"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('pdfInput') as HTMLInputElement;
                        const value = input.value.trim();
                        if (value) {
                          setProjectSubmission({
                            ...projectSubmission,
                            attachments: {
                              ...projectSubmission.attachments,
                              pdfs: [...projectSubmission.attachments.pdfs, value]
                            }
                          });
                          input.value = '';
                        }
                      }}
                      className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProjectSubmit}
                    disabled={completingMilestone || !projectSubmission.title.trim() || !projectSubmission.description.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                  >
                    {completingMilestone ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Submit Project
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>


  );
}


