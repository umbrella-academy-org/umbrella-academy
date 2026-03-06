'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentEducationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fieldOfInterest: '',
    skillLevel: '',
    learningGoals: '',
  });
  const [errors, setErrors] = useState({
    fieldOfInterest: '',
    skillLevel: '',
    learningGoals: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      fieldOfInterest: '',
      skillLevel: '',
      learningGoals: '',
    };

    if (!formData.fieldOfInterest) newErrors.fieldOfInterest = 'Please select your field of interest';
    if (!formData.skillLevel) newErrors.skillLevel = 'Please select your current skill level';
    if (!formData.learningGoals) newErrors.learningGoals = 'Please select your learning goals';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    console.log('Student education data:', formData);
    // Store education data for roadmap creation
    localStorage.setItem('studentEducationData', JSON.stringify(formData));
    router.push('/auth/student/education-level');
  };

  const fieldsOfInterest = [
    { value: 'programming', label: 'Programming & Development' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'business', label: 'Business & Entrepreneurship' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'devops', label: 'DevOps & Cloud Computing' },
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner - Just starting out' },
    { value: 'novice', label: 'Novice - Some basic knowledge' },
    { value: 'intermediate', label: 'Intermediate - Comfortable with basics' },
    { value: 'advanced', label: 'Advanced - Strong understanding' },
    { value: 'expert', label: 'Expert - Professional level' },
  ];

  const learningGoals = [
    { value: 'career-change', label: 'Career Change - Switch to tech' },
    { value: 'skill-upgrade', label: 'Skill Upgrade - Enhance current skills' },
    { value: 'freelancing', label: 'Freelancing - Start freelance work' },
    { value: 'startup', label: 'Startup - Build my own product' },
    { value: 'promotion', label: 'Promotion - Advance in current role' },
    { value: 'hobby', label: 'Hobby - Personal interest' },
    { value: 'certification', label: 'Certification - Get certified' },
    { value: 'portfolio', label: 'Portfolio - Build impressive projects' },
  ];

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-amber-900 mb-2">
              Education Details
            </h1>
            <p className="text-gray-500 mb-8 text-center text-sm px-4">
              Fill in your current study path and learning objectives.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-6">
              {/* Field of Interest */}
              <div>
                <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Interest
                </label>
                <select
                  id="fieldOfInterest"
                  value={formData.fieldOfInterest}
                  onChange={(e) => handleChange('fieldOfInterest', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900 ${errors.fieldOfInterest ? 'border-gray-500' : 'border-gray-300'
                    }`}
                  required
                >
                  <option value="">Select interest</option>
                  {fieldsOfInterest.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>
                {errors.fieldOfInterest && <p className="mt-1 text-xs text-gray-500">{errors.fieldOfInterest}</p>}
              </div>

              {/* Current Skill Level */}
              <div>
                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skill Level
                </label>
                <select
                  id="skillLevel"
                  value={formData.skillLevel}
                  onChange={(e) => handleChange('skillLevel', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900 ${errors.skillLevel ? 'border-gray-500' : 'border-gray-300'
                    }`}
                  required
                >
                  <option value="">Select skill level</option>
                  {skillLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                {errors.skillLevel && <p className="mt-1 text-xs text-gray-500">{errors.skillLevel}</p>}
              </div>

              {/* Learning Goals */}
              <div>
                <label htmlFor="learningGoals" className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Goals
                </label>
                <select
                  id="learningGoals"
                  value={formData.learningGoals}
                  onChange={(e) => handleChange('learningGoals', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900 ${errors.learningGoals ? 'border-gray-500' : 'border-gray-300'
                    }`}
                  required
                >
                  <option value="">Select learning goals</option>
                  {learningGoals.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
                {errors.learningGoals && <p className="mt-1 text-xs text-gray-500">{errors.learningGoals}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors mt-4"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-amber-600 rounded-full"></div>
                <div className="w-8 h-2 bg-amber-600 rounded-full"></div>
                {[3, 4, 5, 6, 7].map((i) => (
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