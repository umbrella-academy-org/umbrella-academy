'use client';

import { Download, FileText } from 'lucide-react';
import { useFinancial } from '@/contexts';

export default function BillingInvoices() {
  const { getUserTransactions, isLoading } = useFinancial();
  const invoices = getUserTransactions().filter(t => t.type === 'payment');

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-28"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Billing and invoicing</h3>
          <p className="text-sm text-gray-600 mt-1">Pick an account plan that fits your workflow.</p>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
          <Download className="w-4 h-4" />
          Download all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Invoice</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  Billing date
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M6 8L2 4h8L6 8z"/>
                    </svg>
                  </button>
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Plan</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-900">#{t.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      ✓ {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    RWF {t.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">{t.description}</div>
                      <div className="text-gray-500">—</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
