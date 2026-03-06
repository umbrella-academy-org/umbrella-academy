'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MoMoPayment from '@/components/payment/MoMoPayment';
import { Course } from '@/types';


export default function PaymentPage() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const courseJson = localStorage.getItem('selectedCourse');
    const company = localStorage.getItem('selectedCompany');
    
    if (!courseJson) {
      router.push('/auth/student/choose-company');
      return;
    }

    try {
      const course = JSON.parse(courseJson);
      setCourseData(course);
      
      // Get company name from mockCompanies
      const { mockCompanies } = require('@/data/companies');
      const foundCompany = mockCompanies.find((c: any) => c.id === company);
      if (foundCompany) {
        setCompanyName(foundCompany.name);
      }
    } catch (error) {
      console.error('Error parsing course data:', error);
      router.push('/auth/student/choose-company');
    }
  }, [router]);

  const handlePaymentSuccess = () => {
    console.log('Payment completed successfully');
    localStorage.setItem('paymentCompleted', 'true');
    router.push('/dashboard/student');
  };

  if (!courseData) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex-2 flex flex-col overflow-hidden items-center bg-white">
        <main className="overflow-auto flex items-center justify-center bg-white w-3xl">
          <div className="w-full p-8">
            {/* Go back button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 mt-50 hover:text-gray-900 mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go back
            </button>

            <div className="text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Complete Payment
              </h1>
              <p className="text-gray-500 mb-8 text-center">
                Pay with MoMo to enroll in your selected course.
              </p>

              {/* Course Details */}
              <div className="w-full p-6 bg-gray-50 rounded-lg border mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={courseData.image}
                      alt={courseData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-black text-gray-900 text-lg mb-1">{courseData.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{companyName}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {courseData.duration}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-200 rounded font-medium">
                        {courseData.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Total Amount</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">${courseData.price}</div>
                  </div>
                </div>
              </div>

              {/* MoMo Payment Component */}
              <div className="w-full">
                <MoMoPayment
                  amount={courseData.price}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-6">
                <div className="w-2 h-2 bg-yellow-600/30 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg"></div>
                <div className="w-12 h-2 bg-yellow-600 rounded-full shadow-lg"></div>
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-500 mt-8">
                © Dreamize 2025
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="/real/image.jpeg"
          alt="Underwater scene with pebbles"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}