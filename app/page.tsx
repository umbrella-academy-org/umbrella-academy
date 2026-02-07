'use client';

import { useNavigationWithLoading } from '@/lib/utils/navigation';
import { useAuth } from '@/contexts';
import { useEffect } from 'react';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { PlatformRoles } from "@/components/PlatformRoles";
import { Companies } from "@/components/Companies";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

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
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-y-scroll">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PlatformRoles />
        <Companies />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}