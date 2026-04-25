import {useTranslations} from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Globe, Camera, MessageSquare, Palette, Box, Cpu, Music, PenTool } from 'lucide-react';
import { ArtistType } from '@/components/cards/ArtistMemberCard';
import CTABanner from '@/components/shared/CTABanner';
import { notFound } from 'next/navigation';

const TypeIcon = ({ type, size = 14 }: { type: ArtistType; size?: number }) => {
  switch (type) {
    case 'painter': return <Palette size={size} />;
    case 'photographer': return <Camera size={size} />;
    case 'sculptor': return <Box size={size} />;
    case 'digital': return <Cpu size={size} />;
    case 'musician': return <Music size={size} />;
    case 'writer': return <PenTool size={size} />;
    default: return <Palette size={size} />;
  }
};

const MOCK_MEMBER_DETAILS: Record<string, any> = {
  'elena-marchetti': { name: 'Elena Marchetti', type: 'painter', image: '/artists/elena.png' },
  'daniel-osei': { name: 'Daniel Osei', type: 'photographer', image: '/artists/daniel.png' },
  'maria-santos': { name: 'Maria Santos', type: 'digital', image: '/artists/maria.png' },
  'yuki-tanaka': { name: 'Yuki Tanaka', type: 'sculptor', image: '/artists/yuki.png' },
  'amara-diallo': { name: 'Amara Diallo', type: 'musician', image: '/artists/amara.png' },
  'julian-vance': { name: 'Julian Vance', type: 'writer', image: '/artists/julian.png' },
  'sofia-reyes': { name: 'Sofia Reyes', type: 'painter', image: '/artists/sofia.png' },
  'marcus-chen': { name: 'Marcus Chen', type: 'photographer', image: '/artists/marcus.png' },
};

export async function generateMetadata({params}: {params: Promise<{locale: string, id: string}>}) {
  const {locale, id} = await params;
  const member = MOCK_MEMBER_DETAILS[id];
  
  if (!member) return { title: 'Artist Not Found' };
  
  return {
    title: `${member.name} | The Village Art Studio`,
    description: `View the artist profile of ${member.name} on The Village Art Studio.`
  };
}

export default async function ArtistProfilePage({params}: {params: Promise<{locale: string, id: string}>}) {
  const { id } = await params;
  const member = MOCK_MEMBER_DETAILS[id];
  
  if (!member) {
    notFound();
  }

  // We are forcing the component to be async to resolve params, but hooks like useTranslations need to be called in a client or server component properly.
  // Actually, next-intl useTranslations works in Server Components if it's async and we await getTranslations, 
  // or we can just use `getTranslations` directly.
  const t = await getTranslations('Pages.Members');
  const tGlobal = await getTranslations('Navigation');

  return (
    <main className="pt-32 lg:pt-40 pb-24">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[-10%] w-[50%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <Link href="/members" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
              <TypeIcon type={member.type} size={14} />
              {t(`list.types.${member.type}`)}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-12">
              {member.name}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <p className="text-xl leading-relaxed text-muted-foreground">
                {member.name} is a visionary {t(`list.types.${member.type}`)} known for exploring the intersections of nature, technology, and human connection. Their work challenges conventional boundaries and invites audiences into immersive experiences.
              </p>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Drawing inspiration from their diverse background, they have exhibited globally and continue to push the boundaries of their medium. At The Village Art Studio, they are a core member of our creative community.
              </p>
            </div>

            <div className="pt-12 border-t border-border/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">
                Connect & Explore
              </h3>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  <Globe size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  <Camera size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                  <MessageSquare size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTABanner 
        eyebrow="Collaborate"
        headline="Work With Our Artists"
        body="Interested in commissioning an artist or featuring them in your next project? Get in touch with us."
        primaryCta={{ label: "Partner With Us", href: '/contact' }}
        theme="muted"
      />
    </main>
  );
}
