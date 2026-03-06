'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Rocket, Palette, Brain, Shield, Building2, Eye } from 'lucide-react';
import { mockCompanies } from '@/data/companies';
import { mockFields } from '@/data/fields';
import { Company } from '@/types';

const fieldIcons: Record<string, any> = {
  'software-engineering': Rocket,
  'ux-innovation': Palette,
  'ai-intelligence': Brain,
  'cyber-resilience': Shield,
};

export default function TrainerChooseCompanyPage() {
  const router = useRouter();
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
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
    router.push('/auth/trainer/referral');
  };

  // Group companies by field
  const companiesByField = mockFields.map(field => ({
    field,
    companies: mockCompanies.filter(c => c.fieldId === field.id && c.isActive)
  })).filter(group => group.companies.length > 0);

  const viewingField = viewingCompany ? mockFields.find(f => f.id === viewingCompany.fieldId) : null;

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-2 flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => viewingCompany ? setViewingCompany(null) : window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black">{viewingCompany ? 'Back to list' : 'Go back'}</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">{viewingCompany ? (
              /* Company Detail View */
              <div className="w-full space-y-6">
                {/* Company Header */}
                <div className="text-center mb-8">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={viewingCompany.images[0] || '/real/image.jpeg'}
                      alt={viewingCompany.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{viewingCompany.name}</h2>
                  {viewingField && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      {(() => {
                        const FieldIcon = fieldIcons[viewingField.id] || Building2;
                        return <FieldIcon className="w-4 h-4" />;
                      })()}
                      <span>{viewingField.name}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-black text-gray-900 mb-3">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{viewingCompany.description}</p>
                </div>

                {/* Teaching Focus */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-black text-gray-900 mb-3">Teaching Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingCompany.teachingFocus.map((focus, idx) => (
                      <span key={idx} className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded border border-gray-200">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* How Our Programs Work */}
                {viewingCompany.programDetails && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-sm font-black text-gray-900 mb-4">How Our Programs Work</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-gray-900 mb-1">Personalized Curriculum</h4>
                        <p className="text-xs text-gray-600">{viewingCompany.programDetails.curriculum}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 mb-1">Learning Duration</h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          <li className="list-disc">Minimum: {viewingCompany.programDetails.duration.minimum}</li>
                          <li className="list-disc">{viewingCompany.programDetails.duration.extended}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 mb-1">Schedule</h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          <li className="list-disc">Classes run {viewingCompany.programDetails.schedule.days}</li>
                          <li className="list-disc">{viewingCompany.programDetails.schedule.flexibility}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 mb-1">Hands-On Projects</h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          {viewingCompany.programDetails.projects.map((project, idx) => (
                            <li key={idx} className="list-disc">{project}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {viewingCompany.pricing && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-sm font-black text-gray-900 mb-4">Pricing</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-black text-gray-900 mb-1">Tuition: {viewingCompany.pricing.tuition}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900 mb-2">Pricing includes:</h4>
                        <ul className="text-xs text-gray-600 space-y-1 ml-4">
                          {viewingCompany.pricing.includes.map((item, idx) => (
                            <li key={idx} className="list-disc">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Why Choose */}
                {viewingCompany.whyChoose && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-sm font-black text-gray-900 mb-3">Why Choose {viewingCompany.name}</h3>
                    <ul className="text-xs text-gray-600 space-y-2 ml-4">
                      {viewingCompany.whyChoose.map((reason, idx) => (
                        <li key={idx} className="list-disc">{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Images Gallery */}
                {viewingCompany.images.length > 1 && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-sm font-black text-gray-900 mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {viewingCompany.images.slice(1).map((img, idx) => (
                        <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={img}
                            alt={`${viewingCompany.name} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Select Button */}
                <button
                  onClick={() => {
                    handleCompanySelect(viewingCompany.id, viewingCompany.fieldId);
                    setViewingCompany(null);
                  }}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all active:scale-95"
                >
                  Select This Company
                </button>
              </div>
            ) : (
              /* Company List View */
              <>
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
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
              Select a company and specialized field where you'll provide training.
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
                        <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
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
                            className={`flex items-start gap-4 p-4 border rounded-lg transition-all group ${
                              isSelected
                                ? 'border-yellow-600 bg-gray-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            {/* Company Image */}
                            <div 
                              className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer ${
                                isSelected ? 'ring-2 ring-yellow-600' : ''
                              }`}
                              onClick={() => handleCompanySelect(company.id, field.id)}
                            >
                              <Image
                                src={company.images[0] || '/real/image.jpeg'}
                                alt={company.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            {/* Company Details */}
                            <div 
                              className="flex-1 min-w-0 cursor-pointer"
                              onClick={() => handleCompanySelect(company.id, field.id)}
                            >
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

                            {/* Actions */}
                            <div className="flex flex-col gap-2 shrink-0">
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-gray-900" />
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setViewingCompany(company);
                                }}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                title="View details"
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-gray-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={!selectedCompanyId || !selectedFieldId}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === 5 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-300'}`}></div>
                ))}
              </div>
            </form>
            </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
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
