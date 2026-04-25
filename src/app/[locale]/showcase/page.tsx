import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import ShowcaseCard from '@/components/cards/ShowcaseCard';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';

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

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '4rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>{t('current.eyebrow')}</span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '4rem',
              marginBottom: '6rem'
            }}>
              <div style={{ aspectRatio: '4/5', background: 'var(--muted)', borderRadius: '4px' }} />
              <div>
                <span className="caption" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}>Vol. 4 &bull; April 2025</span>
                <h2 style={{ marginBottom: '1.5rem' }}>Featured Artist Name</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8, marginBottom: '2.5rem' }}>
                  A detailed exploration of this month&apos;s featured artist, their creative process, and the specific series being showcased at The Village Art Studio.
                </p>
                <button className="btn btn-primary">{t('current.viewCta')}</button>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1rem' }}>{t('past.eyebrow')}</span>
            <h2>{t('past.headline')}</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {pastShowcases.map((showcase, index) => (
              <ShowcaseCard 
                key={index}
                month={showcase.month}
                artist={showcase.artist}
                medium={showcase.medium}
                series={showcase.series}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--muted)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>{t('concept.eyebrow')}</span>
            <h2 style={{ marginBottom: '2rem' }}>{t('concept.headline')}</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', opacity: 0.8 }}>
              {t('concept.body')}
            </p>
          </div>
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
