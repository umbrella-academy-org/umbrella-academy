'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Plus, Ticket, CheckCircle, XCircle, Search, X, Tag, User, Percent, Calendar } from 'lucide-react';
import { UserRole, type PromoCode } from '@/types';
import { apiClient } from '@/services/client';
import { API_ENDPOINTS } from '@/services/constants';

interface PromoCodeForm {
  code: string;
  assignedStudentEmail: string;
  discountAmount: number;
  discountPercentage: number;
  reason: string;
  expiresAt: string;
}

const EMPTY_FORM: PromoCodeForm = {
  code: '',
  assignedStudentEmail: '',
  discountAmount: 0,
  discountPercentage: 0,
  reason: '',
  expiresAt: '',
};

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<PromoCodeForm>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<PromoCode[]>('/api/admin/promo-codes');
      if (response.success) {
        setPromoCodes(response.data ?? []);
      }
    } catch {
      setPromoCodes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPromoCodes = promoCodes.filter(pc =>
    pc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pc.assignedStudentEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const usedCount = promoCodes.filter(pc => pc.isUsed).length;
  const activeCount = promoCodes.filter(pc => !pc.isUsed && new Date(pc.expiresAt) > new Date()).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.code.trim() || !form.assignedStudentEmail.trim() || !form.reason.trim()) {
      setError('Code, student email, and reason are required');
      return;
    }

    if (form.discountAmount <= 0 && form.discountPercentage <= 0) {
      setError('Either discount amount or percentage must be greater than 0');
      return;
    }

    try {
      const response = await apiClient.post<PromoCode>('/api/admin/promo-codes', {
        ...form,
        expiresAt: new Date(form.expiresAt).toISOString(),
      });

      if (response.success) {
        setSuccess(true);
        setForm(EMPTY_FORM);
        await fetchPromoCodes();
        setTimeout(() => setShowModal(false), 1200);
      } else {
        setError('Failed to create promo code');
      }
    } catch {
      setError('Failed to create promo code. Please try again.');
    }
  };

  const generateCode = () => {
    const prefix = 'UMB';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setForm(prev => ({ ...prev, code: `${prefix}-${random}` }));
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Promo Codes" userType={UserRole.ADMIN} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Promo Codes</h1>
                  <p className="text-gray-600">Manage discount codes for students</p>
                </div>
                <button
                  onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setError(null); setSuccess(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Code
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
                          <div className="h-7 w-12 bg-gray-200 rounded" />
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Codes</p>
                        <p className="text-2xl font-bold text-gray-900">{promoCodes.length}</p>
                      </div>
                      <Ticket className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Used</p>
                        <p className="text-2xl font-bold text-gray-900">{usedCount}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active</p>
                        <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                      </div>
                      <Tag className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Expired</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {promoCodes.filter(pc => !pc.isUsed && new Date(pc.expiresAt) <= new Date()).length}
                        </p>
                      </div>
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by code or student email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Promo Codes Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-12 bg-gray-200 rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                      </tr>
                    ))
                  ) : filteredPromoCodes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No promo codes found
                      </td>
                    </tr>
                  ) : (
                    filteredPromoCodes.map((pc) => (
                      <tr key={pc.code} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="font-mono font-medium text-gray-900">{pc.code}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{pc.assignedStudentEmail}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Percent className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {pc.discountPercentage > 0 ? `${pc.discountPercentage}%` : `${pc.discountAmount} RWF`}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            pc.isUsed
                              ? 'bg-green-100 text-green-700'
                              : new Date(pc.expiresAt) > new Date()
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {pc.isUsed ? 'Used' : new Date(pc.expiresAt) > new Date() ? 'Active' : 'Expired'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {new Date(pc.expiresAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600 truncate max-w-xs">{pc.reason}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Create Promo Code</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                Promo code created successfully!
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., UMB-123456"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Email *</label>
                <input
                  type="email"
                  value={form.assignedStudentEmail}
                  onChange={e => setForm({ ...form, assignedStudentEmail: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.discountPercentage}
                    onChange={e => setForm({ ...form, discountPercentage: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Amount (RWF)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.discountAmount}
                    onChange={e => setForm({ ...form, discountAmount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
                <textarea
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  placeholder="Why is this promo code being created?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expires At *</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={e => setForm({ ...form, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                >
                  Create Code
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
