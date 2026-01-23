'use client';

import { useState } from 'react';
import { Plus, X, Clock, Target, ArrowRight, Save, BookOpen, Edit3, Calendar, ChevronRight, GraduationCap } from 'lucide-react';
import { RoadmapBuilderProps, Phase } from '@/types';

// Local interface for the roadmap data structure
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
      estimatedDuration: 1,
      order: phases.length + 1,
      status: 'locked',
      progress: 0,
      lessons: []
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

  const totalWeeks = phases.reduce((sum, phase) => sum + phase.estimatedDuration, 0);
  const isValid = goal.trim() && phases.length > 0 && phases.every(phase => phase.title.trim());

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Create Your Learning Roadmap</h1>
              <p className="text-gray-600">Design your personalized journey to success</p>
            </div>
          </div>
        </div>

        {/* Learning Goal Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Learning Goal</h2>
              <p className="text-gray-600">What do you want to achieve?</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe your learning goal here... 
e.g., 'I want to become a full-stack web developer' or 'Master data science and machine learning'"
              rows={3}
              className="w-full bg-transparent text-lg text-black placeholder:text-gray-500 resize-none focus:outline-none font-medium leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            />
          </div>
        </div>

        {/* Roadmap Phases Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Learning Phases</h2>
                <p className="text-gray-600">Break down your journey into manageable phases</p>
              </div>
            </div>
            
            <button
              onClick={addPhase}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white font-medium rounded-xl hover:bg-yellow-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Phase
            </button>
          </div>

          {/* Roadmap Flow */}
          {phases.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No phases yet</h3>
              <p className="text-gray-600 mb-6">Start building your roadmap by adding your first learning phase</p>
              <button
                onClick={addPhase}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white font-medium rounded-xl hover:bg-yellow-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Your First Phase
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Horizontal Scrollable Container */}
              <div className="overflow-x-auto pb-4">
                <div className="flex items-start gap-6 min-w-max">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center">
                      {/* Phase Card */}
                      <div className="w-80 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-6 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg group">
                        {/* Phase Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phase {index + 1}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-600">{phase.estimatedDuration} weeks</span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removePhase(phase.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Phase Content */}
                        <div className="space-y-4">
                          {/* Title Input */}
                          <div>
                            <input
                              type="text"
                              value={phase.title}
                              onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                              placeholder={`Phase ${index + 1} title...`}
                              className="w-full text-lg font-semibold text-black bg-transparent border-b-2 border-transparent focus:border-yellow-600 focus:outline-none pb-2 placeholder:text-gray-400 transition-colors"
                            />
                          </div>

                          {/* Description Input */}
                          <div>
                            <textarea
                              value={phase.description}
                              onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                              placeholder="What will you learn in this phase?"
                              rows={3}
                              className="w-full text-black bg-transparent resize-none focus:outline-none placeholder:text-gray-400 leading-relaxed text-sm"
                            />
                          </div>

                          {/* Duration Selector */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm font-medium text-gray-700">Duration</span>
                            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-lg">
                              <input
                                type="number"
                                min="1"
                                max="52"
                                value={phase.estimatedDuration}
                                onChange={(e) => updatePhase(phase.id, 'estimatedDuration', parseInt(e.target.value) || 1)}
                                className="w-12 bg-transparent text-yellow-800 font-medium focus:outline-none text-center text-black"
                              />
                              <span className="text-yellow-700 font-medium text-sm">weeks</span>
                            </div>
                          </div>
                        </div>

                        {/* Phase Footer */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Phase {index + 1} of {phases.length}</span>
                            <span>{Math.ceil(phase.estimatedDuration / 4)} month{Math.ceil(phase.estimatedDuration / 4) !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow Connector */}
                      {index < phases.length - 1 && (
                        <div className="flex items-center px-4">
                          <div className="flex flex-col items-center">
                            <ChevronRight className="w-8 h-8 text-yellow-600" />
                            <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">Then</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Phase Card */}
                  <div className="w-80 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 cursor-pointer group" onClick={addPhase}>
                    <div className="w-16 h-16 bg-gray-100 group-hover:bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                      <Plus className="w-8 h-8 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 group-hover:text-yellow-700 mb-2 transition-colors">Add Next Phase</h3>
                    <p className="text-sm text-gray-500 text-center">Continue building your learning journey</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary & Actions */}
        {phases.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
            {/* Journey Summary */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                Your Learning Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700 mb-1">{phases.length}</div>
                  <div className="text-sm text-yellow-600">Learning Phases</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700 mb-1">{totalWeeks}</div>
                  <div className="text-sm text-yellow-600">Total Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700 mb-1">{Math.ceil(totalWeeks / 4)}</div>
                  <div className="text-sm text-yellow-600">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-700 mb-1">{phases.length * 3}</div>
                  <div className="text-sm text-yellow-600">Est. Lessons</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{phases.filter(p => p.title.trim()).length}</span> of <span className="font-medium">{phases.length}</span> phases completed
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(phases.filter(p => p.title.trim()).length / phases.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={!isValid}
                className="flex items-center gap-3 px-8 py-4 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                Create Roadmap
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}