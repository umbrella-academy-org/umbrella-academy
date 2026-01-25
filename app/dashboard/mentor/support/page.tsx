'use client';

import Sidebar from '@/components/dashboard/Sidebar';


export default function MentorSupportPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Support" userType="mentor" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Support Center</h1>
              <p className="text-gray-600">Get help and support for your mentoring activities.</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Get help from our support team</p>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                    Contact Us
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                  <p className="text-sm text-gray-600 mb-3">Browse our knowledge base</p>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Browse Articles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}