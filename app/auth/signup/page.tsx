'use client';

import { AuthContainer } from '@/components/auth/auth-container';
import { AuthCard } from '@/components/auth/auth-card';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const roles = [
    {
      id: 'student',
      title: "I'm a Student",
      description: "Looking to learn and grow my skills",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
      path: '/auth/student/register'
    },
    {
      id: 'trainer',
      title: "I'm a Trainer",
      description: "Apply to train and share your expertise",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
      path: '/auth/trainer/register'
    }
  ];

  return (
    <AuthContainer>
      <AuthCard 
        title="Join Dreamize" 
        subtitle="Choose your path and start building your future today."
      >
        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                localStorage.setItem('userType', role.id);
                router.push(role.path);
              }}
              className="w-full group p-6 bg-white border border-slate-100 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-left flex items-center gap-5"
            >
              <div className={`w-14 h-14 ${role.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                  {role.title}
                </h3>
                <p className="text-[14px] text-slate-500 font-light leading-snug">
                  {role.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-[15px] text-slate-500 font-light">
          Already have an account?{' '}
          <a href="/auth/login" className="text-primary font-bold hover:underline">
            Sign In
          </a>
        </div>

        <div className="mt-12 text-center text-[12px] text-slate-400 uppercase tracking-widest font-bold">
          © Dreamize 2025
        </div>
      </AuthCard>
    </AuthContainer>
  );
}

