'use client';

import { useState } from 'react';

interface StudentReportFormProps {
  studentId: string;
  studentName: string;
  onSubmit: (report: any) => void;
  onCancel: () => void;
}

export default function StudentReportForm({ studentId, studentName, onSubmit, onCancel }: StudentReportFormProps) {
  const [reportType, setReportType] = useState('session');
  const [sessionDate, setSessionDate] = useState('');
  const [duration, setDuration] = useState('');
  const [topicsCovered, setTopicsCovered] = useState('');
  const [studentPerformance, setStudentPerformance] = useState('');
  const [progressRating, setProgressRating] = useState(3);
  const [attendanceRating, setAttendanceRating] = useState(5);
  const [engagementRating, setEngagementRating] = useState(3);
  const [challenges, setChallenges] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [roadmapUpdates, setRoadmapUpdates] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const report = {
      studentId,
      studentName,
      reportType,
      sessionDate,
      duration,
      topicsCovered,
      studentPerformance,
      ratings: {
        progress: progressRating,
        attendance: attendanceRating,
        engagement: engagementRating
      },
      challenges,
      recommendations,
      nextSteps,
      roadmapUpdates,
      submittedAt: new Date().toISOString(),
      status: 'pending-review'
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit(report);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-amber-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-amber-900">Create Student Report</h2>
              <p className="text-gray-600">Student: {studentName}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Report Type and Session Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="session">Session Report</option>
                <option value="progress">Progress Update</option>
                <option value="roadmap">Roadmap Review</option>
                <option value="assessment">Assessment Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Date
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics Covered
            </label>
            <textarea
              value={topicsCovered}
              onChange={(e) => setTopicsCovered(e.target.value)}
              placeholder="List the main topics and concepts covered in this session..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              required
            />
          </div>

          {/* Student Performance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Performance Assessment
            </label>
            <textarea
              value={studentPerformance}
              onChange={(e) => setStudentPerformance(e.target.value)}
              placeholder="Describe the student's understanding, participation, and performance during the session..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              required
            />
          </div>

          {/* Ratings */}
          <div>
            <h3 className="text-lg font-medium text-amber-900 mb-4">Performance Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Rating
                </label>
                <select
                  value={progressRating}
                  onChange={(e) => setProgressRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value={5}>5 - Excellent Progress</option>
                  <option value={4}>4 - Good Progress</option>
                  <option value={3}>3 - Average Progress</option>
                  <option value={2}>2 - Slow Progress</option>
                  <option value={1}>1 - No Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendance Rating
                </label>
                <select
                  value={attendanceRating}
                  onChange={(e) => setAttendanceRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value={5}>5 - Always Present</option>
                  <option value={4}>4 - Rarely Absent</option>
                  <option value={3}>3 - Sometimes Absent</option>
                  <option value={2}>2 - Often Absent</option>
                  <option value={1}>1 - Frequently Absent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engagement Rating
                </label>
                <select
                  value={engagementRating}
                  onChange={(e) => setEngagementRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value={5}>5 - Highly Engaged</option>
                  <option value={4}>4 - Well Engaged</option>
                  <option value={3}>3 - Moderately Engaged</option>
                  <option value={2}>2 - Low Engagement</option>
                  <option value={1}>1 - Not Engaged</option>
                </select>
              </div>
            </div>
          </div>

          {/* Challenges and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenges Observed
              </label>
              <textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="Describe any challenges or difficulties the student is facing..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommendations
              </label>
              <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                placeholder="Provide recommendations for improvement or additional support..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps
            </label>
            <textarea
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="Outline the plan for upcoming sessions and learning objectives..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              required
            />
          </div>

          {/* Roadmap Updates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roadmap Updates
            </label>
            <textarea
              value={roadmapUpdates}
              onChange={(e) => setRoadmapUpdates(e.target.value)}
              placeholder="Suggest any updates or modifications to the student's learning roadmap..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}