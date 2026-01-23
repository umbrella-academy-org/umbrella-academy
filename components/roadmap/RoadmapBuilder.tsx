'use client';

import { useState } from 'react';
import { Plus, X, GripVertical, Clock, Target, ArrowRight, Save } from 'lucide-react';

interface Phase {
  id: string;
  title: string;
  description: string;
  estimatedWeeks: number;
  order: number;
}

interface RoadmapBuilderProps {
  onSave: (roadmapData: {
    goal: string;
    phases: Phase[];
    totalEstimatedWeeks: number;
  }) => void;
}

export default function RoadmapBuilder({ onSave }: RoadmapBuilderProps) {
  const [goal, setGoal] = useState('');
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: '1',
      title: '',
      description: '',
      estimatedWeeks: 1,
      order: 1
    }
  ]);

  const addPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      title: '',
      description: '',
      estimatedWeeks: 1,
      order: phases.length + 1
    };
    setPhases([...phases, newPhase]);
  };

  const removePhase = (id: string) => {
    if (phases.length > 1) {
      setPhases(phases.filter(phase => phase.id !== id));
    }
  };

  const updatePhase = (id: string, field: keyof Phase, value: string | number) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const movePhase = (id: string, direction: 'up' | 'down') => {
    const currentIndex = phases.findIndex(phase => phase.id === id);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < phases.length - 1)
    ) {
      const newPhases = [...phases];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newPhases[currentIndex], newPhases[targetIndex]] = [newPhases[targetIndex], newPhases[currentIndex]];
      
      // Update order numbers
      newPhases.forEach((phase, index) => {
        phase.order = index + 1;
      });
      
      setPhases(newPhases);
    }
  };

  const totalWeeks = phases.reduce((sum, phase) => sum + phase.estimatedWeeks, 0);
  const isValid = goal.trim() && phases.every(phase => phase.title.trim());

  const handleSave = () => {
    if (isValid) {
      onSave({
        goal: goal.trim(),
        phases: phases.map((phase, index) => ({
          ...phase,
          order: index + 1,
          title: phase.title.trim(),
          description: phase.description.trim()
        })),
        totalEstimatedWeeks: totalWeeks
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Learning Roadmap</h1>
          <p className="text-gray-600">Define your learning goal and break it down into manageable phases</p>
        </div>

        {/* Learning Goal */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to learn?
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Learn to build websites, Master Java programming, Create mobile apps..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent placeholder:text-gray-400"
          />
          <p className="mt-2 text-sm text-gray-500">Be specific about what you want to achieve</p>
        </div>

        {/* Phases */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learning Phases</h2>
            <button
              onClick={addPhase}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Phase
            </button>
          </div>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {/* Drag Handle & Order */}
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-gray-500">#{phase.order}</span>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => movePhase(phase.id, 'up')}
                        disabled={index === 0}
                        className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePhase(phase.id, 'down')}
                        disabled={index === phases.length - 1}
                        className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↓
                      </button>
                    </div>
                  </div>

                  {/* Phase Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phase Title
                      </label>
                      <input
                        type="text"
                        value={phase.title}
                        onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                        placeholder="e.g., HTML Basics, JavaScript Fundamentals, React Development..."
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={phase.description}
                        onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                        placeholder="What will you learn in this phase?"
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent placeholder:text-gray-400 resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estimated Duration
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="52"
                            value={phase.estimatedWeeks}
                            onChange={(e) => updatePhase(phase.id, 'estimatedWeeks', parseInt(e.target.value) || 1)}
                            className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                          />
                          <span className="text-sm text-gray-600">weeks</span>
                        </div>
                      </div>

                      {phases.length > 1 && (
                        <button
                          onClick={() => removePhase(phase.id)}
                          className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Roadmap Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-600" />
              <span className="text-gray-600">Goal:</span>
              <span className="font-medium text-gray-900">{goal || 'Not set'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-gray-600">Phases:</span>
              <span className="font-medium text-gray-900">{phases.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium text-gray-900">{totalWeeks} weeks</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            You can modify your roadmap anytime after creation
          </p>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Create Roadmap
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}