'use client';

import { useState } from 'react';
import { CreditCard, Phone, CheckCircle, AlertCircle } from 'lucide-react';

interface MoMoPaymentProps {
  amount: number;
  wingId?: string;
  studentId?: string;
  onPaymentSuccess: (transactionId?: string) => void;
  onPaymentError?: (error: string) => void;
}

export default function MoMoPayment({
  amount,
  wingId = 'default-wing',
  studentId = 'default-student',
  onPaymentSuccess,
  onPaymentError
}: MoMoPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Simulate MoMo API call
      const response = await simulateMoMoPayment({
        phoneNumber,
        amount,
        wingId,
        studentId
      });

      if (response.success) {
        setPaymentStatus('success');
        // Automatic revenue distribution (65% wing, 25% academy)
        const revenueDistribution = {
          wingShare: amount * 0.65,
          academyShare: amount * 0.25,
          processingFee: amount * 0.10,
          wingId,
          transactionId: response.transactionId
        };
        
        // Store payment data
        localStorage.setItem('lastPayment', JSON.stringify({
          transactionId: response.transactionId,
          amount,
          wingId,
          studentId,
          revenueDistribution,
          timestamp: new Date().toISOString()
        }));

        onPaymentSuccess(response.transactionId!);
      } else {
        throw new Error(response.error || 'Payment failed');
      }
    } catch (error) {
      setPaymentStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Payment processing failed';
      setErrorMessage(errorMsg);
      if (onPaymentError) {
        onPaymentError(errorMsg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate MoMo payment API
  const simulateMoMoPayment = async (paymentData: any): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            transactionId: `MOMO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          });
        } else {
          resolve({
            success: false,
            error: 'Insufficient balance or network error'
          });
        }
      }, 2000);
    });
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your payment of {amount.toLocaleString()} RWF has been processed successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>Revenue Distribution:</p>
            <p>• Wing Share (65%): {(amount * 0.65).toLocaleString()} RWF</p>
            <p>• Academy Share (25%): {(amount * 0.25).toLocaleString()} RWF</p>
            <p>• Processing Fee (10%): {(amount * 0.10).toLocaleString()} RWF</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Phone className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">MoMo Payment</h3>
          <p className="text-sm text-gray-600">Pay securely with Mobile Money</p>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount to Pay:</span>
          <span className="text-xl font-semibold text-amber-900">{amount.toLocaleString()} RWF</span>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Money Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="07XXXXXXXX"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            disabled={isProcessing}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Enter your MTN Mobile Money or Airtel Money number
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">{errorMessage}</span>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing || !phoneNumber}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Pay with MoMo
          </>
        )}
      </button>

      {/* Payment Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>You will receive a prompt on your phone to authorize this payment.</p>
        <p className="mt-1">Revenue will be automatically distributed to your wing.</p>
      </div>
    </div>
  );
}