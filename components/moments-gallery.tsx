'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

const galleryItems = [
  { src: '/images/image4.jpg', label: 'First steps', caption: 'Every journey begins with a single step into the unknown.', alt: 'Child taking first steps in tech' },
  { src: '/images/image5.jpg', label: 'Laughing together', caption: 'Joy multiplies when shared — celebrating every small win.', alt: 'Kids celebrating their project' },
  { src: '/images/image6.jpg', label: 'Painting joy', caption: 'Creativity flows freely in a space built for expression.', alt: 'Child creating with colours' },
  { src: '/images/image7.jpg', label: 'Little friends', caption: 'Collaboration builds skills and friendships that last a lifetime.', alt: 'Two students sharing a laptop' },
  { src: '/images/image8.jpg', label: 'Discovery moment', caption: 'That spark of wonder when something finally clicks.', alt: 'Child amazed by their creation' },
];

export function MomentsGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % galleryItems.length), []);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 4500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  return (
    <section className="relative py-[80px] lg:py-[120px] px-6 bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          className="text-center mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute -top-[14px] -left-[14px] w-9 h-9 pointer-events-none text-primary">
              <svg viewBox="0 0 40 40" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round">
                <line x1="8" y1="8" x2="14" y2="14" />
                <line x1="2" y1="20" x2="10" y2="20" />
                <line x1="20" y1="2" x2="20" y2="10" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-[0.5px] text-foreground bg-primary/20 px-5 py-2 rounded-full shadow-sm border border-primary/10">
              Moments Gallery
            </span>
          </div>

          <h2 className="text-[36px] md:text-[46px] lg:text-[54px] font-playfair font-light text-foreground leading-[1.2] max-w-[820px] mx-auto mb-4">
            hearts{' '}
            <span className="relative inline-block z-10 font-semibold">
              shine
              <span className="absolute bottom-2 left-[-2px] w-[108%] h-[12px] bg-primary/30 -z-10 rounded-sm -rotate-1" />
            </span>{' '}
            through every{' '}
            <span className="relative inline-block z-10 font-semibold">
              captured image
              <span className="absolute bottom-2 left-[-2px] w-[108%] h-[12px] bg-primary/20 -z-10 rounded-sm rotate-1" />
            </span>
          </h2>
          <p className="text-[18px] lg:text-[20px] text-muted-foreground font-light">
            Art, joy, and imagination
          </p>
        </motion.div>

        {/* ── PREMIUM SPLIT GALLERY ── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* ── LEFT: Large Featured Image ── */}
          <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[560px] shadow-[0_30px_70px_rgba(0,0,0,0.12)] bg-slate-100 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              >
                <Image
                  src={galleryItems[active].src}
                  alt={galleryItems[active].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white/60 text-[12px] font-semibold uppercase tracking-[2px] mb-1">
                    {String(active + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
                  </p>
                  <h3 className="text-white text-[22px] font-playfair font-semibold mb-1">
                    {galleryItems[active].label}
                  </h3>
                  <p className="text-white/70 text-[14px] leading-[1.6] max-w-[480px]">
                    {galleryItems[active].caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot progress bar at very bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
              <motion.div
                className="h-full bg-primary"
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: paused ? 0 : 4.5, ease: 'linear' }}
              />
            </div>
          </div>

          {/* ── RIGHT: Vertical thumbnail strip ── */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {galleryItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-[140px] lg:w-full rounded-[18px] overflow-hidden transition-all duration-300 group ${
                  i === active
                    ? 'ring-2 ring-primary ring-offset-2 shadow-lg'
                    : 'opacity-55 hover:opacity-90'
                }`}
                style={{ height: i === active ? '130px' : '96px' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="340px"
                />
                {/* Hover overlay with label */}
                <div className={`absolute inset-0 flex items-end p-3 transition-all duration-300 ${
                  i === active ? 'bg-black/30' : 'bg-black/0 group-hover:bg-black/25'
                }`}>
                  <AnimatePresence>
                    {i === active && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[11px] text-white font-bold uppercase tracking-[1.5px]"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
