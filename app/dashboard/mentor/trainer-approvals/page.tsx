'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { CheckCircle, XCircle, Clock, User, Star, Award, BookOpen, Calendar, Eye, MessageSquare, FileText, Search, Filter, MoreHorizontal, X } from 'lucide-react';

export default function MentorTrainerApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTrainerForModal, setSelectedTrainerForModal] = useState<string | null>(null);

  const pendingTrainers = [
    {
      id: 'tr-001',
      name: 'Alex Thompson',
      email: 'alex.thompson@example.com',
      wing: 'Programming Wing',
      submittedAt: '2024-01-22T09:15:00Z',
      status: 'pending',
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
      motivation: 'Passionate about sharing knowledge and helping others grow in their tech careers.',
      rating: 4.8,
      completedProjects: 12,
      languages: ['English', 'Spanish'],
      timezone: 'PST (UTC-8)'
    },
    {
      id: 'tr-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      wing: 'Design Wing',
      submittedAt: '2024-01-21T14:30:00Z',
      status: 'pending',
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
      motivation: 'Love helping aspiring designers develop their creative and technical skills.',
      rating: 4.9,
      completedProjects: 8,
      languages: ['English', 'Spanish', 'Portuguese'],
      timezone: 'EST (UTC-5)'
    },
    {
      id: 'tr-003',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      wing: 'Data Science Wing',
      submittedAt: '2024-01-20T11:45:00Z',
      status: 'under_review',
      experience: '6 years',
      expertise: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      education: 'Ph.D. Data Science - MIT',
      previousRoles: [
        'Data Scientist at Netflix (4 years)',
        'ML Engineer at Tesla (2 years)'
      ],
      certifications: [
        'Google Cloud ML Engineer',
        'AWS Machine Learning Specialty'
      ],
      proposedCapacity: 18,
      hourlyRate: 55,
      availability: 'Full-time (35 hours/week)',
      portfolio: 'https://jameswilson.ai',
      references: [
        {
          name: 'Lisa Park',
          role: 'Head of Data Science at Netflix',
          contact: 'lisa.park@netflix.com'
        }
      ],
      teachingExperience: 'University guest lecturer, online course creator with 10k+ students',
      motivation: 'Excited to democratize AI education and make complex concepts accessible.',
      rating: 4.7,
      completedProjects: 15,
      languages: ['English', 'Mandarin'],
      timezone: 'PST (UTC-8)'
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

  const handleViewDetails = (trainerId: string) => {
    setSelectedTrainerForModal(trainerId);
    setShowDetailsModal(true);
  };

  const handleSendMessage = (trainerId: string) => {
    console.log('Sending message to trainer:', trainerId);
    // Handle message logic
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setSelectedTrainerForModal(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      under_review: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Filter trainers based on search and status
  const filteredTrainers = pendingTrainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.wing.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trainer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTrainerData = pendingTrainers.find(tr => tr.id === selectedTrainerForModal);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainer Approvals" userType="mentor" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Trainer Applications</h1>
              <p className="text-sm text-gray-500">Review and vet new trainer candidates for your wing.</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search trainers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Full Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Applications ({filteredTrainers.length})</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trainer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wing
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTrainers.map((trainer) => (
                      <tr key={trainer.id} className="hover:bg-gray-50">
                        {/* Trainer Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-yellow-800">
                                  {trainer.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                              <div className="text-sm text-gray-500">{trainer.email}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{trainer.rating}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Wing */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {trainer.wing}
                        </td>

                        {/* Experience */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{trainer.experience}</div>
                          <div className="text-xs text-gray-500">{trainer.completedProjects} projects</div>
                        </td>



                        {/* Rate */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="font-medium">€{trainer.hourlyRate}/hr</div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(trainer.status)}
                        </td>

                        {/* Submitted Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(trainer.submittedAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(trainer.id)}
                              className="bg-yellow-600 p-1 hover:bg-yellow-700 rounded px-4"
                              title="View Details"
                            >
                              View
                            </button>


                            <button
                              onClick={() => handleReject(trainer.id)}
                              className="bg-red-600 hover:bg-red-900 px-4 py-1 rounded"
                              title="Reject"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTrainers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No trainer applications found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedTrainerData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-yellow-800">
                      {selectedTrainerData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{selectedTrainerData.name}</h2>
                  <p className="text-sm text-gray-600">{selectedTrainerData.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{selectedTrainerData.rating} rating</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{selectedTrainerData.wing}</span>
                  </div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex gap-x-2'>
                  <button className='bg-green-600 px-4 py-1 rounded-lg hover:bg-green-700'>
                    Approve
                  </button>
                  <button className='bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700'>
                    Reject
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedTrainerData.experience}</div>
                  <div className="text-sm text-blue-600">Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedTrainerData.proposedCapacity}</div>
                  <div className="text-sm text-green-600">Max Students</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">€{selectedTrainerData.hourlyRate}</div>
                  <div className="text-sm text-purple-600">Hourly Rate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{selectedTrainerData.expertise.length}</div>
                  <div className="text-sm text-yellow-600">Skills</div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Application Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Application Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedTrainerData.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="text-gray-900">{formatDate(selectedTrainerData.submittedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timezone:</span>
                        <span className="text-gray-900">{selectedTrainerData.timezone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Education
                    </h3>
                    <p className="text-gray-700">{selectedTrainerData.education}</p>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      Availability
                    </h3>
                    <p className="text-gray-700">{selectedTrainerData.availability}</p>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrainerData.languages.map((lang, index) => (
                        <span key={index} className="inline-flex px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical Expertise */}
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
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Previous Roles */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Previous Experience</h3>
                    <div className="space-y-3">
                      {selectedTrainerData.previousRoles.map((role, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                          <span className="text-gray-700">{role}</span>
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

                  {/* Portfolio */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Portfolio</h3>
                    <a
                      href={selectedTrainerData.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 font-medium break-all"
                    >
                      {selectedTrainerData.portfolio}
                    </a>
                  </div>
                </div>
              </div>

              {/* Full Width Sections */}
              <div className="mt-8 space-y-6">
                {/* Teaching Experience */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Teaching Experience</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTrainerData.teachingExperience}</p>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Motivation</h3>
                  <p className="text-gray-700 italic bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    "{selectedTrainerData.motivation}"
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => handleSendMessage(selectedTrainerData.id)}
                className="flex items-center gap-2 px-4 py-2 text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
              <button
                onClick={() => handleRequestChanges(selectedTrainerData.id)}
                className="flex items-center gap-2 px-4 py-2 text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Request Changes
              </button>
              <button
                onClick={() => handleReject(selectedTrainerData.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedTrainerData.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}