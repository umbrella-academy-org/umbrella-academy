'use client';

import { ArrowRight } from 'lucide-react';

export default function CurrentPlan() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Basic plan</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">€50</div>
            <div className="text-sm text-gray-500">per year</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">Our most popular plan for our families.</p>
          <div className="text-sm text-gray-600">Monthly</div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>2nd of 12 months subscription</span>
            <span>16.67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
          </div>
        </div>

        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
          Upgrade plan
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}