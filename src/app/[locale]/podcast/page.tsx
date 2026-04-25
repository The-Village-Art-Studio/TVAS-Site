import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import VideoCard from '@/components/cards/VideoCard';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Mic, Play, Headphones, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Podcast.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function PodcastPage() {
  const t = useTranslations('Pages.Podcast');
  const episodes = t.raw('grid.episodes') as any[];

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Featured Episode */}
          <div className="group relative rounded-[3rem] overflow-hidden bg-foreground shadow-2xl mb-32 flex flex-col lg:flex-row min-h-[500px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Background Blob for depth */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="lg:w-1/2 relative bg-zinc-900 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/podcast-hero-placeholder.png')] bg-center bg-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-foreground" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <Play size={40} className="ml-2 fill-current" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 self-start">
                <Mic size={14} />
                {t('featured.eyebrow')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
                {episodes[0].title}
              </h2>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-lg">
                {episodes[0].description}
              </p>
              <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white self-start shadow-xl shadow-primary/20 group">
                <a href="#episodes">
                  {t('featured.listenCta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          <div id="episodes" className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Headphones size={14} />
              {t('grid.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">
              {t('grid.headline')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {episodes.map((episode, index) => (
              <div 
                key={index}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VideoCard 
                  title={episode.title}
                  artist={episode.artist}
                  description={episode.description}
                  youtubeId={episode.youtubeId || "dQw4w9WgXcQ"}
                />
              </div>
            ))}
          </div>
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
