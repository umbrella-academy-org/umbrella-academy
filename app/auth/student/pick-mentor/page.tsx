'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Award, Users, Star } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialization: string;
  experience: string;
  students: number;
}

export default function PickMentorPage() {
  const router = useRouter();
  const [selectedMentor, setSelectedMentor] = useState('');
  const [error, setError] = useState('');

  const mentors: Mentor[] = [
    {
      id: 'demi-1',
      name: 'Demi Wilkinson',
      title: 'Senior Software Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      specialization: 'Full-Stack Development',
      experience: '8 years',
      students: 156
    },
    {
      id: 'sarah-1',
      name: 'Sarah Ingabire',
      title: 'Lead Frontend Architect',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      specialization: 'React & Design Systems',
      experience: '6 years',
      students: 203
    },
    {
      id: 'robert-1',
      name: 'Robert Kayitare',
      title: 'Principal DevOps Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      specialization: 'Cloud Infrastructure',
      experience: '10 years',
      students: 124
    }
  ];

  const handleMentorSelect = (mentorId: string) => {
    setSelectedMentor(mentorId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) {
      setError('Please select a mentor to continue');
      return;
    }
    localStorage.setItem('selectedMentor', selectedMentor);
    router.push('/auth/student/payment');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Go back</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 text-center uppercase">
              Pick Mentor
            </h1>
            <p className="text-sm font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">
              Choose an expert to guide your journey.
            </p>

            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-8">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${selectedMentor === mentor.id
                        ? 'border-yellow-600 bg-yellow-50 shadow-md scale-[1.02]'
                        : 'border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-50'
                      }`}
                    onClick={() => handleMentorSelect(mentor.id)}
                  >
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-colors ${selectedMentor === mentor.id ? 'border-yellow-600' : 'border-white'
                        }`}>
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-gray-700 font-black uppercase tracking-tighter">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-sm font-black uppercase tracking-tight ${selectedMentor === mentor.id ? 'text-gray-900' : 'text-gray-500'}`}>
                        {mentor.name}
                      </h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-0.5">
                        {mentor.title}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-gray-100">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-[10px] font-black text-gray-900">{mentor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-gray-100">
                          <Users className="w-3 h-3 text-blue-600" />
                          <span className="text-[10px] font-black text-gray-900">{mentor.students}</span>
                        </div>
                      </div>
                    </div>

                    {selectedMentor === mentor.id && (
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                ))}
              </div>

              {error && <p className="mb-4 text-xs font-black text-red-500 text-center uppercase tracking-tighter">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95"
              >
                Continue to Payment
              </button>

              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 6 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-200'}`}></div>
                ))}
              </div>
            </form>
          </div>
        </div>

        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center mt-8">
          © Dreamize 2025
        </div>
      </div>

      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Mentor background"
          fill
          className="object-cover object-center scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply"></div>
      </div>
    </div>
  );
}
