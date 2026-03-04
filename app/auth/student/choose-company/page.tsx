'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, X, Building2, Rocket, Palette, Brain, Shield } from 'lucide-react';
import { mockCompanies } from '@/data/companies';
import { mockFields } from '@/data/fields';
import { Company } from '@/types';

const fieldIcons: Record<string, any> = {
  'software-engineering': Rocket,
  'ux-innovation': Palette,
  'ai-intelligence': Brain,
  'cyber-resilience': Shield,
};

export default function ChooseCompanyPage() {
  const router = useRouter();
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [error, setError] = useState('');
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);

  const handleCompanySelect = (companyId: string, fieldId: string) => {
    setSelectedCompanyId(companyId);
    setSelectedFieldId(fieldId);
    setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompanyId || !selectedFieldId) {
      setError('Please select a company and field to continue');
      return;
    }

    console.log('Selected company:', selectedCompanyId);
    console.log('Selected field:', selectedFieldId);
    localStorage.setItem('selectedCompany', selectedCompanyId);
    localStorage.setItem('selectedField', selectedFieldId);
    router.push('/auth/student/payment');
  };

  // Group companies by field
  const companiesByField = mockFields.map(field => ({
    field,
    companies: mockCompanies.filter(c => c.fieldId === field.id && c.isActive)
  })).filter(group => group.companies.length > 0);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-auto">
        <div className="w-full max-w-6xl mx-auto">
          {/* Go back button */}
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black">Go back</span>
            </button>
          </div>

          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-xl flex items-center justify-center shadow-xl mx-auto transform -rotate-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">
              Choose Your Training Path
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
              Select a company and specialized field where you'll complete your industry training and gain real-world experience.
            </p>
          </div>

          {/* Company Selection by Field */}
          <form onSubmit={handleContinue} className="w-full">
            <div className="space-y-16 mb-16">
              {companiesByField.map(({ field, companies }) => {
                const FieldIcon = fieldIcons[field.id] || Building2;
                return (
                  <div key={field.id} className="space-y-6">
                    {/* Field Header */}
                    <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-100">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                        <FieldIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">{field.name}</h2>
                        <p className="text-sm text-gray-500 font-medium">{field.description}</p>
                      </div>
                    </div>

                    {/* Companies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companies.map((company) => {
                        const isSelected = selectedCompanyId === company.id && selectedFieldId === field.id;
                        return (
                          <div
                            key={company.id}
                            onClick={() => handleCompanySelect(company.id, field.id)}
                            className={`relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group h-full ${
                              isSelected
                                ? 'bg-white border-2 border-black shadow-2xl scale-[1.02]'
                                : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:scale-[1.01]'
                            }`}
                          >
                            {/* Company Image */}
                            <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                              <Image
                                src={company.images[0] || '/auth/login/image.png'}
                                alt={company.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              {isSelected && (
                                <div className="absolute top-3 right-3 bg-black text-white p-2 rounded-full shadow-lg">
                                  <CheckCircle className="w-4 h-4" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                              <h3 className={`text-lg font-black mb-2 ${isSelected ? 'text-black' : 'text-slate-800'}`}>
                                {company.name}
                              </h3>
                              <p className="text-sm text-slate-600 font-medium line-clamp-2 mb-4">
                                {company.description}
                              </p>

                              {/* Focus Areas */}
                              <div className="flex flex-wrap gap-2 mt-auto">
                                {company.teachingFocus.slice(0, 2).map((focus, idx) => (
                                  <span key={idx} className="bg-gray-50 text-gray-600 text-xs font-bold px-2 py-1 rounded border border-gray-100">
                                    {focus}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <p className="mb-8 text-sm font-semibold text-gray-600 text-center">{error}</p>}

            {/* Continue Button */}
            <div className="flex flex-col items-center gap-8">
              <button
                type="submit"
                disabled={!selectedCompanyId || !selectedFieldId}
                className={`w-full max-w-sm py-3 px-8 rounded-lg transition-all duration-300 transform active:scale-95 ${
                  selectedCompanyId && selectedFieldId
                    ? 'bg-black text-white shadow-xl hover:bg-gray-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                Continue to Payment
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-3 items-center">
                <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                <div className="w-8 h-2 bg-black rounded-full"></div>
                <div className="w-12 h-2 bg-black rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-xs font-black text-slate-300 mt-20">
            © Umbrella Academy 2025
          </div>
        </div>
      </main>
    </div>
  );
}
