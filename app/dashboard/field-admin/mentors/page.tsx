'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MentorsTable from '@/components/wing-admin/MentorsTable';
import { Plus, XCircle, Users, UserCheck, Star, Award } from 'lucide-react';
import { useAdminContext } from '@/contexts';
import { useMentors, useUsers } from '@/hooks/admin';

export default function FieldAdminMentorsPage() {
  const {
    mentors,
    pendingMentors,
    mentorsLoading,
    mentorsError,
    refreshMentors,
  } = useAdminContext();

  const { approveMentor, rejectMentor, deleteMentor } = useMentors();
  const { createUser } = useUsers();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    maxStudents: 15,
  });
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const handleApproveMentor = async (mentorId: string) => {
    setApprovingId(mentorId);
    setMutationError(null);
    try {
      await approveMentor(mentorId);
      await refreshMentors();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to approve mentor');
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectMentor = async (mentorId: string) => {
    setMutationError(null);
    try {
      await rejectMentor(mentorId);
      await refreshMentors();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to reject mentor');
    }
  };

  const handleDeleteMentor = async (mentorId: string) => {
    setMutationError(null);
    try {
      await deleteMentor(mentorId);
      await refreshMentors();
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to delete mentor');
    }
  };

  const handleCreateMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    setMutationError(null);
    setCreateLoading(true);
    try {
      const [firstName, ...rest] = formData.name.trim().split(' ');
      const lastName = rest.join(' ') || '';
      const result = await createUser({
        email: formData.email,
        password: Math.random().toString(36).slice(-10),
        role: 'mentor',
        firstName,
        lastName,
      });
      if (result) {
        await refreshMentors();
        setShowCreateForm(false);
        setFormData({ name: '', email: '', expertise: '', maxStudents: 15 });
      }
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Failed to create mentor');
    } finally {
      setCreateLoading(false);
    }
  };

  // Calculate summary stats from real data
  const allMentors = [...mentors, ...pendingMentors];
  const totalMentors = allMentors.length;
  const activeMentors = mentors.filter(m => m.status === 'active').length;
  const avgRating =
    allMentors.length > 0
      ? (
          allMentors.reduce((sum, m) => sum + (('rating' in m ? (m as { rating?: number }).rating : 0) ?? 0), 0) /
          allMentors.length
        ).toFixed(1)
      : '—';

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Mentors" userType="field-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">Mentor Management</h1>
                  <p className="text-sm text-gray-500">Official mentors who approve and guide trainers in your field.</p>
                </div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-medium shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Add New Mentor
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Mentors</p>
                    <p className="text-2xl font-bold text-gray-900">{totalMentors}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Mentors</p>
                    <p className="text-2xl font-bold text-gray-900">{activeMentors}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingMentors.length}</p>
                  </div>
                  <Award className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
                  </div>
                  <Star className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Create Mentor Form */}
            {showCreateForm && (
              <div className="mb-8 bg-white rounded-lg shadow-lg border border-gray-100 p-8 scale-in transition-all">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Create New Mentor</h3>
                    <p className="text-sm text-gray-400 mt-1">Assign an official mentor to oversee this field&apos;s trainers.</p>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-full"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateMentor} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all"
                        placeholder="eg. Dr. John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all"
                        placeholder="eg. john.smith@academy.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
                    <input
                      type="text"
                      value={formData.expertise}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="eg. JavaScript, React, System Architecture"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Maximum Mentorship Capacity</label>
                      <p className="text-xs text-gray-500">Number of trainers/students this mentor can oversee.</p>
                    </div>
                    <input
                      type="number"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                      className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 text-center font-bold"
                      min="5"
                      max="100"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={createLoading}
                      className="flex-1 bg-yellow-600 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-yellow-700 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createLoading ? 'Creating…' : 'Verify and Activate Mentor'}
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

            {/* Loading state */}
            {mentorsLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            )}

            {/* Error state */}
            {!mentorsLoading && mentorsError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-red-700">{mentorsError}</span>
                <button
                  onClick={refreshMentors}
                  className="ml-4 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Mutation error */}
            {mutationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {mutationError}
              </div>
            )}

            {/* Empty state */}
            {!mentorsLoading && !mentorsError && allMentors.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Users className="w-12 h-12 mb-3 text-gray-300" />
                <p className="text-base font-medium">No mentors found</p>
                <p className="text-sm mt-1">Mentors assigned to your field will appear here.</p>
              </div>
            )}

            {/* Table */}
            {!mentorsLoading && !mentorsError && allMentors.length > 0 && (
              <MentorsTable
                mentors={allMentors.map(m => ({
                  id: m.id as unknown as number,
                  name: m.name,
                  email: m.email,
                  expertise: ('expertise' in m ? (m as { expertise?: string[] }).expertise : undefined) ?? [],
                  maxStudents: 0,
                  currentStudents: 0,
                  rating: ('rating' in m ? (m as { rating?: number }).rating : 0) ?? 0,
                  status: m.status,
                  joinDate: m.joinDate ?? '',
                  approvedRoadmaps: 0,
                  approvedTrainers: 0,
                }))}
                onApprove={handleApproveMentor}
                approvingId={approvingId}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
