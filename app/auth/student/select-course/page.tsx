'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  lessons: number;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  featured?: boolean;
}

export default function SelectCoursePage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState('');
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

  const courses: Course[] = [
    {
      id: 'full-stack-dev',
      title: 'Programming & Development',
      description: 'Comprehensive course covering frontend and backend development',
      modules: 4,
      lessons: 3,
      rating: 4.5,
      difficulty: 'Intermediate',
      duration: '12 weeks',
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: 'software-dev-1',
      title: 'Software Development',
      description: 'Learn fundamental programming concepts and best practices',
      modules: 6,
      lessons: 24,
      rating: 4.3,
      difficulty: 'Beginner',
      duration: '8 weeks',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'software-dev-2',
      title: 'Software Development',
      description: 'Advanced software engineering and system design',
      modules: 8,
      lessons: 32,
      rating: 4.6,
      difficulty: 'Advanced',
      duration: '16 weeks',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'software-dev-3',
      title: 'Software Development',
      description: 'Specialized topics in modern software development',
      modules: 5,
      lessons: 20,
      rating: 4.4,
      difficulty: 'Intermediate',
      duration: '10 weeks',
      image: '/api/placeholder/300/200'
    }
  ];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setError('Please select a course to continue');
      return;
    }
    
    console.log('Selected course:', selectedCourse);
    // Store selected course
    localStorage.setItem('selectedCourse', selectedCourse);
    router.push('/auth/student/payment');
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
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-scroll">
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
              {wingInfo.title}
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              {wingInfo.description}
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-6">
                {courses.map((course, index) => (
                  <div key={course.id}>
                    {/* Featured course */}
                    {course.featured ? (
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedCourse === course.id
                            ? 'border-yellow-600 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleCourseSelect(course.id)}
                      >
                        <div className="flex gap-4">
                          {/* Course Image */}
                          <div className="w-24 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="text-white text-xs font-mono">
                              {'</>'}
                            </div>
                          </div>
                          
                          {/* Course Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {course.description}
                            </p>
                            
                            {/* Course Stats */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                              <span>Modules: {course.modules}</span>
                              <span>Lessons: {course.lessons}</span>
                            </div>
                            
                            {/* Rating and Actions */}
                            <div className="flex items-center justify-between">
                              {renderStars(course.rating)}
                              
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Share course', course.title);
                                  }}
                                >
                                  Share
                                </button>
                                <button
                                  type="button"
                                  className={`px-3 py-1 text-sm rounded transition-colors ${
                                    selectedCourse === course.id
                                      ? 'bg-yellow-600 text-white'
                                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCourseSelect(course.id);
                                  }}
                                >
                                  {selectedCourse === course.id ? 'Selected' : 'Select'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Regular course */
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedCourse === course.id
                            ? 'border-yellow-600 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleCourseSelect(course.id)}
                      >
                        <div className="flex items-center gap-3">
                          {/* Course Icon */}
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          
                          {/* Course Info */}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {course.lessons} Lessons
                            </p>
                          </div>
                          
                          {/* Select indicator */}
                          {selectedCourse === course.id && (
                            <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
          alt="Aurora borealis"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
