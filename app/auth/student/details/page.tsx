'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, BookMarked, BookOpen, Briefcase, CheckCircle, ChevronDown, FileText, GraduationCap, Trophy, Calendar, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, StudentRegister } from '@/types';

export default function StudentDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhoneNumber: ''
  });
  const [errors, setErrors] = useState({
    dateOfBirth: '',
    gender: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showGuardianFields, setShowGuardianFields] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    
    // Check if student is under 15 to show guardian fields
    if (field === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
      setShowGuardianFields(actualAge < 15);
    }
  };


  const { registerStudent } = useAuth();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      dateOfBirth: '',
      gender: '',
      guardianName: '',
      guardianEmail: '',
      guardianPhoneNumber: ''
    };

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    
    // Check if guardian fields are required
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
      
      if (actualAge < 15) {
        if (!formData.guardianName) newErrors.guardianName = 'Guardian name is required for students under 15';
        if (!formData.guardianEmail) newErrors.guardianEmail = 'Guardian email is required for students under 15';
        if (!formData.guardianPhoneNumber) newErrors.guardianPhoneNumber = 'Guardian phone number is required for students under 15';
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsLoading(true);
    try {
      // Get base registration data from localStorage
      const baseData = {
        phoneNumber: localStorage.getItem('basePhoneNumber') || '',
        firstName: localStorage.getItem('baseFirstName') || '',
        lastName: localStorage.getItem('baseLastName') || '',
        email: localStorage.getItem('baseEmail') || '',
        password: localStorage.getItem('basePassword') || ''
      };

      // Create student data object matching the StudentRegister interface
      const studentData: StudentRegister = {
        email: baseData.email,
        password: baseData.password,
        firstName: baseData.firstName,
        lastName: baseData.lastName,
        phoneNumber: baseData.phoneNumber,
        role: UserRole.STUDENT,
        isActive: true,
        status: 'active',
        gender: formData.gender,
        dateOfBirth: new Date(formData.dateOfBirth),
        isVerified: false,
        otpCode: '',
        otpExpiry: new Date(),
        resetToken: '',
        resetTokenExpiry: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        guardianName: formData.guardianName,
        guardianEmail: formData.guardianEmail,
        guardianPhoneNumber: formData.guardianPhoneNumber
      };

      await registerStudent(studentData);
      
      // Redirect to success or dashboard
      // router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
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

              {/* Guardian Fields - Show for students under 15 */}
              {showGuardianFields && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Guardian Information (Required for students under 15)</h3>
                  
                  <div>
                    <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-2">
                      Guardian Full Name
                    </label>
                    <input
                      type="text"
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => handleChange('guardianName', e.target.value)}
                      placeholder="Enter guardian's full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.guardianName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      required={showGuardianFields}
                    />
                    {errors.guardianName && <p className="mt-1 text-sm text-red-500">{errors.guardianName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        id="guardianEmail"
                        value={formData.guardianEmail}
                        onChange={(e) => handleChange('guardianEmail', e.target.value)}
                        placeholder="guardian@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.guardianEmail ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required={showGuardianFields}
                      />
                      {errors.guardianEmail && <p className="mt-1 text-sm text-red-500">{errors.guardianEmail}</p>}
                    </div>
                    <div>
                      <label htmlFor="guardianPhoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Guardian Phone
                      </label>
                      <input
                        type="tel"
                        id="guardianPhoneNumber"
                        value={formData.guardianPhoneNumber}
                        onChange={(e) => handleChange('guardianPhoneNumber', e.target.value)}
                        placeholder="+250 7XX-XXX-XXX"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.guardianPhoneNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        required={showGuardianFields}
                      />
                      {errors.guardianPhoneNumber && <p className="mt-1 text-sm text-red-500">{errors.guardianPhoneNumber}</p>}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
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
