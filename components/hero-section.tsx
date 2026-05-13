'use client'

import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-white pt-20 pb-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#ffb400] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffb400] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/50 border border-[#ffb400]/30 rounded-full w-fit">
              <span className="w-2 h-2 bg-[#ffb400] rounded-full"></span>
              <span className="text-sm font-medium text-gray-800">Shaping Africa&apos;s Future Tech Leaders</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Building Africa&apos;s{' '}
              <span className="text-[#ffb400] relative">
                Early Tech
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#ffb400]/20 rounded-full"></div>
              </span>
              {' '}Talent Pipeline
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              Early career guidance, hands-on learning, and real-world project experience for young Africans. From age 10 to 25, we guide learners from early exposure to career readiness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-[#ffb400] text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Explore Programs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-[#ffb400]">500+</p>
                <p className="text-sm text-gray-600">Young Learners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#ffb400]">25+</p>
                <p className="text-sm text-gray-600">Real Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#ffb400]">10</p>
                <p className="text-sm text-gray-600">Schools Reached</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            {/* Floating Cards */}
            <div className="absolute top-0 right-0 w-64 h-80 bg-white border-2 border-[#ffb400]/30 rounded-3xl p-6 shadow-lg transform hover:-translate-y-4 transition-transform duration-500">
              <div className="w-full h-32 bg-gradient-to-br from-[#ffb400]/20 to-[#ffb400]/10 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tech Innovators</h3>
              <p className="text-sm text-gray-600">Build real solutions from age 16</p>
            </div>

            <div className="absolute bottom-12 left-0 w-64 h-80 bg-white border-2 border-[#ffb400]/30 rounded-3xl p-6 shadow-lg transform hover:translate-y-4 transition-transform duration-500">
              <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl mb-4 flex items-center justify-center">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Early Explorers</h3>
              <p className="text-sm text-gray-600">Discover tech passion from age 10</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
