'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Gamepad2, Heart, Code, Zap, Tv, Users, Quote } from 'lucide-react';
import { useState } from 'react';
import { AnimatedCounter } from './animated-counter';

const programFeatures = [
  {
    id: 0,
    icon: Shield,
    title: 'Safe and nurturing environment',
    description: 'Every child thrives in a space built on trust, structure, and emotional safety — so focus stays on learning.',
    image: '/images/image3.jpg',
  },
  {
    id: 1,
    icon: Gamepad2,
    title: 'Play-based and activity-driven education',
    description: 'Hands-on projects, robotics kits and creative challenges make every session exciting and impactful.',
    image: '/images/prog-play-based.png',
  },
  {
    id: 2,
    icon: Heart,
    title: 'Caring teachers with child-focused approach',
    description: 'Dedicated mentors guide each learner individually, nurturing curiosity, confidence and real potential.',
    image: '/images/image2.jpg',
  },
];

const allPrograms = [
  { icon: Code, title: 'Software Development', students: 150 },
  { icon: Zap, title: 'Robotics & IoT', students: 120 },
  { icon: Tv, title: 'Digital Creative Arts', students: 85 },
  { icon: Users, title: 'Community Engagement', students: 200 },
];



export function ProgramsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative py-[80px] lg:py-[120px] px-6 bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* ── TOP BLOCK ── */}
        <motion.div
          className="text-center mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with sparks */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute -top-[14px] -left-[14px] w-9 h-9 pointer-events-none text-primary">
              <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                <line x1="8" y1="8" x2="14" y2="14" />
                <line x1="2" y1="20" x2="10" y2="20" />
                <line x1="20" y1="2" x2="20" y2="10" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-[0.5px] text-foreground bg-primary/20 px-5 py-2 rounded-full shadow-sm border border-primary/10">
              Our Approach
            </span>
          </div>

          <h2 className="text-[36px] md:text-[46px] lg:text-[56px] font-playfair font-light text-foreground leading-[1.2] max-w-[840px] mx-auto mb-5">
            Little learners grow{' '}
            <span className="relative inline-block z-10 font-semibold">
              stronger
              <span className="absolute bottom-1.5 left-0 w-full h-[10px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
            </span>
            , discover more,{' '}
            <span className="relative inline-block z-10 font-semibold">
              shine brighter
              <span className="absolute bottom-1.5 left-0 w-full h-[10px] bg-primary/20 -z-10 rounded-sm rotate-1" />
            </span>
          </h2>

          <p className="text-[18px] lg:text-[20px] text-muted-foreground max-w-[640px] mx-auto mb-8 leading-[1.7]">
            Our approach ensures children feel supported, motivated, and excited about learning each day.
          </p>

          <button className="px-8 py-3.5 rounded-full bg-foreground text-background text-[15px] font-semibold hover:bg-primary hover:text-background transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Explore programs
          </button>
        </motion.div>

        {/* ── TWO-COLUMN BLOCK ── */}
        <div className="grid lg:grid-cols-[45%_1fr] gap-[50px] lg:gap-[70px] items-start mb-[60px]">

          {/* Left — Program Feature Items */}
          <div className="flex flex-col gap-0">
            {programFeatures.map((feat, i) => {
              const Icon = feat.icon;
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={feat.id}
                  onMouseEnter={() => setActiveIdx(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={`flex gap-5 py-7 px-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-primary/5 border-primary/20 shadow-sm'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-primary text-background' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-[19px] font-playfair font-semibold leading-snug mb-2 transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}>
                      {feat.title}
                    </h3>
                    <p className="text-[15px] font-sans text-muted-foreground leading-[1.65]">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* All Programs mini list */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-[12px] font-sans font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-4">All Programs</p>
              <div className="grid grid-cols-2 gap-3">
                {allPrograms.map((prog) => {
                  const Icon = prog.icon;
                  return (
                    <div key={prog.title} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-border hover:border-primary/30 hover:shadow-sm transition-all group">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-playfair font-semibold text-foreground leading-tight">{prog.title}</p>
                        <p className="text-[12px] font-sans text-muted-foreground">
                          <AnimatedCounter value={prog.students} suffix="+ students" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — Dynamic Image + Quote Card */}
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Dynamic Image */}
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.1)] bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <Image
                    src={programFeatures[activeIdx].image}
                    alt={programFeatures[activeIdx].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Active program label on image */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[12px] font-bold bg-background/90 backdrop-blur-sm text-foreground px-3.5 py-1.5 rounded-full shadow border border-border">
                  {programFeatures[activeIdx].title}
                </span>
              </div>
            </div>

            {/* Quote Card overlapping bottom of image */}
            <div className="-mt-6 mx-6 relative z-10 bg-background rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-border p-6">
              <Quote className="w-6 h-6 text-primary mb-3 opacity-60" />
              <p className="text-[16px] font-sans text-muted-foreground leading-[1.75] italic mb-4">
                "Dedicated teachers create joyful learning experiences that inspire curiosity, creativity, and independence — helping children develop strong values and a genuine love for learning in a supportive setting."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[13px]">
                  E
                </div>
                <p className="text-[15px] font-playfair font-semibold text-foreground">Emma Collins</p>
              </div>
            </div>
          </motion.div>

        </div>



      </div>
    </section>
  );
}
