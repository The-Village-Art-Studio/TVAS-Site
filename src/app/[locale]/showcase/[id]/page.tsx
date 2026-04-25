import {useTranslations} from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Sparkles, Image as ImageIcon } from 'lucide-react';
import CTABanner from '@/components/shared/CTABanner';
import { notFound } from 'next/navigation';
import VideoCard from '@/components/cards/VideoCard';

// Shared type for showcase gallery items
type GalleryItem = {
  type: 'image' | 'video';
  url?: string; // For images
  youtubeId?: string; // For videos
  title: string;
  description?: string;
};

const MOCK_SHOWCASE_DETAILS: Record<string, any> = {
  'featured-artist': {
    artistName: 'Elena Marchetti',
    artistType: 'Painter',
    artistImage: '/artists/elena.png',
    title: 'Vol. 4 • April 2025 Showcase',
    statement: `
      Elena Marchetti's latest series explores the intersection of urban decay and natural reclamation. 
      Through vibrant, large-scale oil canvases, she documents the quiet moments where nature reclaims 
      forgotten city spaces. This showcase brings together over a year of dedicated work, challenging 
      the viewer to find beauty in unexpected places.
    `,
    gallery: [
      {
        type: 'image',
        url: '/featured-artist-placeholder.png',
        title: 'Urban Bloom I',
        description: 'Oil on canvas, 48" x 60"'
      },
      {
        type: 'video',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Behind the Canvas: Urban Bloom',
        description: 'A short documentary following Elena\'s creative process.'
      },
      {
        type: 'image',
        url: '/about-studio.png',
        title: 'Concrete Roots',
        description: 'Oil on canvas, 36" x 36"'
      }
    ]
  }
};

export async function generateMetadata({params}: {params: Promise<{locale: string, id: string}>}) {
  const {locale, id} = await params;
  const showcase = MOCK_SHOWCASE_DETAILS[id];
  
  if (!showcase) return { title: 'Showcase Not Found' };
  
  return {
    title: `${showcase.artistName} Showcase | The Village Art Studio`,
    description: `View the featured showcase by ${showcase.artistName}.`
  };
}

export default async function ShowcaseDetailsPage({params}: {params: Promise<{locale: string, id: string}>}) {
  const { id } = await params;
  const showcase = MOCK_SHOWCASE_DETAILS[id];
  
  if (!showcase) {
    notFound();
  }

  const t = await getTranslations('Pages.Showcase');

  return (
    <main className="pt-32 lg:pt-40 pb-24">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <Link href="/showcase" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Showcase
          </Link>
        </div>

        {/* Artist Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
              <Image 
                src={showcase.artistImage} 
                alt={showcase.artistName}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
              <Sparkles size={14} />
              {showcase.artistType}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              {showcase.artistName}
            </h1>
            <p className="text-xl text-primary font-bold tracking-widest uppercase mb-12">
              {showcase.title}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-muted-foreground whitespace-pre-line">
                {showcase.statement}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            <ImageIcon size={14} />
            Gallery
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-16">
            Featured Artworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {showcase.gallery.map((item: GalleryItem, index: number) => (
              <div 
                key={index}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.type === 'video' ? (
                  <VideoCard 
                    title={item.title}
                    artist={showcase.artistName}
                    description={item.description || ''}
                    youtubeId={item.youtubeId || ''}
                  />
                ) : (
                  <div className="group relative rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image 
                        src={item.url || ''} 
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
