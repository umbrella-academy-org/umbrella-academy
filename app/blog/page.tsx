import { client } from '@/lib/sanity';
import { postsQuery, featuredPostQuery, categoriesQuery } from '@/lib/sanity.queries';
import { BlogContent } from '@/components/blog-content';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Dreamize Africa',
  description: 'Stories, insights, and innovations from Africa\'s tech talent pipeline.',
  openGraph: {
    title: 'Blog | Dreamize Africa',
    description: 'Stories, insights, and innovations from Africa\'s tech talent pipeline.',
  },
};

export default async function BlogPage() {
  const [posts, featuredPost, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(featuredPostQuery),
    client.fetch(categoriesQuery),
  ]);

  return <BlogContent posts={posts} featuredPost={featuredPost} categories={categories} />;
}
