"use client";

import { useReveal } from "@/hooks/system/useReveal";
import { ArrowRight } from "lucide-react";

export function BlogHero() {
    const { ref, isVisible } = useReveal();

    return (
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div
                ref={ref}
                className={`group relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            >
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1600"
                    alt="Featured Blog"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                    <div className="max-w-3xl">
                        <span className="text-white/80 text-sm font-semibold tracking-wider uppercase mb-4 block">
                            Featured
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                            Breaking Into Product Design: Advice from Untitled Founder, Frankie
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl font-light">
                            Let&apos;s get one thing out of the way: you don&apos;t need a fancy Bachelor&apos;s Degree to get into Product Design. We sat down with Frankie Sullivan to talk about gatekeeping in product design and how anyone can get into this growing industry.
                        </p>
                    </div>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-16 right-8 md:right-16 text-white group-hover:translate-x-2 transition-transform hidden md:block">
                    <ArrowRight className="w-12 h-12" />
                </div>
            </div>
        </section>
    );
}
