'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Globe, Target, Trophy, X } from 'lucide-react';
import { mockCompanies } from '@/data/companies';
import { Company } from '@/types';

export default function ChooseCompanyPage() {
  const router = useRouter();
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [error, setError] = useState('');
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);

  // Filter companies based on selected field if needed
  const companies = mockCompanies;

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompanyId) {
      setError('Please select a company to continue');
      return;
    }

    console.log('Selected company:', selectedCompanyId);
    localStorage.setItem('selectedCompany', selectedCompanyId);
    router.push('/auth/student/payment');
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-auto">
        <div className="w-full max-w-5xl mx-auto overflow-auto">
          {/* Go back button */}
          <div className="mb-12">
            <button
              onClick={() => router.push('/auth/student/choose-field')}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black uppercase tracking-widest">Back to Fields</span>
            </button>
          </div>

          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-4xl flex items-center justify-center shadow-xl shadow-yellow-600/20 mx-auto transform -rotate-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Select Your Partner Company
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
              Choose the corporate partner where you&apos;ll complete your industry training and gain real-world experience.
            </p>
          </div>

          {/* Company Selection Grid */}
          <form onSubmit={handleContinue} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {companies.map((company) => {
                const isSelected = selectedCompanyId === company.id;
                return (
                  <div
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    className={`relative flex flex-col rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group h-full ${isSelected
                      ? 'bg-white border-2 border-yellow-600 shadow-2xl shadow-yellow-600/10 scale-[1.02]'
                      : 'bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-yellow-200 hover:scale-[1.02]'
                      }`}
                  >
                    {/* Featured Image Section */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                      <Image
                        src={company.images[0] || `/auth/login`}
                        alt={company.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Selection Badge */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-yellow-600 text-white p-2 rounded-full shadow-lg animate-in zoom-in-50 duration-300">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}

                      {/* Industry Tag */}
                      <div className="absolute bottom-4 left-6">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-yellow-800 shadow-sm">
                          {company.fieldId.split('-')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className={`text-xl font-black tracking-tight mb-2 transition-colors ${isSelected ? 'text-yellow-800' : 'text-slate-800'
                          }`}>
                          {company.name}
                        </h3>
                        <p className={`text-sm leading-relaxed font-medium line-clamp-2 transition-colors ${isSelected ? 'text-slate-600' : 'text-slate-500'
                          }`}>
                          {company.description}
                        </p>
                      </div>

                      {/* Badges/Info */}
                      <div className="flex flex-wrap gap-2 mt-auto mb-8">
                        {company.teachingFocus.slice(0, 2).map((focus, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-100">
                            {focus}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingCompany(company);
                          }}
                          className={`flex items-center gap-3 text-sm font-black transition-all group/btn ${isSelected ? 'text-yellow-600' : 'text-slate-400 group-hover:text-yellow-600'
                            }`}
                        >
                          <span className="uppercase tracking-widest text-[10px]">View Profile</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                            ? 'bg-yellow-600 text-white translate-x-1 shadow-lg shadow-yellow-600/20'
                            : 'bg-slate-50 text-slate-400 group-hover/btn:bg-yellow-600 group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:shadow-lg group-hover/btn:shadow-yellow-600/20'
                            }`}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <p className="mb-8 text-sm font-bold text-red-500 text-center animate-bounce">{error}</p>}

            {/* Main Action Call */}
            <div className="flex flex-col items-center gap-8">
              <button
                type="submit"
                disabled={!selectedCompanyId}
                className={`w-full max-w-sm py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${selectedCompanyId
                  ? 'bg-yellow-600 text-white shadow-xl shadow-yellow-600/20 hover:bg-yellow-700 hover:-translate-y-1'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
              >
                Continue to Payment
              </button>

              {/* Progress Stepper */}
              <div className="flex justify-center gap-3 items-center">
                <div className="w-2 h-2 bg-yellow-600/30 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full transition-all duration-500"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg shadow-yellow-600/20"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mt-20">
            © Umbrella Academy 2025 // Proprietary System
          </div>
        </div>
      </main>

      {/* Company Details Modal */}
      {viewingCompany && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
          <div className="bg-white rounded-[2.5rem] max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-400">
            {/* Header Image */}
            <div className="h-64 relative">
              <Image
                src={viewingCompany.images[1] || viewingCompany.images[0] || `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop`}
                alt={viewingCompany.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-white" />
              <button
                onClick={() => setViewingCompany(null)}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl transition-all text-white border border-white/30"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-0 left-0 p-10 w-full flex items-end justify-between">
                <div>
                  <div className="px-3 py-1 bg-yellow-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block shadow-lg">
                    {viewingCompany.fieldId}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{viewingCompany.name}</h2>
                </div>
                <a
                  href={viewingCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white shadow-xl rounded-2xl text-yellow-600 hover:text-yellow-700 transition-all hover:scale-110 active:scale-95"
                >
                  <Globe className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">About the Company</h4>
                    <p className="text-slate-600 font-medium leading-relaxed text-lg">
                      {viewingCompany.description}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Achievements</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {viewingCompany.achievements.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-yellow-50/50 border border-yellow-100/50 rounded-2xl">
                          <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                          <span className="text-sm font-bold text-slate-700 leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-5 h-5 text-yellow-600" />
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Curriculum Focus</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      {viewingCompany.teachingFocus.map((focus, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-yellow-200 transition-all">
                          <span className="text-sm font-black text-slate-600 group-hover:text-yellow-700">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Partnership stats */}
                  <div className="p-6 bg-slate-900 rounded-4xl text-white">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 text-center">Program Stats</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-400">Success Rate</span>
                        <span className="text-yellow-500">98%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-400">Employment</span>
                        <span className="text-yellow-500">Day 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
              <button
                onClick={() => {
                  handleCompanySelect(viewingCompany.id);
                  setViewingCompany(null);
                }}
                className="flex-1 bg-yellow-600 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95"
              >
                Enroll with this Partner
              </button>
              <button
                onClick={() => setViewingCompany(null)}
                className="px-8 py-4 border-2 border-slate-200 text-slate-500 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
