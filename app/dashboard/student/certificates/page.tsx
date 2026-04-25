'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Student } from '@/types';
import Sidebar from '@/components/dashboard/Sidebar';
import { 
  Award, 
  Lock, 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle,
  FileText
} from 'lucide-react';

// Placeholder certificate interface - will be replaced with actual type when backend is ready
interface Certificate {
  id: string;
  studentName: string;
  milestoneName: string;
  trainerName: string;
  completionDate: string;
  certificateId: string;
}

export default function CertificatesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Cast user to Student to access subscription status
  const student = user as Student;
  const hasActiveSubscription = student?.hasActiveSubscription ?? false;

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  // Locked state - subscription required
  if (!hasActiveSubscription) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeItem="Certificates" userType="student" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">My Certificates</h1>
                <p className="text-gray-600 mt-1">Download your milestone completion certificates</p>
              </div>

              {/* Locked Message */}
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Certificates Locked</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Certificates are awarded when you complete milestones. 
                  Subscribe to unlock certificate generation and build your credentials.
                </p>
                <button 
                  onClick={() => router.push('/dashboard/student/pay/subscription')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  Subscribe to Unlock (100,000 RWF/month)
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // For now, show empty state - certificates will be fetched from backend
  // When backend is ready, replace this with actual data fetching
  const certificates: Certificate[] = []; // Will be populated from API

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Certificates" userType="student" />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">My Certificates</h1>
                <p className="text-gray-600 mt-1">Milestone completion certificates and achievements</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Certificates Grid */}
            {certificates.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Complete milestones and get them approved by your trainer to earn certificates. 
                  These will appear here for download.
                </p>
                <button 
                  onClick={() => router.push('/dashboard/student/roadmap')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Go to Roadmap
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Certificate Preview */}
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white">
                      <div className="flex items-center justify-center mb-4">
                        <Award className="w-12 h-12" />
                      </div>
                      <h3 className="text-lg font-bold text-center mb-1">Certificate of Completion</h3>
                      <p className="text-yellow-100 text-sm text-center">{cert.milestoneName}</p>
                    </div>

                    {/* Certificate Details */}
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <FileText className="w-4 h-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Certificate ID</p>
                            <p className="text-sm font-medium text-gray-900">{cert.certificateId}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Completed On</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(cert.completionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Verified By</p>
                            <p className="text-sm font-medium text-gray-900">{cert.trainerName}</p>
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
