'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import SubscriptionHeader from '@/components/subscription/SubscriptionHeader';
import SearchAndFilters from '@/components/subscription/SearchAndFilters';
import CurrentPlan from '@/components/subscription/CurrentPlan';
import PaymentMethod from '@/components/subscription/PaymentMethod';
import BillingInvoices from '@/components/subscription/BillingInvoices';

export default function SubscriptionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Subscription" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header breadcrumb="Plan & Subscriptions" />

        {/* Subscription Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-4">
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
            <div className="mt-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">1000+ Caregivers</h2>
            </div>

            {/* Main Subscription Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Left Column - Current Plan */}
              <div className="space-y-6">
                <CurrentPlan />
              </div>

              {/* Right Column - Payment Method */}
              <div className="space-y-6">
                <PaymentMethod />
              </div>
            </div>

            {/* Billing and Invoices - Full Width */}
            <div className="mt-8">
              <BillingInvoices />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}