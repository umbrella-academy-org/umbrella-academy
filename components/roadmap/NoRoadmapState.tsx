'use client';

import { Map, ArrowRight, Star, Clock, Users } from 'lucide-react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

export default function NoRoadmapState() {
  const { navigate } = useNavigationWithLoading();

  const handleCreateRoadmap = () => {
    // Redirect to complete profile/auth flow
    navigate('/auth/student/profile');
  };

  const features = [
    {
      icon: Map,
      title: 'Structured Learning Path',
      description: 'Follow a carefully designed curriculum with phases and milestones'
    },
    {
      icon: Users,
      title: 'Personal Mentorship',
      description: 'Get guidance from experienced mentors through live sessions'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with scheduled live sessions'
    },
    {
      icon: Star,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Map className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-amber-900 mb-4">
            Complete Your Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            It looks like you haven't completed your profile setup yet. Complete your profile 
            to create your personalized learning roadmap with structured phases and mentoring sessions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Ready to Complete Your Setup?
          </h2>
          <p className="text-gray-600 mb-6">
            Complete your profile to create your personalized learning roadmap
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCreateRoadmap}
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Complete Profile
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {/* Debug button - remove in production */}
            <button
              onClick={() => {
                localStorage.setItem('hasRoadmap', 'true');
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Sample Roadmap
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 text-center">
          <div>
            <div className="text-2xl font-bold text-amber-900">1,200+</div>
            <div className="text-sm text-gray-600">Students Learning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-900">50+</div>
            <div className="text-sm text-gray-600">Expert Mentors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-900">95%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}