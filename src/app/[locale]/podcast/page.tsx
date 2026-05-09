import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import VideoSlider from '@/components/VideoSlider';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Mic, Play, Headphones, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Podcast.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function PodcastPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Podcast' });
  
  const episodes = await prisma.podcast.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const featuredPodcast = episodes.length > 0 ? episodes[0] : null;

  // Use the latest episode's cover as the hero
  const heroImageUrl = featuredPodcast?.imageUrl || '/podcast-cover.png';

  return (
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Featured Episode */}
          {featuredPodcast && (
            <div className="group relative rounded-[2.5rem] overflow-hidden bg-foreground shadow-2xl mb-24 flex flex-col lg:flex-row max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Background Blob for depth */}
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="lg:w-[45%] relative bg-zinc-900 overflow-hidden aspect-square shrink-0">
                <div 
                  className="absolute inset-0 bg-center bg-cover" 
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-foreground" />
              </div>

              <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center relative z-10 bg-foreground">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 self-start">
                  <Mic size={14} />
                  {t('featured.eyebrow')}
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight">
                  {locale === 'fr' ? featuredPodcast.titleFr : featuredPodcast.titleEn}
                </h2>
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-lg line-clamp-4">
                  {locale === 'fr' ? featuredPodcast.descriptionFr : featuredPodcast.descriptionEn}
                </p>
                <Button asChild size="lg" className="h-14 px-8 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white self-start shadow-xl shadow-primary/20 group">
                  <a href={featuredPodcast.listenUrl || `https://youtube.com/watch?v=${featuredPodcast.youtubeId}`} target="_blank" rel="noopener noreferrer">
                    {t('featured.listenCta')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          )}

          <div id="episodes" className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Headphones size={14} />
              {t('grid.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">
              {t('grid.headline')}
            </h2>
          </div>

          <VideoSlider episodes={episodes.map(e => ({
            title: locale === 'fr' ? e.titleFr : e.titleEn,
            artist: e.artist,
            description: locale === 'fr' ? e.descriptionFr : e.descriptionEn,
            youtubeId: e.youtubeId,
            duration: '00:00' // Placeholder
          }))} />
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: '/for-artists' }}
      />
    </main>
  );
}
