'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Star, MapPin, Clock, Users, Award, Eye, X } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

interface Trainer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: string;
  location: string;
  availability: string;
  availableTimeSlots: {
    day: string;
    times: string[];
  }[];
  students: number;
  specialties: string[];
  bio: string;
  education: string[];
  certifications: string[];
  languages: string[];
  hourlyRate: string;
  responseTime: string;
  completionRate: number;
  totalSessions: number;
}

export default function ChooseTrainerPage() {
  const router = useRouter();
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [viewingProfile, setViewingProfile] = useState<Trainer | null>(null);
  const [error, setError] = useState('');

  // Get selected wing from localStorage
  const selectedWing = typeof window !== 'undefined' ? localStorage.getItem('selectedWing') : '';

  const trainers: Trainer[] = [
    {
      id: 'trainer-1',
      name: 'Sarah Johnson',
      title: 'Senior Full Stack Developer',
      avatar: 'SJ',
      rating: 4.9,
      reviewCount: 127,
      experience: '8+ years',
      location: 'Kigali, Rwanda',
      availability: 'Available now',
      availableTimeSlots: [
        { day: 'Monday', times: ['9:00 AM', '2:00 PM', '4:00 PM'] },
        { day: 'Tuesday', times: ['10:00 AM', '3:00 PM'] },
        { day: 'Wednesday', times: ['9:00 AM', '1:00 PM', '5:00 PM'] },
        { day: 'Thursday', times: ['11:00 AM', '2:00 PM'] },
        { day: 'Friday', times: ['9:00 AM', '4:00 PM'] },
        { day: 'Saturday', times: ['10:00 AM'] }
      ],
      students: 45,
      specialties: ['React', 'Node.js', 'TypeScript', 'AWS'],
      bio: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. I specialize in modern JavaScript frameworks and cloud technologies. I love mentoring developers and helping them achieve their career goals.',
      education: ['BS Computer Science - University of Rwanda', 'AWS Solutions Architect Certification'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Certified Scrum Master'],
      languages: ['English', 'Kinyarwanda', 'French'],
      hourlyRate: '$45/hour',
      responseTime: '< 2 hours',
      completionRate: 98,
      totalSessions: 340
    },
    {
      id: 'trainer-2',
      name: 'Michael Chen',
      title: 'Senior Software Engineer',
      avatar: 'MC',
      rating: 4.8,
      reviewCount: 89,
      experience: '6+ years',
      location: 'Kigali, Rwanda',
      availability: 'Available tomorrow',
      availableTimeSlots: [
        { day: 'Monday', times: ['1:00 PM', '3:00 PM', '6:00 PM'] },
        { day: 'Tuesday', times: ['2:00 PM', '4:00 PM', '7:00 PM'] },
        { day: 'Wednesday', times: ['1:00 PM', '5:00 PM'] },
        { day: 'Thursday', times: ['3:00 PM', '6:00 PM'] },
        { day: 'Friday', times: ['2:00 PM', '4:00 PM'] },
        { day: 'Sunday', times: ['10:00 AM', '2:00 PM'] }
      ],
      students: 32,
      specialties: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      bio: 'Experienced software engineer with a focus on backend development and system architecture. I have worked with startups and enterprise companies, building robust and scalable systems.',
      education: ['MS Software Engineering - AUCA', 'BS Computer Engineering - NUR'],
      certifications: ['Docker Certified Associate', 'PostgreSQL Professional', 'Python Institute Certified'],
      languages: ['English', 'Mandarin', 'Kinyarwanda'],
      hourlyRate: '$40/hour',
      responseTime: '< 4 hours',
      completionRate: 95,
      totalSessions: 280
    },
    {
      id: 'trainer-3',
      name: 'Emma Williams',
      title: 'UI/UX Designer & Frontend Developer',
      avatar: 'EW',
      rating: 4.7,
      reviewCount: 156,
      experience: '5+ years',
      location: 'Kigali, Rwanda',
      availability: 'Available now',
      availableTimeSlots: [
        { day: 'Monday', times: ['8:00 AM', '11:00 AM', '3:00 PM'] },
        { day: 'Tuesday', times: ['9:00 AM', '1:00 PM', '4:00 PM'] },
        { day: 'Wednesday', times: ['8:00 AM', '2:00 PM'] },
        { day: 'Thursday', times: ['10:00 AM', '3:00 PM', '5:00 PM'] },
        { day: 'Friday', times: ['9:00 AM', '1:00 PM'] },
        { day: 'Saturday', times: ['11:00 AM', '2:00 PM'] },
        { day: 'Sunday', times: ['10:00 AM'] }
      ],
      students: 38,
      specialties: ['Figma', 'React', 'CSS', 'Design Systems'],
      bio: 'Creative designer and frontend developer who bridges the gap between design and code. I help students learn both design principles and modern frontend development.',
      education: ['BA Graphic Design - University of Rwanda', 'Frontend Development Bootcamp'],
      certifications: ['Adobe Certified Expert', 'Figma Professional', 'Google UX Design Certificate'],
      languages: ['English', 'Kinyarwanda', 'Swahili'],
      hourlyRate: '$38/hour',
      responseTime: '< 3 hours',
      completionRate: 96,
      totalSessions: 420
    }
  ];

  const handleTrainerSelect = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setError('');
  };

  const handleViewProfile = (trainer: Trainer) => {
    setViewingProfile(trainer);
  };

  const handleCloseProfile = () => {
    setViewingProfile(null);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTrainer) {
      setError('Please select a trainer to continue');
      return;
    }

    const trainer = trainers.find(t => t.id === selectedTrainer);
    console.log('Selected trainer:', trainer);
    
    // Store selected trainer
    localStorage.setItem('selectedTrainer', JSON.stringify(trainer));
    router.push('/post-signup/roadmap');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
        ))}
      </div>
    );
  };

  const getWingTitle = (wingId: string) => {
    const wingTitles: { [key: string]: string } = {
      'tech-companies': 'Tech Companies Wing',
      'business-companies': 'Business Companies Wing',
      'hotels': 'Hotels Wing'
    };
    return wingTitles[wingId] || 'Selected Wing';
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeItem="Roadmap" userType="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto flex items-center justify-center bg-gray-50">
          <div className="max-w-2xl w-full p-8">
            {/* Go back button */}
            <button
              onClick={() => router.push('/post-signup/payment')}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-black uppercase">Go back</span>
            </button>

            <div className="text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Choose Your Trainer
              </h1>
              <p className="text-gray-500 mb-2 text-sm">
                Select a trainer from the {getWingTitle(selectedWing || '')} to guide your learning journey.
              </p>
              <p className="text-xs text-gray-400 mb-8">
                Click "View Profile" to see detailed information about each trainer.
              </p>

              {/* Form */}
              <form onSubmit={handleContinue} className="w-full">
                <div className="space-y-4 mb-8">
                  {trainers.map((trainer) => (
                    <div
                      key={trainer.id}
                      className={`flex items-start gap-4 p-4 border rounded-lg transition-all ${selectedTrainer === trainer.id
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${selectedTrainer === trainer.id ? 'bg-yellow-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}>
                        {trainer.avatar}
                      </div>

                      {/* Trainer Info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{trainer.name}</h3>
                            <p className="text-sm text-gray-600">{trainer.title}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {renderStars(trainer.rating)}
                            <span className="text-xs text-gray-500">({trainer.reviewCount})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{trainer.experience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{trainer.students} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{trainer.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {trainer.specialties.slice(0, 3).map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              {specialty}
                            </span>
                          ))}
                          {trainer.specialties.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              +{trainer.specialties.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Availability Times */}
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-1">Next Available:</p>
                          <div className="flex flex-wrap gap-1">
                            {trainer.availableTimeSlots.slice(0, 2).map((slot, index) => (
                              <div key={index} className="text-xs">
                                <span className="font-medium text-gray-700">{slot.day}:</span>
                                <span className="text-gray-600 ml-1">
                                  {slot.times.slice(0, 2).join(', ')}
                                  {slot.times.length > 2 && ` +${slot.times.length - 2} more`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleTrainerSelect(trainer.id)}
                              className={`px-3 py-1 text-xs rounded transition-colors ${selectedTrainer === trainer.id
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                              {selectedTrainer === trainer.id ? 'Selected' : 'Select'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleViewProfile(trainer)}
                              className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 hover:text-blue-700 border border-blue-200 rounded hover:border-blue-300 transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View Profile
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">{trainer.hourlyRate}</div>
                            <div className="text-xs text-green-600">{trainer.availability}</div>
                          </div>
                        </div>
                      </div>

                      {selectedTrainer === trainer.id && (
                        <CheckCircle className="w-5 h-5 text-yellow-600 mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                {error && <p className="mb-4 text-xs font-medium text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-all active:scale-95"
                >
                  Continue to Roadmap Creation
                </button>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 pt-6">
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
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

      {/* Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Trainer Profile</h2>
              <button
                onClick={handleCloseProfile}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Trainer Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {viewingProfile.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{viewingProfile.name}</h3>
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
                  <div className="text-lg font-semibold text-gray-900">{viewingProfile.hourlyRate}</div>
                  <div className="text-sm text-green-600">{viewingProfile.availability}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{viewingProfile.students}</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{viewingProfile.totalSessions}</div>
                  <div className="text-xs text-gray-500">Sessions</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{viewingProfile.completionRate}%</div>
                  <div className="text-xs text-gray-500">Completion</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{viewingProfile.responseTime}</div>
                  <div className="text-xs text-gray-500">Response</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{viewingProfile.bio}</p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
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
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Schedule */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Weekly Availability</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {viewingProfile.availableTimeSlots.map((slot, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 text-sm mb-1">{slot.day}</div>
                      <div className="flex flex-wrap gap-1">
                        {slot.times.map((time, timeIndex) => (
                          <span key={timeIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleTrainerSelect(viewingProfile.id);
                    handleCloseProfile();
                  }}
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  Select This Trainer
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