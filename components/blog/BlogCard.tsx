"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
    image: string;
    category: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        date: string;
    };
} 

export function BlogCard({ image, category, title, description, author }: BlogCardProps) {
    return (
        <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6">
                <Image
                    src={image}
                    alt={title}
                    className="absolute inset-0  object-cover transition-transform duration-700 group-hover:scale-105"
                    width={500}
                    height={500}
                />
            </div>

            <div className="space-y-3 grow">
                <span className="text-[#ca8a04] text-sm font-bold tracking-wide uppercase">
                    {category}
                </span>

                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-[#ca8a04] transition-colors">
                        {title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-900 group-hover:text-[#ca8a04] transition-colors shrink-0" />
                </div>

                <p className="text-gray-500 font-light line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="mt-8 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{author.name}</span>
                    <span className="text-xs text-gray-400">{author.date}</span>
                </div>
            </div>
        </div>
    );
}
