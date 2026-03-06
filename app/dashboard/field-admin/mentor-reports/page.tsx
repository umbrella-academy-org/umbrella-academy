'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Eye, Download, MessageSquare, CheckCircle, AlertTriangle, Target, TrendingUp, Users, FileText, X } from 'lucide-react';

interface MentorReport {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
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
  status: 'pending' | 'reviewed' | 'approved';
  fieldAdminNotes?: string;
}

export default function FieldAdminMentorReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [adminNotes, setAdminNotes] = useState('');

  const reports: MentorReport[] = [
    {
      id: 'mr-1',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Sarah Wilson',
      mentorAvatar: 'SW',
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
      status: 'pending'
    },
    {
      id: 'mr-2',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Sarah Wilson',
      mentorAvatar: 'SW',
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
      status: 'approved',
      fieldAdminNotes: 'Excellent quarterly performance. Approved budget increase for trainer expansion and resource development.'
    },
    {
      id: 'mr-3',
      mentorId: 'mentor-2',
      mentorName: 'Prof. Michael Chen',
      mentorAvatar: 'MC',
      reportType: 'incident',
      period: 'January 15, 2024',
      trainersOverview: 'Incident involving trainer availability conflict during peak session hours. Resolved through schedule adjustment and backup trainer assignment.',
      studentsProgress: 'Minimal impact on student progress due to quick resolution. All affected sessions were rescheduled within 24 hours.',
      keyAchievements: 'Quick incident resolution, maintained student satisfaction, implemented backup trainer protocol.',
      challenges: 'Need better trainer scheduling system, backup trainer availability during peak hours.',
      recommendations: 'Implement automated scheduling system, maintain pool of backup trainers, create incident response protocol.',
      metrics: {
        totalTrainers: 4,
        activeStudents: 52,
        completionRate: 87,
        satisfactionScore: 92
      },
      submittedAt: '2024-01-16T09:30:00Z',
      status: 'reviewed',
      fieldAdminNotes: 'Good incident handling. Approved implementation of automated scheduling system.'
    }
  ];

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.reportType === filterType;
    return statusMatch && typeMatch;
  });

  const selectedReportData = reports.find(r => r.id === selectedReport);

  const handleStatusUpdate = (reportId: string, newStatus: 'reviewed' | 'approved') => {
    console.log(`Updating report ${reportId} status to ${newStatus}`);
    // Handle status update logic
  };

  const handleAddNotes = (reportId: string) => {
    console.log(`Adding notes to report ${reportId}:`, adminNotes);
    // Handle adding admin notes
    setAdminNotes('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'reviewed': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-gray-100 text-gray-800';
      case 'quarterly': return 'bg-gray-100 text-gray-800';
      case 'incident': return 'bg-gray-100 text-gray-800';
      case 'performance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate summary stats
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const avgCompletionRate = Math.round(reports.reduce((sum, r) => sum + r.metrics.completionRate, 0) / reports.length);
  const avgSatisfactionScore = Math.round(reports.reduce((sum, r) => sum + r.metrics.satisfactionScore, 0) / reports.length);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Mentor Reports" userType="field-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-amber-900 mb-1">Mentor Reports</h1>
              <p className="text-sm text-gray-500">Review and manage reports submitted by mentors in your field.</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-amber-900">{totalReports}</p>
                  </div>
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-amber-900">{pendingReports}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                    <p className="text-2xl font-bold text-amber-900">{avgCompletionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                    <p className="text-2xl font-bold text-amber-900">{avgSatisfactionScore}%</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-amber-900">Reports ({filteredReports.length})</h3>

                  {/* Filters */}
                  <div className="flex gap-3">
                    <div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="approved">Approved</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      >
                        <option value="all">All Types</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="incident">Incident</option>
                        <option value="performance">Performance</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Report Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500  ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-amber-900">
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report - {report.period}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.metrics.totalTrainers} trainers, {report.metrics.activeStudents} students
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-800">
                                  {report.mentorAvatar}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-amber-900">{report.mentorName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.reportType)}`}>
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {formatDate(report.submittedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedReport(report.id)}
                            className="text-gray-600 hover:text-amber-900 p-1 hover:bg-gray-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No reports found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Report Details Modal */}
      {selectedReportData && (
        <div className="fixed inset-0 bg-amber-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedReportData.mentorAvatar}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-amber-900">{selectedReportData.mentorName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReportTypeColor(selectedReportData.reportType)}`}>
                      {selectedReportData.reportType.charAt(0).toUpperCase() + selectedReportData.reportType.slice(1)} Report
                    </span>
                    <span className="text-lg font-semibold text-amber-900">{selectedReportData.period}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedReportData.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(selectedReportData.id, 'reviewed')}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Mark Reviewed
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedReportData.id, 'approved')}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{selectedReportData.metrics.totalTrainers}</div>
                  <div className="text-sm text-gray-600">Trainers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{selectedReportData.metrics.activeStudents}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{selectedReportData.metrics.completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{selectedReportData.metrics.satisfactionScore}%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>

              {/* Report Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">Trainers Overview</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReportData.trainersOverview}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">Students Progress</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReportData.studentsProgress}</p>
                </div>

                {selectedReportData.keyAchievements && (
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                      Key Achievements
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReportData.keyAchievements}</p>
                  </div>
                )}

                {selectedReportData.challenges && (
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
                      <AlertTriangle className="w-5 h-5 text-gray-500" />
                      Challenges & Issues
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReportData.challenges}</p>
                  </div>
                )}

                {selectedReportData.recommendations && (
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
                      <Target className="w-5 h-5 text-gray-500" />
                      Recommendations
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReportData.recommendations}</p>
                  </div>
                )}

                {/* Admin Notes */}
                <div className="border-t pt-6">
                  <h3 className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                    Field Admin Notes
                  </h3>
                  {selectedReportData.fieldAdminNotes ? (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                      <p className="text-gray-800">{selectedReportData.fieldAdminNotes}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mb-4">No admin notes yet.</p>
                  )}

                  <div className="flex gap-3">
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add your notes or feedback..."
                      rows={3}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleAddNotes(selectedReportData.id)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      disabled={!adminNotes.trim()}
                    >
                      Add Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}