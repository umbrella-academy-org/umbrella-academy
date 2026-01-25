'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Award, Users, Star } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialization: string;
  experience: string;
  students: number;
  availability: string[]; // ['morning', 'afternoon', etc.]
}

export default function PickTrainerPage() {
  const router = useRouter();
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [error, setError] = useState('');
  const [studentAvailability, setStudentAvailability] = useState<string[]>([]);

  useEffect(() => {
    // Get student availability from localStorage (set in previous step)
    const stored = localStorage.getItem('studentAvailability');
    if (stored) {
      setStudentAvailability(JSON.parse(stored));
    }
  }, []);

  const trainers: Trainer[] = [
    {
      id: 'tr-1',
      name: 'Demi Wilkinson',
      title: 'Senior Software Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      specialization: 'Full-Stack Development',
      experience: '8 years',
      students: 156,
      availability: ['morning', 'afternoon']
    },
    {
      id: 'tr-2',
      name: 'Sarah Ingabire',
      title: 'Lead Frontend Architect',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      specialization: 'React & Design Systems',
      experience: '6 years',
      students: 203,
      availability: ['evening', 'night']
    },
    {
      id: 'tr-3',
      name: 'Robert Kayitare',
      title: 'Principal DevOps Engineer',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      specialization: 'Cloud Infrastructure',
      experience: '10 years',
      students: 124,
      availability: ['afternoon', 'evening']
    }
  ];

  // Filter trainers based on student availability
  const filteredTrainers = trainers.filter(trainer =>
    studentAvailability.length === 0 ||
    trainer.availability.some(slot => studentAvailability.includes(slot))
  );

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrainer) {
      setError('Please select a trainer to continue');
      return;
    }
    localStorage.setItem('selectedTrainer', selectedTrainer);
    router.push('/auth/student/payment');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Pick your Trainer
            </h1>
            <p className="text-gray-500 mb-10 text-center">
              Choose an expert who matches your schedule and goals.
            </p>

            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-8">
                {filteredTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${selectedTrainer === trainer.id
                      ? 'border-yellow-600 bg-yellow-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    onClick={() => setSelectedTrainer(trainer.id)}
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-semibold">
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {trainer.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {trainer.title}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-gray-700">{trainer.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-700">{trainer.students} learners</span>
                        </div>
                      </div>
                    </div>

                    {selectedTrainer === trainer.id && (
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                ))}

                {filteredTrainers.length === 0 && (
                  <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">No trainers available for your selected time slots.</p>
                    <button
                      type="button"
                      onClick={() => router.push('/auth/student/availability')}
                      className="text-yellow-600 font-medium text-sm mt-2"
                    >
                      Update your availability
                    </button>
                  </div>
                )}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                disabled={filteredTrainers.length === 0}
              >
                Continue to Payment
              </button>

              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === 6 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-300'}`}></div>
                ))}
              </div>
            </form>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center mt-8">
          © Dreamize 2025
        </div>
      </div>

      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Trainer background"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
