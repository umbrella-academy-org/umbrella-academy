'use client';

import { Download, FileText, Receipt, CheckCircle, Clock } from 'lucide-react';
import { useFinancial } from '@/contexts';

export default function BillingInvoices() {
  const { getUserTransactions, isLoading } = useFinancial();
  const invoices = getUserTransactions().filter(t => t.type === 'payment');

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Receipt className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
            <p className="text-sm text-gray-500">View your subscription payments and receipts</p>
          </div>
        </div>
        {invoices.length > 0 && (
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        )}
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-1">No payments yet</h4>
          <p className="text-gray-500 text-sm">
            Your payment history will appear here after you make your first payment.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{invoice.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    {' • '}
                    #{invoice.id.slice(-6)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {invoice.amount.toLocaleString()} RWF
                  </p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                    invoice.status === 'completed'
                      ? 'text-green-600'
                      : invoice.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {invoice.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Paid
                      </>
                    ) : invoice.status === 'pending' ? (
                      <>
                        <Clock className="w-3 h-3" />
                        Pending
                      </>
                    ) : (
                      'Failed'
                    )}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
