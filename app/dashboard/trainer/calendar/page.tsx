'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps, useUsers } from '@/contexts';
import { roadmapService } from '@/services/roadmap';
import { projectService } from '@/services/project';
import { Roadmap, Milestone, RoadmapStepStatus, CreateRoadmapData } from '@/types/roadmap';
import { Project } from '@/types/project';
import { UserRole } from '@/types/user';
import { Plus, Clock, CheckCircle, Edit, Trash2, Target, Calendar, BookOpen, Award } from 'lucide-react';


export default function TrainerRoadmapsPage() {
  const { user } = useAuth();
  const { students } = useUsers()
  const { roadmaps, loading, createRoadmap, refreshRoadmaps } = useRoadmaps();
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');

  // Milestone approval state
  const [selectedMilestone, setSelectedMilestone] = useState<{ roadmap: Roadmap; milestone: Milestone } | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [trainerFeedback, setTrainerFeedback] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [submittedProject, setSubmittedProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);

  // Create roadmap form state
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Milestone>({
    title: '',
    description: '',
    requiredProjects: [],
    estimatedDurationDays: 0,
    skillsToLearn: [],
    tasks: [],
    order: 0,
    status: RoadmapStepStatus.LOCKED,
    completedAt: null,
  });

  // Separate state for input values to handle comma input properly
  const [skillsInput, setSkillsInput] = useState('');
  const [projectsInput, setProjectsInput] = useState('');

  // Filter roadmaps for current trainer
  const trainerRoadmaps = roadmaps.filter(roadmap => roadmap.trainerId._id === user?._id);
  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.description && newMilestone.estimatedDurationDays) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone({ title: '', description: '', requiredProjects: [], estimatedDurationDays: 0, skillsToLearn: [], tasks: [], order: 0, status: RoadmapStepStatus.LOCKED, completedAt: null });
      setSkillsInput('');
      setProjectsInput('');
      setIsCreatingMilestone(false);
    }
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleCreateRoadmap = async () => {
    if (!roadmapTitle || !selectedStudentId || milestones.length === 0) return;

    // Convert milestone forms to actual milestones
    const roadmapMilestones: Milestone[] = milestones.map((milestoneForm, index) => ({
      title: milestoneForm.title,
      description: milestoneForm.description,
      skillsToLearn: milestoneForm.skillsToLearn,
      tasks: milestoneForm.tasks,
      requiredProjects: milestoneForm.requiredProjects,
      estimatedDurationDays: milestoneForm.estimatedDurationDays,
      order: index + 1,
      status: RoadmapStepStatus.LOCKED,
      completedAt: null
    }));

    const newRoadmap: CreateRoadmapData = {
      studentId: selectedStudentId,
      trainerId: user?._id || '',
      title: roadmapTitle,
      status: 'pending-approval',
      milestones: roadmapMilestones,
    };

    try {
      await createRoadmap(newRoadmap);
      setViewMode('list');
      resetForm();
      await refreshRoadmaps();
    } catch (error) {
      console.error('Failed to create roadmap:', error);
    }
  };

  const resetForm = () => {
    setRoadmapTitle('');
    setSelectedStudentId('');
    setMilestones([]);
    setNewMilestone({
      title: '',
      description: '',
      requiredProjects: [],
      estimatedDurationDays: 0,
      skillsToLearn: [],
      tasks: [],
      order: 0,
      status: RoadmapStepStatus.LOCKED,
      completedAt: null,
    });
    setSkillsInput('');
    setProjectsInput('');
    setIsCreatingMilestone(false);
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      await roadmapService.deleteRoadmap(roadmapId);
      await refreshRoadmaps();
    } catch (error) {
      console.error('Failed to delete roadmap:', error);
    }
  };

  const handleApproveMilestone = async () => {
    if (!selectedMilestone || !trainerFeedback.trim()) return;

    setIsApproving(true);
    try {
      await roadmapService.approveMilestone(
        selectedMilestone.roadmap.id,
        selectedMilestone.milestone.order,
        trainerFeedback
      );
      await refreshRoadmaps();
      setShowApprovalModal(false);
      setSelectedMilestone(null);
      setTrainerFeedback('');
      setSubmittedProject(null);
    } catch (error) {
      console.error('Failed to approve milestone:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectMilestone = async () => {
    if (!selectedMilestone || !trainerFeedback.trim()) return;

    setIsApproving(true);
    try {
      await roadmapService.rejectMilestone(
        selectedMilestone.roadmap.id,
        selectedMilestone.milestone.order,
        trainerFeedback
      );
      await refreshRoadmaps();
      setShowRejectionModal(false);
      setSelectedMilestone(null);
      setTrainerFeedback('');
      setSubmittedProject(null);
    } catch (error) {
      console.error('Failed to reject milestone:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const openApprovalModal = async (roadmap: Roadmap, milestone: Milestone) => {
    setSelectedMilestone({ roadmap, milestone });
    setShowApprovalModal(true);
    setTrainerFeedback('');
    setSubmittedProject(null);

    if (milestone.submittedProjectIds) {
      setLoadingProject(true);
      try {
        const response = await projectService.getProjectData(milestone.submittedProjectIds[0]);
        setSubmittedProject(response.data ?? null);
      } catch (error) {
        console.error('Failed to fetch submitted project:', error);
      } finally {
        setLoadingProject(false);
      }
    }
  };

  const openRejectionModal = (roadmap: Roadmap, milestone: Milestone) => {
    setSelectedMilestone({ roadmap, milestone });
    setShowRejectionModal(true);
    setTrainerFeedback('');
  };

  const getStepStatusColor = (status: RoadmapStepStatus) => {
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

  const getRoadmapStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'paused':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'completed':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s._id === studentId);
    return student?.firstName + ' ' + student?.lastName || 'Unknown Student';
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmaps" userType={UserRole.TRAINER} />
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
      <Sidebar activeItem="Roadmaps" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Roadmap Management</h1>
              <p className="text-gray-500">Create and manage student learning roadmaps</p>
            </div>
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Roadmap
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {viewMode === 'list' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Roadmaps</p>
                      <p className="text-2xl font-bold text-gray-900">{trainerRoadmaps.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Approved</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {trainerRoadmaps.filter(r => r.status === 'approved').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending Approval</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {trainerRoadmaps.filter(r => r.status === 'pending-approval').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Milestones</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {trainerRoadmaps.reduce((total, roadmap) =>
                          total + roadmap.milestones.filter(m => m.status === RoadmapStepStatus.ACTIVE).length, 0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadmaps List */}
              <div className="space-y-4">
                {trainerRoadmaps.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Roadmaps Yet</h3>
                    <p className="text-gray-500 mb-6">Create your first roadmap to get started with managing student learning paths.</p>
                    <button
                      onClick={() => setViewMode('create')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Create Roadmap
                    </button>
                  </div>
                ) : (
                  trainerRoadmaps.map((roadmap) => (
                    <div key={roadmap.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{roadmap.title}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoadmapStatusColor(roadmap.status)}`}>
                              {roadmap.status.replace('-', ' ').charAt(0).toUpperCase() + roadmap.status.slice(1).replace('-', ' ')}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Student: {getStudentName(roadmap.studentId._id)}</p>
                          <p className="text-xs text-gray-400">Created: {new Date(roadmap.createdAt).toLocaleDateString()}</p>
                          {roadmap.approvedAt && (
                            <p className="text-xs text-gray-400">Approved: {new Date(roadmap.approvedAt).toLocaleDateString()}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedRoadmap(roadmap);
                              setViewMode('edit');
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRoadmap(roadmap.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Rejection Reason */}
                      {roadmap.status === 'rejected' && roadmap.rejectionReason && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm font-medium text-red-700 mb-1">Rejection Reason</p>
                          <p className="text-sm text-red-600">{roadmap.rejectionReason}</p>
                        </div>
                      )}



                      {/* Milestones Preview */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Milestones</h4>
                        <div className="space-y-2">
                          {roadmap.milestones.slice(0, 3).map((milestone, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStepStatusColor(milestone.status)}`}>
                                {milestone.status}
                              </div>
                              <span className="text-sm text-gray-700">{milestone.title}</span>
                              <span className="text-xs text-gray-500">{milestone.estimatedDurationDays} days</span>
                              {milestone.status === RoadmapStepStatus.PENDING_APPROVAL && (
                                <div className="flex gap-2 ml-auto">
                                  <button
                                    onClick={() => openApprovalModal(roadmap, milestone)}
                                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => openRejectionModal(roadmap, milestone)}
                                    className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                          {roadmap.milestones.length > 3 && (
                            <p className="text-xs text-gray-500">+{roadmap.milestones.length - 3} more milestones</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )))}
              </div>
            </div>
          )}

          {viewMode === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Roadmap</h2>

                {/* Roadmap Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roadmap Title
                  </label>
                  <input
                    type="text"
                    value={roadmapTitle}
                    onChange={(e) => setRoadmapTitle(e.target.value)}
                    placeholder="e.g., Full Stack Web Development, Data Science Fundamentals"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Student Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Student
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.firstName} {student.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Phases */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
                    <button
                      onClick={() => setIsCreatingMilestone(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Milestone
                    </button>
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-700">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                              {milestone.skillsToLearn.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Skills to Learn:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {milestone.skillsToLearn.map((skill, i) => (
                                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {milestone.tasks.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Learning Tasks:</p>
                                  <div className="text-xs text-gray-600">
                                    {milestone.tasks.slice(0, 2).map((task, i) => (
                                      <div key={i} className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        {task}
                                      </div>
                                    ))}
                                    {milestone.tasks.length > 2 && (
                                      <div className="text-gray-500">+{milestone.tasks.length - 2} more tasks</div>
                                    )}
                                  </div>
                                </div>
                              )}
                              {milestone.requiredProjects.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Required Projects:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {milestone.requiredProjects.map((project, i) => (
                                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                        {project}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveMilestone(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          Duration: {milestone.estimatedDurationDays} days
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Milestone Form */}
                  {isCreatingMilestone && (
                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-4">Add New Milestone</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={newMilestone.title}
                            onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Frontend Development"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={newMilestone.description}
                            onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Describe what students will learn in this milestone"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skills to Learn
                          </label>
                          <input
                            type="text"
                            value={skillsInput}
                            onChange={(e) => {
                              setSkillsInput(e.target.value);
                              const skills: string[] = e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
                              setNewMilestone({ ...newMilestone, skillsToLearn: skills });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter skills students will learn in this milestone (comma separated)</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learning Tasks
                          </label>
                          <textarea
                            value={newMilestone.tasks.join('\n')}
                            onChange={(e) => {
                              const tasks: string[] = e.target.value.split('\n').map(t => t.trim()).filter(t => t.length > 0);
                              setNewMilestone({ ...newMilestone, tasks: tasks });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Enter learning tasks (one per line)"
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter specific tasks students need to complete (one per line)</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Required Projects
                          </label>
                          <input
                            type="text"
                            value={projectsInput}
                            onChange={(e) => {
                              setProjectsInput(e.target.value);
                              const projects: string[] = e.target.value.split(',').map(p => p.trim()).filter(p => p.length > 0);
                              setNewMilestone({ ...newMilestone, requiredProjects: projects });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., E-commerce Website, Portfolio Site, Weather App (comma separated)"
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter project requirements separated by commas</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration (days)
                            </label>
                            <input
                              type="number"
                              value={newMilestone.estimatedDurationDays}
                              onChange={(e) => setNewMilestone({ ...newMilestone, estimatedDurationDays: parseInt(e.target.value) })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., 30"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddMilestone}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Milestone
                          </button>
                          <button
                            onClick={() => setIsCreatingMilestone(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {milestones.length === 0 && !isCreatingMilestone && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p>No milestones added yet. Click &quot;Add Milestone&quot; to get started.</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setViewMode('list');
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateRoadmap}
                    disabled={!roadmapTitle || !selectedStudentId || milestones.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Create Roadmap
                  </button>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'edit' && selectedRoadmap && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Roadmap: {selectedRoadmap.title}</h2>

                {/* Roadmap Info */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Student</p>
                      <p className="font-medium text-gray-900">{getStudentName(selectedRoadmap.studentId._id)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border inline-block ${getRoadmapStatusColor(selectedRoadmap.status)}`}>
                        {selectedRoadmap.status.replace('-', ' ').charAt(0).toUpperCase() + selectedRoadmap.status.slice(1).replace('-', ' ')}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium text-gray-900">{new Date(selectedRoadmap.createdAt).toLocaleDateString()}</p>
                    </div>
                    {selectedRoadmap.approvedAt && (
                      <div>
                        <p className="text-sm text-gray-500">Approved</p>
                        <p className="font-medium text-gray-900">{new Date(selectedRoadmap.approvedAt).toLocaleDateString()}</p>
                        {selectedRoadmap.approvedBy && (
                          <p className="text-xs text-gray-500">by {selectedRoadmap.approvedBy}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  {selectedRoadmap.status === 'rejected' && selectedRoadmap.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm font-medium text-red-700 mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-600">{selectedRoadmap.rejectionReason}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedRoadmap.milestones.map((milestone, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${milestone.status === RoadmapStepStatus.ACTIVE ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <span className={`text-sm font-medium ${milestone.status === RoadmapStepStatus.ACTIVE ? 'text-blue-700' : 'text-gray-700'}`}>
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStepStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Duration</p>
                          <p className="font-medium">{milestone.estimatedDurationDays} days</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Skills to Learn</p>
                          <div className="flex flex-wrap gap-1">
                            {milestone.skillsToLearn.map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Status</p>
                          <select
                            value={milestone.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as RoadmapStepStatus;
                              setIsApproving(true);
                              try {
                                await roadmapService.updateMilestoneStatus(selectedRoadmap.id, milestone.order, newStatus);
                                await refreshRoadmaps();
                                // Update local state to reflect the change
                                const updatedMilestones = selectedRoadmap.milestones.map((m, i) =>
                                  i === index ? { ...m, status: newStatus } : m
                                );
                                setSelectedRoadmap({ ...selectedRoadmap, milestones: updatedMilestones });
                              } catch (error) {
                                console.error('Failed to update milestone status:', error);
                              } finally {
                                setIsApproving(false);
                              }
                            }}
                            disabled={isApproving}
                            className="px-2 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value={RoadmapStepStatus.LOCKED}>Locked</option>
                            <option value={RoadmapStepStatus.ACTIVE}>Active</option>
                            <option value={RoadmapStepStatus.PENDING_APPROVAL}>Pending Approval</option>
                            <option value={RoadmapStepStatus.COMPLETED}>Completed</option>
                          </select>
                        </div>
                      </div>

                      {milestone.trainerFeedback && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm font-medium text-blue-700 mb-1">Trainer Feedback</p>
                          <p className="text-sm text-blue-600">{milestone.trainerFeedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setViewMode('list')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Back to Roadmaps
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await roadmapService.updateRoadmap(selectedRoadmap.id, selectedRoadmap);
                        await refreshRoadmaps();
                        setViewMode('list');
                      } catch (error) {
                        console.error('Failed to update roadmap:', error);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Milestone Approval Modal */}
          {showApprovalModal && selectedMilestone && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Milestone Completion</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Milestone:</strong> {selectedMilestone.milestone.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Student:</strong> {getStudentName(selectedMilestone.roadmap.studentId._id)}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Duration:</strong> {selectedMilestone.milestone.estimatedDurationDays} days
                  </p>
                </div>

                {/* Submitted Project */}
                {selectedMilestone.milestone.submittedProjectIds && selectedMilestone.milestone.submittedProjectIds.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Submitted Project</h4>
                    {loadingProject ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading project...</p>
                      </div>
                    ) : submittedProject ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Title</p>
                            <p className="text-sm text-gray-600">{submittedProject.title}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Category</p>
                            <p className="text-sm text-gray-600">{submittedProject.category}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Tools Used</p>
                            <p className="text-sm text-gray-600">{submittedProject.toolsUsed.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Student Role</p>
                            <p className="text-sm text-gray-600">{submittedProject.studentRole}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700">Description</p>
                          <p className="text-sm text-gray-600">{submittedProject.description}</p>
                        </div>
                        {submittedProject.evidence.demoLink && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700">Demo Link</p>
                            <a href={submittedProject.evidence.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              {submittedProject.evidence.demoLink}
                            </a>
                          </div>
                        )}
                        {submittedProject.attachments.images.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700">Images</p>
                            <div className="flex gap-2 mt-2">
                              {submittedProject.attachments.images.map((image, index) => (
                                <img key={index} src={image} alt={`Project image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>Failed to load submitted project.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trainer Feedback
                  </label>
                  <textarea
                    value={trainerFeedback}
                    onChange={(e) => setTrainerFeedback(e.target.value)}
                    placeholder="Provide feedback on the student's work..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApproveMilestone}
                    disabled={!trainerFeedback.trim() || isApproving}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApproving ? 'Approving...' : 'Approve'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Milestone Rejection Modal */}
          {showRejectionModal && selectedMilestone && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Milestone Completion</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Milestone:</strong> {selectedMilestone.milestone.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Student:</strong> {getStudentName(selectedMilestone.roadmap.studentId._id)}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Duration:</strong> {selectedMilestone.milestone.estimatedDurationDays} days
                  </p>
                </div>

                {/* Submitted Project */}
                {selectedMilestone.milestone.submittedProjectIds && selectedMilestone.milestone.submittedProjectIds.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Submitted Project</h4>
                    {loadingProject ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading project...</p>
                      </div>
                    ) : submittedProject ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Title</p>
                            <p className="text-sm text-gray-600">{submittedProject.title}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Category</p>
                            <p className="text-sm text-gray-600">{submittedProject.category}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Tools Used</p>
                            <p className="text-sm text-gray-600">{submittedProject.toolsUsed.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Student Role</p>
                            <p className="text-sm text-gray-600">{submittedProject.studentRole}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700">Description</p>
                          <p className="text-sm text-gray-600">{submittedProject.description}</p>
                        </div>
                        {submittedProject.evidence.demoLink && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700">Demo Link</p>
                            <a href={submittedProject.evidence.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              {submittedProject.evidence.demoLink}
                            </a>
                          </div>
                        )}
                        {submittedProject.attachments.images.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700">Images</p>
                            <div className="flex gap-2 mt-2">
                              {submittedProject.attachments.images.map((image, index) => (
                                <img key={index} src={image} alt={`Project image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>Failed to load submitted project.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason
                  </label>
                  <textarea
                    value={trainerFeedback}
                    onChange={(e) => setTrainerFeedback(e.target.value)}
                    placeholder="Explain why the milestone completion is being rejected..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRejectionModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectMilestone}
                    disabled={!trainerFeedback.trim() || isApproving}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApproving ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}