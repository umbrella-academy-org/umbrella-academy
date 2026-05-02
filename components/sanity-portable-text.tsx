import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-12">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog Image'}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        {value.caption && (
          <p className="mt-4 text-center text-sm text-muted-foreground italic">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-16 mb-8 text-foreground">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-playfair font-bold mt-12 mb-6 text-foreground">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-playfair font-bold mt-10 mb-4 text-foreground">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl md:text-2xl font-playfair font-bold mt-8 mb-3 text-foreground">{children}</h4>,
    normal: ({ children }: any) => <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary bg-primary/5 p-8 rounded-r-2xl font-playfair italic text-xl my-12 text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-muted-foreground">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary underline hover:no-underline transition-all"
        >
          {children}
        </a>
      );
    },
  },
};

export function SanityPortableText({ value }: { value: any }) {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
