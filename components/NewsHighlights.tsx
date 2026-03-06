"use client";

import { useReveal } from "@/hooks/system/useReveal";
import { ArrowRight } from "lucide-react";

const news = [
    {
        tag: "AWARDS & HONOURS",
        title: "Student Documentary 'Welcome Home Freckles' Nominated for 2026 EE BAFTA",
        description: "For over half a century, the Academy has developed some of the world's top creative talent.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
        link: "#"
    },
    {
        tag: "GRADUATE IMPACT",
        title: "Alumni Shine at Sundance 2026 with Multiple Award-Winning Films",
        description: "Our graduates continue to redefine the boundaries of global production and storytelling.",
        image: "https://images.unsplash.com/photo-1542204111-970c9228ebca?w=800",
        link: "#"
    }
];

export function NewsHighlights() {
    const { ref, isVisible } = useReveal();

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
            <div ref={ref} className="max-w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
                    {news.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative min-h-[400px] md:min-h-[600px] flex flex-col justify-end p-8 md:p-12 bg-black overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                            <div className="relative z-10 space-y-6">
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#ca8a04] ">
                                    {item.tag}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black tracking-tighter  leading-none group-hover:text-[#ca8a04] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 max-w-md font-light">
                                    {item.description}
                                </p>
                                <a
                                    href={item.link}
                                    className="inline-flex items-center space-x-4 text-xs font-black tracking-[0.3em]  group-hover:translate-x-2 transition-transform"
                                >
                                    <span>Read Article</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
