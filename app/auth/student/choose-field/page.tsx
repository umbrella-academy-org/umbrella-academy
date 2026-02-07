'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Clock, Shield, Star, Users, X } from 'lucide-react';
import { mockFields } from '@/data/fields';
import { Field } from '@/types';

export default function ChooseFieldPage() {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('');
  const [error, setError] = useState('');
  const [viewingField, setViewingField] = useState<Field | null>(null);

  const fields = mockFields;

  const handleFieldSelect = (fieldId: string) => {
    setSelectedField(fieldId);
    setError('');
    // Store selected field immediately for faster flow
    localStorage.setItem('selectedField', fieldId);
    router.push('/auth/student/choose-company');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedField) {
      setError('Please select a field to continue');
      return;
    }

    console.log('Selected field:', selectedField);
    localStorage.setItem('selectedField', selectedField);
    router.push('/auth/student/choose-company');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* Go back button */}
          <div className="mb-12">
            <button
            onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black  ">Go back</span>
            </button>
          </div>

          <div className="text-center">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-4xl flex items-center justify-center shadow-xl shadow-yellow-600/20 mx-auto transform -rotate-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="mb-12">
              <h1 className="text-2xl font-semibold text-black mb-4 ">
                Choose Your Field
              </h1>
              <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
                Select the specialized industry field that aligns with your professional ambitions and terminal goals.
              </p>
            </div>
            {/* Field Selection List */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {fields.map((field) => {
                  const isSelected = selectedField === field.id;
                  return (
                    <div
                      key={field.id}
                      onClick={() => handleFieldSelect(field.id)}
                      className={`relative p-8 rounded-xl text-left transition-all duration-300 cursor-pointer group hover:scale-[1.03] ${isSelected
                        ? 'bg-white border-2 border-yellow-600 shadow-2xl shadow-yellow-600/10'
                        : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-yellow-200'
                        }`}
                    >
                      {/* Selection Indicator */}
                      <div className="absolute top-6 right-6">
                        {isSelected && (
                          <div className="bg-yellow-600 text-white p-1 rounded-full animate-in zoom-in-50 duration-500">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="mb-8">
                        <div className='flex justify-between items-start'>
                          <h3 className={`text-xl font-black  mb-3 transition-colors ${isSelected ? 'text-yellow-800' : 'text-slate-800'}`}>
                            {field.name}
                          </h3>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-inner transition-all duration-500 ${isSelected ? 'bg-yellow-600 text-white rotate-6' : 'bg-slate-50 text-slate-400 group-hover:bg-yellow-50 group-hover:text-yellow-600 group-hover:rotate-6'
                            }`}>
                            {field.icon}
                          </div>
                        </div>
                        <p className={`text-sm leading-relaxed font-medium transition-colors ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                          {field.description}
                        </p>
                      </div>

                      {/* Bottom Action Section */}
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingField(field);
                          }}
                          className={`flex items-center gap-3 text-sm font-black transition-all group/btn ${isSelected ? 'text-yellow-600' : 'text-slate-400 group-hover:text-yellow-600'
                            }`}
                        >
                          <span className="  text-[10px]">Learn more</span>
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

      {/* Field Details Modal */}
      {viewingField && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-yellow-50 rounded-lg flex items-center justify-center text-3xl shadow-sm border border-yellow-100">
                  {viewingField.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">{viewingField.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-black text-gray-700">{viewingField.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 border-l border-gray-200 pl-3">
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
                <h4 className="text-sm font-semibold text-gray-600 border-b border-gray-100 pb-2">Field Description</h4>
                <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                  &quot;{viewingField.description}&quot;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4"  >
                  <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingField.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-sm font-black rounded shadow-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-600 border-b border-gray-100 pb-2">Experience Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500 flex items-center gap-2"><Users className="w-3 h-3" /> Students</span>
                      <span className="text-sm text-gray-900">{viewingField.studentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500 flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                      <span className="text-sm text-gray-900">{viewingField.averageCompletionTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500 flex items-center gap-2"><Shield className="w-3 h-3" /> Mentors</span>
                      <span className="text-sm text-gray-900">{viewingField.mentorsCount} Experts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-600 border-b border-gray-100 pb-2">Top Live Trainers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingField.selectionTrainers?.topTrainers.map((trainer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-yellow-200 transition-all">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-sm font-black text-yellow-700 border border-gray-100 group-hover:scale-110 transition-transform">
                        {trainer.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-s font-black text-gray-900 ">{trainer.name}</p>
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
                    handleFieldSelect(viewingField.id);
                    setViewingField(null);
                  }}
                  className="flex-1 bg-yellow-600 text-white py-4 rounded-lg text-sm font-black hover:bg-yellow-700 transition-all shadow-lg active:scale-95"
                >
                  Apply to this Field
                </button>
                <button
                  onClick={() => setViewingField(null)}
                  className="px-8 py-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-black hover:text-gray-900 hover:border-gray-300 transition-all"
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
