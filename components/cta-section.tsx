'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Pencil } from 'lucide-react';
import { AnimatedCounter } from './animated-counter';

export function CTASection() {
  return (
    <section className="relative bg-background py-[80px] lg:py-[120px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[80px] items-center">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          {/* Badge sparks */}
          <div className="relative inline-flex items-center justify-center mb-7">
            <div className="absolute -top-[14px] -left-[14px] w-9 h-9 pointer-events-none text-primary">
              <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                <line x1="8" y1="8" x2="14" y2="14" />
                <line x1="2" y1="20" x2="10" y2="20" />
                <line x1="20" y1="2" x2="20" y2="10" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-[0.5px] text-foreground bg-primary/20 px-5 py-2 rounded-full shadow-sm border border-primary/10">
              Join the Movement
            </span>
          </div>

          {/* Main heading — lighter weight with underlines on key words */}
          <h2 className="text-[36px] md:text-[48px] lg:text-[58px] font-playfair font-normal text-foreground leading-[1.2] mb-6">
            A{' '}
            <span className="relative inline-block z-10 font-medium">
              nurturing place
              <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[10px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
            </span>{' '}
            where{' '}
            <span className="relative inline-block z-10 font-medium">
              young
              <span className="absolute bottom-1.5 left-[-2px] w-[105%] h-[10px] bg-primary/20 -z-10 rounded-sm rotate-1" />
            </span>{' '}
            <span className="relative inline whitespace-nowrap font-semibold">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-8px] inset-y-[-2px] rounded-full -z-10"
                style={{ background: '#ffb400' }}
              />
              <span className="relative z-10">thrive and shine</span>
            </span>
          </h2>

          <p className="text-[17px] lg:text-[18px] text-muted-foreground leading-[1.7] mb-8 max-w-[480px]">
            We are building a pathway where African youth grow up confident in technology, equipped with real project experience, and ready to solve community problems.
          </p>

          {/* Primary CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 group mb-10"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Discover more
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* ── Divider ── */}
          <div className="border-t border-border pt-8">
            <div className="grid grid-cols-2 gap-6 items-start">

              {/* Mini gallery peek */}
              <div>
                <p className="text-[14px] font-semibold text-foreground/80 leading-[1.5] mb-4">
                  Peek into our program days and colorful memories
                </p>
                <div className="w-[120px] h-[80px] rounded-[14px] overflow-hidden shadow-md">
                  <Image
                    src="/images/image9.jpg"
                    alt="Program preview"
                    width={120}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Stat */}
              <div className="flex flex-col pt-1">
                <Pencil className="w-5 h-5 text-primary mb-4" />
                <div className="text-[42px] font-playfair font-bold text-foreground leading-none mb-1">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <p className="text-[14px] text-muted-foreground font-medium">Years of trusted learning</p>
              </div>

            </div>
          </div>

          {/* Email Signup */}
          <div className="mt-10 border-t border-border pt-8">
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-muted-foreground mb-4">
              Get updates about new programs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-[440px]">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 bg-background border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-all text-[14px]"
              />
              <button
                className="px-6 py-3 rounded-full font-semibold text-[14px] text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN — Large portrait image ── */}
        <motion.div
          className="relative w-full h-[420px] md:h-[520px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Image
            src="/images/cta-portrait.png"
            alt="Joyful child in a tech learning environment"
            fill
            className="object-cover object-top transition-transform duration-[3s] hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
