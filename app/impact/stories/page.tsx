'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImpactNav } from '@/components/impact-nav';
import { PlayfulHero } from '@/components/playful-hero';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function StoriesPage() {
  const stories = [
    {
      name: 'Amara O.',
      role: 'Alumni Student',
      story: 'I came into Dreamize Africa curious but unsure about tech. Now I have built three real projects and I am completely confident I want to study software engineering. The mentorship simply changed entirely how I view my own potential.',
      achievement: 'Accepted to major tech program',
      color: 'bg-amber-50',
    },
    {
      name: 'Kojo M.',
      role: 'High School Junior',
      story: 'Real-world projects taught me more than any textbook ever could. I went from never coding in my life to deploying an application used by 500 people in my town. That is the exact confidence I needed.',
      achievement: 'Interned at major tech company',
      color: 'bg-slate-50',
    },
    {
      name: 'Zainab H.',
      role: 'Alumni Student',
      story: 'Dreamize showed me that I could build solutions for the deep problems I see in my own community. Technology is not just about writing code on computers—it is about solving real, systemic problems.',
      achievement: 'Started own tech initiative',
      color: 'bg-blue-50',
    },
    {
      name: 'Dr. Ada K.',
      role: 'Partner Educator',
      story: 'Bringing Dreamize to our school transformed how the students see technology. They are not just learning passively—they are vigorously building and creating. The sheer engagement is remarkable.',
      achievement: 'Partnership expanded to network',
      color: 'bg-green-50',
    },
  ];

  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="Student Narrative"
        titleLight="Success"
        titleBold=""
        titleHighlight="Stories"
        description="First-hand accounts from students who discovered their tech potential and scaled their ambitions through our mentorship."
      />

      <ImpactNav />

      {/* ── EDITORIAL QUOTES ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="space-y-[60px] md:space-y-[100px]">
            {stories.map((story) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                key={story.name} 
                className={`relative rounded-[40px] p-10 md:p-16 border border-border overflow-hidden ${story.color}`}
              >
                <div className="absolute top-10 left-10 opacity-[0.03]">
                  <Quote className="w-48 h-48" />
                </div>

                <div className="relative z-10">
                  <div className="flex gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-[22px] md:text-[32px] font-playfair font-light text-foreground leading-[1.4] mb-12">
                    "{story.story}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-black/10 pt-8 gap-6">
                    <div className="flex items-center gap-4">
                      {/* Placeholder Avatar */}
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30 shadow-sm">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-sans font-bold text-[18px] text-foreground">{story.name}</div>
                        <div className="text-[15px] font-medium text-slate-500 uppercase tracking-widest">{story.role}</div>
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-black/5">
                      <span className="text-[14px] font-bold text-primary">{story.achievement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 bg-slate-900 rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/30 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-[36px] md:text-[48px] font-playfair font-light text-white mb-6 relative z-10">
              Your story could be <span className="font-semibold">next</span>.
            </h2>
            <p className="text-[18px] text-slate-300 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed font-light">
              Join hundreds of students currently transforming their futures through early tech exposure and heavy real-project experience.
            </p>
            <button className="relative z-10 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,165,0,0.3)] transition-all">
              Start Your Journey
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
