'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    phoneCode: '+250',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
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
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      country: '',
      phoneNumber: '',
    };

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.country) newErrors.country = 'Please select your country';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    console.log('Profile data:', formData);
    router.push('/auth/student/education');
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
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 text-center uppercase">
              Tell Us About You
            </h1>
            <p className="text-sm font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">
              Enter your personal details to complete your profile.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="eg. John"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-100'
                      }`}
                    required
                  />
                  {errors.firstName && <p className="mt-1 text-xs font-bold text-red-500 uppercase tracking-tighter">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="eg. Doe"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-100'
                      }`}
                    required
                  />
                  {errors.lastName && <p className="mt-1 text-xs font-bold text-red-500 uppercase tracking-tighter">{errors.lastName}</p>}
                </div>
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="gender" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none text-gray-900 transition-all ${errors.gender ? 'border-red-500' : 'border-gray-100'
                      }`}
                    required
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs font-bold text-red-500 uppercase tracking-tighter">{errors.gender}</p>}
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-100'
                      }`}
                    required
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-xs font-bold text-red-500 uppercase tracking-tighter">{errors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Select Country */}
              <div>
                <label htmlFor="country" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Select Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none text-gray-900 transition-all ${errors.country ? 'border-red-500' : 'border-gray-100'
                    }`}
                  required
                >
                  <option value="">Country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="rw">Rwanda</option>
                  <option value="ke">Kenya</option>
                  <option value="ug">Uganda</option>
                  <option value="tz">Tanzania</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => handleChange('phoneCode', e.target.value)}
                    className="w-28 px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none text-gray-900 transition-all"
                  >
                    <option value="+250">+250</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <div className="flex-1">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="7XXX-XXX-XXX"
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all ${errors.phoneNumber ? 'border-red-500' : 'border-gray-100'
                        }`}
                      required
                    />
                    {errors.phoneNumber && <p className="mt-1 text-xs font-bold text-red-500 uppercase tracking-tighter">{errors.phoneNumber}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95 mt-4"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-200'}`}></div>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center mt-8">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Abstract design"
          fill
          className="object-cover object-center scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply"></div>
      </div>
    </div>
  );
}
