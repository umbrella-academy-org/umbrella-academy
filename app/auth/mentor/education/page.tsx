'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorEducationPage() {
  const router = useRouter();
  const [education, setEducation] = useState({
    level: '',
    title: '',
    school: '',
    year: '',
    specialization: '',
    experience: ''
  });

  const educationLevels = [
    "Bachelor's Degree", 
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree",
    "Post-Doctoral Research",
    "Multiple Advanced Degrees"
  ];

  const experienceLevels = [
    "5-10 years",
    "10-15 years", 
    "15-20 years",
    "20+ years"
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mentor education:', education);
    router.push('/auth/mentor/profile');
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
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Academic Credentials
            </h1>
            <p className="text-gray-500 mb-8 text-center text-sm px-4">
              Share your advanced qualifications and expertise as a mentor.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education Level</label>
                <select
                  value={education.level}
                  onChange={(e) => setEducation({ ...education, level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 appearance-none bg-white"
                  required
                >
                  <option value="">Select your highest education level</option>
                  {educationLevels.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree / Certification Title</label>
                <input
                  type="text"
                  value={education.title}
                  onChange={(e) => setEducation({ ...education, title: e.target.value })}
                  placeholder="eg. Ph.D. in Computer Science"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution / University</label>
                <input
                  type="text"
                  value={education.school}
                  onChange={(e) => setEducation({ ...education, school: e.target.value })}
                  placeholder="eg. MIT, Stanford University"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area of Specialization</label>
                <input
                  type="text"
                  value={education.specialization}
                  onChange={(e) => setEducation({ ...education, specialization: e.target.value })}
                  placeholder="eg. Machine Learning, Software Architecture"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Professional Experience</label>
                <select
                  value={education.experience}
                  onChange={(e) => setEducation({ ...education, experience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 appearance-none bg-white"
                  required
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map((exp, index) => (
                    <option key={index} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Completion</label>
                <input
                  type="text"
                  value={education.year}
                  onChange={(e) => setEducation({ ...education, year: e.target.value })}
                  placeholder="eg. 2015"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors mt-4"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
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
          src="/real/image.jpeg"
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