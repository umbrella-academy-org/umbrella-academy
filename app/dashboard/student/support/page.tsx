'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { StudentUser } from '@/types';

export default function StudentSupportPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { navigate } = useNavigationWithLoading();
  const [issueType, setIssueType] = useState('technical');
  const [priority, setPriority] = useState('medium');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'student') {
      const dashboardRoutes: Record<string, string> = {
        'trainer': '/dashboard/trainer',
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

  if (!user || user.role !== 'student') {
    return null;
  }

  const studentUser = user as StudentUser;

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
      <Sidebar activeItem="Support" userType="student" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Support Center</h1>
              <p className="text-gray-600 mt-1">Get help with your learning journey</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submit Ticket Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Support Ticket</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Type
                        </label>
                        <select
                          value={issueType}
                          onChange={(e) => setIssueType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        >
                          <option value="technical">Technical Issue</option>
                          <option value="account">Account Problem</option>
                          <option value="payment">Payment Issue</option>
                          <option value="roadmap">Roadmap Question</option>
                          <option value="trainer">Trainer Related</option>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Help</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Response Time</h4>
                      <p className="text-sm text-gray-600">Usually within 24 hours</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Field Focus</h4>
                      <p className="text-sm text-gray-600 capitalize">{(studentUser.fieldId || 'Not assigned').replace(/-/g, ' ')}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Support Hours</h4>
                      <p className="text-sm text-gray-600">Mon-Fri, 9AM-6PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Common Issues</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Can't access my roadmap
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Payment not processed
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Trainer scheduling issues
                    </button>
                    <button className="w-full text-left text-sm text-gray-600 hover:text-gray-700">
                      Account settings problems
                    </button>
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