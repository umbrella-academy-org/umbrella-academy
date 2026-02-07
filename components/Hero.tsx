"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-50 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ca8a04]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#fbbf24]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ca8a04]/10 border border-[#ca8a04]/20 rounded-full">
              <span className="w-2 h-2 bg-[#ca8a04] rounded-full animate-pulse" />
              <span className="text-sm text-[#ca8a04] font-medium">Next-Gen Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-black">Structured Learning.</span>
              <br />
              <span className="text-[#ca8a04]">Real Skills.</span>
              <br />
              <span className="text-black">Real Growth.</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Join Umbrella Academy LMS and learn from industry trainers, guided by expert mentors, inside structured learning companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/auth/signup")}
                className="group px-8 py-4 bg-[#ca8a04] text-white rounded-lg hover:bg-[#a16207] hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#ca8a04] hover:text-[#ca8a04] transition-all duration-300 flex items-center justify-center space-x-2 font-medium">
                <PlayCircle className="w-5 h-5" />
                <span>Explore Programs</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="animate-slide-up animation-delay-300">
                <div className="text-3xl font-bold text-[#ca8a04]">50K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="animate-slide-up animation-delay-400">
                <div className="text-3xl font-bold text-[#fbbf24]">1K+</div>
                <div className="text-sm text-gray-600">Expert Trainers</div>
              </div>
              <div className="animate-slide-up animation-delay-500">
                <div className="text-3xl font-bold text-black">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-fade-in-right animation-delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzcwMzI4NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students learning online"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#ca8a04]/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-slide-up animation-delay-500">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#ca8a04] rounded-lg flex items-center justify-center font-bold text-white text-xl">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-gray-900">Certificate Ready</div>
                  <div className="text-sm text-gray-500">Industry Recognized</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-slide-up animation-delay-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#fbbf24] rounded-lg flex items-center justify-center font-bold text-white text-xl">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-gray-900">Live Sessions</div>
                  <div className="text-sm text-gray-500">Interactive Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
