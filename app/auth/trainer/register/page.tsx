'use client'

import { useState } from 'react';
import { useRouter } from '@/hooks/useRouter';;
import { AuthContainer } from '@/components/auth/auth-container';
import { AuthCard } from '@/components/auth/auth-card';
import { PremiumInput } from '@/components/ui/premium-input';
import { PremiumButton } from '@/components/ui/premium-button';
import { User, Mail, Lock, Phone, ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';

export default function TrainerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Store base registration data
    localStorage.setItem('userType', 'trainer');
    localStorage.setItem('userFirstName', formData.firstName);
    localStorage.setItem('userLastName', formData.lastName);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userPassword', formData.password);
    localStorage.setItem('userPhoneNumber', formData.phoneNumber);
 
    router.push('/auth/trainer/details');
  };

  return (
    <AuthContainer>
      <AuthCard 
        title="Trainer Registration" 
        subtitle="Join our community of expert mentors and inspire the next generation."
      >
        <button
          onClick={() => router.push('/auth/signup')}
          className="absolute top-5 left-5 sm:top-8 sm:left-8 p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>

        <form onSubmit={handleContinue} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PremiumInput
              label="First Name"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="John"
              error={errors.firstName}
              icon={<User size={18} />}
              required
            />
            <PremiumInput
              label="Last Name"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Doe"
              error={errors.lastName}
              icon={<User size={18} />}
              required
            />
          </div>

          <PremiumInput
            label="Email Address"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="trainer@example.com"
            error={errors.email}
            icon={<Mail size={20} />}
            required
          />

          <PremiumInput
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="+250 7XX-XXX-XXX"
            error={errors.phoneNumber}
            icon={<Phone size={20} />}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PremiumInput
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              icon={<Lock size={18} />}
              required
            />
            <PremiumInput
              label="Confirm"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="••••••••"
              error={errors.confirmPassword}
              icon={<Lock size={18} />}
              required
            />
          </div>

          <div className="pt-2">
            <PremiumButton type="submit">
              Continue to Details
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center items-center gap-3 pt-4">
            <div className="h-2 w-12 bg-primary rounded-full shadow-sm shadow-primary/20"></div>
            <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
          </div>
        </form>

        <div className="mt-8 text-center text-[15px] text-slate-500 font-light">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/auth/login')}
            className="text-primary font-bold hover:underline"
          >
            Sign In
          </button>
        </div>

        <div className="mt-10 text-center text-[12px] text-slate-400 uppercase tracking-widest font-bold">
          © Dreamize 2025
        </div>
      </AuthCard>
    </AuthContainer>
  );
}
