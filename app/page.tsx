'use client';

import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { useEffect } from 'react';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { FeaturedPrograms } from "@/components/FeaturedPrograms";
import { NewsHighlights } from "@/components/NewsHighlights";
import { HowItWorks } from "@/components/HowItWorks";
import { PlatformRoles } from "@/components/PlatformRoles";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  const { navigate } = useNavigationWithLoading();
  const { isAuthenticated, user, isLoading } = useAuth();

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardRoutes: Record<string, string> = {
        'student': '/dashboard/student',
        'trainer': '/dashboard/trainer',
        'mentor': '/dashboard/mentor',
        'field-admin': '/dashboard/field-admin',
        'umbrella-admin': '/dashboard/umbrella-admin'
      };
      if (dashboardRoutes[user.role]) {
        navigate(dashboardRoutes[user.role]);
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Logo size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white h-screen overflow-auto">
      <Header />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="brand-marquee">
          <BrandsMarquee />
        </div>
        <CategoriesGrid />
        <FeaturedPrograms />
        <NewsHighlights />
        <HowItWorks />
        {/* <PlatformRoles /> */}
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}