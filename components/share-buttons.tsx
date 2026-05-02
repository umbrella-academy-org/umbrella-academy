'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="lg:sticky lg:top-40 flex lg:flex-col gap-4">
      <span className="hidden lg:block text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mb-2">
        Share
      </span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
      >
        <Facebook className="w-4 h-4" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
      >
        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
