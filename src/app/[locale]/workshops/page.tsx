import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import WorkshopCard from '@/components/cards/WorkshopCard';
import QuoteBlock from '@/components/shared/QuoteBlock';
import CTABanner from '@/components/shared/CTABanner';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import { Coffee, MapPin, Calendar, Star } from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Workshops.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function WorkshopsPage() {
  const t = useTranslations('Pages.Workshops');
  const events = t.raw('experiences.events') as any[];

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                <Coffee size={12} />
                {t('partnership.eyebrow')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                {t('partnership.headline')}
              </h2>
              <div className="space-y-6 mb-10">
                <p className="text-xl text-muted-foreground/80 leading-relaxed">
                  {t('partnership.body1')}
                </p>
                <p className="text-xl text-muted-foreground/80 leading-relaxed">
                  {t('partnership.body2')}
                </p>
              </div>
              <div className="flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-[0.2em] bg-primary/5 p-4 rounded-2xl border border-primary/10 inline-flex">
                <MapPin size={18} />
                {t('partnership.address')}
              </div>
            </div>

            <div className="group relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
              <Image 
                src="/la_gloria_workshop_1776084783262.png" 
                alt="Workshop at La Gloria Mexican Coffee" 
                fill
                className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute top-8 left-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl z-20 animate-pulse">
                <Star className="text-primary mb-2" size={24} fill="currentColor" />
                <p className="text-white text-xs font-bold uppercase tracking-widest">Premium Experience</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Calendar size={12} />
              {t('experiences.eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">
              {t('experiences.headline')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <WorkshopCard 
                  title={event.title}
                  artist={event.artist}
                  date={event.date}
                  duration={event.duration}
                  capacity={event.capacity}
                  description={event.description}
                  cta={event.cta}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBlock 
        quote={t('quote.text')}
        attribution={t('quote.attribution')}
      />

      <CTABanner 
        eyebrow={t('cta.eyebrow')}
        headline={t('cta.headline')}
        body={t('cta.body')}
        primaryCta={{ label: t('cta.primary'), href: '/contact' }}
        secondaryCta={{ label: t('cta.secondary'), href: '/showcase' }}
        theme="muted"
      />
    </main>
  );
}
