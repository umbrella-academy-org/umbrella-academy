'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Wing {
  id: string;
  title: string;
  description: string;
  icon: string;
  rating: number;
  students: number;
}

export default function ChooseWingPage() {
  const router = useRouter();
  const [selectedWing, setSelectedWing] = useState('');
  const [error, setError] = useState('');

  const wings: Wing[] = [
    {
      id: 'programming',
      title: 'Programming & Development',
      description: 'Learn to build software, websites, and apps',
      icon: '💻',
      rating: 4.5,
      students: 1250
    },
    {
      id: 'design',
      title: 'UI/UX Design',
      description: 'Create beautiful and user-friendly interfaces',
      icon: '🎨',
      rating: 4.3,
      students: 890
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      description: 'Analyze data and build machine learning models',
      icon: '📊',
      rating: 4.6,
      students: 675
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Protect systems and networks from threats',
      icon: '🔒',
      rating: 4.4,
      students: 520
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Master online marketing and social media',
      icon: '📱',
      rating: 4.2,
      students: 980
    },
    {
      id: 'business',
      title: 'Business & Entrepreneurship',
      description: 'Learn business strategy and startup skills',
      icon: '💼',
      rating: 4.1,
      students: 750
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
    router.push('/auth/student/pick-mentor');
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

  return (
    <div className="flex h-screen">
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
              Choose Your Wing
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Select the course you want to learn to continue.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-6">
                {wings.map((wing) => (
                  <div
                    key={wing.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedWing === wing.id
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleWingSelect(wing.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {wing.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {wing.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {wing.description}
                        </p>
                        
                        {/* Rating and students */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {renderStars(wing.rating)}
                            <span className="text-sm text-gray-500">
                              {wing.students.toLocaleString()} students
                            </span>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('View details for', wing.title);
                              }}
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              className={`px-3 py-1 text-sm rounded transition-colors ${
                                selectedWing === wing.id
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWingSelect(wing.id);
                              }}
                            >
                              {selectedWing === wing.id ? 'Selected' : 'Select'}
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
