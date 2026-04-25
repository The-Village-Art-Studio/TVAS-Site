import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import QuoteBlock from '@/components/shared/QuoteBlock';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Sparkles, Heart, Users, MapPin } from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.About.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function AboutPage() {
  const t = useTranslations('Pages.About');

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* Story Image Area */}
            <div className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute inset-0 bg-[url('/about-story-placeholder.png')] bg-center bg-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              {/* Glass decorative element */}
              <div className="absolute bottom-8 right-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-xs animate-pulse">
                <p className="text-white text-sm font-medium">Building Toronto&apos;s Creative Soul since 2024.</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                <Sparkles size={12} />
                {t('story.eyebrow')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                {t('story.headline')}
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-muted-foreground/80 leading-relaxed">
                  {t('story.body1')}
                </p>
                <p className="text-xl text-muted-foreground/80 leading-relaxed">
                  {t('story.body2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteBlock 
        quote={t('mission.quote')}
        attribution={t('mission.attribution')}
      />

      <section className="py-24 lg:py-40 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Heart size={12} />
              {t('values.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              {t('values.headline')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { key: 'visibility', icon: Sparkles },
              { key: 'connection', icon: Users },
              { key: 'community', icon: MapPin }
            ].map(({ key, icon: Icon }, index) => (
              <div key={key} className="group relative p-10 rounded-[2.5rem] bg-background border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-8 right-8 text-8xl font-black text-primary/5 pointer-events-none select-none transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110">
                  0{index + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        primaryCta={{ label: t('cta.artist.cta'), href: '/for-artists' }}
        secondaryCta={{ label: t('cta.partner.cta'), href: '/partnerships' }}
        theme="dark"
      />
    </main>
  );
}
