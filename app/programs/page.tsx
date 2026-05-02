import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProgramsNav } from '@/components/programs-nav';
import { PlayfulHero } from '@/components/playful-hero';
import { UniversityAcceleration } from '@/components/university-acceleration';
import Link from 'next/link';
import { ArrowRight, Sparkles, Binary, Puzzle, Lightbulb, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Programs Overview | Dreamize Africa',
  description: 'Explore our five-stage learning pathway from Dreamer to Funded CEO.',
};

export default function ProgramsPage() {
  const programs = [
    {
      title: 'Dreamer Stage (10+)',
      description: 'Capturing curiosity at its peak. We invite children to see technology as something they shape through playful exploration and idea-first activities.',
      features: ['Ideas before tools', 'Playful Exploration', 'Storytelling', 'Tinkering'],
      href: '/programs/dreamer',
      color: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: 'Builder & Solver (Teen+)',
      description: 'Turning curiosity into consistent building habits. Students work on multi-month projects, learn iteration, and shift focus to "Is this worth building?"',
      features: ['Technical Fluency', 'Iterative Improvement', 'Field Observation', 'User Feedback'],
      href: '/programs/builder',
      color: 'bg-primary/5',
      borderColor: 'border-primary/20',
      icon: <Binary className="w-6 h-6" />,
    },
    {
      title: 'Founder to CEO',
      description: 'As projects mature, students form ventures, learn product-market fit, and prepare for seed support and community impact.',
      features: ['Team Formation', 'Early Traction', 'Pitching & Growth', 'Funded Leadership'],
      href: '/programs/builder',
      color: 'bg-slate-900',
      borderColor: 'border-slate-800',
      textColor: 'text-white',
      descColor: 'text-slate-400',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <Navbar />

      <PlayfulHero
        pillTracker="Our Pathways"
        titleLight="A journey,"
        titleBold="not a"
        titleHighlight="course"
        description="We design learning as a progression over years. Each stage builds habits, skills, and mindsets so technology becomes a tool for meaningful change."
      />

      <ProgramsNav />

      {/* ── CORE PHILOSOPHY ── */}
      <section className="pt-24 pb-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Long Arc Learning",
              desc: "Repeated practice across years—projects that grow in complexity.",
              icon: <Binary className="w-6 h-6 text-primary" />
            },
            {
              title: "Skills + Purpose",
              desc: "Technical fluency tied to real-world problems and user needs.",
              icon: <Puzzle className="w-6 h-6 text-primary" />
            },
            {
              title: "Pathway to Opportunity",
              desc: "Progression that culminates in entrepreneurship and university acceleration.",
              icon: <Lightbulb className="w-6 h-6 text-primary" />
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-border">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STAGGERED PROGRAM CARDS ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-5xl mx-auto">

          <div className="grid gap-[80px]">
            {programs.map((program, index) => (
              <Link key={program.title} href={program.href}>
                <div className={`group relative w-full lg:w-[85%] border rounded-[40px] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden ${program.color} ${program.borderColor} ${index % 2 === 1 ? 'lg:ml-auto' : ''}`}>

                  {/* Subtle Background Accent */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/40 blur-3xl rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

                  <div className="relative z-10 grid md:grid-cols-[1fr_1.5fr] gap-8 items-center">
                    <div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${program.textColor ? 'bg-white/10 text-primary' : 'bg-primary text-white'}`}>
                        {program.icon}
                      </div>
                      <h3 className={`text-[32px] md:text-[40px] font-playfair font-semibold mb-4 leading-tight group-hover:text-primary transition-colors ${program.textColor || 'text-foreground'}`}>
                        {program.title}
                      </h3>
                      <div className="inline-flex items-center gap-2 text-primary font-bold text-[15px] uppercase tracking-wider group-hover:gap-4 transition-all mt-4 md:mt-8">
                        Explore Stage <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <p className={`text-[18px] md:text-[20px] font-light leading-relaxed mb-8 ${program.descColor || 'text-slate-600'}`}>
                        {program.description}
                      </p>

                      {/* Features Matrix */}
                      <div className="flex flex-wrap gap-3">
                        {program.features.map((feature) => (
                          <div key={feature} className={`backdrop-blur-sm border rounded-full px-5 py-2 ${program.textColor ? 'bg-white/5 border-white/10' : 'bg-white/60 border-black/5'}`}>
                            <p className={`text-[14px] font-semibold ${program.textColor || 'text-foreground'}`}>{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <UniversityAcceleration />

      <Footer />
    </>
  );
}
