'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ExternalLink, Award, Target, ChevronRight } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  website: string;
  achievements: string[];
  teachingFocus: string[];
  images: string[];
  description: string;
}

interface Wing {
  id: string;
  name: string;
  description: string;
  industry: string;
  companies: Company[];
  totalStudents: number;
  totalTrainers: number;
}

export default function WingExplorerPage() {
  const router = useRouter();
  const [selectedWing, setSelectedWing] = useState<string | null>(null);

  // Mock data for wings and companies
  const wings: Wing[] = [
    {
      id: 'tech',
      name: 'Tech Companies',
      description: 'Leading technology companies and startups',
      industry: 'Technology',
      totalStudents: 1250,
      totalTrainers: 85,
      companies: [
        {
          id: 'google',
          name: 'Google',
          website: 'https://google.com',
          achievements: ['Fortune 500', 'Best Places to Work', 'Innovation Leader'],
          teachingFocus: ['Software Engineering', 'AI/ML', 'Cloud Computing', 'Product Management'],
          images: ['/companies/google.png'],
          description: 'Global technology leader in search, cloud computing, and artificial intelligence.'
        },
        {
          id: 'microsoft',
          name: 'Microsoft',
          website: 'https://microsoft.com',
          achievements: ['Fortune 100', 'Sustainability Leader', 'Enterprise Solutions'],
          teachingFocus: ['Cloud Architecture', 'Enterprise Software', 'DevOps', 'Cybersecurity'],
          images: ['/companies/microsoft.png'],
          description: 'Leading provider of software, services, devices and solutions.'
        }
      ]
    },
    {
      id: 'business',
      name: 'Business Companies',
      description: 'Fortune 500 companies and business enterprises',
      industry: 'Business & Finance',
      totalStudents: 890,
      totalTrainers: 62,
      companies: [
        {
          id: 'jpmorgan',
          name: 'JPMorgan Chase',
          website: 'https://jpmorganchase.com',
          achievements: ['Fortune 50', 'Global Banking Leader', 'Innovation in Finance'],
          teachingFocus: ['Financial Analysis', 'Investment Banking', 'Risk Management', 'Fintech'],
          images: ['/companies/jpmorgan.png'],
          description: 'Leading global financial services firm and one of the largest banking institutions.'
        }
      ]
    },
    {
      id: 'hospitality',
      name: 'Hotels & Hospitality',
      description: 'Premium hotels and hospitality brands',
      industry: 'Hospitality',
      totalStudents: 650,
      totalTrainers: 45,
      companies: [
        {
          id: 'marriott',
          name: 'Marriott International',
          website: 'https://marriott.com',
          achievements: ['Global Hotel Leader', 'Customer Service Excellence', 'Sustainability Champion'],
          teachingFocus: ['Hotel Management', 'Customer Service', 'Operations', 'Revenue Management'],
          images: ['/companies/marriott.png'],
          description: 'World\'s largest hotel company with 30 leading brands across 139 countries.'
        }
      ]
    }
  ];

  const handleWingSelect = (wingId: string) => {
    setSelectedWing(wingId);
    localStorage.setItem('selectedWing', wingId);
    localStorage.setItem('selectedWingData', JSON.stringify(wings.find(w => w.id === wingId)));
    // Trigger roadmap creation process after wing selection
    router.push('/post-signup/roadmap');
  };

  const handleCompanyView = (companyId: string) => {
    console.log('Viewing company:', companyId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Wing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your industry focus to connect with leading companies and expert trainers in your field.
          </p>
        </div>

        {/* Wings Grid */}
        <div className="space-y-12">
          {wings.map((wing) => (
            <div key={wing.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Wing Header */}
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{wing.name}</h2>
                    <p className="text-yellow-100 mb-4">{wing.description}</p>
                    <div className="flex items-center gap-6 text-yellow-100">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {wing.companies.length} Companies
                      </span>
                      <span>{wing.totalStudents} Students</span>
                      <span>{wing.totalTrainers} Trainers</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWingSelect(wing.id)}
                    className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors flex items-center gap-2"
                  >
                    Select Wing
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Companies Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wing.companies.map((company) => (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {/* Company Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-700">Achievements</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {company.achievements.slice(0, 2).map((achievement, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              {achievement}
                            </span>
                          ))}
                          {company.achievements.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{company.achievements.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Teaching Focus */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Teaching Focus</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {company.teachingFocus.slice(0, 3).map((focus, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {focus}
                            </span>
                          ))}
                          {company.teachingFocus.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{company.teachingFocus.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => handleCompanyView(company.id)}
                        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Can't find your industry? <a href="/support" className="text-yellow-600 hover:text-yellow-700">Contact support</a> to request a new wing.</p>
        </div>
      </div>
    </div>
  );
}