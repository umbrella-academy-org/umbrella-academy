'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Building2, Users, Plus, X, AlertCircle, Pencil, Trash2, UserCheck } from 'lucide-react';
import { useAdminContext } from '@/contexts';
import { useCompanies } from '@/hooks/admin';
import { AdminCompany } from '@/types/admin';

export default function UmbrellaAdminCompaniesPage() {
  const { companies, companiesLoading, companiesError, refreshCompanies, mentors } = useAdminContext();
  const { createCompany, updateCompany, deleteCompany, assignMentor, isLoading, error: mutationError } = useCompanies();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<AdminCompany | null>(null);
  const [assigningCompany, setAssigningCompany] = useState<AdminCompany | null>(null);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', website: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.isActive).length;
  const totalStudents = companies.reduce((sum, c) => sum + c.studentsCount, 0);
  const totalTrainers = companies.reduce((sum, c) => sum + c.trainersCount, 0);

  const resetForm = () => {
    setFormData({ name: '', description: '', website: '' });
    setShowCreateForm(false);
    setEditingCompany(null);
    setLocalError(null);
  };

  const handleOpenEdit = (company: AdminCompany) => {
    setEditingCompany(company);
    setFormData({ name: company.name, description: company.description ?? '', website: company.website ?? '' });
    setShowCreateForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!formData.name.trim()) { setLocalError('Company name is required'); return; }

    let result: AdminCompany | null = null;
    if (editingCompany) {
      result = await updateCompany(editingCompany._id, formData);
    } else {
      result = await createCompany(formData);
    }

    if (result) {
      await refreshCompanies();
      resetForm();
    } else {
      setLocalError(mutationError ?? 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this company? This cannot be undone.')) return;
    const ok = await deleteCompany(id);
    if (ok) await refreshCompanies();
  };

  const handleAssignMentor = async () => {
    if (!assigningCompany || !selectedMentorId) return;
    const result = await assignMentor(assigningCompany._id, selectedMentorId);
    if (result) {
      await refreshCompanies();
      setAssigningCompany(null);
      setSelectedMentorId('');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Companies" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
                <p className="text-sm text-gray-500 mt-1">Manage companies and their assigned mentors</p>
              </div>
              <button
                onClick={() => { resetForm(); setShowCreateForm(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Company
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Companies', value: totalCompanies, icon: <Building2 className="w-6 h-6 text-gray-400" /> },
                { label: 'Active', value: activeCompanies, icon: <Building2 className="w-6 h-6 text-gray-400" /> },
                { label: 'Total Students', value: totalStudents, icon: <Users className="w-6 h-6 text-gray-400" /> },
                { label: 'Total Trainers', value: totalTrainers, icon: <Users className="w-6 h-6 text-gray-400" /> },
              ].map((card) => (
                <div key={card.label} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">{card.label}</p>
                      {companiesLoading
                        ? <div className="h-7 w-12 bg-gray-200 rounded animate-pulse mt-1" />
                        : <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                      }
                    </div>
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Create / Edit Form */}
            {showCreateForm && (
              <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingCompany ? 'Edit Company' : 'New Company'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {(localError || mutationError) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {localError ?? mutationError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. TechCorp Rwanda"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the company..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-5 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Saving…' : editingCompany ? 'Save Changes' : 'Create Company'}
                    </button>
                    <button type="button" onClick={resetForm} className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Assign Mentor Modal */}
            {assigningCompany && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Assign Mentor</h3>
                    <button onClick={() => setAssigningCompany(null)} className="text-gray-400 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Assigning a mentor to <span className="font-medium text-gray-900">{assigningCompany.name}</span>
                  </p>
                  <select
                    value={selectedMentorId}
                    onChange={e => setSelectedMentorId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                  >
                    <option value="">Select a mentor…</option>
                    {mentors.map((m: any) => (
                      <option key={m._id ?? m.id} value={m._id ?? m.id}>
                        {m.firstName ?? ''} {m.lastName ?? ''} — {m.email}
                      </option>
                    ))}
                  </select>
                  {mutationError && (
                    <p className="text-sm text-red-600 mb-3">{mutationError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={handleAssignMentor}
                      disabled={!selectedMentorId || isLoading}
                      className="flex-1 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Assigning…' : 'Assign Mentor'}
                    </button>
                    <button onClick={() => setAssigningCompany(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {companiesError && (
              <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{companiesError}</span>
                </div>
                <button onClick={refreshCompanies} className="text-xs text-red-700 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-100">Retry</button>
              </div>
            )}

            {/* Loading */}
            {companiesLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            )}

            {/* Empty */}
            {!companiesLoading && !companiesError && companies.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Building2 className="w-12 h-12 mb-3 text-gray-300" />
                <p className="font-medium text-gray-500">No companies yet</p>
                <p className="text-sm mt-1">Click "Add Company" to create the first one.</p>
              </div>
            )}

            {/* Companies Grid */}
            {!companiesLoading && companies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {companies.map(company => (
                  <div key={company._id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col gap-3">
                    {/* Company header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{company.name}</h3>
                          {company.website && (
                            <a href={company.website} target="_blank" rel="noreferrer" className="text-xs text-yellow-600 hover:underline">
                              {company.website.replace(/^https?:\/\//, '')}
                            </a>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${company.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {company.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Description */}
                    {company.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{company.description}</p>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: 'Students', value: company.studentsCount },
                        { label: 'Trainers', value: company.trainersCount },
                        { label: 'Mentors', value: company.mentorsCount },
                      ].map(stat => (
                        <div key={stat.label} className="bg-gray-50 rounded-lg py-2">
                          <p className="text-base font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Mentor */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        {company.mentorId ? (
                          <span className="text-xs text-gray-700">
                            {company.mentorId.firstName} {company.mentorId.lastName}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No mentor assigned</span>
                        )}
                      </div>
                      <button
                        onClick={() => { setAssigningCompany(company); setSelectedMentorId(company.mentorId?._id ?? ''); }}
                        className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                      >
                        {company.mentorId ? 'Change' : 'Assign'}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleOpenEdit(company)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(company._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-red-100 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
