'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { Roadmap, Milestone, RoadmapStepStatus } from '@/types/roadmap';
import { UserRole } from '@/types/user';
import { Plus, Clock, CheckCircle, Edit, Trash2, Users, Target, Calendar, BookOpen, Award } from 'lucide-react';

interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationType: 'hours' | 'days' | 'weeks';
  status: 'pending' | 'active' | 'completed';
}

export default function TrainerRoadmapsPage() {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');

  // Create roadmap form state
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isCreatingPhase, setIsCreatingPhase] = useState(false);
  const [newPhase, setNewPhase] = useState({
    title: '',
    description: '',
    duration: '',
    durationType: 'days' as 'hours' | 'days' | 'weeks'
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockRoadmaps: Roadmap[] = [
      {
        id: '1',
        studentId: 'student-1',
        trainerId: user?.id || '',
        title: 'Full Stack Web Development',
        milestones: [
          {
            id: '1',
            roadmapId: '1',
            title: 'Frontend Fundamentals',
            description: 'Learn HTML, CSS, and JavaScript basics',
            skillsToLearn: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design'],
            tasks: ['Build 3 static websites', 'Create responsive layouts', 'Implement interactive features'],
            requiredProjects: ['Portfolio Website', 'Todo App', 'Weather App'],
            estimatedDurationDays: 30,
            order: 1,
            status: RoadmapStepStatus.COMPLETED,
            completedAt: new Date('2024-01-15'),
            trainerFeedback: 'Excellent progress on frontend concepts!'
          },
          {
            id: '2',
            roadmapId: '1',
            title: 'React Development',
            description: 'Master React framework and ecosystem',
            skillsToLearn: ['React', 'React Hooks', 'State Management', 'Component Architecture'],
            tasks: ['Build React components', 'Implement state management', 'Create single-page applications'],
            requiredProjects: ['E-commerce Frontend', 'Social Media Dashboard', 'Task Management App'],
            estimatedDurationDays: 45,
            order: 2,
            status: RoadmapStepStatus.ACTIVE,
            completedAt: null
          }
        ],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        studentId: 'student-2',
        trainerId: user?.id || '',
        title: 'Data Science Fundamentals',
        milestones: [
          {
            id: '3',
            roadmapId: '2',
            title: 'Python and Statistics',
            description: 'Learn Python programming and statistical concepts',
            skillsToLearn: ['Python', 'NumPy', 'Pandas', 'Statistics'],
            tasks: ['Complete Python exercises', 'Analyze datasets', 'Create statistical reports'],
            requiredProjects: ['Data Analysis Project', 'Statistical Study'],
            estimatedDurationDays: 40,
            order: 1,
            status: RoadmapStepStatus.ACTIVE,
            completedAt: null
          }
        ],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
      }
    ];
    
    setRoadmaps(mockRoadmaps);
    setLoading(false);
  }, [user]);

  const handleAddPhase = () => {
    if (newPhase.title && newPhase.description && newPhase.duration) {
      const phase: Phase = {
        id: Date.now().toString(),
        title: newPhase.title,
        description: newPhase.description,
        duration: newPhase.duration,
        durationType: newPhase.durationType,
        status: 'pending'
      };

      setPhases([...phases, phase]);
      setNewPhase({ title: '', description: '', duration: '', durationType: 'days' });
      setIsCreatingPhase(false);
    }
  };

  const handleRemovePhase = (phaseId: string) => {
    setPhases(phases.filter(phase => phase.id !== phaseId));
  };

  const handleCreateRoadmap = async () => {
    if (!roadmapTitle || !selectedStudentId || phases.length === 0) return;

    // Convert phases to milestones
    const milestones: Milestone[] = phases.map((phase, index) => ({
      id: Date.now().toString() + index,
      roadmapId: '',
      title: phase.title,
      description: phase.description,
      skillsToLearn: [],
      tasks: [],
      requiredProjects: [],
      estimatedDurationDays: parseInt(phase.duration) * (phase.durationType === 'hours' ? 1 : phase.durationType === 'days' ? 1 : 7),
      order: index + 1,
      status: RoadmapStepStatus.LOCKED,
      completedAt: null
    }));

    const newRoadmap: Roadmap = {
      id: Date.now().toString(),
      studentId: selectedStudentId,
      trainerId: user?.id || '',
      title: roadmapTitle,
      milestones,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setRoadmaps([...roadmaps, newRoadmap]);
    setViewMode('list');
    resetForm();
  };

  const resetForm = () => {
    setRoadmapTitle('');
    setSelectedStudentId('');
    setPhases([]);
    setNewPhase({ title: '', description: '', duration: '', durationType: 'days' });
    setIsCreatingPhase(false);
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

  const getStudentName = (studentId: string) => {
    // Mock student names - in real app, this would come from user data
    const students: Record<string, string> = {
      'student-1': 'John Smith',
      'student-2': 'Sarah Johnson',
      'student-3': 'Michael Chen'
    };
    return students[studentId] || 'Unknown Student';
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
                      <p className="text-2xl font-bold text-gray-900">{roadmaps.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Students</p>
                      <p className="text-2xl font-bold text-gray-900">{roadmaps.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Milestones</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {roadmaps.reduce((total, roadmap) => total + roadmap.milestones.length, 0)}
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
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {roadmaps.reduce((total, roadmap) => 
                          total + roadmap.milestones.filter(m => m.status === RoadmapStepStatus.COMPLETED).length, 0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadmaps List */}
              <div className="space-y-4">
                {roadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{roadmap.title}</h3>
                        <p className="text-sm text-gray-500">Student: {getStudentName(roadmap.studentId)}</p>
                        <p className="text-xs text-gray-400">Created: {roadmap.createdAt.toLocaleDateString()}</p>
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
                          onClick={() => {
                            setRoadmaps(roadmaps.filter(r => r.id !== roadmap.id));
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

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
                        {roadmap.milestones.slice(0, 3).map((milestone) => (
                          <div key={milestone.id} className="flex items-center gap-3">
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
                ))}
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
                    <option value="student-1">John Smith</option>
                    <option value="student-2">Sarah Johnson</option>
                    <option value="student-3">Michael Chen</option>
                  </select>
                </div>

                {/* Learning Phases */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Learning Phases</h3>
                    <button
                      onClick={() => setIsCreatingPhase(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Phase
                    </button>
                  </div>

                  {/* Phases List */}
                  <div className="space-y-4">
                    {phases.map((phase, index) => (
                      <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-700">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{phase.title}</h4>
                              <p className="text-sm text-gray-600">{phase.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {phase.duration} {phase.durationType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemovePhase(phase.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Phase Form */}
                  {isCreatingPhase && (
                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-4">Add New Phase</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phase Title</label>
                          <input
                            type="text"
                            value={newPhase.title}
                            onChange={(e) => setNewPhase({ ...newPhase, title: e.target.value })}
                            placeholder="e.g., Learn React Fundamentals"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={newPhase.description}
                            onChange={(e) => setNewPhase({ ...newPhase, description: e.target.value })}
                            placeholder="Describe what will be covered in this phase"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                              type="number"
                              value={newPhase.duration}
                              onChange={(e) => setNewPhase({ ...newPhase, duration: e.target.value })}
                              placeholder="e.g., 4"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                            <select
                              value={newPhase.durationType}
                              onChange={(e) => setNewPhase({ ...newPhase, durationType: e.target.value as 'hours' | 'days' | 'weeks' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="hours">Hours</option>
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleAddPhase}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Phase
                          </button>
                          <button
                            onClick={() => setIsCreatingPhase(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {phases.length === 0 && !isCreatingPhase && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p>No phases added yet. Click "Add Phase" to get started.</p>
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
                    disabled={!roadmapTitle || !selectedStudentId || phases.length === 0}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Student</p>
                      <p className="font-medium text-gray-900">{getStudentName(selectedRoadmap.studentId)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium text-gray-900">{selectedRoadmap.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
                  {selectedRoadmap.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.status === RoadmapStepStatus.COMPLETED ? 'bg-green-100' :
                            milestone.status === RoadmapStepStatus.ACTIVE ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <span className={`text-sm font-medium ${
                              milestone.status === RoadmapStepStatus.COMPLETED ? 'text-green-700' :
                              milestone.status === RoadmapStepStatus.ACTIVE ? 'text-blue-700' : 'text-gray-700'
                            }`}>
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
                              const updatedMilestones = selectedRoadmap.milestones.map(m =>
                                m.id === milestone.id 
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
                    onClick={() => {
                      // Update the roadmap in the list
                      setRoadmaps(roadmaps.map(r => r.id === selectedRoadmap.id ? selectedRoadmap : r));
                      setViewMode('list');
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