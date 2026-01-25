'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import WalletHeader from '@/components/trainer/WalletHeader';
import WalletBalance from '@/components/trainer/WalletBalance';
import EarningsStats from '@/components/trainer/EarningsStats';
import TransactionHistory from '@/components/trainer/TransactionHistory';

export default function TrainerWalletPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Wallet" userType="trainer" />

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Wallet Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 lg:p-4">
            {/* Wallet Header */}
            <WalletHeader />

            {/* Main Wallet Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
              {/* Left Column - Balance */}
              <div className="space-y-4 lg:space-y-6">
                <WalletBalance />
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-4 lg:space-y-6">
                <EarningsStats />
              </div>
            </div>

            {/* Transaction History - Full Width */}
            <div className="mt-6 lg:mt-8">
              <TransactionHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}