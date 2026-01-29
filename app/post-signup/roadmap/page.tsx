'use client';

import { useState } from 'react';
import VideoCallInterface from '@/components/live-session/VideoCallInterface';
import { Plus, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationType: 'hours' | 'days' | 'weeks';
  status: 'pending' | 'active' | 'completed';
}

export default function RoadmapPage() {
  // Roadmap state
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isCreatingPhase, setIsCreatingPhase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // New phase form state
  const [newPhase, setNewPhase] = useState({
    title: '',
    description: '',
    duration: '',
    durationType: 'hours' as 'hours' | 'days' | 'weeks'
  });
  
  // Video call state
  const [isCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration] = useState('00:45:32');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if roadmap already exists
  const savedRoadmap = typeof window !== 'undefined' ? localStorage.getItem('hasRoadmap') === 'true' : false;
  
  // Get selected trainer info
  const selectedTrainerData = typeof window !== 'undefined' ? localStorage.getItem('selectedTrainer') : null;
  const selectedTrainer = selectedTrainerData ? JSON.parse(selectedTrainerData) : null;
  
  // Get selected wing info
  const selectedWingId = typeof window !== 'undefined' ? localStorage.getItem('selectedWing') : null;
  const getWingDetails = (wingId: string) => {
    const wings = {
      'tech-companies': {
        title: 'Tech Companies Wing',
        description: 'Technology sector companies and startups',
        icon: '💻',
        color: 'blue'
      },
      'business-companies': {
        title: 'Business Companies Wing', 
        description: 'Business consulting and enterprise solutions',
        icon: '💼',
        color: 'green'
      },
      'hotels': {
        title: 'Hotels Wing',
        description: 'Hospitality and tourism industry training',
        icon: '🏨',
        color: 'purple'
      }
    };
    return wings[wingId as keyof typeof wings] || null;
  };
  const selectedWing = selectedWingId ? getWingDetails(selectedWingId) : null;

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
      setNewPhase({ title: '', description: '', duration: '', durationType: 'hours' });
      setIsCreatingPhase(false);
    }
  };

  const handleRemovePhase = (phaseId: string) => {
    setPhases(phases.filter(phase => phase.id !== phaseId));
  };

  const handleSubmitRoadmap = async () => {
    if (!roadmapTitle || phases.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call and session scheduling
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save roadmap data
    const roadmapData = {
      title: roadmapTitle,
      phases: phases,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('hasRoadmap', 'true');
    localStorage.setItem('roadmapData', JSON.stringify(roadmapData));
    
    setIsSubmitting(false);
    setShowSuccessMessage(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = '/dashboard/student';
    }, 3000);
  };

  const getDurationText = (duration: string, type: 'hours' | 'days' | 'weeks') => {
    return `${duration} ${type}`;
  };

  // Show success message
  if (showSuccessMessage || savedRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Roadmap Created Successfully!</h1>
          <p className="text-gray-600 mb-4">Please wait for your roadmap to be approved by your mentor.</p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Roadmap Creation */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Learning Roadmap</h1>
            <p className="text-gray-600 mb-4">Define your learning goals and break them down into manageable phases</p>
            
            {/* Selected Wing and Trainer Info */}
            <div className="space-y-3">
              {/* Selected Wing Info */}
              {selectedWing && (
                <div className={`bg-${selectedWing.color}-50 border border-${selectedWing.color}-200 rounded-lg p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{selectedWing.icon}</div>
                    <div>
                      <p className={`text-sm text-${selectedWing.color}-800`}>
                        <span className="font-medium">Your Wing:</span> {selectedWing.title}
                      </p>
                      <p className={`text-xs text-${selectedWing.color}-600`}>{selectedWing.description}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Selected Trainer Info */}
              {selectedTrainer && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {selectedTrainer.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Your Trainer:</span> {selectedTrainer.name}
                      </p>
                      <p className="text-xs text-blue-600">{selectedTrainer.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Roadmap Title */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you want to become?
            </label>
            <input
              type="text"
              value={roadmapTitle}
              onChange={(e) => setRoadmapTitle(e.target.value)}
              placeholder="e.g., Full Stack Developer, Data Scientist, Mobile App Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phases Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Learning Phases</h2>
              <button
                onClick={() => setIsCreatingPhase(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Phase
              </button>
            </div>

            {/* Timeline */}
            <div className="relative">
              {phases.map((phase, index) => (
                <div key={phase.id} className="relative">
                  {/* Timeline line */}
                  {index < phases.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-300"></div>
                  )}
                  
                  {/* Phase card */}
                  <div className="flex items-start gap-4 mb-8">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    
                    {/* Phase content */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{phase.title}</h3>
                        <button
                          onClick={() => handleRemovePhase(phase.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{phase.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{getDurationText(phase.duration, phase.durationType)}</span>
                      </div>
                    </div>
                    
                    {/* Arrow connector */}
                    {index < phases.length - 1 && (
                      <div className="flex-shrink-0 mt-6">
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Phase Form */}
            {isCreatingPhase && (
              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Add New Phase</h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="number"
                        value={newPhase.duration}
                        onChange={(e) => setNewPhase({ ...newPhase, duration: e.target.value })}
                        placeholder="e.g., 4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
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
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {phases.length === 0 && !isCreatingPhase && (
              <div className="text-center py-8 text-gray-500">
                <p>No phases added yet. Click "Add Phase" to get started.</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmitRoadmap}
              disabled={!roadmapTitle || phases.length === 0 || isSubmitting}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating Roadmap...
                </>
              ) : (
                'Create Roadmap'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Video Call Interface */}
      <div className="w-1/2 bg-gray-900">
        <VideoCallInterface
          isCallActive={isCallActive}
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          callDuration={callDuration}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onVideoToggle={() => setIsVideoOn(!isVideoOn)}
          onEndCall={() => {}}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
          isFullscreen={isFullscreen}
        />
      </div>
    </div>
  );
}