'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProgramsNav() {
  const pathname = usePathname();

  const links = [
    { href: '/programs', label: 'Pathway Overview' },
    { href: '/programs/dreamer', label: 'The Dreamer (10+)' },
    { href: '/programs/builder', label: 'The Builder (Teen+)' },
    { href: '/programs/podcast', label: 'Podcast & Outreach' },
  ];

  return (
    <section className="sticky top-[86px] z-40 flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-md shadow-md border border-border/60 rounded-full w-full lg:w-max max-w-full px-6 lg:px-8 h-[64px] flex items-center gap-6 lg:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center h-full text-[14px] md:text-[15px] font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
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
