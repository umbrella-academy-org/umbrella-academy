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
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black  ">Back to Fields</span>
            </button>
          </div>

          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-xl flex items-center justify-center shadow-xl shadow-yellow-600/20 mx-auto transform -rotate-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-slate-900 mb-4 ">
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
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black   text-yellow-800 shadow-sm">
                          {company.fieldId.split('-')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className={`text-xl font-black mb-2 transition-colors ${isSelected ? 'text-yellow-800' : 'text-slate-800'
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
                          <span className="text-xs">View Profile</span>
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
                className={`w-full max-w-sm py-4 px-8 rounded-lg   transition-all duration-300 transform active:scale-95 ${selectedCompanyId
                  ? 'bg-yellow-600 text-white shadow-xl shadow-yellow-600/20 hover:bg-yellow-700 hover:-translate-y-1'
                  : 'bg-yellow-600 text-slate-500 cursor-not-allowed opacity-50'
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
          <div className="text-center text-[10px] font-black   text-slate-300 mt-20">
            © Umbrella Academy 2025 // Proprietary System
          </div>
        </div>
      </main>

      {/* Company Details - Full Screen Documentation View */}
      {viewingCompany && (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col animate-in fade-in duration-300">
          {/* Fixed Header */}
          <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewingCompany(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{viewingCompany.name}</h2>
                  <p className="text-xs font-bold text-slate-400  ">Company Documentation</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleCompanySelect(viewingCompany.id);
                  setViewingCompany(null);
                }}
                className="bg-yellow-600 text-white px-6 py-3 rounded-xl text-sm font-black   hover:bg-yellow-700 transition-all shadow-lg shadow-yellow-600/20 active:scale-95"
              >
                Enroll Now
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="relative h-[60vh] min-h-[500px]">
                <Image
                  src={viewingCompany.images[1] || viewingCompany.images[0] || `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop`}
                  alt={viewingCompany.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />

                <div className="absolute inset-0 flex items-end">
                  <div className="w-full px-6 lg:px-12 pb-16">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-yellow-600 text-white text-xs font-black   rounded-lg shadow-lg">
                          {viewingCompany.fieldId}
                        </span>
                        <a
                          href={viewingCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-black   rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                        </a>
                      </div>
                      <h1 className="text-5xl lg:text-7xl font-black text-white mb-6">
                        {viewingCompany.name}
                      </h1>
                      <p className="text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-3xl">
                        {viewingCompany.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="px-6 lg:px-12 py-16 bg-gradient-to-b from-white via-slate-50/30 to-white">
                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="text-4xl font-black text-yellow-600 mb-2">98%</div>
                    <div className="text-xs font-black text-slate-400  ">Success Rate</div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="text-4xl font-black text-yellow-600 mb-2">500+</div>
                    <div className="text-xs font-black text-slate-400  ">Graduates</div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="text-4xl font-black text-yellow-600 mb-2">15+</div>
                    <div className="text-xs font-black text-slate-400  ">Years Active</div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="text-4xl font-black text-yellow-600 mb-2">Day 1</div>
                    <div className="text-xs font-black text-slate-400  ">Employment</div>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Content Column */}
                  <div className="lg:col-span-2 space-y-16">
                    {/* Mission & Vision */}
                    <section>
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Our Mission</h3>
                        <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border border-yellow-100">
                        <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                          To bridge the gap between academic learning and industry excellence by providing world-class training experiences that transform students into industry-ready professionals.
                        </p>
                        <p className="text-base text-slate-600 font-medium leading-relaxed">
                          We believe in hands-on learning, mentorship-driven growth, and creating pathways to meaningful careers in {viewingCompany.fieldId}.
                        </p>
                      </div>
                    </section>

                    {/* Core Values */}
                    <section>
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Core Values</h3>
                        <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { title: 'Excellence', desc: 'Striving for the highest standards in everything we do', icon: '🎯' },
                          { title: 'Innovation', desc: 'Embracing new ideas and cutting-edge technologies', icon: '💡' },
                          { title: 'Integrity', desc: 'Building trust through transparency and ethical practices', icon: '🤝' },
                          { title: 'Growth', desc: 'Fostering continuous learning and development', icon: '📈' }
                        ].map((value, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-yellow-200 hover:shadow-lg transition-all group">
                            <div className="text-4xl mb-4">{value.icon}</div>
                            <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">{value.title}</h4>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{value.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Training Programs */}
                    <section>
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Training Programs</h3>
                        <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                      <div className="space-y-4">
                        {viewingCompany.teachingFocus.map((focus, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-yellow-200 hover:shadow-lg transition-all group">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-yellow-600 transition-all">
                                <CheckCircle className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">{focus}</h4>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                  Comprehensive training module designed to build expertise through practical application and real-world projects.
                                </p>
                                <div className="mt-4 flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-400">Duration:</span>
                                  <span className="text-xs font-black text-slate-600">8-12 weeks</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Achievements */}
                    <section>
                      <div className="mb-8">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-8 h-8 text-yellow-600" />
                          <div>
                            <h3 className="text-3xl font-black text-slate-900">Achievements & Recognition</h3>
                            <div className="w-20 h-1 bg-yellow-600 rounded-full mt-2"></div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viewingCompany.achievements.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-5 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl hover:shadow-lg transition-all group">
                            <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-yellow-600/20">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-base font-bold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">{item}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Facilities & Resources */}
                    <section>
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Facilities & Resources</h3>
                        <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { title: 'Modern Labs', desc: 'State-of-the-art equipment and technology' },
                          { title: 'Collaboration Spaces', desc: 'Designed for teamwork and innovation' },
                          { title: 'Digital Library', desc: 'Access to industry resources and research' },
                          { title: 'Mentorship Hub', desc: 'Dedicated spaces for one-on-one guidance' },
                          { title: 'Project Studios', desc: 'Real-world simulation environments' },
                          { title: 'Networking Lounges', desc: 'Connect with industry professionals' }
                        ].map((facility, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-yellow-200 hover:shadow-lg transition-all">
                            <h4 className="text-base font-black text-slate-900 mb-2">{facility.title}</h4>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{facility.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Student Testimonials */}
                    <section>
                      <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Student Success Stories</h3>
                        <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                      <div className="space-y-6">
                        {[
                          { name: 'Sarah Johnson', role: 'Senior Developer at Tech Corp', quote: 'The hands-on experience I gained here was invaluable. I felt prepared from day one in my career.' },
                          { name: 'Michael Chen', role: 'Product Manager at Innovation Labs', quote: 'The mentorship program connected me with industry leaders who shaped my career path.' },
                          { name: 'Emma Williams', role: 'UX Designer at Creative Studio', quote: 'Real projects, real deadlines, real impact. This program transformed my skills and confidence.' }
                        ].map((testimonial, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white shadow-xl">
                            <p className="text-lg font-medium leading-relaxed mb-6 italic">
                              &quot;{testimonial.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                                {testimonial.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-black text-white">{testimonial.name}</div>
                                <div className="text-sm text-slate-400 font-medium">{testimonial.role}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    {/* Quick Info Card */}
                    <div className="bg-slate-900 p-8 rounded-2xl text-white sticky top-24">
                      <h4 className="text-xs font-black text-slate-500   mb-6">Quick Information</h4>

                      <div className="space-y-6">
                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-2">Industry</div>
                          <div className="text-base font-black text-white">{viewingCompany.fieldId}</div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-2">Program Duration</div>
                          <div className="text-base font-black text-white">6-12 Months</div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-2">Training Format</div>
                          <div className="text-base font-black text-white">Hybrid (On-site & Remote)</div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-2">Certification</div>
                          <div className="text-base font-black text-white">Industry Recognized</div>
                        </div>

                        <div className="pt-6 border-t border-slate-700">
                          <div className="text-xs font-bold text-slate-400 mb-3">Success Metrics</div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-300">Completion Rate</span>
                              <span className="text-sm font-black text-yellow-500">96%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-300">Job Placement</span>
                              <span className="text-sm font-black text-yellow-500">98%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-300">Avg. Starting Salary</span>
                              <span className="text-sm font-black text-yellow-500">$75K+</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleCompanySelect(viewingCompany.id);
                          setViewingCompany(null);
                        }}
                        className="w-full mt-8 bg-yellow-600 text-white py-4 rounded-xl text-sm font-black   hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95"
                      >
                        Select This Partner
                      </button>
                    </div>

                    {/* Career Paths */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-black text-slate-400   mb-6">Career Pathways</h4>
                      <div className="space-y-4">
                        {[
                          'Junior Developer',
                          'Associate Consultant',
                          'Technical Specialist',
                          'Project Coordinator',
                          'Business Analyst'
                        ].map((career, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-yellow-50 transition-all group">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-all">
                              <span className="text-xs font-black text-yellow-600 group-hover:text-white">{idx + 1}</span>
                            </div>
                            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{career}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Partnership Benefits */}
                    <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border border-yellow-100">
                      <h4 className="text-xs font-black text-slate-400   mb-6">Partnership Benefits</h4>
                      <div className="space-y-3">
                        {[
                          'Industry Mentorship',
                          'Real Project Experience',
                          'Networking Events',
                          'Career Counseling',
                          'Job Placement Support',
                          'Alumni Network Access'
                        ].map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                            <span className="text-sm font-bold text-slate-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 lg:px-12 py-16">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className="text-4xl font-black text-white mb-4">Ready to Start Your Journey?</h3>
                  <p className="text-lg text-slate-300 font-medium mb-8">
                    Join {viewingCompany.name} and transform your career with industry-leading training and mentorship.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => {
                        handleCompanySelect(viewingCompany.id);
                        setViewingCompany(null);
                      }}
                      className="bg-yellow-600 text-white px-8 py-4 rounded-xl text-sm font-black   hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95"
                    >
                      Enroll with {viewingCompany.name}
                    </button>
                    <button
                      onClick={() => setViewingCompany(null)}
                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl text-sm font-black   hover:bg-white/20 transition-all border border-white/20"
                    >
                      View Other Partners
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
