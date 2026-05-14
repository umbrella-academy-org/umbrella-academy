import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock, PortableTextProps } from '@portabletext/react';
import { groq } from 'next-sanity';

export type PostPortableBody = PortableTextProps<PortableTextBlock>['value'];

export const postsQuery = groq`*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  "author": author->{name, image, bio},
  "categories": categories[]->{title, "slug": slug.current}
}`;

export const featuredPostQuery = groq`*[_type == "post" && featured == true && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  "author": author->{name, image, bio},
  "categories": categories[]->{title, "slug": slug.current}
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  body,
  publishedAt,
  featured,
  "author": author->{name, image, bio},
  "categories": categories[]->{title, "slug": slug.current}
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

export const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  "author": author->{name, image, bio},
  "categories": categories[]->{title, "slug": slug.current}
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`;

export interface Author {
  name: string;
  image?: SanityImageSource;
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  body?: PostPortableBody;
  publishedAt: string;
  featured?: boolean;
  author?: Author;
  categories?: Category[];
}
