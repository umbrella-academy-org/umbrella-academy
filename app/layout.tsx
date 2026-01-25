import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Umbrella Academy",
  description: "Learning platform for students and mentors",
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
