'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "Dreamize Africa transformed my understanding of technology. I went from curious to confident in building real projects that solve genuine problems in my community.",
    author: 'Amara O.',
    role: 'Student, Early Exposure Program',
    initials: 'AO',
    rating: 5,
  },
  {
    quote: "The mentorship and hands-on experience I gained prepared me for my first tech internship. I felt ready because I had already built real, portfolio-worthy projects.",
    author: 'Kojo M.',
    role: 'Student, Real-World Experience',
    initials: 'KM',
    rating: 5,
  },
  {
    quote: "As an educator, I've seen remarkable growth in students' confidence and technical skills. Dreamize brings industry-relevant learning directly into our classrooms.",
    author: 'Dr. Ada K.',
    role: 'School Principal',
    initials: 'AK',
    rating: 5,
  },
  {
    quote: "The robotics and IoT program gave my daughter skills I never expected at her age. She now talks about circuits and code like it's second nature.",
    author: 'Mrs. Nadia T.',
    role: 'Parent',
    initials: 'NT',
    rating: 5,
  },
  {
    quote: "Within three months I built a working app. The structured path from idea to deployment is something most universities don't even teach this clearly.",
    author: 'Emeka F.',
    role: 'Graduate, Software Development',
    initials: 'EF',
    rating: 5,
  },
  {
    quote: "Partnering with Dreamize Africa was one of the best decisions for our school. Student engagement is up and the enthusiasm for tech careers is infectious.",
    author: 'Mr. Isaac B.',
    role: 'Deputy Headmaster',
    initials: 'IB',
    rating: 5,
  },
];

// Duplicate for seamless infinite loop
const loopedItems = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[380px] bg-white border border-border rounded-[20px] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col mx-4">
      {/* Stars + Quote icon */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <Quote className="w-7 h-7 text-primary/25" />
      </div>

      {/* Quote text */}
      <p className="text-[15px] text-muted-foreground leading-[1.75] italic flex-1 mb-6">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-border mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-[13px] flex-shrink-0 border border-primary/20">
          {t.initials}
        </div>
        <div>
          <p className="text-[15px] font-playfair font-bold text-foreground leading-tight">{t.author}</p>
          <p className="text-[13px] text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-[80px] lg:py-[120px] bg-slate-50/60 overflow-hidden">

      {/* ── HEADER ── */}
      <div className="px-6 max-w-[1200px] mx-auto">
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
              Stories of Impact
            </span>
          </div>

          <h2 className="text-[36px] md:text-[46px] lg:text-[54px] font-playfair font-light text-foreground leading-[1.2] max-w-[720px] mx-auto mb-5">
            Unlock{' '}
            <span className="relative inline-block z-10 font-semibold">
              potential
              <span className="absolute bottom-2 left-[-2px] w-[108%] h-[12px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
            </span>{' '}
            through guided{' '}
            <span className="relative inline-block z-10 font-semibold">
              tech learning
              <span className="absolute bottom-2 left-[-2px] w-[108%] h-[12px] bg-primary/20 -z-10 rounded-sm rotate-1" />
            </span>
          </h2>
          <p className="text-[18px] lg:text-[20px] text-muted-foreground max-w-[560px] mx-auto leading-[1.7]">
            Hear from students, educators, and parents who are shaping Africa&apos;s tech future.
          </p>
        </motion.div>
      </div>

      {/* ── INFINITE MARQUEE TRACK ── */}
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[120px] z-10 bg-gradient-to-r from-slate-50/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[120px] z-10 bg-gradient-to-l from-slate-50/60 to-transparent" />

      <div
        ref={trackRef}
        className="relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      >
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
          // Pause on hover via CSS — applied via Tailwind group trick on section
        >
          {loopedItems.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>



    </section>
  );
}
