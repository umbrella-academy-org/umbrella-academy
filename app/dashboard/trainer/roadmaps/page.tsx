'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps, useUsers } from '@/contexts';
import { roadmapService } from '@/services/roadmap';
import { projectService } from '@/services/project';
import { Roadmap, Milestone, RoadmapStepStatus, RoadmapStatus } from '@/types/roadmap';
import { Project, ProjectStatus } from '@/types/project';
import { UserRole } from '@/types';
import { 
  Map, Clock, CheckCircle, Lock, PlayCircle, PauseCircle, XCircle, 
  Target, BookOpen, ChevronRight, Search, Filter, Grid, List,
  User, Calendar, CheckSquare, XSquare, Folder, MessageSquare,
  ArrowLeft, ThumbsUp, ThumbsDown, AlertCircle, Plus
} from 'lucide-react';

export default function TrainerRoadmapsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { students } = useUsers();
  const { roadmaps, refreshRoadmaps } = useRoadmaps();
  
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RoadmapStatus | 'all'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [trainerFeedback, setTrainerFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [milestoneProjects, setMilestoneProjects] = useState<Project[]>([]);

  // Filter roadmaps for current trainer
  const trainerRoadmaps = roadmaps.filter(r => r.trainerId._id === user?._id);

  // Apply filters
  const filteredRoadmaps = trainerRoadmaps.filter(roadmap => {
    const student = students.find(s => s._id === roadmap.studentId._id);
    const matchesSearch = 
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || roadmap.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: trainerRoadmaps.length,
    active: trainerRoadmaps.filter(r => r.status === 'active').length,
    pending: trainerRoadmaps.filter(r => r.status === 'pending-approval').length,
    completed: trainerRoadmaps.filter(r => r.status === 'completed').length,
  };

  const getStatusIcon = (status: RoadmapStatus) => {
    switch (status) {
      case 'active': return <PlayCircle className="w-5 h-5 text-green-600" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'paused': return <PauseCircle className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending-approval': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: RoadmapStatus) => {
    switch (status) {
      case 'active': return 'bg-green-50 border-green-200 text-green-700';
      case 'completed': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'paused': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-700';
      case 'pending-approval': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getMilestoneStatusColor = (status: RoadmapStepStatus) => {
    switch (status) {
      case RoadmapStepStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      case RoadmapStepStatus.ACTIVE: return 'bg-blue-100 text-blue-700 border-blue-200';
      case RoadmapStepStatus.PENDING_APPROVAL: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case RoadmapStepStatus.LOCKED: return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const calculateRoadmapProgress = (roadmap: Roadmap) => {
    if (!roadmap.milestones?.length) return 0;
    const completed = roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length;
    return Math.round((completed / roadmap.milestones.length) * 100);
  };

  const handleRoadmapClick = async (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedRoadmap(null);
    setViewMode('list');
    setSelectedMilestone(null);
  };

  const handleViewMilestoneDetails = async (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setTrainerFeedback(milestone.trainerFeedback || '');
    
    // Load projects for this milestone
    if (milestone.submittedProjectIds?.length) {
      try {
        const projects: Project[] = [];
        for (const projectId of milestone.submittedProjectIds) {
          const response = await projectService.getProjectData(projectId);
          if (response.data) projects.push(response.data);
        }
        setMilestoneProjects(projects);
      } catch {
        setMilestoneProjects([]);
      }
    } else {
      setMilestoneProjects([]);
    }
    
    setShowApprovalModal(true);
  };

  const handleApproveMilestone = async () => {
    if (!selectedRoadmap || !selectedMilestone) return;
    
    setIsProcessing(true);
    try {
      await roadmapService.approveMilestone(selectedRoadmap.id, selectedMilestone.order, trainerFeedback);
      await refreshRoadmaps();
      setShowApprovalModal(false);
      setSelectedMilestone(null);
      setMilestoneProjects([]);
    } catch (error) {
      console.error('Failed to approve milestone:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectMilestone = async () => {
    if (!selectedRoadmap || !selectedMilestone || !trainerFeedback.trim()) return;
    
    setIsProcessing(true);
    try {
      await roadmapService.rejectMilestone(selectedRoadmap.id, selectedMilestone.order, trainerFeedback);
      await refreshRoadmaps();
      setShowApprovalModal(false);
      setSelectedMilestone(null);
      setMilestoneProjects([]);
    } catch (error) {
      console.error('Failed to reject milestone:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const allProjectsApproved = () => {
    if (!milestoneProjects.length) return true;
    return milestoneProjects.every(p => p.status === ProjectStatus.APPROVED);
  };

  const pendingProjectsCount = () => {
    return milestoneProjects.filter(p => p.status === ProjectStatus.PENDING_APPROVAL).length;
  };

  const handleMilestoneStatusChange = async (milestone: Milestone, newStatus: RoadmapStepStatus) => {
    if (!selectedRoadmap) return;
    
    setIsProcessing(true);
    try {
      await roadmapService.updateMilestoneStatus(selectedRoadmap.id, milestone.order, newStatus);
      await refreshRoadmaps();
      // Update local state to reflect the change
      const updatedMilestones = selectedRoadmap.milestones.map(m =>
        m.order === milestone.order ? { ...m, status: newStatus } : m
      );
      setSelectedRoadmap({ ...selectedRoadmap, milestones: updatedMilestones });
    } catch (error) {
      console.error('Failed to update milestone status:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Roadmaps" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {viewMode === 'list' ? (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Student Roadmaps</h1>
                    <p className="text-gray-600 mt-1">View and manage all your assigned student roadmaps</p>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard/trainer/roadmaps/create')}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Roadmap
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total', value: stats.total, icon: Map, color: 'text-gray-600', bg: 'bg-gray-100' },
                    { label: 'Active', value: stats.active, icon: PlayCircle, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by title or student name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as RoadmapStatus | 'all')}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending-approval">Pending Approval</option>
                      <option value="completed">Completed</option>
                      <option value="paused">Paused</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Roadmaps Grid */}
                {filteredRoadmaps.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Roadmaps Found</h3>
                    <p className="text-gray-600">
                      {trainerRoadmaps.length === 0 
                        ? "You don't have any assigned roadmaps yet." 
                        : "No roadmaps match your filters."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoadmaps.map((roadmap) => {
                      const student = students.find(s => s._id === roadmap.studentId._id);
                      const progress = calculateRoadmapProgress(roadmap);
                      
                      return (
                        <div
                          key={roadmap.id}
                          onClick={() => handleRoadmapClick(roadmap)}
                          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-300 transition-all cursor-pointer group"
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${getStatusColor(roadmap.status)}`}>
                              <Map className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(roadmap.status)}
                              <span className="text-sm font-medium capitalize">{roadmap.status.replace('-', ' ')}</span>
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {student?.firstName} {student?.lastName}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-yellow-700 transition-colors">
                            {roadmap.title}
                          </h3>

                          {/* Progress */}
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
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{roadmap.milestones?.length || 0} milestones</span>
                            <span>{roadmap.milestones?.filter(m => m.status === RoadmapStepStatus.PENDING_APPROVAL).length || 0} pending</span>
                          </div>

                          {/* View Details */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-yellow-600">
                            <span className="text-sm font-medium">View Details</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : selectedRoadmap && (
              <>
                {/* Detail View */}
                <div className="mb-6">
                  <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Roadmaps
                  </button>
                  
                  {/* Hero Section */}
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                            {selectedRoadmap.status.replace('-', ' ').charAt(0).toUpperCase() + selectedRoadmap.status.slice(1).replace('-', ' ')}
                          </span>
                          <span className="text-sm text-white/80">
                            {selectedRoadmap.milestones?.length || 0} milestones
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{selectedRoadmap.title}</h1>
                        {(() => {
                          const student = students.find(s => s._id === selectedRoadmap.studentId._id);
                          return (
                            <div className="flex items-center gap-2 text-white/90">
                              <User className="w-5 h-5" />
                              <span>Student: {student?.firstName} {student?.lastName}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Progress Bar */}
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
                </div>

                {/* Timeline Milestones */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-600" />
                    Learning Milestones
                  </h2>
                  <div className="space-y-0">
                    {selectedRoadmap.milestones?.map((milestone, index) => {
                      const isLast = index === (selectedRoadmap.milestones?.length || 0) - 1;
                      const isActive = milestone.status === RoadmapStepStatus.ACTIVE;
                      const isCompleted = milestone.status === RoadmapStepStatus.COMPLETED;
                      const isPending = milestone.status === RoadmapStepStatus.PENDING_APPROVAL;
                      const pendingProjects = milestone.submittedProjectIds?.length || 0;
                      
                      return (
                        <div key={index} className="relative flex gap-4">
                          {/* Timeline Line */}
                          {!isLast && (
                            <div className="absolute left-5 top-12 w-0.5 h-full bg-gray-200" 
                              style={{ 
                                background: isCompleted ? 'linear-gradient(to bottom, #22c55e, #e5e7eb)' : 
                                           isActive ? 'linear-gradient(to bottom, #3b82f6, #e5e7eb)' : '#e5e7eb'
                              }}
                            />
                          )}
                          
                          {/* Status Icon */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                              isCompleted ? 'bg-green-500 border-green-100' :
                              isActive ? 'bg-blue-500 border-blue-100' :
                              isPending ? 'bg-yellow-500 border-yellow-100' :
                              'bg-gray-300 border-gray-100'
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
                          <div className="flex-1 pb-8">
                            <div className={`rounded-xl p-5 border transition-all ${
                              isPending ? 'bg-yellow-50/50 border-yellow-200 shadow-md' :
                              isActive ? 'bg-blue-50/30 border-blue-100' :
                              isCompleted ? 'bg-green-50/30 border-green-100' :
                              'bg-gray-50 border-gray-100'
                            }`}>
                              {/* Header */}
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-gray-900 text-lg">{milestone.title}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getMilestoneStatusColor(milestone.status)}`}>
                                      {milestone.status.replace('-', ' ').charAt(0).toUpperCase() + milestone.status.slice(1).replace('-', ' ')}
                                    </span>
                                    {pendingProjects > 0 && (
                                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                        {pendingProjects} project{pendingProjects > 1 ? 's' : ''} to review
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
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
                                
                                {/* Status Dropdown */}
                                <div className="flex items-center gap-2">
                                  <select
                                    value={milestone.status}
                                    onChange={(e) => handleMilestoneStatusChange(milestone, e.target.value as RoadmapStepStatus)}
                                    disabled={isProcessing}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <option value={RoadmapStepStatus.LOCKED}>Locked</option>
                                    <option value={RoadmapStepStatus.ACTIVE}>Active</option>
                                    <option value={RoadmapStepStatus.PENDING_APPROVAL}>Pending Approval</option>
                                    <option value={RoadmapStepStatus.COMPLETED}>Completed</option>
                                  </select>
                                  
                                  {/* View Details Button */}
                                  <button
                                    onClick={() => handleViewMilestoneDetails(milestone)}
                                    className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors shadow-sm"
                                  >
                                    {isPending ? 'Review & Approve' : 'View Details'}
                                  </button>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-gray-600 mb-4 leading-relaxed">{milestone.description}</p>

                              {/* Skills */}
                              {milestone.skillsToLearn && milestone.skillsToLearn.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {milestone.skillsToLearn.map((skill, i) => (
                                      <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Required Projects Preview */}
                              {milestone.requiredProjects && milestone.requiredProjects.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Folder className="w-4 h-4 text-orange-500" />
                                  <span>{milestone.requiredProjects.length} required project(s)</span>
                                </div>
                              )}

                              {/* Trainer Feedback Preview */}
                              {milestone.trainerFeedback && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                  <p className="text-sm text-blue-700">
                                    <span className="font-medium">Your Feedback:</span> {milestone.trainerFeedback.substring(0, 100)}
                                    {milestone.trainerFeedback.length > 100 && '...'}
                                  </p>
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
          </div>
        </main>
      </div>

      {/* Milestone Approval Modal */}
      {showApprovalModal && selectedMilestone && selectedRoadmap && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMilestoneStatusColor(selectedMilestone.status)}`}>
                    {selectedMilestone.status.replace('-', ' ').charAt(0).toUpperCase() + selectedMilestone.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMilestone.title}</h2>
              </div>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{selectedMilestone.description}</p>
              </div>

              {/* Skills */}
              {selectedMilestone.skillsToLearn && selectedMilestone.skillsToLearn.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills to Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.skillsToLearn.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {selectedMilestone.tasks && selectedMilestone.tasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Tasks</h3>
                  <ul className="space-y-1">
                    {selectedMilestone.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submitted Projects */}
              {milestoneProjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    Submitted Projects ({milestoneProjects.length})
                  </h3>
                  <div className="space-y-3">
                    {milestoneProjects.map((project) => (
                      <div key={project.id} className={`p-4 rounded-lg border ${
                        project.status === ProjectStatus.APPROVED ? 'bg-green-50 border-green-200' :
                        project.status === ProjectStatus.REJECTED ? 'bg-red-50 border-red-200' :
                        project.status === ProjectStatus.PENDING_APPROVAL ? 'bg-yellow-50 border-yellow-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                project.status === ProjectStatus.APPROVED ? 'bg-green-100 text-green-700' :
                                project.status === ProjectStatus.REJECTED ? 'bg-red-100 text-red-700' :
                                project.status === ProjectStatus.PENDING_APPROVAL ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {project.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                          {/* Quick Approve/Reject for Projects */}
                          {project.status === ProjectStatus.PENDING_APPROVAL && (
                            <div className="flex gap-2">
                              <button
                                onClick={async () => {
                                  await projectService.approveProject(project.id);
                                  const updated = await projectService.getProjectData(project.id);
                                  if (updated.data) {
                                    setMilestoneProjects(prev => prev.map(p => p.id === project.id ? updated.data! : p));
                                  }
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Approve Project"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={async () => {
                                  await projectService.rejectProject(project.id);
                                  const updated = await projectService.getProjectData(project.id);
                                  if (updated.data) {
                                    setMilestoneProjects(prev => prev.map(p => p.id === project.id ? updated.data! : p));
                                  }
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Reject Project"
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Project Approval Warning */}
                  {!allProjectsApproved() && pendingProjectsCount() > 0 && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-orange-700">
                        <span className="font-medium">Action Required:</span> {pendingProjectsCount()} project(s) need approval before you can approve this milestone.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Required Projects Notice */}
              {selectedMilestone.requiredProjects && selectedMilestone.requiredProjects.length > 0 && milestoneProjects.length === 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Required Projects:</span> {selectedMilestone.requiredProjects.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Waiting for student to submit projects...</p>
                </div>
              )}

              {/* Trainer Feedback Input */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Feedback
                </h3>
                <textarea
                  value={trainerFeedback}
                  onChange={(e) => setTrainerFeedback(e.target.value)}
                  placeholder="Provide feedback on this milestone and associated projects..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectMilestone}
                  disabled={isProcessing || !trainerFeedback.trim()}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Reject Milestone'}
                </button>
                <button
                  onClick={handleApproveMilestone}
                  disabled={isProcessing || !allProjectsApproved()}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Approve Milestone'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
