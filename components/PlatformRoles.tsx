"use client";

import { Shield, UserCheck, Presentation, User } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";

const roles = [
  {
    icon: Shield,
    title: "Admin",
    subtitle: "Platform Guardian",
    description: "Global platform management, field oversight, and system administration.",
    features: ["Global Management", "System Control", "Analytics Overview", "User Management"],
    color: "bg-amber-600",
  },
  {
    icon: UserCheck,
    title: "Mentor",
    subtitle: "Program Supervisor",
    description: "Oversee learning programs, guide students, and coordinate with trainers.",
    features: ["Program Oversight", "Student Guidance", "Quality Assurance", "Performance Review"],
    color: "bg-[#525252]",
  },
  {
    icon: Presentation,
    title: "Trainer",
    subtitle: "Knowledge Expert",
    description: "Deliver engaging lessons, conduct live sessions, and provide hands-on training.",
    features: ["Lesson Delivery", "Live Sessions", "Content Creation", "Student Assessment"],
    color: "bg-amber-600",
  },
  {
    icon: User,
    title: "Student",
    subtitle: "Aspiring Professional",
    description: "Access structured learning paths, engage with trainers, and track progress.",
    features: ["Course Access", "Progress Tracking", "Certification", "Community Support"],
    color: "bg-[#525252]",
  },
];

export function PlatformRoles() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div ref={ref} className="max-w-full mx-auto">
        <div className={`mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <h3 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-amber-900 leading-none ">
            BUILT FOR <br /> <span className="text-[#525252]">EVERYONE</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400"];
            return (
              <div
                key={index}
                className={`group relative bg-white p-10 flex flex-col justify-between min-h-[450px] transition-all duration-500 hover:bg-gray-50 ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
              >
                <div className="space-y-8">
                  <div className={`w-12 h-12 ${role.color} flex items-center justify-center text-white shadow-xl`}>
                    <Icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black  tracking-tighter text-amber-900">{role.title}</h4>
                    <p className="text-[10px] font-black text-[#525252] tracking-[0.3em] ">{role.subtitle}</p>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <ul className="space-y-3 mt-8">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-[10px] font-bold text-gray-500  tracking-widest">
                      <div className="w-1 h-1 bg-[#525252] rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
