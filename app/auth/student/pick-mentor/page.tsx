'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialization: string;
  experience: string;
  students: number;
}

export default function PickMentorPage() {
  const router = useRouter();
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedWing, setSelectedWing] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get selected wing from localStorage
    const wing = localStorage.getItem('selectedWing');
    setSelectedWing(wing || 'programming');
  }, []);

  const getWingInfo = (wingId: string) => {
    const wings = {
      'programming': {
        title: 'Programming & Development',
        description: 'Learn to build software, websites, and apps',
        icon: '💻'
      },
      'design': {
        title: 'UI/UX Design',
        description: 'Create beautiful and user-friendly interfaces',
        icon: '🎨'
      },
      'data-science': {
        title: 'Data Science & Analytics',
        description: 'Analyze data and build machine learning models',
        icon: '📊'
      },
      'cybersecurity': {
        title: 'Cybersecurity',
        description: 'Protect systems and networks from threats',
        icon: '🔒'
      },
      'digital-marketing': {
        title: 'Digital Marketing',
        description: 'Master online marketing and social media',
        icon: '📱'
      },
      'business': {
        title: 'Business & Entrepreneurship',
        description: 'Learn business strategy and startup skills',
        icon: '💼'
      }
    };
    return wings[wingId as keyof typeof wings] || wings.programming;
  };

  const mentors: Mentor[] = [
    {
      id: 'demi-1',
      name: 'Demi Wilkinson',
      title: 'Senior Software Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.5,
      specialization: 'Full-Stack Development',
      experience: '8 years',
      students: 156
    },
    {
      id: 'demi-2',
      name: 'Demi Wilkinson',
      title: 'Lead Software Engineering',
      avatar: '/api/placeholder/40/40',
      rating: 4.5,
      specialization: 'Backend Systems',
      experience: '10 years',
      students: 203
    },
    {
      id: 'demi-3',
      name: 'Demi Wilkinson',
      title: 'Principal Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      specialization: 'System Architecture',
      experience: '12 years',
      students: 89
    },
    {
      id: 'alex-1',
      name: 'Alex Rodriguez',
      title: 'Frontend Specialist',
      avatar: '/api/placeholder/40/40',
      rating: 4.3,
      specialization: 'React & TypeScript',
      experience: '6 years',
      students: 134
    }
  ];

  const handleMentorSelect = (mentorId: string) => {
    setSelectedMentor(mentorId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMentor) {
      setError('Please select a mentor to continue');
      return;
    }
    
    console.log('Selected mentor:', selectedMentor);
    // Store selected mentor
    localStorage.setItem('selectedMentor', selectedMentor);
    router.push('/auth/student/select-course');
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const wingInfo = getWingInfo(selectedWing);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Pick a Mentor
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              View mentor details and select the one you want to learn with.
            </p>

            {/* Selected Wing Display */}
            <div className="w-full p-4 bg-gray-50 rounded-lg border mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl">
                  {wingInfo.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{wingInfo.title}</h3>
                  <p className="text-sm text-gray-600">{wingInfo.description}</p>
                </div>
                <div className="ml-auto flex items-center">
                  {renderStars(4.5)}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-6">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMentor === mentor.id
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleMentorSelect(mentor.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {mentor.title}
                        </p>
                        
                        {/* Rating and actions */}
                        <div className="flex items-center justify-between">
                          {renderStars(mentor.rating)}
                          
                          {/* Action buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('View profile for', mentor.name);
                              }}
                            >
                              Profile
                            </button>
                            <button
                              type="button"
                              className={`px-3 py-1 text-sm rounded transition-colors ${
                                selectedMentor === mentor.id
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMentorSelect(mentor.id);
                              }}
                            >
                              {selectedMentor === mentor.id ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Misty mountains"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
