'use client';

import { Smartphone, Mail, Plus, CheckCircle } from 'lucide-react';

export default function PaymentMethod() {
  // Mock user payment data
  const paymentMethods = [
    {
      id: 1,
      type: 'momo',
      provider: 'MTN MoMo',
      phoneNumber: '+250 788 123 456',
      isDefault: true,
      status: 'verified'
    },
    {
      id: 2,
      type: 'momo',
      provider: 'Airtel Money',
      phoneNumber: '+250 739 987 654',
      isDefault: false,
      status: 'verified'
    }
  ];

  const billingEmail = 'student@example.com';

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment method</h3>
        <p className="text-sm text-gray-600 mb-6">Manage your MoMo payment methods for subscriptions.</p>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className={`border rounded-lg p-4 ${
              method.isDefault ? 'border-gray-200 bg-gray-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    method.provider === 'MTN MoMo' ? 'bg-gray-100' : 'bg-gray-100'
                  }`}>
                    <Smartphone className={`w-5 h-5 ${
                      method.provider === 'MTN MoMo' ? 'text-gray-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">{method.provider}</div>
                      {method.isDefault && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      {method.phoneNumber}
                      {method.status === 'verified' && (
                        <CheckCircle className="w-3 h-3 text-yellow-600" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                      Set Default
                    </button>
                  )}
                  <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Payment Method */}
        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors group">
          <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-600">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add new MoMo account</span>
          </div>
        </button>

        {/* Billing Email */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <div>
                <div className="text-gray-900 font-medium">Billing email</div>
                <div>{billingEmail}</div>
              </div>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}