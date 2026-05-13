import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutNav } from '@/components/about-nav';
import { PlayfulHero } from '@/components/playful-hero';
import Image from 'next/image';

export const metadata = {
  title: 'Team | Dreamize Africa',
  description: 'Meet the founders, mentors, and program leads building Africa\'s tech talent pipeline.',
};

export default function TeamPage() {
  const team = [
    {
      name: 'Ismail Munyentwari',
      role: 'Founder & Executive Director',
      bio: 'Education technologist with 15+ years experience in African tech initiatives.',
      image: '/images/team/ismail.jpg',
    },
    {
      name: 'Manzi',
      role: 'Program Director',
      bio: 'Former software engineer at leading tech companies, now dedicated to mentoring.',
      image: '/images/team/ismail.jpg',
    },
    {
      name: 'Cyusa',
      role: 'Curriculum Lead',
      bio: 'STEM educator passionate about making technology accessible to African youth.',
     image: '/images/team/ismail.jpg',
    },
    {
      name: 'Kirezi',
      role: 'Community Manager',
      bio: 'Community organizer connecting schools, students, and industry partners.',
     image: '/images/team/ismail.jpg',
    },
  ];

  return (
    <>
      <Navbar />
      
      <PlayfulHero
        pillTracker="The Team"
        titleLight="Meet the"
        titleBold="architects of"
        titleHighlight="impact"
        description="The passionate mentors, founders, and community leads building the next tech generation."
      />

      <AboutNav />

      {/* ── TEAM GRID ── */}
      <section className="py-[100px] px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden bg-slate-100 mb-6 shadow-md transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 group-hover:ring-4 ring-primary/20">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-sm font-semibold tracking-wider uppercase">View Profile</span>
                  </div>
                </div>
                
                <div className="text-center md:text-left px-2">
                  <h3 className="text-[22px] font-playfair font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[14px] font-sans font-bold text-primary/80 uppercase tracking-wide mb-3">
                    {member.role}
                  </p>
                  <p className="text-[15px] font-sans text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
