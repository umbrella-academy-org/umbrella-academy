'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Rocket, Palette, Brain, Shield, Building2 } from 'lucide-react';
import { mockCompanies } from '@/data/companies';
import { mockFields } from '@/data/fields';

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
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black">Go back</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
              Choose Your Training Path
            </h1>
            <p className="text-gray-500 mb-10 text-center text-sm px-4">
              Select a company and specialized field where you'll complete your industry training.
            </p>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-8 mb-8">
                {companiesByField.map(({ field, companies }) => {
                  const FieldIcon = fieldIcons[field.id] || Building2;
                  return (
                    <div key={field.id} className="space-y-3">
                      {/* Field Header */}
                      <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                          <FieldIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-black text-gray-900">{field.name}</h3>
                          <p className="text-xs text-gray-500">{companies.length} partner companies</p>
                        </div>
                      </div>

                      {/* Companies */}
                      {companies.map((company) => {
                        const isSelected = selectedCompanyId === company.id && selectedFieldId === field.id;
                        return (
                          <div
                            key={company.id}
                            className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all group ${
                              isSelected
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                            onClick={() => handleCompanySelect(company.id, field.id)}
                          >
                            {/* Company Image */}
                            <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                              isSelected ? 'ring-2 ring-black' : ''
                            }`}>
                              <Image
                                src={company.images[0] || '/auth/login/image.png'}
                                alt={company.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            {/* Company Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                {company.name}
                              </h4>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                {company.description}
                              </p>
                              
                              {/* Teaching Focus Tags */}
                              <div className="flex flex-wrap gap-1">
                                {company.teachingFocus.slice(0, 3).map((focus, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                                    {focus}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Selection Indicator */}
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-gray-600 text-center">{error}</p>}

              <button
                type="submit"
                disabled={!selectedCompanyId || !selectedFieldId}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                <div className="w-8 h-2 bg-black rounded-full"></div>
                <div className="w-12 h-2 bg-black rounded-full shadow-lg"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Training environment"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
