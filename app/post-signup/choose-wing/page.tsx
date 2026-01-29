'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

interface Wing {
  id: string;
  title: string;
  description: string;
  icon: string;
  rating: number;
  students: number;
  mentors: number;
  trainers: {
    total: number;
    available: number;
    topTrainers: {
      name: string;
      avatar: string;
      specialization: string;
      rating: number;
    }[];
  };
  specializations: string[];
  averageCompletionTime: string;
  successRate: number;
  monthlyPrice: number;
}

export default function ChooseWingPage() {
  const router = useRouter();
  const [selectedWing, setSelectedWing] = useState('');
  const [error, setError] = useState('');

  const wings: Wing[] = [
    {
      id: 'tech-companies',
      title: 'Tech Companies Wing',
      description: 'Learn with technology sector companies and startups',
      icon: '💻',
      rating: 4.8,
      students: 1250,
      mentors: 8,
      trainers: {
        total: 24,
        available: 18,
        topTrainers: [
          {
            name: 'Sarah Johnson',
            avatar: 'SJ',
            specialization: 'Full Stack Development',
            rating: 4.9
          },
          {
            name: 'Michael Chen',
            avatar: 'MC',
            specialization: 'Backend Engineering',
            rating: 4.8
          },
          {
            name: 'Emma Williams',
            avatar: 'EW',
            specialization: 'Frontend & UI/UX',
            rating: 4.9
          }
        ]
      },
      specializations: ['Web Development', 'Mobile Apps', 'Cloud Computing', 'DevOps', 'AI/ML'],
      averageCompletionTime: '8-12 months',
      successRate: 94,
      monthlyPrice: 75000
    },
    {
      id: 'business-companies',
      title: 'Business Companies Wing',
      description: 'Business consulting and enterprise solutions',
      icon: '💼',
      rating: 4.6,
      students: 890,
      mentors: 6,
      trainers: {
        total: 18,
        available: 14,
        topTrainers: [
          {
            name: 'Dr. Alice Mukamana',
            avatar: 'AM',
            specialization: 'Business Strategy',
            rating: 4.8
          },
          {
            name: 'James Wilson',
            avatar: 'JW',
            specialization: 'Digital Marketing',
            rating: 4.7
          },
          {
            name: 'Grace Uwimana',
            avatar: 'GU',
            specialization: 'Project Management',
            rating: 4.9
          }
        ]
      },
      specializations: ['Business Analysis', 'Digital Marketing', 'Project Management', 'Data Analytics', 'Consulting'],
      averageCompletionTime: '6-10 months',
      successRate: 91,
      monthlyPrice: 65000
    },
    {
      id: 'hotels',
      title: 'Hotels Wing',
      description: 'Hospitality and tourism industry training',
      icon: '🏨',
      rating: 4.5,
      students: 675,
      mentors: 5,
      trainers: {
        total: 15,
        available: 12,
        topTrainers: [
          {
            name: 'Marie Uwimana',
            avatar: 'MU',
            specialization: 'Hotel Management',
            rating: 4.7
          },
          {
            name: 'Robert Kayitare',
            avatar: 'RK',
            specialization: 'Tourism Operations',
            rating: 4.6
          },
          {
            name: 'Linda Mutesi',
            avatar: 'LM',
            specialization: 'Customer Service',
            rating: 4.8
          }
        ]
      },
      specializations: ['Hotel Management', 'Tourism Operations', 'Customer Service', 'Event Planning', 'Food & Beverage'],
      averageCompletionTime: '4-8 months',
      successRate: 88,
      monthlyPrice: 55000
    }
  ];

  const handleWingSelect = (wingId: string) => {
    setSelectedWing(wingId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWing) {
      setError('Please select a wing to continue');
      return;
    }

    console.log('Selected wing:', selectedWing);
    // Store selected wing
    localStorage.setItem('selectedWing', selectedWing);
    router.push('/post-signup/payment');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            {/* Go back button */}
            <button
              onClick={() => router.push('/post-signup/availability')}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black uppercase">Go back</span>
            </button>

            <div className="text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
                Choose Your Wing
              </h1>
              <p className="text-gray-500 mb-10 text-center text-sm">
                Select the industry wing that matches your career goals.
              </p>

              {/* Form */}
              <form onSubmit={handleContinue} className="w-full">
                <div className="space-y-4 mb-8">
                  {wings.map((wing) => (
                    <div
                      key={wing.id}
                      className={`border rounded-lg cursor-pointer transition-all ${selectedWing === wing.id
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      onClick={() => handleWingSelect(wing.id)}
                    >
                      {/* Wing Header */}
                      <div className="flex items-start gap-4 p-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-sm transition-colors ${selectedWing === wing.id ? 'bg-yellow-600 text-white' : 'bg-gray-50'
                          }`}>
                          {wing.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <h3 className={`text-sm font-semibold truncate ${selectedWing === wing.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                {wing.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">
                                {wing.students.toLocaleString()} Students • {wing.mentors} Mentors • {wing.trainers.total} Trainers
                              </p>
                            </div>
                            {selectedWing === wing.id && (
                              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 ml-2" />
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            {renderStars(wing.rating)}
                            <span className="text-[10px] font-medium text-yellow-600 uppercase tracking-wider">
                              {wing.successRate}% Success Rate
                            </span>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-gray-900">
                              RWF {wing.monthlyPrice.toLocaleString()}/year
                            </span>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {wing.averageCompletionTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wing Details */}
                      <div className="px-4 pb-4">
                        {/* Specializations */}
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-2">Specializations:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {wing.specializations.slice(0, 3).map((spec, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap">
                                {spec}
                              </span>
                            ))}
                            {wing.specializations.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                                +{wing.specializations.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top Trainers */}
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-2">Top Trainers:</p>
                          <div className="space-y-2">
                            {wing.trainers.topTrainers.map((trainer, index) => (
                              <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                                  {trainer.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">{trainer.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{trainer.specialization}</p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {renderStars(trainer.rating)}
                                  <span className="text-xs text-gray-500">({trainer.rating})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                          <span className="text-gray-600">
                            <span className="font-medium text-green-600">{wing.trainers.available}</span> of {wing.trainers.total} trainers available
                          </span>
                          <span className="text-gray-500 whitespace-nowrap">
                            Avg completion: {wing.averageCompletionTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {error && <p className="mb-4 text-xs font-medium text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all active:scale-95"
                >
                  Continue to Payment
                </button>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 pt-6">
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </form>

              {/* Footer */}
              <div className="text-sm text-gray-500 mt-8">
                © Umbrella Academy 2025
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}