'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, Shield, Star, Users, X } from 'lucide-react';

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
}

export default function ChooseWingPage() {
  const router = useRouter();
  const [selectedWing, setSelectedWing] = useState('');
  const [error, setError] = useState('');
  const [viewingWing, setViewingWing] = useState<Wing | null>(null);

  const wings: Wing[] = [
    {
      id: 'programming',
      title: 'Winners',
      description: 'Learn to build software, websites, and apps',
      icon: '💻',
      rating: 4.5,
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
          }
        ]
      },
      specializations: ['Web Development', 'Mobile Apps', 'Cloud Computing', 'DevOps'],
      averageCompletionTime: '8-12 months',
      successRate: 94,
    },
    {
      id: 'design',
      title: 'Figma',
      description: 'Create beautiful and user-friendly interfaces',
      icon: '🎨',
      rating: 4.3,
      students: 890,
      mentors: 6,
      trainers: {
        total: 15,
        available: 12,
        topTrainers: [
          {
            name: 'Emma Williams',
            avatar: 'EW',
            specialization: 'UI/UX Design',
            rating: 4.9
          },
          {
            name: 'David Kim',
            avatar: 'DK',
            specialization: 'Product Design',
            rating: 4.7
          }
        ]
      },
      specializations: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
      averageCompletionTime: '6-10 months',
      successRate: 91,
    },
    {
      id: 'data-science',
      title: 'Cargo',
      description: 'Analyze data and build machine learning models',
      icon: '📊',
      rating: 4.6,
      students: 675,
      mentors: 5,
      trainers: {
        total: 12,
        available: 9,
        topTrainers: [
          {
            name: 'Dr. Alice Chen',
            avatar: 'AC',
            specialization: 'Machine Learning',
            rating: 4.8
          },
          {
            name: 'Robert Wilson',
            avatar: 'RW',
            specialization: 'Data Analytics',
            rating: 4.7
          }
        ]
      },
      specializations: ['Machine Learning', 'Data Analytics', 'Python', 'Statistics'],
      averageCompletionTime: '10-14 months',
      successRate: 89,
    },
    {
      id: 'cybersecurity',
      title: 'TryHackMe',
      description: 'Protect systems and networks from threats',
      icon: '🔒',
      rating: 4.4,
      students: 450,
      mentors: 4,
      trainers: {
        total: 10,
        available: 7,
        topTrainers: [
          {
            name: 'James Security',
            avatar: 'JS',
            specialization: 'Network Security',
            rating: 4.6
          },
          {
            name: 'Lisa Guard',
            avatar: 'LG',
            specialization: 'Ethical Hacking',
            rating: 4.8
          }
        ]
      },
      specializations: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
      averageCompletionTime: '8-12 months',
      successRate: 87,
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
    router.push('/auth/student/payment');
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
      {/* Left side - Form */}
      <div className="flex-[2] flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full">
            {/* Go back button */}
            <button
              onClick={() => router.push('/post-signup/availability')}
              className="flex items-center gap-2 text-gray-600hover:text-gray-900 mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black ">Go back</span>
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

              {/* Wing Selection List */}
              <form onSubmit={handleContinue} className="w-full max-w-2xl mx-auto">
                <div className="space-y-4 mb-10">
                  {wings.map((wing) => {
                    const isSelected = selectedWing === wing.id;
                    return (
                      <div
                        key={wing.id}
                        className={`border rounded-lg transition-all duration-300 overflow-hidden ${isSelected
                          ? 'border-yellow-600 bg-yellow-50 shadow-md ring-1 ring-yellow-600/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                      >
                        <div className="p-5 flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl shadow-sm transition-all ${isSelected ? 'bg-yellow-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {wing.icon}
                          </div>

                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-semibold  ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                                {wing.title}
                              </h3>

                              {isSelected && <CheckCircle className="w-5 h-5 text-yellow-600" />}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-black text-gray-700">{wing.rating}</span>
                                </div>

                              </div>
                              <div className=''>
                                <div className={`text-sm   ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {wing.description}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleWingSelect(wing.id)}
                                  className={`px-4 py-1.5 rounded text-xs font-black  transition-all ${isSelected
                                    ? 'bg-yellow-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                  {isSelected ? 'Selected' : 'Select'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setViewingWing(wing)}
                                  className="px-4 py-1.5 rounded text-xs font-black  border border-gray-200 text-gray-600 hover:text-gray-900 transition-all"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

      {/* Wing Details Modal */}
      {viewingWing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-yellow-50 rounded-lg flex items-center justify-center text-3xl shadow-sm border border-yellow-100">
                  {viewingWing.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900  ">{viewingWing.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-black text-gray-700">{viewingWing.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-600  border-l border-gray-200 pl-3">
                      {viewingWing.successRate}% Success Rate
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingWing(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-10">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-600  border-b border-gray-100 pb-2">Wing Description</h4>
                <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                  "{viewingWing.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingWing.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-sm font-black  rounded shadow-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className=" font-semibold text-gray-600 border-b border-gray-100 pb-2">Experience Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Users className="w-3 h-3" /> Students</span>
                      <span className="text-sm text-gray-900">{viewingWing.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                      <span className="text-sm text-gray-900">{viewingWing.averageCompletionTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Shield className="w-3 h-3" /> Mentors</span>
                      <span className="text-sm text-gray-900">{viewingWing.mentors} Experts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Top Live Trainers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingWing.trainers.topTrainers.map((trainer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-yellow-200 transition-all">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-sm font-black text-yellow-700 border border-gray-100 group-hover:scale-110 transition-transform">
                        {trainer.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-s font-black text-gray-900  tracking-tight">{trainer.name}</p>
                        <p className="text-xs font-bold text-gray-600 leading-tight mt-0.5">{trainer.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black text-gray-700">{trainer.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-50">
                <button
                  onClick={() => {
                    handleWingSelect(viewingWing.id);
                    setViewingWing(null);
                  }}
                  className="flex-1 bg-yellow-600 text-white py-4 rounded-lg text-sm font-black   hover:bg-yellow-700 transition-all shadow-lg active:scale-95"
                >
                  Apply to this Wing
                </button>
                <button
                  onClick={() => setViewingWing(null)}
                  className="px-8 py-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-black  hover:text-gray-900 hover:border-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Lake house reflection"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
