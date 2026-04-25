import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Handshake, MapPin, Briefcase, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const partnerIcons = {
  venue: MapPin,
  brand: Briefcase,
  community: Globe,
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Partnerships.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function PartnershipsPage() {
  const t = useTranslations('Pages.Partnerships');
  const partnerTypeKeys = ['venue', 'brand', 'community'] as const;

  return (
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            eyebrow={t('types.eyebrow')}
            headline={t('types.headline')}
            align="center"
            icon={Handshake}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
            {partnerTypeKeys.map((key, index) => {
              const Icon = partnerIcons[key];
              return (
                <div key={key} className="group relative p-10 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                      {t(`types.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base mb-10 flex-grow">
                      {t(`types.${key}.description`)}
                    </p>
                    <div className="mt-auto pt-8 border-t border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-4">
                        Ideal for
                      </span>
                      <p className="text-sm font-bold text-foreground/80 group-hover:text-primary transition-colors">
                        {t(`types.${key}.examples`)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle index number background */}
                  <div className="absolute top-10 right-10 text-8xl font-black text-primary/5 pointer-events-none select-none transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110">
                    {`0${index + 1}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spotlight Section */}
          <div className="relative rounded-[4rem] overflow-hidden bg-foreground shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
            <div className="lg:w-1/2 relative bg-zinc-900 overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')] bg-center bg-cover grayscale opacity-50 transition-all duration-700 hover:grayscale-0 hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-foreground" />
            </div>

            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-10 self-start">
                <Handshake size={14} />
                {t('spotlight.eyebrow')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-10 leading-tight tracking-tight">
                {t('spotlight.headline')}
              </h2>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-xl">
                {t('spotlight.body')}
              </p>
              <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white self-start shadow-xl shadow-primary/20 group transition-all duration-500 hover:scale-105">
                <Link href="/contact">
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: 'mailto:info@tvas.ca' }}
      />
    </main>
  );
}
