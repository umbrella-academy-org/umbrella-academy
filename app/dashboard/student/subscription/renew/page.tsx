'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import RenewHeader from '@/components/subscription/RenewHeader';
import PaymentMethodForm from '@/components/subscription/PaymentMethodForm';

export default function RenewSubscriptionPage() {
  const [formData, setFormData] = useState({
    nameOnCard: 'Olivia Rhye',
    cardNumber: '1234 1234 1234 1234',
    expiry: '06 / 2024',
    cvv: '',
    email: 'billing@umbrellaacademy.com',
    streetAddress: '100 Smith Street',
    city: 'Collingwood',
    state: 'VIC',
    postalCode: '3066',
    country: 'Australia'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Subscription" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header breadcrumb="Plan & Subscriptions" />

        {/* Renew Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Renew Header */}
            <RenewHeader />

            {/* Back Button */}
            <div className="mt-4 lg:mt-6 mb-4 lg:mb-6">
              <a 
                href="/dashboard/student/subscription"
                className="bg-yellow-600 text-white px-3 lg:px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors inline-block text-sm lg:text-base"
              >
                ← Back
              </a>
            </div>

            {/* Payment Method Form */}
            <div className="max-w-4xl">
              <PaymentMethodForm 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}