import { NextStudioLayout } from 'next-sanity/studio';
import { metadata as studioMetadata } from 'next-sanity/studio';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Dreamize Africa Studio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
