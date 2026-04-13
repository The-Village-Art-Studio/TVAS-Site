import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const benefitIcons: Record<string, string> = {
  podcast: '🎙️',
  showcase: '🖼️',
  workshops: '☕',
  community: '🤝',
};

export default function ForArtistsSection() {
  const t = useTranslations('ForArtists');
  const benefitKeys = ['podcast', 'showcase', 'workshops', 'community'] as const;

  return (
    <section className="section" style={{ background: 'var(--muted)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ marginBottom: '1.5rem' }}>{t('headline')}</h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.8, lineHeight: '1.8' }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          {benefitKeys.map((key) => (
            <div key={key} style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '4px',
              borderTop: '3px solid var(--primary)'
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1.25rem' }}>
                {benefitIcons[key]}
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 700 }}>
                {t(`benefits.${key}.title`)}
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', opacity: 0.75 }}>
                {t(`benefits.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/for-artists" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '1.2rem 3rem' }}>
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
