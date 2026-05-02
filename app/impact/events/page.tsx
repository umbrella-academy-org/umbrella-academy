'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ImpactNav } from '@/components/impact-nav';
import { PlayfulHero } from '@/components/playful-hero';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      title: 'STEM Discovery Workshop',
      location: 'Nairobi, Kenya',
      date: 'Monthly',
      attendees: '100+ students',
      description: 'A deeply hands-on introduction to fundamental coding, robotics, and digital design for ages 10-15.',
      tag: 'Workshop',
    },
    {
      title: 'Tech Career Day',
      location: 'Multiple Cities',
      date: 'Quarterly',
      attendees: '500+ students',
      description: 'Meet actual tech professionals, learn about vast career paths, and explore the possibilities of the digital economy.',
      tag: 'Career',
    },
    {
      title: 'Real-World Hackathon',
      location: 'Regional',
      date: 'Bi-annual',
      attendees: '200+ participants',
      description: 'Students compete intensely in engineering teams to solve real community problems using modern technology stacks.',
      tag: 'Competition',
    },
    {
      title: 'School Partnerships',
      location: '30+ Schools',
      date: 'Ongoing',
      attendees: '5000+ students',
      description: 'Fully integrated STEM curriculums and structural mentorship deployed directly into allied regional schools.',
      tag: 'Outreach',
    },
  ];

  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="Community Outreach"
        titleLight="School Events &"
        titleBold=""
        titleHighlight="Engagement"
        description="Community engagement powered by highly immersive workshops, hackathons, and direct school partnerships."
      />

      <ImpactNav />

      {/* ── CALENDAR VIEW ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-[80px]">
          
          <div className="grid gap-6">
            {events.map((event, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={event.title} 
                className="group flex flex-col md:flex-row bg-white border border-slate-200 rounded-[32px] p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                
                {/* Left Info Panel */}
                <div className="md:w-1/3 p-4 md:border-r border-slate-100 md:pr-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-[12px] font-bold uppercase tracking-widest text-slate-500 rounded-full w-max mb-4">
                    {event.tag}
                  </span>
                  <h3 className="text-[26px] font-playfair font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide group-hover:gap-4 transition-all mt-auto pt-4 cursor-pointer">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Right Data Matrix */}
                <div className="md:w-2/3 p-4 md:pl-8 flex flex-col justify-center">
                  <p className="text-[17px] text-slate-600 font-light leading-relaxed mb-8">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100/50 group-hover:bg-primary/5 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Frequency</p>
                        <p className="font-bold text-slate-700 text-[14px]">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="font-bold text-slate-700 text-[14px]">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Turnout</p>
                        <p className="font-bold text-slate-700 text-[14px]">{event.attendees}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-[40px] p-12 md:p-16 text-center">
            <h2 className="text-[36px] font-playfair font-semibold mb-6">Host an Event at Your School</h2>
            <p className="text-[18px] text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              We highly encourage allied schools and organizations to partner with us to bring immersive STEM workshops and tech awareness natively to their own communities.
            </p>
            <button className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-[16px] hover:shadow-[0_15px_30px_rgba(255,165,0,0.25)] hover:-translate-y-1 transition-all">
              Request a Partnership Event
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
