'use client';

import { RotateCcw, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useFinancial, useAuth, useUsers } from '@/contexts';
import { useMemo } from 'react';

export default function SubscriptionHeader() {
  const { getUserSubscriptions } = useFinancial();
  const { user } = useAuth();
  const { students } = useUsers();
  const subscriptions = getUserSubscriptions();
  const activeSub = subscriptions.find(s => s.status === 'active');

  // Get current student from students list
  const currentStudent = useMemo(() => {
    if (!user) return null;
    return students.find(s => s._id === user._id) ?? null;
  }, [students, user]);

  // Check subscription status from onboarding checklist
  const hasPaidFromOnboarding = currentStudent?.onboardingStatus?.subscriptionPayed ?? false;
  const hasActiveFromFlag = currentStudent?.hasActiveSubscription ?? false;
  const hasActiveSubscription = hasPaidFromOnboarding || hasActiveFromFlag || !!activeSub;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subscription</h1>
        <p className="text-gray-600 mt-1">
          {activeSub 
            ? `Your ${activeSub.planName} is active until ${new Date(activeSub.endDate).toLocaleDateString()}`
            : hasActiveSubscription
            ? 'Your subscription is active via onboarding completion'
            : 'Complete onboarding and subscribe to access mentorship features'
          }
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          hasActiveSubscription 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          {hasActiveSubscription ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                {activeSub ? 'Auto-renewal on' : 'Active via onboarding'}
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">Subscription required</span>
            </>
          )}
        </div>
        <a
          href="/dashboard/student/pay/subscription"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          {hasActiveSubscription ? 'Renew' : 'Subscribe'}
        </a>
      </div>
    </div>
  );
}