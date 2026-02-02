'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Send, FileText, Calendar, User, Clock, Target, TrendingUp, AlertCircle, Eye, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  course: string;
  progress: number;
  lastSession: string;
}

interface Report {
  id: string;
  studentId: string;
  studentName: string;
  sessionDate: string;
  duration: string;
  topicsCovered: string;
  studentPerformance: string;
  challenges: string;
  recommendations: string;
  nextSteps: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export default function TrainerReportsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [formData, setFormData] = useState({
    sessionDate: '',
    duration: '',
    topicsCovered: '',
    studentPerformance: '',
    challenges: '',
    recommendations: '',
    nextSteps: '',
    progressRating: 5,
    attendanceRating: 5,
    engagementRating: 5
  });

  const students: Student[] = [
    {
      id: 'st-1',
      name: 'Alice Johnson',
      avatar: 'AJ',
      course: 'Full Stack Development',
      progress: 75,
      lastSession: '2024-01-20'
    },
    {
      id: 'st-2', 
      name: 'Bob Smith',
      avatar: 'BS',
      course: 'React Fundamentals',
      progress: 60,
      lastSession: '2024-01-19'
    },
    {
      id: 'st-3',
      name: 'Carol Davis',
      avatar: 'CD',
      course: 'Node.js Backend',
      progress: 85,
      lastSession: '2024-01-18'
    }
  ];

  const reports: Report[] = [
    {
      id: 'rp-1',
      studentId: 'st-1',
      studentName: 'Alice Johnson',
      sessionDate: '2024-01-20',
      duration: '60 minutes',
      topicsCovered: 'React Hooks, State Management',
      studentPerformance: 'Excellent understanding of useState and useEffect. Completed all exercises successfully.',
      challenges: 'Struggled initially with useEffect dependencies but grasped the concept after examples.',
      recommendations: 'Continue with advanced hooks like useContext and useReducer.',
      nextSteps: 'Move to custom hooks and performance optimization.',
      submittedAt: '2024-01-20T18:30:00Z',
      status: 'submitted'
    },
    {
      id: 'rp-2',
      studentId: 'st-2',
      studentName: 'Bob Smith',
      sessionDate: '2024-01-19',
      duration: '45 minutes',
      topicsCovered: 'JavaScript ES6 Features',
      studentPerformance: 'Good progress with arrow functions and destructuring. Needs more practice with async/await.',
      challenges: 'Confusion between promises and async/await syntax.',
      recommendations: 'More hands-on practice with asynchronous JavaScript.',
      nextSteps: 'Focus on API calls and error handling.',
      submittedAt: '2024-01-19T17:15:00Z',
      status: 'reviewed'
    }
  ];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Reports" userType="trainer" />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">Session Reports</h1>
                  <p className="text-sm text-gray-500">Submit detailed reports to your mentor after each training session.</p>
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

            {/* Reports Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Recent Reports ({reports.length})</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Session Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Session Report - {report.topicsCovered.split(',')[0]}
                          </div>
                          <div className="text-sm text-gray-500">
                            Submitted {formatDate(report.submittedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-yellow-800">
                                  {report.studentName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{report.studentName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(report.sessionDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.duration}
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

              {reports.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No reports found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}