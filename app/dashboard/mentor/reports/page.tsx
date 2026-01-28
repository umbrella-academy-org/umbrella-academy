'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

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
  const [selectedReport, setSelectedReport] = useState<TrainerReport | null>(null);
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

  const handleReportAction = (reportId: string, action: 'approve' | 'reject' | 'request-revision') => {
    // Handle report action logic here
    console.log(`${action} report ${reportId}`);
  };

  const filteredReports = filterStatus === 'all' 
    ? reports 
    : reports.filter(report => report.status === filterStatus);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Trainer Reports</h1>
          
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

          {/* Reports List */}
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{report.studentName}</h3>
                    <p className="text-gray-600">Trainer: {report.trainerName}</p>
                    <p className="text-gray-600">Session Date: {report.sessionDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    report.status === 'pending-review' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'approved' ? 'bg-green-100 text-green-800' :
                    report.status === 'needs-revision' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {report.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Topics Covered</h4>
                    <p className="text-gray-700">{report.topicsCovered}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Performance</h4>
                    <p className="text-gray-700">{report.studentPerformance}</p>
                  </div>
                </div>

                {report.status === 'pending-review' && (
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleReportAction(report.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReportAction(report.id, 'request-revision')}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Request Revision
                    </button>
                    <button 
                      onClick={() => handleReportAction(report.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}