"use client";

import { Layers, Building2, CreditCard, GraduationCap, BarChart3, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";

const steps = [
  {
    icon: Layers,
    title: "Choose a Field",
    description: "Select from diverse learning domains like Technology, Business, and Creative Arts.",
    color: "bg-[#525252]"
  },
  {
    icon: Building2,
    title: "Select a Company",
    description: "Browse top learning companies offering structured programs in your field.",
    color: "bg-yellow-600"
  },
  {
    icon: CreditCard,
    title: "Enroll and Pay",
    description: "Complete secure enrollment with flexible payment options to start.",
    color: "bg-[#525252]"
  },
  {
    icon: GraduationCap,
    title: "Learn with Experts",
    description: "Engage in interactive sessions with world-class trainers.",
    color: "bg-yellow-600"
  },
  {
    icon: BarChart3,
    title: "Get Mentored",
    description: "Receive high-level guidance while monitoring your achievements.",
    color: "bg-[#525252]"
  },
];

export function HowItWorks() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="how-it-works" className="pt-24 pb-4 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div ref={ref} className="max-w-full mx-auto">
        <div className={`mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <h3 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-none ">
            YOUR PATH TO <br /> <span className="text-[#525252]">SUCCESS</span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500"];
            return (
              <div
                key={index}
                className={`flex-1 group relative p-8 md:p-12 border border-gray-100 hover:border-[#525252] transition-all duration-500 min-h-[350px] flex flex-col justify-between ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
              >
                <div className="space-y-6">
                  <div className={`w-12 h-12 ${step.color} flex items-center justify-center text-white`}>
                    <Icon size={24} />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-gray-300 tracking-[0.4em] ">0{index + 1}</span>
                    <h4 className="text-xl md:text-2xl font-black  tracking-tight text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="text-[#525252] w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
