'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function MentorWalletPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Wallet" userType="mentor" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          breadcrumb="Wallet" 
          userType="mentor"
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Wallet</h1>
              <p className="text-gray-600">Your earnings and payment history will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}