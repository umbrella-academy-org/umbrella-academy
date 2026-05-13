'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

/* ── Ghost watermark pattern drawn with SVG ── */
function WatermarkPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="footer-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Simple face + star shapes echoing the sample image */}
          <circle cx="40" cy="40" r="18" fill="none" stroke="#1F2B4C" strokeWidth="2.5" />
          <circle cx="34" cy="37" r="2.5" fill="#1F2B4C" />
          <circle cx="46" cy="37" r="2.5" fill="#1F2B4C" />
          <path d="M34 46 Q40 52 46 46" fill="none" stroke="#1F2B4C" strokeWidth="2" strokeLinecap="round" />
          <polygon points="95,10 97,16 103,16 98,20 100,26 95,22 90,26 92,20 87,16 93,16" fill="none" stroke="#1F2B4C" strokeWidth="1.8" />
          <rect x="10" y="80" width="24" height="18" rx="4" fill="none" stroke="#1F2B4C" strokeWidth="2" />
          <line x1="10" y1="86" x2="34" y2="86" stroke="#1F2B4C" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-pattern)" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const programs = [
  { label: 'The Dreamer', href: '/programs/dreamer' },
  { label: 'The Builder', href: '/programs/builder' },
  { label: 'Robotics & IoT', href: '/programs/robotics' },
  { label: 'Digital Creative Arts', href: '/programs/creative' },
  { label: 'Podcast & Outreach', href: '/programs/podcast' },
];

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#EDE8DB' }}
    >
      <WatermarkPattern />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">

        {/* ── TOP CTA BAR ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-[60px] border-b border-[#1F2B4C]/15">
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-playfair font-light text-foreground leading-[1.25] max-w-[580px]">
            Building{' '}
            <span className="font-normal">Africa&apos;s</span>{' '}
            tech future through{' '}
            <span className="relative inline-block z-10 font-semibold">
              early career guidance
              <span className="absolute bottom-1.5 left-0 w-full h-[10px] rounded-sm -z-10 -rotate-1" style={{ background: 'var(--primary)', opacity: 0.3 }} />
            </span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group flex-shrink-0"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Explore more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── MAIN FOOTER GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-[60px]">

          {/* Col 1 — Brand & Contact */}
          <div>
            <div className="mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Dreamize Africa Logo" 
                width={280} 
                height={90} 
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-[14px] text-[#1F2B4C]/70 leading-[1.7] mb-7">
              Building Africa&apos;s early tech talent pipeline through career guidance, STEM exposure, and real-world project experience.
            </p>

            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-2">Contact</p>
            <p className="text-[14px] text-[#1F2B4C]/80 mb-5">+250 785 837 748</p>

            <p className="text-[14px] text-[#1F2B4C]/80 leading-[1.6]">Kigali, Rwanda</p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#1F2B4C] mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[15px] text-[#1F2B4C]/75 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Programs */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#1F2B4C] mb-5">Programs</p>
            <ul className="space-y-3">
              {programs.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[15px] text-[#1F2B4C]/75 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Email & Socials */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#1F2B4C] mb-4">Email</p>
            <a
              href="mailto:dreamizeafrica@gmail.com"
              className="text-[16px] font-semibold underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all duration-200"
              style={{ color: 'var(--primary)' }}
            >
              dreamizeafrica@gmail.com
            </a>

            {/* Social icons */}
            <div className="flex gap-3 mt-8">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-10 h-10 rounded-full border border-[#1F2B4C]/20 bg-white/60 flex items-center justify-center hover:border-primary/40 hover:bg-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-[#1F2B4C]" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-[#1F2B4C]/15 py-7 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-[#1F2B4C]/50">
          <p>&copy; {new Date().getFullYear()} Dreamize Africa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
