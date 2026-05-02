'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Post } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

interface BlogCardProps {
  post: Post;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const isLarge = index % 5 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-white border border-border/40 rounded-[28px] md:rounded-[32px] overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 ${
        isLarge ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-square md:aspect-[21/9]' : 'aspect-square'}`}>
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(isLarge ? 1200 : 800).url()}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-sm text-foreground px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                {post.categories[0].title}
              </span>
            </div>
          )}
          
          {/* External Indicator */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="bg-primary p-2 rounded-full text-primary-foreground shadow-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-[12px] text-muted-foreground font-medium mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                5 min read
              </span>
            </div>
            <h3 className={`font-playfair font-bold text-foreground leading-[1.2] mb-4 group-hover:text-primary transition-colors ${
              isLarge ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
            }`}>
              {post.title}
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>
          
          <div className="pt-6 border-t border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Read Article <span className="text-primary">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
