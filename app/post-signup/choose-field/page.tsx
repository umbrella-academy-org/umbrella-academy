'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Star, X, Users, BookOpen, Clock, Zap, TrendingUp, Shield } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Logo } from '@/components/ui/Logo';

interface Field {
  id: string;
  title: string;
  description: string;
  icon: string;
  rating: number;
  students: number;
  mentors: number;
  trainers: {
    total: number;
    available: number;
    topTrainers: {
      name: string;
      avatar: string;
      specialization: string;
      rating: number;
    }[];
  };
  specializations: string[];
  averageCompletionTime: string;
  successRate: number;
  monthlyPrice: number;
}

export default function ChooseFieldPage() {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('');
  const [viewingField, setViewingField] = useState<Field | null>(null);
  const [error, setError] = useState('');

  const fields: Field[] = [
    {
      id: 'tech-companies',
      title: 'Tech Companies Field',
      description: 'Learn with technology sector companies and startups. Focus on building real-world software, scaling systems, and mastering modern tech stacks used in the industry.',
      icon: '💻',
      rating: 4.8,
      students: 1250,
      mentors: 8,
      trainers: {
        total: 24,
        available: 18,
        topTrainers: [
          { name: 'Sarah Johnson', avatar: 'SJ', specialization: 'Full Stack Development', rating: 4.9 },
          { name: 'Michael Chen', avatar: 'MC', specialization: 'Backend Engineering', rating: 4.8 },
          { name: 'Emma Williams', avatar: 'EW', specialization: 'Frontend & UI/UX', rating: 4.9 }
        ]
      },
      specializations: ['Web Development', 'Mobile Apps', 'Cloud Computing', 'DevOps', 'AI/ML'],
      averageCompletionTime: '8-12 months',
      successRate: 94,
      monthlyPrice: 75000
    },
    {
      id: 'business-companies',
      title: 'Business Companies Field',
      description: 'Business consulting and enterprise solutions. Learn to manage projects, analyze data, and drive growth for established firms and consulting agencies.',
      icon: '💼',
      rating: 4.6,
      students: 890,
      mentors: 6,
      trainers: {
        total: 18,
        available: 14,
        topTrainers: [
          { name: 'Dr. Alice Mukamana', avatar: 'AM', specialization: 'Business Strategy', rating: 4.8 },
          { name: 'James Wilson', avatar: 'JW', specialization: 'Digital Marketing', rating: 4.7 },
          { name: 'Grace Uwimana', avatar: 'GU', specialization: 'Project Management', rating: 4.9 }
        ]
      },
      specializations: ['Business Analysis', 'Digital Marketing', 'Project Management', 'Data Analytics', 'Consulting'],
      averageCompletionTime: '6-10 months',
      successRate: 91,
      monthlyPrice: 65000
    },
    {
      id: 'hotels',
      title: 'Hotels Field',
      description: 'Hospitality and tourism industry training. Master the art of guest services, hotel management, and international tourism operations.',
      icon: '🏨',
      rating: 4.5,
      students: 675,
      mentors: 5,
      trainers: {
        total: 15,
        available: 12,
        topTrainers: [
          { name: 'Marie Uwimana', avatar: 'MU', specialization: 'Hotel Management', rating: 4.7 },
          { name: 'Robert Kayitare', avatar: 'RK', specialization: 'Tourism Operations', rating: 4.6 },
          { name: 'Linda Mutesi', avatar: 'LM', specialization: 'Customer Service', rating: 4.8 }
        ]
      },
      specializations: ['Hotel Management', 'Tourism Operations', 'Customer Service', 'Event Planning', 'Food & Beverage'],
      averageCompletionTime: '4-8 months',
      successRate: 88,
      monthlyPrice: 55000
    }
  ];

  const handleFieldSelect = (fieldId: string) => {
    setSelectedField(fieldId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedField) {
      setError('Please select a field to continue');
      return;
    }

    localStorage.setItem('selectedField', selectedField);
    router.push('/post-signup/payment');
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType="student" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full">
            {/* Go back button */}
            <button
              onClick={() => router.push('/post-signup/availability')}
              className="flex items-center gap-2 text-gray-600hover:text-gray-900 mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black ">Go back</span>
            </button>

            <div className="text-center">
              <div className="mb-8">
                <Logo size="lg" />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
                Choose Your Field
              </h1>
              <p className="text-gray-500 mb-10 text-center text-sm">
                Select the industry field that matches your career goals.
              </p>

              {/* Field Selection List */}
              <form onSubmit={handleContinue} className="w-full max-w-2xl mx-auto">
                <div className="space-y-4 mb-10">
                  {fields.map((field) => {
                    const isSelected = selectedField === field.id;
                    return (
                      <div
                        key={field.id}
                        className={`border rounded-lg transition-all duration-300 overflow-hidden ${isSelected
                          ? 'border-gray-600 bg-gray-50 shadow-md ring-1 ring-gray-600/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                      >
                        <div className="p-5 flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl shadow-sm transition-all ${isSelected ? 'bg-gray-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {field.icon}
                          </div>

                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                {field.title}
                              </h3>
                              {isSelected && <CheckCircle className="w-5 h-5 text-gray-600" />}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-gray-400 text-gray-400" />
                                  <span className="text-xs font-black text-gray-700">{field.rating}</span>
                                </div>
                                <span className="text-sm font-black text-gray-900 tracking-tight">
                                  RWF {field.monthlyPrice.toLocaleString()}/yr
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleFieldSelect(field.id)}
                                  className={`px-4 py-1.5 rounded text-xs font-black  transition-all ${isSelected
                                    ? 'bg-gray-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                  {isSelected ? 'Selected' : 'Select'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setViewingField(field)}
                                  className="px-4 py-1.5 rounded text-xs font-black  border border-gray-200 text-gray-600 hover:text-gray-900 transition-all"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {error && <p className="mb-4 text-xs font-medium text-gray-500 text-center">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all active:scale-95"
                >
                  Continue to Payment
                </button>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 pt-6">
                  <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </form>

              {/* Footer */}
              <div className="text-sm text-gray-500 mt-8">
                © Umbrella Academy 2025
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Field Details Modal */}
      {viewingField && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-3xl shadow-sm border border-gray-100">
                  {viewingField.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900  ">{viewingField.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-gray-400 text-gray-400" />
                      <span className="text-sm font-black text-gray-700">{viewingField.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-600  border-l border-gray-200 pl-3">
                      {viewingField.successRate}% Success Rate
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingField(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-10">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-600  border-b border-gray-100 pb-2">Field Description</h4>
                <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                  "{viewingField.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingField.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-sm font-black  rounded shadow-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className=" font-semibold text-gray-600 border-b border-gray-100 pb-2">Experience Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Users className="w-3 h-3" /> Students</span>
                      <span className="text-sm text-gray-900">{viewingField.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                      <span className="text-sm text-gray-900">{viewingField.averageCompletionTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Shield className="w-3 h-3" /> Mentors</span>
                      <span className="text-sm text-gray-900">{viewingField.mentors} Experts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Top Live Trainers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingField.trainers.topTrainers.map((trainer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-gray-200 transition-all">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-sm font-black text-gray-700 border border-gray-100 group-hover:scale-110 transition-transform">
                        {trainer.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-s font-black text-gray-900  tracking-tight">{trainer.name}</p>
                        <p className="text-xs font-bold text-gray-600 leading-tight mt-0.5">{trainer.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                        <span className="text-[10px] font-black text-gray-700">{trainer.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-50">
                <button
                  onClick={() => {
                    handleFieldSelect(viewingField.id);
                    setViewingField(null);
                  }}
                  className="flex-1 bg-gray-600 text-white py-4 rounded-lg text-sm font-black   hover:bg-gray-700 transition-all shadow-lg active:scale-95"
                >
                  Apply to this Field
                </button>
                <button
                  onClick={() => setViewingField(null)}
                  className="px-8 py-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-black  hover:text-gray-900 hover:border-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}