'use client'

import { Navbar } from '@/components/navbar';
import { PremiumHero } from '@/components/premium-hero';
import { PathwayCards } from '@/components/pathway-cards';
import { JoyfulEnvironment } from '@/components/joyful-environment';
import { ProgramsShowcase } from '@/components/programs-showcase';
import { MomentsGallery } from '@/components/moments-gallery';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';


export default function Home() {
  const { handleDashboardRedirect,isAuthenticated } = useAuth();
  useEffect(() => {
    handleDashboardRedirect();
  }, [isAuthenticated]);
  return (
    <>
      <Navbar />
      <PremiumHero />
      <PathwayCards />
      <JoyfulEnvironment />
      <ProgramsShowcase />
      <MomentsGallery />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
