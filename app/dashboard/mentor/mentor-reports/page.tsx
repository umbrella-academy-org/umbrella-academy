'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Eye, Download, FileText, TrendingUp, Users, Target, AlertTriangle, X } from 'lucide-react';

interface WingReport {
  id: string;
  wingId: string;
  wingName: string;
  reportType: 'monthly' | 'quarterly' | 'annual' | 'incident';
  period: string;
  totalTrainers: number;
  totalStudents: number;
  completionRate: number;
  satisfactionScore: number;
  keyMetrics: {
    sessionsCompleted: number;
    averageRating: number;
    retentionRate: number;
    graduationRate: number;
  };
  overview: string;
  achievements: string;
  challenges: string;
  recommendations: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export default function MentorWingReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const reports: WingReport[] = [
    {
      id: 'wr-1',
      wingId: 'wing-1',
      wingName: 'Frontend Development Wing',
      reportType: 'monthly',
      period: 'January 2024',
      totalTrainers: 5,
      totalStudents: 67,
      completionRate: 89,
      satisfactionScore: 94,
      keyMetrics: {
        sessionsCompleted: 234,
        averageRating: 4.7,
        retentionRate: 92,
        graduationRate: 78
      },
      overview: 'Strong performance across all frontend development tracks. React and Vue.js courses showing exceptional student engagement and completion rates.',
      achievements: 'Launched new TypeScript curriculum, achieved 94% student satisfaction, completed 234 training sessions, onboarded 2 new senior trainers.',
      challenges: 'High demand for advanced React patterns exceeding current trainer capacity. Some students struggling with state management concepts.',
      recommendations: 'Recruit additional React specialist trainer, develop supplementary state management resources, implement peer learning sessions.',
      submittedAt: '2024-01-31T18:00:00Z',
      status: 'submitted'
    },
    {
      id: 'wr-2',
      wingId: 'wing-1',
      wingName: 'Frontend Development Wing',
      reportType: 'quarterly',
      period: 'Q4 2023',
      totalTrainers: 4,
      totalStudents: 89,
      completionRate: 91,
      satisfactionScore: 96,
      keyMetrics: {
        sessionsCompleted: 456,
        averageRating: 4.8,
        retentionRate: 94,
        graduationRate: 82
      },
      overview: 'Exceptional quarterly performance with record-high completion and satisfaction rates. All major curriculum updates successfully implemented.',
      achievements: 'Record student enrollment, highest satisfaction scores to date, successful launch of advanced JavaScript track, 82% job placement rate.',
      challenges: 'Scaling challenges with increased enrollment, need for more specialized advanced tracks, resource allocation for emerging technologies.',
      recommendations: 'Expand trainer team by 2 members, develop specialized tracks for emerging frameworks, invest in advanced learning resources.',
      submittedAt: '2023-12-31T17:30:00Z',
      status: 'reviewed'
    },
    {
      id: 'wr-3',
      wingId: 'wing-2',
      wingName: 'Backend Development Wing',
      reportType: 'monthly',
      period: 'January 2024',
      totalTrainers: 4,
      totalStudents: 52,
      completionRate: 85,
      satisfactionScore: 91,
      keyMetrics: {
        sessionsCompleted: 187,
        averageRating: 4.5,
        retentionRate: 88,
        graduationRate: 75
      },
      overview: 'Solid performance in backend development tracks. Node.js and Python courses maintaining good engagement levels.',
      achievements: 'Completed database optimization curriculum, maintained high code quality standards, successful integration of DevOps practices.',
      challenges: 'Complex backend concepts requiring more hands-on practice time, need for updated cloud deployment resources.',
      recommendations: 'Increase practical project allocation, update cloud platform training materials, consider microservices specialization track.',
      submittedAt: '2024-01-31T16:45:00Z',
      status: 'draft'
    }
  ];

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.reportType === filterType;
    return statusMatch && typeMatch;
  });

  const handleViewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setSelectedReportId(null);
  };

  const selectedReport = reports.find(r => r.id === selectedReportId);

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
      case 'annual': return 'bg-green-100 text-green-800';
      case 'incident': return 'bg-red-100 text-red-800';
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

  // Calculate summary stats
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'draft').length;
  const avgCompletionRate = Math.round(reports.reduce((sum, r) => sum + r.completionRate, 0) / reports.length);
  const avgSatisfactionScore = Math.round(reports.reduce((sum, r) => sum + r.satisfactionScore, 0) / reports.length);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wing Reports" userType="mentor" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Wing Reports</h1>
              <p className="text-sm text-gray-500">Monitor and review performance reports for wings under your mentorship.</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingReports}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                    <p className="text-2xl font-bold text-gray-900">{avgCompletionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">{avgSatisfactionScore}%</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Wing Reports ({filteredReports.length})</h3>

                  {/* Filters */}
                  <div className="flex gap-3">
                    <div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="submitted">Submitted</option>
                        <option value="reviewed">Reviewed</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      >
                        <option value="all">All Types</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annual">Annual</option>
                        <option value="incident">Incident</option>
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
                        Wing
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Completion Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                        Status
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
                          <div className="text-sm font-medium text-gray-900">
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report - {report.period}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.totalTrainers} trainers, {report.totalStudents} students
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.wingName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.reportType)}`}>
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{report.completionRate}%</div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${report.completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
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
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedReport.wingName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReportTypeColor(selectedReport.reportType)}`}>
                    {selectedReport.reportType.charAt(0).toUpperCase() + selectedReport.reportType.slice(1)} Report
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{selectedReport.period}</span>
                </div>
              </div>
              <button
                onClick={closeReportModal}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedReport.totalTrainers}</div>
                  <div className="text-sm text-blue-600">Trainers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedReport.totalStudents}</div>
                  <div className="text-sm text-green-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedReport.completionRate}%</div>
                  <div className="text-sm text-purple-600">Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{selectedReport.satisfactionScore}%</div>
                  <div className="text-sm text-yellow-600">Satisfaction</div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-700">{selectedReport.keyMetrics.sessionsCompleted}</div>
                  <div className="text-xs text-blue-700">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-700">{selectedReport.keyMetrics.averageRating}</div>
                  <div className="text-xs text-green-700">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-700">{selectedReport.keyMetrics.retentionRate}%</div>
                  <div className="text-xs text-purple-700">Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-700">{selectedReport.keyMetrics.graduationRate}%</div>
                  <div className="text-xs text-orange-700">Graduation</div>
                </div>
              </div>

              {/* Report Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Overview</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.overview}</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                    <Target className="w-5 h-5 text-green-500" />
                    Key Achievements
                  </h3>
                  <p className="text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-400">{selectedReport.achievements}</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Challenges
                  </h3>
                  <p className="text-gray-700 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">{selectedReport.challenges}</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Recommendations
                  </h3>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">{selectedReport.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}