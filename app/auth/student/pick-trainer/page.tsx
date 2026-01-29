'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Award, Users, Star, Eye, X, MapPin, Clock } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialization: string;
  experience: string;
  students: number;
  availability: string[]; // ['morning', 'afternoon', etc.]
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

export default function PickTrainerPage() {
  const router = useRouter();
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [viewingProfile, setViewingProfile] = useState<Trainer | null>(null);
  const [error, setError] = useState('');
  const [studentAvailability, setStudentAvailability] = useState<string[]>([]);

  useEffect(() => {
    // Get student availability from localStorage (set in previous step)
    const stored = localStorage.getItem('studentAvailability');
    if (stored) {
      setStudentAvailability(JSON.parse(stored));
    }
  }, []);

  const trainers: Trainer[] = [
    {
      id: 'tr-1',
      name: 'Demi Wilkinson',
      title: 'Senior Software Engineer',
      avatar: 'DW',
      rating: 4.8,
      reviewCount: 156,
      specialization: 'Full-Stack Development',
      experience: '8 years',
      students: 156,
      availability: ['morning', 'afternoon'],
      location: 'Kigali, Rwanda',
      bio: 'Experienced full-stack developer with 8+ years building scalable applications. Passionate about mentoring and helping developers grow their careers.',
      education: ['BS Computer Science - University of Rwanda', 'AWS Solutions Architect Certification'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Certified Scrum Master'],
      languages: ['English', 'Kinyarwanda', 'French'],
      hourlyRate: '$45/hour',
      responseTime: '< 2 hours',
      completionRate: 98,
      totalSessions: 340,
      specialties: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
      id: 'tr-2',
      name: 'Sarah Ingabire',
      title: 'Lead Frontend Architect',
      avatar: 'SI',
      rating: 4.9,
      reviewCount: 203,
      specialization: 'React & Design Systems',
      experience: '6 years',
      students: 203,
      availability: ['evening', 'night'],
      location: 'Kigali, Rwanda',
      bio: 'Frontend architect specializing in React and modern design systems. Love creating beautiful, accessible user interfaces.',
      education: ['MS Software Engineering - AUCA', 'Frontend Development Bootcamp'],
      certifications: ['React Professional', 'Adobe Certified Expert', 'Figma Professional'],
      languages: ['English', 'Kinyarwanda', 'Swahili'],
      hourlyRate: '$42/hour',
      responseTime: '< 3 hours',
      completionRate: 96,
      totalSessions: 420,
      specialties: ['React', 'TypeScript', 'Figma', 'CSS']
    },
    {
      id: 'tr-3',
      name: 'Robert Kayitare',
      title: 'Principal DevOps Engineer',
      avatar: 'RK',
      rating: 4.7,
      reviewCount: 124,
      specialization: 'Cloud Infrastructure',
      experience: '10 years',
      students: 124,
      availability: ['afternoon', 'evening'],
      location: 'Kigali, Rwanda',
      bio: 'DevOps engineer with 10+ years experience in cloud infrastructure and automation. Expert in AWS, Docker, and Kubernetes.',
      education: ['MS Computer Engineering - NUR', 'AWS Solutions Architect Professional'],
      certifications: ['AWS Solutions Architect Professional', 'Docker Certified Associate', 'Kubernetes Administrator'],
      languages: ['English', 'Kinyarwanda', 'French'],
      hourlyRate: '$50/hour',
      responseTime: '< 4 hours',
      completionRate: 95,
      totalSessions: 280,
      specialties: ['AWS', 'Docker', 'Kubernetes', 'Python']
    }
  ];

  // Filter trainers based on student availability
  const filteredTrainers = trainers.filter(trainer =>
    studentAvailability.length === 0 ||
    trainer.availability.some(slot => studentAvailability.includes(slot))
  );

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
    localStorage.setItem('selectedTrainer', JSON.stringify(trainer));
    router.push('/auth/student/payment');
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

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Pick your Trainer
            </h1>
            <p className="text-gray-500 mb-2 text-center">
              Choose an expert who matches your schedule and goals.
            </p>
            <p className="text-xs text-gray-400 mb-10 text-center">
              Click "View Profile" to see detailed information about each trainer.
            </p>

            <form onSubmit={handleContinue} className="w-full">
              <div className="space-y-4 mb-8">
                {filteredTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg transition-all ${selectedTrainer === trainer.id
                      ? 'border-yellow-600 bg-yellow-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${selectedTrainer === trainer.id ? 'bg-yellow-600' : 'bg-gradient-to-br from-gray-300 to-gray-400'
                      }`}>
                      {trainer.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {trainer.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {trainer.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(trainer.rating)}
                          <span className="text-xs text-gray-500">({trainer.reviewCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-700">{trainer.students} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-700">{trainer.experience}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTrainer(trainer.id)}
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
                          <div className="text-xs font-semibold text-gray-900">{trainer.hourlyRate}</div>
                        </div>
                      </div>
                    </div>

                    {selectedTrainer === trainer.id && (
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                ))}

                {filteredTrainers.length === 0 && (
                  <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">No trainers available for your selected time slots.</p>
                    <button
                      type="button"
                      onClick={() => router.push('/auth/student/availability')}
                      className="text-yellow-600 font-medium text-sm mt-2"
                    >
                      Update your availability
                    </button>
                  </div>
                )}
              </div>

              {error && <p className="mb-4 text-xs font-medium text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                disabled={filteredTrainers.length === 0}
              >
                Continue to Payment
              </button>

              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === 6 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-300'}`}></div>
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
          src="/auth/login/image.png"
          alt="Trainer background"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
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

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTrainer(viewingProfile.id);
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
