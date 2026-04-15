'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, BookMarked, BookOpen, Briefcase, CheckCircle, ChevronDown, FileText, GraduationCap, Trophy, Calendar, Phone, MapPin } from 'lucide-react';

export default function StudentDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: '',
    phoneCode: '+250',
    phoneNumber: '',
    country: '',
    city: '',
    educationLevel: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    interests: [] as string[]
  });
  const [errors, setErrors] = useState({
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    country: '',
    educationLevel: ''
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

  const interests = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "UI/UX Design", "Digital Marketing", "Business Management", "Finance",
    "Photography", "Video Production", "Content Writing", "Graphic Design"
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      country: '',
      educationLevel: ''
    };

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!selectedLevel) newErrors.educationLevel = 'Education level is required';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Store all details data
    localStorage.setItem('studentDetails', JSON.stringify({
      ...formData,
      educationLevel: selectedLevel
    }));

    // Redirect to final step or success page
    router.push('/auth/create-password');
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-scroll">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => router.push('/auth/student/register')}
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
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Tell Us More About Yourself
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Help us personalize your learning experience.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white text-gray-900 ${errors.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => handleChange('phoneCode', e.target.value)}
                    className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white text-gray-900"
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
                      placeholder="7XX-XXX-XXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      required
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>
                </div>
              </div>

              {/* Country and City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    placeholder="e.g., Rwanda"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="e.g., Kigali"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Education Level */}
              <div className="relative">
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Education Level
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${selectedLevel
                      ? 'border-blue-600 bg-gray-50'
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
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-600 text-white">
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
                          className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-gray-50 ${selectedLevel === level.value ? 'bg-gray-50' : ''
                            } ${index !== educationLevels.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${selectedLevel === level.value
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-400'
                            }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`flex-1 text-left text-sm font-medium ${selectedLevel === level.value ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                            {level.value}
                          </span>
                          {selectedLevel === level.value && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.educationLevel && <p className="mt-1 text-sm text-red-500">{errors.educationLevel}</p>}
              </div>

              {/* Field of Study */}
              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                  placeholder="e.g., Computer Science, Business, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Institution */}
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  placeholder="e.g., University of Rwanda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Graduation Year */}
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Graduation Year
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={(e) => handleChange('graduationYear', e.target.value)}
                  placeholder="e.g., 2025"
                  min="2024"
                  max="2030"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 text-sm rounded-lg border transition-all ${formData.interests.includes(interest)
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Complete Registration
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
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
          alt="Student learning environment"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
