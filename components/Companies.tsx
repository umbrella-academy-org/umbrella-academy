import { Code, Film, Briefcase, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";

const companies = [
  {
    name: "Dreamize Africa",
    field: "Technology",
    icon: Code,
    description: "Leading tech education hub offering cutting-edge programs in software development, AI, and digital innovation.",
    programs: ["Web Development", "Mobile Apps", "AI & ML", "Cloud Computing"],
    students: "15,000+",
    color: "#525252",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    name: "Byose Tech",
    field: "Technology",
    icon: Code,
    description: "Premier technology institute specializing in practical, industry-ready skills for modern tech professionals.",
    programs: ["Data Science", "Cybersecurity", "DevOps", "Blockchain"],
    students: "12,000+",
    color: "#737373",
    bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  },
  {
    name: "Green Land Film & Television School",
    field: "Visual & Audio",
    icon: Film,
    description: "Award-winning creative academy for aspiring filmmakers, producers, and multimedia artists.",
    programs: ["Film Production", "Video Editing", "Sound Design", "Animation"],
    students: "8,000+",
    color: "#1a1a1a",
    bgImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800",
  },
];

const additionalFields = [
  { icon: Briefcase, name: "Business & Management", companies: 45 },
  { icon: Code, name: "Technology & IT", companies: 78 },
  { icon: Film, name: "Creative Arts", companies: 32 },
];

export function Companies() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-white">
      <div ref={ref} className="max-w-full mx-auto">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <span className="inline-block px-4 py-2 bg-white text-[#525252] rounded-full text-sm font-medium mb-4 shadow-sm border border-gray-200">
              Learning Companies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Top <span className="text-[#525252]">Programs</span>
            </h2>
            <p className="text-xl text-gray-600">
              Learn from industry-leading companies offering world-class structured programs
            </p>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {companies.map((company, index) => {
            const Icon = company.icon;
            const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300"];
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#525252]/30 ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={company.bgImage}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{ backgroundColor: company.color }}
                  />

                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Field Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                      {company.field}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Programs */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2">Programs Offered:</div>
                    <div className="flex flex-wrap gap-2">
                      {company.programs.map((program, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-bold text-gray-900">{company.students}</span> Students
                    </div>
                    <button
                      className="flex items-center space-x-1 text-sm font-medium group-hover:underline"
                      style={{ color: company.color }}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fields Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 animate-fade-in animation-delay-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Available Learning Fields
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalFields.map((field, index) => {
              const Icon = field.icon;
              const colors = ["#525252", "#737373", "#000000"];
              return (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-[#525252]/5 transition-colors duration-300 border border-gray-200">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors[index] }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{field.name}</div>
                    <div className="text-sm text-gray-600">{field.companies} Companies</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-700">
          <button className="px-8 py-4 bg-[#525252] text-white rounded-xl hover:bg-[#a16207] hover:shadow-xl transition-all duration-300 font-medium active:scale-95 hover:scale-105">
            Browse All Programs
          </button>
        </div>
      </div>
    </section>
  );
}
