'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function EducationLevelPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('');

  const educationLevels = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree", 
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree",
    "Certificate/Diploma",
    "Some College (No Degree)"
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
              {/* Education level options */}
              {educationLevels.map((level, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${selectedLevel === level
                      ? 'border-gray-600 bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${selectedLevel === level ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className={`flex-1 text-sm font-medium ${selectedLevel === level ? 'text-gray-900' : 'text-gray-600'}`}>{level}</span>
                  <input
                    type="radio"
                    name="educationLevel"
                    value={level}
                    checked={selectedLevel === level}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="hidden"
                  />
                  {selectedLevel === level && (
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                  )}
                </label>
              ))}

              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
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

