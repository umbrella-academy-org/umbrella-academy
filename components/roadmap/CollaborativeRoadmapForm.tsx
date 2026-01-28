'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Target, BookOpen, Users } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
}

interface TimelineItem {
  id: string;
  phase: string;
  startDate: string;
  endDate: string;
  milestones: string[];
}

interface RoadmapFormData {
  studentGoals: string[];
  learningPath: LearningModule[];
  timeline: TimelineItem[];
  assessmentCriteria: string[];
}

interface CollaborativeRoadmapFormProps {
  sessionId: string;
  trainerId: string;
  studentId: string;
  onSave: (roadmapData: RoadmapFormData) => void;
}

export default function CollaborativeRoadmapForm({ 
  sessionId, 
  trainerId, 
  studentId, 
  onSave 
}: CollaborativeRoadmapFormProps) {
  const [formData, setFormData] = useState<RoadmapFormData>({
    studentGoals: [''],
    learningPath: [],
    timeline: [],
    assessmentCriteria: ['']
  });
  const [isTrainerConnected, setIsTrainerConnected] = useState(false);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  // Simulate real-time collaboration
  useEffect(() => {
    // Mock trainer connection
    setTimeout(() => {
      setIsTrainerConnected(true);
      setCollaborators(['Student', 'Trainer']);
    }, 1000);
  }, []);

  const addGoal = () => {
    setFormData(prev => ({
      ...prev,
      studentGoals: [...prev.studentGoals, '']
    }));
  };

  const updateGoal = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      studentGoals: prev.studentGoals.map((goal, i) => i === index ? value : goal)
    }));
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      studentGoals: prev.studentGoals.filter((_, i) => i !== index)
    }));
  };

  const addLearningModule = () => {
    const newModule: LearningModule = {
      id: Date.now().toString(),
      title: '',
      description: '',
      duration: '',
      prerequisites: []
    };
    setFormData(prev => ({
      ...prev,
      learningPath: [...prev.learningPath, newModule]
    }));
  };

  const updateLearningModule = (index: number, field: keyof LearningModule, value: any) => {
    setFormData(prev => ({
      ...prev,
      learningPath: prev.learningPath.map((module, i) => 
        i === index ? { ...module, [field]: value } : module
      )
    }));
  };

  const removeLearningModule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningPath: prev.learningPath.filter((_, i) => i !== index)
    }));
  };

  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      phase: '',
      startDate: '',
      endDate: '',
      milestones: ['']
    };
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, newItem]
    }));
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeTimelineItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const addAssessmentCriteria = () => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: [...prev.assessmentCriteria, '']
    }));
  };

  const updateAssessmentCriteria = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.map((criteria, i) => i === index ? value : criteria)
    }));
  };

  const removeAssessmentCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: prev.assessmentCriteria.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Filter out empty values
    const cleanedData = {
      ...formData,
      studentGoals: formData.studentGoals.filter(goal => goal.trim() !== ''),
      assessmentCriteria: formData.assessmentCriteria.filter(criteria => criteria.trim() !== '')
    };
    
    localStorage.setItem('hasRoadmap', 'true');
    localStorage.setItem('roadmapData', JSON.stringify(cleanedData));
    onSave(cleanedData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Collaborative Roadmap Creation</h2>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">
            {isTrainerConnected ? `${collaborators.length} collaborators` : 'Connecting...'}
          </span>
        </div>
      </div>

      {!isTrainerConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">Waiting for trainer to join the session...</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Student Goals */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Learning Goals</h3>
          </div>
          <div className="space-y-3">
            {formData.studentGoals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => updateGoal(index, e.target.value)}
                  placeholder="Enter a learning goal..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  disabled={!isTrainerConnected}
                />
                {formData.studentGoals.length > 1 && (
                  <button
                    onClick={() => removeGoal(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                    disabled={!isTrainerConnected}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addGoal}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 disabled:opacity-50"
              disabled={!isTrainerConnected}
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Learning Path</h3>
          </div>
          <div className="space-y-4">
            {formData.learningPath.map((module, index) => (
              <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Module {index + 1}</span>
                  <button
                    onClick={() => removeLearningModule(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                    disabled={!isTrainerConnected}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => updateLearningModule(index, 'title', e.target.value)}
                    placeholder="Module title..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!isTrainerConnected}
                  />
                  <input
                    type="text"
                    value={module.duration}
                    onChange={(e) => updateLearningModule(index, 'duration', e.target.value)}
                    placeholder="Duration (e.g., 2 weeks)..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!isTrainerConnected}
                  />
                </div>
                <textarea
                  value={module.description}
                  onChange={(e) => updateLearningModule(index, 'description', e.target.value)}
                  placeholder="Module description..."
                  rows={2}
                  className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  disabled={!isTrainerConnected}
                />
              </div>
            ))}
            <button
              onClick={addLearningModule}
              className="flex items-center gap-2 px-3 py-2 text-green-600 hover:text-green-700 disabled:opacity-50"
              disabled={!isTrainerConnected}
            >
              <Plus className="w-4 h-4" />
              Add Learning Module
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
          </div>
          <div className="space-y-4">
            {formData.timeline.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Phase {index + 1}</span>
                  <button
                    onClick={() => removeTimelineItem(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                    disabled={!isTrainerConnected}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.phase}
                    onChange={(e) => updateTimelineItem(index, 'phase', e.target.value)}
                    placeholder="Phase name..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!isTrainerConnected}
                  />
                  <input
                    type="date"
                    value={item.startDate}
                    onChange={(e) => updateTimelineItem(index, 'startDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!isTrainerConnected}
                  />
                  <input
                    type="date"
                    value={item.endDate}
                    onChange={(e) => updateTimelineItem(index, 'endDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    disabled={!isTrainerConnected}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addTimelineItem}
              className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:text-purple-700 disabled:opacity-50"
              disabled={!isTrainerConnected}
            >
              <Plus className="w-4 h-4" />
              Add Timeline Phase
            </button>
          </div>
        </div>

        {/* Assessment Criteria */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Criteria</h3>
          <div className="space-y-3">
            {formData.assessmentCriteria.map((criteria, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={criteria}
                  onChange={(e) => updateAssessmentCriteria(index, e.target.value)}
                  placeholder="Enter assessment criteria..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  disabled={!isTrainerConnected}
                />
                {formData.assessmentCriteria.length > 1 && (
                  <button
                    onClick={() => removeAssessmentCriteria(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                    disabled={!isTrainerConnected}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAssessmentCriteria}
              className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:text-orange-700 disabled:opacity-50"
              disabled={!isTrainerConnected}
            >
              <Plus className="w-4 h-4" />
              Add Criteria
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
            disabled={!isTrainerConnected}
          >
            Save Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}