"use client";

import { ArrowRight, Clock } from "lucide-react";
import { useReveal } from "@/hooks/system/useReveal";
import { useRouter } from "next/navigation";

const programs = [
  { name: 'Software Engineering', duration: '6 months', image: '/real/image.jpeg' },
  { name: 'Data Science', duration: '4 months', image: '/real/image.jpeg' },
  { name: 'UI/UX Design', duration: '3 months', image: '/real/image.jpeg' },
  { name: 'Cloud Computing', duration: '5 months', image: '/real/image.jpeg' },
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
                            POPULAR <span className="text-[#ca8a04]">PROGRAMS</span>
                        </h3>
                    </div>
                    <button
                        onClick={() => router.push("/courses")}
                        className="hidden md:flex items-center space-x-2 text-sm font-bold tracking-widest  hover:text-[#ca8a04] transition-colors"
                    >
                        <span>View All</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {programs.map((prog, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white rounded overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={prog.image}
                                    alt={prog.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-gray-900  shadow-lg">
                                        {prog.name}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="p-10 ">
                                <div>

                                    <h4 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900  leading-tight group-hover:text-[#ca8a04] transition-colors">
                                        {prog.name}
                                    </h4>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <Clock size={16} className="text-[#ca8a04]" />
                                        <span className="text-sm font-medium">{prog.duration}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push("/auth/signup")}
                                    className="w-full py-2 md:py-3 bg-yellow-600 text-white rounded-lg font-black tracking-widest  hover:bg-[#ca8a04] transition-all duration-300 flex items-center justify-center space-x-3"
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
