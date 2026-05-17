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

import prisma from '@/lib/prisma';

export async function generateMetadata({params}: {params: Promise<{locale: string, id: string}>}) {
  const {locale, id} = await params;
  const showcase = await prisma.showcase.findUnique({
    where: { id }
  });
  
  if (!showcase) return { title: 'Showcase Not Found' };
  
  return {
    title: `${showcase.artistName} Showcase | The Village Art Studio`,
    description: `View the featured showcase by ${showcase.artistName}.`
  };
}

export default async function ShowcaseDetailsPage({params}: {params: Promise<{locale: string, id: string}>}) {
  const { id, locale } = await params;
  const showcase = await prisma.showcase.findUnique({
    where: { id }
  });
  
  if (!showcase) {
    notFound();
  }

  const t = await getTranslations('Pages.Showcase');

  let parsedGallery = [];
  try {
    parsedGallery = JSON.parse(showcase.galleryItems || '[]');
  } catch(e) {}

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
                src={showcase.imageUrl || '/featured-artist-placeholder.png'} 
                alt={showcase.artistName}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
              <Sparkles size={14} />
              {locale === 'fr' ? showcase.mediumFr : showcase.mediumEn}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              {showcase.artistName}
            </h1>
            <p className="text-xl text-primary font-bold tracking-widest uppercase mb-12">
              {locale === 'fr' ? showcase.seriesFr : showcase.seriesEn} &bull; {showcase.monthYear}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-muted-foreground whitespace-pre-line">
                {locale === 'fr' ? showcase.statementFr : showcase.statementEn}
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
            {parsedGallery.map((item: GalleryItem, index: number) => (
              <div 
                key={index}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.type === 'video' ? (
                  <VideoCard 
                    title={item.title || "Video Process"}
                    artist={showcase.artistName}
                    description={item.description || "Video documentation"}
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
                        unoptimized
                      />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {item.title || "Gallery Artwork"}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description || "Mixed Media"}
                      </p>
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
