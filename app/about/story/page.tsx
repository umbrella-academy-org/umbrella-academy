import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutNav } from '@/components/about-nav';
import { PlayfulHero } from '@/components/playful-hero';
import Image from 'next/image';

export const metadata = {
  title: 'Our Story | Dreamize Africa',
  description: 'Learn why Dreamize Africa was created and the problem we\'re solving.',
};

export default function StoryPage() {
  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="Our Story"
        titleLight="How we"
        titleBold=""
        titleHighlight="began"
        description="The journey of recognizing a continental talent gap and building a foundation to close it."
      />

      <AboutNav />

      {/* ── NARRATIVE SCROLL ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-4xl mx-auto space-y-[100px]">
          
          {/* Chapter 1 */}
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100 md:hidden" />
            <div className="md:grid md:grid-cols-[200px_1fr] gap-12 items-start">
              <div className="sticky top-[140px] hidden md:block text-right">
                <span className="text-sm font-bold text-primary uppercase tracking-[2px]">The Genesis</span>
              </div>
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-[2px] md:hidden block mb-4">The Genesis</span>
                <h2 className="text-[32px] md:text-[40px] font-playfair font-light text-foreground mb-6">
                  A critical <span className="font-semibold">missing piece</span>.
                </h2>
                <div className="prose prose-lg prose-slate font-sans text-muted-foreground">
                  <p>
                    While the world prepares young people for tech careers from age 10, young Africans often miss this critical window of opportunity. Historically, discussions around software engineering, Artificial Intelligence, and digital innovation in Africa only begin in university corridors or job centers.
                  </p>
                  <p>
                    By that time, a significant disadvantage has already formed. Many university students lack the natural exposure, hands-on experience, and foundational digital confidence that their global peers spent their teenage years developing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Image */}
          <div className="relative w-full aspect-[21/9] lg:h-[480px] rounded-[32px] overflow-hidden shadow-2xl">
            <Image 
              src="/images/image12.jpg" 
              alt="Story narrative image" 
              fill 
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>

          {/* Chapter 2 */}
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100 md:hidden" />
            <div className="md:grid md:grid-cols-[200px_1fr] gap-12 items-start">
              <div className="sticky top-[140px] hidden md:block text-right">
                <span className="text-sm font-bold text-primary uppercase tracking-[2px]">The Solution</span>
              </div>
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-[2px] md:hidden block mb-4">The Solution</span>
                <h2 className="text-[32px] md:text-[40px] font-playfair font-light text-foreground mb-6">
                  Building the <span className="font-semibold">earliest pipeline</span>.
                </h2>
                <div className="prose prose-lg prose-slate font-sans text-muted-foreground">
                  <p>
                    Dreamize Africa was structured to intercept this pattern. We decided to start early—when young minds are most elastic—guiding them through discovery and inspiration.
                  </p>
                  <p>
                    By the time our learners are preparing for university, they aren't just "interested" in technology; they are capable builders who possess portfolios, have worked on real community problems, and carry a deep-seated belief that they belong in the global digital economy.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
