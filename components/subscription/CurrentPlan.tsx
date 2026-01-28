'use client';

import { ArrowRight } from 'lucide-react';

export default function CurrentPlan() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Basic plan</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">RWF 75,000</div>
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
            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
          </div>
        </div>

        <a 
          href="/post-signup/subscription/renew"
          className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium text-sm"
        >
          Upgrade plan
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}