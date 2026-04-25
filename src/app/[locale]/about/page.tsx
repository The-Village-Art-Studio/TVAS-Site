import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import QuoteBlock from '@/components/shared/QuoteBlock';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';

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
            gap: '8rem',
            alignItems: 'center'
          }}>
            <div style={{ aspectRatio: '4/5', background: '#f0f0f0', borderRadius: '4px' }} />
            <div>
              <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>{t('story.eyebrow')}</span>
              <h2 style={{ marginBottom: '2.5rem', lineHeight: 1.1 }}>{t('story.headline')}</h2>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.9', marginBottom: '2rem', opacity: 0.65 }}>
                {t('story.body1')}
              </p>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.9', opacity: 0.65 }}>
                {t('story.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuoteBlock 
        quote={t('mission.quote')}
        attribution={t('mission.attribution')}
      />

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>{t('values.eyebrow')}</span>
            <h2 style={{ lineHeight: 1.1 }}>{t('values.headline')}</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem'
          }}>
            {['visibility', 'connection', 'community'].map((key, index) => (
              <div key={key} style={{ textAlign: 'left', padding: '3rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <span className="caption" style={{ display: 'block', marginBottom: '2rem', opacity: 0.3 }}>0{index + 1}</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>{t(`values.${key}.title`)}</h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.6 }}>{t(`values.${key}.description`)}</p>
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
