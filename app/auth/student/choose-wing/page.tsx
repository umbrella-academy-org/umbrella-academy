'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Clock, Shield, Star, Users, X } from 'lucide-react';

interface Wing {
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

export default function ChooseWingPage() {
  const router = useRouter();
  const [selectedWing, setSelectedWing] = useState('');
  const [error, setError] = useState('');
  const [viewingWing, setViewingWing] = useState<Wing | null>(null);

  const wings: Wing[] = [
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      description: 'Master the art of building scalable enterprise systems. From cloud-native architecture to full-stack mastery, gain the technical edge needed to lead in the modern tech landscape.',
      icon: '🚀',
      rating: 4.9,
      students: 2450,
      mentors: 12,
      trainers: {
        total: 32,
        available: 24,
        topTrainers: [
          { name: 'Dr. Sarah Chen', avatar: 'SC', specialization: 'Distributed Systems', rating: 4.9 },
          { name: 'Marcus Rodriguez', avatar: 'MR', specialization: 'Cloud Architecture', rating: 4.8 }
        ]
      },
      specializations: ['Distributed Systems', 'Cloud Native', 'DevOps Elite', 'Full-stack JS'],
      averageCompletionTime: '6-9 months',
      successRate: 98,
      monthlyPrice: 85000
    },
    {
      id: 'ux-innovation',
      title: 'UX & Product Innovation',
      description: 'Go beyond interfaces. Design immersive digital ecosystems using psychology-driven UX, motion design, and strategic product thinking that users love.',
      icon: '🎨',
      rating: 4.8,
      students: 1820,
      mentors: 10,
      trainers: {
        total: 22,
        available: 15,
        topTrainers: [
          { name: 'Elena Frost', avatar: 'EF', specialization: 'Interaction Design', rating: 4.9 },
          { name: 'David Okafor', avatar: 'DO', specialization: 'User Research', rating: 4.7 }
        ]
      },
      specializations: ['Behavioral UX', 'Motion Systems', 'Product Strategy', 'Design Ops'],
      averageCompletionTime: '5-7 months',
      successRate: 95,
      monthlyPrice: 72000
    },
    {
      id: 'ai-intelligence',
      title: 'AI & Data Intelligence',
      description: 'Harness the power of neural networks and big data. Build intelligent systems that predict, automate, and solve complex global challenges at scale.',
      icon: '🧠',
      rating: 4.9,
      students: 1560,
      mentors: 15,
      trainers: {
        total: 28,
        available: 18,
        topTrainers: [
          { name: 'Prof. Julian Voss', avatar: 'JV', specialization: 'Deep Learning', rating: 5.0 },
          { name: 'Ami Tanaka', avatar: 'AT', specialization: 'NLP Systems', rating: 4.8 }
        ]
      },
      specializations: ['Machine Learning', 'Neural Networks', 'Big Data Ops', 'Ethical AI'],
      averageCompletionTime: '8-12 months',
      successRate: 92,
      monthlyPrice: 95000
    },
    {
      id: 'cyber-resilience',
      title: 'Cyber Resilience & Trust',
      description: 'Defend the digital frontier. Master offensive security, advanced cryptography, and zero-trust architectures to protect global infrastructure from emerging threats.',
      icon: '�️',
      rating: 4.7,
      students: 980,
      mentors: 8,
      trainers: {
        total: 18,
        available: 12,
        topTrainers: [
          { name: 'Sam "Viper" Wright', avatar: 'SW', specialization: 'Ethical Hacking', rating: 4.9 },
          { name: 'Lisa Ray', avatar: 'LR', specialization: 'Cryptography', rating: 4.8 }
        ]
      },
      specializations: ['Penetration Testing', 'Risk Governance', 'Network Defense', 'Cloud Security'],
      averageCompletionTime: '7-10 months',
      successRate: 89,
      monthlyPrice: 78000
    }
  ];

  const handleWingSelect = (wingId: string) => {
    setSelectedWing(wingId);
    setError('');
    router.push('/auth/student/choose-company');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWing) {
      setError('Please select a wing to continue');
      return;
    }

    console.log('Selected wing:', selectedWing);
    // Store selected wing
    localStorage.setItem('selectedWing', selectedWing);
    router.push('/auth/student/choose-company');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* Go back button */}
          <div className="mb-12">
            <button
              onClick={() => router.push('/post-signup/availability')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black uppercase tracking-widest">Go back</span>
            </button>
          </div>

          <div className="text-center">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-yellow-600/20 mx-auto transform -rotate-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Choose Your Wing
              </h1>
              <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
                Select the specialized industry wing that aligns with your professional ambitions and terminal goals.
              </p>
            </div>
            {/* Wing Selection List */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {wings.map((wing) => {
                  const isSelected = selectedWing === wing.id;
                  return (
                    <div
                      key={wing.id}
                      onClick={() => handleWingSelect(wing.id)}
                      className={`relative p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer group hover:scale-[1.03] ${isSelected
                        ? 'bg-white border-2 border-yellow-600 shadow-2xl shadow-yellow-600/10'
                        : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-yellow-200'
                        }`}
                    >
                      {/* Top Icon Section */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner transition-all duration-500 ${isSelected ? 'bg-yellow-600 text-white rotate-6' : 'bg-slate-50 text-slate-400 group-hover:bg-yellow-50 group-hover:text-yellow-600 group-hover:rotate-6'
                          }`}>
                          {wing.icon}
                        </div>
                        {isSelected && (
                          <div className="bg-yellow-600 text-white p-1 rounded-full animate-in zoom-in-50 duration-500">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="mb-8">
                        <h3 className={`text-xl font-black tracking-tight mb-3 transition-colors ${isSelected ? 'text-yellow-800' : 'text-slate-800'}`}>
                          {wing.title}
                        </h3>
                        <p className={`text-sm leading-relaxed font-medium transition-colors ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                          {wing.description}
                        </p>
                      </div>

                      {/* Bottom Action Section */}
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingWing(wing);
                          }}
                          className={`flex items-center gap-3 text-sm font-black transition-all group/btn ${isSelected ? 'text-yellow-600' : 'text-slate-400 group-hover:text-yellow-600'
                            }`}
                        >
                          <span className="uppercase tracking-widest text-[10px]">Learn more</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-yellow-600 text-white translate-x-1 shadow-lg shadow-yellow-600/20' : 'bg-slate-50 text-slate-400 group-hover/btn:bg-yellow-600 group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:shadow-lg group-hover/btn:shadow-yellow-600/20'
                            }`}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-red-500 text-center">{error}</p>}



              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
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


      {/* Wing Details Modal */}
      {viewingWing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-yellow-50 rounded-lg flex items-center justify-center text-3xl shadow-sm border border-yellow-100">
                  {viewingWing.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900  ">{viewingWing.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-black text-gray-700">{viewingWing.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-600  border-l border-gray-200 pl-3">
                      {viewingWing.successRate}% Success Rate
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingWing(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-10">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-600  border-b border-gray-100 pb-2">Wing Description</h4>
                <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                  "{viewingWing.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingWing.specializations.map((spec, index) => (
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
                      <span className="text-sm text-gray-900">{viewingWing.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                      <span className="text-sm text-gray-900">{viewingWing.averageCompletionTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500  flex items-center gap-2"><Shield className="w-3 h-3" /> Mentors</span>
                      <span className="text-sm text-gray-900">{viewingWing.mentors} Experts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Top Live Trainers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingWing.trainers.topTrainers.map((trainer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-yellow-200 transition-all">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-sm font-black text-yellow-700 border border-gray-100 group-hover:scale-110 transition-transform">
                        {trainer.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-s font-black text-gray-900  tracking-tight">{trainer.name}</p>
                        <p className="text-xs font-bold text-gray-600 leading-tight mt-0.5">{trainer.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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
                    handleWingSelect(viewingWing.id);
                    setViewingWing(null);
                  }}
                  className="flex-1 bg-yellow-600 text-white py-4 rounded-lg text-sm font-black   hover:bg-yellow-700 transition-all shadow-lg active:scale-95"
                >
                  Apply to this Wing
                </button>
                <button
                  onClick={() => setViewingWing(null)}
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
