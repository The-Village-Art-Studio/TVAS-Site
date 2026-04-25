import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import WorkshopCard from '@/components/cards/WorkshopCard';
import QuoteBlock from '@/components/shared/QuoteBlock';
import CTABanner from '@/components/shared/CTABanner';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

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
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '6rem',
            alignItems: 'center',
            marginBottom: '8rem'
          }}>
            <div>
              <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>{t('partnership.eyebrow')}</span>
              <h2 style={{ marginBottom: '2rem' }}>{t('partnership.headline')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.9', marginBottom: '1.5rem', opacity: 0.85 }}>
                {t('partnership.body1')}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.9', opacity: 0.85, marginBottom: '2rem' }}>
                {t('partnership.body2')}
              </p>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {t('partnership.address')}
              </p>
            </div>
            <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden' }}>
              <Image 
                src="/la_gloria_workshop_1776084783262.png" 
                alt="Workshop at La Gloria Mexican Coffee" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>{t('experiences.eyebrow')}</span>
            <h2>{t('experiences.headline')}</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {events.map((event, index) => (
              <WorkshopCard 
                key={index}
                title={event.title}
                artist={event.artist}
                date={event.date}
                duration={event.duration}
                capacity={event.capacity}
                description={event.description}
                cta={event.cta}
              />
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
