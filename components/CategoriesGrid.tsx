"use client";

import { useReveal } from "@/hooks/system/useReveal";
import { ArrowRight, Code, Film, Briefcase, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
    {
        title: "Film",
        icon: Film,
        image: "/real/dashboard-film.jpeg",
        color: "bg-amber-600"
    },
    {
        title: "Photography",
        icon: Film,
        image: "/real/dashboard-photograph.jpeg",
        color: "bg-[#525252]"
    },
    {
        title: "Software Engineering",
        icon: Zap,
        image: "/real/dashboard-software.jpeg",
        color: "bg-gray-900"
    },
    {
        title: "Digital Media",
        icon: Briefcase,
        image: "/real/dashboard-media.jpeg",
        color: "bg-amber-600"
    }
];

export function CategoriesGrid() {
    const { ref, isVisible } = useReveal();
    const router = useRouter();

    return (
        <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
            <div ref={ref} className="max-w-full mx-auto">
                <div className={`mb-16 reveal ${isVisible ? 'visible' : ''}`}>
                    <h3 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-amber-900 leading-none ">
                        WHAT ARE YOU <br /> <span className="text-[#525252]">INTERESTED IN?</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat, index) => {
                        const delays = ["animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400"];
                        return (
                            <div
                                key={index}
                                className={`group relative aspect-square overflow-hidden cursor-pointer ${isVisible ? 'animate-fade-in' : 'opacity-0'} ${delays[index]}`}
                            >
                                {/* Background Image */}
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />

                                {/* Color Overlay */}
                                <div className={`absolute inset-0 ${cat.color} opacity-60 group-hover:opacity-20 transition-opacity duration-500`} />

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-widest  mb-4 group-hover:scale-110 transition-transform duration-500">
                                            {cat.title}
                                        </h4>
                                        <div className="w-0 h-1 bg-white mx-auto group-hover:w-24 transition-all duration-500" />
                                    </div>
                                </div>

                                <div
                                    onClick={() => router.push(`/courses?category=${cat.title.toLowerCase()}`)}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white font-black text-xs tracking-[0.3em]  opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                                >
                                    <span>Explore Courses</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
