'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Users, Video, MessageCircle, CheckCircle } from 'lucide-react';
import CollaborativeRoadmapForm from '@/components/roadmap/CollaborativeRoadmapForm';

export default function RoadmapPage() {
  const [hasRoadmap, setHasRoadmap] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateRoadmap = () => {
    // Navigate to availability selection to start the flow
    window.location.href = '/post-signup/availability';
  };

  const handleRoadmapCreated = () => {
    setHasRoadmap(true);
    setShowSuccess(true);
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      window.location.href = '/dashboard/student';
    }, 3000);
  };

  // Check if user has completed payment and other steps
  const paymentCompleted = typeof window !== 'undefined' ? localStorage.getItem('paymentCompleted') === 'true' : false;
  const selectedWing = typeof window !== 'undefined' ? localStorage.getItem('selectedWing') : null;
  const savedRoadmap = typeof window !== 'undefined' ? localStorage.getItem('hasRoadmap') === 'true' : false;

  // Show success message when roadmap is created
  if (showSuccess || savedRoadmap) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmap" userType="student" />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50">
            <div className="max-w-md text-center p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Roadmap Created Successfully!
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your personalized learning roadmap has been created. You'll be redirected to your dashboard shortly.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 mb-6">
                <p className="font-medium mb-2">What's Next:</p>
                <ul className="text-left space-y-1">
                  <li>• Access your roadmap from the dashboard</li>
                  <li>• Schedule sessions with your trainer</li>
                  <li>• Track your learning progress</li>
                  <li>• Complete assessments and milestones</li>
                </ul>
              </div>

              <button
                onClick={() => window.location.href = '/dashboard/student'}
                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!savedRoadmap && !paymentCompleted) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmap" userType="student" />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50">
            <div className="max-w-md text-center p-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-yellow-600" />
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Create Your Learning Roadmap
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start your personalized learning journey by creating a collaborative roadmap with your trainer. 
                This will help you achieve your career goals step by step.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Set your availability preferences</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Choose your industry wing</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>Complete payment and start learning</span>
                </div>
              </div>

              <button
                onClick={handleCreateRoadmap}
                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Create Roadmap
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (savedRoadmap || paymentCompleted) {
    // Show collaborative roadmap creation interface
    return (
      <div className="flex h-screen bg-white">
        <Sidebar activeItem="Roadmap" userType="student" />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-auto">
            <div className="h-full flex">
              {/* Left side - Roadmap Builder */}
              <div className="flex-1 p-6 bg-white">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Collaborative Roadmap Creation
                  </h1>
                  <p className="text-gray-600">
                    Work together with your trainer to create your personalized learning path.
                  </p>
                  {selectedWing && (
                    <div className="mt-2 text-sm text-gray-500">
                      Selected Wing: <span className="font-medium text-gray-700">{selectedWing}</span>
                    </div>
                  )}
                </div>
                
                <CollaborativeRoadmapForm onRoadmapCreated={handleRoadmapCreated} />
              </div>

              {/* Right side - Trainer Mock */}
              <div className="w-96 bg-gray-50 border-l border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Trainer</h2>
                  
                  {/* Trainer Profile */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        JD
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">John Doe</h3>
                        <p className="text-sm text-gray-500">Senior Developer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online now</span>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      5+ years experience in full-stack development. Specialized in React, Node.js, and cloud technologies.
                    </p>
                  </div>

                  {/* Live Collaboration Status */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-800">Live Session Active</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Your trainer is helping you build your roadmap in real-time.
                    </p>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <Plus className="w-3 h-3 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Added "JavaScript Fundamentals" phase</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <MessageCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Suggested learning resources</p>
                          <p className="text-xs text-gray-500">5 minutes ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                          <Video className="w-3 h-3 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Scheduled next session</p>
                          <p className="text-xs text-gray-500">8 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}