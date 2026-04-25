import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const benefitIcons: Record<string, string> = {
  podcast: '01',
  showcase: '02',
  workshops: '03',
  community: '04',
};

export default function ForArtistsSection() {
  const t = useTranslations('ForArtists');
  const benefitKeys = ['podcast', 'showcase', 'workshops', 'community'] as const;

  return (
    <section className="section" style={{ background: 'var(--muted)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 7rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ marginBottom: '2rem', lineHeight: 1.1 }}>{t('headline')}</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.7, lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '6rem'
        }}>
          {benefitKeys.map((key) => (
            <div key={key} style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '4px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  display: 'block', 
                  marginBottom: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  opacity: 0.3
                }}>
                  {benefitIcons[key]}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 800 }}>
                  {t(`benefits.${key}.title`)}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.8', opacity: 0.65, marginBottom: '2rem' }}>
                  {t(`benefits.${key}.description`)}
                </p>
              </div>
              <Link href="/for-artists" className="link-editorial" style={{ fontSize: '0.85rem' }}>
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/for-artists" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1.25rem 3.5rem' }}>
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
