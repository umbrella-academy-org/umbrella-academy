'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import { useFinancial } from '@/contexts';

const features = [
  'Access to wing companies',
  'Collaborative roadmap creation',
  'Live training sessions',
  'Mentor guidance',
  'Progress tracking',
];

export default function CurrentPlan() {
  const { getUserSubscriptions, isLoading } = useFinancial();
  const subscriptions = getUserSubscriptions();
  const activeSub = subscriptions.find(s => s.status === 'active') ?? null;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 bg-gray-200 rounded w-40"></div>
            <div className="text-right">
              <div className="h-8 bg-gray-200 rounded w-28 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activeSub) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm text-center py-8">No active subscription found.</p>
      </div>
    );
  }

  const start = new Date(activeSub.startDate);
  const end = new Date(activeSub.endDate);
  const now = new Date();
  const totalMonths = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const currentMonth = Math.round((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const progressPercentage = totalMonths > 0 ? Math.min((currentMonth / totalMonths) * 100, 100) : 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{activeSub.planName}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{activeSub.currency} {activeSub.amount.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per {activeSub.billingCycle}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">Complete learning experience with wing companies.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="text-sm text-gray-600 capitalize">{activeSub.status}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{currentMonth} of {totalMonths} months completed</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Started</div>
              <div className="font-medium text-gray-900">{new Date(activeSub.startDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-gray-500">Next billing</div>
              <div className="font-medium text-gray-900">{new Date(activeSub.endDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Plan includes:</h4>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-yellow-600" />
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
