"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "FILMING"
]


const HERO_IMAGES = [
  "/real/dashboard1.jpeg",
  "/real/dashboard2.jpeg",
  "/real/dashboard3.jpeg",
  "/real/dashboard4.jpeg",
  "/real/dashboard5.jpeg",
  "/real/dashboard6.jpeg",
];

export function Hero() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [catIndex, setCatIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const categoryInterval = setInterval(() => {
      setCatIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    const imageInterval = setInterval(() => {
      setIsTransitioning(true);
      setNextImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);

      setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 2000);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(categoryInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white mt-20">
      {/* Dynamic Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {/* Current Image */}
        <div
          className="absolute inset-0 opacity-90 transition-all duration-1000 ease-out scale-110"
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + scrollY * 0.0001})`,
            opacity: isTransitioning ? 0 : 0.4,
          }}
        >
          <img
            src={HERO_IMAGES[imageIndex]}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
        </div>

        {/* Next Image (for crossfade) */}
        <div
          className="absolute inset-0 opacity-0 transition-all duration-1000 ease-out scale-110"
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + scrollY * 0.0001})`,
            opacity: isTransitioning ? 0.4 : 0,
          }}
        >
          <img
            src={HERO_IMAGES[nextImageIndex]}
            alt="Hero background next"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-start space-y-8 md:space-y-12">
        <div className="space-y-4">


          <h1 className="text-5xl font-black  leading-[0.85]  transition-all duration-700">
            KICKSTART <br />
            <span className="text-white">YOUR</span> <br />
            <span className="text-[#ca8a04] transition-all duration-500 inline-block">
              FILMING
            </span> <br />
            CAREER.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto animate-slide-up">
          <button
            onClick={() => router.push("/auth/signup")}
            className="group w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black rounded-none hover:bg-[#ca8a04] hover:text-white transition-all duration-500 flex items-center justify-center space-x-4 font-black text-lg md:text-xl  active:scale-95"
          >
            <span>JOIN DREAMIZE</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          <button

            className="group w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-transparent border-2 border-white/20 text-white rounded-none hover:border-[#ca8a04] hover:bg-[#ca8a04]/10 transition-all duration-500 flex items-center justify-center space-x-3 font-bold text-base md:text-lg tracking-tight active:scale-95"
          >
            <PlayCircle className="w-5 h-5 md:w-6 md:h-6 text-[#ca8a04]" />
            <span>EXPLORE SHOWCASE</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator for categories */}
      <div className="absolute left-10 md:left-20 bottom-20 flex flex-col space-y-4">
        {CATEGORIES.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 ${i === catIndex ? 'w-20 bg-[#ca8a04]' : 'w-8 bg-white/20'}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer opacity-50 hover:opacity-100 transition-all"
        onClick={() => {
          document.getElementById('brand-marquee')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-[10px]  tracking-[0.4em] font-black text-white/50">Our Credits</span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#ca8a04] animate-slide-y" />
          </div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
        <span className="text-xs font-black tracking-[0.5em]  text-white/20">ESTABLISHED MCMLXXI</span>
      </div>
    </section>
  );
}
