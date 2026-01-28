'use client';

import { CreditCard, Mail } from 'lucide-react';

export default function PaymentMethod() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment method</h3>
        <p className="text-sm text-gray-600 mb-6">Change how you pay for your plan.</p>

        {/* Visa Card */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-yellow-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Visa ending in 1234</div>
                <div className="text-xs text-gray-500">Expiry 06/2024</div>
              </div>
            </div>
            <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
              Edit
            </button>
          </div>
        </div>

        {/* Billing Email */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>billing@umbrellaacademy.com</span>
        </div>
      </div>
    </div>
  );
}