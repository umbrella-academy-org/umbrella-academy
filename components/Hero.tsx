"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORIES = ["FILM", "TELEVISION", "GAMES", "COMMERCIALS"];

export function Hero() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setCatIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white mt-20">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-40 transition-transform duration-[2000ms] ease-out scale-110"
        style={{
          transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + scrollY * 0.0001})`,
        }}
      >
        <img
          src="/nfts_inspired_hero_bg_1770538732614.png"
          alt="Cinematic production studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-start space-y-8 md:space-y-12">
        <div className="space-y-4">


          <h1 className="text-5xl font-black  leading-[0.85]  transition-all duration-700">
            KICKSTART <br />
            <span className="text-white">YOUR</span> <br />
            <span className="text-[#ca8a04] transition-all duration-500 inline-block">
              {CATEGORIES[catIndex]}
            </span> <br />
            CAREER.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto animate-slide-up">
          <button
            onClick={() => router.push("/auth/signup")}
            className="group w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black rounded-none hover:bg-[#ca8a04] hover:text-white transition-all duration-500 flex items-center justify-center space-x-4 font-black text-lg md:text-xl  active:scale-95"
          >
            <span>JOIN THE ACADEMY</span>
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
