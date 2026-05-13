'use client'
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next-app-progress-bar';
import { useSearchParams } from 'next/navigation';
import { AuthContainer } from '@/components/auth/auth-container';
import { AuthCard } from '@/components/auth/auth-card';
import { PremiumInput } from '@/components/ui/premium-input';
import { PremiumButton } from '@/components/ui/premium-button';
import { guardianService } from '@/services/guardian';
import { Lock, CheckCircle, XCircle, GraduationCap, ArrowRight, Mail } from 'lucide-react';

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [guardianInfo, setGuardianInfo] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
  const [studentInfo, setStudentInfo] = useState<{ firstName: string; lastName: string } | null>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await guardianService.verifyInvite(token);
        if (response.success && response.data) {
          setIsValid(true);
          setGuardianInfo(response.data.guardian || null);
          setStudentInfo(response.data.studentName ? { firstName: response.data.studentName.split(' ')[0], lastName: response.data.studentName.split(' ')[1] } : null);
        } else {
          setIsValid(false);
          setError(response.message || 'Invalid invitation token');
        }
      } catch {
        setIsValid(false);
        setError('An error occurred while verifying the token. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid invitation token');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await guardianService.setPassword(token, password);
      if (response.success) {
        setSuccess(true);
        router.push('/auth/login');
      } else {
        setError(response.message || 'Failed to set password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDecline = async () => {
    if (!token) return;

    if (!confirm('Are you sure you want to decline this invitation?')) {
      return;
    }

    setIsVerifying(true);
    try {
      const response = await guardianService.declineInvite(token);
      if (response.success) {
        router.push('/');
      } else {
        setError(response.message || 'Failed to decline invitation');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <AuthContainer>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-500 font-medium animate-pulse">Verifying invitation...</p>
        </div>
      </AuthContainer>
    );
  }

  // Invalid or missing token
  if (!token || !isValid) {
    return (
      <AuthContainer>
        <AuthCard title="Invalid Link" subtitle="This invitation has expired or is no longer valid.">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <XCircle size={40} />
            </div>
            <p className="text-center text-slate-600">Please contact the student or administrator to request a new invitation link.</p>
            <PremiumButton onClick={() => router.push('/auth/login')}>
              Go to Login
            </PremiumButton>
          </div>
        </AuthCard>
      </AuthContainer>
    );
  }

  // Success state
  if (success) {
    return (
      <AuthContainer>
        <AuthCard title="Welcome Aboard!" subtitle="Your guardian account is now active.">
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 relative">
              <CheckCircle size={48} />
              <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping"></div>
            </div>
            <p className="text-center text-slate-600 font-medium">Redirecting you to the login page...</p>
          </div>
        </AuthCard>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
        <AuthCard
        title={`Welcome, ${guardianInfo?.firstName || 'Guardian'}`}
        subtitle="You've been invited to oversee a student's learning journey."
      >
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-primary/10 flex items-center justify-center text-primary">
            <GraduationCap size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-slate-500 font-bold uppercase tracking-widest">Student to Monitor</p>
            <p className="text-[16px] font-bold text-slate-800 break-words">{studentInfo?.firstName} {studentInfo?.lastName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Your Email
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-medium italic min-w-0">
              <Mail size={18} />
              <span className="min-w-0 break-all">{guardianInfo?.email}</span>
            </div>
          </div>

          <PremiumInput
            label="Create Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={error && error.includes('match') ? '' : error}
            icon={<Lock size={18} />}
            required
          />

          <PremiumInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            error={error && error.includes('match') ? error : ''}
            icon={<Lock size={18} />}
            required
          />

          <div className="pt-4">
            <PremiumButton type="submit" isLoading={isVerifying}>
              Accept & Activate
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
          </div>

          <button
            type="button"
            onClick={handleDecline}
            disabled={isVerifying}
            className="w-full py-2 text-slate-400 hover:text-red-500 text-[14px] font-medium transition-colors"
          >
            Decline Invitation
          </button>
        </form>

        <p className="text-[12px] text-slate-400 text-center mt-8 font-light italic leading-relaxed">
          By accepting, you&apos;ll be able to view {studentInfo?.firstName}&apos;s progress, certificates, and projects.
          Your account is view-only for safety and privacy.
        </p>

        <div className="mt-10 text-center text-[12px] text-slate-300 uppercase tracking-widest font-bold">
          © Dreamize 2025
        </div>
      </AuthCard>
    </AuthContainer>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthContainer>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </AuthContainer>
    }>
      <SetPasswordContent />
    </Suspense>
  );
}
