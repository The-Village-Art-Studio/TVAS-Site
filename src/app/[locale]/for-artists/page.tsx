import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';
import { Sparkles, Mic, ImageIcon, Rocket, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const opportunityIcons = {
  podcast: Mic,
  showcase: ImageIcon,
  workshops: Rocket,
  community: MessageCircle,
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.ForArtists.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ForArtistsPage() {
  const t = useTranslations('Pages.ForArtists');
  const opportunityKeys = ['podcast', 'showcase', 'workshops', 'community'] as const;
  const steps = t.raw('howItWorks.steps') as any[];

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            eyebrow={t('opportunities.eyebrow')}
            headline={t('opportunities.headline')}
            align="center"
            icon={Sparkles}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
            {opportunityKeys.map((key) => {
              const Icon = opportunityIcons[key];
              return (
                <div key={key} className="group relative p-10 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                      {t(`opportunities.items.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base mb-10 flex-grow">
                      {t(`opportunities.items.${key}.description`)}
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group/link"
                    >
                      {t(`opportunities.items.${key}.cta`)}
                      <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                {t('howItWorks.eyebrow')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
                {t('howItWorks.headline')}
              </h2>
            </div>
            
            <div className="flex flex-col gap-16 lg:gap-24">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
                  <div className="relative flex-shrink-0">
                    <span className="text-8xl lg:text-[10rem] font-black text-primary/10 leading-none select-none transition-all duration-500 group-hover:text-primary/20 group-hover:scale-110 block">
                      {step.number}
                    </span>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] hidden md:block" />
                  </div>
                  <div className="md:pt-12">
                    <h3 className="text-3xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
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
