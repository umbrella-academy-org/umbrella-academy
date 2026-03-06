'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { Eye, X, CheckCircle, XCircle, FileText } from 'lucide-react';

interface TrainerReport {
  id: string;
  studentId: string;
  studentName: string;
  trainerId: string;
  trainerName: string;
  reportType: string;
  sessionDate: string;
  duration: string;
  topicsCovered: string;
  studentPerformance: string;
  ratings: {
    progress: number;
    attendance: number;
    engagement: number;
  };
  challenges: string;
  recommendations: string;
  nextSteps: string;
  roadmapUpdates: string;
  submittedAt: string;
  status: 'pending-review' | 'approved' | 'needs-revision' | 'rejected';
  mentorNotes?: string;
  reviewedAt?: string;
}

export default function MentorReportsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { navigate } = useNavigationWithLoading();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [mentorNotes, setMentorNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock reports data
  const [reports] = useState<TrainerReport[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'Alice Johnson',
      trainerId: '1',
      trainerName: 'John Trainer',
      reportType: 'session',
      sessionDate: '2024-01-15',
      duration: '60 minutes',
      topicsCovered: 'React Hooks, State Management',
      studentPerformance: 'Good understanding of concepts',
      ratings: {
        progress: 4,
        attendance: 5,
        engagement: 4
      },
      challenges: 'Needs more practice with useEffect',
      recommendations: 'Additional exercises on lifecycle methods',
      nextSteps: 'Move to advanced React patterns',
      roadmapUpdates: 'Completed React Basics module',
      submittedAt: '2024-01-15T18:00:00Z',
      status: 'pending-review'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Bob Smith',
      trainerId: '2',
      trainerName: 'Sarah Trainer',
      reportType: 'session',
      sessionDate: '2024-01-14',
      duration: '45 minutes',
      topicsCovered: 'JavaScript ES6 Features',
      studentPerformance: 'Excellent grasp of arrow functions and destructuring',
      ratings: {
        progress: 5,
        attendance: 5,
        engagement: 5
      },
      challenges: 'Minor confusion with async/await',
      recommendations: 'Practice with Promise chains',
      nextSteps: 'Introduction to React fundamentals',
      roadmapUpdates: 'Completed JavaScript Advanced module',
      submittedAt: '2024-01-14T17:30:00Z',
      status: 'approved'
    }
  ]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'mentor') {
    return <div>Access denied</div>;
  }

  const handleViewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setSelectedReportId(null);
  };

  const selectedReport = reports.find(r => r.id === selectedReportId);

  const handleReportAction = (reportId: string, action: 'approve' | 'reject' | 'request-revision') => {
    // Handle report action logic here
    console.log(`${action} report ${reportId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-review': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-gray-100 text-gray-800';
      case 'needs-revision': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
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

  const filteredReports = filterStatus === 'all'
    ? reports
    : reports.filter(report => report.status === filterStatus);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-amber-900 mb-8">Trainer Reports</h1>

          {/* Filter Controls */}
          <div className="mb-6">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Reports</option>
              <option value="pending-review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="needs-revision">Needs Revision</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-amber-900">Reports ({filteredReports.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                      Report Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                      Trainer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  ">
                      Session Date
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
                        <div className="text-sm font-medium text-amber-900">
                          Session Report - {report.topicsCovered.split(',')[0]}
                        </div>
                        <div className="text-sm text-gray-500">
                          Submitted {formatDate(report.submittedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-900">{report.studentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-900">{report.trainerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {formatDate(report.sessionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewReport(report.id)}
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
      </div>

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-amber-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-amber-900">Trainer Report Details</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedReport.studentName} - {selectedReport.trainerName}</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Session Info */}
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-3">Session Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student:</span>
                        <span className="text-amber-900">{selectedReport.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trainer:</span>
                        <span className="text-amber-900">{selectedReport.trainerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-amber-900">{formatDate(selectedReport.sessionDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-amber-900">{selectedReport.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Topics Covered */}
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-3">Topics Covered</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.topicsCovered}</p>
                  </div>

                  {/* Student Performance */}
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-3">Student Performance</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReport.studentPerformance}</p>
                  </div>

                  {/* Ratings */}
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-3">Ratings</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{selectedReport.ratings.progress}</div>
                        <div className="text-xs text-gray-600">Progress</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{selectedReport.ratings.attendance}</div>
                        <div className="text-xs text-gray-600">Attendance</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{selectedReport.ratings.engagement}</div>
                        <div className="text-xs text-gray-600">Engagement</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Challenges */}
                  {selectedReport.challenges && (
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">Challenges</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReport.challenges}</p>
                    </div>
                  )}

                  {/* Recommendations */}
                  {selectedReport.recommendations && (
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">Recommendations</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReport.recommendations}</p>
                    </div>
                  )}

                  {/* Next Steps */}
                  {selectedReport.nextSteps && (
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">Next Steps</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReport.nextSteps}</p>
                    </div>
                  )}

                  {/* Roadmap Updates */}
                  {selectedReport.roadmapUpdates && (
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">Roadmap Updates</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">{selectedReport.roadmapUpdates}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              {selectedReport.status === 'pending-review' && (
                <>
                  <button
                    onClick={() => handleReportAction(selectedReport.id, 'request-revision')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Request Revision
                  </button>
                  <button
                    onClick={() => handleReportAction(selectedReport.id, 'reject')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleReportAction(selectedReport.id, 'approve')}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                </>
              )}
              <button
                onClick={closeReportModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}