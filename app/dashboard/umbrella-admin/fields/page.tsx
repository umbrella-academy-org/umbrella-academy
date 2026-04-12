'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import FieldsTable from '@/components/umbrella-admin/FieldsTable';
import { useAdminContext } from '@/contexts';
import { Building2, Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function UmbrellaAdminFieldsPage() {
  const { fields, fieldsLoading, fieldsError, refreshFields } = useAdminContext();

  // Calculate summary stats from real data
  const totalFields = fields.length;
  const activeFields = fields.filter(f => f.isActive).length;
  const totalStudents = fields.reduce((sum, f) => sum + f.studentsCount, 0);
  const totalRevenue = fields.reduce((sum, f) => sum + f.totalRevenue, 0);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Fields" userType="umbrella-admin" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Fields Management</h1>
              <p className="text-gray-600">Monitor and manage all fields across the system</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Fields</p>
                    {fieldsLoading ? (
                      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{totalFields}</p>
                    )}
                  </div>
                  <Building2 className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Fields</p>
                    {fieldsLoading ? (
                      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{activeFields}</p>
                    )}
                  </div>
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    {fieldsLoading ? (
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                    )}
                  </div>
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    {fieldsLoading ? (
                      <div className="h-8 w-28 bg-gray-200 rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">RWF {totalRevenue.toLocaleString()}</p>
                    )}
                  </div>
                  <DollarSign className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Error state */}
            {fieldsError && (
              <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-sm text-red-700">{fieldsError}</p>
                </div>
                <button
                  onClick={refreshFields}
                  className="px-3 py-1.5 text-xs font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading skeleton */}
            {fieldsLoading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!fieldsLoading && !fieldsError && fields.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">No fields found</p>
              </div>
            )}

            {/* Table */}
            {!fieldsLoading && fields.length > 0 && (
              <FieldsTable fields={fields} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
