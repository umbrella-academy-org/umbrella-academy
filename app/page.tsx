import { Navbar } from '@/components/navbar';
import { PremiumHero } from '@/components/premium-hero';
import { PathwayCards } from '@/components/pathway-cards';
import { JoyfulEnvironment } from '@/components/joyful-environment';
import { ProgramsShowcase } from '@/components/programs-showcase';
import { MomentsGallery } from '@/components/moments-gallery';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Dreamize Africa | Building Africa\'s Tech Talent Pipeline',
  description: 'Prepare young Africans for technology careers through early career guidance, hands-on learning, and real-world project experience.',
};

export default function Home() {
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
