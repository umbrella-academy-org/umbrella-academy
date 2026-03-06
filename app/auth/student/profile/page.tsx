'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, BookMarked, BookOpen, Briefcase, CheckCircle, ChevronDown, FileText, GraduationCap, Trophy } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneCode: '+250',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
  });

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
      email: '',
      phoneNumber: '',
    };

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    console.log('Profile data:', formData);
    // Store user type and email for verification
    localStorage.setItem('userType', 'student');
    localStorage.setItem('signupEmail', formData.email);
    router.push('/auth/verify');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-scroll">
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
              Tell Us About You
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Enter your personal details so we can complete your profile.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="eg. John"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-amber-900 placeholder:text-gray-400 ${errors.firstName ? 'border-gray-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-gray-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="eg. Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-amber-900 placeholder:text-gray-400 ${errors.lastName ? 'border-gray-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-gray-500">{errors.lastName}</p>}
                </div>
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900 ${errors.gender ? 'border-gray-500' : 'border-gray-300'
                      }`}
                    required
                  >
                    <option value="">Preferred gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-gray-500">{errors.gender}</p>}
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    placeholder="DD / MM / YY"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-amber-900 ${errors.dateOfBirth ? 'border-gray-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-gray-500">{errors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Select Country */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="eg. johndoe@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900 ${errors.email ? 'border-gray-500' : 'border-gray-300'
                    }`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-gray-500">{errors.email}</p>}
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
                    className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent appearance-none bg-white text-amber-900"
                  >
                    <option value="+250">+250</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-amber-900 placeholder:text-gray-400 ${errors.phoneNumber ? 'border-gray-500' : 'border-gray-300'
                        }`}
                      required
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-gray-500">{errors.phoneNumber}</p>}
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Education Level
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-between p-2 border rounded-lg transition-all ${selectedLevel
                      ? 'border-amber-600 bg-gray-50'
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
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-600 text-white">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-medium text-amber-900">{selectedLevel}</span>
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
                          className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-gray-50 ${selectedLevel === level.value ? 'bg-gray-50' : ''
                            } ${index !== educationLevels.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${selectedLevel === level.value
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-100 text-gray-400'
                            }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`flex-1 text-left text-sm font-medium ${selectedLevel === level.value ? 'text-amber-900' : 'text-gray-600'
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
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-amber-600 rounded-full"></div>
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
          src="/real/image.jpeg"
          alt="Palm trees against blue sky"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}