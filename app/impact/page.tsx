import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImpactNav } from '@/components/impact-nav';
import { PlayfulHero } from '@/components/playful-hero';
import Link from 'next/link';
import { ArrowRight, Rocket, Star, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Impact | Dreamize Africa',
  description: 'See the real impact we\'re making through student projects, success stories, and community events.',
};

export default function ImpactPage() {
  const impactAreas = [
    {
      title: 'Student Projects',
      description: 'Real solutions engineered by students to solve tangible problems within their communities.',
      href: '/impact/projects',
      icon: <Rocket className="w-8 h-8" />,
      stats: '50+ Deployed',
      color: 'bg-amber-50',
    },
    {
      title: 'Success Stories',
      description: 'Inspiring journeys of students who discovered their passion and transitioned into tech careers.',
      href: '/impact/stories',
      icon: <Star className="w-8 h-8" />,
      stats: '150+ Narratives',
      color: 'bg-slate-50',
    },
    {
      title: 'School Events',
      description: 'Deep community engagement through immersive workshops, hackathons, and outreach.',
      href: '/impact/events',
      icon: <BookOpen className="w-8 h-8" />,
      stats: '30+ Schools',
      color: 'bg-blue-50',
    },
  ];

  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="Our Impact"
        titleLight="Measurable"
        titleBold=""
        titleHighlight="change"
        description="We don't just measure attendance; we measure working projects, confident graduates, and shifting career trajectories."
      />

      <ImpactNav />

      {/* ── DASHBOARD METRICS ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-6xl mx-auto space-y-[120px]">
          
          {/* Big Number Dashboard */}
          <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent opacity-60" />
            
            <h2 className="text-[24px] font-sans font-bold text-white uppercase tracking-[4px] mb-12 relative z-10">
              By The Numbers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {[
                { number: '500+', label: 'Students Impacted' },
                { number: '50+', label: 'Projects Launched' },
                { number: '30+', label: 'Partner Schools' },
                { number: '95%', label: 'Alumni Success Rate' },
              ].map((metric) => (
                <div key={metric.label} className="border-l-2 border-white/20 pl-6">
                  <div className="text-[40px] md:text-[56px] font-playfair font-bold text-white leading-none mb-4">
                    {metric.number}
                  </div>
                  <p className="text-[15px] font-sans font-medium text-slate-300 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Areas Grids */}
          <div>
            <h2 className="text-[36px] font-playfair font-semibold text-center mb-16">
              Where we make a difference
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {impactAreas.map((area) => (
                <Link key={area.title} href={area.href} className="group h-full">
                  <div className={`h-full border border-border rounded-[32px] p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden ${area.color}`}>
                    
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                      <div className="w-32 h-32">{area.icon}</div>
                    </div>

                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {area.icon}
                    </div>
                    
                    <h3 className="text-[28px] font-playfair font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    
                    <p className="text-[16px] text-slate-600 font-light leading-relaxed mb-8">
                      {area.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                      <span className="font-bold text-primary text-[15px] uppercase tracking-wider">
                        {area.stats}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
