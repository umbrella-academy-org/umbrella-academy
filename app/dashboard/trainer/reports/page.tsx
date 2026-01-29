'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Send, FileText, Calendar, User, Clock, Target, TrendingUp, AlertCircle } from 'lucide-react';

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

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const student = students.find(s => s.id === selectedStudent);
    if (!student) return;

    const newReport: Report = {
      id: `rp-${Date.now()}`,
      studentId: selectedStudent,
      studentName: student.name,
      sessionDate: formData.sessionDate,
      duration: formData.duration,
      topicsCovered: formData.topicsCovered,
      studentPerformance: formData.studentPerformance,
      challenges: formData.challenges,
      recommendations: formData.recommendations,
      nextSteps: formData.nextSteps,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    console.log('Submitting report:', newReport);
    
    // Reset form
    setFormData({
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
    setSelectedStudent('');
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

            {/* Create Report Form */}
            {showCreateForm && (
              <div className="mb-8 bg-white rounded-lg shadow-lg border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Create Session Report</h3>
                    <p className="text-sm text-gray-400 mt-1">Document the training session details and student progress.</p>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-full"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitReport} className="space-y-6">
                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} - {student.course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Session Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Date</label>
                      <input
                        type="date"
                        value={formData.sessionDate}
                        onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 60 minutes"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Topics Covered */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Topics Covered</label>
                    <textarea
                      value={formData.topicsCovered}
                      onChange={(e) => setFormData({ ...formData, topicsCovered: e.target.value })}
                      placeholder="List the main topics and concepts covered in this session..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Student Performance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Performance</label>
                    <textarea
                      value={formData.studentPerformance}
                      onChange={(e) => setFormData({ ...formData, studentPerformance: e.target.value })}
                      placeholder="Describe how the student performed during the session..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Ratings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Progress Rating</label>
                      <select
                        value={formData.progressRating}
                        onChange={(e) => setFormData({ ...formData, progressRating: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Below Average' : rating === 3 ? 'Average' : rating === 4 ? 'Good' : 'Excellent'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Rating</label>
                      <select
                        value={formData.attendanceRating}
                        onChange={(e) => setFormData({ ...formData, attendanceRating: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Below Average' : rating === 3 ? 'Average' : rating === 4 ? 'Good' : 'Excellent'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rating</label>
                      <select
                        value={formData.engagementRating}
                        onChange={(e) => setFormData({ ...formData, engagementRating: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} - {rating === 1 ? 'Poor' : rating === 2 ? 'Below Average' : rating === 3 ? 'Average' : rating === 4 ? 'Good' : 'Excellent'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges Encountered</label>
                    <textarea
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      placeholder="Describe any challenges or difficulties the student faced..."
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
                      placeholder="Provide recommendations for improvement or additional resources..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  {/* Next Steps */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps</label>
                    <textarea
                      value={formData.nextSteps}
                      onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                      placeholder="Outline the plan for the next session or upcoming topics..."
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
                      Submit Report to Mentor
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
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.studentName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(report.sessionDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{report.duration}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Topics Covered:</h5>
                      <p className="text-gray-700 text-sm">{report.topicsCovered}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Performance:</h5>
                      <p className="text-gray-700 text-sm">{report.studentPerformance}</p>
                    </div>
                    
                    {report.challenges && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          Challenges:
                        </h5>
                        <p className="text-gray-700 text-sm">{report.challenges}</p>
                      </div>
                    )}
                    
                    {report.nextSteps && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                          <Target className="w-4 h-4 text-green-500" />
                          Next Steps:
                        </h5>
                        <p className="text-gray-700 text-sm">{report.nextSteps}</p>
                      </div>
                    )}
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