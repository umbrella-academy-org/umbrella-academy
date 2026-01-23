'use client';

import { useState } from 'react';
import { Plus, X, Clock, Target, ArrowRight, Save, BookOpen, Edit3, Calendar } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Notepad Header */}
        <div className="bg-white rounded-t-2xl shadow-lg border-l-4 border-yellow-600 relative overflow-hidden">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                #e5e7eb 24px,
                #e5e7eb 26px
              )`
            }}></div>
          </div>
          
          <div className="relative p-8">
            {/* Spiral binding holes */}
            <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-evenly">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-300"></div>
              ))}
            </div>
            
            <div className="ml-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">My Learning Journal</h1>
                  <p className="text-gray-600">Plan your personalized learning journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notepad Content */}
        <div className="bg-white shadow-lg border-l-4 border-yellow-600 relative">
          {/* Paper lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full ml-16" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                #e5e7eb 31px,
                #e5e7eb 33px
              )`
            }}></div>
          </div>
          
          <div className="relative p-8">
            <div className="ml-12">
              {/* Learning Goal Section */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Edit3 className="w-5 h-5 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">What I Want to Learn</h2>
                </div>
                
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Write your learning goal here... 
e.g., 'I want to learn how to build beautiful websites from scratch' or 'Master Java programming to become a backend developer'"
                    rows={3}
                    className="w-full bg-transparent text-lg text-gray-900 placeholder:text-gray-500 resize-none focus:outline-none font-medium leading-relaxed"
                    style={{ fontFamily: 'Georgia, serif' }}
                  />
                </div>
              </div>

              {/* Learning Phases Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-600" />
                    <h2 className="text-xl font-semibold text-gray-900">My Learning Phases</h2>
                  </div>
                  <button
                    onClick={addPhase}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Phase
                  </button>
                </div>

                <div className="space-y-6">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className="group">
                      {/* Phase Number Circle */}
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {index + 1}
                          </div>
                          {index < phases.length - 1 && (
                            <div className="w-0.5 h-16 bg-yellow-200 mx-auto mt-2"></div>
                          )}
                        </div>

                        {/* Phase Content Card */}
                        <div className="flex-1 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-yellow-300">
                          <div className="space-y-4">
                            {/* Phase Title */}
                            <div>
                              <input
                                type="text"
                                value={phase.title}
                                onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                                placeholder={`Phase ${index + 1} title... (e.g., HTML Basics, JavaScript Fundamentals)`}
                                className="w-full text-lg font-semibold text-gray-900 bg-transparent border-b-2 border-transparent focus:border-yellow-600 focus:outline-none pb-2 placeholder:text-gray-400 transition-colors"
                                style={{ fontFamily: 'Georgia, serif' }}
                              />
                            </div>

                            {/* Phase Description */}
                            <div>
                              <textarea
                                value={phase.description}
                                onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                                placeholder="What will you learn in this phase? Describe the key concepts and skills..."
                                rows={2}
                                className="w-full text-gray-700 bg-transparent resize-none focus:outline-none placeholder:text-gray-400 leading-relaxed"
                              />
                            </div>

                            {/* Phase Duration & Actions */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-lg">
                                  <Calendar className="w-4 h-4 text-yellow-700" />
                                  <input
                                    type="number"
                                    min="1"
                                    max="52"
                                    value={phase.estimatedWeeks}
                                    onChange={(e) => updatePhase(phase.id, 'estimatedWeeks', parseInt(e.target.value) || 1)}
                                    className="w-12 bg-transparent text-yellow-800 font-medium focus:outline-none text-center"
                                  />
                                  <span className="text-yellow-700 font-medium">weeks</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Move buttons */}
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => movePhase(phase.id, 'up')}
                                    disabled={index === 0}
                                    className="text-xs text-gray-400 hover:text-yellow-600 disabled:opacity-30 transition-colors"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    onClick={() => movePhase(phase.id, 'down')}
                                    disabled={index === phases.length - 1}
                                    className="text-xs text-gray-400 hover:text-yellow-600 disabled:opacity-30 transition-colors"
                                  >
                                    ↓
                                  </button>
                                </div>

                                {/* Remove button */}
                                {phases.length > 1 && (
                                  <button
                                    onClick={() => removePhase(phase.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notepad Footer */}
        <div className="bg-white rounded-b-2xl shadow-lg border-l-4 border-yellow-600 relative">
          <div className="relative p-8">
            <div className="ml-12">
              {/* Summary Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  Journey Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-700">{phases.length}</div>
                    <div className="text-sm text-yellow-600">Learning Phases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-700">{totalWeeks}</div>
                    <div className="text-sm text-yellow-600">Total Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-700">{Math.ceil(totalWeeks / 4)}</div>
                    <div className="text-sm text-yellow-600">Months</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <p className="text-gray-500 italic">
                  "Every expert was once a beginner. Every pro was once an amateur."
                </p>
                <button
                  onClick={handleSave}
                  disabled={!isValid}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Save className="w-5 h-5" />
                  Complete Setup & Start Learning
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}