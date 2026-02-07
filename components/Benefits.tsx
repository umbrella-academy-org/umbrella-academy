import { Target, Zap, Users, Award, TrendingUp, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Structured Learning Paths",
    description: "Follow carefully designed curricula that build skills progressively and systematically.",
  },
  {
    icon: Zap,
    title: "Real-World Skill Development",
    description: "Gain practical, industry-relevant skills that translate directly to career success.",
  },
  {
    icon: Users,
    title: "Mentor Supervision",
    description: "Receive personalized guidance and oversight from experienced industry mentors.",
  },
  {
    icon: Award,
    title: "Professional Trainers",
    description: "Learn from certified experts with years of real-world experience in their fields.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics and milestone achievements.",
  },
  {
    icon: CheckCircle2,
    title: "Industry Recognition",
    description: "Earn certificates and credentials valued by employers worldwide.",
  },
];

export function Benefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ca8a04]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fbbf24]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcwMzI4NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Team collaboration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#ca8a04]/30 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border-2 border-gray-200 animate-slide-up animation-delay-500">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#ca8a04] rounded-xl flex items-center justify-center">
                  <span className="text-3xl text-white">🎓</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-2xl p-6 border-2 border-gray-200 animate-slide-up animation-delay-700">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#fbbf24] rounded-xl flex items-center justify-center text-white">
                  <span className="text-3xl">⭐</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Benefits */}
          <div className="animate-fade-in animation-delay-300">
            <span className="inline-block px-4 py-2 bg-[#ca8a04]/10 text-[#ca8a04] rounded-full text-sm font-medium mb-4 border border-[#ca8a04]/20">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Transform Your <span className="text-[#ca8a04]">Future</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students who have accelerated their careers with our comprehensive learning platform.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const colors = ["#ca8a04", "#fbbf24", "#000000", "#ca8a04", "#fbbf24", "#000000"];
                const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500", "animation-delay-600"];
                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-200 animate-fade-in ${delays[index]}`}
                  >
                    <div
                      className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors[index] }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
