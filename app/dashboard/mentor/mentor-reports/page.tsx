'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Send, FileText, Calendar, Users, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  students: number;
  performance: number;
}

interface MentorReport {
  id: string;
  reportType: 'monthly' | 'quarterly' | 'incident' | 'performance';
  period: string;
  trainersOverview: string;
  studentsProgress: string;
  keyAchievements: string;
  challenges: string;
  recommendations: string;
  metrics: {
    totalTrainers: number;
    activeStudents: number;
    completionRate: number;
    satisfactionScore: number;
  };
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export default function MentorReportsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    reportType: 'monthly' as 'monthly' | 'quarterly' | 'incident' | 'performance',
    period: '',
    trainersOverview: '',
    studentsProgress: '',
    keyAchievements: '',
    challenges: '',
    recommendations: '',
    totalTrainers: 0,
    activeStudents: 0,
    completionRate: 0,
    satisfactionScore: 0
  });

  const trainers: Trainer[] = [
    {
      id: 'tr-1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      specialization: 'Full Stack Development',
      students: 15,
      performance: 92
    },
    {
      id: 'tr-2',
      name: 'Michael Chen',
      avatar: 'MC',
      specialization: 'Backend Development',
      students: 12,
      performance: 88
    },
    {
      id: 'tr-3',
      name: 'Emma Williams',
      avatar: 'EW',
      specialization: 'Frontend Development',
      students: 18,
      performance: 95
    }
  ];

  const reports: MentorReport[] = [
    {
      id: 'mr-1',
      reportType: 'monthly',
      period: 'January 2024',
      trainersOverview: 'All 3 trainers are performing excellently. Sarah and Emma have exceeded their student capacity targets, while Michael is maintaining consistent quality with his backend specialization students.',
      studentsProgress: 'Overall student progress is strong with 89% completion rate. 45 students are actively enrolled across all trainers. Notable improvements in JavaScript and React comprehension.',
      keyAchievements: 'Successfully onboarded 2 new trainers, achieved 95% student satisfaction score, completed 156 training sessions, launched advanced React curriculum.',
      challenges: 'High demand for backend training exceeding current capacity. Some students struggling with advanced JavaScript concepts. Need additional resources for database training.',
      recommendations: 'Recruit 1 additional backend trainer, develop supplementary JavaScript resources, consider database specialization track, implement peer learning sessions.',
      metrics: {
        totalTrainers: 3,
        activeStudents: 45,
        completionRate: 89,
        satisfactionScore: 95
      },
      submittedAt: '2024-01-31T17:00:00Z',
      status: 'submitted'
    },
    {
      id: 'mr-2',
      reportType: 'quarterly',
      period: 'Q4 2023',
      trainersOverview: 'Quarter ended with strong trainer performance across the board. All trainers met their KPIs and student satisfaction remained high.',
      studentsProgress: 'Quarterly cohort of 67 students with 91% completion rate. Strong performance in frontend technologies, moderate progress in backend concepts.',
      keyAchievements: 'Launched new curriculum modules, achieved record student enrollment, maintained 4.8/5 trainer ratings, successful career placement for 78% of graduates.',
      challenges: 'Scaling challenges with increased enrollment, need for more specialized training tracks, resource allocation for advanced topics.',
      recommendations: 'Expand trainer team, develop specialized tracks, invest in advanced learning resources, implement mentorship program.',
      metrics: {
        totalTrainers: 3,
        activeStudents: 67,
        completionRate: 91,
        satisfactionScore: 96
      },
      submittedAt: '2023-12-31T18:00:00Z',
      status: 'reviewed'
    }
  ];

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: MentorReport = {
      id: `mr-${Date.now()}`,
      reportType: formData.reportType,
      period: formData.period,
      trainersOverview: formData.trainersOverview,
      studentsProgress: formData.studentsProgress,
      keyAchievements: formData.keyAchievements,
      challenges: formData.challenges,
      recommendations: formData.recommendations,
      metrics: {
        totalTrainers: formData.totalTrainers,
        activeStudents: formData.activeStudents,
        completionRate: formData.completionRate,
        satisfactionScore: formData.satisfactionScore
      },
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    console.log('Submitting mentor report:', newReport);
    
    // Reset form
    setFormData({
      reportType: 'monthly',
      period: '',
      trainersOverview: '',
      studentsProgress: '',
      keyAchievements: '',
      challenges: '',
      recommendations: '',
      totalTrainers: 0,
      activeStudents: 0,
      completionRate: 0,
      satisfactionScore: 0
    });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'quarterly': return 'bg-purple-100 text-purple-800';
      case 'incident': return 'bg-red-100 text-red-800';
      case 'performance': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Mentor Reports" userType="mentor" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">Wing Reports</h1>
                  <p className="text-sm text-gray-500">Submit comprehensive reports to wing administration about trainer performance and student progress.</p>
                </div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-medium shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Create Report
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Trainers</p>
                    <p className="text-2xl font-bold text-gray-900">{trainers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{trainers.reduce((sum, t) => sum + t.students, 0)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(trainers.reduce((sum, t) => sum + t.performance, 0) / trainers.length)}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports Submitted</p>
                    <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Create Report Form */}
            {showCreateForm && (
              <div className="mb-8 bg-white rounded-lg shadow-lg border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Create Wing Report</h3>
                    <p className="text-sm text-gray-400 mt-1">Provide comprehensive overview of wing performance and trainer activities.</p>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-full"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitReport} className="space-y-6">
                  {/* Report Type and Period */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                      <select
                        value={formData.reportType}
                        onChange={(e) => setFormData({ ...formData, reportType: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        required
                      >
                        <option value="monthly">Monthly Report</option>
                        <option value="quarterly">Quarterly Report</option>
                        <option value="incident">Incident Report</option>
                        <option value="performance">Performance Review</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Period</label>
                      <input
                        type="text"
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        placeholder="e.g., January 2024, Q1 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total Trainers</label>
                      <input
                        type="number"
                        value={formData.totalTrainers}
                        onChange={(e) => setFormData({ ...formData, totalTrainers: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Active Students</label>
                      <input
                        type="number"
                        value={formData.activeStudents}
                        onChange={(e) => setFormData({ ...formData, activeStudents: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Completion Rate (%)</label>
                      <input
                        type="number"
                        value={formData.completionRate}
                        onChange={(e) => setFormData({ ...formData, completionRate: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Satisfaction Score (%)</label>
                      <input
                        type="number"
                        value={formData.satisfactionScore}
                        onChange={(e) => setFormData({ ...formData, satisfactionScore: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                      />
                    </div>
                  </div>

                  {/* Trainers Overview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trainers Overview</label>
                    <textarea
                      value={formData.trainersOverview}
                      onChange={(e) => setFormData({ ...formData, trainersOverview: e.target.value })}
                      placeholder="Provide an overview of trainer performance, activities, and status..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Students Progress */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Students Progress</label>
                    <textarea
                      value={formData.studentsProgress}
                      onChange={(e) => setFormData({ ...formData, studentsProgress: e.target.value })}
                      placeholder="Describe overall student progress, completion rates, and learning outcomes..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
                    <textarea
                      value={formData.keyAchievements}
                      onChange={(e) => setFormData({ ...formData, keyAchievements: e.target.value })}
                      placeholder="Highlight major accomplishments, milestones, and successes..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  {/* Challenges */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges & Issues</label>
                    <textarea
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      placeholder="Describe any challenges, issues, or areas needing attention..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  {/* Recommendations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                    <textarea
                      value={formData.recommendations}
                      onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                      placeholder="Provide recommendations for improvements, resource needs, or strategic changes..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-600 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-yellow-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit to Wing Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Submitted Reports</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.reportType)}`}>
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report
                          </span>
                          <span className="text-lg font-semibold text-gray-900">{report.period}</span>
                        </div>
                        <p className="text-sm text-gray-500">Submitted {formatDate(report.submittedAt)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{report.metrics.totalTrainers}</div>
                        <div className="text-xs text-gray-500">Trainers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{report.metrics.activeStudents}</div>
                        <div className="text-xs text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{report.metrics.completionRate}%</div>
                        <div className="text-xs text-gray-500">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{report.metrics.satisfactionScore}%</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Trainers Overview:</h5>
                        <p className="text-gray-700 text-sm">{report.trainersOverview}</p>
                      </div>
                      
                      {report.keyAchievements && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Key Achievements:
                          </h5>
                          <p className="text-gray-700 text-sm">{report.keyAchievements}</p>
                        </div>
                      )}
                      
                      {report.challenges && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            Challenges:
                          </h5>
                          <p className="text-gray-700 text-sm">{report.challenges}</p>
                        </div>
                      )}
                      
                      {report.recommendations && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-1">
                            <Target className="w-4 h-4 text-blue-500" />
                            Recommendations:
                          </h5>
                          <p className="text-gray-700 text-sm">{report.recommendations}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}