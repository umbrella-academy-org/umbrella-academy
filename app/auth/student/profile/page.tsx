'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

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
    <div className="flex h-screen bg-white font-sans">
      {/* Left side - Form */}
      <div className="flex flex-[1.5] flex-col justify-between p-8 lg:p-12 bg-[#FDFDFC] overflow-auto">
        <div className="flex flex-col flex-1 max-w-xl mx-auto w-full animate-fade-in">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all mb-10 w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold  ">Go back</span>
          </button>

          <div className="flex flex-col flex-1">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-14 h-14 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-black text-gray-900 mb-3  ">
              Tell Us About You
            </h1>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed max-w-sm">
              Complete your profile details to unlock your personalized learning dashboard.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                    First Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="eg. John"
                      className={`w-full px-5 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 placeholder:text-gray-400 transition-all font-semibold ${errors.firstName ? 'border-red-500 shadow-sm shadow-red-50' : 'border-gray-100 shadow-sm'}`}
                    />
                  </div>
                  {errors.firstName && <p className="mt-1 text-[11px] font-bold text-red-500 ml-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="eg. Doe"
                    className={`w-full px-5 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 placeholder:text-gray-400 transition-all font-semibold ${errors.lastName ? 'border-red-500 shadow-sm shadow-red-50' : 'border-gray-100 shadow-sm'}`}
                  />
                  {errors.lastName && <p className="mt-1 text-[11px] font-bold text-red-500 ml-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 transition-all font-semibold shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="dateOfBirth" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 transition-all font-semibold shadow-sm overflow-hidden"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                  Residing Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 transition-all font-semibold shadow-sm appearance-none cursor-pointer"
                >
                  <option value="">Select Country</option>
                  <option value="rwanda">🇷🇼 Rwanda</option>
                  <option value="kenya">🇰🇪 Kenya</option>
                  <option value="uganda">🇺🇬 Uganda</option>
                  <option value="tanzania">🇹🇿 Tanzania</option>
                </select>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-xs font-black text-gray-400 uppercase   ml-1">
                  Contact Number
                </label>
                <div className="flex gap-4">
                  <select
                    value={formData.phoneCode}
                    onChange={(e) => handleChange('phoneCode', e.target.value)}
                    className="w-[100px] px-3 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 font-bold shadow-sm cursor-pointer"
                  >
                    <option value="+250">+250</option>
                    <option value="+254">+254</option>
                    <option value="+256">+256</option>
                  </select>
                  <div className="flex-1 group">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="7XXX-XXX-XXX"
                      className={`w-full px-6 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 placeholder:text-gray-400 transition-all font-bold ${errors.phoneNumber ? 'border-red-500 shadow-red-50' : 'border-gray-100 shadow-sm'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="group relative w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-gray-200 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Continue to Step 2</span>
                  <div className="p-1 bg-white/10 rounded-lg group-hover:translate-x-1 transition-transform relative z-10">
                    <ChevronLeft className="w-5 h-5 rotate-180" />
                  </div>
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex flex-col items-center gap-6 pt-10">
                <div className="flex justify-center gap-2.5">
                  <div className="w-10 h-2 bg-yellow-600 rounded-full shadow-sm shadow-yellow-600/20"></div>
                  {[2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Step 1 of 7 • Personal Details</p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center pt-8">
          © Dreamize Academy 2025 • Premium Education Systems
        </div>
      </div>

      {/* Right side - Image Section */}
      <div className="hidden lg:block flex-[1.2] relative overflow-hidden bg-gray-900">
        <Image
          src="/auth/login/image.png"
          alt="Premium Education Brand"
          fill
          className="object-cover object-center opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[2s]"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-20 left-12 right-12 animate-slide-up">
          <div className="p-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white  ">Student Access</h3>
            </div>
            <p className="text-gray-300 font-medium text-lg leading-relaxed">Join thousands of African developers building the future of the continent through high-end technical training.</p>
            <div className="flex items-center gap-8 mt-10">
              <div>
                <div className="text-2xl font-black text-white">12k+</div>
                <div className="text-xs font-bold text-gray-400 uppercase   mt-1">Students</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">98%</div>
                <div className="text-xs font-bold text-gray-400 uppercase   mt-1">Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
