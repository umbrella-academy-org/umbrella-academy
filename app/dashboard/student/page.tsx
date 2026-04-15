'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Lock, CreditCard, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { OnboardingChecklist, UserRole } from '@/types';
import OrientationPaymentModal from '@/components/payment/OrientationPaymentModal';
import SubscriptionPaymentModal from '@/components/payment/SubscriptionPaymentModal';
import BookingCalendar from '@/components/booking/BookingCalendar';
import Sidebar from '@/components/dashboard/Sidebar';

export default function StudentDashboard() { 
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { navigate } = useNavigationWithLoading();

  // State for onboarding checklist
  const [onboardingChecklist, setOnboardingChecklist] = useState<OnboardingChecklist>({
    accountCreated: true,
    bookingPayed: false,
    subscriptionPayed: false,
    orientationBooked: false,
    roadmapReceived: false,
    learningStarted: false
  });

  // Modal states
  const [showOrientationPayment, setShowOrientationPayment] = useState(false);
  const [showSubscriptionPayment, setShowSubscriptionPayment] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (!authLoading && user && user.role !== 'student') {
      navigate('/dashboard/trainer');
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-gray-100 animate-pulse"></div>
          <div className="flex-1 p-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated or not a student
  if (!user || user.role !== 'student') {
    return null;
  }

  // Calculate overall progress
  const completedSteps = Object.values(onboardingChecklist).filter(Boolean).length;
  const totalSteps = Object.keys(onboardingChecklist).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // Handle orientation payment success
  const handleOrientationPaymentSuccess = () => {
    setOnboardingChecklist(prev => ({ ...prev, bookingPayed: true }));
    setShowOrientationPayment(false);
    setShowBookingCalendar(true);
  };

  // Handle subscription payment success
  const handleSubscriptionPaymentSuccess = () => {
    setOnboardingChecklist(prev => ({ ...prev, subscriptionPayed: true }));
    setShowSubscriptionPayment(false);
  };

  // Handle booking completion
  const handleBookingComplete = () => {
    setOnboardingChecklist(prev => ({ ...prev, orientationBooked: true }));
    setShowBookingCalendar(false);
  };

  // Handle roadmap creation
  const handleRoadmapCreated = () => {
    setOnboardingChecklist(prev => ({ ...prev, roadmapReceived: true }));
  };

  // Handle learning start
  const handleLearningStarted = () => {
    setOnboardingChecklist(prev => ({ ...prev, learningStarted: true }));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar 
        activeItem="Home" 
        userType={UserRole.STUDENT} 
        onboardingChecklist={onboardingChecklist}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.firstName}</h1>
              <p className="text-gray-500">Your mentorship journey starts here</p>
            </div>

            {/* Main CTA Button */}
            {!onboardingChecklist.bookingPayed && (
              <button
                onClick={() => setShowOrientationPayment(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay Orientation Fee (20,000 RWF)
              </button>
            )}

            {onboardingChecklist.bookingPayed && !onboardingChecklist.subscriptionPayed && (
              <button
                onClick={() => setShowSubscriptionPayment(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay Subscription (100,000 RWF/month)
              </button>
            )}
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Progress Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                 />
              </div>
            </div>
          </div>

          {/* Onboarding Checklist */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'accountCreated', label: 'Account Created', description: 'Your account is ready to use' },
                { key: 'bookingPayed', label: 'Orientation Fee Paid', description: '20,000 RWF for roadmap creation' },
                { key: 'orientationBooked', label: 'Orientation Booked', description: 'Schedule your mentor session' },
                { key: 'subscriptionPayed', label: 'Subscription Active', description: '100,000 RWF/month for mentorship' },
                { key: 'roadmapReceived', label: 'Roadmap Created', description: 'Your personalized learning path' },
                { key: 'learningStarted', label: 'Learning Started', description: 'Begin your mentorship journey' },
              ].map((step) => (
                <div
                  key={step.key}
                  className={`bg-white border rounded-lg p-4 ${onboardingChecklist[step.key as keyof OnboardingChecklist]
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${onboardingChecklist[step.key as keyof OnboardingChecklist]
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                      }`}>
                      {onboardingChecklist[step.key as keyof OnboardingChecklist] ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{step.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {!onboardingChecklist.bookingPayed && (
                <button
                  onClick={() => setShowOrientationPayment(true)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors text-left"
                >
                  <CreditCard className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Pay Orientation Fee</h3>
                  <p className="text-sm text-gray-500 mt-1">Start your journey</p>
                </button>
              )}

              {onboardingChecklist.bookingPayed && !onboardingChecklist.orientationBooked && (
                <button
                  onClick={() => setShowBookingCalendar(true)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors text-left"
                >
                  <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Book Orientation</h3>
                  <p className="text-sm text-gray-500 mt-1">Schedule your session</p>
                </button>
              )}

              {onboardingChecklist.orientationBooked && !onboardingChecklist.subscriptionPayed && (
                <button
                  onClick={() => setShowSubscriptionPayment(true)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors text-left"
                >
                  <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Activate Subscription</h3>
                  <p className="text-sm text-gray-500 mt-1">Unlock learning features</p>
                </button>
              )}

              {onboardingChecklist.subscriptionPayed && (
                <button
                  onClick={handleLearningStarted}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors text-left"
                >
                  <BookOpen className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Start Learning</h3>
                  <p className="text-sm text-gray-500 mt-1">Begin your roadmap</p>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showOrientationPayment && (
        <OrientationPaymentModal
          onClose={() => setShowOrientationPayment(false)}
          onSuccess={handleOrientationPaymentSuccess}
        />
      )}

      {showSubscriptionPayment && (
        <SubscriptionPaymentModal
          onClose={() => setShowSubscriptionPayment(false)}
          onSuccess={handleSubscriptionPaymentSuccess}
        />
      )}

      {showBookingCalendar && (
        <BookingCalendar
          onClose={() => setShowBookingCalendar(false)}
          onSuccess={handleBookingComplete}
        />
      )}
    </div>
  );
}