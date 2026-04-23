'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Briefcase, Calendar, Clock, FileText,  Video, Globe, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function TrainerDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: '',
    cvUrl: '',
    introVideoUrl: '',
    yearsOfExperience: '',
    specializations: [] as string[],
    skills: [] as string[],
  });
  const [errors, setErrors] = useState({
    dateOfBirth: '',
    gender: '',
    cvUrl: '',
    introVideoUrl: '',
    yearsOfExperience: '',
    specializations: '',
    skills: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const expertiseOptions = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "UI/UX Design", "Digital Marketing", "Business Strategy", "Finance",
    "Photography", "Video Production", "Content Writing", "Graphic Design",
    "Project Management", "Cybersecurity", "Cloud Computing", "DevOps"
  ];



  const timeSlotOptions = [
    "Morning (9AM-12PM)", "Afternoon (12PM-5PM)", "Evening (5PM-9PM)"
  ];

  const dayOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };


  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleSpecialization = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const { registerTrainer } = useAuth();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      dateOfBirth: '',
      gender: '',
      cvUrl: '',
      introVideoUrl: '',
      yearsOfExperience: '',
      specializations: '',
      skills: '',
      availability: ''
    };

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.cvUrl) newErrors.cvUrl = 'CV URL is required';
    if (!formData.introVideoUrl) newErrors.introVideoUrl = 'Intro video URL is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (formData.specializations.length === 0) newErrors.specializations = 'Please select at least one specialization';
    if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsLoading(true);
    try {
      // Get base registration data from localStorage
      const baseData = {
        firstName: localStorage.getItem('userFirstName') || '',
        lastName: localStorage.getItem('userLastName') || '',
        email: localStorage.getItem('userEmail') || '',
        password: localStorage.getItem('userPassword') || '',
        phoneNumber: localStorage.getItem('userPhoneNumber') || ''
      };

      // Create trainer data object matching Trainer interface
      const trainerData = {
        email: baseData.email,
        password: baseData.password,
        firstName: baseData.firstName,
        lastName: baseData.lastName,
        phoneNumber: baseData.phoneNumber,
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
        cvUrl: formData.cvUrl,
        introVideoUrl: formData.introVideoUrl,
        experience: {
          yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
          specializations: formData.specializations
        },
        skills: formData.skills,
        approvalStatus: 'pending' as const
      };

      await registerTrainer(trainerData);
    
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

                {/* CV URL */}
                <div className="mt-4">
                  <label htmlFor="cvUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    CV URL
                  </label>
                  <input
                    type="url"
                    id="cvUrl"
                    value={formData.cvUrl}
                    onChange={(e) => handleChange('cvUrl', e.target.value)}
                    placeholder="https://example.com/cv.pdf"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.cvUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.cvUrl && <p className="mt-1 text-sm text-red-500">{errors.cvUrl}</p>}
                </div>

                {/* Intro Video URL */}
                <div className="mt-4">
                  <label htmlFor="introVideoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    <Video className="w-4 h-4 inline mr-1" />
                    Intro Video URL
                  </label>
                  <input
                    type="url"
                    id="introVideoUrl"
                    value={formData.introVideoUrl}
                    onChange={(e) => handleChange('introVideoUrl', e.target.value)}
                    placeholder="https://example.com/intro-video.mp4"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.introVideoUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.introVideoUrl && <p className="mt-1 text-sm text-red-500">{errors.introVideoUrl}</p>}
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Background</h3>

                {/* Years of Experience */}
                <div className="mt-4">
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                    placeholder="e.g., 5"
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    required
                  />
                  {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsOfExperience}</p>}
                </div>

                {/* Specializations */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Specializations
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {expertiseOptions.map((specialization) => (
                      <button
                        key={specialization}
                        type="button"
                        onClick={() => toggleSpecialization(specialization)}
                        className={`p-2 text-sm rounded-lg border transition-all ${formData.specializations.includes(specialization)
                          ? 'border-green-600 bg-green-50 text-green-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                      >
                        {specialization}
                      </button>
                    ))}
                  </div>
                  {errors.specializations && <p className="mt-1 text-sm text-red-500">{errors.specializations}</p>}
                </div>

                {/* Skills */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Skills
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {expertiseOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`p-2 text-sm rounded-lg border transition-all ${formData.skills.includes(skill)
                          ? 'border-green-600 bg-green-50 text-green-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
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
