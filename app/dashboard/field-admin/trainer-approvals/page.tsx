'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { CheckCircle, XCircle, User, Star, Award, BookOpen, Calendar, MessageSquare, FileText, Search, Filter, X } from 'lucide-react';

export default function FieldAdminTrainerApprovalsPage() {
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
      previousRoles: ['Senior Developer at Google (3 years)', 'Full-Stack Developer at Startup Inc. (2 years)'],
      certifications: ['AWS Certified Solutions Architect', 'React Professional Certification'],
      proposedCapacity: 20,
      hourlyRate: 45,
      availability: 'Full-time (40 hours/week)',
      portfolio: 'https://alexthompson.dev',
      references: [{ name: 'Sarah Johnson', role: 'Engineering Manager at Google', contact: 'sarah.j@google.com' }],
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
      previousRoles: ['Senior UX Designer at Apple (4 years)', 'Product Designer at Airbnb (3 years)'],
      certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
      proposedCapacity: 15,
      hourlyRate: 50,
      availability: 'Part-time (25 hours/week)',
      portfolio: 'https://mariagarcia.design',
      references: [{ name: 'David Chen', role: 'Design Director at Apple', contact: 'david.chen@apple.com' }],
      teachingExperience: 'Led design workshops at conferences, mentored design interns',
      motivation: 'Love helping aspiring designers develop their creative and technical skills.',
      rating: 4.9,
      completedProjects: 8,
      languages: ['English', 'Spanish', 'Portuguese'],
      timezone: 'EST (UTC-5)'
    }
  ];

  const handleApprove = (trainerId: string) => console.log('Approving trainer:', trainerId);
  const handleReject = (trainerId: string) => console.log('Rejecting trainer:', trainerId);
  const handleRequestChanges = (trainerId: string) => console.log('Requesting changes for trainer:', trainerId);
  const handleSendMessage = (trainerId: string) => console.log('Sending message to trainer:', trainerId);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = { pending: 'Pending', under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected' };
    return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{labels[status] || status}</span>;
  };

  const filteredTrainers = pendingTrainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || trainer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trainer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTrainerData = pendingTrainers.find(tr => tr.id === selectedTrainerForModal);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Trainer Approvals" userType="company-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Trainer Applications</h1>
              <p className="text-sm text-gray-500">Review and approve new trainer candidates for your field.</p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search trainers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-white">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Applications ({filteredTrainers.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Trainer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Wing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Submitted</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTrainers.map((trainer) => (
                      <tr key={trainer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                              <span className="text-sm font-medium text-gray-800">{trainer.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                              <div className="text-sm text-gray-500">{trainer.email}</div>
                              <div className="flex items-center gap-1 mt-1"><Star className="w-3 h-3 text-gray-400 fill-current" /><span className="text-xs text-gray-600">{trainer.rating}</span></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.wing}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><div>{trainer.experience}</div><div className="text-xs text-gray-500">{trainer.completedProjects} projects</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RWF {(trainer.hourlyRate * 1000).toLocaleString()}/hr</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(trainer.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(trainer.submittedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setSelectedTrainerForModal(trainer.id); setShowDetailsModal(true); }} className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700">View</button>
                            <button onClick={() => handleReject(trainer.id)} className="bg-gray-100 text-gray-700 px-4 py-1 rounded hover:bg-gray-200">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredTrainers.length === 0 && (
                <div className="text-center py-12 text-gray-500"><User className="w-12 h-12 mx-auto mb-4 text-gray-300" /><p>No trainer applications found</p></div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showDetailsModal && selectedTrainerData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <span className="text-lg font-medium text-gray-800">{selectedTrainerData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedTrainerData.name}</h2>
                  <p className="text-sm text-gray-600">{selectedTrainerData.email} • {selectedTrainerData.wing}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(selectedTrainerData.id)} className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">Approve</button>
                <button onClick={() => handleReject(selectedTrainerData.id)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">Reject</button>
                <button onClick={() => { setShowDetailsModal(false); setSelectedTrainerForModal(null); }} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-600">{selectedTrainerData.experience}</div><div className="text-sm text-gray-600">Experience</div></div>
                <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-600">{selectedTrainerData.proposedCapacity}</div><div className="text-sm text-gray-600">Max Students</div></div>
                <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-600">{selectedTrainerData.rating}</div><div className="text-sm text-gray-600">Rating</div></div>
                <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-600">{selectedTrainerData.expertise.length}</div><div className="text-sm text-gray-600">Skills</div></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div><h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3"><BookOpen className="w-5 h-5 text-gray-600" />Education</h3><p className="text-gray-700">{selectedTrainerData.education}</p></div>
                  <div><h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3"><Calendar className="w-5 h-5 text-gray-600" />Availability</h3><p className="text-gray-700">{selectedTrainerData.availability}</p></div>
                  <div><h3 className="font-semibold text-gray-900 mb-3">Technical Expertise</h3><div className="flex flex-wrap gap-2">{selectedTrainerData.expertise.map((skill, i) => <span key={i} className="inline-flex px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">{skill}</span>)}</div></div>
                </div>
                <div className="space-y-6">
                  <div><h3 className="font-semibold text-gray-900 mb-3">Previous Experience</h3><div className="space-y-3">{selectedTrainerData.previousRoles.map((role, i) => <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"><div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div><span className="text-gray-700">{role}</span></div>)}</div></div>
                  <div><h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3"><Award className="w-5 h-5 text-gray-600" />Certifications</h3><div className="space-y-2">{selectedTrainerData.certifications.map((cert, i) => <div key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-gray-500" />{cert}</div>)}</div></div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div><h3 className="font-semibold text-gray-900 mb-3">Teaching Experience</h3><p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTrainerData.teachingExperience}</p></div>
                <div><h3 className="font-semibold text-gray-900 mb-3">Motivation</h3><p className="text-gray-700 italic bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">"{selectedTrainerData.motivation}"</p></div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button onClick={() => handleSendMessage(selectedTrainerData.id)} className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><MessageSquare className="w-4 h-4" />Send Message</button>
              <button onClick={() => handleRequestChanges(selectedTrainerData.id)} className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><FileText className="w-4 h-4" />Request Changes</button>
              <button onClick={() => handleReject(selectedTrainerData.id)} className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><XCircle className="w-4 h-4" />Reject</button>
              <button onClick={() => handleApprove(selectedTrainerData.id)} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"><CheckCircle className="w-4 h-4" />Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
