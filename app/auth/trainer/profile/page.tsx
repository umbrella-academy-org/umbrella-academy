'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Award, BookOpen, Quote } from 'lucide-react';

export default function TrainerProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!bio.trim()) {
      setError('Please tell students about yourself');
      return;
    }
    if (bio.length < 50) {
      setError('Please write at least 50 characters');
      return;
    }

    console.log('Trainer bio:', bio);
    router.push('/auth/trainer/education');
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
            <span className="text-sm font-semibold tracking-tight">Go back</span>
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
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
              Tell us about yourself
            </h1>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed max-w-md">
              Introduce your expertise and teaching approach to potential learners. Your bio is your first impression.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1"> Your Professional Bio</label>
                <div className="relative group">
                  <div className="absolute top-4 left-5 text-gray-300 group-focus-within:text-yellow-500 transition-colors">
                    <Quote className="w-5 h-5" />
                  </div>
                  <textarea
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      setError('');
                    }}
                    placeholder="Share your experience and what you love about teaching..."
                    className={`w-full pl-14 pr-6 py-5 bg-white border rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-600 text-gray-900 placeholder:text-gray-400 transition-all font-semibold resize-none h-56 leading-relaxed ${error ? 'border-red-500 shadow-sm shadow-red-50' : 'border-gray-100 shadow-sm'}`}
                    required
                  />
                </div>
                <div className="flex justify-between items-center px-2">
                  {error ? (
                    <p className="text-[11px] font-bold text-red-500">{error}</p>
                  ) : (
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">MINIMUM 50 CHARACTERS</p>
                  )}
                  <p className={`text-xs font-black ${bio.length < 50 ? 'text-gray-300' : 'text-green-500'}`}>
                    {bio.length} characters
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="group relative w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-gray-200 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Continue and Save Bio</span>
                  <div className="p-1 bg-white/10 rounded-lg group-hover:translate-x-1 transition-transform relative z-10">
                    <ChevronLeft className="w-5 h-5 rotate-180" />
                  </div>
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex flex-col items-center gap-6 pt-10">
                <div className="flex justify-center gap-2.5">
                  <div className="w-10 h-2 bg-yellow-600 rounded-full shadow-sm shadow-yellow-600/20"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Step 1 of 5 • Profile Bio</p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center pt-8">
          © Dreamize Academy 2025 • Trainer Excellence Program
        </div>
      </div>

      {/* Right side - Image Section */}
      <div className="hidden lg:block flex-[1.2] relative overflow-hidden bg-gray-900">
        <Image
          src="/auth/login/image.png"
          alt="Academy Infrastructure"
          fill
          className="object-cover object-center opacity-60 scale-105"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-20 left-12 right-12 animate-slide-up">
          <div className="p-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Trainer Onboarding</h3>
            </div>
            <p className="text-gray-300 font-medium text-lg leading-relaxed">Join a network of elite instructors shaping the next generation of software pioneers in Rwanda and beyond.</p>
            <div className="flex items-center gap-8 mt-10">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <BookOpen className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Impactful Curriculum</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
