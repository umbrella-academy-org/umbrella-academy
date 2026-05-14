'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCounter } from './animated-counter';

export function JoyfulEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax subtle effect for overlapping image
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative bg-background px-6 w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-[60px] lg:gap-[80px] items-center">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col items-start text-left w-full max-w-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge Sparks Highlight */}
            <div className="relative inline-flex items-center justify-center mb-7">
              <div className="absolute -top-3 -left-4 w-9 h-9 pointer-events-none text-primary">
                <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                  <line x1="8" y1="8" x2="14" y2="14" />
                  <line x1="2" y1="20" x2="10" y2="20" />
                  <line x1="20" y1="2" x2="20" y2="10" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-[1px] uppercase text-primary bg-primary/20 px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow border border-primary/10">
                Joyful Environment
              </span>
            </div>

            <h2 className="text-[36px] lg:text-[46px] font-playfair font-light text-foreground leading-[1.2] mb-6">
              where{' '}
              <span className="relative inline-block z-10 font-normal">
                students
                <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[12px] bg-primary/20 -z-10 rounded-sm rotate-1" />
              </span>{' '}
              <span className="relative inline-block z-10 font-semibold">
                learn confidently
                <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[12px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
              </span>
            </h2>
            <p className="text-[16px] lg:text-[18px] text-muted-foreground leading-[1.6] mb-8 lg:mb-10 lg:max-w-[95%] font-medium">
              A welcoming space nurtures technical confidence, curiosity, and creativity as children collaborate, explore real-world challenges, and grow.
            </p>
            <button className="px-8 py-3.5 rounded-full text-[15px] font-semibold text-foreground bg-transparent border-[1.5px] border-border hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 ease-in-out group flex items-center gap-3">
              Discover more
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">&rarr;</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column (Visual Collage + Stat) */}
        <motion.div 
          className="relative w-full mt-2 lg:mt-0 flex flex-col lg:block h-[450px] lg:h-[550px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {/* Base Image */}
          <div className="absolute top-0 right-0 w-[85%] h-[380px] lg:h-[450px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-0 group">
            <Image 
              src="/images/image1.jpg" 
              alt="Happy children learning tech" 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-[1.03]" 
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Overlapping Parallax Secondary Image */}
          <motion.div style={{ y: parallaxY }} className="absolute bottom-24 lg:bottom-32 left-0 w-[50%] h-[200px] lg:h-[240px] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-[6px] border-background z-10 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 group">
            <Image 
              src="/images/children-learning.png" 
              alt="Hands working on tech project" 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-[1.05]" 
              sizes="(max-width: 1024px) 40vw, 20vw"
            />
          </motion.div>

          {/* Floating Stat Card */}
          <motion.div
            className="absolute -bottom-6 lg:bottom-4 right-4 lg:right-10 bg-background/95 backdrop-blur-md rounded-[20px] p-[20px_32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border min-w-[200px] text-center lg:text-left z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-[48px] font-playfair font-bold text-primary leading-none mb-2 drop-shadow-sm">
              <AnimatedCounter value={15} suffix="+" />
            </div>
            <div className="text-[15px] font-semibold text-foreground/80 leading-snug">
              Years of<br />trusted learning
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
