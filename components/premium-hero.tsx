'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Pause, Play, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function PremiumHero() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Attempt playback if ready. Mute errors as they are usually just hot-reload interrupts.
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setPlaying(false));
      }
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log('Autoplay prevented:', error));
      }
    }
    setPlaying((p) => !p);
  };

  // Avoid hydration mismatch by waiting for mount
  if (!mounted) return <section className="min-h-[90vh] bg-gradient-to-br from-blue-50/50 via-white to-background" />;

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-background">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 w-full max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              
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
                  Building Africa&apos;s Talent Pipeline
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-playfair font-light text-foreground leading-[1.1] relative z-10">
                Building <br />
                <span className="relative inline-block z-10 font-semibold">
                  early tech
                  <span className="absolute bottom-2 left-[-2px] w-[105%] h-[12px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
                </span>
                <br />
                talent <span className="italic font-light">for</span> <span className="font-semibold">Africa</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium"
            >
              We provide early career guidance, hands-on learning, and real-world project experience to help young learners become confident technology creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/programs"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-2 group"
              >
                Explore Pathways <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="bg-white text-foreground border border-border px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                Our Mission
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: LARGE VIDEO FEATURE ── */}
          <div className="flex-1 relative w-full lg:h-[600px] flex justify-end items-center mt-12 lg:mt-0">
            
            {/* Main Video Container (Now large and on the right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative w-full lg:w-[90%] aspect-[4/5] lg:h-full rounded-[48px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] bg-slate-900 group"
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover block"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/images/hero-video.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Pause/Play Control */}
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white/20 transition-all border border-white/20 shadow-xl"
              >
                {playing ? (
                  <><Pause className="w-4 h-4" /> PAUSE VIBE</>
                ) : (
                  <><Play className="w-4 h-4" /> PLAY STORY</>
                )}
              </button>
            </motion.div>

            {/* Floating Image Mini-Card (Interchanged position) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <div className="bg-white p-4 rounded-[32px] shadow-2xl border border-border/40 rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative w-32 h-40 rounded-[24px] overflow-hidden">
                  <Image
                    src="/images/hero-bg.png"
                    alt="Success journey"
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Confidence First</p>
                  <p className="text-[13px] font-playfair font-bold text-foreground leading-tight mt-1">Ready to create.</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Stats or Accents */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="absolute -bottom-10 right-10 z-20"
            >
               <div className="bg-black/80 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-2xl max-w-[200px]">
                 <p className="text-white font-playfair italic text-lg leading-tight mb-2">"Wait → Create"</p>
                 <p className="text-white/60 text-xs font-medium leading-relaxed">Shifting from consuming technology to building it.</p>
               </div>
            </motion.div>

            {/* Background Accents (Paper Planes) */}
            <motion.div
              className="absolute top-[-5%] right-[-5%] opacity-20 w-24 h-24 text-primary pointer-events-none"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
