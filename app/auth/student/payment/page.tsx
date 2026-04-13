'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MoMoPayment from '@/components/payment/MoMoPayment';

export default function PaymentPage() {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    console.log('Payment completed successfully');
    localStorage.setItem('paymentCompleted', 'true');
    router.push('/dashboard/student');
  };

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

              {/* MoMo Payment Component */}
              <div className="w-full">
                <MoMoPayment
                  amount={0}
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