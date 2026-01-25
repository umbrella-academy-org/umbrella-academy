'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, ShieldCheck, CheckCircle } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
  });

  const handleChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment data:', paymentData);
    localStorage.setItem('paymentCompleted', 'true');
    router.push('/auth/student/roadmap');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Go back</span>
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-600/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 text-center uppercase">
              Secure Payment
            </h1>
            <p className="text-sm font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">
              Unlock your premium mentorship plan today.
            </p>

            <div className="w-full bg-gray-900 rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <CreditCard className="w-10 h-10 text-yellow-600" />
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mentorship Fee</p>
                    <p className="text-3xl font-black tracking-tighter">RWF 75,000</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Academy Access</p>
                  <p className="text-sm font-bold">12 Months Premium Support</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600 rounded-full opacity-10 -mr-32 -mt-32 blur-3xl"></div>
            </div>

            <form onSubmit={handleContinue} className="w-full space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="OLIVIA RHYE"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 uppercase font-bold text-sm transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 font-bold text-sm transition-all"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 font-bold text-sm transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                      CVC
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 font-bold text-sm transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-green-50 p-4 rounded-2xl border border-green-100">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <p className="text-[10px] font-bold text-green-700 uppercase tracking-tight">Your data is encrypted with 256-bit AES protection.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 active:scale-95 mt-4"
              >
                Authorize Payment
              </button>

              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 7 ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-200'}`}></div>
                ))}
              </div>
            </form>
          </div>
        </div>

        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center mt-8">
          © Dreamize 2025
        </div>
      </div>

      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Payment background"
          fill
          className="object-cover object-center scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-yellow-600/10 mix-blend-multiply"></div>
      </div>
    </div>
  );
}
