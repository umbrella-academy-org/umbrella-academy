'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { mockCompanies } from '@/data/companies';
import { Course } from '@/types';

export default function ChooseCoursePage() {
  const router = useRouter();
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [error, setError] = useState('');
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const companyId = localStorage.getItem('selectedCompany');
    if (!companyId) {
      router.push('/auth/student/choose-company');
      return;
    }

    const foundCompany = mockCompanies.find(c => c.id === companyId);
    if (!foundCompany || !foundCompany.courses || foundCompany.courses.length === 0) {
      router.push('/auth/student/choose-company');
      return;
    }

    setCompany(foundCompany);
  }, [router]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourseId) {
      setError('Please select a course to continue');
      return;
    }

    const selectedCourse = company?.courses?.find((c: Course) => c.id === selectedCourseId);
    if (selectedCourse) {
      localStorage.setItem('signupFieldId', selectedCourseId);
      router.push('/auth/student/payment');
    }
  };

  if (!company) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-gray-100 text-gray-700';
      case 'Intermediate':
        return 'bg-gray-200 text-gray-800';
      case 'Advanced':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-2 flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black">Go back</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
              Choose Your Course
            </h1>
            <p className="text-gray-500 mb-4 text-center text-sm px-4">
              Select a program from {company.name}
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {company.courses?.map((course: Course) => {
                  const isSelected = selectedCourseId === course.id;
                  return (
                    <div
                      key={course.id}
                      onClick={() => handleCourseSelect(course.id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'ring-4 ring-yellow-600 shadow-2xl scale-[1.02]'
                          : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-xl'
                      }`}
                    >
                      {/* Course Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={course.image}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                        {/* Level Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`text-xs font-black px-3 py-1.5 rounded-full ${getLevelBadgeColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>
                        {/* Duration Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-700" />
                          <span className="text-xs font-black text-gray-900">{course.duration}</span>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="bg-white p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-black text-gray-900 flex-1">
                            {course.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-gray-900 shrink-0 ml-2" />
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span className="text-xs font-medium">{company.name}</span>
                          </div>
                          <div className="text-2xl font-black text-gray-900">
                            {course.price} RWF
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-gray-600 text-center">{error}</p>}

              <button
                type="submit"
                disabled={!selectedCourseId}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                <div className="w-2 h-2 bg-yellow-600/30 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
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
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
          alt="Training environment"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
