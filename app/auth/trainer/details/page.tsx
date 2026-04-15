'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Briefcase, Calendar, CheckCircle, ChevronDown, Clock, FileText, GraduationCap, MapPin, Phone, User, Video, Globe, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function TrainerDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: '',
    specialization: '',
    yearsOfExperience: '',
    teachingExperience: '',
    expertiseAreas: [] as string[],
    languages: [] as string[],
    availability: ''
  });
  const [errors, setErrors] = useState({
    dateOfBirth: '',
    gender: '',
    specialization: '',
    yearsOfExperience: '',
    teachingExperience: '',
    expertiseAreas: '',
    languages: '',
    availability: ''
  });
  const [isLoading, setIsLoading] = useState(false);


  const expertiseOptions = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "UI/UX Design", "Digital Marketing", "Business Strategy", "Finance",
    "Photography", "Video Production", "Content Writing", "Graphic Design",
    "Project Management", "Cybersecurity", "Cloud Computing", "DevOps"
  ];

  const languageOptions = [
    "English", "French", "Spanish", "German", "Chinese", "Japanese",
    "Arabic", "Portuguese", "Russian", "Italian", "Dutch", "Swahili"
  ];

  const availabilityOptions = [
    "Full-time", "Part-time", "Weekends", "Evenings", "Flexible"
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleExpertise = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertiseAreas: prev.expertiseAreas.includes(expertise)
        ? prev.expertiseAreas.filter(e => e !== expertise)
        : [...prev.expertiseAreas, expertise]
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const { registerTrainer } = useAuth();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      dateOfBirth: '',
      gender: '',
      specialization: '',
      yearsOfExperience: '',
      teachingExperience: '',
      expertiseAreas: '',
      languages: '',
      availability: ''
    };

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.teachingExperience) newErrors.teachingExperience = 'Teaching experience is required';
    if (formData.expertiseAreas.length === 0) newErrors.expertiseAreas = 'Please select at least one area of expertise';
    if (formData.languages.length === 0) newErrors.languages = 'Please select at least one language';
    if (!formData.availability) newErrors.availability = 'Availability is required';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsLoading(true);
    try {
      // Get base registration data from localStorage
      const baseData = {
        firstName: localStorage.getItem('baseFirstName') || '',
        lastName: localStorage.getItem('baseLastName') || '',
        email: localStorage.getItem('baseEmail') || '',
        password: localStorage.getItem('basePassword') || ''
      };

      // Create trainer data object matching Trainer interface
      const trainerData = {
        email: baseData.email,
        password: baseData.password,
        firstName: baseData.firstName,
        lastName: baseData.lastName,
        phoneNumber: '', // Will be set by backend
        role: UserRole.TRAINER as const,
        isActive: true,
        status: 'pending_approval',
        gender: formData.gender,
        dateOfBirth: new Date(formData.dateOfBirth),
        isVerified: false,
        otpCode: '',
        otpExpiry: new Date(),
        resetToken: '',
        resetTokenExpiry: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        cvUrl: '',
        experience: {
          yearsOfExperience: parseInt(formData.yearsOfExperience.split('-')[1]) || parseInt(formData.yearsOfExperience) || 0,
          specializations: formData.expertiseAreas
        },
        skills: formData.expertiseAreas,
        availability: formData.availability,
        approvalStatus: 'pending' as const
      };

      await registerTrainer(trainerData);
      
      // Clear localStorage
      localStorage.removeItem('baseFirstName');
      localStorage.removeItem('baseLastName');
      localStorage.removeItem('baseEmail');
      localStorage.removeItem('basePassword');
      
      // Redirect to pending approval page
      router.push('/auth/trainer/pending');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-2 flex-col justify-between p-8 bg-white overflow-y-scroll">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => router.push('/auth/trainer/register')}
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
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Professional Information
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Tell us about your expertise and teaching experience.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      required
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 ${errors.gender ? 'border-red-500' : 'border-gray-300'
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
                <div className="mt-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.phoneCode}
                      onChange={(e) => handleChange('phoneCode', e.target.value)}
                      className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900"
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required
                      />
                      {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                    </div>
                  </div>
                </div>

                {/* Country and City */}
                <div className="grid grid-cols-2 gap-4 mt-4">
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.country ? 'border-red-500' : 'border-gray-300'
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Background</h3>


                {/* Specialization */}
                <div className="mt-4">
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    placeholder="e.g., Full Stack Development, Digital Marketing"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.specialization ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.specialization && <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>}
                </div>

                {/* Years of Experience */}
                <div className="mt-4">
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Years of Experience
                  </label>
                  <select
                    id="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  >
                    <option value="">Select years of experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">More than 10 years</option>
                  </select>
                  {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsOfExperience}</p>}
                </div>

              </div>

              {/* Teaching Information Section */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Teaching Information</h3>

                {/* Teaching Experience */}
                <div>
                  <label htmlFor="teachingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    Teaching Experience
                  </label>
                  <textarea
                    id="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={(e) => handleChange('teachingExperience', e.target.value)}
                    placeholder="Describe your teaching experience, training methods, and any previous courses you've conducted..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.teachingExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.teachingExperience && <p className="mt-1 text-sm text-red-500">{errors.teachingExperience}</p>}
                </div>

                {/* Expertise Areas */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {expertiseOptions.map((expertise) => (
                      <button
                        key={expertise}
                        type="button"
                        onClick={() => toggleExpertise(expertise)}
                        className={`p-2 text-sm rounded-lg border transition-all ${formData.expertiseAreas.includes(expertise)
                            ? 'border-green-600 bg-green-50 text-green-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                      >
                        {expertise}
                      </button>
                    ))}
                  </div>
                  {errors.expertiseAreas && <p className="mt-1 text-sm text-red-500">{errors.expertiseAreas}</p>}
                </div>

                {/* Languages */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Languages
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {languageOptions.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => toggleLanguage(language)}
                        className={`p-2 text-sm rounded-lg border transition-all ${formData.languages.includes(language)
                            ? 'border-green-600 bg-green-50 text-green-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                  {errors.languages && <p className="mt-1 text-sm text-red-500">{errors.languages}</p>}
                </div>

                {/* Availability */}
                <div className="mt-4">
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Availability
                  </label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleChange('availability', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 ${errors.availability ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.availability && <p className="mt-1 text-sm text-red-500">{errors.availability}</p>}
                </div>

              </div>



              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting Application...' : 'Submit Application'}
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-green-600 rounded-full"></div>
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
          alt="Trainer teaching environment"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
