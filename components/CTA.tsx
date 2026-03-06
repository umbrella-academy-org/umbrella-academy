"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReveal } from "@/hooks/system/useReveal";

export function CTA() {
  const router = useRouter();
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#ca8a04] via-[#a16207] to-black" />

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbbf24]/20 rounded-full blur-3xl animate-slide-x" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ca8a04]/30 rounded-full blur-3xl animate-slide-y" style={{ animationDelay: "1s" }} />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div ref={ref} className="max-w-full mx-auto relative z-10">
        <div className={`text-center space-y-8 reveal ${isVisible ? 'visible' : ''}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-[#fbbf24]" />
            <span className="text-sm text-white font-medium">Start Learning Today</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Start Your Learning <br />Journey Today
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their careers with structured learning, expert mentors, and professional trainers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => router.push("/auth/signup")}
              className="group px-8 py-4 bg-white text-[#ca8a04] rounded-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 font-bold active:scale-95 hover:scale-105"
            >
              <span>Sign Up Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-medium active:scale-95 hover:scale-105"
            >
              Browse Fields
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Free trial available</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
