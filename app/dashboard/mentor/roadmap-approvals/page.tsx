'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { CheckCircle, XCircle, Clock, User, Calendar, Target } from 'lucide-react';

export default function MentorRoadmapApprovalsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const pendingRoadmaps = [
    {
      id: 'rm-001',
      student: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        wing: 'Programming Wing'
      },
      trainer: {
        name: 'John Smith',
        email: 'john@example.com'
      },
      goal: 'Learn Full-Stack Web Development',
      submittedAt: '2024-01-22T10:30:00Z',
      phases: [
        {
          id: 'phase-1',
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the basics of web structure and styling',
          estimatedWeeks: 3,
          sessions: 6
        },
        {
          id: 'phase-2',
          title: 'JavaScript Programming',
          description: 'Master JavaScript fundamentals and DOM manipulation',
          estimatedWeeks: 4,
          sessions: 8
        },
        {
          id: 'phase-3',
          title: 'React Development',
          description: 'Build modern web applications with React',
          estimatedWeeks: 5,
          sessions: 10
        },
        {
          id: 'phase-4',
          title: 'Backend with Node.js',
          description: 'Create server-side applications and APIs',
          estimatedWeeks: 4,
          sessions: 8
        }
      ],
      totalWeeks: 16,
      totalSessions: 32,
      monthlyPrice: 500
    },
    {
      id: 'rm-002',
      student: {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        wing: 'Design Wing'
      },
      trainer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com'
      },
      goal: 'Master UI/UX Design',
      submittedAt: '2024-01-21T15:45:00Z',
      phases: [
        {
          id: 'phase-1',
          title: 'Design Principles',
          description: 'Learn fundamental design principles and theory',
          estimatedWeeks: 2,
          sessions: 4
        },
        {
          id: 'phase-2',
          title: 'Figma Mastery',
          description: 'Master Figma for professional design work',
          estimatedWeeks: 3,
          sessions: 6
        },
        {
          id: 'phase-3',
          title: 'User Research & Testing',
          description: 'Learn user research methods and usability testing',
          estimatedWeeks: 3,
          sessions: 6
        }
      ],
      totalWeeks: 8,
      totalSessions: 16,
      monthlyPrice: 400
    }
  ];

  const handleApprove = (roadmapId: string) => {
    console.log('Approving roadmap:', roadmapId);
    // Handle approval logic
  };

  const handleReject = (roadmapId: string) => {
    console.log('Rejecting roadmap:', roadmapId);
    // Handle rejection logic
  };

  const handleRequestChanges = (roadmapId: string) => {
    console.log('Requesting changes for roadmap:', roadmapId);
    // Handle request changes logic
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedRoadmapData = pendingRoadmaps.find(rm => rm.id === selectedRoadmap);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap Approvals" userType="mentor" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Roadmap Approvals</h1>
              <p className="text-gray-600">Review and approve student learning roadmaps</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Roadmap List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Pending Approvals ({pendingRoadmaps.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {pendingRoadmaps.map((roadmap) => (
                      <div
                        key={roadmap.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedRoadmap === roadmap.id ? 'bg-yellow-50 border-r-4 border-yellow-600' : ''
                          }`}
                        onClick={() => setSelectedRoadmap(roadmap.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{roadmap.student.name}</h4>
                            <p className="text-sm text-gray-500">{roadmap.student.wing}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {formatDate(roadmap.submittedAt)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{roadmap.goal}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{roadmap.totalWeeks} weeks</span>
                          <span>{roadmap.phases.length} phases</span>
                          <span>€{roadmap.monthlyPrice}/month</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap Details */}
              <div className="lg:col-span-2">
                {selectedRoadmapData ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{selectedRoadmapData.goal}</h2>
                          <p className="text-gray-600 mt-1">Submitted by {selectedRoadmapData.student.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(selectedRoadmapData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestChanges(selectedRoadmapData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => handleReject(selectedRoadmapData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>

                      {/* Student & Trainer Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Student</div>
                            <div className="text-sm text-gray-600">{selectedRoadmapData.student.name}</div>
                            <div className="text-xs text-gray-500">{selectedRoadmapData.student.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Trainer</div>
                            <div className="text-sm text-gray-600">{selectedRoadmapData.trainer.name}</div>
                            <div className="text-xs text-gray-500">{selectedRoadmapData.trainer.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Roadmap Summary */}
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Roadmap Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{selectedRoadmapData.phases.length}</div>
                          <div className="text-sm text-blue-600">Phases</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedRoadmapData.totalWeeks}</div>
                          <div className="text-sm text-green-600">Weeks</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{selectedRoadmapData.totalSessions}</div>
                          <div className="text-sm text-purple-600">Sessions</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">€{selectedRoadmapData.monthlyPrice}</div>
                          <div className="text-sm text-yellow-600">Monthly</div>
                        </div>
                      </div>
                    </div>

                    {/* Phases Details */}
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Learning Phases</h3>
                      <div className="space-y-4">
                        {selectedRoadmapData.phases.map((phase, index) => (
                          <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">{phase.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{phase.estimatedWeeks} weeks</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    <span>{phase.sessions} sessions</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Target className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Roadmap</h3>
                    <p className="text-gray-600">Choose a roadmap from the list to review its details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}