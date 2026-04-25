import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import ShowcaseCard from '@/components/cards/ShowcaseCard';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Sparkles, Palette, ArrowRight, Lightbulb, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Showcase.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ShowcasePage() {
  const t = useTranslations('Pages.Showcase');
  const pastShowcases = t.raw('past.showcases') as any[];

  return (
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Current Featured Artist */}
          <div className="mb-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles size={14} />
              {t('current.eyebrow')}
            </div>
            
            <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center p-8 lg:p-16 rounded-[3.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {/* Background Blob */}
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-[url('/featured-artist-placeholder.png')] bg-center bg-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">
                  Vol. 4 &bull; April 2025
                </div>
                <h2 className="text-4xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                  Featured Artist Name
                </h2>
                <p className="text-xl text-muted-foreground/80 leading-relaxed mb-12">
                  A detailed exploration of this month&apos;s featured artist, their creative process, and the specific series being showcased at The Village Art Studio.
                </p>
                <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 group transition-all duration-500">
                  <Link href="/showcase/featured-artist">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Palette size={14} />
              {t('past.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              {t('past.headline')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pastShowcases.map((showcase, index) => (
              <div 
                key={index}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ShowcaseCard 
                  month={showcase.month}
                  artist={showcase.artist}
                  medium={showcase.medium}
                  series={showcase.series}
                />
              </div>
            ))}
            
            {/* View All Card */}
            <div 
              className="animate-in fade-in slide-in-from-bottom-8 duration-1000 h-full"
              style={{ animationDelay: `${pastShowcases.length * 100}ms` }}
            >
              <Link 
                href="/showcase/archive"
                className="group relative flex flex-col items-center justify-center h-full min-h-[300px] rounded-[3rem] bg-card/30 backdrop-blur-xl border-2 border-dashed border-border hover:border-primary hover:bg-card/80 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Grid size={32} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  View Full Showcase
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-40 bg-muted/30 relative overflow-hidden border-t border-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
            <Lightbulb size={14} />
            {t('concept.eyebrow')}
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-10 leading-tight">
            {t('concept.headline')}
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground/80 leading-relaxed font-medium">
            {t('concept.body')}
          </p>
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: '/for-artists' }}
        theme="dark"
      />
    </main>
  );
}
