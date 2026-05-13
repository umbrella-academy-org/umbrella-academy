import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProviders } from '@/contexts';
import { AppProgressBar } from 'next-app-progress-bar';


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamise-africa.vercel.app'), // Assuming this is the main domain or current vercel domain
  title: 'Dreamize Africa | Building Africa&apos;s Tech Talent Pipeline',
  description: 'Prepare young Africans for technology careers through early career guidance, hands-on learning, and real-world project experience.',
  openGraph: {
    title: 'Dreamize Africa',
    description: 'Building Africa&apos;s tech talent pipeline through early career guidance and hands-on learning.',
    url: 'https://dreamizeafrica.org',
    siteName: 'Dreamize Africa',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Dreamize Africa Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dreamize Africa',
    description: 'Building Africa&apos;s tech talent pipeline.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <AppProviders>
        <body className="font-sans antialiased" suppressHydrationWarning>
          <AppProgressBar
            color="#0070f3"
            height={3}
            showSpinner={false}
          />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}

        </body>
      </AppProviders>
    </html>
  )
}
