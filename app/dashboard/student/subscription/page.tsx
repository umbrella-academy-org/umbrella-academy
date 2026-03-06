'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import SubscriptionHeader from '@/components/subscription/SubscriptionHeader';
import SearchAndFilters from '@/components/subscription/SearchAndFilters';
import CurrentPlan from '@/components/subscription/CurrentPlan';
import PaymentMethod from '@/components/subscription/PaymentMethod';
import BillingInvoices from '@/components/subscription/BillingInvoices';

export default function SubscriptionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Subscription" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Subscription Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Subscription Header */}
            <SubscriptionHeader />

            {/* Search and Filters */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
            />

            {/* Caregivers Count */}
            <div className="mt-4 lg:mt-6 mb-3 lg:mb-4">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">1000+ Caregivers</h2>
            </div>

            {/* Main Subscription Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
              {/* Left Column - Current Plan */}
              <div className="space-y-4 lg:space-y-6">
                <CurrentPlan />
              </div>

              {/* Right Column - Payment Method */}
              <div className="space-y-4 lg:space-y-6">
                <PaymentMethod />
              </div>
            </div>

            {/* Billing and Invoices - Full Width */}
            <div className="mt-6 lg:mt-8">
              <BillingInvoices />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}