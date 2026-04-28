'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import SubscriptionHeader from '@/components/subscription/SubscriptionHeader';
import CurrentPlan from '@/components/subscription/CurrentPlan';
import PaymentMethod from '@/components/subscription/PaymentMethod';
import BillingInvoices from '@/components/subscription/BillingInvoices';

export default function SubscriptionPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Subscription" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-6xl mx-auto">
            {/* Header */}
            <SubscriptionHeader />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Current Plan */}
              <CurrentPlan />

              {/* Payment Method */}
              <PaymentMethod />
            </div>

            {/* Billing History */}
            <div className="mt-6">
              <BillingInvoices />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}