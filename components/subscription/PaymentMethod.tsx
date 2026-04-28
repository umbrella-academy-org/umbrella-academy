'use client';

import { CreditCard, Clock, AlertCircle } from 'lucide-react';

export default function PaymentMethod() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
      </div>

      {/* Coming Soon State */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h4>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-4">
          Payment method management will be available soon. For now, you can pay directly when renewing your subscription.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 bg-yellow-50 rounded-lg py-2 px-4">
          <AlertCircle className="w-4 h-4" />
          <span>Mobile Money (MoMo) supported</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Supported methods</span>
          <span className="font-medium text-gray-900">MTN MoMo, Airtel Money</span>
        </div>
      </div>
    </div>
  );
}