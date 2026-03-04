'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, GraduationCap, Award, BookOpen, Trophy, Briefcase, FileText, BookMarked, ChevronDown } from 'lucide-react';

export default function EducationLevelPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const educationLevels = [
    { value: "High School Diploma", icon: BookOpen },
    { value: "Associate Degree", icon: Award },
    { value: "Bachelor's Degree", icon: GraduationCap },
    { value: "Master's Degree", icon: Trophy },
    { value: "Doctoral Degree (PhD)", icon: Trophy },
    { value: "Professional Degree", icon: Briefcase },
    { value: "Certificate/Diploma", icon: FileText },
    { value: "Some College (No Degree)", icon: BookMarked }
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevel) {
      alert('Please select an education level');
      return;
    }
    console.log('Selected level:', selectedLevel);
    router.push('/auth/student/referral');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-auto">
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
              <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
              Degree Level
            </h1>
            <p className="text-gray-500 mb-10 text-center text-sm">
              What is your current or highest academic qualification?
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* Dropdown for education level */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-between p-4 border rounded-lg transition-all ${
                    selectedLevel 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {selectedLevel ? (
                      <>
                        {(() => {
                          const selected = educationLevels.find(l => l.value === selectedLevel);
                          const Icon = selected?.icon || GraduationCap;
                          return (
                            <>
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-black text-white">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{selectedLevel}</span>
                            </>
                          );
                        })()}
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Select your education level</span>
                      </>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {educationLevels.map((level, index) => {
                      const Icon = level.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setSelectedLevel(level.value);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-gray-50 ${
                            selectedLevel === level.value ? 'bg-gray-50' : ''
                          } ${index !== educationLevels.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selectedLevel === level.value 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`flex-1 text-left text-sm font-medium ${
                            selectedLevel === level.value ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {level.value}
                          </span>
                          {selectedLevel === level.value && (
                            <CheckCircle className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-black rounded-full"></div>
                <div className="w-8 h-2 bg-black rounded-full"></div>
                <div className="w-8 h-2 bg-black rounded-full"></div>
                {[4, 5, 6, 7].map((i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Abstract design"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}

