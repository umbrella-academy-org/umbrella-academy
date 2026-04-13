import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingBar from "@/components/ui/LoadingBar";
import { AppProviders } from "@/contexts";
import { SystemThemeScript } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ca8a04",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Dreamize | Next-Gen Learning Platform",
    template: "%s | Dreamize"
  },
  description: "Join Dreamize LMS and learn from industry trainers, guided by expert mentors, inside structured learning companies. Accelerate your career with real-world skills and professional guidance.",
  keywords: [
    "LMS",
    "Learning Management System",
    "Professional Mentorship",
    "Skills Development",
    "Industry Training",
    "Dreamize",
    "Career Growth Rwanda",
    "Digital Learning Platform"
  ],
  authors: [{ name: "Dreamize" }],
  creator: "Dreamize",
  publisher: "Dreamize",
  metadataBase: new URL("https://dreamize.rw"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Dreamize | Next-Gen Learning Platform",
    description: "Structured learning platform connecting students with expert trainers and mentors across multiple fields. Real skills, real growth.",
    siteName: "Dreamize",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Dreamize - Professional Learning Environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamize | Next-Gen Learning Platform",
    description: "Accelerate your career with industry-led training and expert mentorship. Join Dreamize today.",
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"],
    creator: "@dreamize",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SystemThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <LoadingBar />
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
