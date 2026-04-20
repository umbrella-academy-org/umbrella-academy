'use client';

import { useState } from 'react';
import { X, CreditCard, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';

interface SubscriptionPaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscriptionPaymentModal({ onClose, onSuccess }: SubscriptionPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { paySubscriptionPayment } = usePayment();
  const [formData, setFormData] = useState({
    phone: '',
    promoCode: ''
  });

  const monthlyPrice = 100000;
  const yearlyPrice = monthlyPrice * 12 * 0.9; // 10% discount for yearly
  const currentPrice = billingCycle === 'monthly' ? monthlyPrice : yearlyPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      await paySubscriptionPayment(formData.promoCode);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-screen overflow-auto">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {paymentStep === 'form' && 'Subscription Payment'}
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
              {/* Billing Cycle Selection */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Choose Billing Cycle</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`p-3 border rounded-lg transition-colors ${
                      billingCycle === 'monthly'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">Monthly</div>
                    <div className="text-sm">100,000 RWF</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`p-3 border rounded-lg transition-colors ${
                      billingCycle === 'yearly'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">Yearly</div>
                    <div className="text-sm">1,080,000 RWF</div>
                    <div className="text-xs text-green-600">Save 10%</div>
                  </button>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="mb-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-purple-900 mb-2">Mentorship Subscription</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Ongoing mentorship, progress tracking, and platform access
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-900">
                      {currentPrice.toLocaleString()} RWF
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-purple-700">
                        {billingCycle === 'monthly' ? 'Per month' : 'Per year'}
                      </p>
                      <p className="text-xs text-purple-600">Auto-renewable</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium">Auto-renewal Notice</p>
                      <p>Your subscription will automatically renew. You can cancel anytime.</p>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing || !formData.phone}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? 'Processing...' : `Pay ${currentPrice.toLocaleString()} RWF`}
                </button>
              </form>
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
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
              <p className="text-gray-500 mb-4">Your mentorship subscription is now active</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 mb-2">
                  Your subscription is active and will auto-renew
                </p>
                <p className="text-sm text-green-600">
                  Next billing date: {new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
