'use client';

import { motion } from 'framer-motion';
import { Star, Compass, Book, Clock, Sun } from 'lucide-react';
import React from 'react';

interface AuthContainerProps {
  children: React.ReactNode;
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="relative min-h-screen bg-[#FDF9F2] overflow-hidden flex flex-col justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* Floating Decorative Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]">
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity }} 
          className="absolute top-20 left-10 text-slate-800"
        >
          <Star className="w-12 h-12" strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity }} 
          className="absolute top-40 right-20 text-slate-800"
        >
          <Compass className="w-16 h-16" strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity }} 
          className="absolute bottom-40 left-32 text-slate-800"
        >
          <Book className="w-14 h-14" strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity }} 
          className="absolute bottom-20 right-40 text-slate-800"
        >
          <Clock className="w-20 h-20" strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, 20, 0] }} 
          transition={{ duration: 10, repeat: Infinity }} 
          className="absolute top-32 left-1/4 text-slate-800 opacity-50"
        >
          <Sun className="w-10 h-10" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Branded SVG Divider (Clouds) - Top */}
      <div className="absolute top-0 left-0 w-full leading-[0] z-0 rotate-180 opacity-60">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C50,30 150,-10 250,40 C350,90 400,20 500,50 C600,80 650,10 750,40 C850,70 900,100 1000,50 C1100,0 1150,50 1200,80 L1200,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        {children}
      </div>

      {/* Branded SVG Divider (Clouds) - Bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-0">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C50,30 150,-10 250,40 C350,90 400,20 500,50 C600,80 650,10 750,40 C850,70 900,100 1000,50 C1100,0 1150,50 1200,80 L1200,120 L0,120 Z" fill="#ffffff" />
          <path d="M0,90 C100,50 200,20 300,60 C400,100 450,40 550,70 C650,100 700,50 800,80 C900,110 950,120 1050,70 C1150,20 1200,70 1200,100 L1200,120 L0,120 Z" fill="#ffffff" opacity="0.7"/>
        </svg>
      </div>
    </div>
  );
}
