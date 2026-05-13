export function AgePathways() {
  const pathways = [
    {
      age: '10+',
      title: 'The Dreamer',
      subtitle: 'Imagination & Observation',
      description: 'Children see technology as something they shape through playful exploration and noticing local problems.',
      features: ['Ideas before tools', 'Playful Exploration', 'Storytelling', 'Hands-on Tinkering'],
      icon: '🎨',
      color: 'from-amber-100 to-amber-50',
    },
    {
      age: 'Teen+',
      title: 'The Builder',
      subtitle: 'Habits & Solutions',
      description: 'Turn curiosity into building habits while learning to research and test assumptions with real users.',
      features: ['Consistent Building', 'Field Observation', 'Iterative Improvement', 'User Feedback'],
      icon: '🛠️',
      color: 'from-[#ffb400]/20 to-amber-100/30',
    },
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Development Pathway
          </h2>
          <p className="text-lg text-gray-600">
            A journey, not a course. We guide learners from imaginative play to funded leadership.
          </p>
        </div>

        {/* Pathways Grid with Journey Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-[#ffb400] to-transparent transform -translate-y-1/2 -translate-x-1/2"></div>

          {pathways.map((pathway, idx) => (
            <div key={idx} className="group">
              <div className="bg-white border-2 border-amber-100/50 rounded-3xl p-8 hover:border-[#ffb400]/50 transition-all duration-300 hover:shadow-xl">
                {/* Age Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffb400]/10 border border-[#ffb400]/30 rounded-full mb-6">
                  <span className="text-2xl font-bold text-[#ffb400]">{pathway.age}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${pathway.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {pathway.icon}
                </div>

                {/* Content */}
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">{pathway.title}</h3>
                <p className="text-sm font-semibold text-[#ffb400] mb-3 uppercase tracking-wide">{pathway.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{pathway.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  {pathway.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#ffb400] rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="mt-8 w-full py-3 bg-gradient-to-r from-[#ffb400]/10 to-amber-100/10 text-[#ffb400] font-semibold rounded-lg hover:from-[#ffb400]/20 hover:to-amber-100/20 border border-[#ffb400]/20 transition-all">
                  Explore Pathway →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className="mt-20 bg-gradient-to-r from-amber-50 to-white border border-amber-100 rounded-2xl p-8">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-8 text-center uppercase tracking-widest text-slate-400">The 5-Stage Journey</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Dreamer', 'Builder', 'Problem Solver', 'Founder', 'Funded CEO'].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#ffb400] text-white font-bold rounded-full flex items-center justify-center mb-3 text-lg shadow-lg shadow-amber-200">
                  {idx + 1}
                </div>
                <p className="font-bold text-gray-900 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
