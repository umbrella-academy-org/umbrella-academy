'use client';

import { motion } from 'framer-motion';
import { School, GraduationCap, FastForward, Lightbulb, Rocket, FlaskConical } from 'lucide-react';

export function UniversityAcceleration() {
  return (
    <section className="py-24 px-6 bg-[#FDFCF4]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute -top-[14px] -left-[14px] w-9 h-9 pointer-events-none text-primary">
                <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                  <line x1="8" y1="8" x2="14" y2="14" />
                  <line x1="2" y1="20" x2="10" y2="20" />
                  <line x1="20" y1="2" x2="20" y2="10" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-[0.5px] text-primary bg-primary/20 px-5 py-2 rounded-full shadow-sm border border-primary/10">
                Future-Proof Education
              </span>
            </div>
            
            <h2 className="text-[36px] md:text-[48px] font-playfair font-semibold text-foreground leading-tight mb-6">
              University <br />
              <span className="relative inline-block z-10 font-light italic">
                Acceleration
                <span className="absolute bottom-2 left-0 w-full h-[10px] bg-primary/30 -z-10 rounded-sm" />
              </span> Model
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed max-w-xl">
              Partnering with universities lets us recognize advanced students’ prior learning. 
              Instead of repeating introductory coursework, universities can accelerate learners 
              into advanced study, research, and innovation.
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md border border-black/5 p-8 rounded-[32px] shadow-sm">
            <h3 className="text-xl font-playfair font-bold mb-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-primary" />
              Program Goal
            </h3>
            <p className="text-slate-600 leading-relaxed font-sans">
              Co-create assessment pathways so partner universities can evaluate and credit 
              students for demonstrated competencies.
            </p>
          </div>
        </div>

        {/* Comparison Diagram */}
        <div className="relative bg-white border border-black/5 rounded-[40px] p-8 md:p-16 shadow-xl mb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative z-10">
            
            {/* Traditional Route */}
            <div className="space-y-12">
              <div className="text-center">
                <h4 className="text-2xl font-playfair font-semibold text-slate-400 mb-2">Traditional</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">University Route</p>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-lg font-bold text-slate-800">Year 1-2</p>
                  <p className="text-xs text-slate-500 font-medium">Gen. Ed.</p>
                </div>
                
                <div className="w-1 h-8 bg-slate-100" />
                
                <div className="w-full max-w-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-lg font-bold text-slate-800">Year 3-4</p>
                  <p className="text-xs text-slate-500 font-medium">Major Studies</p>
                </div>
                
                <div className="pt-8 flex flex-col items-center">
                  <GraduationCap className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-sm font-bold text-slate-500 text-center uppercase tracking-wider">Standard Degree<br/>Entry Jobs</p>
                </div>
              </div>
            </div>

            {/* DreamizeAfrica Route */}
            <div className="space-y-12">
              <div className="text-center">
                <h4 className="text-2xl font-playfair font-bold text-foreground mb-2">DreamizeAfrica</h4>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Accelerated Route</p>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-[200px] bg-primary/10 border border-primary/30 rounded-2xl p-6 text-center shadow-lg shadow-primary/5">
                  <p className="text-lg font-bold text-foreground">Year 1</p>
                  <p className="text-xs text-primary font-bold">Core Skills</p>
                </div>
                
                {/* Visual Connector to year 3-4 */}
                <div className="relative w-full flex justify-center">
                   <div className="absolute left-[-50%] top-[-20px] w-full h-[1px] border-t-2 border-dashed border-primary/30 hidden md:block" />
                   <div className="w-1 h-8 bg-primary/20 dashed" />
                </div>
                
                <div className="w-full max-w-[280px] bg-foreground text-background rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <School className="w-8 h-8 text-primary" />
                    <div className="text-center">
                      <p className="text-lg font-bold leading-tight">Advanced Study Focus</p>
                      <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">AI & Technology Deep-Dive</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 grid grid-cols-2 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <FlaskConical className="w-10 h-10 text-primary mb-3" />
                    <p className="text-sm font-bold text-foreground">Research</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Rocket className="w-10 h-10 text-primary mb-3" />
                    <p className="text-sm font-bold text-foreground">Startups</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: GraduationCap,
              title: "Academic Recognition",
              desc: "Credit for prior project-based learning, reducing redundancy."
            },
            {
              icon: FastForward,
              title: "Accelerated Entry",
              desc: "Possible admission into pre-final or final degree years."
            },
            {
              icon: Rocket,
              title: "Advanced Focus",
              desc: "University time freed for research, innovation, and impact."
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h4 className="text-[20px] font-playfair font-bold text-foreground mb-3">{benefit.title}</h4>
              <p className="text-[15px] text-slate-600 leading-relaxed font-sans">{benefit.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
