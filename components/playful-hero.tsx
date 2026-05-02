'use client';

import { Star, Compass, Book, Clock, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayfulHeroProps {
  pillTracker: string;
  titleLight: string;
  titleBold: string;
  titleHighlight: string;
  description: string;
}

export function PlayfulHero({ pillTracker, titleLight, titleBold, titleHighlight, description }: PlayfulHeroProps) {
  return (
    <section className="relative pt-[180px] pb-[160px] px-6 bg-[#FDF9F2] overflow-hidden border-b-0">
      
      {/* Floating Decorative Outline Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]">
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 text-slate-800">
          <Star className="w-12 h-12" strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-20 text-slate-800">
          <Compass className="w-16 h-16" strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-40 left-32 text-slate-800">
          <Book className="w-14 h-14" strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-40 text-slate-800">
          <Clock className="w-20 h-20" strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ rotate: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-32 lg:left-1/3 text-slate-800 opacity-50">
          <Sun className="w-10 h-10" strokeWidth={1} />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Spark SVG */}
        <div className="relative mb-2 flex justify-center">
           <div className="absolute -top-6 -left-4 md:left-[10%] lg:left-[15%] text-[#FF5A5F] w-8 h-8 rotate-12">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <line x1="12" y1="2" x2="12" y2="8"></line>
               <line x1="5.5" y1="5.5" x2="9" y2="9"></line>
               <line x1="18.5" y1="5.5" x2="15" y2="9"></line>
             </svg>
           </div>
        </div>

        <div className="relative inline-flex items-center justify-center mb-6">
          <span className="text-sm font-semibold tracking-[0.5px] text-primary bg-primary/20 px-5 py-2 rounded-full border border-primary/10 shadow-sm backdrop-blur-sm">
            {pillTracker}
          </span>
        </div>

        <h1 className="text-[44px] md:text-[56px] lg:text-[72px] font-playfair font-semibold text-[#1A2A42] leading-[1.1] mb-8 tracking-tight">
          {titleLight} <span className="font-light">{titleBold}</span> <br className="hidden md:block"/>
          <span className="relative inline-block px-1">
            <span className="relative z-20 mt-2 md:mt-0 block md:inline">{titleHighlight}</span>
            <span className="absolute z-10 inset-0 -top-1 -bottom-1 -left-1 -right-1 bg-primary/30 rounded-[60px] transform -rotate-1 md:-rotate-2"></span>
          </span>
        </h1>
        
        <p className="text-[18px] lg:text-[22px] text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Dense SVG Clouds at the bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
        <svg className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px] lg:h-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C50,30 150,-10 250,40 C350,90 400,20 500,50 C600,80 650,10 750,40 C850,70 900,100 1000,50 C1100,0 1150,50 1200,80 L1200,120 L0,120 Z" fill="#ffffff" />
          <path d="M0,90 C100,50 200,20 300,60 C400,100 450,40 550,70 C650,100 700,50 800,80 C900,110 950,120 1050,70 C1150,20 1200,70 1200,100 L1200,120 L0,120 Z" fill="#ffffff" opacity="0.7"/>
        </svg>
      </div>
    </section>
  );
}
