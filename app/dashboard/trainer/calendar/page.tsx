'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth, useRoadmaps, useUsers } from '@/contexts';
import { roadmapService } from '@/services/roadmap';
import { Roadmap, Milestone, RoadmapStepStatus } from '@/types/roadmap';
import { UserRole } from '@/types/user';
import { Plus, Clock, CheckCircle, Edit, Trash2, Users, Target, Calendar, BookOpen, Award } from 'lucide-react';

interface MilestoneForm {
  id: string;
  title: string;
  description: string;
  requiredProjects: string[];
  duration: string;
  durationType: 'hours' | 'days' | 'weeks';
  status: 'pending' | 'active' | 'completed';
}

export default function TrainerRoadmapsPage() {
  const { user } = useAuth();
  const { students } = useUsers()
  const { roadmaps, loading, createRoadmap, refreshRoadmaps } = useRoadmaps();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');

  // Create roadmap form state
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [milestones, setMilestones] = useState<MilestoneForm[]>([]);
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    requiredProjects: [],
    duration: '',
    durationType: 'days' as 'hours' | 'days' | 'weeks'
  });

  // Filter roadmaps for current trainer
  const trainerRoadmaps = roadmaps.filter(roadmap => roadmap.trainerId === user?._id);
  console.log(roadmaps, user)
  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.description && newMilestone.duration) {
      const milestone: MilestoneForm = {
        id: Date.now().toString(),
        title: newMilestone.title,
        description: newMilestone.description,
        requiredProjects: newMilestone.requiredProjects,
        duration: newMilestone.duration,
        durationType: newMilestone.durationType,
        status: 'pending'
      };

      setMilestones([...milestones, milestone]);
      setNewMilestone({ title: '', description: '', requiredProjects: [], duration: '', durationType: 'days' });
      setIsCreatingMilestone(false);
    }
  };

  const handleRemoveMilestone = (milestoneId: string) => {
    setMilestones(milestones.filter(milestone => milestone.id !== milestoneId));
  };

  const handleCreateRoadmap = async () => {
    if (!roadmapTitle || !selectedStudentId || milestones.length === 0) return;

    // Convert milestone forms to actual milestones
    const roadmapMilestones: Milestone[] = milestones.map((milestoneForm, index) => ({
      title: milestoneForm.title,
      description: milestoneForm.description,
      skillsToLearn: [],
      tasks: [],
      requiredProjects: milestoneForm.requiredProjects,
      estimatedDurationDays: parseInt(milestoneForm.duration) * (milestoneForm.durationType === 'hours' ? 1 : milestoneForm.durationType === 'days' ? 1 : 7),
      order: index + 1,
      status: RoadmapStepStatus.LOCKED,
      completedAt: null
    }));

    const newRoadmap: Partial<Roadmap> = {
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
    setNewMilestone({ title: '', description: '', requiredProjects: [], duration: '', durationType: 'days' });
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

  const getStepStatusColor = (status: RoadmapStepStatus) => {
    switch (status) {
      case RoadmapStepStatus.COMPLETED:
        return 'bg-green-100 text-green-700 border-green-200';
      case RoadmapStepStatus.ACTIVE:
        return 'bg-blue-100 text-blue-700 border-blue-200';
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
                          <p className="text-sm text-gray-500">Student: {getStudentName(roadmap.studentId)}</p>
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

                      {/* Progress Overview */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>
                            {roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length} / {roadmap.milestones.length} completed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${(roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length / roadmap.milestones.length) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>

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
                      <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-700">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                              {milestone.requiredProjects.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Required Projects:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {milestone.requiredProjects.map((project, i) => (
                                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                        {project}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveMilestone(milestone.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          Duration: {milestone.duration} {milestone.durationType}
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
                            Required Projects
                          </label>
                          <input
                            type="text"
                            value={newMilestone.requiredProjects.join(', ')}
                            onChange={(e) => {
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
                              Duration
                            </label>
                            <input
                              type="number"
                              value={newMilestone.duration}
                              onChange={(e) => setNewMilestone({ ...newMilestone, duration: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., 30"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration Type
                            </label>
                            <select
                              value={newMilestone.durationType}
                              onChange={(e) => setNewMilestone({ ...newMilestone, durationType: e.target.value as 'hours' | 'days' | 'weeks' })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="hours">Hours</option>
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                            </select>
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
                      <p>No milestones added yet. Click "Add Milestone" to get started.</p>
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
                      <p className="font-medium text-gray-900">{getStudentName(selectedRoadmap.studentId)}</p>
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
                            onChange={(e) => {
                              const updatedMilestones = selectedRoadmap.milestones.map((m, i) =>
                                i === index
                                  ? { ...m, status: e.target.value as RoadmapStepStatus }
                                  : m
                              );
                              setSelectedRoadmap({ ...selectedRoadmap, milestones: updatedMilestones });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value={RoadmapStepStatus.LOCKED}>Locked</option>
                            <option value={RoadmapStepStatus.ACTIVE}>Active</option>
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
        </main>
      </div>
    </div>
  );
}