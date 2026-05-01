'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const { navigate } = useNavigationWithLoading();
  const { login, isLoading, error } = useAuth();
  const { isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'admin': '/dashboard/admin',
        'guardian': '/dashboard/guardian',
        'sales_manager': '/dashboard/sales_manager'
      };
      navigate(dashboardRoutes[user.role]);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalErrors({ email: '', password: '' });

    // Client-side validation
    if (!email) {
      setLocalErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }
    if (!password) {
      setLocalErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
    await login(email, password);
  };



  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8">
            Sign in to your account to continue.
          </p>


          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalErrors((prev: { email: string; password: string }) => ({ ...prev, email: '' }));
                }}
                placeholder="Enter your email"
                error={localErrors.email}
                required
              />
              {localErrors.email && <p className="mt-2 text-sm text-red-500">{localErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLocalErrors((prev: { email: string; password: string }) => ({ ...prev, password: '' }));
                }}
                placeholder="Enter your password"
                error={localErrors.password}
                required

              />
              {localErrors.password && <p className="mt-2 text-sm text-red-500">{localErrors.password}</p>}
            </div>

            {/* Display login error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className='w-full flex justify-center'>
              <Button >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/auth/signup')}
              className="text-primary hover:text-yellow-700 font-medium"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </p>

          {/* Forgot password link */}
          <p className="mt-2 text-sm text-gray-600 text-center">
            <button
              onClick={() => navigate('/auth/forgot-password')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </p>
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
          alt="Beach with palm tree"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
