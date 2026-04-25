import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const partnerIcons: Record<string, string> = {
  venue: '01',
  brand: '02',
  community: '03',
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
          gap: '8rem',
          alignItems: 'start'
        }}>
          {/* Text Column */}
          <div style={{ position: 'sticky', top: '8rem' }}>
            <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
              {t('eyebrow')}
            </span>
            <h2 style={{ marginBottom: '2.5rem', lineHeight: 1.1 }}>{t('headline')}</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '2', opacity: 0.7, marginBottom: '3.5rem', maxWidth: '90%' }}>
              {t('subheadline')}
            </p>
            <Link href="/partnerships" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>
              {t('cta')}
            </Link>
          </div>

          {/* Partnership Types Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {typeKeys.map((key) => (
              <div key={key} style={{
                display: 'flex',
                gap: '2.5rem',
                paddingBottom: '3rem',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  opacity: 0.5
                }}>
                  {partnerIcons[key]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
                    {t(`types.${key}.title`)}
                  </h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65 }}>
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
