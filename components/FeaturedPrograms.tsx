"use client";

import { ArrowRight, Star, Users, Clock } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";
import { useRouter } from "next/navigation";

const programs = [
    {
        title: "Full-Stack Production",
        company: "Dreamize Africa",
        field: "Technology",
        rating: "4.9",
        duration: "12 Months",
        students: "1.2k",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        color: "#525252"
    },
    {
        title: "Cinematic Storytelling",
        company: "Green Land Film School",
        field: "Visual Arts",
        rating: "5.0",
        duration: "6 Months",
        students: "850",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800",
        color: "#737373"
    },
    {
        title: "AI Interface Design",
        company: "Byose Tech",
        field: "Innovation",
        rating: "4.8",
        duration: "9 Months",
        students: "500",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        color: "#1a1a1a"
    }
];

export function FeaturedPrograms() {
    const { ref, isVisible } = useReveal();
    const router = useRouter();

    return (
        <section id="programs" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div ref={ref} className="max-w-full mx-auto">
                <div className={`flex items-end justify-between mb-20 reveal ${isVisible ? 'visible' : ''}`}>
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.4em] text-gray-400  mb-4">Featured Selection</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900  leading-none">
                            POPULAR <span className="text-[#525252]">PROGRAMS</span>
                        </h3>
                    </div>
                    <button
                        onClick={() => router.push("/courses")}
                        className="hidden md:flex items-center space-x-2 text-sm font-bold tracking-widest  hover:text-[#525252] transition-colors"
                    >
                        <span>View All</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {programs.map((prog, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={prog.image}
                                    alt={prog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-gray-900  shadow-lg">
                                        {prog.field}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="p-10 space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 fill-[#525252] text-[#525252]" />
                                            <span className="text-sm font-bold">{prog.rating}</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-400 tracking-widest ">{prog.company}</div>
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900  leading-tight group-hover:text-[#525252] transition-colors">
                                        {prog.title}
                                    </h4>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Clock size={16} className="text-[#525252]" />
                                        <span className="text-sm font-medium">{prog.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Users size={16} className="text-[#525252]" />
                                        <span className="text-sm font-medium">{prog.students} Students</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push("/auth/signup")}
                                    className="w-full py-4 md:py-5 bg-yellow-600 text-white rounded-2xl font-black tracking-widest  hover:bg-[#525252] transition-all duration-300 flex items-center justify-center space-x-3"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
