'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MoMoPayment from '@/components/payment/MoMoPayment';
import Sidebar from '@/components/dashboard/Sidebar';

export default function PaymentPage() {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    console.log('Payment completed successfully');
    localStorage.setItem('paymentCompleted', 'true');
    router.push('/post-signup/choose-trainer');
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-8">
            {/* Go back button */}
            <button
              onClick={() => router.push('/post-signup/choose-wing')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go back
            </button>

            <div className="text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Complete Payment
              </h1>
              <p className="text-gray-500 mb-8 text-center">
                Pay with MoMo to unlock your wing access and start creating your roadmap.
              </p>

              {/* Pricing */}
              <div className="w-full p-4 bg-gray-50 rounded-lg border mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Wing Explorer Plan</h3>
                    <p className="text-sm text-gray-600">Annual subscription with full access</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">RWF 75,000</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>
              </div>

              {/* MoMo Payment Component */}
              <div className="w-full">
                <MoMoPayment 
                  amount={75000}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-500 mt-8">
                © Umbrella Academy 2025
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}