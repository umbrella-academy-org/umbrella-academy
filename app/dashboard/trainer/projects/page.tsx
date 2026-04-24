'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useProjects } from '@/contexts/ProjectContext';
import { useUsers } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { projectService } from '@/services/project';
import { UserRole, ProjectStatus, type Project } from '@/types';
import { 
  Folder, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Hourglass, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  Wrench,
  User,
  Calendar,
  Search,
  Filter,
  Grid,
  List,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Target,
  Award,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function TrainerProjectsPage() {
  const { user } = useAuth();
  const { students } = useUsers();
  const { projects, refreshProjects } = useProjects();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [trainerFeedback, setTrainerFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter projects for trainer's students
  const trainerStudentIds = students
    .filter(s => s.assignedTrainerId === user?._id)
    .map(s => s._id);
  
  const trainerProjects = projects.filter(p => trainerStudentIds.includes(p.studentId));

  // Apply filters
  const filteredProjects = trainerProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: trainerProjects.length,
    approved: trainerProjects.filter(p => p.status === ProjectStatus.APPROVED).length,
    pending: trainerProjects.filter(p => p.status === ProjectStatus.PENDING_APPROVAL).length,
    rejected: trainerProjects.filter(p => p.status === ProjectStatus.REJECTED).length,
    draft: trainerProjects.filter(p => p.status === ProjectStatus.DRAFT).length,
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.APPROVED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case ProjectStatus.PENDING_APPROVAL:
        return <Hourglass className="w-5 h-5 text-yellow-600" />;
      case ProjectStatus.REJECTED:
        return <XCircle className="w-5 h-5 text-red-600" />;
      case ProjectStatus.DRAFT:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.APPROVED:
        return 'bg-green-50 border-green-200 text-green-700';
      case ProjectStatus.PENDING_APPROVAL:
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case ProjectStatus.REJECTED:
        return 'bg-red-50 border-red-200 text-red-700';
      case ProjectStatus.DRAFT:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.APPROVED:
        return 'Approved';
      case ProjectStatus.PENDING_APPROVAL:
        return 'Pending Approval';
      case ProjectStatus.REJECTED:
        return 'Rejected';
      case ProjectStatus.DRAFT:
        return 'Draft';
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s._id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  const handleApprove = async () => {
    if (!selectedProject) return;
    setIsProcessing(true);
    try {
      await projectService.approveProject(selectedProject.id, trainerFeedback);
      await refreshProjects();
      setSelectedProject(null);
      setTrainerFeedback('');
    } catch (error) {
      console.error('Failed to approve project:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedProject || !trainerFeedback.trim()) return;
    setIsProcessing(true);
    try {
      await projectService.rejectProject(selectedProject.id, trainerFeedback);
      await refreshProjects();
      setSelectedProject(null);
      setTrainerFeedback('');
    } catch (error) {
      console.error('Failed to reject project:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Projects" userType={UserRole.TRAINER} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Student Projects</h1>
              <p className="text-gray-600 mt-1">Review and manage all projects submitted by your students</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: 'Total', value: stats.total, icon: Folder, color: 'text-gray-600', bg: 'bg-gray-100' },
                { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
                { label: 'Pending', value: stats.pending, icon: Hourglass, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
                { label: 'Drafts', value: stats.draft, icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value={ProjectStatus.APPROVED}>Approved</option>
                    <option value={ProjectStatus.PENDING_APPROVAL}>Pending</option>
                    <option value={ProjectStatus.REJECTED}>Rejected</option>
                    <option value={ProjectStatus.DRAFT}>Draft</option>
                  </select>
                </div>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-50 text-yellow-600' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-yellow-50 text-yellow-600' : 'bg-white text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Display */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Folder className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-600">
                  {trainerProjects.length === 0 
                    ? "Your students haven't submitted any projects yet." 
                    : "No projects match your filters."}
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => { setSelectedProject(project); setTrainerFeedback(project.trainerFeedback || ''); }}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-300 transition-all cursor-pointer group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(project.status)}
                          <span>{getStatusLabel(project.status)}</span>
                        </div>
                      </div>
                      {project.isPublic && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          Public
                        </span>
                      )}
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-yellow-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {getStudentName(project.studentId)}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-yellow-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{project.category}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tools */}
                    {project.toolsUsed && project.toolsUsed.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.toolsUsed.slice(0, 3).map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                          {project.toolsUsed.length > 3 && (
                            <span className="px-2 py-1 text-gray-500 text-xs">
                              +{project.toolsUsed.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tools</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        onClick={() => { setSelectedProject(project); setTrainerFeedback(project.trainerFeedback || ''); }}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{project.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700">{getStudentName(project.studentId)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700">{project.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                            {getStatusLabel(project.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {project.toolsUsed?.slice(0, 2).map((tool, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                {tool}
                              </span>
                            ))}
                            {project.toolsUsed && project.toolsUsed.length > 2 && (
                              <span className="text-xs text-gray-500">+{project.toolsUsed.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProject.status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedProject.status)}
                      <span>{getStatusLabel(selectedProject.status)}</span>
                    </div>
                  </span>
                  {selectedProject.isPublic && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      Public
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {getStudentName(selectedProject.studentId)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {selectedProject.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProject.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => { setSelectedProject(null); setTrainerFeedback(''); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Student Role */}
              {selectedProject.studentRole && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h3 className="text-sm font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Student's Role
                  </h3>
                  <p className="text-yellow-700">{selectedProject.studentRole}</p>
                </div>
              )}

              {/* Tools Used */}
              {selectedProject.toolsUsed && selectedProject.toolsUsed.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.toolsUsed.map((tool, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              {selectedProject.evidence && Object.values(selectedProject.evidence).some(v => v) && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Project Links
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.evidence.demoLink && (
                      <a 
                        href={selectedProject.evidence.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                    {selectedProject.evidence.videoDemoLink && (
                      <a 
                        href={selectedProject.evidence.videoDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Video Demo</span>
                      </a>
                    )}
                    {selectedProject.evidence.designLink && (
                      <a 
                        href={selectedProject.evidence.designLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Design</span>
                      </a>
                    )}
                    {selectedProject.evidence.documentationLink && (
                      <a 
                        href={selectedProject.evidence.documentationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Documentation</span>
                      </a>
                    )}
                    {selectedProject.evidence.fileDownloadLink && (
                      <a 
                        href={selectedProject.evidence.fileDownloadLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Download Files</span>
                      </a>
                    )}
                    {selectedProject.evidence.externalLink && (
                      <a 
                        href={selectedProject.evidence.externalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg text-orange-700 hover:bg-orange-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">External Link</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedProject.attachments && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.attachments.images && selectedProject.attachments.images.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {selectedProject.attachments.images.length} image(s) attached
                      </p>
                    )}
                    {selectedProject.attachments.pdfs && selectedProject.attachments.pdfs.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {selectedProject.attachments.pdfs.length} PDF(s) attached
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Trainer Feedback Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Feedback
                </h3>
                
                {(selectedProject.status as string) === 'pending_approval' ? (
                  // Input for pending projects
                  <>
                    <textarea
                      value={trainerFeedback}
                      onChange={(e) => setTrainerFeedback(e.target.value)}
                      placeholder="Provide your feedback on this project..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                    />
                    
                    {/* Approval Actions */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => { setSelectedProject(null); setTrainerFeedback(''); }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={isProcessing || !trainerFeedback.trim()}
                        className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        {isProcessing ? 'Processing...' : 'Reject'}
                      </button>
                      <button
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {isProcessing ? 'Processing...' : 'Approve'}
                      </button>
                    </div>
                  </>
                ) : (
                  // Show existing feedback for non-pending projects
                  <div className={`p-4 rounded-lg ${
                    (selectedProject.status as string) === 'approved' ? 'bg-green-50 border border-green-200' :
                    (selectedProject.status as string) === 'rejected' ? 'bg-red-50 border border-red-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}>
                    <p className={`text-sm ${
                      (selectedProject.status as string) === 'approved' ? 'text-green-700' :
                      (selectedProject.status as string) === 'rejected' ? 'text-red-700' :
                      'text-gray-700'
                    }`}>
                      {selectedProject.trainerFeedback || 'No feedback provided.'}
                    </p>
                    {selectedProject.approvedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        {(selectedProject.status as string) === 'approved' ? 'Approved' : 'Updated'} on {new Date(selectedProject.approvedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
