'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts';

export default function CreatePasswordPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '', api: '' });

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: '', confirmPassword: '', api: '' });

    if (!password) { setErrors(p => ({ ...p, password: 'Password is required' })); return; }
    if (!hasMinLength || !hasSpecialChar || !hasNumber) { setErrors(p => ({ ...p, password: 'Please meet all password requirements' })); return; }
    if (!confirmPassword) { setErrors(p => ({ ...p, confirmPassword: 'Please confirm your password' })); return; }
    if (password !== confirmPassword) { setErrors(p => ({ ...p, confirmPassword: 'Passwords do not match' })); return; }

    const userType = localStorage.getItem('userType') ?? 'student';
    const email = localStorage.getItem('signupEmail') ?? '';
    const firstName = localStorage.getItem('signupFirstName') ?? '';
    const lastName = localStorage.getItem('signupLastName') ?? '';
    const fieldId = localStorage.getItem('signupFieldId') ?? undefined;

    const roleMap: Record<string, 'student' | 'trainer' | 'mentor' | 'field-admin' | 'umbrella-admin'> = {
      student: 'student', trainer: 'trainer', mentor: 'mentor',
      'field-admin': 'field-admin', 'umbrella-admin': 'umbrella-admin',
    };

    const result = await register({
      email,
      password,
      role: roleMap[userType] ?? 'student',
      firstName: firstName || email.split('@')[0],
      lastName: lastName || '',
      fieldId: fieldId || undefined,
    });

    if (result.success) {
      ['signupEmail', 'signupFirstName', 'signupLastName', 'signupFieldId', 'userType', 'authFlow'].forEach(k => localStorage.removeItem(k));
      const dashboardRoutes: Record<string, string> = {
        student: '/dashboard/student', trainer: '/dashboard/trainer',
        mentor: '/dashboard/mentor', 'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin',
      };
      router.push(dashboardRoutes[userType] ?? '/dashboard/student');
    } else {
      setErrors(p => ({ ...p, api: result.error ?? 'Registration failed. Please try again.' }));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Create Your Password</h1>
            <p className="text-gray-500 mb-8">Choose a strong password to secure your account.</p>

            <form onSubmit={handleContinue} className="w-full space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} id="password" value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                    placeholder="••••••••" disabled={isLoading}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
                    placeholder="••••••••" disabled={isLoading}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfirmPassword
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="space-y-2 py-2">
                {[
                  { met: hasSpecialChar, label: 'Must contain one special character' },
                  { met: hasMinLength, label: 'Must be at least 8 characters' },
                  { met: hasNumber, label: 'Must contain one number' },
                ].map(({ met, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${met ? 'bg-gray-500' : 'bg-gray-300'}`}>
                      {met && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                    <span className={`text-sm ${met ? 'text-gray-700' : 'text-gray-500'}`}>{label}</span>
                  </div>
                ))}
              </div>

              {errors.api && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.api}</p>
                </div>
              )}

              <button type="submit" disabled={isLoading}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Continue'}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600">
              Have an account?{' '}
              <a href="/auth/login" className="text-yellow-600 hover:text-yellow-700 font-medium">Sign In</a>
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">© Dreamize 2025</div>
      </div>

      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image src="/real/image.jpeg" alt="Blue sky with clouds" fill className="object-cover object-center scale-105" priority quality={100} />
      </div>
    </div>
  );
}
