'use client';

import { useState } from 'react';
import { Plus, X, Clock, Target, ArrowRight, Save, BookOpen } from 'lucide-react';
import { RoadmapBuilderProps } from '@/types';

// Local interface for the roadmap data structure
interface Phase {
  id: string;
  title: string;
  description: string;
  estimatedWeeks: number;
  order: number;
}

interface RoadmapData {
  goal: string;
  phases: Phase[];
  totalEstimatedWeeks: number;
}

export default function RoadmapBuilder({ onSave }: RoadmapBuilderProps) {
  const [goal, setGoal] = useState('');
  const [phases, setPhases] = useState<Phase[]>([]);

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
    if (phases.length > 0) {
      const updatedPhases = phases.filter(phase => phase.id !== id);
      // Reorder remaining phases
      const reorderedPhases = updatedPhases.map((phase, index) => ({
        ...phase,
        order: index + 1
      }));
      setPhases(reorderedPhases);
    }
  };

  const updatePhase = (id: string, field: keyof Phase, value: string | number) => {
    setPhases(phases.map(phase =>
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const totalWeeks = phases.reduce((sum, phase) => sum + phase.estimatedWeeks, 0);
  const isValid = goal.trim() && phases.length > 0 && phases.every(phase => phase.title.trim());

  const handleSave = () => {
    if (isValid) {
      onSave({
        goal: goal.trim(),
        phases: phases.map((phase, index) => ({
          id: phase.id,
          title: phase.title.trim(),
          description: phase.description.trim(),
          objectives: [`Learn ${phase.title}`, `Master ${phase.title} concepts`],
          estimatedHours: phase.estimatedWeeks * 10, // Convert weeks to hours
          status: 'pending' as const,
          sessions: [
            {
              id: `${phase.id}_session_1`,
              title: `${phase.title} - Session 1`,
              description: `Introduction to ${phase.title}`,
              duration: 2,
              status: 'pending' as const,
              materials: [],
              objectives: [`Understand ${phase.title} basics`],
            }
          ],
          order: index + 1
        })),
        totalEstimatedWeeks: totalWeeks
      });
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Learning Goal Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Learning Goal</h2>
            <p className="text-sm text-gray-500">What do you want to achieve?</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., 'I want to become a full-stack web developer'"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent resize-none bg-white text-gray-900 placeholder:text-gray-400 font-medium"
          />
        </div>
      </div>

      {/* Roadmap Phases Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Learning Phases</h2>
              <p className="text-sm text-gray-500">Break down your journey</p>
            </div>
          </div>

          <button
            onClick={addPhase}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Phase
          </button>
        </div>

        {/* Vertical List of Phases */}
        <div className="space-y-4">
          {phases.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-4">Start by adding your first learning phase</p>
              <button
                onClick={addPhase}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Your First Phase
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div key={phase.id} className="relative group">
                  {/* Phase Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-5 hover:border-yellow-600/50 transition-all duration-300 shadow-sm">
                    {/* Phase Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-400  ">Phase {index + 1}</h3>
                          <div className="flex items-center gap-2 text-yellow-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{phase.estimatedWeeks} weeks</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removePhase(phase.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Phase Content */}
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={phase.title}
                        onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                        placeholder={`Phase ${index + 1} title...`}
                        className="w-full text-base font-semibold text-gray-900 bg-transparent border-b border-gray-100 focus:border-yellow-600 focus:outline-none pb-1 placeholder:text-gray-300"
                      />

                      <textarea
                        value={phase.description}
                        onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                        placeholder="What will you learn in this phase?"
                        rows={2}
                        className="w-full text-gray-600 bg-transparent resize-none focus:outline-none placeholder:text-gray-400 text-sm leading-relaxed"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-medium text-gray-500">Duration (Weeks)</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updatePhase(phase.id, 'estimatedWeeks', Math.max(1, phase.estimatedWeeks - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900">{phase.estimatedWeeks}</span>
                          <button
                            onClick={() => updatePhase(phase.id, 'estimatedWeeks', phase.estimatedWeeks + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary & Action */}
      {phases.length > 0 && (
        <div className="pt-6 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] text-gray-400  font-bold   mb-1">Total Time</p>
                <p className="text-lg font-bold text-gray-900">{totalWeeks} Weeks</p>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400  font-bold   mb-1">Phases</p>
                <p className="text-lg font-bold text-gray-900">{phases.length}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-400  font-bold   mb-1">Est. Lessons</p>
              <p className="text-lg font-bold text-gray-900">{phases.length * 3}</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50 shadow-lg shadow-yellow-600/20 active:scale-[0.98]"
          >
            <Save className="w-5 h-5" />
            Create Your Roadmap
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}