'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { useRouter } from 'next/navigation';
import { Student, UserRole } from '@/types';
import Sidebar from '@/components/dashboard/Sidebar';
import { 
  Plus, 
  Download, 
  Share2, 
  Lock,
  Code, 
  Palette, 
  Briefcase, 
  Award,
  Calendar,
  ExternalLink,
  FileText,
  Star,
  CreditCard
} from 'lucide-react';

export default function PortfolioPage() {
  const { user, isAuthenticated } = useAuth();
  const { projects, isLoading } = useProjects();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements'>('projects');

  // Cast user to Student to access subscription status
  const student = user as Student;
  const hasActiveSubscription = student?.hasActiveSubscription ?? false;

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  // Locked state - subscription required
  if (!hasActiveSubscription) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeItem="Portfolio" userType={UserRole.STUDENT} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">My Portfolio</h1>
                <p className="text-gray-600 mt-1">Showcase your work and achievements</p>
              </div>

              {/* Locked Message */}
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Locked</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your portfolio is where you showcase completed projects and achievements. 
                  Subscribe to unlock this feature and build your professional profile.
                </p>
                <button 
                  onClick={() => router.push('/dashboard/student/pay/subscription')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  Subscribe to Unlock (100,000 RWF/month)
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return <Code className="w-5 h-5" />;
      case 'mobile': return <Briefcase className="w-5 h-5" />;
      case 'design': return <Palette className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter approved projects only for display
  const approvedProjects = projects.filter(p => p.status === 'approved');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Portfolio" userType={UserRole.STUDENT} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">My Portfolio</h1>
                <p className="text-gray-600 mt-1">Showcase your approved projects and achievements</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-t-xl">
              <div className="flex">
                {[
                  { id: 'projects', label: 'Projects', count: approvedProjects.length },
                  { id: 'achievements', label: 'Certificates', count: 0 }, // Will be updated when certificate context ready
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 ${
                      activeTab === tab.id
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white border-x border-b border-gray-200 rounded-b-xl p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading projects...</p>
                </div>
              ) : activeTab === 'projects' ? (
                <div>
                  {approvedProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Projects Yet</h3>
                      <p className="text-gray-600 mb-4">Complete milestones and submit projects for trainer approval.</p>
                      <button 
                        onClick={() => router.push('/dashboard/student/roadmap')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                      >
                        Go to Roadmap
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {approvedProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                          {/* Project Header */}
                          <div className="aspect-video bg-gray-100 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span className="text-xs font-medium">{project.category}</span>
                            </div>
                            {project.isPublic && (
                              <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                <span className="text-xs font-medium">Public</span>
                              </div>
                            )}
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="p-4">
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                            
                            {/* Tools Used */}
                            {project.toolsUsed && project.toolsUsed.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {project.toolsUsed.map((tool, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Status & Date */}
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                                {project.status === 'approved' ? 'Approved' : project.status}
                              </span>
                              <span className="text-xs text-gray-500">
                                {project.approvedAt ? new Date(project.approvedAt).toLocaleDateString() : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Achievements/Certificates Tab */
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates Coming Soon</h3>
                  <p className="text-gray-600">Certificates will be auto-generated when you complete milestones.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
