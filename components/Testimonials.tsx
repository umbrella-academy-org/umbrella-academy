import { Star, Quote } from "lucide-react"
import { useReveal } from "@/hooks/system/useReveal";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "Dreamize Africa - Tech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Umbrella Academy LMS transformed my career. The structured learning path and mentor guidance helped me land my dream job in just 6 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Byose Tech - Tech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "The quality of trainers and the hands-on approach made all the difference. I gained real-world skills that I use every day in my career.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Film Producer",
    company: "Green Land Film School",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "From beginner to professional filmmaker, this platform provided everything I needed. The mentor support was invaluable throughout my journey.",
    rating: 5,
  },
  {
    name: "David Okoye",
    role: "Web Developer",
    company: "Dreamize Africa - Tech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "Best investment in my education. The progress tracking kept me motivated, and the live sessions with trainers were incredibly engaging.",
    rating: 5,
  }
];

export function Testimonials() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#525252]/5 rounded-full blur-3xl -z-10" />

      <div ref={ref} className="max-w-full mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <span className="inline-block px-4 py-2 bg-white text-[#525252] rounded-full text-sm font-medium mb-4 shadow-sm border border-gray-200">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              What Our <span className="text-[#525252]">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful learners who transformed their careers with us
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => {
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500", "animation-delay-600"];
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-[#525252]/30 relative ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#737373] rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#737373] text-[#737373]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-xs mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#525252]/20"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-[#525252]">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
