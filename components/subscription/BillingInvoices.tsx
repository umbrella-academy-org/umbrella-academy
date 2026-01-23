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
      number: 'Invoice #007 - Dec 2022',
      date: 'Dec 1, 2022',
      billingDate: 'Dec 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '2',
      number: 'Invoice #006 - Nov 2022',
      date: 'Nov 1, 2022',
      billingDate: 'Nov 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '3',
      number: 'Invoice #005 - Oct 2022',
      date: 'Oct 1, 2022',
      billingDate: 'Oct 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '4',
      number: 'Invoice #004 - Sep 2022',
      date: 'Sep 1, 2022',
      billingDate: 'Sep 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '5',
      number: 'Invoice #003 - Aug 2022',
      date: 'Aug 1, 2022',
      billingDate: 'Aug 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '6',
      number: 'Invoice #002 - Jul 2022',
      date: 'Jul 1, 2022',
      billingDate: 'Jul 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    },
    {
      id: '7',
      number: 'Invoice #001 - Jun 2022',
      date: 'Jun 1, 2022',
      billingDate: 'Jun 1, 2022',
      status: 'Paid',
      amount: 'RWF 15,000',
      plan: 'Basic plan',
      duration: '1 Yr'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm text-gray-900">{invoice.number}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{invoice.billingDate}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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