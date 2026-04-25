import {useTranslations} from 'next-intl';

const pillarIcons: Record<string, string> = {
  podcast: '01',
  showcase: '02',
  workshops: '03',
  support: '04',
  partnerships: '05',
};

export default function Pillars() {
  const t = useTranslations('Pillars');

  const pillarKeys = ['podcast', 'showcase', 'workshops', 'support', 'partnerships'] as const;

  return (
    <section className="section" style={{ background: 'var(--muted)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '8rem' }} className="reveal">
          <span className="caption" style={{ display: 'block', marginBottom: '2.5rem' }}>
            {t('eyebrow')}
          </span>
          <h2 style={{ lineHeight: 1.1 }}>{t('headline')}</h2>
        </div>

        {/* Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem 3rem'
        }}>
          {pillarKeys.map((key, index) => (
            <div key={key} 
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '3rem' }}
              className={`reveal delay-${(index % 4) + 1}`}
            >
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  opacity: 0.3
                }}>
                  {pillarIcons[key]}
                </span>
                <span className="caption" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                  {t(`items.${key}.label`)}
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>
                {t(`items.${key}.title`)}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65, maxWidth: '90%' }}>
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
