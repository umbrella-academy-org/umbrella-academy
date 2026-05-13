import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutNav } from '@/components/about-nav';
import { PlayfulHero } from '@/components/playful-hero';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Vision & Mission | Dreamize Africa',
  description: 'Our vision for raising a generation of African innovators.',
};

export default function VisionPage() {
  return (
    <>
      <Navbar />

      <PlayfulHero
        pillTracker="Vision & Mission"
        titleLight="The future we are"
        titleBold=""
        titleHighlight="building"
        description="Our commitment to raising a generation of confident African innovators."
      />

      <AboutNav />

      {/* ── CONTENT ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-[120px]">

          {/* Vision Statement */}
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-sm font-sans font-bold text-primary uppercase tracking-[3px] mb-6 block">Our Vision</span>
            <h2 className="text-[32px] md:text-[46px] lg:text-[54px] font-playfair font-light text-foreground leading-[1.25] mb-8">
              A generation of young Africans who see African problems as their priority and{' '}
              <span className="relative inline-block z-10 font-semibold mt-2">
                technology as a powerful tool
                <span className="absolute bottom-2 left-[-2px] w-[102%] h-[12px] bg-primary/20 -z-10 rounded-sm -rotate-1" />
              </span>{' '}
              to solve them.
            </h2>
            <p className="text-[18px] text-muted-foreground leading-relaxed font-sans max-w-3xl mx-auto">
              We envision a future where young people do not wait until adulthood to become innovators, but begin creating solutions while they are still young. Where technology education starts early, not late.
            </p>
          </div>

          {/* Mission Path */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-[60px] items-center bg-slate-50 p-8 lg:p-14 rounded-[40px] border border-border">
            <div>
              <span className="text-sm font-sans font-bold text-primary uppercase tracking-[3px] mb-4 block">Our Mission</span>
              <h3 className="text-[32px] font-playfair font-semibold text-foreground mb-6 leading-tight">
                A journey from imaginative play to funded leadership.
              </h3>
              <p className="text-[17px] text-muted-foreground font-sans leading-relaxed mb-8">
                We design learning as a progression over years, not a set of short workshops. 
                Technology becomes a tool for meaningful change through habits, skills, and mindsets.
              </p>

              <div className="space-y-4 pt-6 border-t border-border">
                <p className="text-sm font-bold text-foreground uppercase tracking-wider">Our Core Purpose</p>
                <div className="flex flex-col gap-3">
                  {[
                    { from: 'Consuming kits', to: 'Ideas before tools' },
                    { from: 'Short workshops', to: 'Long arc learning' },
                    { from: 'Generic skills', to: 'Skills + Purpose' },
                  ].map((item) => (
                    <div key={item.from} className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-muted-foreground line-through opacity-50">{item.from}</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                      <span className="text-foreground">{item.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  stage: 'Dreamer (Age 10+)',
                  title: 'Imagination & Observation',
                  points: [
                    'See technology as something you shape',
                    'Notice local problems in everyday life',
                    'Make, don’t just consume (hands-on tinkering)',
                    'Brainstorming & storytelling for concepts',
                  ],
                },
                {
                  stage: 'Builder to Founder',
                  title: 'Habits, Impact & Leadership',
                  points: [
                    'Multi-month projects and iteration',
                    'Research & test assumptions with users',
                    'Form ventures and learn product-market fit',
                    'Evidence of impact and funding readiness',
                  ],
                },
              ].map((segment) => (
                <div key={segment.stage} className="bg-white border border-border p-8 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">{segment.stage}</span>
                    <h4 className="text-[20px] font-playfair font-semibold">{segment.title}</h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {segment.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span className="text-[14px] text-muted-foreground font-sans leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
