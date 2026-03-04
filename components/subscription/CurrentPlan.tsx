'use client';

import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function CurrentPlan() {
  // Mock user subscription data
  const subscription = {
    planName: 'Wing Explorer Plan',
    price: 75000,
    currency: 'RWF',
    billingCycle: 'yearly',
    currentMonth: 2,
    totalMonths: 12,
    startDate: '2024-01-15',
    nextBillingDate: '2025-01-15',
    status: 'active',
    features: [
      'Access to wing companies',
      'Collaborative roadmap creation',
      'Live training sessions',
      'Mentor guidance',
      'Progress tracking'
    ]
  };

  const progressPercentage = (subscription.currentMonth / subscription.totalMonths) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{subscription.planName}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{subscription.currency} {subscription.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per {subscription.billingCycle}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">Complete learning experience with wing companies.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="text-sm text-gray-600 capitalize">{subscription.status}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{subscription.currentMonth} of {subscription.totalMonths} months completed</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Started</div>
              <div className="font-medium text-gray-900">{new Date(subscription.startDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-gray-500">Next billing</div>
              <div className="font-medium text-gray-900">{new Date(subscription.nextBillingDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Plan includes:</h4>
          <div className="space-y-2">
            {subscription.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <a 
          href="/post-signup/subscription/renew"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors"
        >
          Upgrade plan
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}