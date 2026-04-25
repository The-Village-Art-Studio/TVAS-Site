import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import {getTranslations} from 'next-intl/server';

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
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="section">
        <div className="container">
          <SectionHeader 
            eyebrow={t('opportunities.eyebrow')}
            headline={t('opportunities.headline')}
            align="center"
          />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '8rem'
          }}>
            {opportunityKeys.map((key) => (
              <div key={key} style={{
                background: 'white',
                padding: '4rem',
                borderRadius: '4px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>
                    {t(`opportunities.items.${key}.title`)}
                  </h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65, marginBottom: '3rem' }}>
                    {t(`opportunities.items.${key}.description`)}
                  </p>
                </div>
                <button className="link-editorial" style={{ alignSelf: 'start', border: 'none', background: 'none', padding: 0 }}>
                  {t(`opportunities.items.${key}.cta`)} &rarr;
                </button>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <SectionHeader 
              eyebrow={t('howItWorks.eyebrow')}
              headline={t('howItWorks.headline')}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', gap: '3rem', alignItems: 'start' }}>
                  <span style={{ 
                    fontSize: '3rem', 
                    fontWeight: 800, 
                    color: 'var(--primary)', 
                    opacity: 0.2, 
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {step.number}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 800 }}>{step.title}</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.75 }}>
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
        theme="dark"
      />
    </main>
  );
}
