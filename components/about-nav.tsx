'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AboutNav() {
  const pathname = usePathname();

  const links = [
    { href: '/about', label: 'Overview' },
    { href: '/about/story', label: 'Our Story' },
    { href: '/about/vision', label: 'Vision & Mission' },
    { href: '/about/team', label: 'Team' },
  ];

  return (
    <section className="sticky top-[86px] z-40 flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-md shadow-md border border-border/60 rounded-full w-full md:w-max max-w-full px-6 md:px-8 h-[64px] flex items-center gap-6 md:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center h-full text-[14px] md:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
