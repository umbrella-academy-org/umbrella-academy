'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { TrainerUser } from '@/types';

export default function TrainerSupportPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { navigate } = useNavigationWithLoading();
  const [issueType, setIssueType] = useState('technical');
  const [priority, setPriority] = useState('medium');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a trainer
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'trainer') {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'mentor': '/dashboard/mentor',
        'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      navigate(dashboardRoutes[user.role] || '/');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="w-64 bg-gray-900 animate-pulse"></div>
        <div className="flex-1 p-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'trainer') {
    return null;
  }

  const trainerUser = user as TrainerUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reset form
    setSubject('');
    setDescription('');
    setIssueType('technical');
    setPriority('medium');
    setIsSubmitting(false);

    alert('Support ticket submitted successfully! Your field admin will review it shortly.');
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Support" userType="trainer" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-amber-900">Trainer Support Center</h1>
              <p className="text-gray-600 mt-1">Get help with training tools and student management</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submit Ticket Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-amber-900 mb-4">Submit Support Ticket</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Type
                        </label>
                        <select
                          value={issueType}
                          onChange={(e) => setIssueType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="technical">Technical Issue</option>
                          <option value="student-management">Student Management</option>
                          <option value="payment">Payment/Wallet Issue</option>
                          <option value="scheduling">Scheduling Problem</option>
                          <option value="reporting">Reporting Tools</option>
                          <option value="live-session">Live Session Issues</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Brief description of your issue"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please provide detailed information about your issue..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Support Info */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-amber-900 mb-3">Support Information</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-amber-900">Response Time</h4>
                      <p className="text-sm text-gray-600">Usually within 12 hours</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-900">Field Focus</h4>
                      <p className="text-sm text-gray-600 capitalize">{(trainerUser.fieldId || 'Not assigned').replace(/-/g, ' ')}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-900">Support Hours</h4>
                      <p className="text-sm text-gray-600">24/7 for urgent issues</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-amber-900 mb-3">Common Trainer Issues</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Student not attending sessions
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Payment not received
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Live session technical issues
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Report submission problems
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Trainer Resources</p>
                      <p className="text-sm text-gray-700">Access training materials and best practices in your trainer dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}