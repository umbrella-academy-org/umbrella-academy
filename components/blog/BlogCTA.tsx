"use client";

import { useReveal } from "@/hooks/system/useReveal";

export function BlogCTA() {
    const { ref, isVisible } = useReveal();

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div
                ref={ref}
                className={`max-w-7xl mx-auto bg-black rounded-3xl p-12 md:p-24 text-center space-y-8 relative overflow-hidden reveal ${isVisible ? 'visible' : ''}`}
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ca8a04] opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                        Let&apos;s get started on something <br className="hidden md:block" />
                        <span className="text-[#ca8a04]">great together</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light">
                        Join over 4,000+ startups already growing with Untitled.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors interactive-button">
                            Chat to us
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ca8a04] text-white font-bold hover:bg-[#a16207] transition-colors interactive-button">
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
