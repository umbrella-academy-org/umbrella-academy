import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutNav } from '@/components/about-nav';
import { PlayfulHero } from '@/components/playful-hero';
import Image from 'next/image';

export const metadata = {
  title: 'About Dreamize Africa',
  description: 'Learn about our mission, vision, and team building Africa\'s tech talent pipeline.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="Get To Know Us"
        titleLight="Building the earliest stage of"
        titleBold=""
        titleHighlight="Africa's pipeline"
        description="We are preparing a generation of young innovators by bringing technology careers into focus long before adulthood."
      />

      <AboutNav />

      {/* ── OVERVIEW CONTENT ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-[120px]">
          
          {/* Layout Break 1 */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-[60px] items-center">
            <div>
              <h2 className="text-[32px] lg:text-[40px] font-playfair font-light mb-6">
                Why we <span className="font-semibold">exist</span>
              </h2>
              <p className="text-[17px] text-muted-foreground leading-relaxed mb-6 font-sans">
                Across Africa, students discover technology careers too late. Most begin thinking about software engineering, AI, or digital innovation only after high school or at university.
              </p>
              <p className="text-[17px] text-muted-foreground leading-relaxed font-sans">
                Dreamize Africa was born to shift this timeline. We help young learners discover and prepare for technology careers early, when curiosity is highest and real skills can flourish.
              </p>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                <Image 
                  src="/images/image11.jpg" 
                  alt="Students learning" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-cover"
                />
            </div>
          </div>

          {/* Core Pillars */}
          <div>
            <h2 className="text-[32px] lg:text-[40px] font-playfair font-light text-center mb-16">
              Our <span className="font-semibold text-primary">Blueprint</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'Exposure', text: 'Help young students discover technology early through hands-on learning.' },
                { label: 'Inspiration', text: 'Build confidence and show the power of technology in solving real problems.' },
                { label: 'Experience', text: 'Provide real-world project opportunities and portfolio development.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-[28px] p-10 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <h3 className="text-[24px] font-playfair font-semibold text-foreground mb-4">{item.label}</h3>
                  <p className="text-[16px] text-muted-foreground leading-relaxed font-sans">{item.text}</p>
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
