import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BlogCard } from '@/components/blog-card';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from '@/lib/sanity.queries';
import { SanityPortableText } from '@/components/sanity-portable-text';
import { ShareButtons } from '@/components/share-buttons';
import { Post } from '@/lib/sanity.queries';
import { format } from 'date-fns';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: 'Post Not Found' };

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Dreamize Africa`,
    description: post.excerpt || 'Read this story from Dreamize Africa',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read this story from Dreamize Africa',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || 'Read this story from Dreamize Africa',
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function estimateReadTime(body: unknown): number {
  if (!body || !Array.isArray(body)) return 1;

  type PortableSpan = { text?: string };
  type PortableBlock = { _type?: string; children?: PortableSpan[] };

  const text = body
    .flatMap((block: PortableBlock) =>
      block._type === 'block' && Array.isArray(block.children)
        ? block.children.map((child: PortableSpan) => child.text ?? '')
        : []
    )
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, relatedPosts]: [Post | null, Post[]] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }),
    client.fetch(relatedPostsQuery, { slug }),
  ]);

  if (!post) notFound();

  const readTime = estimateReadTime(post.body);

  return (
    <>
      <Navbar />

      <main className="bg-[#fafaf7] min-h-screen pt-32 pb-24">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Stories
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-6 mb-16">
          {post.categories && post.categories.length > 0 && (
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 inline-block">
              {post.categories[0].title}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border/60 py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-4 h-4" />
              </div>
              <span className="font-bold text-foreground">
                {post.author?.name ?? 'Dreamize Team'}
              </span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <section className="max-w-6xl mx-auto px-6 mb-20">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src={urlFor(post.mainImage).width(1920).url()}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 80vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          </section>
        )}

        {/* Article Body */}
        <section className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 relative">
          {/* Sticky Social Share (Sidebar) */}
          <aside className="lg:w-24 shrink-0">
            <ShareButtons title={post.title} slug={post.slug} />
          </aside>

          {/* Text Content */}
          <article className="max-w-3xl flex-1">
            {post.body ? (
              <SanityPortableText value={post.body} />
            ) : (
              <p className="text-muted-foreground italic">Content coming soon...</p>
            )}

            {/* Categories as tags */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-3">
                {post.categories.map((cat) => (
                  <span
                    key={cat.title}
                    className="text-xs font-bold text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                  >
                    #{cat.title.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            )}
          </article>
        </section>

        {/* Related Stories */}
        {relatedPosts.length > 0 && (
          <footer className="max-w-7xl mx-auto px-6 mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold">
                Recommended for you
              </h2>
              <Link href="/blog" className="text-sm font-bold text-primary hover:underline">
                View all stories →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, idx) => (
                <BlogCard key={relatedPost._id} post={relatedPost} index={idx} />
              ))}
            </div>
          </footer>
        )}
      </main>

      <Footer />
    </>
  );
}
