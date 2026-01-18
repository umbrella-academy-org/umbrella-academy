'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorEducationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    country: '',
    phoneCode: '+250',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    degree: '',
    institution: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      degree: '',
      institution: '',
      country: '',
      phoneNumber: '',
    };
    
    if (!formData.degree) newErrors.degree = 'Degree/qualification is required';
    if (!formData.institution) newErrors.institution = 'Institution name is required';
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    console.log('Mentor education data:', formData);
    router.push('/auth/mentor/referral');
  };

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
              Education Details
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Tell us about your educational background and qualifications.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* Degree and Institution */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                    Degree/Qualification
                  </label>
                  <input
                    type="text"
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    placeholder="e.g. Master's in Design"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                      errors.degree ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.degree && <p className="mt-1 text-sm text-red-500">{errors.degree}</p>}
                </div>
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                    placeholder="e.g. University of Melbourne"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                      errors.institution ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.institution && <p className="mt-1 text-sm text-red-500">{errors.institution}</p>}
                </div>
              </div>

              {/* Select Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none bg-white text-gray-900 ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select your country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="rw">Rwanda</option>
                  <option value="ke">Kenya</option>
                  <option value="ug">Uganda</option>
                  <option value="tz">Tanzania</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => handleChange('phoneCode', e.target.value)}
                    className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none bg-white text-gray-900"
                  >
                    <option value="+250">+250</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+254">+254</option>
                    <option value="+256">+256</option>
                  </select>
                  <div className="flex-1">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="7XXX-XXX-XXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>
                </div>
              </div>

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
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Night sky with stars"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
