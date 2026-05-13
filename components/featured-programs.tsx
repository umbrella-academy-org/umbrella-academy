export function FeaturedPrograms() {
  const programs = [
    {
      title: 'Robotics & Embedded Systems',
      description: 'Learn hardware programming and automation through hands-on robotics projects',
      category: 'Early Exposure',
      students: 120,
      status: 'active',
    },
    {
      title: 'Software Development Bootcamp',
      description: 'Build real web and mobile applications solving actual user problems',
      category: 'Real-World Experience',
      students: 85,
      status: 'active',
    },
    {
      title: 'Tech Career Awareness Program',
      description: 'Explore different tech careers and connect with industry professionals',
      category: 'Early Exposure',
      students: 200,
      status: 'active',
    },
    {
      title: 'Student-Led Tech Podcast',
      description: 'Host technology discussions and interview industry experts',
      category: 'Community Engagement',
      students: 45,
      status: 'active',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#ffb400]/10 border border-[#ffb400]/30 rounded-full text-sm font-semibold text-[#ffb400] mb-4">
            FEATURED PROGRAMS
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learn Through Real Experience
          </h2>
          <p className="text-lg text-gray-600">
            Hands-on programs designed to inspire, engage, and prepare young minds for technology careers
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ffb400]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-amber-100/50 text-[#ffb400] text-xs font-semibold rounded-full mb-3">
                    {program.category}
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-[#ffb400] transition-colors">
                    {program.title}
                  </h3>
                </div>
                <div className="w-3 h-3 bg-[#ffb400] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffb400]/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#ffb400]">👥</span>
                  </div>
                  <span className="text-sm text-gray-600">{program.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-xs font-semibold capitalize">{program.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-[#ffb400] text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl">
            View All Programs
          </button>
        </div>
      </div>
    </section>
  )
}
