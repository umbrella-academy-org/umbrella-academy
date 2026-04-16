'use client';

import { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';

interface OrientationPaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function OrientationPaymentModal({ onClose, onSuccess }: OrientationPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    phone: '',
    promoCode: ''
  });
  const { payOriantaionPayment } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      await payOriantaionPayment(formData.promoCode);
      setPaymentStep('success');
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      setPaymentStep('form');
    }
  };

  const handleClose = () => {
    if (paymentStep !== 'processing') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {paymentStep === 'form' && 'Orientation Session Payment'}
            {paymentStep === 'processing' && 'Processing Payment'}
            {paymentStep === 'success' && 'Payment Successful'}
          </h2>
          <button
            onClick={handleClose}
            disabled={paymentStep === 'processing'}
            className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStep === 'form' && (
            <div>
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-blue-900 mb-2">Orientation Session</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Get your personalized learning roadmap created by an expert mentor
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-900">20,000 RWF</span>
                    <div className="text-right">
                      <p className="text-sm text-blue-700">One-time payment</p>
                      <p className="text-xs text-blue-600">Includes roadmap creation</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Money Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+250 7XX-XXX-XXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your MTN/Airtel Money phone number
                  </p>
                </div>

                {/* Promo Code */}
                <div>
                  <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    value={formData.promoCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, promoCode: e.target.value }))}
                    placeholder="Enter promo code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing || !formData.phone}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? 'Processing...' : 'Pay 20,000 RWF'}
                </button>
              </form>
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-500">Please wait while we process your payment...</p>
              <p className="text-sm text-gray-400 mt-2">Check your phone for payment confirmation</p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-4">Your orientation session has been booked</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  You can now schedule your orientation session with a mentor
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
