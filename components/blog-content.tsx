'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BlogCard } from '@/components/blog-card';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Post, Category } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity';

interface BlogContentProps {
  posts: Post[];
  featuredPost: Post | null;
  categories: Category[];
}

export function BlogContent({ posts, featuredPost, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All Stories' || post.categories?.some(c => c.title === activeCategory);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayFeaturedPost = featuredPost || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p.slug !== displayFeaturedPost?.slug);

  return (
    <>
      <Navbar />

      <main className="pt-52 lg:pt-32 pb-24 bg-[#fafaf7] overflow-x-hidden">

        {/* Editorial Hero */}
        {displayFeaturedPost && (
          <section className="px-6 mb-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[3/2] md:aspect-[16/9] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl group cursor-pointer"
              >
                {displayFeaturedPost.mainImage && (
                  <Image
                    src={urlFor(displayFeaturedPost.mainImage).width(1280).url()}
                    alt={displayFeaturedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                )}
                {/* Gradient — stronger at bottom so text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3 md:mb-4"
                    >
                      Featured Story
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl sm:text-2xl md:text-4xl font-playfair font-bold text-white leading-snug mb-3 md:mb-4"
                    >
                      {displayFeaturedPost.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="hidden sm:block text-white text-sm md:text-base max-w-xl font-light mb-4 md:mb-6 line-clamp-2"
                    >
                      {displayFeaturedPost.excerpt}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        href={`/blog/${displayFeaturedPost.slug}`}
                        className="inline-flex items-center gap-2 bg-white text-foreground px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all group"
                      >
                        Read Post <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="px-6 mb-16">
          <div className="max-w-7xl mx-auto border-y border-black/5 py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide w-full">
                <button
                  onClick={() => setActiveCategory('All Stories')}
                  className={`whitespace-nowrap px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${activeCategory === 'All Stories'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                      : 'bg-white text-muted-foreground border border-border/60 hover:border-primary/40'
                    }`}
                >
                  All Stories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat.title)}
                    className={`whitespace-nowrap px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${activeCategory === cat.title
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white text-muted-foreground border border-border/60 hover:border-primary/40'
                      }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
              <div className="relative group shrink-0">
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-border/60 rounded-full py-2.5 px-5 md:py-3 md:px-6 pl-10 md:pl-12 text-xs md:text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Masonry-inspired Grid */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, idx) => (
                  <BlogCard key={post._id} post={post} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <h3 className="text-2xl font-playfair font-bold text-muted-foreground">No stories found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </section>

        {/* Narrative / Immersive Newsletter */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[48px] overflow-hidden bg-slate-900 px-8 py-20 md:p-24 text-center">
              <div className="absolute inset-0 opacity-40">
                <Image
                  src="/images/hero-bg.png"
                  alt="Background"
                  fill
                  sizes="100vw"
                  className="object-cover grayscale"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#1a1a16]/90" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-8 h-8 text-primary shadow-glow" />
                </div>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
                  Stay updated on the <span className="text-primary italic">pipeline evolution</span>
                </h2>
                <p className="text-white/70 text-lg mb-12 leading-relaxed">
                  Join our monthly editorial newsletter where we share student breakthroughs, technology trends across the continent, and updates from our innovation lab.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <button className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-2xl hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="mt-6 text-white/40 text-[11px] font-medium tracking-wider uppercase">
                  No Spam. Just Innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
