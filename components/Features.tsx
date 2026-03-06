import { BookOpen, Users, Target, TrendingUp, Shield, Award } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";

const features = [
  {
    icon: BookOpen,
    title: "Multi-Field Learning Domains",
    description: "Access diverse learning fields from technology to creative arts, all structured for maximum impact.",
    color: "#525252",
  },
  {
    icon: Users,
    title: "Company-Based Learning Programs",
    description: "Learn within organized companies that provide structured curricula and professional environments.",
    color: "#737373",
  },
  {
    icon: Target,
    title: "Mentor-Guided Learning",
    description: "Receive personalized guidance from experienced mentors who oversee your entire learning journey.",
    color: "#1a1a1a",
  },
  {
    icon: Award,
    title: "Trainer-Led Lessons & Live Sessions",
    description: "Engage with expert trainers in interactive sessions designed for real-world skill development.",
    color: "#525252",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking Dashboard",
    description: "Monitor your growth with comprehensive analytics and milestone tracking throughout your journey.",
    color: "#737373",
  },
  {
    icon: Shield,
    title: "Secure Enrollment & Payment System",
    description: "Safe and seamless enrollment process with secure payment integration for peace of mind.",
    color: "#1a1a1a",
  },
];

export function Features() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div ref={ref} className="max-w-full mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <span className="inline-block px-4 py-2 bg-[#525252]/10 text-[#525252] rounded-full text-sm font-medium mb-4 border border-[#525252]/20">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to <span className="text-[#525252]">Excel</span>
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive platform designed to deliver world-class learning experiences
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500", "animation-delay-600"];
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl hover:border-[#525252]/30 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: feature.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#525252]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
