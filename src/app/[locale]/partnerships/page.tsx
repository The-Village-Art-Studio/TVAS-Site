import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';

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

      <section className="section">
        <div className="container">
          <SectionHeader 
            eyebrow={t('types.eyebrow')}
            headline={t('types.headline')}
            align="center"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '8rem'
          }}>
            {partnerTypeKeys.map((key) => (
              <div key={key} style={{ 
                padding: '4rem', 
                background: 'white', 
                borderRadius: '4px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>{t(`types.${key}.title`)}</h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65 }}>
                  {t(`types.${key}.description`)}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="caption" style={{ 
                    display: 'block', 
                    fontSize: '0.65rem', 
                    opacity: 0.4,
                    marginBottom: '0.75rem'
                  }}>Ideal for</span>
                  <p style={{ fontWeight: 800, fontSize: '0.9rem', opacity: 0.8 }}>{t(`types.${key}.examples`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '6rem',
            alignItems: 'center'
          }}>
            <div style={{ aspectRatio: '16/9', background: 'var(--muted)', borderRadius: '4px' }} />
            <div>
              <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>{t('spotlight.eyebrow')}</span>
              <h2 style={{ marginBottom: '2rem' }}>{t('spotlight.headline')}</h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.9', opacity: 0.85 }}>
                {t('spotlight.body')}
              </p>
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
        theme="muted"
      />
    </main>
  );
}
