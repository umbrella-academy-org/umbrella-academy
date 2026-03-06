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
    default: "Umbrella Academy | Next-Gen Learning Platform",
    template: "%s | Umbrella Academy"
  },
  description: "Join Umbrella Academy LMS and learn from industry trainers, guided by expert mentors, inside structured learning companies. Accelerate your career with real-world skills and professional guidance.",
  keywords: [
    "LMS",
    "Learning Management System",
    "Professional Mentorship",
    "Skills Development",
    "Industry Training",
    "Umbrella Academy",
    "Career Growth Rwanda",
    "Digital Learning Platform"
  ],
  authors: [{ name: "Umbrella Academy Team" }],
  creator: "Umbrella Academy",
  publisher: "Umbrella Academy",
  metadataBase: new URL("https://umbrella-academy.com"), // Replace with actual production URL
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Umbrella Academy | Next-Gen Learning Platform",
    description: "Structured learning platform connecting students with expert trainers and mentors across multiple fields. Real skills, real growth.",
    siteName: "Umbrella Academy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Umbrella Academy - Professional Learning Environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umbrella Academy | Next-Gen Learning Platform",
    description: "Accelerate your career with industry-led training and expert mentorship. Join Umbrella Academy today.",
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"],
    creator: "@umbrellaacademy",
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
