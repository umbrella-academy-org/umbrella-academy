import { Shield, UserCheck, Presentation, User } from "lucide-react";

const roles = [
  {
    icon: Shield,
    title: "Admin",
    subtitle: "Platform Guardian",
    description: "Global platform management, field oversight, and system administration to ensure smooth operations.",
    features: ["Global Management", "System Control", "Analytics Overview", "User Management"],
    color: "#000000",
    bgColor: "#f9f9f9",
  },
  {
    icon: UserCheck,
    title: "Mentor",
    subtitle: "Program Supervisor",
    description: "Oversee learning programs, guide students, and coordinate with trainers for optimal learning outcomes.",
    features: ["Program Oversight", "Student Guidance", "Quality Assurance", "Performance Review"],
    color: "#ca8a04",
    bgColor: "#fefce8",
  },
  {
    icon: Presentation,
    title: "Trainer",
    subtitle: "Knowledge Expert",
    description: "Deliver engaging lessons, conduct live sessions, and provide hands-on training in specialized subjects.",
    features: ["Lesson Delivery", "Live Sessions", "Content Creation", "Student Assessment"],
    color: "#fbbf24",
    bgColor: "#fffbeb",
  },
  {
    icon: User,
    title: "Student",
    subtitle: "Aspiring Professional",
    description: "Access structured learning paths, engage with trainers, track progress, and achieve professional goals.",
    features: ["Course Access", "Progress Tracking", "Certification", "Community Support"],
    color: "#ca8a04",
    bgColor: "#fefce8",
  },
];

export function PlatformRoles() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div>
            <span className="inline-block px-4 py-2 bg-[#ca8a04]/10 text-[#ca8a04] rounded-full text-sm font-medium mb-4 border border-[#ca8a04]/20">
              Platform Roles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Built for <span className="text-[#ca8a04]">Everyone</span>
            </h2>
            <p className="text-xl text-gray-600">
              A structured ecosystem where every role contributes to learning excellence
            </p>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400"];
            return (
              <div
                key={index}
                className={`group relative animate-fade-in ${delays[index]}`}
              >
                <div
                  className="h-full rounded-2xl p-6 border-2 border-gray-200 hover:shadow-xl hover:border-[#ca8a04]/30 transition-all duration-300"
                  style={{ backgroundColor: role.bgColor }}
                >
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ backgroundColor: role.color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {role.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: role.color }}
                  >
                    {role.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: role.color }}
                        />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hierarchy Visualization */}
        <div className="mt-16 p-8 bg-linear-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 animate-fade-in animation-delay-500">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Platform Hierarchy
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-black text-white rounded-lg font-medium shadow-md">
              Admin
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-[#fbbf24] text-white rounded-lg font-medium shadow-md">
              Field
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-[#ca8a04] text-white rounded-lg font-medium shadow-md">
              Company
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-[#ca8a04] text-white rounded-lg font-medium shadow-md">
              Mentor
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-[#fbbf24] text-white rounded-lg font-medium shadow-md">
              Trainer
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-black text-white rounded-lg font-medium shadow-md">
              Student
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
