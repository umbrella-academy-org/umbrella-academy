import { Layers, Building2, CreditCard, GraduationCap, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Layers,
    title: "Choose a Field",
    description: "Select from diverse learning domains like Technology, Business, Creative Arts, and more.",
    color: "#ca8a04",
  },
  {
    icon: Building2,
    title: "Select a Company",
    description: "Browse and choose from top learning companies offering structured programs in your field.",
    color: "#fbbf24",
  },
  {
    icon: CreditCard,
    title: "Enroll and Pay",
    description: "Complete secure enrollment with flexible payment options to start your journey.",
    color: "#1a1a1a",
  },
  {
    icon: GraduationCap,
    title: "Learn from Trainers",
    description: "Engage in interactive sessions with expert trainers and access comprehensive course materials.",
    color: "#ca8a04",
  },
  {
    icon: BarChart3,
    title: "Get Mentored & Track Progress",
    description: "Receive guidance from mentors while monitoring your achievements through our analytics dashboard.",
    color: "#fbbf24",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-full mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div>
            <span className="inline-block px-4 py-2 bg-white text-[#ca8a04] rounded-full text-sm font-medium mb-4 shadow-sm border border-gray-200">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Your Path to <span className="text-[#ca8a04]">Success</span>
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to start your transformative learning journey
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-[#ca8a04]/20 via-[#fbbf24]/20 to-[#ca8a04]/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500"];
              return (
                <div
                  key={index}
                  className={`relative animate-fade-in ${delays[index]}`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#ca8a04]/30 h-full">
                    {/* Step Number */}
                    <div
                      className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in animation-delay-700">
          <button className="px-8 py-4 bg-[#ca8a04] text-white rounded-xl hover:bg-[#a16207] hover:shadow-xl transition-all duration-300 font-medium active:scale-95 hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
