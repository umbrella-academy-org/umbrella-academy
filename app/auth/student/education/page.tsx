'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EducationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email1: '',
    email2: '',
    country: '',
    phoneCode: '+250',
    phoneNumber: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email1 || !formData.email2) {
      alert('Please fill in all email fields');
      return;
    }
    if (!formData.country) {
      alert('Please select a country');
      return;
    }
    if (!formData.phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    console.log('Education data:', formData);
    router.push('/auth/student/education-level');
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
              Fill in your current level of study and where you're learning from.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* Email fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email1" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email1"
                    value={formData.email1}
                    onChange={(e) => handleChange('email1', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email2" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email2"
                    value={formData.email2}
                    onChange={(e) => handleChange('email2', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Select Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="">Enter your email</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="rw">Rwanda</option>
                  <option value="ke">Kenya</option>
                  <option value="ug">Uganda</option>
                  <option value="tz">Tanzania</option>
                </select>
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
                    className="w-24 px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="+250">+250</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+254">+254</option>
                    <option value="+256">+256</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    placeholder="7XXX-XXX-XXX"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    required
                  />
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
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
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

