'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { AnimatedCounter } from './animated-counter';

export function PathwayCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Safely check desktop width to disable heavy pinning animations on mobile devices
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track the scroll of the artificial tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms based on the 'pinned' sticky scroll progress
  // Slides in up to 50% scroll distance, then rests securely at 0%
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], ["-120%", "0%", "0%"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 1]);

  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], ["120%", "0%", "0%"]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 1]);

  const leftStyle = isDesktop ? { x: leftX, opacity: leftOpacity } : { opacity: 1, x: "0%" };
  const rightStyle = isDesktop ? { x: rightX, opacity: rightOpacity } : { opacity: 1, x: "0%" };

  return (
    <section ref={sectionRef} style={{ position: 'relative' }} className="relative w-full bg-slate-50/50">

      {/* Tall artificial wrapper for scroll-jacking (desktop only) */}
      <div className="lg:h-[250vh]">

        {/* Sticky viewport frame that locks on screen */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-x-clip py-[80px] lg:py-0 px-6">
          <div className="max-w-7xl mx-auto w-full">

            {/* Top Section Header */}
            <div className="text-center mb-[50px] px-4">

              {/* Specialized Highlight Badge */}
              <div className="relative inline-flex items-center justify-center mb-7">
                {/* Decorative CSS sparks */}
                <div className="absolute -top-[14px] -left-[14px] w-9 h-9 pointer-events-none text-primary">
                  <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                    <line x1="8" y1="8" x2="14" y2="14" />
                    <line x1="2" y1="20" x2="10" y2="20" />
                    <line x1="20" y1="2" x2="20" y2="10" />
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-[0.5px] text-primary bg-primary/20 px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow border border-primary/10">
                  Learning Pathways
                </span>
              </div>

              {/* Tagline showing lighter font and underlines */}
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-playfair font-normal text-foreground max-w-[800px] mx-auto leading-[1.3]">
                A continuous journey from{' '}
                <span className="relative inline-block z-10 font-medium">
                  imagination
                  <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[10px] bg-primary/30 -z-10 rounded-sm -rotate-1"></span>
                </span>{' '}
                to{' '}
                <span className="relative inline-block z-10 font-medium">
                  funded leadership
                  <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[10px] bg-primary/30 -z-10 rounded-sm rotate-1"></span>
                </span>
              </p>
            </div>

            {/* 3-Column Animated Layout */}
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-[30px] w-full max-w-[1200px] mx-auto">

              {/* Left Panel */}
              <motion.div
                style={leftStyle}
                className="w-full lg:w-[320px] flex-shrink-0 bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-8 transition-transform duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_45px_rgba(0,0,0,0.1)] flex flex-col justify-between order-2 lg:order-1"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Dreamer Stage (10+)</span>
                  </div>
                  <h3 className="text-[22px] font-playfair font-bold text-foreground leading-tight mb-3">
                    Start with Imagination
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-muted-foreground mb-6 font-medium">
                    Idea-first activities where children see tech as something they shape, not just consume.
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Idea-First', 'Storytelling', 'Tinkering', 'Observation', 'Agency'].map(feat => (
                      <span key={feat} className="text-[11px] font-bold text-foreground bg-slate-100 hover:bg-slate-200 transition-colors px-2.5 py-1.5 rounded-full border border-slate-200/50">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/programs/dreamer" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-auto group">
                  Begin Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Middle Panel (Anchor) */}
              <div className="w-full lg:w-[460px] flex-shrink-0 bg-gradient-to-br from-[#1F2B4C] to-[#2A3A60] rounded-[32px] p-10 md:p-12 shadow-[0_30px_50px_rgba(0,0,0,0.15)] flex flex-col justify-center text-white z-10 order-1 lg:order-2">

                {/* Badge Sparks */}
                <div className="relative inline-flex items-center mb-7 self-start">
                  <div className="absolute -top-[12px] -left-[12px] w-8 h-8 pointer-events-none text-primary">
                    <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                      <line x1="8" y1="8" x2="14" y2="14" />
                      <line x1="2" y1="20" x2="10" y2="20" />
                      <line x1="20" y1="2" x2="20" y2="10" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-sans font-semibold uppercase tracking-[2px] text-primary bg-primary/15 border border-primary/30 px-4 py-1.5 rounded-full">
                    A Journey, Not a Course
                  </span>
                </div>

                <h3 className="text-[26px] md:text-[28px] font-playfair font-light leading-[1.35] text-white mb-6">
                  Dreamer → Builder → <br />
                  <span className="font-semibold">Problem Solver → Founder</span> → <br />
                  Funded CEO.
                </h3>

                <p className="text-white/60 text-[14px] leading-relaxed mb-6 font-light">
                  A multi-year progression building habits, skills, and mindsets so technology becomes a tool for meaningful change.
                </p>

                <div className="w-10 h-[2px] bg-primary rounded-full shadow-lg shadow-primary/20" />
              </div>

              {/* Right Panel */}
              <motion.div
                style={rightStyle}
                className="w-full lg:w-[320px] flex-shrink-0 bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-8 transition-transform duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_30px_50px_rgba(0,0,0,0.1)] flex flex-col justify-between order-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Rocket className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Builder Stage</span>
                  </div>
                  <h3 className="text-[22px] font-playfair font-bold text-foreground leading-tight mb-3">
                    Turn Curiosity into Habits
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-muted-foreground mb-6 font-medium">
                    Move from "Can I build this?" to "Is this worth building?" while delivering real things to real people.
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Product Design', 'Iteration', 'Field Observation', 'Ventures', 'Funding Ready'].map(feat => (
                      <span key={feat} className="text-[11px] font-bold text-foreground bg-slate-100 hover:bg-slate-200 transition-colors px-2.5 py-1.5 rounded-full border border-slate-200/50">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/programs/builder" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-auto group">
                  Advance Pathway <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* Stats Row appearing gracefully below the unpinned block */}
      <div className="relative z-10 bg-background pb-[80px] lg:pb-[140px] px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-stretch divide-y md:divide-y-0 md:divide-x divide-border border-t border-border py-10 w-full mt-10">
          {[
            { label: 'Students Enrolled', value: 500, suffix: '+' },
            { label: 'Partner Schools', value: 50, suffix: '+' },
            { label: 'Programs Available', value: 15, suffix: '+' },
            { label: 'Success Rate', value: 95, suffix: '%' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 w-full md:w-auto py-6 md:py-0 px-6 text-center group">
              <div className="text-[32px] lg:text-[40px] font-bold tracking-tight text-foreground transition-colors leading-none font-sans group-hover:text-primary">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[13px] lg:text-[14px] font-medium text-muted-foreground mt-3 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
