'use client'

import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Amara Okonkwo',
      role: 'Early Exposure Student (14)',
      text: 'Dreamize Africa showed me that I can build things with technology. I thought programming was only for older people, but now I&apos;m creating my first app!',
      rating: 5,
      avatar: '🚀',
    },
    {
      name: 'Daniel Mwangi',
      role: 'Real-World Experience Student (17)',
      text: 'Working on real projects with a team changed everything for me. I now have a portfolio and I&apos;m confident about my tech career path.',
      rating: 5,
      avatar: '💻',
    },
    {
      name: 'Mrs. Aisha Patel',
      role: 'School Principal',
      text: 'Dreamize&apos;s outreach programs have inspired dozens of our students. The STEM awareness they bring is exactly what our young people need.',
      rating: 5,
      avatar: '🎯',
    },
    {
      name: 'James Kipchoge',
      role: 'Tech Mentor',
      text: 'Working with Dreamize&apos;s students has been rewarding. Their passion and potential are incredible. This organization is building Africa&apos;s future leaders.',
      rating: 5,
      avatar: '⭐',
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-3 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Voices of Impact
          </h2>
          <p className="text-lg text-gray-600">
            Hear from students, mentors, and partners who are part of the Dreamize Africa journey
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-primary/5 to-white border border-primary/10 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-amber-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-6 mt-20 p-8 bg-gradient-to-r from-gray-50 to-primary/5 border border-primary/10 rounded-2xl">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
            <p className="text-sm md:text-base text-gray-600 mt-2">Young Learners Inspired</p>
          </div>
          <div className="text-center border-l border-r border-primary/20">
            <p className="text-3xl md:text-4xl font-bold text-primary">95%</p>
            <p className="text-sm md:text-base text-gray-600 mt-2">Confidence Growth Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">25+</p>
            <p className="text-sm md:text-base text-gray-600 mt-2">Real Projects Built</p>
          </div>
        </div>
      </div>
    </section>
  )
}
