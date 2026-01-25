'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import MentorWalletHeader from '@/components/dashboard/MentorWalletHeader';
import MentorWalletBalance from '@/components/dashboard/MentorWalletBalance';
import MentorEarningsStats from '@/components/dashboard/MentorEarningsStats';
import MentorTransactionHistory from '@/components/dashboard/MentorTransactionHistory';

export default function MentorWalletPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Wallet" userType="mentor" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Wallet Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Wallet Header */}
            <MentorWalletHeader />

            {/* Main Wallet Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
              {/* Left Column - Balance */}
              <div className="space-y-4 lg:space-y-6">
                <MentorWalletBalance />
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-4 lg:space-y-6">
                <MentorEarningsStats />
              </div>
            </div>

            {/* Transaction History - Full Width */}
            <div className="mt-6 lg:mt-8">
              <MentorTransactionHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}