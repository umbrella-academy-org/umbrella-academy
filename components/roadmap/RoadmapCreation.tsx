'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Users, Star, ArrowRight, CreditCard } from 'lucide-react';
import { StudentRoadmap, Roadmap } from '@/types';

interface RoadmapCreationProps {
  roadmap: Roadmap;
  onRoadmapCreated: (roadmap: StudentRoadmap) => void;
}

export default function RoadmapCreation({ roadmap, onRoadmapCreated }: RoadmapCreationProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState<'preview' | 'payment' | 'creating' | 'completed'>('preview');

  const handleCreateRoadmap = async () => {
    setIsCreating(true);
    setStep('payment');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('creating');
      
      // Simulate roadmap creation
      setTimeout(() => {
        const newRoadmap: StudentRoadmap = {
          id: `roadmap-${Date.now()}`,
          studentId: 'current-student',
          roadmapId: roadmap.id,
          roadmap: roadmap,
          enrolledAt: new Date().toISOString(),
          startedAt: new Date().toISOString(),
          expectedCompletionDate: new Date(Date.now() + roadmap.estimatedDuration * 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          subscription: {
            planId: 'basic-yearly',
            planName: 'Basic Plan',
            amount: 75000,
            currency: 'RWF',
            billingCycle: 'yearly',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            autoRenew: true
          },
          lastAccessedAt: new Date().toISOString(),
          currentActivity: {
            type: 'session',
            id: roadmap.phases[0]?.sessions[0]?.id || '',
            title: roadmap.phases[0]?.sessions[0]?.title || ''
          },
          notifications: {
            upcomingSessions: [],
            overdueAssignments: [],
            newContent: []
          }
        };
        
        setStep('completed');
        setTimeout(() => {
          onRoadmapCreated(newRoadmap);
        }, 2000);
      }, 3000);
    }, 2000);
  };

  if (step === 'payment') {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-gray-600 mb-6">Please wait while we process your payment...</p>
        <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (step === 'creating') {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Roadmap</h3>
        <p className="text-gray-600 mb-6">Setting up your personalized learning path...</p>
        <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Roadmap Created!</h3>
        <p className="text-gray-600 mb-6">Your personalized learning journey is ready. Redirecting to your roadmap...</p>
      </div>
    );
  }

  const totalSessions = roadmap.phases.reduce((total, phase) => total + phase.sessions.length, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Learning Roadmap</h3>
        <p className="text-gray-600">Start your personalized learning journey with {roadmap.title}</p>
      </div>

      {/* Roadmap Preview */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{roadmap.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{roadmap.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{roadmap.estimatedDuration} weeks</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gray-500 fill-current" />
                <span>{roadmap.difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{roadmap.phases.length} phases</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">What you'll get:</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">{roadmap.phases.length} structured learning phases</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              {totalSessions} interactive sessions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              Live mentoring and collaboration sessions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Personal mentor guidance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Progress tracking and certificates</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Basic Plan</h4>
            <p className="text-sm text-gray-600">Full access to roadmap and mentoring</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">RWF 75,000</div>
            <div className="text-sm text-gray-500">per year</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCreateRoadmap}
        disabled={isCreating}
        className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isCreating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Roadmap...
          </>
        ) : (
          <>
            Start Learning Journey
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        By continuing, you agree to our terms of service and privacy policy
      </p>
    </div>
  );
}