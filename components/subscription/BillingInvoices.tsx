'use client';

import { Download, FileText, MoreHorizontal } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  date: string;
  billingDate: string;
  status: 'Paid';
  amount: string;
  plan: string;
  duration: string;
}

export default function BillingInvoices() {
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'Invoice #WE-2024-001',
      date: 'Jan 15, 2024',
      billingDate: 'Jan 15, 2024',
      status: 'Paid',
      amount: 'RWF 75,000',
      plan: 'Wing Explorer Plan',
      duration: '1 Year'
    },
    {
      id: '2',
      number: 'Invoice #WE-2023-012',
      date: 'Dec 15, 2023',
      billingDate: 'Dec 15, 2023',
      status: 'Paid',
      amount: 'RWF 25,000',
      plan: 'Wing Explorer Plan',
      duration: 'Monthly'
    },
    {
      id: '3',
      number: 'Invoice #WE-2023-011',
      date: 'Nov 15, 2023',
      billingDate: 'Nov 15, 2023',
      status: 'Paid',
      amount: 'RWF 25,000',
      plan: 'Wing Explorer Plan',
      duration: 'Monthly'
    },
    {
      id: '4',
      number: 'Invoice #WE-2023-010',
      date: 'Oct 15, 2023',
      billingDate: 'Oct 15, 2023',
      status: 'Paid',
      amount: 'RWF 25,000',
      plan: 'Wing Explorer Plan',
      duration: 'Monthly'
    },
    {
      id: '5',
      number: 'Invoice #WE-2023-009',
      date: 'Sep 15, 2023',
      billingDate: 'Sep 15, 2023',
      status: 'Paid',
      amount: 'RWF 25,000',
      plan: 'Wing Explorer Plan',
      duration: 'Monthly'
    }
  ];

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
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-900">{invoice.number}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{invoice.billingDate}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    ✓ {invoice.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">{invoice.amount}</td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">{invoice.plan}</div>
                    <div className="text-gray-500">{invoice.duration}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}