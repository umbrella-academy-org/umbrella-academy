'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import { Plus, User, Mail, Star, Users, CheckCircle, XCircle } from 'lucide-react';

export default function WingAdminMentorsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    maxStudents: 15
  });

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@example.com',
      expertise: ['JavaScript', 'React', 'Node.js'],
      maxStudents: 15,
      currentStudents: 12,
      rating: 4.8,
      status: 'active',
      joinDate: '2023-11-15',
      approvedRoadmaps: 45,
      approvedTrainers: 8
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@example.com',
      expertise: ['Python', 'Data Science', 'Machine Learning'],
      maxStudents: 20,
      currentStudents: 18,
      rating: 4.9,
      status: 'active',
      joinDate: '2023-10-20',
      approvedRoadmaps: 67,
      approvedTrainers: 12
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      expertise: ['UI/UX Design', 'Figma', 'Design Systems'],
      maxStudents: 12,
      currentStudents: 8,
      rating: 4.7,
      status: 'active',
      joinDate: '2023-12-01',
      approvedRoadmaps: 23,
      approvedTrainers: 5
    }
  ];

  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating mentor:', formData);
    // Handle mentor creation
    setShowCreateForm(false);
    setFormData({ name: '', email: '', expertise: '', maxStudents: 15 });
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Mentors" userType="wing-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">Mentor Management</h1>
                  <p className="text-sm text-gray-500">Official mentors who approve and guide trainers in your wing.</p>
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

            {/* Create Mentor Form */}
            {showCreateForm && (
              <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-100 p-8 scale-in transition-all">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Create New Mentor</h3>
                    <p className="text-sm text-gray-400 mt-1">Assign an official mentor to oversee this wing's trainers.</p>
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
                      required
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
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-600 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-yellow-700 transition-all shadow-md active:scale-95"
                    >
                      Verify and Activate Mentor
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

            {/* Mentors List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expertise
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mentors.map((mentor) => (
                      <tr key={mentor.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                              <div className="text-sm text-gray-500">{mentor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.slice(0, 2).map((skill, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {skill}
                              </span>
                            ))}
                            {mentor.expertise.length > 2 && (
                              <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                +{mentor.expertise.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {mentor.currentStudents}/{mentor.maxStudents}
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-yellow-600 h-1.5 rounded-full"
                              style={{ width: `${(mentor.currentStudents / mentor.maxStudents) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{mentor.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {mentor.approvedRoadmaps} roadmaps • {mentor.approvedTrainers} trainers
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {mentor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-700 mr-3">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}