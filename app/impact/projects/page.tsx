'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImpactNav } from '@/components/impact-nav';
import { PlayfulHero } from '@/components/playful-hero';
import { motion } from 'framer-motion';
import { Layers, MapPin, Activity } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Farm Yield Optimization App',
      team: 'Nairobi Team',
      description: 'Mobile app helping smallholder farmers optimize crop yields using AI and weather data. Engineered entirely by the 16-25 cohort.',
      impact: '500+ farmers',
      category: 'Agriculture Tech',
      color: 'bg-[#F2FCE2]', // Soft green
    },
    {
      title: 'Healthcare Access Platform',
      team: 'Kigali Team',
      description: 'Web platform connecting rural communities with healthcare services and telemedicine. Features SMS integration for low-bandwidth areas.',
      impact: '2000+ patients',
      category: 'Health Tech',
      color: 'bg-[#E0F2FE]', // Soft blue
    },
    {
      title: 'E-Learning for Rural Schools',
      team: 'Lagos Team',
      description: 'Offline-first educational platform bringing quality content to schools with limited internet connectivity.',
      impact: '50+ schools',
      category: 'EdTech',
      color: 'bg-[#FEF08A]', // Soft yellow
    },
    {
      title: 'Water Quality Monitoring',
      team: 'Accra Team',
      description: 'IoT hardware system tracking water quality metrics in local communities and alerting authorities to sudden contamination drops.',
      impact: '20+ communities',
      category: 'Hardware IoT',
      color: 'bg-[#FFEDD5]', // Soft orange
    },
  ];

  return (
    <>
      <Navbar />

      <PlayfulHero
        pillTracker="Project Gallery"
        titleLight="Student"
        titleBold=""
        titleHighlight="Projects"
        description="Discover the real-world solutions built by our 16-25 cohort to address systemic challenges in their communities."
      />

      <ImpactNav />

      {/* ── PROJECT GRID ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-6xl mx-auto space-y-[80px]">

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project.title}
                className="group relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] overflow-hidden border border-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Abstract Color Background */}
                <div className={`absolute inset-0 ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/60 blur-3xl rounded-full" />

                <div className="relative z-10 block">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-[13px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2 text-slate-600 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[14px] font-semibold">{project.team}</span>
                    </div>
                  </div>

                  <h3 className="text-[28px] md:text-[34px] font-playfair font-bold text-slate-800 mb-4 leading-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[16px] md:text-[18px] text-slate-700 font-light leading-relaxed mb-12">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-black/10 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Measured Impact</p>
                      <p className="font-bold text-slate-800 text-[18px]">{project.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[32px] p-12 md:p-16 text-center overflow-hidden relative">
            <Layers className="absolute -left-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none" />
            <h2 className="text-[32px] md:text-[40px] font-playfair font-semibold text-white mb-4 relative z-10">See Our Full Portfolio</h2>
            <p className="text-[18px] text-slate-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
              Browse our complete library of student-built software, hardware tools, and community applications actively making an impact right now.
            </p>
            <button className="relative z-10 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
              View All Projects
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
