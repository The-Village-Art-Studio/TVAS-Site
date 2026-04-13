import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const partnerIcons: Record<string, string> = {
  venue: '🏛️',
  brand: '✦',
  community: '🌱',
};

export default function PartnershipSection() {
  const t = useTranslations('Partnerships');
  const typeKeys = ['venue', 'brand', 'community'] as const;

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '6rem',
          alignItems: 'start'
        }}>
          {/* Text Column */}
          <div style={{ position: 'sticky', top: '8rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '1.5rem' }}>
              {t('eyebrow')}
            </span>
            <h2 style={{ marginBottom: '2rem' }}>{t('headline')}</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.9', opacity: 0.8, marginBottom: '3rem' }}>
              {t('subheadline')}
            </p>
            <Link href="/partnerships" className="btn btn-outline">
              {t('cta')}
            </Link>
          </div>

          {/* Partnership Types Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {typeKeys.map((key) => (
              <div key={key} style={{
                display: 'flex',
                gap: '2rem',
                paddingBottom: '2.5rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  background: 'var(--primary-light)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  {partnerIcons[key]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {t(`types.${key}.title`)}
                  </h3>
                  <p style={{ fontSize: '1rem', lineHeight: '1.8', opacity: 0.75 }}>
                    {t(`types.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
