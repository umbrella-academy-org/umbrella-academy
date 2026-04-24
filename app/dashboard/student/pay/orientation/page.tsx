'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, CheckCircle, ArrowLeft, Shield, Clock, Users } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types';

export default function OrientationPaymentPage() {
  const router = useRouter();
  const { user } = useAuth();
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
      setTimeout(() => {
        router.push('/dashboard/student');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      setPaymentStep('form');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Home" userType={UserRole.STUDENT} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              {/* Back Button */}
              <button
                onClick={() => router.push('/dashboard/student')}
                disabled={paymentStep === 'processing'}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>

              {/* Payment Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h1 className="text-xl font-semibold text-white">Orientation Session Payment</h1>
                  <p className="text-blue-100 text-sm mt-1">Complete your payment to schedule your mentor session</p>
                </div>

                <div className="p-6">
                  {paymentStep === 'form' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left: Payment Form */}
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Phone Number */}
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Mobile Money Phone Number *
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

                          {/* Security Notice */}
                          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                            <Shield className="w-4 h-4 text-gray-500 mt-0.5" />
                            <p className="text-xs text-gray-600">
                              Your payment is secured with MTN/Airtel Money. You'll receive a confirmation prompt on your phone.
                            </p>
                          </div>

                          {/* Submit Button */}
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

                      {/* Right: Order Summary */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Orientation Session</h3>
                              <p className="text-sm text-gray-600">1-on-1 session with expert mentor</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">30-45 Minutes</h3>
                              <p className="text-sm text-gray-600">Personalized roadmap discussion</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">20,000 RWF</span>
                          </div>
                          {formData.promoCode && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Promo Code</span>
                              <span>-0 RWF</span>
                            </div>
                          )}
                          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>20,000 RWF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentStep === 'processing' && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Processing Payment</h3>
                      <p className="text-gray-500 mb-4">Please wait while we process your payment...</p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-sm text-yellow-700">
                          Check your phone ({formData.phone}) for the payment confirmation prompt
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentStep === 'success' && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Payment Successful!</h3>
                      <p className="text-gray-500 mb-6">Your orientation session has been booked</p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                        <p className="text-sm text-green-700 mb-2">
                          You can now schedule your orientation session with a mentor
                        </p>
                        <p className="text-sm text-green-600">
                          Redirecting to dashboard...
                        </p>
                      </div>
                      <button
                        onClick={() => router.push('/dashboard/student')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
