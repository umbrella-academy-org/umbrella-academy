'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Award, Users, Star, Eye, X, MapPin, Clock } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialization: string;
  experience: string;
  students: number;
  location: string;
  bio: string;
  education: string[];
  certifications: string[];
  languages: string[];
  hourlyRate: string;
  responseTime: string;
  completionRate: number;
  totalSessions: number;
  specialties: string[];
}

export default function PickMentorPage() {
  const router = useRouter();
  const [selectedMentor, setSelectedMentor] = useState('');
  const [viewingProfile, setViewingProfile] = useState<Mentor | null>(null);
  const [error, setError] = useState('');

  const mentors: Mentor[] = [
    {
      id: 'mentor-1',
      name: 'Dr. Alice Mukamana',
      title: 'Senior Engineering Manager',
      avatar: 'AM',
      rating: 4.9,
      reviewCount: 89,
      specialization: 'Technical Leadership',
      experience: '12+ years',
      students: 67,
      location: 'Kigali, Rwanda',
      bio: 'Experienced engineering manager with 12+ years leading technical teams. Passionate about mentoring engineers and helping them advance their careers.',
      education: ['PhD Computer Science - University of Rwanda', 'MS Software Engineering - MIT'],
      certifications: ['PMP Certified', 'AWS Solutions Architect', 'Certified Scrum Master'],
      languages: ['English', 'Kinyarwanda', 'French'],
      hourlyRate: '$60/hour',
      responseTime: '< 1 hour',
      completionRate: 99,
      totalSessions: 180,
      specialties: ['Leadership', 'Career Development', 'System Design', 'Team Management']
    },
    {
      id: 'mentor-2',
      name: 'James Nkurunziza',
      title: 'Principal Software Architect',
      avatar: 'JN',
      rating: 4.8,
      reviewCount: 124,
      specialization: 'Software Architecture',
      experience: '15+ years',
      students: 45,
      location: 'Kigali, Rwanda',
      bio: 'Principal architect with extensive experience in designing large-scale systems. Mentor developers on system design and architectural best practices.',
      education: ['MS Computer Science - NUR', 'BS Software Engineering - AUCA'],
      certifications: ['TOGAF Certified', 'AWS Solutions Architect Professional', 'Google Cloud Architect'],
      languages: ['English', 'Kinyarwanda', 'Swahili'],
      hourlyRate: '$65/hour',
      responseTime: '< 2 hours',
      completionRate: 97,
      totalSessions: 220,
      specialties: ['System Architecture', 'Microservices', 'Cloud Design', 'Scalability']
    },
    {
      id: 'mentor-3',
      name: 'Grace Uwimana',
      title: 'VP of Engineering',
      avatar: 'GU',
      rating: 4.9,
      reviewCount: 156,
      specialization: 'Executive Leadership',
      experience: '18+ years',
      students: 34,
      location: 'Kigali, Rwanda',
      bio: 'VP of Engineering with 18+ years experience scaling engineering organizations. Specializes in career advancement and executive leadership.',
      education: ['MBA - Kellogg School', 'MS Computer Science - Stanford'],
      certifications: ['Executive Leadership Certificate', 'Agile Transformation', 'OKR Certified'],
      languages: ['English', 'Kinyarwanda', 'French', 'German'],
      hourlyRate: '$80/hour',
      responseTime: '< 3 hours',
      completionRate: 98,
      totalSessions: 150,
      specialties: ['Executive Leadership', 'Career Strategy', 'Organizational Design', 'Strategic Planning']
    }
  ];

  const handleViewProfile = (mentor: Mentor) => {
    setViewingProfile(mentor);
  };

  const handleCloseProfile = () => {
    setViewingProfile(null);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) {
      setError('Please select a mentor to continue');
      return;
    }
    const mentor = mentors.find(m => m.id === selectedMentor);
    localStorage.setItem('selectedMentor', JSON.stringify(mentor));
    router.push('/auth/student/pick-trainer');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-gray-400 fill-current' : 'text-gray-200'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-amber-900 mb-2">
              Pick your Mentor
            </h1>
            <p className="text-gray-500 mb-2 text-center">
              Choose a senior mentor to guide your career development.
            </p>
            <p className="text-xs text-gray-400 mb-10 text-center">
              Click "View Profile" to see detailed information about each mentor.
            </p>

            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-8">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg transition-all ${selectedMentor === mentor.id
                      ? 'border-amber-600 bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${selectedMentor === mentor.id ? 'bg-amber-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'
                      }`}>
                      {mentor.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-amber-900">
                            {mentor.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {mentor.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(mentor.rating)}
                          <span className="text-xs text-gray-500">({mentor.reviewCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-700">{mentor.students} mentees</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-700">{mentor.experience}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedMentor(mentor.id)}
                            className={`px-3 py-1 text-xs rounded transition-colors ${selectedMentor === mentor.id
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                          >
                            {selectedMentor === mentor.id ? 'Selected' : 'Select'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleViewProfile(mentor)}
                            className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-700 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            View Profile
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-amber-900">{mentor.hourlyRate}</div>
                        </div>
                      </div>
                    </div>

                    {selectedMentor === mentor.id && (
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                ))}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-gray-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Continue to Pick Trainer
              </button>

              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === 5 ? 'w-8 bg-amber-600' : 'w-2 bg-gray-300'}`}></div>
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
          src="/real/image.jpeg"
          alt="Mentor background"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>

      {/* Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 bg-amber-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-amber-900">Mentor Profile</h2>
              <button
                onClick={handleCloseProfile}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Mentor Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {viewingProfile.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-900">{viewingProfile.name}</h3>
                  <p className="text-gray-600 mb-2">{viewingProfile.title}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(viewingProfile.rating)}
                    <span className="text-sm text-gray-500">
                      {viewingProfile.rating} ({viewingProfile.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{viewingProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{viewingProfile.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-amber-900">{viewingProfile.hourlyRate}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-amber-900">{viewingProfile.students}</div>
                  <div className="text-xs text-gray-500">Mentees</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-amber-900">{viewingProfile.totalSessions}</div>
                  <div className="text-xs text-gray-500">Sessions</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-amber-900">{viewingProfile.completionRate}%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-amber-900">{viewingProfile.responseTime}</div>
                  <div className="text-xs text-gray-500">Response</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">About</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{viewingProfile.bio}</p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">Education</h4>
                <ul className="space-y-1">
                  {viewingProfile.education.map((edu, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedMentor(viewingProfile.id);
                    handleCloseProfile();
                  }}
                  className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Select This Mentor
                </button>
                <button
                  onClick={handleCloseProfile}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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