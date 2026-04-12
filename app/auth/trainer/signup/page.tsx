'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainerSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });

  const handleChange = (field: string, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { firstName: '', lastName: '', email: '' };
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    setErrors(newErrors);
    if (Object.values(newErrors).some(e => e)) return;

    localStorage.setItem('userType', 'trainer');
    localStorage.setItem('signupEmail', formData.email);
    localStorage.setItem('signupFirstName', formData.firstName);
    localStorage.setItem('signupLastName', formData.lastName);
    router.push('/auth/trainer/profile');

  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-2 flex-col justify-between p-8 bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
          <button onClick={() => router.push('/auth/signup')} className="self-start flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="mb-8">
            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Apply as Trainer</h1>
          <p className="text-gray-500 mb-8">Enter your details to start your application.</p>

          <form onSubmit={handleContinue} className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                  placeholder="eg. John"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  placeholder="eg. Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <button type="submit" className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
              Continue
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Have an account?{' '}
            <a href="/auth/login" className="text-yellow-600 hover:text-yellow-700 font-medium">Sign In</a>
          </p>
        </div>
        <div className="text-sm text-gray-500">© Dreamize 2025</div>
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image src="/real/image.jpeg" alt="Beach with palm tree" fill className="object-cover object-center scale-105" priority quality={100} />
      </div>
    </div>
  );
}
