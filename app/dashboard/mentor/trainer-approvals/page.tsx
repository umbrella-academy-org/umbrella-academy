'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { CheckCircle, XCircle, Clock, User, Star, Award, BookOpen, Calendar } from 'lucide-react';

export default function MentorTrainerApprovalsPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

  const pendingTrainers = [
    {
      id: 'tr-001',
      name: 'Alex Thompson',
      email: 'alex.thompson@example.com',
      wing: 'Programming Wing',
      submittedAt: '2024-01-22T09:15:00Z',
      experience: '5 years',
      expertise: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      education: 'M.S. Computer Science - Stanford University',
      previousRoles: [
        'Senior Developer at Google (3 years)',
        'Full-Stack Developer at Startup Inc. (2 years)'
      ],
      certifications: [
        'AWS Certified Solutions Architect',
        'React Professional Certification'
      ],
      proposedCapacity: 20,
      hourlyRate: 45,
      availability: 'Full-time (40 hours/week)',
      portfolio: 'https://alexthompson.dev',
      references: [
        {
          name: 'Sarah Johnson',
          role: 'Engineering Manager at Google',
          contact: 'sarah.j@google.com'
        },
        {
          name: 'Mike Wilson',
          role: 'CTO at Startup Inc.',
          contact: 'mike@startup.com'
        }
      ],
      teachingExperience: 'Mentored 15+ junior developers, conducted technical workshops',
      motivation: 'Passionate about sharing knowledge and helping others grow in their tech careers.'
    },
    {
      id: 'tr-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      wing: 'Design Wing',
      submittedAt: '2024-01-21T14:30:00Z',
      experience: '7 years',
      expertise: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Design Systems'],
      education: 'B.A. Graphic Design - Art Institute',
      previousRoles: [
        'Senior UX Designer at Apple (4 years)',
        'Product Designer at Airbnb (3 years)'
      ],
      certifications: [
        'Google UX Design Certificate',
        'Adobe Certified Expert'
      ],
      proposedCapacity: 15,
      hourlyRate: 50,
      availability: 'Part-time (25 hours/week)',
      portfolio: 'https://mariagarcia.design',
      references: [
        {
          name: 'David Chen',
          role: 'Design Director at Apple',
          contact: 'david.chen@apple.com'
        }
      ],
      teachingExperience: 'Led design workshops at conferences, mentored design interns',
      motivation: 'Love helping aspiring designers develop their creative and technical skills.'
    }
  ];

  const handleApprove = (trainerId: string) => {
    console.log('Approving trainer:', trainerId);
    // Handle approval logic
  };

  const handleReject = (trainerId: string) => {
    console.log('Rejecting trainer:', trainerId);
    // Handle rejection logic
  };

  const handleRequestChanges = (trainerId: string) => {
    console.log('Requesting changes for trainer:', trainerId);
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

  const selectedTrainerData = pendingTrainers.find(tr => tr.id === selectedTrainer);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainer Approvals" userType="mentor" />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header breadcrumb="Trainer Approvals" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Trainer Approvals</h1>
              <p className="text-gray-600">Review and approve trainer applications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trainer Applications List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Pending Applications ({pendingTrainers.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {pendingTrainers.map((trainer) => (
                      <div
                        key={trainer.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedTrainer === trainer.id ? 'bg-yellow-50 border-r-4 border-yellow-600' : ''
                        }`}
                        onClick={() => setSelectedTrainer(trainer.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{trainer.name}</h4>
                            <p className="text-sm text-gray-500">{trainer.wing}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {formatDate(trainer.submittedAt)}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {trainer.expertise.slice(0, 2).map((skill, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {trainer.expertise.length > 2 && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              +{trainer.expertise.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{trainer.experience} exp</span>
                          <span>{trainer.proposedCapacity} students</span>
                          <span>€{trainer.hourlyRate}/hr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trainer Details */}
              <div className="lg:col-span-2">
                {selectedTrainerData ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{selectedTrainerData.name}</h2>
                          <p className="text-gray-600 mt-1">{selectedTrainerData.email}</p>
                          <p className="text-sm text-gray-500">{selectedTrainerData.wing}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(selectedTrainerData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestChanges(selectedTrainerData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => handleReject(selectedTrainerData.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{selectedTrainerData.experience}</div>
                          <div className="text-sm text-blue-600">Experience</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedTrainerData.proposedCapacity}</div>
                          <div className="text-sm text-green-600">Max Students</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">€{selectedTrainerData.hourlyRate}</div>
                          <div className="text-sm text-purple-600">Hourly Rate</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{selectedTrainerData.expertise.length}</div>
                          <div className="text-sm text-yellow-600">Skills</div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Information */}
                    <div className="p-6 space-y-6">
                      {/* Education & Experience */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            Education
                          </h3>
                          <p className="text-gray-700">{selectedTrainerData.education}</p>
                        </div>
                        <div>
                          <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                            <Calendar className="w-5 h-5 text-green-600" />
                            Availability
                          </h3>
                          <p className="text-gray-700">{selectedTrainerData.availability}</p>
                        </div>
                      </div>

                      {/* Expertise */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Technical Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedTrainerData.expertise.map((skill, index) => (
                            <span key={index} className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Previous Roles */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Previous Experience</h3>
                        <div className="space-y-2">
                          {selectedTrainerData.previousRoles.map((role, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                              {role}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                          <Award className="w-5 h-5 text-purple-600" />
                          Certifications
                        </h3>
                        <div className="space-y-2">
                          {selectedTrainerData.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Teaching Experience */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Teaching Experience</h3>
                        <p className="text-gray-700">{selectedTrainerData.teachingExperience}</p>
                      </div>

                      {/* Motivation */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Motivation</h3>
                        <p className="text-gray-700 italic">"{selectedTrainerData.motivation}"</p>
                      </div>

                      {/* References */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">References</h3>
                        <div className="space-y-3">
                          {selectedTrainerData.references.map((ref, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-medium text-gray-900">{ref.name}</div>
                              <div className="text-sm text-gray-600">{ref.role}</div>
                              <div className="text-sm text-gray-500">{ref.contact}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio Link */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Portfolio</h3>
                        <a 
                          href={selectedTrainerData.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          {selectedTrainerData.portfolio}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <User className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Trainer Application</h3>
                    <p className="text-gray-600">Choose an application from the list to review the details</p>
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